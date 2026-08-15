import { HealthController } from '../health.controller';
import { DatabaseService } from '../../../database/database.service';
import { RedisService } from '../../../redis/redis.service';

describe('HealthController Readiness', () => {
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

  it('should return ready true when services are healthy', async () => {
    const res = await controller.checkReadiness();
    expect(res.ready).toBe(true);
  });
});
