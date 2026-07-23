# Security & Compliance Policy - Medonivo Health OS

## Overview

Medonivo Health OS processes sensitive patient, medical, and financial data. Security controls are enforced at all architectural layers.

## Key Security Controls

1. **Tenant Isolation**: Every entity contains `tenantId` and `organizationId`. Context is resolved directly from authenticated JWT sessions—never trusted from client query or body payloads.
2. **Audit Logging**: Sensitive operations (patient read/write, report approval/release, payment adjustments, role escalation) generate immutable audit records.
3. **Data Protection**: Sensitive parameters (passwords, OTPs, auth tokens, medical reports, financial tokens) are strictly excluded from server logs.
4. **Least Privilege**: Role-based (RBAC) and branch-level access control are enforced on every API route and server action.

## Vulnerability Reporting

If you identify a security vulnerability, report it directly to `security@medonivo.com`. Do not create public issues for security vulnerabilities.
