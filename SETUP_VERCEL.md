# GoHealth — Vercel Production Setup

## Vercel project
Project: `gohealth-platform`
GitHub: `yusufstmrg/gohealth`
Current production URL: `https://gohealth-platform.vercel.app`

## Required environment variables
Add these in **Vercel → Project → Settings → Environment Variables** for **Production, Preview and Development** as appropriate:

### DATABASE_URL (required for business workflows)
Use the pooled/serverless-safe Neon connection string for:
- Neon project: `GoHealth Production`
- Neon project ID: `small-sun-43376782`
- Database: `neondb`

Never commit this value to GitHub.

### OPENAI_API_KEY (required for live GoHealth AI)
Server-side OpenAI API key. Never expose it with a `NEXT_PUBLIC_` prefix.

### OPENAI_MODEL (optional)
Recommended value can be chosen based on the current OpenAI API/model availability. The application falls back to `gpt-4.1-mini` when omitted.

### NEXT_PUBLIC_APP_URL
Until the custom domain is connected:
`https://gohealth-platform.vercel.app`

When `gohealth.id` is ready:
`https://gohealth.id`

## Neon bootstrap
The application can initialize its core schema automatically when the first database-backed request reaches the server. The canonical schema is also stored in `db/schema.sql`.

## Business launch gates still required outside code
1. Connect and verify official healthcare partners.
2. Replace all Demo provider/service/article/blood data with verified production data.
3. Complete Indonesian legal/regulatory review per regulated service.
4. Complete clinical governance and AI safety review.
5. Complete independent security/privacy review and backup/restore testing.
6. Connect real provider availability, booking confirmation, payment, pharmacy, emergency and blood-service integrations as applicable.
7. Connect the custom domain after the platform passes the release checklist.

## Important
Vercel deployment status `READY` means the deployment built successfully. It does not mean GoHealth has regulatory approval or that third-party healthcare services are operational. The application is intentionally conservative about these boundaries.
