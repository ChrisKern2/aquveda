// ============================================================
// POST /api/hl-tag
//
// The one question HighLevel can't answer on its own: "is this ZIP inside the
// 576-ZIP service area?" The thank-you page calls this after a Free Water
// Report submission; if the ZIP is OUT of area we tag the HighLevel contact
// `out of area`, which is the only signal the HighLevel workflow needs to
// branch to the warm rejection email and skip the opportunity.
//
// Body: { zip, email?, phone?, contactId? }
// Reply: { ok, area: "in"|"out"|"invalid", tagged, reason }
//
// Env:
//   HL_API_TOKEN   (required to tag) — HighLevel Private Integration Token
//                  with contacts.readonly + contacts.write for the location.
//   HL_LOCATION_ID (optional)        — defaults to the Wellbrook location.
//
// Without HL_API_TOKEN this still classifies the ZIP and returns the answer,
// but reports tagged:false with a clear reason instead of failing — so the
// Meta half keeps working while the token is being issued.
// ============================================================

import { classifyZip } from "./_data/serviceArea.js";

const HL_BASE = "https://services.leadconnectorhq.com";
const HL_VERSION = "2021-07-28";

// The location that owns the Free Water Report form (embed RMaiQcWNgPCGwWVfnEiY).
// A form's submissions create contacts in the form's OWN location, and a Private
// Integration Token is scoped to a single location — so this must match the form
// or every tag write returns 403 "does not have access to this location".
//
// NOTE (2026-07-21): this is deliberately NOT the same location as the quote-form
// webhooks in api/free-report.js, which post to 1GISJlacwjrTTrHeKPO3. Two live
// sub-accounts are in play; see "Two locations" in the handoff notes.
const LOCATION_ID = process.env.HL_LOCATION_ID || "h083Sct2YuECDbsldX8U";

// Exact tags the HighLevel workflow branches on. Lowercase, with spaces.
//
// FAIL-SAFE TAGGING (Chris's decision, 2026-07-21): tag BOTH outcomes, and let
// HighLevel branch on the PRESENCE of a tag rather than the absence of one.
//
// Why it matters: this tag is applied by the thank-you page. If a visitor never
// lands there (tab closed, JS blocked, mobile drops the redirect) no tag is
// written. Branching on "no `out of area` tag" would then read as in-area and
// send a report for somewhere we may not serve. Branching on an explicit tag
// means an unclassified lead falls into HighLevel's third branch and gets
// flagged for manual review instead of quietly getting the wrong treatment.
const OUT_OF_AREA_TAG = "out of area";
const IN_AREA_TAG = "in area";
const ALSO_TAG_IN_AREA = true;

function hlHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    Version: HL_VERSION,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

// Find the contact when HighLevel didn't pass a contact id on the redirect.
async function findContactId(token, { email, phone }) {
  const term = email || phone;
  if (!term) return null;
  const url = `${HL_BASE}/contacts/?locationId=${encodeURIComponent(LOCATION_ID)}&query=${encodeURIComponent(term)}`;
  const r = await fetch(url, { headers: hlHeaders(token) });
  if (!r.ok) throw new Error(`contact lookup ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const data = await r.json();
  const list = data.contacts || data.contact || [];
  const arr = Array.isArray(list) ? list : [list];
  // Prefer an exact email match; otherwise take the freshest result.
  const exact = email && arr.find((c) => (c.email || "").toLowerCase() === email.toLowerCase());
  return (exact || arr[0])?.id || null;
}

async function addTag(token, contactId, tag) {
  const r = await fetch(`${HL_BASE}/contacts/${encodeURIComponent(contactId)}/tags`, {
    method: "POST",
    headers: hlHeaders(token),
    body: JSON.stringify({ tags: [tag] }),
  });
  if (!r.ok) throw new Error(`add tag ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return true;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const { zip = "", email = "", phone = "", contactId = "" } = body;

    const cls = classifyZip(zip);
    const area = cls.ok ? "in" : cls.reason === "invalid" ? "invalid" : "out";

    // in -> "in area", out -> "out of area", invalid/missing ZIP -> no tag at
    // all, which is deliberate: an untagged contact drops into HighLevel's
    // third branch ("couldn't classify, check manually") rather than being
    // guessed into the wrong treatment.
    const tagToApply =
      area === "out" ? OUT_OF_AREA_TAG : area === "in" && ALSO_TAG_IN_AREA ? IN_AREA_TAG : null;

    if (!tagToApply) {
      return res.status(200).json({ ok: true, area, tagged: false, reason: "no tag needed" });
    }

    const token = process.env.HL_API_TOKEN;
    if (!token) {
      // Loud in the logs, soft to the caller: the Meta half must not break.
      console.error(
        `HL_API_TOKEN not set — contact for zip ${cls.zip} should have been tagged "${tagToApply}".`
      );
      return res
        .status(200)
        .json({ ok: false, area, tagged: false, reason: "HL_API_TOKEN not configured" });
    }

    let id = (contactId || "").trim();
    if (!id) id = await findContactId(token, { email, phone });
    if (!id) {
      console.error(`hl-tag: no HighLevel contact found for ${email || phone || "(no identifier)"}`);
      return res.status(200).json({ ok: false, area, tagged: false, reason: "contact not found" });
    }

    await addTag(token, id, tagToApply);
    return res.status(200).json({ ok: true, area, tagged: true, tag: tagToApply, contactId: id });
  } catch (err) {
    // Never surface a 500 to the browser here — a tagging failure must not make
    // the thank-you page look broken to the customer.
    console.error("hl-tag error:", err.message);
    return res.status(200).json({ ok: false, tagged: false, reason: err.message });
  }
}
