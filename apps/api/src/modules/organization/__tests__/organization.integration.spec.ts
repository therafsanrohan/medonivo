// @ts-nocheck
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../../app.module';
import { PrismaService } from '../../../database/prisma.service';
import { SystemRole } from '@medonivo/shared-types';
import { JwtService } from '@nestjs/jwt';

describe('Organization & Facility Operations (Integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;
  
  const testTenantSlug = 'integration-tenant';
  const testStaffEmail = 'staff_org_test@medonivo.com';
  let tenantId: string;
  let userId: string;
  let accessToken: string;
  let branchId: string;

  beforeAll(async () => {
    process.env.JWT_ACCESS_SECRET = 'test-jwt-access-token-key-2026-min-32-chars';
    process.env.JWT_REFRESH_SECRET = 'test-jwt-refresh-token-key-2026-min-32-chars';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1'
    });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
    jwtService = moduleFixture.get<JwtService>(JwtService);

    // Clean up past runs
    const existingTenant = await prisma.tenant.findUnique({ where: { slug: testTenantSlug } });
    if (existingTenant) {
      const tid = existingTenant.id;
      await prisma.operatingHour.deleteMany({ where: { branch: { organization: { tenantId: tid } } } });
      await prisma.room.deleteMany({ where: { branch: { organization: { tenantId: tid } } } });
      await prisma.department.deleteMany({ where: { branch: { organization: { tenantId: tid } } } });
      await prisma.branch.deleteMany({ where: { organization: { tenantId: tid } } });
      await prisma.organization.deleteMany({ where: { tenantId: tid } });
      await prisma.service.deleteMany({ where: { tenantId: tid } });
      await prisma.staffInvitation.deleteMany({ where: { tenantId: tid } });
    }
    await prisma.userRole.deleteMany({ where: { user: { email: testStaffEmail } } });
    await prisma.user.deleteMany({ where: { email: testStaffEmail } });
    await prisma.tenant.deleteMany({ where: { slug: testTenantSlug } });

    // Seed test tenant
    const tenant = await prisma.tenant.create({
      data: {
        name: 'Integration Test Health Group',
        slug: testTenantSlug
      }
    });
    tenantId = tenant.id;

    // Create staff user
    const user = await prisma.user.create({
      data: {
        email: testStaffEmail,
        fullName: 'Facility Manager',
        tenantId,
        isActive: true
      }
    });
    userId = user.id;

    // Create manager role with necessary permissions
    const managerRole = await prisma.role.upsert({
      where: { code: 'FACILITY_MANAGER' },
      update: {},
      create: { code: 'FACILITY_MANAGER', name: 'Facility Manager', isSystemRole: false }
    });

    // Create permissions
    const perm1 = await prisma.permission.upsert({
      where: { code: 'branches:manage' },
      update: {},
      create: { code: 'branches:manage', module: 'organization', action: 'manage', description: 'Manage branches' }
    });
    const perm2 = await prisma.permission.upsert({
      where: { code: 'services:manage' },
      update: {},
      create: { code: 'services:manage', module: 'organization', action: 'manage', description: 'Manage services' }
    });
    const perm3 = await prisma.permission.upsert({
      where: { code: 'staff:invite' },
      update: {},
      create: { code: 'staff:invite', module: 'organization', action: 'invite', description: 'Invite staff' }
    });

    // Map role permissions
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: managerRole.id, permissionId: perm1.id } },
      update: {},
      create: { roleId: managerRole.id, permissionId: perm1.id }
    });
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: managerRole.id, permissionId: perm2.id } },
      update: {},
      create: { roleId: managerRole.id, permissionId: perm2.id }
    });
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: managerRole.id, permissionId: perm3.id } },
      update: {},
      create: { roleId: managerRole.id, permissionId: perm3.id }
    });

    // Map user role
    await prisma.userRole.create({
      data: {
        userId,
        roleId: managerRole.id,
        tenantId
      }
    });

    // Sign jwt token
    accessToken = await jwtService.signAsync({
      userId,
      email: testStaffEmail,
      roles: ['FACILITY_MANAGER'],
      tenantId
    }, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '1h'
    });
  });

  afterAll(async () => {
    // Cleanup
    const existingTenant = await prisma.tenant.findUnique({ where: { slug: testTenantSlug } });
    if (existingTenant) {
      const tid = existingTenant.id;
      await prisma.operatingHour.deleteMany({ where: { branch: { organization: { tenantId: tid } } } });
      await prisma.room.deleteMany({ where: { branch: { organization: { tenantId: tid } } } });
      await prisma.department.deleteMany({ where: { branch: { organization: { tenantId: tid } } } });
      await prisma.branch.deleteMany({ where: { organization: { tenantId: tid } } });
      await prisma.organization.deleteMany({ where: { tenantId: tid } });
      await prisma.service.deleteMany({ where: { tenantId: tid } });
      await prisma.staffInvitation.deleteMany({ where: { tenantId: tid } });
    }
    await prisma.userRole.deleteMany({ where: { user: { email: testStaffEmail } } });
    await prisma.user.deleteMany({ where: { email: testStaffEmail } });
    await prisma.tenant.deleteMany({ where: { slug: testTenantSlug } });
    await app.close();
  });

  describe('POST /v1/organization/branches', () => {
    it('successfully registers a branch', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/organization/branches')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'Central Dhaka Branch',
          code: 'DHAKA-01',
          address: 'Mirpur, Dhaka'
        })
        .expect(201);

      expect(response.body.code).toBe('DHAKA-01');
      expect(response.body.name).toBe('Central Dhaka Branch');
      branchId = response.body.id;
    });

    it('denies duplicate branch codes', async () => {
      await request(app.getHttpServer())
        .post('/v1/organization/branches')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'Duplicate Dhaka Branch',
          code: 'DHAKA-01'
        })
        .expect(409);
    });
  });

  describe('POST /v1/organization/branches/:branchId/rooms', () => {
    it('successfully registers a consultation chamber room', async () => {
      const response = await request(app.getHttpServer())
        .post(`/v1/organization/branches/${branchId}/rooms`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'Consultation Room 101',
          code: 'R101'
        })
        .expect(201);

      expect(response.body.code).toBe('R101');
      expect(response.body.branchId).toBe(branchId);
    });
  });

  describe('POST /v1/organization/branches/:branchId/operating-hours', () => {
    it('configures schedule limits for opening times', async () => {
      const response = await request(app.getHttpServer())
        .post(`/v1/organization/branches/${branchId}/operating-hours`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          hours: [
            { dayOfWeek: 0, openTime: '08:00', closeTime: '17:00', isClosed: false },
            { dayOfWeek: 1, openTime: '08:00', closeTime: '17:00', isClosed: false }
          ]
        })
        .expect(201);

      expect(response.body.length).toBe(2);
      expect(response.body[0].dayOfWeek).toBe(0);
      expect(response.body[0].openTime).toBe('08:00');
    });
  });

  describe('POST /v1/organization/services', () => {
    it('registers a medical diagnostic or consultation service', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/organization/services')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'General Practitioner Consultation',
          code: 'GP-CONS',
          basePrice: 50000 // 500 BDT in minor-unit paisa
        })
        .expect(201);

      expect(response.body.code).toBe('GP-CONS');
      expect(response.body.basePrice).toBe(50000);
    });
  });

  describe('POST /v1/organization/invitations', () => {
    it('issues staff invite code', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/organization/invitations')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          email: 'doctor_onboard@medonivo.com',
          roleCode: 'FACILITY_MANAGER'
        })
        .expect(201);

      expect(response.body.token).toBeDefined();
      expect(response.body.email).toBe('doctor_onboard@medonivo.com');
    });
  });
});
