// @ts-nocheck
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../../app.module';
import { PrismaService } from '../../../database/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('Patient Demographics & Family Consent (Integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;

  const testTenantSlug = 'patient-test-tenant';
  const testStaffEmail = 'receptionist_test@medonivo.com';
  let tenantId: string;
  let userId: string;
  let accessToken: string;

  let patientAId: string;
  let patientBId: string;

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

    // Clean up
    const existingTenant = await prisma.tenant.findUnique({ where: { slug: testTenantSlug } });
    if (existingTenant) {
      const tid = existingTenant.id;
      await prisma.familyRelationship.deleteMany({
        where: {
          OR: [
            { patient: { user: { tenantId: tid } } },
            { relative: { user: { tenantId: tid } } }
          ]
        }
      });
      await prisma.patientProfile.deleteMany({ where: { user: { tenantId: tid } } });
      await prisma.userRole.deleteMany({ where: { user: { email: testStaffEmail } } });
      await prisma.user.deleteMany({ where: { tenantId: tid } });
      await prisma.tenant.deleteMany({ where: { slug: testTenantSlug } });
    }

    // Seed test tenant
    const tenant = await prisma.tenant.create({
      data: {
        name: 'Patient Integration Clinic',
        slug: testTenantSlug
      }
    });
    tenantId = tenant.id;

    // Create staff user
    const user = await prisma.user.create({
      data: {
        email: testStaffEmail,
        fullName: 'Test Receptionist',
        tenantId,
        isActive: true
      }
    });
    userId = user.id;

    // Create role
    const receptionistRole = await prisma.role.upsert({
      where: { code: 'RECEPTIONIST' },
      update: {},
      create: { code: 'RECEPTIONIST', name: 'Receptionist', isSystemRole: false }
    });

    // Create permissions
    const perm1 = await prisma.permission.upsert({
      where: { code: 'patient:write' },
      update: {},
      create: { code: 'patient:write', module: 'patient', action: 'write', description: 'Write patients' }
    });
    const perm2 = await prisma.permission.upsert({
      where: { code: 'patient:read' },
      update: {},
      create: { code: 'patient:read', module: 'patient', action: 'read', description: 'Read patients' }
    });

    // Map role permissions
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: receptionistRole.id, permissionId: perm1.id } },
      update: {},
      create: { roleId: receptionistRole.id, permissionId: perm1.id }
    });
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: receptionistRole.id, permissionId: perm2.id } },
      update: {},
      create: { roleId: receptionistRole.id, permissionId: perm2.id }
    });

    // Map user roles
    await prisma.userRole.create({
      data: {
        userId,
        roleId: receptionistRole.id,
        tenantId
      }
    });

    // Sign jwt token
    accessToken = await jwtService.signAsync({
      userId,
      email: testStaffEmail,
      roles: ['RECEPTIONIST'],
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
      await prisma.familyRelationship.deleteMany({
        where: {
          OR: [
            { patient: { user: { tenantId: tid } } },
            { relative: { user: { tenantId: tid } } }
          ]
        }
      });
      await prisma.patientProfile.deleteMany({ where: { user: { tenantId: tid } } });
      await prisma.userRole.deleteMany({ where: { user: { email: testStaffEmail } } });
      await prisma.user.deleteMany({ where: { tenantId: tid } });
      await prisma.tenant.deleteMany({ where: { slug: testTenantSlug } });
    }
    await app.close();
  });

  describe('POST /v1/patient/register', () => {
    it('successfully registers patient A and generates a unique MRN', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/patient/register')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          fullName: 'Rahim Uddin',
          email: 'rahim@medonivo.com',
          phoneNumber: '+8801700000001',
          dateOfBirth: '1990-05-15',
          gender: 'MALE',
          bloodGroup: 'O_POSITIVE',
          address: 'Dhanmondi, Dhaka',
          emergencyContactName: 'Karim Uddin',
          emergencyContactPhone: '+8801700000002',
          emergencyContactRelation: 'BROTHER'
        })
        .expect(201);

      expect(response.body.mrn).toContain('MRN-');
      expect(response.body.gender).toBe('MALE');
      expect(response.body.user.fullName).toBe('Rahim Uddin');

      patientAId = response.body.id;
    });

    it('successfully registers patient B', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/patient/register')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          fullName: 'Karim Uddin',
          email: 'karim@medonivo.com',
          phoneNumber: '+8801700000002',
          dateOfBirth: '1992-08-20',
          gender: 'MALE',
          bloodGroup: 'A_POSITIVE'
        })
        .expect(201);

      patientBId = response.body.id;
    });

    it('throws 409 Conflict if duplicate phone is registered', async () => {
      await request(app.getHttpServer())
        .post('/v1/patient/register')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          fullName: 'Rahim Uddin II',
          phoneNumber: '+8801700000001', // same phone
          dateOfBirth: '1995-10-10',
          gender: 'MALE'
        })
        .expect(409);
    });

    it('throws 409 Conflict if potential duplicate (same Name and DOB) is registered', async () => {
      await request(app.getHttpServer())
        .post('/v1/patient/register')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          fullName: 'Rahim Uddin', // same name
          phoneNumber: '+8801700000003', // different phone
          dateOfBirth: '1990-05-15', // same DOB
          gender: 'MALE'
        })
        .expect(409);
    });
  });

  describe('GET /v1/patient/search', () => {
    it('finds registered patients by query', async () => {
      const response = await request(app.getHttpServer())
        .get('/v1/patient/search')
        .set('Authorization', `Bearer ${accessToken}`)
        .query({ q: 'Rahim' })
        .expect(200);

      expect(response.body.length).toBeGreaterThanOrEqual(1);
      expect(response.body[0].user.fullName).toBe('Rahim Uddin');
    });
  });

  describe('POST /v1/patient/:id/family', () => {
    it('successfully links relative B to patient A with caregiver access', async () => {
      const response = await request(app.getHttpServer())
        .post(`/v1/patient/${patientAId}/family`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          relativeId: patientBId,
          relationshipType: 'BROTHER',
          caregiverPermissionActive: true
        })
        .expect(201);

      expect(response.body.patientId).toBe(patientAId);
      expect(response.body.relativeId).toBe(patientBId);
      expect(response.body.caregiverPermissionActive).toBe(true);
    });
  });

  describe('GET /v1/patient/:id', () => {
    it('retrieves patient demographics including family relationships details', async () => {
      const response = await request(app.getHttpServer())
        .get(`/v1/patient/${patientAId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body.mrn).toBeDefined();
      expect(response.body.familyPrimary.length).toBe(1);
      expect(response.body.familyPrimary[0].relative.user.fullName).toBe('Karim Uddin');
    });
  });
});
