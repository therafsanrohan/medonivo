import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BillingService } from './billing.service';

@ApiTags('Billing & Invoicing')
@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('invoices')
  @ApiOperation({ summary: 'Create a new invoice and record payment' })
  async createInvoice(@Body() data: Record<string, unknown>) {
    const tenantId = (data.tenantId as string) || 'default-tenant';
    const branchId = (data.branchId as string) || 'default-branch';
    const patientId = (data.patientId as string) || 'default-patient';
    const subtotal = Number(data.subtotal) || 0;
    const discountAmount = Number(data.discountAmount) || 0;
    const paymentMethod = (data.paymentMethod as string) || 'cash';

    return this.billingService.createInvoice(
      tenantId,
      branchId,
      patientId,
      subtotal,
      discountAmount,
      paymentMethod
    );
  }

  @Get('invoices')
  @ApiOperation({ summary: 'List all invoices for tenant' })
  async getInvoices() {
    return this.billingService.getInvoices('default-tenant');
  }

  @Get('invoices/:id')
  @ApiOperation({ summary: 'Get invoice details' })
  async getInvoiceById(@Param('id') id: string) {
    return this.billingService.getInvoiceById(id);
  }
}
