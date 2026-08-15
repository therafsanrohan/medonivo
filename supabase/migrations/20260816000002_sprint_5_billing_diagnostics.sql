-- Sprint 5: Billing, Invoicing & Diagnostic Operations Schema

CREATE SCHEMA IF NOT EXISTS billing;
CREATE SCHEMA IF NOT EXISTS diagnostics;

-- ==========================================
-- 1. Invoices Table
-- ==========================================
CREATE TABLE billing.invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES organization.tenants(id) ON DELETE CASCADE,
    branch_id UUID NOT NULL REFERENCES organization.branches(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patient.patients(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES scheduling.appointments(id),
    invoice_number TEXT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    discount_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    paid_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, partial, cancelled
    payment_method TEXT, -- cash, bkash, nagad, card, carepass_credit
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(tenant_id, invoice_number)
);

-- ==========================================
-- 2. Invoice Items Table
-- ==========================================
CREATE TABLE billing.invoice_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID NOT NULL REFERENCES billing.invoices(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    total DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- 3. Diagnostic Orders Table
-- ==========================================
CREATE TABLE diagnostics.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES organization.tenants(id) ON DELETE CASCADE,
    branch_id UUID NOT NULL REFERENCES organization.branches(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patient.patients(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES identity.staff(id),
    test_name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'pathology', -- pathology, radiology, cardiology
    status TEXT NOT NULL DEFAULT 'requested', -- requested, sample_collected, completed, cancelled
    result_summary TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- ENABLE RLS & ISOLATION POLICIES
-- ==========================================

ALTER TABLE billing.invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Invoices isolated access" ON billing.invoices AS RESTRICTIVE USING (current_setting('app.current_tenant_id', true) = tenant_id::text);

ALTER TABLE billing.invoice_items ENABLE ROW LEVEL SECURITY;

ALTER TABLE diagnostics.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Diagnostic orders isolated access" ON diagnostics.orders AS RESTRICTIVE USING (current_setting('app.current_tenant_id', true) = tenant_id::text);
