// ============================================================
// Resend transactional email + branded HTML templates.
// One verified domain (wellbrookwater.com) + RESEND_API_KEY.
// ============================================================

const RESEND_URL = "https://api.resend.com/emails";
const FROM = process.env.REPORT_FROM_EMAIL || "Wellbrook Water <reports@wellbrookwater.com>";
const REPLY_TO = process.env.REPLY_TO_EMAIL || "chris@wellbrookwater.com";
const QUOTE_URL = process.env.QUOTE_URL || "https://wellbrookwater.com/free-report#quote";

const NAVY = "#0E3A43";
const TEAL = "#15919B";
const SAND = "#FBFAF7";
const MIST = "#EAF4F4";

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

// One numbered "what happens next" row.
function step(n, title, body) {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 14px"><tr>
    <td width="34" valign="top">
      <div style="width:26px;height:26px;border-radius:50%;background:${NAVY};color:#fff;font-weight:bold;font-size:13px;text-align:center;line-height:26px">${n}</div>
    </td>
    <td valign="top" style="padding-left:12px">
      <div style="font-size:15px;font-weight:bold;color:${NAVY};margin:0 0 2px">${title}</div>
      <div style="font-size:14px;line-height:21px;color:#5d6b71">${body}</div>
    </td></tr></table>`;
}

export function reportEmail({ firstName, reportUrl, phone }) {
  const hi = firstName ? `Hi ${firstName},` : "Hi there,";
  const callStep = phone
    ? `We give you a quick call at ${phone} to walk through what it means and put together your free, no-pressure quote.`
    : `We give you a quick call to walk through what it means and put together your free, no-pressure quote.`;
  return shell(`
    <h1 style="color:${NAVY};font-size:24px;margin:0 0 14px">We got it.</h1>
    <p style="font-size:15px;line-height:23px;margin:0 0 18px">${hi}</p>
    <p style="font-size:15px;line-height:23px;margin:0 0 22px">
      Your free water report request is in, and good news, your home is inside our service area.
      Your plain-English report covers hardness, chlorine and chloramine, disinfection byproducts,
      and PFAS for your area, with the public sources cited.
    </p>
    <p style="margin:0 0 26px">${button(reportUrl, "View your water report")}</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:${MIST};border-radius:12px;margin:0 0 28px">
      <tr><td style="padding:18px 20px">
        <div style="color:${TEAL};font-size:12px;font-weight:bold;letter-spacing:2px;margin:0 0 6px">NO IN-HOME VISIT REQUIRED</div>
        <p style="font-size:14px;line-height:21px;margin:0;color:#3c4f55">
          We pull the most recent public water-quality data for your address and read it for you.
          No in-home visit and no wasted weekend just to find out where you stand.
        </p>
      </td></tr>
    </table>

    <h2 style="color:${NAVY};font-size:18px;margin:0 0 16px">What happens next</h2>
    ${step(1, "You are reading it", "This email confirms we have your request and your report.")}
    ${step(2, "We review your water", "We go over the public data for your area and the concern you told us about.")}
    ${step(3, "We call you", callStep)}

    <p style="font-size:14px;line-height:22px;margin:20px 0 0;color:#5d6b71">
      Want to talk sooner? Call us at <a href="tel:2159789719" style="color:${TEAL};font-weight:bold">(215) 978-9719</a>.
    </p>
  `);
}

// Internal notification to Chris when a new lead comes in, so he can call.
// formType "quote_request" (the quote form) vs "water_report" (default).
export function leadNotificationEmail({ formType, firstName, lastName, email, phone, zip, address, message, concern, ownsHome, waterSource, system }) {
  const isQuote = formType === "quote_request";
  const name = [firstName, lastName].filter(Boolean).join(" ") || "(no name given)";
  const telDigits = (phone || "").replace(/[^0-9]/g, "");
  const row = (label, val) =>
    `<tr>
      <td style="padding:9px 0;width:120px;font:bold 13px/1.4 Arial;color:${NAVY};vertical-align:top">${label}</td>
      <td style="padding:9px 0;font:400 14px/1.5 Arial;color:#1e2d34;vertical-align:top">${val || "&mdash;"}</td>
    </tr>`;
  return shell(`
    <h1 style="color:${NAVY};font-size:22px;margin:0 0 6px">${isQuote ? "New quote request" : "New free-report lead"}</h1>
    <p style="font-size:14px;line-height:21px;margin:0 0 20px;color:#5d6b71">${isQuote ? "They asked for a quote directly. Call them to build it." : "In your service area. Call them to put together a quote."}</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e6eef0;border-bottom:1px solid #e6eef0">
      ${row("Name", name)}
      ${system ? row("Interested in", system) : ""}
      ${row("Phone", phone ? `<a href="tel:${telDigits}" style="color:${TEAL};font-weight:bold;text-decoration:none">${phone}</a>` : "")}
      ${row("Email", email ? `<a href="mailto:${email}" style="color:${TEAL};text-decoration:none">${email}</a>` : "")}
      ${isQuote ? row("Address", address || zip) : row("Zip", zip)}
      ${isQuote ? (message ? row("Message", message) : "") : row("Owns home", ownsHome) + row("Water source", waterSource) + row("Main concern", concern)}
    </table>
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
