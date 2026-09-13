import { checkRateLimit, acquireIdempotencyLock, releaseIdempotencyLock } from '@/lib/requestGuard';
import { redis } from '@/lib/redis';

// Mock the Redis client
jest.mock('@/lib/redis', () => ({
  redis: {
    incr: jest.fn(),
    expire: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  },
}));

describe('Request Guard Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('checkRateLimit', () => {
    it('should allow requests under the limit', async () => {
      // Mock Redis returning 1 (first request)
      (redis!.incr as jest.Mock).mockResolvedValue(1);
      
      const result = await checkRateLimit('test-ip', 5, 60);
      
      expect(redis!.incr).toHaveBeenCalledWith('test-ip');
      expect(redis!.expire).toHaveBeenCalledWith('test-ip', 60);
      expect(result.allowed).toBe(true);
    });

    it('should block requests over the limit', async () => {
      // Mock Redis returning 6 (limit is 5)
      (redis!.incr as jest.Mock).mockResolvedValue(6);
      
      const result = await checkRateLimit('test-ip', 5, 60);
      
      expect(result.allowed).toBe(false);
      expect(result.reason).toBe('Rate limit exceeded');
    });
  });

  describe('acquireIdempotencyLock', () => {
    it('should acquire lock if key does not exist', async () => {
      (redis!.set as jest.Mock).mockResolvedValue('OK');
      
      const locked = await acquireIdempotencyLock('idem-123', 30);
      
      expect(redis!.set).toHaveBeenCalledWith('idem-123', 'PROCESSING', {
        nx: true,
        ex: 30,
      });
      expect(locked).toBe(true);
    });

    it('should fail to acquire lock if key already exists', async () => {
      (redis!.set as jest.Mock).mockResolvedValue(null);
      
      const locked = await acquireIdempotencyLock('idem-123', 30);
      
      expect(locked).toBe(false);
    });
  });
});
