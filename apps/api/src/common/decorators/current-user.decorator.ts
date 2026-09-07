import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserSession } from '@medonivo/shared-types';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserSession | undefined => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
