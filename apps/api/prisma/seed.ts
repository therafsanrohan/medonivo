import { PrismaClient, TenantStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Medonivo System Roles & Foundation Permissions...');

  const systemRoles = [
    { code: 'SUPER_ADMIN', name: 'Platform Super Admin', description: 'Medonivo software administrator with global access', isSystemRole: true },
    { code: 'HOSPITAL_ADMIN', name: 'Hospital Administrator', description: 'Full administrative access for hospital tenant', isSystemRole: true },
    { code: 'BRANCH_MANAGER', name: 'Branch Manager', description: 'Operational access for specific branch location', isSystemRole: true },
    { code: 'RECEPTIONIST', name: 'Receptionist', description: 'Patient registration, check-in, and queue management', isSystemRole: true },
    { code: 'DOCTOR', name: 'Medical Doctor', description: 'Consultations, clinical notes, and schedules', isSystemRole: true },
    { code: 'NURSE', name: 'Clinical Nurse', description: 'Vitals preparation and patient queue care', isSystemRole: true },
    { code: 'CASHIER', name: 'Billing Cashier', description: 'Invoice settlement and partial payment processing', isSystemRole: true },
    { code: 'PATIENT', name: 'Patient / Family', description: 'CarePass membership, appointments, and report downloads', isSystemRole: true }
  ];

  for (const roleData of systemRoles) {
    await prisma.role.upsert({
      where: { code: roleData.code },
      update: { name: roleData.name, description: roleData.description },
      create: roleData
    });
  }

  const foundationPermissions = [
    { code: 'system:health', module: 'system', action: 'read', description: 'Read system health status' },
    { code: 'tenants:manage', module: 'tenants', action: 'manage', description: 'Manage hospital SaaS tenants' },
    { code: 'branches:manage', module: 'branches', action: 'manage', description: 'Manage hospital branch locations' },
    { code: 'staff:manage', module: 'staff', action: 'manage', description: 'Manage staff profiles and branch access' },
    { code: 'audit:read', module: 'audit', action: 'read', description: 'View security audit logs' }
  ];

  for (const permData of foundationPermissions) {
    await prisma.permission.upsert({
      where: { code: permData.code },
      update: { description: permData.description },
      create: permData
    });
  }

  // Create Default Medonivo Demo Tenant for Dev Testing
  const demoTenant = await prisma.tenant.upsert({
    where: { slug: 'square-hospitals-demo' },
    update: {},
    create: {
      name: 'Square Hospitals Demo',
      slug: 'square-hospitals-demo',
      status: TenantStatus.ACTIVE
    }
  });

  console.log(`Development seed completed cleanly. Seeded demo tenant ID: ${demoTenant.id}`);
}

main()
  .catch((e) => {
    console.error('Error during database seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
