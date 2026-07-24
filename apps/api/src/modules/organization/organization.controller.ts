import { Controller, Post, Get, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrganizationService } from './organization.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { TenantIsolationGuard } from '../auth/guards/tenant-isolation.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequirePermissions } from '../../common/decorators/require-permissions.decorator';
import { UserSession } from '@medonivo/shared-types';

@ApiTags('Healthcare Facilities & Settings')
@Controller('organization')
@UseGuards(JwtAuthGuard, PermissionsGuard, TenantIsolationGuard)
@ApiBearerAuth()
export class OrganizationController {
  constructor(private readonly orgService: OrganizationService) {}

  @Post('branches')
  @RequirePermissions('branches:manage')
  @ApiOperation({ summary: 'Create a new healthcare facility branch' })
  async createBranch(
    @CurrentUser() user: UserSession,
    @Body('name') name: string,
    @Body('code') code: string,
    @Body('address') address?: string
  ) {
    return this.orgService.createBranch(user.tenantId!, name, code, address);
  }

  @Get('branches')
  @ApiOperation({ summary: 'Retrieve all healthcare branches under the active tenant' })
  async getBranches(@CurrentUser() user: UserSession) {
    return this.orgService.getBranches(user.tenantId!);
  }

  @Post('branches/:branchId/departments')
  @RequirePermissions('branches:manage')
  @ApiOperation({ summary: 'Create a clinical department under a branch' })
  async createDepartment(
    @CurrentUser() user: UserSession,
    @Param('branchId') branchId: string,
    @Body('name') name: string,
    @Body('code') code: string
  ) {
    return this.orgService.createDepartment(user.tenantId!, branchId, name, code);
  }

  @Post('branches/:branchId/rooms')
  @RequirePermissions('branches:manage')
  @ApiOperation({ summary: 'Create a diagnostic chamber or room under a branch' })
  async createRoom(
    @CurrentUser() user: UserSession,
    @Param('branchId') branchId: string,
    @Body('name') name: string,
    @Body('code') code: string
  ) {
    return this.orgService.createRoom(user.tenantId!, branchId, name, code);
  }

  @Post('branches/:branchId/operating-hours')
  @RequirePermissions('branches:manage')
  @ApiOperation({ summary: 'Bulk configure daily operating schedules' })
  async configureOperatingHours(
    @CurrentUser() user: UserSession,
    @Param('branchId') branchId: string,
    @Body('hours')
    hours: Array<{ dayOfWeek: number; openTime: string; closeTime: string; isClosed?: boolean }>
  ) {
    return this.orgService.configureOperatingHours(user.tenantId!, branchId, hours);
  }

  @Post('services')
  @RequirePermissions('services:manage')
  @ApiOperation({ summary: 'Register a primary consultation service' })
  async createService(
    @CurrentUser() user: UserSession,
    @Body('name') name: string,
    @Body('code') code: string,
    @Body('basePrice') basePrice: number
  ) {
    return this.orgService.createService(user.tenantId!, name, code, basePrice);
  }

  @Get('services')
  @ApiOperation({ summary: 'Retrieve all active services' })
  async getServices(@CurrentUser() user: UserSession) {
    return this.orgService.getServices(user.tenantId!);
  }

  @Post('invitations')
  @RequirePermissions('staff:invite')
  @ApiOperation({ summary: 'Issue an onboarding invitation to a staff member' })
  async inviteStaff(
    @CurrentUser() user: UserSession,
    @Body('email') email: string,
    @Body('roleCode') roleCode: string,
    @Body('phoneNumber') phoneNumber?: string
  ) {
    return this.orgService.createStaffInvitation(user.tenantId!, email, roleCode, phoneNumber);
  }
}
