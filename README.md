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
