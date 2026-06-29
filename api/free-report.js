// ============================================================
// POST /api/free-report
// Vercel serverless function (auto-deployed from /api on any framework).
// Flow:
//   1. Validate input + honeypot.
//   2. Classify zip (in-area vs out-of-area).
//   3. Create a Jobber lead (best-effort, never blocks the email).
//   4. Email the customer: their report, or a polite "not in your area yet".
// ============================================================

import { classifyZip } from "./_data/serviceArea.js";
import { send, reportEmail, rejectionEmail } from "./_lib/email.js";
import { createJobberLead } from "./_lib/jobber.js";

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
      // In-area only: log the lead in Jobber (with phone) so we can call them.
      // Best-effort: never let Jobber block or fail the report email.
      createJobberLead({
        firstName,
        lastName,
        email,
        phone,
        zip: cls.zip,
        concern,
        ownsHome,
        inArea: true,
        source: "Website free water report",
      }).catch((err) => console.error("Jobber lead error:", err.message));

      const reportUrl = SITE + cls.reportPath;
      await send({
        to: email,
        subject: "We got it, your Wellbrook water report",
        html: reportEmail({ firstName, reportUrl, phone }),
      });
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
