// ============================================================
// Durable key-value store backed by Redis (Vercel "Redis" / Redis Cloud
// integration, or any redis:// / rediss:// connection URL). Persists
// Jobber's rotating OAuth tokens across serverless cold starts.
// ============================================================

import Redis from "ioredis";

const REDIS_URL =
  process.env.REDIS_URL ||
  process.env.KV_URL ||
  process.env.REDIS_URI ||
  "";

export const kvEnabled = Boolean(REDIS_URL);

// Reused across warm invocations; recreated on cold start.
let client = null;
function getClient() {
  if (!client) {
    client = new Redis(REDIS_URL, {
      maxRetriesPerRequest: 2,
      connectTimeout: 8000,
      // Fail fast instead of retrying forever (which would hang the function).
      retryStrategy: (times) => (times > 2 ? null : Math.min(times * 200, 1000)),
    });
    client.on("error", (e) => console.error("Redis error:", e.message));
  }
  return client;
}

export async function kvGet(key) {
  if (!kvEnabled) return null;
  return getClient().get(key);
}

export async function kvSet(key, value) {
  if (!kvEnabled) return null;
  return getClient().set(key, String(value));
}

// Set several keys; resolves when all are written.
export async function kvSetMany(pairs) {
  if (!kvEnabled) return null;
  const c = getClient();
  await Promise.all(Object.entries(pairs).map(([k, v]) => c.set(k, String(v))));
}
