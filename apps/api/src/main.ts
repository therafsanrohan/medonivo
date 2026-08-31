import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AuditInterceptor } from './common/interceptors/audit.interceptor';
import { validateEnv } from './config/env.config';
import type { INestApplication } from '@nestjs/common';

export function parseCorsOrigins(allowedOriginsStr?: string): (string | RegExp)[] {
  if (!allowedOriginsStr) {
    return ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'];
  }
  return allowedOriginsStr.split(',').map((origin) => origin.trim()).filter(Boolean);
}

// Cache the app instance so it's reused across serverless invocations
let cachedApp: INestApplication | null = null;

async function createApp(): Promise<INestApplication> {
  if (cachedApp) {
    return cachedApp;
  }

  validateEnv(process.env);
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log'] });

  app.enableShutdownHooks();
  app.use(helmet());

  const allowedOrigins = parseCorsOrigins(process.env.CORS_ALLOWED_ORIGINS);
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        logger.warn(`CORS blocked request from origin: ${origin}`);
        callback(new Error('CORS policy origin not allowed'));
      }
    },
    credentials: true
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    })
  );

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor(), new AuditInterceptor());

  const swaggerEnabled = process.env.SWAGGER_ENABLED === 'true' || process.env.NODE_ENV === 'development';
  if (swaggerEnabled) {
    const swaggerPath = process.env.SWAGGER_PATH || '/docs';
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Medonivo Health OS API')
      .setDescription('Multi-tenant cloud healthcare platform REST API contract & endpoints')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(swaggerPath, app, document);
    logger.log(`OpenAPI Swagger documentation available at ${swaggerPath}`);
  } else {
    logger.log('OpenAPI Swagger documentation is disabled in production environment');
  }

  await app.init();
  cachedApp = app;
  return app;
}

// Vercel serverless handler — exported for @vercel/node runtime
export default async function handler(req: unknown, res: unknown) {
  const app = await createApp();
  const expressInstance = app.getHttpAdapter().getInstance();
  return expressInstance(req, res);
}

// Standard Node.js server — runs when executed directly (local dev)
async function bootstrap() {
  const app = await createApp();
  const logger = new Logger('Bootstrap');
  const port = Number(process.env.PORT) || 4000;
  await app.listen(port);
  logger.log(`Medonivo Backend API server running on port ${port}`);
}

if (require.main === module || process.env.NODE_ENV !== 'test') {
  bootstrap();
}
