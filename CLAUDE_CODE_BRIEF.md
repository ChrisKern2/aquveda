# Paste this into Claude Code (run it from the liberty-website repo)

You are finishing a free-water-report feature that is already scaffolded in this repo. Do not rebuild it. Read these files first, then do the tasks below.

Already added:
- api/free-report.js — POST handler: validates input, routes by zip, sends email, creates a Jobber lead
- api/_data/serviceArea.js — service-area zips + which report each zip gets
- api/_lib/email.js — Resend send + report and rejection email templates
- api/_lib/jobber.js — Jobber OAuth refresh + clientCreate + clientNoteCreate
- src/components/FreeReportForm.astro — the form
- src/pages/free-report.astro — the page at /free-report
- public/reports/*.pdf — the four report PDFs
- scripts/jobber-auth.mjs — one-time OAuth helper to get a Jobber refresh token
- .env.free-report.example — the env vars
- FREE_REPORT_SETUP.md — full setup notes

Constraints:
- Keep the site static (output: 'static'). Do not switch Astro to SSR or add an adapter. The logic stays in /api as Vercel functions.
- Never commit secrets. Keep real keys in .env (gitignored) and in Vercel env vars.
- Node 18+ globals (fetch) are fine.

Tasks, in order:

1. Confirm .gitignore ignores `.env`. If not, add it.

2. Env vars. Read .env.free-report.example. Create a local .env with the same keys (I will paste the real values). Remind me to add the same vars in Vercel: Project, Settings, Environment Variables.

3. Get the Jobber refresh token. Walk me through it:
   - Confirm my Jobber app has the redirect URI http://localhost:5179/callback and scopes to read/write clients and notes.
   - Have me run: `JOBBER_CLIENT_ID=xxx JOBBER_CLIENT_SECRET=yyy node scripts/jobber-auth.mjs`
   - I approve in the browser; the script prints JOBBER_REFRESH_TOKEN. Put it in .env and tell me to add it to Vercel.

4. Verify the Jobber mutations. Using my JOBBER_API_VERSION, open the GraphiQL explorer in the Jobber developer dashboard (or query the schema) and confirm `clientCreate` and `clientNoteCreate` exist with the input fields used in api/_lib/jobber.js. If the names or fields differ for my version, fix jobber.js to match. The note call is already best-effort; keep it that way.

5. Add the CTA. On the homepage hero and the main nav, add a "Get your free report" button linking to /free-report. Match the existing button styling. Keep the existing quote CTA too.

6. Set QUOTE_URL. In .env and Vercel, set QUOTE_URL to my real quote page (https://wellbrookwater.com/contact) so the "Request a free quote" button in the report email points there.

7. Test locally with `vercel dev`:
   - Submit with zip 19422 (in area): I should get the Blue Bell report email with a quote button, and a Jobber lead.
   - Submit with zip 10001 (out of area): I should get the rejection email, and a Jobber lead tagged OUT OF AREA.
   - Submit with a junk zip (abc): the form should reject it inline.
   Report what passed and fix anything that failed.

8. Deploy to Vercel. After deploy, confirm /api/free-report responds and re-run the two email tests against production with my real email.

Ask me for any value you need (API keys, Jobber app details). Do not guess secrets.
