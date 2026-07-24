import { Controller, Post, Get, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DoctorService } from './doctor.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { TenantIsolationGuard } from '../auth/guards/tenant-isolation.guard';
import { RequirePermissions } from '../../common/decorators/require-permissions.decorator';

@ApiTags('Doctor Scheduling Operations')
@Controller('doctor')
@UseGuards(JwtAuthGuard, PermissionsGuard, TenantIsolationGuard)
@ApiBearerAuth()
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('profiles')
  @RequirePermissions('branches:manage')
  @ApiOperation({ summary: 'Register a doctor operational profile' })
  async createDoctorProfile(
    @Body('staffProfileId') staffProfileId: string,
    @Body('specialty') specialty: string,
    @Body('consultationFee') consultationFee: number,
    @Body('followUpFee') followUpFee: number,
    @Body('biography') biography?: string
  ) {
    return this.doctorService.createDoctorProfile(
      staffProfileId,
      specialty,
      consultationFee,
      followUpFee,
      biography
    );
  }

  @Post('profiles/:id/schedules')
  @RequirePermissions('branches:manage')
  @ApiOperation({ summary: 'Map a weekly availability schedule to a doctor chamber' })
  async addDoctorSchedule(
    @Param('id') doctorProfileId: string,
    @Body('dayOfWeek') dayOfWeek: number,
    @Body('startTime') startTime: string,
    @Body('endTime') endTime: string,
    @Body('slotDurationMinutes') slotDurationMinutes: number,
    @Body('roomId') roomId?: string
  ) {
    return this.doctorService.addDoctorSchedule(
      doctorProfileId,
      dayOfWeek,
      startTime,
      endTime,
      slotDurationMinutes,
      roomId
    );
  }

  @Post('profiles/:id/leaves')
  @RequirePermissions('branches:manage')
  @ApiOperation({ summary: 'Configure leave exemptions or vacation shutdowns for a doctor' })
  async addDoctorLeave(
    @Param('id') doctorProfileId: string,
    @Body('startDate') startDate: string,
    @Body('endDate') endDate: string,
    @Body('reason') reason?: string,
    @Body('isException') isException?: boolean
  ) {
    return this.doctorService.addDoctorLeave(doctorProfileId, startDate, endDate, reason, isException);
  }

  @Get('profiles/:id/slots')
  @ApiOperation({ summary: 'Generate available consult scheduling slots for a specific date' })
  async generateBookingSlots(
    @Param('id') doctorProfileId: string,
    @Query('date') date: string
  ) {
    return this.doctorService.generateBookingSlots(doctorProfileId, date);
  }
}
