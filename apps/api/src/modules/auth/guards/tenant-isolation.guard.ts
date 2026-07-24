import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { RequestWithId } from '../../../common/middleware/request-id.middleware';
import { SystemRole } from '@medonivo/shared-types';

@Injectable()
export class TenantIsolationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithId>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User context missing');
    }

    // Platform Super Admin is allowed to perform operations across tenants
    if (user.roles.includes(SystemRole.SUPER_ADMIN)) {
      return true;
    }

    // Extract requested tenant context from common locations
    const requestTenantId =
      request.params?.tenantId ||
      request.query?.tenantId ||
      request.body?.tenantId ||
      request.headers['x-tenant-id'];

    if (requestTenantId && requestTenantId !== user.tenantId) {
      throw new ForbiddenException('Cross-tenant data access violation');
    }

    return true;
  }
}
