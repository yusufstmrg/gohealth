# GoHealth — Master Architecture & Development Standard

Version: 1.0
Date: 30 August 2026
Status: Engineering Blueprint / Production Baseline
Product: GoHealth — One Platform, Every Health Need
Primary market: Indonesia
Production URL: https://gohealth-platform.vercel.app
Future canonical domain: https://gohealth.id
Repository: https://github.com/yusufstmrg/gohealth

## 1. Purpose

This document is the single technical source of truth for rebuilding, extending, auditing, or taking over GoHealth by a professional software/AI engineering team. It translates the GoHealth Master Business Plan into a practical system architecture, engineering standard, security model, release process, QA standard, and operational boundary.

GoHealth is an Indonesia-first health access, navigation, discovery and orchestration platform. It is not an autonomous diagnostic or treatment system.

## 2. Product principles

1. Access first: reduce friction between a person and an appropriate health service.
2. Navigation before automation: explain options and next steps before executing consequential actions.
3. Trust by design: every provider, service, content item and data state must have an explicit verification/status model.
4. Privacy by default: private health information is never exposed through public discovery endpoints.
5. Clinical safety: AI must not diagnose, prescribe, or create false certainty.
6. Indonesia first: Bahasa Indonesia, Indonesian healthcare workflows, local geography and local regulatory requirements.
7. Partner-ready: real providers, schedules, payments and regulated services are integrated through explicit adapters rather than hard-coded assumptions.
8. Demo data must always be visibly distinguishable from verified/connected production data.

## 3. System architecture

### 3.1 Runtime
- Frontend/application: Next.js App Router + React + TypeScript.
- Hosting/CDN/compute: Vercel.
- Source control: GitHub, repository yusufstmrg/gohealth, branch main.
- Database: Neon PostgreSQL, dedicated GoHealth Production project.
- Server-side DB driver: @neondatabase/serverless.
- Authentication: application-managed server sessions, bcrypt password hashing, httpOnly/Secure/SameSite cookies.
- AI: server-side OpenAI integration; API key must never be exposed to the browser.
- Icons/UI primitives: lucide-react plus GoHealth design system.
- QA: Playwright E2E + TypeScript/build checks.
- CI: GitHub Actions.
- Future realtime: dedicated realtime transport (e.g. Ably/Pusher or equivalent) when true event streaming is required.

### 3.2 Logical layers

Browser
  -> Next.js UI
  -> Server route handlers
  -> Domain/service layer
  -> PostgreSQL (Neon)

External adapters:
  -> AI provider
  -> verified healthcare providers
  -> booking/payment providers
  -> notification providers
  -> future interoperability/SATUSEHAT adapters
  -> future blood-bank/emergency partners

Never allow browser code to connect directly to Neon or external secret-bearing services.

## 4. Core domain modules

### Identity & account
- registration
- login/logout
- server sessions
- profile
- phone/city/basic demographic fields
- role separation
- admin access gate

### Service Discovery
- service catalog
- category
- search
- filtering
- status: live / coming_soon / unavailable
- service detail
- partner availability boundary

### Provider Network
- doctor
- clinic
- hospital
- laboratory
- future pharmacy/home-care/ambulance/insurance providers
- provider verification state
- rating/reputation
- location
- specialty
- supported services
- pricing
- demo flag

### Journey
- booking request
- journey status
- provider reference
- scheduled time
- user notes
- notifications
- cancellation/status lifecycle

### Family Health
- family member profiles
- relation
- DOB
- blood type
- future delegated access/consent model

### Personal Health Records
- private user-owned notes/records
- record type
- record date
- notes
- future file/document storage
- future consent/access logs
- future interoperability adapters

### Blood Access
- blood request board
- blood type
- units
- hospital
- city
- urgency
- status
- donor response
- demo flag
- periodic refresh baseline
- true realtime to be added through a dedicated event layer

### Emergency
- emergency education
- red-flag guidance
- immediate escalation instructions
- never claim GoHealth itself is an emergency dispatch service until verified dispatch partners and operational governance exist

### Health Hub
- article
- category
- excerpt
- reading time
- health education
- SEO-ready public content

### Partner Network
- partner application
- organization
- type
- contact
- city
- message
- status
- future onboarding/KYC/credential verification workflow

### AI Navigation
AI can:
- explain general health information
- help users formulate questions
- navigate service categories
- suggest non-clinical next steps
- summarize user-provided information
- prepare appointment checklists

