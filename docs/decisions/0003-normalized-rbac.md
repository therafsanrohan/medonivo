# ADR 0003: Normalized Role-Based Access Control (RBAC) Schema

## Context
Healthcare applications require granular, audit-compliant permission management. Simple role string arrays (`roles = ["DOCTOR"]`) fail to support fine-grained permissions, custom hospital roles, branch-level access, and dynamic role privilege assignments.

## Decision
We implement a fully normalized RBAC database schema:
- `Role`: System and custom tenant roles.
- `Permission`: Fine-grained actions (`module:action`, e.g., `reports:approve`).
- `RolePermission`: Mapping table between roles and granular permissions.
- `UserRole`: Assigns roles to users scoped by `tenantId`, `organizationId`, and `branchId`.

## Consequences
- Guarantees strict privilege separation, branch scoping, and dynamic role configuration without database schema migrations.
