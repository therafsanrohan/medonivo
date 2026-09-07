import { envSchema, EnvSchema } from '@medonivo/validation';

export function validateEnv(config: Record<string, unknown>): EnvSchema {
  const result = envSchema.safeParse(config);
  if (!result.success) {
    console.error('FATAL: Environment validation failed on startup:', JSON.stringify(result.error.format(), null, 2));
    throw new Error('Environment validation failed. Stopping application bootstrap.');
  }
  return result.data;
}
