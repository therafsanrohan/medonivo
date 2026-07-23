import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestWithId } from '../middleware/request-id.middleware';

const SENSITIVE_KEYS = new Set([
  'password',
  'passwordHash',
  'token',
  'accessToken',
  'refreshToken',
  'otpCode',
  'authorization',
  'secret',
  'nationalId'
]);

export function sanitizePayload(data: unknown): unknown {
  if (data === null || data === undefined) return data;
  if (typeof data !== 'object') return data;
  if (Array.isArray(data)) return data.map(sanitizePayload);

  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (SENSITIVE_KEYS.has(key)) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizePayload(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  private readonly logger = new Logger('SecurityAudit');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<RequestWithId>();
    const method = req.method;
    const url = req.url;
    const requestId = req.id || 'N/A';
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
          const sanitizedBody = sanitizePayload(req.body);
          this.logger.log(
            `AUDIT [req_id=${requestId}] Action: ${method} ${url} | Duration: ${duration}ms | User: ${req.user?.id || 'anonymous'} | Body: ${JSON.stringify(sanitizedBody)}`
          );
        }
      })
    );
  }
}
