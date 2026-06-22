# Aquveda, Website

A multi-page, SEO-optimized **Astro + Tailwind CSS** site for Aquveda
(whole-home water filtration, water softening and conditioning, reverse-osmosis
drinking water, and the Aquveda Care plan) serving Montgomery & Chester County, PA.
Static output, deploys to Vercel with zero config.

## Quick start

```bash
npm install      # install dependencies (Node 18+ required)
npm run dev      # local dev server at http://localhost:4321
npm run build    # production build to /dist
npm run preview  # preview the built site locally
```

## How it deploys

- Pushing to the `main` branch on GitHub auto-deploys to Vercel.
- `vercel.json` pins the framework to **astro** (`buildCommand: npm run build`,
  `outputDirectory: dist`) so Vercel builds correctly regardless of the project's
  original preset.
- `@astrojs/sitemap` generates `sitemap-index.xml`; `public/robots.txt` points to it.
  **After deploying, submit `https://aquveda.com/sitemap-index.xml` in
  Google Search Console.**
- Set **aquveda.com** as the production domain in Vercel and remove the old domain.

## Page map

| URL | Source |
| --- | --- |
| `/` | `src/pages/index.astro` |
| `/about` | `src/pages/about.astro` |
| `/contact` | `src/pages/contact.astro` (Jobber form + phone + hours) |
| `/services/whole-home-filtration` | `src/pages/services/[service].astro` |
| `/services/water-softening` | ↑ generated from `services` data |
| `/services/drinking-water` | ↑ |
| `/services/service-plan` | ↑ |
| `/service-areas` | `src/pages/service-areas/index.astro` |
| `/service-areas/<town>` | `src/pages/service-areas/[town].astro` (one per town) |
| `/privacy`, `/terms` | legal pages (placeholder copy, review with counsel) |
| `/sitemap-index.xml` | auto-generated |

Currently generated town pages: blue-bell, whitpain, ambler, malvern, exton,
west-chester, great-valley, wayne, media, doylestown, newtown.

## Architecture

- **`src/data/site.ts`**, single source of truth. Business facts, the services
  tree (drives the mega-menu, service grid, and service pages), the towns array,
  "why choose us" items, stats, and testimonials all live here.
- **`src/layouts/Layout.astro`**, all `<head>` SEO tags (title, meta description,
  canonical, Open Graph, Twitter Card), Google Fonts, and the site-wide
  `LocalBusiness` JSON-LD. Pages pass extra schema (Service, FAQPage, town
  LocalBusiness) via the `schema` prop.
- **`src/components/`**, `TopBar`, `Header` (mega-menu), `Hero`, `PageHero`,
  `ServiceAreaBand`, `ServiceGrid`, `WhyChooseGrid`, `StatBand`, `Testimonials`,
  `ServiceAreaList`, `CTABand`, `Footer`, `QuoteForm` (Jobber embed), `Logo`, `Icon`.
- **`src/styles/global.css`**, brand tokens as Tailwind `@theme` (Deep Marine
  `#0e3a43`, Hydro Teal `#15919b`, Mineral Sand `#e9e1d2`, Slate `#5e7177`, Aqua
  `#3db8c6`) plus component classes (buttons, mega-menu, cards).

## How to add a town

Add one entry to the `towns` array in `src/data/site.ts`:

```ts
{ slug: "phoenixville", name: "Phoenixville", county: "Chester County",
  region: "Chester County",
  blurb: "One or two local sentences about this town's water." },
```

A page (`/service-areas/phoenixville`), its schema, a sitemap entry, and links from
the service-area list + footer are all generated automatically on the next build.

## How to add / change a service or sub-service

Edit the `services` array in `src/data/site.ts`. Each service drives its own page,
the mega-menu dropdown, the home service grid, and its Service + FAQPage schema.

## How to swap photos

Drop real photos into `public/images/` using the same filenames and they're picked
up automatically:

- `hero-home.jpg`, homepage hero background (currently a placeholder). **Replace with
  a real photo**, for example a clean install or a glass of clear water.
- `svc-filtration.png`, `svc-softener.png`, `svc-ro.png`, `svc-care.png`, the service
  card + page images (currently placeholders).

Keep the same names, or update the `image` fields in `src/data/site.ts`. All images
have descriptive, keyword-aware alt text, update it if the photo changes.

## Brand reference

- **Fonts:** Fraunces (display/headings + logo), Inter (body) via Google Fonts.
- **Colors:** Deep Marine `#0e3a43` (primary dark/text), deepest ink `#0b2a31`,
  Hydro Teal `#15919b` (primary action), teal hover `#107880`, Mineral Sand
  `#e9e1d2` (warm neutral), Slate `#5e7177` (muted text), Aqua `#3db8c6`
  (highlight/link), light accent `#7fd3dc`, cool tint `#cde6e8`.
- **Tagline:** Water, perfected.

## ✅ Placeholder checklist, fill these in

Search the project for `{{` to find every placeholder. All live in
`src/data/site.ts` unless noted.

- [ ] **`{{REVIEW_COUNT}}`**, number of reviews (hero badge + schema). Once you
      have genuine reviews, set it, then flip `ENABLE_AGGREGATE_RATING = true` in
      `src/layouts/Layout.astro` to turn on rich-result star ratings.
- [ ] **`{{TESTIMONIAL_1/2/3}}`** + customer names/towns, real reviews in
      `testimonials`.
- [ ] **`{{HIC_NUMBER}}`**, PA Home Improvement Contractor # (footer). Remove the
      line if you don't register one.
- [ ] **`{{ADDRESS}}`**, business address (footer + LocalBusiness schema). Remove
      if home-based, or add `streetAddress`/`postalCode` in `Layout.astro` and the
      footer.
- [ ] **Office hours**, `business.hours` currently shows Mon-Fri 8-6, Sat 9-3, Sun
      closed. Set your real availability.
- [ ] **`{{FACEBOOK_URL}}` / `{{INSTAGRAM_URL}}` / `{{GOOGLE_PROFILE_URL}}`**,
      social links (`business.social`); used in the footer and `sameAs` schema.
- [ ] **`{{LAST_UPDATED_DATE}}`** + legal copy, `src/pages/privacy.astro` and
      `terms.astro` contain placeholder policies. Review with counsel.
- [ ] **Real photos**, replace `public/images/hero-home.jpg` and the service images.

## Bigger SEO wins (off-site)

1. Claim and fully complete a **Google Business Profile** for the Blue Bell / Malvern
   / Exton area.
2. Ask every customer for a review the day the install is finished.
3. After deploy, confirm the new service/town URLs are live and **submit the sitemap
   in Google Search Console.**
