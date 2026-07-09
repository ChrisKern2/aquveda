# Claude Code Prompt, SEO Upgrade for Aquveda (Mercurio's-style)

How to use: open a terminal in this `liberty-website` folder, run `claude`, then paste
everything in the code block below as your first message.

Design reference for "feel": https://www.mercurios.com/ (a high-trust, conversion-focused
home-services site). Match its STRUCTURE and trust-signal density, NOT its colors. Keep
Aquveda's existing navy + flag-red brand.

---

You are upgrading my existing website. The current site is a single-page static HTML
file at ./index.html for "Aquveda", an water treatment company,
deployed on Vercel. Keep my brand (colors, fonts, logo, voice) and keep the Jobber
lead form. Rebuild it as a multi-page, SEO-optimized Astro site whose look and feel
matches the reference site https://www.mercurios.com/, a professional, trust-heavy,
conversion-focused home-services site, adapted to water treatment.

============================================================
DESIGN DIRECTION, make it FEEL like mercurios.com
============================================================
Reproduce this structure and trust-signal density (this is what makes that site work):

1. UTILITY TOP BAR: left = "Locally owned · Licensed & fully insured"; right =
   "Free same-day quotes" + a tappable phone (267) 840-9239. Keep it.
2. STICKY HEADER with a real MEGA-MENU. Each top service has a dropdown of
   sub-services (see SERVICES tree below). Right side: prominent phone + a solid
   "Get a Free Quote" button (this is our version of their "Schedule Online").
3. HERO: full-width with a real water-treatment home PHOTO background (use a
   placeholder image now, /images/hero-home.jpg, that I will swap). Big headline
   with the location in it, a one-line subhead, dual CTA ("Get a Free Quote" +
   "or call us today (267) 840-9239"), and a small review/rating badge.
4. SERVICE-AREA HEADLINE band right under the hero: "Serving Blue Bell, Malvern,
   Exton, West Chester, Ambler, Wayne and More," with a short paragraph.
5. SERVICE GRID: icon tiles per top service (Whole-Home Filtration, Pressure Washing,
   Gutter Cleaning), each with a description and a bulleted list of sub-services
   that link to their pages, exactly like Mercurio's 4-column service section.
6. MID-PAGE CONTACT BAND: "Get the Help You Need" with Call + Get a Free Quote.
7. "WHY CHOOSE US" GRID of 6-8 icon tiles. Use HONEST signals: Free Same-Day
   Quotes, Licensed & Fully Insured, 100% Satisfaction Guarantee, Locally Owned,
   Careful Insured Crews, Upfront Pricing, Recurring Plans Available, 5-Star Service.
8. STAT / CREDIBILITY BAND (counters like their "30+ years"). IMPORTANT: Aquveda
   was founded in 2026, so DO NOT invent history or job counts. Use honest, editable
   placeholders such as "100%__ Satisfaction Guarantee", "Licensed & Insured",
   "Free__ Quotes", "Local__ Montgomery & Chester County", and leave a clearly
   marked {{REVIEW_COUNT}} placeholder I can fill in once reviews exist. Never
   fabricate numbers.
9. TESTIMONIALS section with review-platform logos (Google, Yelp, Facebook,
   Nextdoor) as placeholders, plus 3 editable {{TESTIMONIAL}} placeholders.
10. BIG CTA BAND before the footer: "Get the Help You Need, Call Us Today or Send
    Us a Message."
11. SERVICE AREAS multi-column list of all towns, each linking to its town page.
12. RICH FOOTER like theirs: logo, short blurb, "License / Insured" line (leave
    {{HIC_NUMBER}} placeholder), Quick Menu, contact block (phone, email,
    {{ADDRESS}} placeholder), OFFICE HOURS (Mon-Fri, Sat, Sun, editable), legal
    links (Privacy, Terms, Sitemap), and social icons (Facebook, Instagram, Google).

============================================================
TECH
============================================================
- Astro + Tailwind CSS, static output ("output: 'static'"), deploys to Vercel with
  zero config. Add @astrojs/sitemap.
- Build reusable components: TopBar, Header (with mega-menu), Hero, ServiceCard,
  WhyChooseGrid, StatBand, Testimonials, ServiceAreaList, CTABand, Footer, QuoteForm,
  Layout (all <head> SEO tags + JSON-LD).
- Brand tokens (keep exactly): Navy #16243D, Flag Red #B3303A, Parchment #F4EEE1,
  Slate #5B6675, Success green #1F8A5B, accent reds #cf6a6f and #e07a80, dark #0f1a30.
  Fonts: Oswald (headings + logo), Libre Franklin (body) via Google Fonts.
