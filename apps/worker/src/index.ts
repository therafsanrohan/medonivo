import Redis from 'ioredis';

console.info('Starting Medonivo Background Worker Processor...');

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  lazyConnect: true
});

async function main() {
  try {
    await redis.connect();
    console.info('Worker successfully connected to Redis instance.');
  } catch (err) {
    console.error('Worker failed to connect to Redis:', err);
  }
}

main();
