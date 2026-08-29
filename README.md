# GoHealth
**Indonesia's Digital Health Ecosystem** — *One Platform, Every Health Need.*

GoHealth is an Indonesia-first digital health platform intended to simplify health access, discovery, navigation and orchestration.

## Stack
- Next.js 16 / React
- Vercel
- Neon PostgreSQL
- Server-side httpOnly sessions + bcrypt
- Optional OpenAI API for GoHealth AI
- Playwright smoke testing

## Current core workflows
- Service discovery/search/filter
- Provider discovery + provider detail
- Account registration/login/logout
- Private My Journey + booking requests
- Family profiles
- Private personal health notes
- Blood Access request board with periodic refresh
- Emergency guidance
- Health Hub + articles
- Partner application capture
- GoHealth AI with emergency guardrails + deterministic fallback
- Notifications
- Protected internal operations dashboard

## Environment
`DATABASE_URL` — Neon connection string for GoHealth Production.
`OPENAI_API_KEY` — server-side OpenAI API key; never expose it with NEXT_PUBLIC.
`OPENAI_MODEL` — optional AI model override.
`NEXT_PUBLIC_APP_URL` — current `https://gohealth-platform.vercel.app`, later `https://gohealth.id`.
`GOHEALTH_ADMIN_EMAIL` — exact email permitted to access `/admin`.

## Production boundary
A successful Vercel build does not mean regulated healthcare operations are live. Real provider schedules, pharmacy fulfillment, emergency dispatch, blood-bank inventory, insurance transactions, official health-record interoperability and clinical services require verified partners plus Indonesian legal, privacy, security and clinical review.

## Security
Private data is always queried by authenticated session user id. Passwords use bcrypt. Session tokens are random, stored hashed, and delivered through Secure/httpOnly/SameSite cookies. SQL uses parameters for user input.

## QA
- `npm install`
- `npm run typecheck`
- `npm run build`
- `npm run e2e`
