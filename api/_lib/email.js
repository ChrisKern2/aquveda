// ============================================================
// Resend transactional email + branded HTML templates.
// One verified domain (wellbrookwater.com) + RESEND_API_KEY.
// ============================================================

const RESEND_URL = "https://api.resend.com/emails";
const FROM = process.env.REPORT_FROM_EMAIL || "Wellbrook Water <reports@wellbrookwater.com>";
const REPLY_TO = process.env.REPLY_TO_EMAIL || "chris@wellbrookwater.com";
const QUOTE_URL = process.env.QUOTE_URL || "https://wellbrookwater.com/free-report#quote";

const NAVY = "#0E3A43";
const TEAL = "#1591C6";
const SAND = "#FBFAF7";

export async function send({ to, subject, html }) {
  const res = await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, to: [to], reply_to: REPLY_TO, subject, html }),
  });
  if (!res.ok) throw new Error("Resend failed: " + (await res.text()));
  return res.json();
}

function shell(inner) {
  return `<!doctype html><html><body style="margin:0;background:${SAND};font-family:Arial,Helvetica,sans-serif;color:#1e2d34">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
    <tr><td style="background:${NAVY};border-radius:14px 14px 0 0;padding:22px 28px">
      <span style="color:#fff;font-size:22px;font-weight:bold;letter-spacing:.2px">Wellbrook</span>
      <span style="color:#9fd3e2;font-size:11px;letter-spacing:3px;display:block;margin-top:2px">WATER, PERFECTED</span>
    </td></tr>
    <tr><td style="background:#ffffff;padding:30px 28px;border:1px solid #e6eef0;border-top:none;border-radius:0 0 14px 14px">
      ${inner}
    </td></tr>
    <tr><td style="padding:18px 28px;color:#8a9aa0;font-size:12px;line-height:18px">
      Wellbrook Water &middot; Montgomery &amp; Chester County, PA &middot;
      <a href="tel:2159789719" style="color:#8a9aa0">(215) 978-9719</a> &middot;
      <a href="https://wellbrookwater.com" style="color:#8a9aa0">wellbrookwater.com</a>
    </td></tr>
  </table></td></tr></table></body></html>`;
}

function button(href, label) {
  return `<a href="${href}" style="display:inline-block;background:${TEAL};color:#fff;text-decoration:none;
    font-weight:bold;font-size:16px;padding:14px 28px;border-radius:28px">${label}</a>`;
}

export function reportEmail({ firstName, reportUrl }) {
  const hi = firstName ? `Hi ${firstName},` : "Hi there,";
  return shell(`
    <h1 style="color:${NAVY};font-size:24px;margin:0 0 14px">Your water report is ready.</h1>
    <p style="font-size:15px;line-height:23px;margin:0 0 18px">${hi}</p>
    <p style="font-size:15px;line-height:23px;margin:0 0 22px">
      Here is your free, plain-English water-quality report for your zip. It covers hardness,
      chlorine and chloramine, disinfection byproducts, and PFAS, with the public sources cited.
      These are area figures, so your home can read differently, especially on a well or with older pipes.
    </p>
    <p style="margin:0 0 26px">${button(reportUrl, "View your water report")}</p>
    <hr style="border:none;border-top:1px solid #e6eef0;margin:0 0 22px">
    <h2 style="color:${NAVY};font-size:18px;margin:0 0 10px">Want to fix what is in your water?</h2>
    <p style="font-size:15px;line-height:23px;margin:0 0 22px">
      We size the right system for your home and water, with upfront pricing, no pressure,
      and no long-term contracts. Licensed and insured, with a lifetime workmanship warranty.
    </p>
    <p style="margin:0 0 6px">${button(QUOTE_URL, "Request a free quote")}</p>
  `);
}

export function rejectionEmail({ firstName }) {
  const hi = firstName ? `Hi ${firstName},` : "Hi there,";
  return shell(`
    <h1 style="color:${NAVY};font-size:24px;margin:0 0 14px">We are not in your area yet.</h1>
    <p style="font-size:15px;line-height:23px;margin:0 0 18px">${hi}</p>
    <p style="font-size:15px;line-height:23px;margin:0 0 18px">
      Thanks for the interest. Right now Wellbrook serves Montgomery and Chester County and the
      nearby western Philadelphia suburbs, and your zip falls outside that area, so we cannot send a
      local report or install a system for you yet.
    </p>
    <p style="font-size:15px;line-height:23px;margin:0 0 6px">
      We are expanding. If you would like, reply to this email and we will keep your zip on file and
      reach out when we reach you.
    </p>
  `);
}
