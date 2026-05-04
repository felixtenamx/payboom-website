Server-side reCAPTCHA verification and lead proxy

Files
- `lead.php` — POST endpoint that verifies reCAPTCHA v3 tokens, rate-limits per IP, and forwards validated leads to formsubmit.co.
- `config.example.php` — example config/env notes.

Setup
1. Copy `config.example.php` to `config.php` or set environment variables on your host:

```bash
export RECAPTCHA_SECRET="<your-recaptcha-secret>"
export RATE_LIMIT_MAX=60
export RATE_LIMIT_WINDOW=3600
export RECAPTCHA_THRESHOLD=0.5
```

2. Place the `lead.php` file under a web-accessible folder (e.g. `/server/lead.php`) and ensure PHP can write to the folder (for log and rate-limit file).

3. Test locally:

```bash
php -S localhost:8000 -t server
# then POST JSON to http://localhost:8000/lead.php
```

Example curl (replace token and fields):

```bash
curl -X POST http://localhost:8000/lead.php \
  -H 'Content-Type: application/json' \
  -d '{"Nombre":"Test","Correo":"t@example.com","Telefono":"","Mensaje":"hello","g-recaptcha-response":"<token>"}'
```

Notes
- The endpoint requires `RECAPTCHA_SECRET` to be set. It uses the public v3 site key on the client; the secret is used server-side for verification.
- Forwarding currently uses formsubmit.co; change `$FORMSUBMIT_URL` in `lead.php` if you want a different destination.
- Keep secrets out of the repo and use your hosting provider's environment variable feature.
