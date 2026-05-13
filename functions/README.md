# Payboom Amplify Function - Lead Handler

Serverless function: verify reCAPTCHA v3, rate-limit, forward to formsubmit.co.

## Local development

```bash
export RECAPTCHA_SECRET="<TU_RECAPTCHA_SECRET>"
node functions/dev-server.mjs   # port 3001
npm run dev                      # Vite on 5173, proxies /api -> 3001
```

## AWS Amplify deployment

1. Create a Function (Node.js 18+) in Amplify Studio
2. Replace handler with functions/lead.mjs content
3. Set env var RECAPTCHA_SECRET in Amplify Console -> App settings -> Environment variables
4. Add rewrite rule in amplify.yml:
   ```yaml
   customRules:
     - source: /api/lead
       target: /<function-name>
       status: '200'
   ```
5. Deploy - secret stays server-side in Lambda env vars

## Environment variables

| Variable | Required | Default |
|---|---|---|
| RECAPTCHA_SECRET | Yes | - |
| RATE_LIMIT_MAX | No | 5 |
| RATE_LIMIT_WINDOW | No | 3600 |
| RECAPTCHA_THRESHOLD | No | 0.5 |
| FORMSUBMIT_URL | No | formsubmit.co/ajax/comercial@payboom.io |

## Security

- RECAPTCHA_SECRET never exposed to client - lives only in Lambda env vars
- Rate limiting in-memory (resets on cold start). For high traffic, consider DynamoDB
- CORS set to * for simplicity; restrict in production if needed
