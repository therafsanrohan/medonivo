import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../database/prisma.service';
import { EmailPasswordAuthInput } from '@medonivo/validation';
import * as bcrypt from 'bcrypt';
import { SystemRole } from '@medonivo/shared-types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async register(input: EmailPasswordAuthInput, tenantId: string | null = null) {
    const { email, password } = input;

    // Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email,
        tenantId
      }
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists under this workspace context');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user, password credentials, and default role (PATIENT) in a transaction
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          fullName: email.split('@')[0], // placeholder name from email
          tenantId,
          isActive: true
        }
      });

      await tx.passwordCredential.create({
        data: {
          userId: user.id,
          passwordHash,
          algorithm: 'bcrypt'
        }
      });

      // Fetch the PATIENT role
      const patientRole = await tx.role.findUnique({
        where: { code: SystemRole.PATIENT }
      });

      if (patientRole) {
        await tx.userRole.create({
          data: {
            userId: user.id,
            roleId: patientRole.id,
            tenantId
          }
        });
      }

      return {
        id: user.id,
        email: user.email,
        fullName: user.fullName
      };
    });
  }

  async login(input: EmailPasswordAuthInput, tenantId: string | null = null, ipAddress?: string, userAgent?: string) {
    const { email, password } = input;

    const user = await this.prisma.user.findFirst({
      where: {
        email,
        tenantId,
        isActive: true
      },
      include: {
        passwordCredential: true,
        userRoles: {
          include: {
            role: true
          }
        }
      }
    });

    if (!user || !user.passwordCredential) {
      // Log login failure
      await this.prisma.loginAttempt.create({
        data: {
          identifier: email,
          ipAddress,
          userAgent,
          success: false,
          failureReason: 'Invalid credentials'
        }
      });
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.passwordCredential.passwordHash);
    if (!isMatch) {
      await this.prisma.loginAttempt.create({
        data: {
          identifier: email,
          ipAddress,
          userAgent,
          success: false,
          failureReason: 'Invalid credentials'
        }
      });
      throw new UnauthorizedException('Invalid email or password');
    }

    // Log successful attempt
    await this.prisma.loginAttempt.create({
      data: {
        identifier: email,
        ipAddress,
        userAgent,
        success: true
      }
    });

    const roles = user.userRoles.map((ur) => ur.role.code as SystemRole);

    // Resolve tenant/org/branch mappings from primary userRoles entry
    const primaryRole = user.userRoles[0];
    const organizationId = primaryRole?.organizationId || undefined;
    const branchId = primaryRole?.branchId || undefined;

    // Tokens generation
    const tokens = await this.generateTokenPair({
      userId: user.id,
      email: user.email || undefined,
      roles,
      tenantId: user.tenantId || undefined,
      organizationId,
      branchId
    }, ipAddress, userAgent);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        roles
      }
    };
  }

  async refresh(refreshToken: string, ipAddress?: string, userAgent?: string) {
    const session = await this.prisma.session.findUnique({
      where: { refreshToken },
      include: {
        user: {
          include: {
            userRoles: {
              include: {
                role: true
              }
            }
          }
        }
      }
    });

    if (!session || session.revokedAt || new Date() > session.expiresAt) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = session.user;
    const roles = user.userRoles.map((ur) => ur.role.code as SystemRole);
    const primaryRole = user.userRoles[0];

    // Revoke old session token
    await this.prisma.session.update({
      where: { id: session.id },
      data: { revokedAt: new Date() }
    });

    // Generate new pair
    const tokens = await this.generateTokenPair({
      userId: user.id,
      email: user.email || undefined,
      roles,
      tenantId: user.tenantId || undefined,
      organizationId: primaryRole?.organizationId || undefined,
      branchId: primaryRole?.branchId || undefined
    }, ipAddress, userAgent);

    return tokens;
  }

  async logout(refreshToken: string) {
    try {
      await this.prisma.session.update({
        where: { refreshToken },
        data: { revokedAt: new Date() }
      });
    } catch {
      throw new NotFoundException('Session not found or already revoked');
    }
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
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: (process.env.JWT_ACCESS_EXPIRATION || '15m') as string
    });

    const refreshToken = await this.jwtService.signAsync(
      {
        userId: payload.userId,
        jti: Math.random().toString(36).substring(2) + Date.now()
      },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: (process.env.JWT_REFRESH_EXPIRATION || '7d') as string
      }
    );

    // Save refresh token record
    const expiresDays = 7;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresDays);

    await this.prisma.session.create({
      data: {
        userId: payload.userId,
        refreshToken,
        ipAddress,
        userAgent,
        expiresAt
      }
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: 900 // 15 mins in seconds
    };
  }
}
