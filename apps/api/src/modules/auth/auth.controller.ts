import { Controller, Post, Body, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { emailPasswordAuthSchema, EmailPasswordAuthInput } from '@medonivo/validation';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Identity & Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new patient account' })
  async register(
    @Body(new ZodValidationPipe(emailPasswordAuthSchema)) body: EmailPasswordAuthInput
  ) {
    return this.authService.register(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password credentials' })
  async login(
    @Body(new ZodValidationPipe(emailPasswordAuthSchema)) body: EmailPasswordAuthInput,
    @Req() req: Request
  ) {
    // Check if a tenant header is passed, or default to null
    const tenantId = (req.headers['x-tenant-id'] as string) || null;
    const ipAddress = req.ip;
    const userAgent = req.headers['user-agent'];
    return this.authService.login(body, tenantId, ipAddress, userAgent);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token using refresh token rotation' })
  async refresh(
    @Body('refreshToken') refreshToken: string,
    @Req() req: Request
  ) {
    const ipAddress = req.ip;
    const userAgent = req.headers['user-agent'];
    return this.authService.refresh(refreshToken, ipAddress, userAgent);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout and revoke refresh token' })
  async logout(@Body('refreshToken') refreshToken: string) {
    await this.authService.logout(refreshToken);
  }
}
