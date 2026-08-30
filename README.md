# GoHealth

**GoHealth — One Platform, Every Health Need.**

Indonesia-first digital health access, navigation, discovery and orchestration platform.

## Production
- Vercel: https://gohealth-platform.vercel.app
- Repository: https://github.com/yusufstmrg/gohealth
- Future canonical domain: https://gohealth.id

## Stack
- Next.js App Router + React + TypeScript
- Vercel
- Neon PostgreSQL
- Server-side sessions + bcrypt
- Optional server-side OpenAI integration
- Playwright
- GitHub Actions

## Core modules
Identity, service discovery, provider network, booking/journey, family health, personal health notes, Blood Access, emergency guidance, Health Hub, partner applications, notifications, admin operations and GoHealth AI navigation.

## Master engineering document
Read **docs/GOHEALTH_MASTER_ARCHITECTURE_DEVELOPMENT_STANDARD.md** before changing the system. It is the canonical rebuild, security, QA, deployment and development standard.

## Environment
- DATABASE_URL
- OPENAI_API_KEY
- OPENAI_MODEL (optional)
- NEXT_PUBLIC_APP_URL
- GOHEALTH_ADMIN_EMAIL

Never commit secrets or real patient/health data.

## QA
```
npm install
npm run typecheck
npm run build
npm run e2e
```

## Production boundary
A successful Vercel deployment does not by itself establish regulatory approval, clinical partner verification, blood inventory verification, emergency dispatch capability, insurance processing, or official interoperability. Those capabilities require verified partners and Indonesian legal, privacy, security and clinical governance.

Demo data is explicitly labelled and must never be presented as real provider availability or clinical inventory.
