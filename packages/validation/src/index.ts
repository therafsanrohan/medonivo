import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().url().or(z.string().min(1)),
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().default(6379),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRATION: z.string().default('7d')
});

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
