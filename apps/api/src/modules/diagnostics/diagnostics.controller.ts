import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DiagnosticsService } from './diagnostics.service';

@ApiTags('Diagnostics & Lab Orders')
@Controller('diagnostics')
export class DiagnosticsController {
  constructor(private readonly diagnosticsService: DiagnosticsService) {}

  @Post('orders')
  @ApiOperation({ summary: 'Request a new diagnostic test / lab order' })
  async createOrder(@Body() data: Record<string, unknown>) {
    const tenantId = (data.tenantId as string) || 'default-tenant';
    const branchId = (data.branchId as string) || 'default-branch';
    const patientId = (data.patientId as string) || 'default-patient';
    const testName = (data.testName as string) || 'General Blood Panel';
    const category = (data.category as string) || 'pathology';

    return this.diagnosticsService.createOrder(
      tenantId,
      branchId,
      patientId,
      testName,
      category
    );
  }

  @Get('orders')
  @ApiOperation({ summary: 'List all diagnostic orders for tenant' })
  async getOrders() {
    return this.diagnosticsService.getOrders('default-tenant');
  }

  @Patch('orders/:id/status')
  @ApiOperation({ summary: 'Update diagnostic order status and upload results summary' })
  async updateStatus(
    @Param('id') id: string,
    @Body() data: Record<string, unknown>
  ) {
    const status = (data.status as string) || 'completed';
    const resultSummary = data.resultSummary as string | undefined;

    return this.diagnosticsService.updateOrderStatus(id, status, resultSummary);
  }
}
