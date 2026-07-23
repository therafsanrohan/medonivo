# Security & Compliance Policy - Medonivo Health OS

## Security Architecture Controls

1. **Strict Multi-Tenant Isolation**: Every database entity includes `tenantId` and `organizationId`. Multi-tenant context is resolved directly from authenticated JWT sessions—never trusted from client query or body payloads.
2. **Normalized Role-Based Access Control (RBAC)**: Fine-grained permissions (`module:action`) are assigned to normalized roles and scoped by tenant and branch.
3. **Field Sanitization & Audit Logging**: Sensitive fields (passwords, tokens, OTPs, credentials, national identity numbers) are strictly redacted before writing to security audit logs.
4. **Environment Hardening & Helmet**: HTTP security headers (Helmet), explicit CORS origin allowlists, request throttling (`ThrottlerModule`), and request IDs (`X-Request-ID`) are enforced on API entry points.
5. **OpenAPI Protection**: OpenAPI Swagger documentation is protected and disabled in production environments.

## Vulnerability Reporting

Report security vulnerabilities directly to `security@medonivo.com`. Do not disclose security vulnerabilities publicly.
