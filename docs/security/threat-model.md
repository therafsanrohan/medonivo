# Threat Model: Medonivo Health OS

This document maps security boundaries, threat actors, vulnerable assets, threat vectors, and mitigation controls for the Medonivo platform.

## 1. Security Boundaries
* **Client Boundary**: Front-end applications (`care`, `workspace`, `control`) running on untrusted patient or staff devices.
* **Network Boundary**: REST API endpoints exposed to the public internet via NestJS.
* **Tenant Isolation Boundary**: Critical separation between multi-tenant database records. No tenant may access or modify data belonging to another tenant.
* **Internal Micro-service Boundary**: Worker queue processes communicating with Redis and PostgreSQL.

## 2. Threat Vector and Mitigation Matrix

| Asset | Threat Vector | Impact | Mitigation Controls |
| :--- | :--- | :--- | :--- |
| **Patient Health Records** | Cross-Tenant Data Access (Direct Object Reference) | HIPAA/Clinical integrity breach | Every controller query must resolve `tenantId` from the verified session context, not URL params. |
| **Diagnostic Reports** | Unauthorized access to unreleased reports | Privacy breach, confusion | Reports status must be `RELEASED` before showing to patients or family caregivers. |
| **Billing & Payments** | Transaction value tampering / double refunds | Financial loss to hospital | Authoritative financial arithmetic is performed on the backend using integer minor units; gateway responses require signature checks and idempotency keys. |
| **User Access** | Privilege escalation | Compromise of tenant controls | System roles are immutable. Changes in role assignments are checked against the calling user's permissions and logged in the audit ledger. |
| **Audit Logs** | Audit trail erasure or mutation | Inability to perform post-incident audits | The audit log table is append-only. No UPDATE or DELETE mutations are exposed or allowed on the `AuditLog` model. |
| **Super Admin Panel** | Unauthorized access | System-wide compromise | Invitation-only access, mandatory MFA, and session rate-limiting. |
