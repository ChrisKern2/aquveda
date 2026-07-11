// ============================================================
// POST /api/free-report
// Vercel serverless function (auto-deployed from /api on any framework).
// Handles BOTH lead forms, distinguished by formType:
//   "water_report" (default) — validate, classify zip, email the customer
//     their report (or the out-of-area note), email the team the lead.
//   "quote_request" — the quote form on the homepage/contact page. No zip
//     gating or customer email; just validate and email the team the lead.
// Lead capture also goes to Zapier from the browser (see the form components).
// ============================================================

import { classifyZip } from "./_data/serviceArea.js";
import { send, reportEmail, rejectionEmail, leadNotificationEmail } from "./_lib/email.js";

// Where new-lead notifications go so Chris can call.
const LEAD_NOTIFY = process.env.LEAD_NOTIFY_EMAIL || process.env.REPLY_TO_EMAIL || "chris@wellbrookwater.com";

// HighServiceHub (GoHighLevel) inbound-webhook trigger. Posting a lead here
// runs the "Website Leads to CRM (Contact + Opportunity)" workflow, which
// creates/updates the contact and drops an opportunity into Sales > New Lead.
// Server-to-server so ad-blockers/browsers can't drop it (unlike the browser
// Zapier call). Overridable via env; falls back to the known trigger URL.
const CRM_WEBHOOK =
  process.env.GHL_LEAD_WEBHOOK ||
  "https://services.leadconnectorhq.com/hooks/1GISJlacwjrTTrHeKPO3/webhook-trigger/05588e81-8806-4435-bee9-7f72931ad267";

// Out-of-area report leads go to a separate workflow that creates the contact
// and tags it "out of area" (no sales opportunity) so Chris can follow up when
// the service area expands. See "Out-of-Area Leads (Tag for Future Follow-up)".
const CRM_WEBHOOK_OOA =
  process.env.GHL_LEAD_WEBHOOK_OOA ||
  "https://services.leadconnectorhq.com/hooks/1GISJlacwjrTTrHeKPO3/webhook-trigger/682936d0-a624-48a4-93cc-79963be76618";

// Fire the lead into the CRM. Keys must match the workflow's mapped payload
// (lead_type, source, full_name, first_name, last_name, email, phone, address,
// postal_code, system_of_interest, message, water_source, owns_home, concern,
// page_url). Never throws — a CRM hiccup must not fail the form or the email.
async function sendToCrm(payload, url = CRM_WEBHOOK) {
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) console.error("CRM webhook non-200:", r.status, await r.text());
  } catch (err) {
    console.error("CRM webhook error:", err.message);
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const {
      formType = "water_report", // "water_report" | "quote_request"
      firstName = "",
      lastName = "",
      email = "",
      phone = "",
      zip = "",
      address = "", // quote form: street address or zip, as typed
      message = "", // quote form: optional free-text note
      concern = "",
      ownsHome = "",
      waterSource = "", // city water / well water / not sure
      system = "", // system of interest / tier they clicked
      website = "", // honeypot: real users never fill this
    } = body;

    // Bot caught by honeypot. Pretend success, do nothing.
    if (website) return res.status(200).json({ ok: true, status: "ignored" });

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }

    // Quote requests: no zip gating and no customer email — the promise is a
    // callback, not a report. Email the team the lead and finish.
    if (formType === "quote_request") {
      const who = [firstName, lastName].filter(Boolean).join(" ") || email;
      await send({
        to: LEAD_NOTIFY,
        subject: `New quote request: ${who}${phone ? " — " + phone : ""}`,
        html: leadNotificationEmail({
          formType, firstName, lastName, email, phone, zip, address, message, system,
        }),
      });
      await sendToCrm({
        lead_type: "quote_request",
        source: "Website - Quote Request",
        full_name: who,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        address,
        postal_code: zip,
        system_of_interest: system,
        message,
        water_source: "",
        owns_home: "",
        concern: "",
        page_url: (process.env.SITE_URL || "https://wellbrookwater.com") + "/contact",
      });
      return res.status(200).json({ ok: true, status: "quote_received" });
    }

    const SITE = process.env.SITE_URL || "https://wellbrookwater.com";
    const cls = classifyZip(zip);

    if (!cls.ok && cls.reason === "invalid") {
      return res.status(400).json({ error: "Please enter a valid 5-digit zip code." });
    }

    if (cls.ok) {
      // Customer's report confirmation is the priority — send it first.
      const reportUrl = SITE + cls.reportPath;
      await send({
        to: email,
        subject: "We got it, your Wellbrook water report",
        html: reportEmail({ firstName, reportUrl, phone }),
      });

      // Email the team the lead as well (Zapier is the primary lead capture).
      try {
        const who = [firstName, lastName].filter(Boolean).join(" ") || email;
        await send({
          to: LEAD_NOTIFY,
          subject: `New lead: ${who}${phone ? " — " + phone : ""}`,
          html: leadNotificationEmail({
            firstName, lastName, email, phone, zip: cls.zip, concern, ownsHome, waterSource, system,
          }),
        });
      } catch (err) {
        console.error("Lead notification email error:", err.message);
      }

      await sendToCrm({
        lead_type: "water_report",
        source: "Website - Free Water Report",
        full_name: [firstName, lastName].filter(Boolean).join(" ") || email,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        address,
        postal_code: cls.zip,
        system_of_interest: system,
        message,
        water_source: waterSource,
        owns_home: ownsHome,
        concern,
        page_url: SITE + "/free-report",
      });

      return res.status(200).json({ ok: true, status: "in_area" });
    }

    await send({
      to: email,
      subject: "About water service in your area",
      html: rejectionEmail({ firstName, zip: cls.zip }),
    });
    // Capture the lead in the CRM tagged "out of area" (no sales opportunity),
    // so Chris can reach out when the service area expands to their ZIP.
    await sendToCrm(
      {
        lead_type: "water_report_out_of_area",
        source: "Website - Free Water Report (Out of Area)",
        full_name: [firstName, lastName].filter(Boolean).join(" ") || email,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        address,
        postal_code: cls.zip,
        system_of_interest: system,
        message,
        water_source: waterSource,
        owns_home: ownsHome,
        concern,
        page_url: SITE + "/free-report",
      },
      CRM_WEBHOOK_OOA
    );
    return res.status(200).json({ ok: true, status: "out_of_area" });
  } catch (err) {
    console.error("free-report error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
