import Redis from 'ioredis';

console.info('Starting Medonivo Background Worker Processor...');

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = Number(process.env.REDIS_PORT) || 6379;

const redis = new Redis({
  host: redisHost,
  port: redisPort,
  lazyConnect: true,
  retryStrategy(times) {
    // Graceful reconnect attempts
    return Math.min(times * 100, 3000);
  }
});

export async function processNotificationJob(job: { type: string; recipient: string; message: string }) {
  console.info(`[Worker] Processing ${job.type} notification to ${job.recipient}: "${job.message}"`);
  // Simulate dispatching SMS via MFS/Telco Gateway
  return { status: 'sent', timestamp: new Date().toISOString() };
}

async function main() {
  try {
    await redis.connect();
    console.info(`Worker successfully connected to Redis instance at ${redisHost}:${redisPort}. Listening for notification queues...`);
  } catch (err) {
    console.warn('Worker notice: Redis host unreachable, running in standalone mode.');
  }
}

main();
