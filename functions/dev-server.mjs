/**
 * Local dev server that wraps the lead handler from lead.mjs.
 * Usage: node functions/dev-server.mjs
 * Listens on port 3001 (matches Vite proxy).
 */

import { createServer } from 'node:http'
import { handler } from './lead.mjs'

const PORT = parseInt(process.env.PORT || '3001', 10)

const server = createServer(async (req, res) => {
  if (req.method !== 'POST' || req.url !== '/api/lead') {
    res.writeHead(404)
    res.end(JSON.stringify({ ok: false, error: 'not_found' }))
    return
  }
  const chunks = []
  for await (const chunk of req) { chunks.push(chunk) }
  const rawBody = Buffer.concat(chunks).toString()
  const event = {
    httpMethod: req.method,
    body: rawBody,
    headers: Object.fromEntries(
      Object.entries(req.headers).map(([k, v]) => [k.toLowerCase(), Array.isArray(v) ? v.join(', ') : String(v || '')])
    ),
    requestContext: { identity: { sourceIp: req.socket.remoteAddress || '127.0.0.1' } },
  }
  const result = await handler(event)
  res.writeHead(result.statusCode, result.headers || {})
  res.end(result.body)
})

server.listen(PORT, () => {
  console.log('[dev-server] Listening on http://localhost:' + PORT)
  console.log('[dev-server] Proxied from Vite: /api -> http://localhost:' + PORT)
  if (!process.env.RECAPTCHA_SECRET) {
    console.warn('[dev-server] WARNING: RECAPTCHA_SECRET not set - reCAPTCHA verification will fail')
  }
})