- Keep the existing Jobber lead-form embed exactly as-is (clienthub script + div) on
  the home and contact pages. Render via set:html or a raw script tag.
- Use real <img> with width/height, lazy-load below the fold. Put placeholder images
  in /images with obvious names so I can swap them.

============================================================
BUSINESS FACTS (use everywhere)
============================================================
- Name: Aquveda   Domain: https://aquveda.com
- Phone: (267) 840-9239  (tel:2678409239)
- Email: chris@aquveda.com
- Founded: 2026, locally owned. Licensed & fully insured. 100% satisfaction
  guarantee. Free same-day quotes. Residential & commercial.
- Service area (western Philadelphia suburbs): Blue Bell, Whitpain, Ambler
  (Montgomery County); Malvern, Exton, West Chester, Great Valley (Chester County);
  plus Wayne, Media, Doylestown, Newtown. Counties: Montgomery and Chester, PA.

============================================================
SERVICES TREE (drives mega-menu, service grid, and pages)
============================================================
- Whole-Home Filtration  -> Carbon Filtration, Sediment Filtration, UV Disinfection
  Detailing, Hard-Water Stain Removal, Storefront / Commercial Glass, Skylights
- Pressure Washing  -> House Washing (Soft Wash), Driveways & Walkways, Patios &
  Decks, Siding Cleaning, Roof Washing, Fence Cleaning
- Gutter Cleaning  -> Gutter Clearing & Flush, Downspout Clearing, Gutter Brightening,
  Gutter Guard Installation

============================================================
PAGES (each its own URL, internally linked)
============================================================
- /                         Home (full design above)
- /services/window-cleaning, /services/pressure-washing, /services/gutter-cleaning
  (each: hero with service+location H1, what's included, the sub-services, process,
  FAQ, photos, CTA)
- /service-areas            Overview linking every town page
- /service-areas/blue-bell, /malvern, /exton, /west-chester, /ambler, /wayne
  Generate town pages from a data array so I can add towns later. Each = our services
  + that town's name in the H1, intro, and schema.
- /about                    Founding story (new, local, owner-operated), guarantee
- /contact                  Jobber form + phone + hours

============================================================
SEO REQUIREMENTS (per page)
============================================================
- Unique <title> (~55-60 chars) and meta description (~150 chars), e.g.
  "Pressure Washing in Malvern, PA | Aquveda" Service/town H1s must
  include service + location.
- Canonical URL, Open Graph, and Twitter Card on every page.
- JSON-LD:
  * Site-wide LocalBusiness ("HomeAndConstructionBusiness"): name, telephone, email,
    url, logo/image, priceRange, areaServed (all towns), address (Montgomery/Chester
    County, PA), and an aggregateRating placeholder I can enable later.
  * Each service page: a Service schema linked to the business.
  * Each town page: LocalBusiness with areaServed = that town.
  * Each service page FAQ: FAQPage schema (3-4 Q&As).
- @astrojs/sitemap for sitemap.xml; robots.txt allowing all and pointing to sitemap.
- Descriptive, keyword-aware alt text on every image.
- Internal links: home -> all service + area pages; services <-> towns cross-linked.

============================================================
CONTENT
============================================================
- Write genuinely useful 300-500 word body copy per service and town page in
  Aquveda's brand voice (confident, plain, local, no fluff). Replace every generic
  "greater metro area" with the real towns.
- Mark every claim I must verify with {{ }} placeholders (review counts, testimonials,
  license/HIC number, physical address, office hours). Do not fabricate them.

============================================================
DELIVERABLES
============================================================
- Working Astro project: `npm install`, `npm run dev`, `npm run build`, deploys to
  Vercel with no extra config.
- README with the page map, how to add a town (one array entry), how to swap photos,
  and a checklist of every {{placeholder}} I still need to fill in.
- Before finishing: run the build, confirm it passes, and list every URL generated.

Keep my brand pixel-faithful and the Mercurio's-style structure intact. Ask me nothing
you can infer from index.html or the facts above; only stop if something would lose
lead submissions or require inventing a fact.

---

## Do these yourself (bigger SEO impact than the site)
1. Claim and fully complete a Google Business Profile covering the Blue Bell /
   Malvern / Exton zips.
2. Request a review from every customer the same day the job is finished.
3. After Claude Code finishes, redeploy on Vercel, confirm the new service/town URLs
   are live, then submit the sitemap in Google Search Console.

## Placeholders you'll need to fill in
- {{REVIEW_COUNT}} / {{TESTIMONIAL}} x3, once you have reviews
- {{HIC_NUMBER}}, PA Home Improvement Contractor # if you register one
- {{ADDRESS}}, business address to display (or remove if home-based)
- Office hours, your real availability
- Real photos, hero-home.jpg + service photos in /images
