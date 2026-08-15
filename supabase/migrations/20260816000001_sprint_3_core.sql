-- Sprint 3: Core Medical Operations Schema
-- Defines Patients, Appointments, and Queues

-- ==========================================
-- 1. Patients Table
-- ==========================================
CREATE TABLE patient.patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES organization.tenants(id) ON DELETE CASCADE,
    mrn TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    date_of_birth DATE,
    gender TEXT,
    blood_group TEXT,
    carepass_status TEXT DEFAULT 'non-member',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(tenant_id, mrn)
);

-- ==========================================
-- 2. Staff / Doctors (Identity mapping)
-- ==========================================
CREATE TABLE identity.staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES organization.tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL, -- references auth.users in Supabase
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    role TEXT NOT NULL, -- 'doctor', 'receptionist', 'admin'
    department TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- 3. Appointments Table
-- ==========================================
CREATE TABLE scheduling.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES organization.tenants(id) ON DELETE CASCADE,
    branch_id UUID NOT NULL REFERENCES organization.branches(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patient.patients(id) ON DELETE CASCADE,
    doctor_id UUID NOT NULL REFERENCES identity.staff(id),
    appointment_time TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL DEFAULT 'scheduled', -- scheduled, checked_in, completed, cancelled
    type TEXT NOT NULL DEFAULT 'consultation', -- consultation, follow_up
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- 4. Queue Table
-- ==========================================
CREATE TABLE clinical.queues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES organization.tenants(id) ON DELETE CASCADE,
    branch_id UUID NOT NULL REFERENCES organization.branches(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patient.patients(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES identity.staff(id),
    token TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'waiting', -- waiting, in_consultation, completed
    priority INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- ENABLE RLS & ISOLATION POLICIES
-- ==========================================

ALTER TABLE patient.patients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Patients isolated access" ON patient.patients AS RESTRICTIVE USING (current_setting('app.current_tenant_id', true) = tenant_id::text);

ALTER TABLE identity.staff ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff isolated access" ON identity.staff AS RESTRICTIVE USING (current_setting('app.current_tenant_id', true) = tenant_id::text);

ALTER TABLE scheduling.appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Appointments isolated access" ON scheduling.appointments AS RESTRICTIVE USING (current_setting('app.current_tenant_id', true) = tenant_id::text);

ALTER TABLE clinical.queues ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Queues isolated access" ON clinical.queues AS RESTRICTIVE USING (current_setting('app.current_tenant_id', true) = tenant_id::text);
