import express from 'express'

const app = express()
const PORT = process.env.PORT || 3001

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET || ''
const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/comercial@payboom.io'
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '60', 10)
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || '3600', 10)

const rateLimitMap = new Map()

function getRateLimit(ip) {
  const now = Date.now()
  const entries = rateLimitMap.get(ip) || []
  const filtered = entries.filter(ts => now - ts < RATE_LIMIT_WINDOW * 1000)
  rateLimitMap.set(ip, filtered)
  return { allowed: filtered.length < RATE_LIMIT_MAX, count: filtered.length }
}

function recordRateLimit(ip) {
  const now = Date.now()
  const entries = rateLimitMap.get(ip) || []
  entries.push(now)
  rateLimitMap.set(ip, entries)
}

function s(v, max) {
  return String(v || '').trim().slice(0, max)
}

app.use(express.json())

app.post('/api/lead', async (req, res) => {
  try {
    const body = req.body || {}

    // Rate limit
    const ip = req.ip || req.socket?.remoteAddress || 'unknown'
    const rl = getRateLimit(ip)
    if (!rl.allowed) {
      return res.status(429).json({ ok: false, error: 'rate_limited' })
    }

    // reCAPTCHA verification
    const token = String(body['g-recaptcha-response'] || '').trim()
    if (!token) {
      return res.status(400).json({ ok: false, error: 'missing_token' })
    }

    if (!RECAPTCHA_SECRET) {
      return res.status(500).json({ ok: false, error: 'server_misconfigured', detail: 'RECAPTCHA_SECRET missing' })
    }

    const formData = new URLSearchParams()
    formData.append('secret', RECAPTCHA_SECRET)
    formData.append('response', token)
    formData.append('remoteip', ip)

    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: formData,
    })

    const verifyJson = await verifyRes.json()
    if (!verifyJson?.success) {
      console.error(`[recaptcha] INVALID:`, JSON.stringify(verifyJson))
      return res.status(403).json({ ok: false, error: 'recaptcha_failed', detail: verifyJson })
    }

    const score = parseFloat(verifyJson.score) || 0
    console.log(`[recaptcha] SCORE: ${score} ACTION: ${verifyJson.action || ''} IP: ${ip}`)

    if (score < 0.5) {
      return res.status(403).json({ ok: false, error: 'low_score', score })
    }

    recordRateLimit(ip)

    // Forward to formsubmit.co
    const payload = {
      _subject: 'NUEVO LEAD POTENCIAL',
      _cc: 'sandro.haro@payboom.io',
      _template: 'table',
      Nombre: s(body.Nombre ?? body.nombre, 100),
      Correo: s(body.Correo ?? body.correo, 254),
      Telefono: s(body.Telefono ?? body.telefono, 32),
      Mensaje: s(body.Mensaje ?? body.mensaje, 2000),
    }

    const forwardRes = await fetch(FORMSUBMIT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload),
    })

    const forwardJson = await forwardRes.json().catch(() => ({}))
    return res.status(200).json({ ok: true, forward: forwardJson, score })
  } catch (err) {
    console.error('[lead] error:', err)
    return res.status(500).json({ ok: false, error: 'internal_error' })
  }
})

app.listen(PORT, () => {
  console.log(`[server] Listening on port ${PORT}`)
})