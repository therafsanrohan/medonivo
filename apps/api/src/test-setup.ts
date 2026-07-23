process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://medonivo:medonivopass@127.0.0.1:5432/medonivo_db_test?schema=public';
process.env.REDIS_HOST = '127.0.0.1';
process.env.REDIS_PORT = '6379';
process.env.JWT_ACCESS_SECRET = 'test-jwt-access-secret-32-characters-long';
process.env.JWT_REFRESH_SECRET = 'test-jwt-refresh-secret-32-characters-long';
process.env.CORS_ALLOWED_ORIGINS = 'http://localhost:3000,http://localhost:3001';
