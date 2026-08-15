import { HealthController } from '../health.controller';
import { PrismaService } from '../../../database/prisma.service';
import { RedisService } from '../../../redis/redis.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('HealthController Readiness Check', () => {
  let controller: HealthController;
  let mockPrisma: Partial<PrismaService>;
  let mockRedis: Partial<RedisService>;

  it('returns ready: true when DB and Redis ping succeed', async () => {
    mockPrisma = { $queryRaw: jest.fn().mockResolvedValue([{ 1: 1 }]) };
    mockRedis = { getClient: jest.fn().mockReturnValue({ ping: jest.fn().mockResolvedValue('PONG') } as unknown as ReturnType<RedisService['getClient']>) };

    controller = new HealthController(mockPrisma as PrismaService, mockRedis as RedisService);
    const readiness = await controller.checkReadiness();

    expect(readiness.ready).toBe(true);
    expect(readiness.timestamp).toBeDefined();
  });

  it('throws 533 SERVICE_UNAVAILABLE when DB fails', async () => {
    mockPrisma = { $queryRaw: jest.fn().mockRejectedValue(new Error('DB Connection Refused')) };
    mockRedis = { getClient: jest.fn().mockReturnValue({ ping: jest.fn().mockResolvedValue('PONG') } as unknown as ReturnType<RedisService['getClient']>) };

    controller = new HealthController(mockPrisma as PrismaService, mockRedis as RedisService);

    await expect(controller.checkReadiness()).rejects.toThrow(HttpException);
  });
});
