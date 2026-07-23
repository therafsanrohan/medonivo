import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PrismaService } from '../../database/prisma.service';
import { RedisService } from '../../redis/redis.service';
import { HealthCheckStatus } from '@medonivo/shared-types';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get system health status' })
  async check(): Promise<HealthCheckStatus> {
    let dbOk = false;
    let redisOk = false;

    try {
      await this.prisma.$queryRaw`SELECT 1`;
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
      version: '0.1.0-phase1',
      services: {
        database: dbOk,
        redis: redisOk
      }
    };
  }
}
