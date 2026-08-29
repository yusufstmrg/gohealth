# GoHealth
**Indonesia's Digital Health Ecosystem** — *One Platform, Every Health Need.*

## Production architecture
- Next.js App Router on Vercel
- Neon PostgreSQL
- Server-side httpOnly session cookie
- bcrypt password hashing
- Server-side API routes with parameterized SQL
- GoHealth AI via OpenAI API when `OPENAI_API_KEY` is configured, with safe deterministic fallback when it is not
- Demo provider/service/article/blood data is clearly labelled until official partners are connected

## Required Vercel environment variables
`DATABASE_URL` = Neon connection string for project **GoHealth Production** (`small-sun-43376782`).
`OPENAI_API_KEY` = provider key for live AI.
`OPENAI_MODEL` = optional model name; defaults to `gpt-4.1-mini`.
`NEXT_PUBLIC_APP_URL` = `https://gohealth-platform.vercel.app` until `gohealth.id` is connected.
`AUTH_SECRET` = reserve for future token hardening.

The application auto-initializes its schema on the first database-backed request. A full idempotent schema is also documented in `db/schema.sql` in the local production package.

## Important business boundary
A production-hosted platform is not automatically a legally-operational clinical service. Doctor, hospital, pharmacy, lab, insurance, emergency and blood workflows require the appropriate partner authorization, credentialing, operational processes, data governance and Indonesian regulatory review before being represented as live regulated services.

## Core user flows
1. Discover services.
2. Search providers and view provider detail.
3. Authenticate and create a booking request.
4. View private My Journey bookings.
5. Manage family profiles.
6. Store private personal health notes.
7. Create and view blood requests.
8. Ask GoHealth AI for safe navigation/education.
9. Read Health Hub content.
10. Submit a partner application.
11. Review emergency guidance.

## Security posture
- Sensitive user tables are accessed only through user-scoped SQL filters.
- Passwords are hashed with bcrypt.
- Session tokens are stored hashed and delivered via httpOnly + Secure + SameSite=Lax cookies.
- No client receives `password_hash`.
- Parameterized queries are used for user input.
- Medical/AI boundaries are enforced in server-side logic.

## Release gates
Before using real clinical/patient data or marketing a regulated service as live: independent security review, privacy review, legal/compliance review, clinical governance, provider credentialing, monitoring/incident response, backups/restore validation, and real partner integration testing are required.
