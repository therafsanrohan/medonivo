import { Controller, Post, Get, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PatientService } from './patient.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { TenantIsolationGuard } from '../auth/guards/tenant-isolation.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequirePermissions } from '../../common/decorators/require-permissions.decorator';
import type { UserSession } from '@medonivo/shared-types';

@ApiTags('Patient & Family Profiles')
@Controller('patient')
@UseGuards(JwtAuthGuard, PermissionsGuard, TenantIsolationGuard)
@ApiBearerAuth()
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('register')
  @RequirePermissions('patient:write')
  @ApiOperation({ summary: 'Register a new patient and automatically generate an MRN' })
  async registerPatient(
    @CurrentUser() user: UserSession,
    @Body()
    body: {
      fullName: string;
      email?: string;
      phoneNumber: string;
      dateOfBirth: string;
      gender: string;
      bloodGroup?: string;
      address?: string;
      emergencyContactName?: string;
      emergencyContactPhone?: string;
      emergencyContactRelation?: string;
    }
  ) {
    return this.patientService.registerPatient(user.tenantId || null, body);
  }

  @Get('search')
  @RequirePermissions('patient:read')
  @ApiOperation({ summary: 'Search patient directory by name, email, or phone' })
  async searchPatients(@CurrentUser() user: UserSession, @Query('q') query: string) {
    return this.patientService.searchPatients(user.tenantId || null, query);
  }

  @Get(':id')
  @RequirePermissions('patient:read')
  @ApiOperation({ summary: 'Retrieve full demographics, emergency contacts, and family relationships' })
  async getPatientProfile(@CurrentUser() user: UserSession, @Param('id') id: string) {
    return this.patientService.getPatientProfile(user.tenantId || null, id);
  }

  @Post(':id/family')
  @RequirePermissions('patient:write')
  @ApiOperation({ summary: 'Link two patient profiles with caregiver permissions' })
  async createFamilyRelationship(
    @CurrentUser() user: UserSession,
    @Param('id') patientId: string,
    @Body('relativeId') relativeId: string,
    @Body('relationshipType') relationshipType: string,
    @Body('caregiverPermissionActive') caregiverPermissionActive: boolean
  ) {
    return this.patientService.createFamilyRelationship(
      user.tenantId || null,
      patientId,
      relativeId,
      relationshipType,
      caregiverPermissionActive
    );
  }
}
