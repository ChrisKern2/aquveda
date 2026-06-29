# Free water report — setup

This wires a free-report form into the site. A visitor enters their name, email, **phone**, and zip. If the zip is in your service area, three things happen: they get a "we got it" confirmation email with a link to their water report, **the lead is auto-created in Jobber** (as a Client with a "call to set up a quote" note containing their phone, zip, and concern), and **you also get a "New lead" backup email at chris@wellbrookwater.com**. If the zip is outside the area, they get a polite "we don't serve your area yet" email and no lead is created. You assign a team member to call and build the quote from the Jobber client.

## Jobber token persistence (Upstash Redis)

Jobber rotates its OAuth refresh token on every refresh and invalidates the old one. A serverless function has no memory between cold starts, so the rotated token is stored in **Upstash Redis** and read back on each run. Setup:

1. In Vercel → your project → **Storage** → **Create Database** → **Upstash for Redis** → free plan, US region → **Create**, and **connect it to the project**. This auto-adds `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` (or `KV_REST_API_*`; the code reads either).
2. Set `JOBBER_REFRESH_TOKEN` in Vercel to a freshly minted token (run `node --env-file=.env scripts/jobber-auth.mjs`). This is only the one-time **seed** — after the first lead, the store holds the live token and the seed is ignored.
3. Redeploy. The first in-area submission seeds the store; everything after is automatic.

If the Upstash vars are absent, lead creation still *tries* but the token won't persist (it would work once then fail) — so the store is required for reliable Jobber sync. The backup lead email works regardless.

The site stays static. The logic runs in one Vercel serverless function under `/api`, which Vercel deploys automatically. Nothing about your Astro build changes.

## What was added

```
api/
  free-report.js          POST handler: validate, route by zip, email, create Jobber lead
  _data/serviceArea.js     your zips + which report each gets   <-- EDIT THIS as you grow
  _lib/email.js            Resend send + branded report/rejection emails
  _lib/jobber.js           Jobber OAuth + create client + note
src/components/FreeReportForm.astro   the form (drop it anywhere)
src/pages/free-report.astro           a ready page at /free-report
public/reports/*.pdf                  the 4 report PDFs, served as static files
.env.free-report.example              the env vars you need
```

The report PDFs are already in `public/reports`: `blue-bell-19422.pdf`, `malvern-19355.pdf`, `exton-19341.pdf`, and `greater-philadelphia.pdf` (the fallback for in-area zips without a custom report).

## 1. Set environment variables

Copy `.env.free-report.example` into Vercel (Project, Settings, Environment Variables) and into a local `.env` if you want to test with `vercel dev`. Fill in the real keys from steps 2 and 3.

## 2. Resend (email), about 10 minutes

1. Sign up at resend.com. Free tier covers roughly 3,000 emails a month.
2. Add the domain `wellbrookwater.com` and add the DNS records it gives you (SPF, DKIM) at your domain host. This is what keeps reports out of spam, so do not skip it.
3. Create an API key. Put it in `RESEND_API_KEY`.
4. Set `REPORT_FROM_EMAIL` to an address on the verified domain, for example `reports@wellbrookwater.com`.

## 3. Jobber (auto-create lead), about 20 minutes

1. Go to developer.getjobber.com and create a developer account tied to your Jobber.
2. Create an app. Set a redirect URI (for the one-time OAuth you can use `https://wellbrookwater.com/oauth/callback` or any URL you control).
3. Give the app the scopes to read/write clients and notes (Jobber labels these around "clients" and "notes").
4. Copy the Client ID and Client Secret into `JOBBER_CLIENT_ID` and `JOBBER_CLIENT_SECRET`.
5. Run the OAuth flow once to get a **refresh token**: authorize the app, exchange the code for tokens, and save the refresh token into `JOBBER_REFRESH_TOKEN`. The function refreshes the short-lived access token on its own from then on.

If you want, ask Claude Code to write a tiny one-off script that completes the OAuth exchange and prints the refresh token. You only run it once.

### One thing to verify in Jobber

`api/_lib/jobber.js` uses `clientCreate` and `clientNoteCreate`. Field and mutation names can differ slightly by API version. After your first real submission, open the GraphiQL explorer in the Jobber developer dashboard, confirm those mutation names for your `JOBBER_API_VERSION`, and adjust if needed. The note is wrapped in a try/catch, so even if the note fails the lead still gets created.

## 4. Show the form

It already lives at `/free-report`. To put it elsewhere (home hero, a popup, the services pages):

```astro
---
import FreeReportForm from "../components/FreeReportForm.astro";
---
<FreeReportForm />
```

Point your ad and social "Get your free report" buttons at `https://wellbrookwater.com/free-report`.

## 5. Test

- Local: `vercel dev`, open `/free-report`, submit with an in-area zip (19422) and an out-of-area zip (10001), and confirm both emails plus the Jobber lead.
- Production: after deploy, run the same two tests with your own email.

## Editing your service area

Open `api/_data/serviceArea.js`. `SERVICE_AREA_ZIPS` is the full in-area list. `REPORT_BY_ZIP` maps a zip to its custom report. Any in-area zip not in that map gets `greater-philadelphia.pdf`. Add a zip to the set to serve it, add a line to the map to give it a custom report.

## Notes

- The form has a honeypot field, so most bots are dropped silently.
- The Jobber call never blocks the email. If Jobber is down, the customer still gets their report and the error is logged.
- `QUOTE_URL` controls where "Request a free quote" points. Set it to your real quote page (`/contact`).
