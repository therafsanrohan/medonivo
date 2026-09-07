import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../../database/database.service';
import { EmailPasswordAuthInput } from '@medonivo/validation';
import * as bcrypt from 'bcrypt';
import { SystemRole } from '@medonivo/shared-types';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService
  ) {}

  async register(input: EmailPasswordAuthInput, tenantId: string | null = null) {
    const { email, password } = input;

    const existingUser = await this.db.query<{ id: string }>(
      'SELECT id FROM identity.staff WHERE user_id IN (SELECT id FROM identity.staff WHERE role = $1)',
      [email]
    );

    if (existingUser.length > 0) {
      throw new ConflictException('User already exists');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    return {
      id: 'mock-id',
      email,
      fullName: email.split('@')[0]
    };
  }

  async login(input: EmailPasswordAuthInput, tenantId: string | null = null, ipAddress?: string, userAgent?: string) {
    const { email, password } = input;

    const roles = [SystemRole.PATIENT];

    const tokens = await this.generateTokenPair({
      userId: 'mock-user-id',
      email,
      roles,
      tenantId: tenantId || undefined
    }, ipAddress, userAgent);

    return {
      ...tokens,
      user: {
        id: 'mock-user-id',
        email,
        fullName: 'Demo User',
        roles
      }
    };
  }

  async refresh(refreshToken: string, ipAddress?: string, userAgent?: string) {
    const roles = [SystemRole.PATIENT];
    const tokens = await this.generateTokenPair({
      userId: 'mock-user-id',
      roles
    }, ipAddress, userAgent);

    return tokens;
  }

  async logout(refreshToken: string) {
    return { success: true };
  }

  private async generateTokenPair(
    payload: {
      userId: string;
      email?: string;
      roles: SystemRole[];
      tenantId?: string;
      organizationId?: string;
      branchId?: string;
    },
    ipAddress?: string,
    userAgent?: string
  ) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET || 'secret'
    });

    const refreshToken = await this.jwtService.signAsync(
      {
        userId: payload.userId,
        jti: Math.random().toString(36).substring(2) + Date.now()
      },
      {
        secret: process.env.JWT_REFRESH_SECRET || 'secret'
      }
    );

    return {
      accessToken,
      refreshToken,
      expiresIn: 900
    };
  }
}
