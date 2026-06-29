// ============================================================
// Durable key-value store backed by Upstash Redis (REST API).
// Used to persist Jobber's rotating OAuth tokens across serverless
// cold starts. Works with either Upstash-native env vars or the
// Vercel KV (KV_REST_API_*) names the integration may inject.
// ============================================================

const URL =
  process.env.UPSTASH_REDIS_REST_URL ||
  process.env.KV_REST_API_URL ||
  "";
const TOKEN =
  process.env.UPSTASH_REDIS_REST_TOKEN ||
  process.env.KV_REST_API_TOKEN ||
  "";

export const kvEnabled = Boolean(URL && TOKEN);

// Run a single Redis command, e.g. ["GET","key"] or ["SET","key","val"].
async function cmd(args) {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });
  if (!res.ok) throw new Error("Redis " + res.status + ": " + (await res.text()));
  const json = await res.json();
  return json.result;
}

export async function kvGet(key) {
  if (!kvEnabled) return null;
  return cmd(["GET", key]);
}

export async function kvSet(key, value) {
  if (!kvEnabled) return null;
  return cmd(["SET", key, String(value)]);
}

// Set several keys; returns when all are written.
export async function kvSetMany(pairs) {
  if (!kvEnabled) return null;
  await Promise.all(Object.entries(pairs).map(([k, v]) => kvSet(k, v)));
}
