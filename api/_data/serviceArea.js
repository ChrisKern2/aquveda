// ============================================================
// Service-area config for the free water report.
// EDIT THIS FILE as you expand. The API function reads from here.
// Zips derived from your service-area towns in src/data/site.ts.
// ============================================================

// Zips you serve. Add or remove freely.
export const SERVICE_AREA_ZIPS = new Set([
  // Montgomery County
  "19422", // Blue Bell / Whitpain
  "19002", // Ambler / Gwynedd
  "19403", // Eagleville / Audubon (Whitpain edge)
  // Chester County
  "19355", // Malvern / Great Valley / Frazer
  "19341", // Exton
  "19380", "19382", "19383", // West Chester
  "19312", // Berwyn
  "19333", // Devon
  // Delaware County / Main Line
  "19087", // Wayne
  "19063", // Media
  // Bucks County
  "18901", "18902", // Doylestown
  "18940", // Newtown
]);

// Zips with their own custom report (served from /public/reports).
// In-area zips NOT listed here fall back to GENERIC_REPORT.
export const REPORT_BY_ZIP = {
  "19422": "/reports/blue-bell-19422.pdf",
  "19355": "/reports/malvern-19355.pdf",
  "19341": "/reports/exton-19341.pdf",
};

export const GENERIC_REPORT = "/reports/greater-philadelphia.pdf";

// Classify a submitted zip.
// Returns { ok, zip, reportPath } in-area, or { ok:false, reason } otherwise.
export function classifyZip(zip) {
  const z = String(zip || "").trim().slice(0, 5);
  if (!/^\d{5}$/.test(z)) return { ok: false, zip: z, reason: "invalid" };
  if (!SERVICE_AREA_ZIPS.has(z)) return { ok: false, zip: z, reason: "out_of_area" };
  return { ok: true, zip: z, reportPath: REPORT_BY_ZIP[z] || GENERIC_REPORT };
}
