// ============================================================
// Minimal Jobber GraphQL client with durable token handling.
// Jobber ROTATES its refresh token on every refresh and invalidates
// the old one, so we cache the access token and persist the rotated
// refresh token in the token store (Upstash Redis, see tokenStore.js).
// The env var JOBBER_REFRESH_TOKEN is only the one-time seed used on
// the very first run before anything is in the store.
// ============================================================

import { kvGet, kvSetMany, kvEnabled } from "./tokenStore.js";

const JOBBER_GRAPHQL = "https://api.getjobber.com/api/graphql";
const JOBBER_TOKEN = "https://api.getjobber.com/api/oauth/token";
const API_VERSION = process.env.JOBBER_API_VERSION || "2025-01-20";

const K_ACCESS = "jobber:access_token";
const K_EXP = "jobber:access_expires_at";
const K_REFRESH = "jobber:refresh_token";

async function getAccessToken() {
  // Reuse a cached, still-valid access token (avoids a refresh on every call,
  // which would needlessly rotate the refresh token).
  if (kvEnabled) {
    const [tok, exp] = await Promise.all([kvGet(K_ACCESS), kvGet(K_EXP)]);
    if (tok && exp && Date.now() < Number(exp) - 90_000) return tok;
  }

  // Refresh. Prefer the stored (rotated) refresh token; fall back to the env seed.
  const refreshToken =
    (kvEnabled && (await kvGet(K_REFRESH))) || process.env.JOBBER_REFRESH_TOKEN;
  if (!refreshToken) throw new Error("No Jobber refresh token available");

  const res = await fetch(JOBBER_TOKEN, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: process.env.JOBBER_CLIENT_ID,
      client_secret: process.env.JOBBER_CLIENT_SECRET,
    }),
  });
  if (!res.ok) throw new Error("Jobber token refresh failed: " + (await res.text()));
  const j = await res.json();

  // Persist the rotated refresh token + access token so the next call (even on
  // a fresh cold start) keeps working. Without this, the next call dies.
  if (kvEnabled) {
    const ttlMs = (Number(j.expires_in) || 2700) * 1000; // default ~45 min
    await kvSetMany({
      [K_ACCESS]: j.access_token,
      [K_EXP]: String(Date.now() + ttlMs),
      ...(j.refresh_token ? { [K_REFRESH]: j.refresh_token } : {}),
    });
  } else {
    console.warn("Jobber token store disabled (no Upstash env). Refresh token will not persist.");
  }
  return j.access_token;
}

async function gql(token, query, variables) {
  const res = await fetch(JOBBER_GRAPHQL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-JOBBER-GRAPHQL-VERSION": API_VERSION,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error("Jobber GraphQL error: " + JSON.stringify(json.errors));
  return json.data;
}

// Create a client (lead) in Jobber and attach a note with the call context.
// Returns the new client id, or throws.
export async function createJobberLead({
  firstName, lastName, email, phone, zip, source, concern, ownsHome, system,
}) {
  const token = await getAccessToken();

  const clientMutation = `
    mutation CreateClient($input: ClientCreateInput!) {
      clientCreate(input: $input) {
        client { id }
        userErrors { message }
      }
    }`;
  const input = {
    firstName: firstName || "Website",
    lastName: lastName || "Lead",
    emails: email ? [{ description: "MAIN", primary: true, address: email }] : [],
    phones: phone ? [{ description: "MAIN", primary: true, number: phone }] : [],
    billingAddress: zip ? { postalCode: zip, country: "United States" } : undefined,
  };
  const data = await gql(token, clientMutation, { input });
  const errs = data?.clientCreate?.userErrors || [];
  if (errs.length) throw new Error("clientCreate: " + errs.map((e) => e.message).join("; "));
  const clientId = data?.clientCreate?.client?.id;

  // Attach the call-to-action note (best-effort; the client lead is what matters).
  if (clientId) {
    const noteMutation = `
      mutation CreateNote($clientId: EncodedId!, $input: ClientCreateNoteInput!) {
        clientCreateNote(clientId: $clientId, input: $input) {
          userErrors { message }
        }
      }`;
    const message =
      `FREE WATER REPORT LEAD — call to set up a quote.\n` +
      `Phone: ${phone || "n/a"}\nEmail: ${email || "n/a"}\nZip: ${zip || "n/a"}\n` +
      `Owns home: ${ownsHome || "n/a"}\nMain concern: ${concern || "n/a"}\n` +
      (system ? `Interested in: ${system}\n` : "") +
      `Source: ${source || "Website free water report"}`;
    try {
      const nd = await gql(token, noteMutation, { clientId, input: { message } });
      const ne = nd?.clientCreateNote?.userErrors || [];
      if (ne.length) console.error("clientCreateNote userErrors:", ne.map((e) => e.message).join("; "));
    } catch (e) {
      console.error("Jobber note skipped:", e.message);
    }
  }
  return clientId;
}
