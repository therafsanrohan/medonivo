import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { QueueModule } from './modules/queue/queue.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './redis/redis.module';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { PatientModule } from './modules/patient/patient.module';
import { BillingModule } from './modules/billing/billing.module';
import { DiagnosticsModule } from './modules/diagnostics/diagnostics.module';
import { CarePassModule } from './modules/carepass/carepass.module';
import { PrescriptionModule } from './modules/prescription/prescription.module';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';

@Module({
  imports: [
    QueueModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100
    }]),
    DatabaseModule,
    RedisModule,
    HealthModule,
    AuthModule,
    OrganizationModule,
    PatientModule,
    BillingModule,
    DiagnosticsModule,
    CarePassModule,
    PrescriptionModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
