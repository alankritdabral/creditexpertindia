import { Redis } from '@upstash/redis';

// Initialize Redis client using environment variables
// Expected env variables: UPSTASH_REDIS_REST_URL/TOKEN or KV_REST_API_URL/TOKEN
let redis: Redis | null = null;

try {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (url && token) {
    redis = new Redis({ url, token });
    console.log('Upstash Redis initialized successfully');
  } else {
    console.warn('⚠️ Upstash / Vercel KV credentials are missing.');
  }
} catch (error) {
  console.error('Error initializing Upstash Redis:', error);
}

export { redis };
