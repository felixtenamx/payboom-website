/**
 * Serverless reCAPTCHA v3 verifier + rate limiter + lead forwarder.
 * Designed for AWS Amplify Functions (Node.js 18+).
 */

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET || ''
const FORMSUBMIT_URL = process.env.FORMSUBMIT_URL || 'https://formsubmit.co/ajax/comercial@payboom.io'
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '5', 10)
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || '3600', 10) * 1000
const RECAPTCHA_THRESHOLD = parseFloat(process.env.RECAPTCHA_THRESHOLD || '0.5')

const rateLimitMap = new Map()

function rateLimit(ip) {
  const now = Date.now()
  const entries = rateLimitMap.get(ip) || []
  const filtered = entries.filter((ts) => now - ts < RATE_LIMIT_WINDOW)
  if (filtered.length >= RATE_LIMIT_MAX) { rateLimitMap.set(ip, filtered); return false }
  filtered.push(now); rateLimitMap.set(ip, filtered); return true
}

function sanitize(v, max) { return String(v || '').trim().slice(0, max) }

function json(body, status = 200) {
  return { statusCode: status, headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' }, body: JSON.stringify(body) }
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405)
  let body
  try { body = JSON.parse(event.body || '{}') } catch { return json({ ok: false, error: 'invalid_json' }, 400) }
  const token = String(body['g-recaptcha-response'] || '').trim()
  if (!token) return json({ ok: false, error: 'missing_token' }, 400)
  const ip = event.requestContext?.identity?.sourceIp || event.headers?.['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown'
  if (!rateLimit(ip)) return json({ ok: false, error: 'rate_limited' }, 429)
  if (!RECAPTCHA_SECRET) { console.error('[lead] RECAPTCHA_SECRET not set'); return json({ ok: false, error: 'server_misconfigured' }, 500) }

  let verifyRes
  try {
    const fd = new URLSearchParams()
    fd.append('secret', RECAPTCHA_SECRET); fd.append('response', token); fd.append('remoteip', ip)
    verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', { method: 'POST', body: fd })
  } catch (err) { console.error('[lead] reCAPTCHA unreachable:', err.message); return json({ ok: false, error: 'recaptcha_unavailable' }, 502) }

  let verifyJson
  try { verifyJson = await verifyRes.json() } catch { return json({ ok: false, error: 'recaptcha_bad_response' }, 502) }
  if (!verifyJson?.success) { console.error('[lead] reCAPTCHA failed:', JSON.stringify(verifyJson)); return json({ ok: false, error: 'recaptcha_failed', detail: verifyJson }, 403) }

  const score = parseFloat(verifyJson.score) || 0
  console.log('[lead] SCORE:', score, 'ACTION:', verifyJson.action || '', 'IP:', ip)
  if (score < RECAPTCHA_THRESHOLD) return json({ ok: false, error: 'low_score', score }, 403)

  const payload = {
    _subject: 'NUEVO LEAD POTENCIAL', _cc: 'sandro.haro@payboom.io', _template: 'table',
    Nombre: sanitize(body.Nombre ?? body.nombre, 100),
    Correo: sanitize(body.Correo ?? body.correo, 254),
    Telefono: sanitize(body.Telefono ?? body.telefono, 32),
    Mensaje: sanitize(body.Mensaje ?? body.mensaje, 2000),
  }

  let forwardRes
  try {
    forwardRes = await fetch(FORMSUBMIT_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(payload) })
  } catch (err) { console.error('[lead] formsubmit unreachable:', err.message); return json({ ok: false, error: 'forward_failed' }, 502) }

  let forwardJson
  try { forwardJson = await forwardRes.json() } catch { forwardJson = {} }
  return json({ ok: true, forward: forwardJson, score })
}
