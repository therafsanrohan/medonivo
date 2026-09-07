import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),

  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  REDIS_HOST: z.string().default('127.0.0.1'),
  REDIS_PORT: z.coerce.number().default(6379),

  JWT_ACCESS_SECRET: z.string().min(16, 'JWT_ACCESS_SECRET must be at least 16 characters'),
  JWT_REFRESH_SECRET: z.string().min(16, 'JWT_REFRESH_SECRET must be at least 16 characters'),
  JWT_ACCESS_EXPIRATION: z.string().default('15m'),
  JWT_REFRESH_EXPIRATION: z.string().default('7d'),

  CORS_ALLOWED_ORIGINS: z.string().default('http://localhost:3000,http://localhost:3001,http://localhost:3002'),

  CARE_APP_URL: z.string().url().default('http://localhost:3000'),
  WORKSPACE_APP_URL: z.string().url().default('http://localhost:3001'),
  CONTROL_APP_URL: z.string().url().default('http://localhost:3002'),
  API_URL: z.string().url().default('http://localhost:4000'),

  SWAGGER_ENABLED: z.coerce.boolean().default(true),
  SWAGGER_PATH: z.string().default('/docs'),

  NEXT_PUBLIC_SUPABASE_URL: z.string().url('Must be a valid Supabase URL').optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'Cannot be empty').optional(),
});

export function validateEnv(env: Record<string, string | undefined>) {
  const parsed = envSchema.safeParse(env);
  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.format());
    throw new Error('Invalid environment variables');
  }
  return parsed.data;
}

export const phoneAuthSchema = z.object({
  phoneNumber: z.string().min(10, 'Valid phone number is required'),
  otpCode: z.string().length(6, 'OTP must be 6 digits').optional()
});

export const emailPasswordAuthSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export type EnvSchema = z.infer<typeof envSchema>;
export type PhoneAuthInput = z.infer<typeof phoneAuthSchema>;
export type EmailPasswordAuthInput = z.infer<typeof emailPasswordAuthSchema>;
