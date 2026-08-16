import { Controller, Get, Post, Body, Param, Headers } from '@nestjs/common';
import { CarePassService } from './carepass.service';
import type { CreateCarePassDto } from './carepass.service';

@Controller('v1/carepass')
export class CarePassController {
  constructor(private readonly carePassService: CarePassService) {}

  @Get('verify/:memberNumber')
  async verifyMember(
    @Headers('x-tenant-id') tenantHeader: string,
    @Param('memberNumber') memberNumber: string
  ) {
    const tenantId = tenantHeader || '11111111-1111-1111-1111-111111111111';
    return this.carePassService.verifyMember(tenantId, memberNumber);
  }

  @Post('issue')
  async issuePass(
    @Headers('x-tenant-id') tenantHeader: string,
    @Body() dto: CreateCarePassDto
  ) {
    const tenantId = tenantHeader || '11111111-1111-1111-1111-111111111111';
    return this.carePassService.issueCarePass(tenantId, dto);
  }
}
