import { envSchema } from '../index';

describe('Environment Schema Validation', () => {
  const validEnvConfig = {
    NODE_ENV: 'development',
    PORT: '4000',
    DATABASE_URL: 'postgresql://medonivo:medonivopass@127.0.0.1:5432/medonivo_db',
    REDIS_HOST: '127.0.0.1',
    REDIS_PORT: '6379',
    JWT_ACCESS_SECRET: 'super-secret-jwt-access-token-key-2026',
    JWT_REFRESH_SECRET: 'super-secret-jwt-refresh-token-key-2026',
    JWT_ACCESS_EXPIRATION: '15m',
    JWT_REFRESH_EXPIRATION: '7d',
    CORS_ALLOWED_ORIGINS: 'http://localhost:3000,http://localhost:3001,http://localhost:3002',
    CARE_APP_URL: 'http://localhost:3000',
    WORKSPACE_APP_URL: 'http://localhost:3001',
    CONTROL_APP_URL: 'http://localhost:3002',
    API_URL: 'http://localhost:4000',
    SWAGGER_ENABLED: 'true',
    SWAGGER_PATH: '/docs'
  };

  test('accepts fully valid environment variables', () => {
    const result = envSchema.safeParse(validEnvConfig);
    expect(result.success).toBe(true);
  });

  test('fails if JWT_ACCESS_SECRET is shorter than 16 characters', () => {
    const invalidEnv = { ...validEnvConfig, JWT_ACCESS_SECRET: 'short' };
    const result = envSchema.safeParse(invalidEnv);
    expect(result.success).toBe(false);
  });

  test('fails if DATABASE_URL is missing', () => {
    const invalidEnv = { ...validEnvConfig, DATABASE_URL: '' };
    const result = envSchema.safeParse(invalidEnv);
    expect(result.success).toBe(false);
  });
});
