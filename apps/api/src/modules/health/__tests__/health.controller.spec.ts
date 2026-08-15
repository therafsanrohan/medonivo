import { HealthController } from '../health.controller';
import { DatabaseService } from '../../../database/database.service';
import { RedisService } from '../../../redis/redis.service';

describe('HealthController', () => {
  let controller: HealthController;
  let mockDb: Partial<DatabaseService>;
  let mockRedis: Partial<RedisService>;

  beforeEach(() => {
    mockDb = {
      query: jest.fn().mockResolvedValue([{ '?column?': 1 }])
    };
    mockRedis = {
      getClient: jest.fn().mockReturnValue({
        ping: jest.fn().mockResolvedValue('PONG')
      } as any)
    };

    controller = new HealthController(
      mockDb as DatabaseService,
      mockRedis as RedisService
    );
  });

  it('should return status ok when db and redis are alive', async () => {
    const result = await controller.check();
    expect(result.status).toBe('ok');
    expect(result.services.database).toBe(true);
    expect(result.services.redis).toBe(true);
  });
});
