BEGIN;
CREATE EXTENSION IF NOT EXISTS pgtap;

SELECT plan(2);

-- Setup test data
INSERT INTO organization.tenants (id, name, domain) VALUES ('00000000-0000-0000-0000-000000000001', 'Test Hospital A', 'test-a.medonivo.com');
INSERT INTO organization.tenants (id, name, domain) VALUES ('00000000-0000-0000-0000-000000000002', 'Test Hospital B', 'test-b.medonivo.com');

-- Act as a connection from tenant A
SET local app.current_tenant_id = '00000000-0000-0000-0000-000000000001';

-- Test 1: We can see Tenant A
SELECT results_eq(
    'SELECT name FROM organization.tenants',
    ARRAY['Test Hospital A'],
    'Tenant A can only see its own tenant record'
);

-- Test 2: We cannot see Tenant B
SET local app.current_tenant_id = '00000000-0000-0000-0000-000000000002';

SELECT results_eq(
    'SELECT name FROM organization.tenants',
    ARRAY['Test Hospital B'],
    'Tenant B can only see its own tenant record'
);

SELECT * FROM finish();
ROLLBACK;
