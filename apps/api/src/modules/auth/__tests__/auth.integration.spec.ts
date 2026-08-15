import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../../app.module';
import { PrismaService } from '../../../database/prisma.service';
import { SystemRole } from '@medonivo/shared-types';

describe('Authentication & Access Control (Integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  const testEmail = 'pat_integration_test@medonivo.com';
  const testPassword = 'securepassword123';
  let accessToken: string;
  let refreshToken: string;

  beforeAll(async () => {
    // Setup environment variables for test execution
    process.env.JWT_ACCESS_SECRET = 'test-jwt-access-token-key-2026-min-32-chars';
    process.env.JWT_REFRESH_SECRET = 'test-jwt-refresh-token-key-2026-min-32-chars';
    process.env.JWT_ACCESS_EXPIRATION = '15m';
    process.env.JWT_REFRESH_EXPIRATION = '7d';

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

    // Clean any prior test user records
    await prisma.session.deleteMany({ where: { user: { email: testEmail } } });
    await prisma.passwordCredential.deleteMany({ where: { user: { email: testEmail } } });
    await prisma.userRole.deleteMany({ where: { user: { email: testEmail } } });
    await prisma.user.deleteMany({ where: { email: testEmail } });

    // Seed the PATIENT and SUPER_ADMIN roles if not already seeded
    await prisma.role.upsert({
      where: { code: SystemRole.PATIENT },
      update: {},
      create: { code: SystemRole.PATIENT, name: 'Patient / Family', isSystemRole: true }
    });
    await prisma.role.upsert({
      where: { code: SystemRole.SUPER_ADMIN },
      update: {},
      create: { code: SystemRole.SUPER_ADMIN, name: 'Super Admin', isSystemRole: true }
    });
  });

  afterAll(async () => {
    // Clean up created records
    await prisma.session.deleteMany({ where: { user: { email: testEmail } } });
    await prisma.passwordCredential.deleteMany({ where: { user: { email: testEmail } } });
    await prisma.userRole.deleteMany({ where: { user: { email: testEmail } } });
    await prisma.user.deleteMany({ where: { email: testEmail } });
    await app.close();
  });

  describe('POST /v1/auth/register', () => {
    it('successfully registers a new patient', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/auth/register')
        .send({
          email: testEmail,
          password: testPassword
        })
        .expect(201);

      expect(response.body.email).toBe(testEmail);
      expect(response.body.fullName).toBeDefined();
    });

    it('fails to register duplicate emails', async () => {
      await request(app.getHttpServer())
        .post('/v1/auth/register')
        .send({
          email: testEmail,
          password: testPassword
        })
        .expect(409); // ConflictException
    });
  });

  describe('POST /v1/auth/login', () => {
    it('successfully authenticates with valid credentials', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/auth/login')
        .send({
          email: testEmail,
          password: testPassword
        })
        .expect(200);

      expect(response.body.accessToken).toBeDefined();
      expect(response.body.refreshToken).toBeDefined();
      expect(response.body.user.email).toBe(testEmail);
      expect(response.body.user.roles).toContain(SystemRole.PATIENT);

      accessToken = response.body.accessToken;
      refreshToken = response.body.refreshToken;
    });

    it('denies access with invalid credentials', async () => {
      await request(app.getHttpServer())
        .post('/v1/auth/login')
        .send({
          email: testEmail,
          password: 'wrongpassword'
        })
        .expect(401);
    });
  });

  describe('POST /v1/auth/refresh', () => {
    it('successfully rotates tokens with a valid refresh token', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/auth/refresh')
        .send({
          refreshToken
        })
        .expect(200);

      expect(response.body.accessToken).toBeDefined();
      expect(response.body.refreshToken).toBeDefined();

      refreshToken = response.body.refreshToken; // update for logout
    });

    it('denies rotation with an invalid refresh token', async () => {
      await request(app.getHttpServer())
        .post('/v1/auth/refresh')
        .send({
          refreshToken: 'invalid-token'
        })
        .expect(401);
    });
  });

  describe('POST /v1/auth/logout', () => {
    it('successfully logs out and revokes active session', async () => {
      await request(app.getHttpServer())
        .post('/v1/auth/logout')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          refreshToken
        })
        .expect(204);
    });
  });
});
