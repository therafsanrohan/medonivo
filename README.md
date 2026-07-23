# Medonivo Health OS (medonivo-platform)

The Intelligent Healthcare Platform — A multi-tenant, subscription-based cloud healthcare operating system designed for hospitals, clinics, diagnostic centers, patients, and families.

## Branch & Phase Status

Current Active Branch: `chore/foundation-hardening` (Foundation Hardening & Architecture Cleanup Phase)

## Monorepo Layout

- `apps/care` - Patient & Family Mobile/Web App (Port 3000)
- `apps/workspace` - Hospital Staff & Practitioner Operations Workspace (Port 3001)
- `apps/control` - Medonivo Platform Super Admin Control App (Port 3002)
- `apps/api` - NestJS Modular Monolith API Server (Port 4000)
- `apps/worker` - Background Job Processor (BullMQ / Redis)

## Core Packages

- `packages/ui` - Healthcare Design System Components
- `packages/design-tokens` - Color tokens, typography, shadows, breakpoints
- `packages/icons` - Minimal healthcare line icons
- `packages/shared-types` - Shared domain interfaces & enums
- `packages/validation` - Zod schemas for input & environment validation
- `packages/auth` - Authentication & normalized RBAC guard utilities
- `packages/contracts` - API Request/Response contracts
- `packages/api-client` - Typed HTTP client wrapper
- `packages/testing` - Unit & integration test helpers

## Architecture Decision Records (ADRs)

Key architectural decisions are documented in `docs/decisions/`:
- [ADR 0001: Modular Monolith Architecture](docs/decisions/0001-modular-monolith.md)
- [ADR 0002: Monorepo Structure with Turborepo & pnpm](docs/decisions/0002-monorepo-structure.md)
- [ADR 0003: Normalized Role-Based Access Control (RBAC) Schema](docs/decisions/0003-normalized-rbac.md)
- [ADR 0004: Multi-Tenant Data Isolation Strategy](docs/decisions/0004-tenant-isolation.md)
- [ADR 0005: Environment-Aware OpenAPI Swagger Protection](docs/decisions/0005-environment-swagger.md)
- [ADR 0006: Append-Only Architectural Policy for Clinical & Financial Records](docs/decisions/0006-append-only-records.md)

## Getting Started

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Start Docker containers (PostgreSQL & Redis):
   ```bash
   docker-compose up -d
   ```

3. Generate Prisma ORM database client:
   ```bash
   pnpm --filter @medonivo/api db:generate
   ```

4. Start local development environment:
   ```bash
   pnpm run dev
   ```

## Development Commands

- `pnpm run check-types` - Run TypeScript compiler checks across monorepo
- `pnpm run lint` - Run ESLint across all apps and packages
- `pnpm run test` - Run unit & integration test suite
- `pnpm run build` - Build all applications and packages

## Licensing

Proprietary, All Rights Reserved. See [LICENSE](LICENSE) for details.
