// ============================================================
// Generates the free water-report PDFs in /public/reports.
// Writes one HTML file per report to a build dir; a companion step
// (see README in this folder) prints each to PDF with Edge headless.
//
//   node scripts/reports/generate-reports.mjs <outDir>
//
// Then for each <slug>.html:
//   msedge --headless --print-to-pdf=public/reports/<slug>.pdf <slug>.html
// ============================================================

import { writeFileSync, mkdirSync } from "node:fs";

const PREPARED = "Prepared June 2026";

// level -> color (dot + value). warn=amber, alert=red, ok=green.
const COLOR = { warn: "#C0860E", alert: "#C0392B", ok: "#1F8A5B" };

const INTRO = (place) =>
  `Here is what public testing shows about the tap water in ${place}. The figures come from the EWG Tap Water Database and the utility's 2024 water quality report. Legal limits and health guidelines are two different things: water can meet every legal limit and still carry levels that independent scientists flag as a concern. None of the readings below are illegal; several are well above the health-based guidelines set by the Environmental Working Group.`;

const CALLBACK = "We'll call you to go over your results and what your home actually needs.";

const reports = [
  {
    slug: "blue-bell-19422",
    city: "Blue Bell, PA",
    tag: "19422",
    provider:
      "Aqua Pennsylvania (Main System); parts of the area served by North Wales Water Authority.",
    intro: INTRO("Blue Bell (19422)"),
    rows: [
      ["warn", "Hard water", "Regionally hard", "Southeastern PA water is classified hard to very hard. It scales fixtures, shortens water-heater life, and spots glassware."],
      ["warn", "Disinfection byproducts (TTHMs, HAAs)", "31 ppb TTHM, 33 ppb HAA9", "Legal (limit 80 ppb) but roughly 200x above EWG's health guideline. They form when chlorine meets organic matter."],
      ["alert", "PFAS 'forever chemicals'", "PFOA up to 12 ppt (2024)", "Above the new federal limit of 4 ppt set in 2024. PFAS is linked to health risks and is hard to remove without the right system."],
      ["warn", "Chloramine disinfection", "0.96 to 1.22 ppm", "Aqua's Main System disinfects with chloramine, which can leave a taste and odor and needs a catalytic carbon filter to remove."],
      ["ok", "Lead from older home pipes", "System avg 3.4 ppb", "The system level is low. Lead can still enter from an individual home's older service line or fixtures."],
    ],
    ctaHeading: "Want to know what's in YOUR water?",
    ctaBody: `The numbers above are system averages. Your home can read differently, especially with older plumbing. ${CALLBACK}`,
    sources:
      "Sources: EWG Tap Water Database; Aqua PA Main System (PWSID PA1460073) and North Wales Water Authority (PA1460048) 2024 Water Quality Reports; US EPA 2024 PFAS rule (PFOA/PFOS limit 4 ppt); USGS hardness data. System-wide 2024 figures, not specific to any address — your home may differ. Informational only, not a test of your water. Wellbrook Water · wellbrookwater.com",
  },
  {
    slug: "malvern-19355",
    city: "Malvern, PA",
    tag: "19355",
    provider:
      "Aqua Pennsylvania (West Chester system). Many homes in the surrounding townships are on private wells.",
    intro: INTRO("Malvern (19355)"),
    rows: [
      ["warn", "Hard water", "Regionally hard", "Chester County water is classified hard to very hard. It scales fixtures and appliances and leaves spots on glass and dishes."],
      ["alert", "Disinfection byproducts (TTHMs, HAAs)", "39 ppb TTHM, 47 ppb HAA9", "Among the higher readings in the area. Legal (limits 80 and 60 ppb) but far above EWG's health guideline."],
      ["alert", "PFOA 'forever chemical'", "3.28 ppt", "Just under the new 4 ppt federal limit. PFAS is a documented concern across Chester County water systems."],
      ["warn", "Nitrate", "4.12 ppm", "Below the 10 ppm legal limit. Common in areas with farming and wells, and worth watching for households with infants."],
      ["warn", "On a private well?", "Unregulated, untested", "Private wells are not tested by anyone but the owner. If you are on a well, your water has likely never been checked."],
    ],
    ctaHeading: "On a well, or just want a straight answer?",
    ctaBody: `System averages don't tell you what's coming out of your tap, and a private well tells you nothing at all. ${CALLBACK}`,
    sources:
      "Sources: EWG Tap Water Database; Aqua PA West Chester system (PWSID PA1150098) 2024 Water Quality Report; US EPA 2024 PFAS rule (PFOA limit 4 ppt); USGS hardness data. System-wide 2024 figures; private wells aren't covered, and figures aren't specific to any address — your home may differ. Informational only, not a test of your water. Wellbrook Water · wellbrookwater.com",
  },
  {
    slug: "exton-19341",
    city: "Exton, PA",
    tag: "19341",
    provider: "Aqua Pennsylvania (West Chester system).",
    intro: INTRO("Exton (19341)"),
    rows: [
      ["alert", "PFAS treatment underway nearby", "Robert Dean wells, West Whiteland", "Aqua is building PFAS treatment at local wells after detections, funded in 2025. PFAS removal is an active local project, not a hypothetical."],
      ["alert", "Disinfection byproducts (TTHMs, HAAs)", "39 ppb TTHM, 47 ppb HAA9", "Legal (limits 80 and 60 ppb) but far above EWG's health guideline. They form when chlorine meets organic matter."],
      ["warn", "PFOA 'forever chemical'", "3.28 ppt", "Just under the new 4 ppt federal limit across the West Chester system. Hard to remove without a dedicated system."],
      ["warn", "Hard water", "Regionally hard", "Chester County water is classified hard to very hard. It scales fixtures, shortens appliance life, and spots glassware."],
      ["warn", "Nitrate", "4.12 ppm", "Below the 10 ppm legal limit. Common where there is farming and groundwater, worth watching for infants."],
    ],
    ctaHeading: "PFAS is being treated. Don't wait on it.",
    ctaBody: `Treatment at the local wells is years out. A whole-home or point-of-use system handles it now. ${CALLBACK}`,
    sources:
      "Sources: EWG Tap Water Database; Aqua PA West Chester system (PWSID PA1150098) 2024 Water Quality Report; PENNVEST Jan 2025 PFAS remediation award (West Whiteland and Upper Uwchlan wells); US EPA 2024 PFAS rule (4 ppt); USGS hardness data. System-wide 2024 figures, not specific to any address. Informational only, not a test of your water. Wellbrook Water · wellbrookwater.com",
  },
  {
    slug: "greater-philadelphia",
    city: "Greater Philadelphia, PA",
    tag: "",
    provider:
      "Aqua Pennsylvania, North Wales Water Authority, Pennsylvania American Water, and others, depending on your town.",
    intro:
      "Here is what public testing shows about tap water across the western Philadelphia suburbs. The figures come from the EWG Tap Water Database and local utility 2024 water quality reports. Legal limits and health guidelines are two different things: water can meet every legal limit and still carry levels independent scientists flag as a concern. None of the readings below are illegal; several are well above EWG's health-based guidelines. For your exact street, the only way to know is to test.",
    rows: [
      ["warn", "Hard water", "Regionally hard", "Montgomery and Chester County water is classified hard to very hard. It scales fixtures, shortens water-heater life, and spots glassware."],
      ["alert", "Disinfection byproducts (TTHMs, HAAs)", "30 to 47 ppb across systems", "Legal (limits 80 and 60 ppb) but well above EWG's health guideline at most local utilities. They form when chlorine meets organic matter."],
      ["alert", "PFAS 'forever chemicals'", "Detected across the region", "Some local wells are under active PFAS treatment. The new federal limit set in 2024 is 4 ppt, and several area systems run close to it."],
      ["warn", "Chlorine / chloramine", "Used by area utilities", "Local systems disinfect with chlorine or chloramine, which can leave a taste and odor and need the right carbon filter to remove."],
      ["warn", "On a private well?", "Unregulated, untested", "Private wells are not tested by anyone but the owner. If you are on a well, your water has likely never been checked."],
    ],
    ctaHeading: "Want to know what's in YOUR water?",
    ctaBody: `These are area averages. Your home can read differently, especially on a private well or with older plumbing. ${CALLBACK}`,
    sources:
      "Sources: EWG Tap Water Database (Aqua PA Main PA1460073, West Chester PA1150098, North Wales PA1460048); utility 2024 Water Quality Reports; PENNVEST Jan 2025 PFAS award; US EPA 2024 PFAS rule (4 ppt); USGS hardness data. Area-wide 2024 figures, not specific to any address. Informational only, not a test of your water. Wellbrook Water · wellbrookwater.com",
  },
];

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const LOGO = `<svg viewBox="0 0 44 44" width="40" height="40" aria-hidden="true">
  <path d="M22 4 C22 4 8 19 8 28 a14 14 0 0 0 28 0 C36 19 22 4 22 4 Z" fill="#ffffff"/>
  <path d="M9.2 30 a12.8 12.8 0 0 0 25.6 0 a30 30 0 0 1-25.6 0 Z" fill="#7DBEE6"/>
</svg>`;

