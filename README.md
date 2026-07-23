# Medonivo Health OS (medonivo-platform)

The Intelligent Healthcare Platform — A multi-tenant, subscription-based cloud healthcare operating system designed for hospitals, clinics, diagnostic centers, patients, and families.

## Applications

- `apps/care` - Patient & Family Mobile/Web App (Port 3000)
- `apps/workspace` - Hospital Staff & Practitioner Operations App (Port 3001)
- `apps/control` - Medonivo Platform Super Admin Control App (Port 3002)
- `apps/api` - NestJS Modular Monolith API Server (Port 4000)
- `apps/worker` - Background Job Processor (BullMQ / Redis)

## Core Packages

- `packages/ui` - Healthcare Design System (Helvetica Neue typography, calm status colors, responsive accessible components)
- `packages/design-tokens` - Color tokens, typography, shadows, breakpoints
- `packages/shared-types` - Shared domain interfaces and enums
- `packages/validation` - Zod schemas for input validation
- `packages/auth` - Authentication & RBAC guard utilities
- `packages/contracts` - API Request/Response contracts
- `packages/api-client` - Typed HTTP client wrapper
- `packages/icons` - Minimal healthcare line icons
- `packages/testing` - Unit & integration test helpers

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Docker & Docker Compose (for PostgreSQL & Redis)

## Getting Started

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Start Docker containers (PostgreSQL & Redis):
   ```bash
   docker-compose up -d
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

4. Run database migrations:
   ```bash
   pnpm --filter @medonivo/api db:migrate
   ```

5. Start local development environment:
   ```bash
   pnpm run dev
   ```

## Development Commands

- `pnpm run build` - Build all apps and packages
- `pnpm run dev` - Run all applications in development mode
- `pnpm run lint` - Run ESLint across monorepo
- `pnpm run check-types` - Run TypeScript compiler checks
- `pnpm run test` - Run Vitest unit & integration tests

## Security & Compliance

Medonivo Health OS treats healthcare data security as a first-class requirement. Refer to [SECURITY.md](SECURITY.md) for details on multi-tenant isolation, audit logs, and security guidelines.

## License

Proprietary, All Rights Reserved.
