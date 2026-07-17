# How to turn Reviews back on

**Status:** Reviews are currently **OFF** (turned off 2026-07-17 for go-live, because
Wellbrook had no real reviews yet).

**Turn them back on once you have real reviews** — target date: **2026-08-07**.

---

## What "off" hides

Flipping one switch controls all four of these. Nothing was deleted — the code and
the design are all still here, just hidden:

| What | Where it lives |
| --- | --- |
| Hero rating badge (5 stars + "5-star rated · N reviews") | `src/components/Hero.astro` |
| "5-Star Rated Across Greater Philadelphia" bar under the hero | `src/components/ReviewLogos.astro` |
| Testimonials section (Google/Yelp/Facebook/Nextdoor + 3 quotes) | `src/components/Testimonials.astro` |
| "Reviews" link in the top nav (desktop + mobile) | `src/components/Header.astro`, `nav` in `src/data/site.ts` |

---

## The 3 steps to restore

### 1. Paste in your real reviews
In **`src/data/site.ts`**, replace the three placeholders in `testimonials` with real
customer quotes. Use the customer's real first name and town:

```ts
export const testimonials: Testimonial[] = [
  { quote: "Their tech showed up on time and walked me through the whole system.", name: "Dana R.", town: "Blue Bell" },
  { quote: "...", name: "...", town: "..." },
  { quote: "...", name: "...", town: "..." },
];
```

### 2. Set your real review count
In **`src/data/site.ts`**, in the `business` block, replace `{{REVIEW_COUNT}}`:

```ts
reviewCount: "12",   // <- your actual number of reviews
```

### 3. Flip the switch
In **`src/data/site.ts`**:

```ts
export const ENABLE_REVIEWS = true;   // <- was false
```

Then `npm run build` and push. That's it.

---

## Optional: Google star rating in search results

`src/layouts/Layout.astro` has a **separate** switch that adds `aggregateRating`
structured data (the star rating Google can show in search results):

```ts
const ENABLE_AGGREGATE_RATING = false;   // <- flip to true
```

Only turn this on when `reviewCount` is real. Google penalizes fake or unearned
review markup, so leave it off until you genuinely have the reviews.

---

## Before you publish reviews — please check

- Use **real** quotes from **real** customers. Don't invent or paraphrase into
  something they didn't say.
- The "5-Star Rated Across Greater Philadelphia" claim in `ReviewLogos.astro` should
  actually be true. If your average isn't 5 stars, edit that line first.
- The Testimonials section lists **Google, Yelp, Facebook, Nextdoor** as platforms
  (`reviewPlatforms` in `site.ts`). Trim that list to the platforms you're actually on.

---

## Restoring the old version instead

The exact site as it looked with the review UI in place is tagged in git:

```bash
git show reviews-ui-snapshot            # see that version
git diff reviews-ui-snapshot -- src     # what changed since
```

That tag points at commit `fb363ff` (2026-07-17). You shouldn't need it — flipping
`ENABLE_REVIEWS` is the intended path — but it's there as a safety net.
