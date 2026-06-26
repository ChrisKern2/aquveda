// ============================================================
// One-time Jobber OAuth helper. Run it once to get a refresh token.
//
// Prereqs:
//   1. Create a Jobber app at https://developer.getjobber.com
//   2. In the app, add this exact Redirect URI:  http://localhost:5179/callback
//   3. Give the app scopes to read/write clients and notes.
//
// Run (Node 18+):
//   JOBBER_CLIENT_ID=xxx JOBBER_CLIENT_SECRET=yyy node scripts/jobber-auth.mjs
//
// Or, if your .env already has the two values (Node 20.6+):
//   node --env-file=.env scripts/jobber-auth.mjs
//
// It prints your JOBBER_REFRESH_TOKEN. Paste that into Vercel + .env.
// ============================================================

import http from "node:http";
import crypto from "node:crypto";

const CLIENT_ID = process.env.JOBBER_CLIENT_ID;
const CLIENT_SECRET = process.env.JOBBER_CLIENT_SECRET;
const PORT = 5179;
const REDIRECT_URI =
  process.env.REDIRECT_URI || `http://localhost:${PORT}/callback`;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "\nMissing JOBBER_CLIENT_ID or JOBBER_CLIENT_SECRET.\n" +
      "Run: JOBBER_CLIENT_ID=xxx JOBBER_CLIENT_SECRET=yyy node scripts/jobber-auth.mjs\n"
  );
  process.exit(1);
}

const state = crypto.randomBytes(8).toString("hex");

const authUrl =
  "https://api.getjobber.com/api/oauth/authorize?" +
  new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    state,
  }).toString();

async function exchange(code) {
  const res = await fetch("https://api.getjobber.com/api/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
    }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error("Token exchange failed: " + text);
  return JSON.parse(text);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  if (url.pathname !== "/callback") {
    res.writeHead(404).end("Not found");
    return;
  }

  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");

  if (!code) {
    res.writeHead(400).end("No code returned. Check the app's redirect URI.");
    return;
  }
  if (returnedState !== state) {
    res.writeHead(400).end("State mismatch. Start over.");
    return;
  }

  try {
    const tokens = await exchange(code);
    res.writeHead(200, { "Content-Type": "text/html" }).end(
      "<h2>Done. You can close this tab and return to your terminal.</h2>"
    );
    console.log("\n=========================================================");
    console.log("SUCCESS. Copy this into Vercel and your local .env:\n");
    console.log("JOBBER_REFRESH_TOKEN=" + tokens.refresh_token);
    console.log("\n(access token expires; the app refreshes it automatically)");
    console.log("=========================================================\n");
    server.close();
    process.exit(0);
  } catch (err) {
    res.writeHead(500).end(String(err));
    console.error(err);
    server.close();
    process.exit(1);
  }
});

server.listen(PORT, () => {
  console.log("\nOpen this URL in your browser, then approve access:\n");
  console.log(authUrl + "\n");
  console.log("Waiting for the redirect on " + REDIRECT_URI + " ...\n");
});
