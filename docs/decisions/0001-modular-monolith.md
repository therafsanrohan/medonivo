# ADR 0001: Modular Monolith Architecture

## Context
Medonivo Health OS powers complex healthcare workflows across multi-tenant hospitals, diagnostic centers, practitioners, and patient families. Distributed microservices introduce operational complexity, network latency, data consistency challenges, and deployment overhead in early and growth phases.

## Decision
We adopt a **Modular Monolith** architecture for `apps/api` using NestJS modules. Modules (`identity`, `tenants`, `organizations`, `branches`, `audit`, etc.) maintain clean domain boundaries, encapsulate data access, and communicate through explicit application service contracts.

## Consequences
- **Pros**: Simplified deployment, strong compile-time type checking, single transaction boundaries where appropriate, fast local testing.
- **Cons**: Requires strict module boundaries to prevent accidental tight coupling. Can be decomposed into microservices later if scaling demands require it.
