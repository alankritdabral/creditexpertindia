/**
 * A small per-key rate limiter for low-value, unauthenticated endpoints
 * (currently just app/api/lead-event). Mirrors lib/otpStore.ts's two-layer
 * pattern: an instant in-memory counter per server instance, backed by
 * Upstash Redis (if configured) so multiple instances share one limit.
 * Not meant for anything security-critical — the OTP routes have their own,
 * stricter cooldown.
 */

const memoryHits = new Map<string, { count: number; resetAt: number }>();

if (typeof setInterval !== "undefined") {
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [key, value] of memoryHits.entries()) {
      if (value.resetAt <= now) memoryHits.delete(key);
    }
  }, 60_000);
  timer.unref?.();
}

function getRedisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return { url, token };
}

async function runRedisCommand(command: (string | number)[]): Promise<unknown> {
  const { url, token } = getRedisConfig();
  if (!url || !token) return null;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(command),
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.result;
  } catch {
    return null;
  }
}

/**
 * Returns true if `key` (e.g. an IP address) is still under `limit` hits in
 * the current `windowSeconds` window, incrementing its count either way.
 * Fails open (allows the request) if Redis is unreachable and this is a
 * fresh server instance with no memory of the key — matching otpStore's
 * "never let a rate limiter itself take the site down" posture.
 */
export async function checkRateLimit(key: string, limit: number, windowSeconds: number): Promise<boolean> {
  const now = Date.now();
  const mem = memoryHits.get(key);
  if (mem && mem.resetAt > now) {
    mem.count += 1;
    if (mem.count > limit) return false;
  } else {
    memoryHits.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
  }

  const redisKey = `ratelimit:${key}`;
  const count = await runRedisCommand(["INCR", redisKey]);
  if (typeof count === "number") {
    if (count === 1) {
      await runRedisCommand(["EXPIRE", redisKey, windowSeconds]);
    }
    if (count > limit) return false;
  }

  return true;
}
