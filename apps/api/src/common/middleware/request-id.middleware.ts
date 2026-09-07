import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

import { UserSession } from '@medonivo/shared-types';

export interface RequestWithId extends Request {
  id?: string;
  user?: UserSession;
}

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: RequestWithId, res: Response, next: NextFunction) {
    const existingId = req.headers['x-request-id'] as string;
    const requestId = existingId || randomUUID();
    req.id = requestId;
    res.setHeader('X-Request-ID', requestId);
    next();
  }
}
