-- ====================================================================
-- SPRINT 9 & 10 MIGRATION: CAREPASS MEMBERSHIPS & E-PRESCRIPTIONS
-- ====================================================================

-- 1. CarePass Digital Pass Memberships Schema
CREATE TABLE IF NOT EXISTS billing.carepass_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES organization.tenants(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patient.patients(id) ON DELETE CASCADE,
  membership_number VARCHAR(64) UNIQUE NOT NULL,
  tier VARCHAR(32) NOT NULL DEFAULT 'Gold', -- Silver, Gold, Platinum
  included_consultations_remaining INT NOT NULL DEFAULT 4,
  diagnostic_discount_percent NUMERIC(5,2) NOT NULL DEFAULT 20.00,
  status VARCHAR(32) NOT NULL DEFAULT 'active',
  valid_until TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '1 year'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS Isolation Policies for CarePass
ALTER TABLE billing.carepass_memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY carepass_memberships_tenant_isolation ON billing.carepass_memberships
  USING (tenant_id = (current_setting('app.current_tenant_id', true))::uuid)
  WITH CHECK (tenant_id = (current_setting('app.current_tenant_id', true))::uuid);


-- 2. E-Prescriptions Schema
CREATE TABLE IF NOT EXISTS clinical.prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES organization.tenants(id) ON DELETE CASCADE,
  branch_id UUID NOT NULL REFERENCES organization.branches(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patient.patients(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES identity.staff(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES scheduling.appointments(id) ON DELETE SET NULL,
  diagnosis VARCHAR(512),
  chief_complaints TEXT,
  vitals_bp VARCHAR(32),
  vitals_pulse INT,
  vitals_weight_kg NUMERIC(5,2),
  doctor_signature VARCHAR(256),
  status VARCHAR(32) NOT NULL DEFAULT 'signed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Prescription Items
CREATE TABLE IF NOT EXISTS clinical.prescription_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prescription_id UUID NOT NULL REFERENCES clinical.prescriptions(id) ON DELETE CASCADE,
  medicine_name VARCHAR(256) NOT NULL,
  dosage VARCHAR(64) NOT NULL, -- e.g. 1+0+1
  duration VARCHAR(64) NOT NULL, -- e.g. 7 Days
  instructions VARCHAR(256), -- e.g. After meals
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS Isolation Policies for Prescriptions
ALTER TABLE clinical.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinical.prescription_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY prescriptions_tenant_isolation ON clinical.prescriptions
  USING (tenant_id = (current_setting('app.current_tenant_id', true))::uuid)
  WITH CHECK (tenant_id = (current_setting('app.current_tenant_id', true))::uuid);

CREATE POLICY prescription_items_tenant_isolation ON clinical.prescription_items
  USING (prescription_id IN (
    SELECT id FROM clinical.prescriptions WHERE tenant_id = (current_setting('app.current_tenant_id', true))::uuid
  ));
