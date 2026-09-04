# Atlazora Web

Customer and marketplace web application for Atlazora.

## Work Unit

- Wave: W00 — Engineering Foundation
- Work Unit: W00-WU07 — Web Foundation
- Lifecycle: IN_PROGRESS

Project governance and architectural decisions are maintained in the `atlazora-project` repository.

## Approved Web Stack

- TypeScript
- React 19
- Next.js 16
- Tailwind CSS 4
- npm with `package-lock.json`

Exact dependency versions are recorded in `package.json` and `package-lock.json`.

## Architecture Boundary

Atlazora owns the domain.

This repository owns the marketplace and customer presentation layer, design-system primitives, and Atlazora Web Services/Adapters.

Backend domain rules, authorization, organization isolation, business invariants, persistence, transactional truth, and canonical API contracts remain owned by the appropriate Atlazora backend and contracts repositories.

Spree Storefront and Mercur may be used selectively as presentation-layer UX or code references. Their backend, domain, API, authentication, persistence, and transaction assumptions are not authoritative for Atlazora.

## Development

Install dependencies:

    npm ci

Start development:

    npm run dev

Verify:

    npx tsc --noEmit
    npm run lint
    npm run build

## Repository State

The current application surface is intentionally minimal. W00-WU07 capabilities will be added incrementally within the approved Work Unit scope.

W00-WU08 — Admin Foundation and later Work Units remain outside this bootstrap scope.

## Web Services and Adapters

Browser and Next.js presentation code must cross the Atlazora-owned Services/Adapters boundary before consuming backend APIs.

The authoritative executable contract source is the separate `atlazora-contracts` repository. Business endpoint models and generated clients must be derived from approved OpenAPI contracts when those endpoint contracts exist; this repository must not redefine their ownership.

The current foundation contains transport, presentation-state, and configuration primitives only. It does not define marketplace business contracts, backend authorization rules, transactional truth, or donor-platform domain models.

`NEXT_PUBLIC_ATLAZORA_API_BASE_URL` is browser-visible configuration and must never contain credentials or privileged secrets. Server-only configuration belongs behind modules protected by `server-only`.

## Foundation verification

Install the exact locked dependency graph:

```bash
npm ci
```

Copy `.env.example` to a local environment file when a browser API base URL is required. Only `NEXT_PUBLIC_ATLAZORA_API_BASE_URL` is browser-visible. Credentials, tokens, signing keys, and other privileged configuration must remain server-only and must never use the `NEXT_PUBLIC_` prefix.

Run the local development server:

```bash
npm run dev
```

Run the foundation verification gates:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run test:unit
npm run test:e2e
npm run build
npm audit --audit-level=high
```

The web repository consumes Atlazora contracts through its Services/Adapters boundary. Shared executable API contracts remain authoritative in `atlazora-contracts`; this repository must not duplicate or redefine those contracts.