AI must not:
- claim a diagnosis
- prescribe medication
- provide false certainty
- replace emergency services
- expose private health information
- infer sensitive information beyond what is necessary
- make autonomous high-impact healthcare decisions

High-risk prompts must route to safe escalation language.

## 5. Database model

Primary tables:
- users
- sessions
- services
- providers
- bookings
- family_members
- health_records
- blood_requests
- blood_responses
- notifications
- partner_applications
- articles

Required future tables before mature healthcare production:
- consents
- audit_logs
- provider_credentials
- provider_locations
- provider_service_offerings
- availability_slots
- booking_events
- payment_transactions
- refunds
- documents
- document_access_logs
- emergency_cases
- blood_inventory_snapshots
- notification_deliveries
- ai_interactions
- ai_safety_events
- data_deletion_requests
- data_export_requests
- roles
- permissions
- organizations
- organization_memberships
- integration_connections
- integration_sync_runs

Every new sensitive-data table must have:
- ownership/tenant boundary
- created_at/updated_at
- auditability
- explicit retention policy
- authorization policy
- indexing plan

## 6. API standard

All APIs must:
- validate input
- use parameterized SQL
- authenticate before private data access
- authorize resource ownership
- return stable JSON shapes
- use correct HTTP status codes
- avoid leaking stack traces/secrets
- implement rate limits for authentication, AI and high-abuse endpoints
- log operational metadata without logging health content or credentials
- support idempotency for transactional operations

