import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../../database/database.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { TenantIsolationGuard } from './guards/tenant-isolation.guard';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAuthGuard,
    PermissionsGuard,
    TenantIsolationGuard
  ],
  exports: [
    AuthService,
    JwtAuthGuard,
    PermissionsGuard,
    TenantIsolationGuard
  ]
})
export class AuthModule {}
