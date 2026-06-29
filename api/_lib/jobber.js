// ============================================================
// Minimal Jobber GraphQL client.
// Refreshes an access token, then creates a lead (client) + a note.
// Requires a Jobber API app: https://developer.getjobber.com
// See FREE_REPORT_SETUP.md for the one-time setup and required scopes.
// ============================================================

const JOBBER_GRAPHQL = "https://api.getjobber.com/api/graphql";
const JOBBER_TOKEN = "https://api.getjobber.com/api/oauth/token";

// Pin to an API version your app supports (check the Jobber developer dashboard).
const API_VERSION = process.env.JOBBER_API_VERSION || "2025-01-20";

async function getAccessToken() {
  const res = await fetch(JOBBER_TOKEN, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.JOBBER_REFRESH_TOKEN,
      client_id: process.env.JOBBER_CLIENT_ID,
      client_secret: process.env.JOBBER_CLIENT_SECRET,
    }),
  });
  if (!res.ok) throw new Error("Jobber token refresh failed: " + (await res.text()));
  const json = await res.json();
  return json.access_token;
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

// Creates a client in Jobber and attaches a note with the lead context.
// Returns the new client id, or throws.
export async function createJobberLead({
  firstName, lastName, email, phone, zip, source, concern, ownsHome, inArea,
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
    billingAddress: zip
      ? { postalCode: zip, country: "United States" }
      : undefined,
  };

  const data = await gql(token, clientMutation, { input });
  const errs = data?.clientCreate?.userErrors || [];
  if (errs.length) throw new Error("clientCreate: " + errs.map((e) => e.message).join("; "));
  const clientId = data?.clientCreate?.client?.id;

  // Best-effort note. If your API version names this differently, the catch keeps the lead.
  if (clientId) {
    const noteMutation = `
      mutation CreateNote($input: ClientNoteCreateInput!) {
        clientNoteCreate(input: $input) { userErrors { message } }
      }`;
    const message =
      `Free water report lead${inArea === false ? " (OUT OF AREA)" : " (IN AREA) — call to put together the quote"}.\n` +
      `Phone: ${phone || "n/a"}\nEmail: ${email || "n/a"}\nZip: ${zip}\n` +
      `Owns home: ${ownsHome || "n/a"}\nMain concern: ${concern || "n/a"}\n` +
      `Source: ${source || "Website free report"}`;
    try {
      await gql(token, noteMutation, { input: { clientId, message } });
    } catch (e) {
      console.error("Jobber note skipped:", e.message);
    }
  }

  return clientId;
}