Recommended route groups:
- /api/auth/*
- /api/services
- /api/providers
- /api/providers/[id]
- /api/bookings
- /api/journey
- /api/family
- /api/records
- /api/blood
- /api/notifications
- /api/partners
- /api/ai
- /api/admin
- /api/health

## 7. Authentication & authorization

Passwords:
- bcrypt
- never store plaintext
- minimum 8 characters at MVP; stronger password policy before scale

Sessions:
- random opaque token
- store only hashed token
- expiration
- Secure
- httpOnly
- SameSite
- revoke on logout
- rotate where appropriate

Authorization:
- user can read/write only their own private resources
- admin routes require explicit admin role
- organization/provider access requires organization membership and scoped permissions
- do not rely on hidden UI controls as authorization

## 8. Security baseline

Mandatory:
- HTTPS
- secure headers
- CSP review before handling real PHI
- CSRF protection for state-changing cookie-authenticated endpoints
- rate limiting
- bot/abuse protection
- input validation
- output encoding
- dependency auditing
- secret scanning
- least privilege
- encrypted backups
- audit logs
- incident response procedure

Never commit:
- DATABASE_URL
- OPENAI_API_KEY
- private credentials
- OAuth secrets
- payment secrets
- partner credentials
- real patient data

## 9. Health-data boundary

The MVP may support personal notes and demo workflows, but the following require a hardened privacy/security program before real clinical data:
- medical records
- document uploads
- provider-to-patient sharing
- delegated family access
- interoperability
- insurance claims
- real blood-bank inventory
- emergency dispatch
- clinical AI

Before real clinical operation, perform:
- Indonesian privacy/legal review
- clinical safety review
- security penetration test
- threat model
- data-flow mapping
- retention/deletion policy
- consent model
- breach response plan
- vendor/subprocessor review
- partner credential verification

## 10. Design system

Brand:
- GoHealth
- tagline: One Platform, Every Health Need
- primary visual language: premium, trustworthy, international health-tech
- attached approved GoHealth logo is the source-of-truth visual reference

UI:
- clean white surfaces
- deep navy foundation
- teal/emerald health accent
- restrained gradients
- high contrast
- large readable typography
- accessible controls
- responsive mobile-first layouts

Do not redesign the logo concept without explicit brand approval.

## 11. UX standard

Every workflow must have:
- clear entry point
- meaningful empty state
- loading state
- success state
- recoverable error state
- confirmation where irreversible
- status visibility
- mobile usability
- keyboard accessibility where applicable
- clear demo/verified/coming-soon state

No dead buttons. No fake success messages. No UI element may imply a transaction occurred unless the backend confirmed it.

## 12. QA gates

Before every production release:
1. npm install
2. npm run typecheck
3. npm run build
4. npm run e2e
5. API smoke tests
6. auth tests
7. authorization tests
8. mobile responsive check
9. accessibility smoke check
10. security header check
11. database migration check
12. production runtime error check
13. critical-path manual walkthrough

Critical paths:
- landing -> service discovery
- discovery -> provider
- provider -> booking request
- auth -> journey
- family CRUD
- health record CRUD
- blood request/response
- AI safe and unsafe prompt handling
- partner application
- admin access
- notification lifecycle

## 13. Deployment

GitHub main -> Vercel production.

Production project:
- Vercel project: gohealth-platform
- project id: prj_TH6ZWmUiKtuk2SBPCozg2ywlR9No
- team: yusufbsitumorang-4455's projects
- team id: team_eIPiophAPThOjoBmo7DntqOc
- repository: yusufstmrg/gohealth
- production URL: https://gohealth-platform.vercel.app

Canonical domain:
- gohealth.id will be attached only after the platform passes final release gates.

Environment variables:
- DATABASE_URL
- OPENAI_API_KEY
- OPENAI_MODEL (optional)
- NEXT_PUBLIC_APP_URL
- GOHEALTH_ADMIN_EMAIL

Secrets belong only in Vercel/secret manager, never in Git.

## 14. Observability

Monitor:
- deployment status
- runtime errors
- 4xx/5xx
- route latency
- database failures
- AI failure/safety events
- auth failures
- booking failures
- notification failures
- unusual abuse patterns

Use structured logs with correlation/request IDs.
Do not log passwords, session tokens, API keys or raw health information.

## 15. Release strategy

Branches:
- main = production
- feature/* = isolated work
- hotfix/* = urgent production fixes

Pull requests should contain:
- problem
- solution
- affected routes
- DB changes
- security impact
- test evidence
- rollback plan

Use small, reversible commits.

## 16. Migration standard

Never silently change production schema.
Use numbered/idempotent migrations.
For destructive migrations:
- backup
- compatibility period
- migration
- verification
- cleanup

Bootstrap SQL is acceptable for initial development only; mature production must move to versioned migrations.

## 17. Integration standard

Every external provider gets an adapter interface:
- authentication
- request mapping
- response mapping
- timeout
- retry policy
- idempotency
- observability
- error translation
- circuit breaker where appropriate

Never couple core business logic directly to one vendor.

## 18. Business-readiness definition

“100% platform ready” means:
- all implemented buttons work
- all implemented workflows persist correctly
- auth is secure
- private data is isolated
- error states are handled
- deployment is reproducible
- monitoring exists
- backups/recovery exist
- documentation exists
- demo vs production data is explicit

It does NOT mean GoHealth may legally provide regulated clinical services without required partners, licensing, governance or regulatory clearance.

## 19. Rebuild sequence for a human engineering team

Phase 1 — Foundation
- repository
- Next.js
- TypeScript
- design system
- Vercel
- Neon
- CI

Phase 2 — Core platform
- identity
- service catalog
- provider directory
- journey
- notifications

Phase 3 — Health ecosystem
- family
- records
- blood access
- emergency education
- Health Hub
- partner onboarding

Phase 4 — AI
- secure server AI gateway
- safety policy
- prompt/version management
- evaluation suite
- abuse/rate limiting
- audit events

Phase 5 — Production hardening
- migrations
- audit logs
- consent
- security testing
- observability
- backup/recovery
- accessibility
- performance

Phase 6 — External integrations
- provider schedules
- payment
- verified healthcare partners
- notifications
- blood providers
- emergency partners
- interoperability

## 20. Current engineering status

Current Vercel production deployment is READY for the current application baseline. The current application has a working platform shell, service discovery, provider directory, authentication, journey/booking request, family, health records, blood access, emergency guidance, Health Hub, partner capture, AI fallback/safety boundary, notifications and admin operations.

The platform must still be treated as a pre-clearance digital-health product for regulated workflows until the external clinical/legal/security/partner requirements in this document are completed.

## 21. Non-negotiable engineering rules

- Never claim a feature works unless tested.
- Never hide an error to make a workflow look successful.
- Never expose private health data publicly.
- Never put secrets in source code.
- Never let AI make autonomous clinical decisions.
- Never treat demo providers as real providers.
- Never treat a booking request as a confirmed appointment unless a verified provider confirms it.
- Never treat a blood request board as verified blood inventory.
- Never treat emergency guidance as emergency dispatch.
- Never ship a schema change without a migration plan.
- Never release without rollback capability.
