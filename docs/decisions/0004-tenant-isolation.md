# ADR 0004: Multi-Tenant Data Isolation Strategy

## Context
Hospital A must never be able to view, mutate, or leak data belonging to Hospital B. Client-provided `tenantId` payload parameters are insecure and vulnerable to manipulation.

## Decision
1. All database models logically associated with a tenant include a mandatory `tenantId` field and composite indexes `@@index([tenantId, ...])`.
2. Multi-tenant context (`tenantId`, `organizationId`, `branchId`) is resolved strictly from the authenticated JWT session or verified request context—never trusted directly from unauthenticated request params or body payloads.
3. Automated integration tests explicitly test cross-tenant data access attempts to ensure requests are rejected.

## Consequences
- Prevents cross-tenant data leakage vulnerabilities at both the API and database levels.
