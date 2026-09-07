-- Medonivo Foundation Schema Migration

-- Create logical schemas
CREATE SCHEMA IF NOT EXISTS identity;
CREATE SCHEMA IF NOT EXISTS organization;
CREATE SCHEMA IF NOT EXISTS patient;
CREATE SCHEMA IF NOT EXISTS clinical;
CREATE SCHEMA IF NOT EXISTS scheduling;
CREATE SCHEMA IF NOT EXISTS diagnostic;
CREATE SCHEMA IF NOT EXISTS finance;
CREATE SCHEMA IF NOT EXISTS membership;
CREATE SCHEMA IF NOT EXISTS subscription;
CREATE SCHEMA IF NOT EXISTS inventory;
CREATE SCHEMA IF NOT EXISTS audit;
CREATE SCHEMA IF NOT EXISTS integration;
CREATE SCHEMA IF NOT EXISTS private;

-- Grant usage on schemas to authenticated and service_role
GRANT USAGE ON SCHEMA identity, organization, patient, clinical, scheduling, diagnostic, finance, membership, subscription, inventory, audit, integration TO authenticated, service_role;

-- Prevent public access to private
REVOKE ALL ON SCHEMA private FROM PUBLIC, authenticated;
GRANT ALL ON SCHEMA private TO service_role;

-- Foundational Table: Tenants (Organizations)
CREATE TABLE organization.tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    domain TEXT UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Foundational Table: Branches
CREATE TABLE organization.branches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES organization.tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on foundational tables
ALTER TABLE organization.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization.branches ENABLE ROW LEVEL SECURITY;

-- Tenant Isolation RLS Policy (Service Role Bypass, handled in NestJS)
-- We strictly enforce that browser clients cannot bypass this.
CREATE POLICY "Tenants isolated access"
ON organization.tenants
AS RESTRICTIVE
USING (
  -- Requires proper backend verification
  current_setting('app.current_tenant_id', true) = id::text
);

CREATE POLICY "Branches isolated access"
ON organization.branches
AS RESTRICTIVE
USING (
  current_setting('app.current_tenant_id', true) = tenant_id::text
);
