// ============================================================
// POST /api/free-report
// Vercel serverless function (auto-deployed from /api on any framework).
// Flow:
//   1. Validate input + honeypot.
//   2. Classify zip (in-area vs out-of-area).
//   3. Email the customer: their report, or a polite "not in your area yet".
//   4. In-area: email the team the lead. (Lead capture goes to Zapier from the
//      browser — see FreeReportForm.astro.)
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
      firstName = "",
      lastName = "",
      email = "",
      phone = "",
      zip = "",
      concern = "",
      ownsHome = "",
      waterSource = "", // city water / well water / not sure
      system = "", // which tier they clicked "Get Started" on, if any
      website = "", // honeypot: real users never fill this
    } = body;

    // Bot caught by honeypot. Pretend success, do nothing.
    if (website) return res.status(200).json({ ok: true, status: "ignored" });

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: "Please enter a valid email address." });
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
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
