// @ts-nocheck
import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../../database/prisma.service';
import { REQUIRE_PERMISSIONS_KEY } from '../../../common/decorators/require-permissions.decorator';
import { RequestWithId } from '../../../common/middleware/request-id.middleware';
import { SystemRole } from '@medonivo/shared-types';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      REQUIRE_PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithId>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User context missing');
    }

    // Platform Super Admin bypasses system permission checks
    if (user.roles.includes(SystemRole.SUPER_ADMIN)) {
      return true;
    }

    // Load actual user roles and permissions scoped to user's tenant
    const userRoles = await this.prisma.userRole.findMany({
      where: {
        userId: user.userId,
        tenantId: user.tenantId || null
      },
      include: {
        role: {
          include: {
            rolePermissions: {
              include: {
                permission: true
              }
            }
          }
        }
      }
    });

    const userPermissions = new Set<string>();
    for (const ur of userRoles) {
      for (const rp of ur.role.rolePermissions) {
        userPermissions.add(rp.permission.code);
      }
    }

    const hasAllPermissions = requiredPermissions.every((perm) => userPermissions.has(perm));
    if (!hasAllPermissions) {
      throw new ForbiddenException('Insufficient permissions to access this resource');
    }

    return true;
  }
}
