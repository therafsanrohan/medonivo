import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DatabaseService } from '../../database/database.service';
import { RedisService } from '../../redis/redis.service';
import { HealthCheckStatus } from '@medonivo/shared-types';

@ApiTags('Health & Security')
@Controller('health')
export class HealthController {
  constructor(
    private readonly db: DatabaseService,
    private readonly redis: RedisService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Liveness check' })
  async check(): Promise<HealthCheckStatus> {
    let dbOk = false;
    let redisOk = false;

    try {
      await this.db.query('SELECT 1');
      dbOk = true;
    } catch {
      dbOk = false;
    }

    try {
      const redisClient = this.redis.getClient();
      await redisClient.ping();
      redisOk = true;
    } catch {
      redisOk = false;
    }

    const isHealthy = dbOk && redisOk;

    return {
      status: isHealthy ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      version: '0.1.0-foundation',
      services: {
        database: dbOk,
        redis: redisOk
      }
    };
  }

  @Get('readiness')
  @ApiOperation({ summary: 'Readiness check for load balancer traffic readiness' })
  async checkReadiness(): Promise<{ ready: boolean; timestamp: string }> {
    try {
      await this.db.query('SELECT 1');
      await this.redis.getClient().ping();
      return {
        ready: true,
        timestamp: new Date().toISOString()
      };
    } catch (err) {
      throw new HttpException(
        {
          ready: false,
          error: 'Infrastructure service unavailable',
          timestamp: new Date().toISOString()
        },
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }
}
