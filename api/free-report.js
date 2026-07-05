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

      return res.status(200).json({ ok: true, status: "in_area" });
    }

    await send({
      to: email,
      subject: "About water service in your area",
      html: rejectionEmail({ firstName }),
    });
    return res.status(200).json({ ok: true, status: "out_of_area" });
  } catch (err) {
    console.error("free-report error:", err);
    return res.status(500).json({
      error: "Something went wrong. Please try again.",
      debug: String((err && err.stack) || (err && err.message) || err),
    });
  }
}