function rowHTML([level, label, value, desc]) {
  const c = COLOR[level];
  return `<div class="row">
    <div class="label"><span class="dot" style="background:${c}"></span><span>${esc(label)}</span></div>
    <div class="value" style="color:${c}">${esc(value)}</div>
    <div class="desc">${esc(desc)}</div>
  </div>`;
}

function renderHTML(r) {
  const tag = r.tag ? ` <span class="tag">${esc(r.tag)}</span>` : "";
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  @page { size: Letter; margin: 0; }
  * { box-sizing: border-box; }
  html,body { margin:0; padding:0; }
  body { font-family:'Bricolage Grotesque',system-ui,sans-serif; color:#16232C; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  .sans { font-family:'Source Sans 3',Arial,sans-serif; }
  .page { width:8.5in; min-height:11in; display:flex; flex-direction:column; }
  .header { background:#143C5F; padding:24px 48px; display:flex; align-items:center; justify-content:space-between; }
  .brand { display:flex; align-items:center; gap:13px; }
  .word { color:#fff; font-size:30px; font-weight:600; line-height:1; }
  .wtag { color:#7DBEE6; font-size:8.5px; letter-spacing:3px; font-weight:600; margin-top:3px; }
  .snap { color:#7DBEE6; font-size:12.5px; letter-spacing:2px; font-weight:700; }
  .main { padding:26px 48px 0; flex:1; }
  h1 { font-size:38px; line-height:1.05; margin:0; color:#143C5F; font-weight:700; }
  h1 .tag { color:#2278B5; }
  .prepared { color:#A9C2D6; font-size:12.5px; margin:5px 0 0; }
  .provider { color:#51606C; font-size:13.5px; line-height:1.4; margin:9px 0 0; }
  .intro { font-size:14.5px; line-height:1.5; margin:13px 0 0; }
  .sectionh { font-size:18px; font-weight:700; color:#143C5F; margin:20px 0 0; }
  .rule { height:2px; background:#2278B5; margin:7px 0 2px; }
  .row { display:grid; grid-template-columns:218px 142px 1fr; gap:16px; padding:13px 0; border-bottom:1px solid #e7eef0; align-items:start; }
  .label { font-weight:700; font-size:14px; color:#143C5F; display:flex; gap:9px; line-height:1.25; }
  .dot { width:11px; height:11px; border-radius:50%; margin-top:4px; flex:none; }
  .value { font-weight:700; font-size:13.5px; line-height:1.3; }
  .desc { font-size:12.5px; line-height:1.45; color:#51606C; }
  .cta { background:#143C5F; border-radius:14px; margin:22px 48px 0; padding:22px 26px; display:flex; align-items:center; justify-content:space-between; gap:26px; }
  .cta-text h3 { color:#fff; font-size:20px; margin:0 0 6px; font-weight:700; }
  .cta-text p { color:#cfe3e6; font-size:13px; line-height:1.45; margin:0; }
  .cta-act { text-align:center; flex:none; }
  .cta-pre { color:#7DBEE6; font-size:11px; letter-spacing:.4px; margin-bottom:7px; }
  .cta-phone { display:inline-block; background:#2278B5; color:#fff; text-decoration:none; font-weight:700; font-size:19px; padding:14px 24px; border-radius:10px; white-space:nowrap; }
  .sources { padding:14px 48px 20px; color:#9aa9ad; font-size:9px; line-height:1.45; }
</style></head>
<body><div class="page">
  <div class="header">
    <div class="brand">${LOGO}<div><div class="word">Wellbrook</div><div class="wtag sans">WATER, PERFECTED</div></div></div>
    <div class="snap sans">WATER QUALITY SNAPSHOT</div>
  </div>
  <div class="main">
    <h1>${esc(r.city)}${tag}</h1>
    <div class="prepared sans">${PREPARED}</div>
    <div class="provider">Water provider: ${esc(r.provider)}</div>
    <p class="intro">${esc(r.intro)}</p>
    <div class="sectionh">What public testing shows</div>
    <div class="rule"></div>
    ${r.rows.map(rowHTML).join("\n")}
  </div>
  <div class="cta">
    <div class="cta-text"><h3>${esc(r.ctaHeading)}</h3><p>${esc(r.ctaBody)}</p></div>
    <div class="cta-act">
      <div class="cta-pre sans">Want to talk sooner?</div>
      <a class="cta-phone" href="tel:2674123549">(267) 412-3549</a>
    </div>
  </div>
  <div class="sources">${esc(r.sources)}</div>
</div></body></html>`;
}

const outDir = process.argv[2];
if (!outDir) { console.error("usage: node generate-reports.mjs <outDir>"); process.exit(1); }
mkdirSync(outDir, { recursive: true });
for (const r of reports) {
  const p = `${outDir}/${r.slug}.html`;
  writeFileSync(p, renderHTML(r), "utf8");
  console.log("wrote", p);
}
console.log(`\n${reports.length} report HTML files written. Slugs:`, reports.map((r) => r.slug).join(", "));
