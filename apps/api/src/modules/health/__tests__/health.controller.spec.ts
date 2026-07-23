import { HealthController } from '../health.controller';
import { PrismaService } from '../../../database/prisma.service';
import { RedisService } from '../../../redis/redis.service';

describe('HealthController', () => {
  let controller: HealthController;
  let mockPrisma: Partial<PrismaService>;
  let mockRedis: Partial<RedisService>;

  beforeEach(() => {
    mockPrisma = {
      $queryRaw: jest.fn().mockResolvedValue([{ 1: 1 }])
    };
    mockRedis = {
      getClient: jest.fn().mockReturnValue({
        ping: jest.fn().mockResolvedValue('PONG')
      } as any)
    };

    controller = new HealthController(
      mockPrisma as PrismaService,
      mockRedis as RedisService
    );
  });

  it('returns ok status when db and redis are healthy', async () => {
    const result = await controller.check();
    expect(result.status).toBe('ok');
    expect(result.services.database).toBe(true);
    expect(result.services.redis).toBe(true);
  });
});
