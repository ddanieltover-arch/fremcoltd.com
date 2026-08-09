type RateLimitConfig = {
  limit: number;
  windowMs: number;
};

type Bucket = {
  timestamps: number[];
};

const store = new Map<string, Bucket>();
const MAX_KEYS = 5_000;

function pruneStore(now: number) {
  if (store.size <= MAX_KEYS) return;

  for (const [key, bucket] of store) {
    bucket.timestamps = bucket.timestamps.filter((ts) => now - ts < 60 * 60 * 1000);
    if (bucket.timestamps.length === 0) store.delete(key);
  }

  if (store.size <= MAX_KEYS) return;

  const overflow = store.size - MAX_KEYS;
  let removed = 0;
  for (const key of store.keys()) {
    store.delete(key);
    removed += 1;
    if (removed >= overflow) break;
  }
}

/**
 * Best-effort in-memory sliding window.
 * On multi-instance serverless (Vercel) each instance has its own store —
 * still blocks noisy bots per isolate without adding Redis.
 */
export function checkRateLimit(
  key: string,
  { limit, windowMs }: RateLimitConfig,
): { allowed: true } | { allowed: false; retryAfterMs: number } {
  const now = Date.now();
  const bucket = store.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((ts) => now - ts < windowMs);

  if (bucket.timestamps.length >= limit) {
    store.set(key, bucket);
    const oldest = bucket.timestamps[0] ?? now;
    return { allowed: false, retryAfterMs: Math.max(1_000, windowMs - (now - oldest)) };
  }

  bucket.timestamps.push(now);
  store.set(key, bucket);
  pruneStore(now);
  return { allowed: true };
}

export const FORM_RATE_LIMITS = {
  contact: { limit: 5, windowMs: 15 * 60 * 1000 },
  quote: { limit: 5, windowMs: 15 * 60 * 1000 },
  newsletter: { limit: 8, windowMs: 15 * 60 * 1000 },
} as const;

export const EMAIL_RATE_LIMIT = { limit: 3, windowMs: 60 * 60 * 1000 } as const;
