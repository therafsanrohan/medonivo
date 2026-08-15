import { Controller, Get, Post, Body, Param, Headers } from '@nestjs/common';
import { PrescriptionService, CreatePrescriptionDto } from './prescription.service';

@Controller('v1/prescriptions')
export class PrescriptionController {
  constructor(private readonly rxService: PrescriptionService) {}

  @Post()
  async createPrescription(
    @Headers('x-tenant-id') tenantHeader: string,
    @Body() dto: CreatePrescriptionDto
  ) {
    const tenantId = tenantHeader || '11111111-1111-1111-1111-111111111111';
    return this.rxService.createPrescription(tenantId, dto);
  }

  @Get('patient/:patientId')
  async getPatientPrescriptions(
    @Headers('x-tenant-id') tenantHeader: string,
    @Param('patientId') patientId: string
  ) {
    const tenantId = tenantHeader || '11111111-1111-1111-1111-111111111111';
    return this.rxService.getPatientPrescriptions(tenantId, patientId);
  }
}
