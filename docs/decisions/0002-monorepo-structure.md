# ADR 0002: Monorepo Structure with Turborepo & pnpm

## Context
Medonivo consists of three frontend applications (`care`, `workspace`, `control`), a NestJS backend API (`api`), and a background processing worker (`worker`). Shared design tokens, UI components, contracts, types, and security guards must remain strictly synchronized.

## Decision
We adopt a **pnpm Workspaces + Turborepo** monorepo structure.

## Layout
- `apps/`: `care`, `workspace`, `control`, `api`, `worker`
- `packages/`: `ui`, `design-tokens`, `icons`, `contracts`, `api-client`, `auth`, `validation`, `shared-types`, `testing`, `eslint-config`, `typescript-config`

## Consequences
- Single lockfile ensures zero dependency version drift.
- Turborepo pipelines provide fast, cached incremental builds and linting across all packages.
