# GoHealth Production Status

## Implemented in code
- Vercel-linked Next.js application shell
- Neon PostgreSQL data layer and canonical schema
- User registration/login/logout with hashed passwords and server-side sessions
- Service discovery/search/filter
- Provider directory + provider detail
- Booking request persistence + My Journey + booking notification
- Account/profile editing + sign out
- Family profile storage
- Private personal health notes
- Blood Access request board with automatic live refresh
- Emergency guidance and 119 escalation messaging
- Health Hub + article routing
- Partner application capture
- GoHealth AI endpoint with emergency pre-check and safe fallback
- Protected admin operational metrics endpoint/dashboard
- Privacy/trust/medical disclaimer boundary messaging
- Security headers, robots and sitemap
- Playwright smoke suite and build/typecheck scripts

## Not represented as live regulated functionality
- No verified healthcare partner coverage yet
- No real doctor schedule availability yet
- No payment/checkout yet
- No pharmacy fulfillment yet
- No real-time blood-bank inventory
- No emergency dispatch integration
- No insurance transaction workflow
- No official health-record interoperability yet
- No autonomous medical diagnosis or prescribing

## Current external setup required before a real business launch
1. Add `DATABASE_URL` from Neon project **GoHealth Production** (`small-sun-43376782`) to Vercel.
2. Add `OPENAI_API_KEY` to Vercel to enable live GoHealth AI. The app remains in deterministic safe-fallback mode without it.
3. Optionally set `OPENAI_MODEL`.
4. Set `GOHEALTH_ADMIN_EMAIL` for the internal admin dashboard.
5. Complete legal/privacy/clinical/cybersecurity review.
6. Replace all demo data with verified partner/service data.
7. Add the custom domain `gohealth.id` after release gates pass.

## Deployment verification rule
A Vercel `READY` deployment confirms the build/deployment succeeded; it does not certify regulatory readiness or third-party healthcare operations. Business launch requires both technical release gates and external clinical/regulatory/partner gates.
