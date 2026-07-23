# ADR 0005: Environment-Aware OpenAPI Swagger Protection

## Context
Exposing interactive API documentation (Swagger) publicly in production environments reveals internal API endpoint structures, schemas, and parameters to potential malicious actors.

## Decision
- Swagger is conditionally enabled based on `SWAGGER_ENABLED=true` environment flag or when `NODE_ENV === 'development'`.
- In production environments, Swagger is disabled or protected behind Super Admin authentication.

## Consequences
- Prevents public API reconnaissance in production deployments while preserving convenient developer experience in non-production stages.
