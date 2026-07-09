// ============================================================
// POST /api/meta-capi
// Meta Conversions API — server-side "Lead" event. Fired from the
// free-report form alongside the browser Pixel event, sharing one
// event_id so Meta de-duplicates the pair into a single conversion.
// Customer PII (email, phone, zip) is SHA-256 hashed before it leaves
// this server; Meta requires hashed identifiers.
//
// Env:
//   META_CAPI_TOKEN  (required, server-only)  — Conversions API access token
//   META_PIXEL_ID    (optional)               — defaults to the site pixel id
// ============================================================

import crypto from "node:crypto";

const sha256 = (v) =>
  crypto.createHash("sha256").update(String(v).trim().toLowerCase()).digest("hex");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const { eventId, email, phone, zip, eventSourceUrl } = body;

    const PIXEL_ID = process.env.META_PIXEL_ID || "1025841546937119";
    const TOKEN = process.env.META_CAPI_TOKEN;
    if (!TOKEN) {
      console.error("META_CAPI_TOKEN is not set; skipping Conversions API send.");
      return res.status(500).json({ error: "Conversions API not configured." });
    }

    const forwardedFor = (req.headers["x-forwarded-for"] || "").split(",")[0].trim();

    const payload = {
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId, // must match the browser Pixel event
          action_source: "website",
          event_source_url: eventSourceUrl,
          user_data: {
            em: email ? [sha256(email)] : undefined,
            ph: phone ? [sha256(String(phone).replace(/\D/g, ""))] : undefined,
            zp: zip ? [sha256(zip)] : undefined,
            client_ip_address: forwardedFor || undefined,
            client_user_agent: req.headers["user-agent"] || undefined,
          },
        },
      ],
    };

    const fbRes = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${encodeURIComponent(TOKEN)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const result = await fbRes.json();
    return res.status(fbRes.ok ? 200 : 500).json(result);
  } catch (err) {
    console.error("meta-capi error:", err);
    return res.status(500).json({ error: "Something went wrong." });
  }
}
