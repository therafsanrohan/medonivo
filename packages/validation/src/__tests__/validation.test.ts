import { envSchema, emailPasswordAuthSchema } from '../index';

describe('Validation Schemas', () => {
  test('validates valid environment configuration', () => {
    const validEnv = {
      NODE_ENV: 'development',
      PORT: '4000',
      DATABASE_URL: 'postgresql://medonivo:medonivopass@localhost:5432/medonivo_db',
      REDIS_HOST: 'localhost',
      REDIS_PORT: '6379',
      JWT_SECRET: 'super-secret-jwt-key-medonivo-platform-dev-2026'
    };

    const parsed = envSchema.safeParse(validEnv);
    expect(parsed.success).toBe(true);
  });

  test('rejects invalid email addresses in auth schema', () => {
    const invalidAuth = {
      email: 'not-an-email',
      password: '123'
    };

    const parsed = emailPasswordAuthSchema.safeParse(invalidAuth);
    expect(parsed.success).toBe(false);
  });
});
