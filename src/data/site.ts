// ============================================================
// SINGLE SOURCE OF TRUTH for Aquveda.
// Edit business facts, services, and towns here, pages, the
// mega-menu, the service grid, schema, and the sitemap all read
// from this file. To add a town, add one entry to `towns`.
// {{ }} markers are placeholders YOU must fill in (see README).
// ============================================================

export const business = {
  name: "Aquveda",
  legalName: "Aquveda",
  domain: "https://aquveda.com",
  phoneDisplay: "(215) 978-9719",
  phoneHref: "tel:2159789719",
  email: "chris@aquveda.com",
  foundedYear: 2026,
  priceRange: "$$$",
  tagline: "Water, perfected.",
  // Placeholders, do not invent. Fill in when known (see README checklist).
  hicNumber: "{{HIC_NUMBER}}",
  address: "{{ADDRESS}}",
  reviewCount: "{{REVIEW_COUNT}}",
  // Office hours, edit to your real availability.
  hours: [
    { day: "Mon–Fri", time: "8:00 AM – 6:00 PM" },
    { day: "Saturday", time: "9:00 AM – 3:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
  social: {
    facebook: "{{FACEBOOK_URL}}",
    instagram: "{{INSTAGRAM_URL}}",
    google: "{{GOOGLE_PROFILE_URL}}",
  },
  // Counties served (used in schema + copy).
  counties: ["Montgomery County", "Chester County"],
  state: "PA",
} as const;

// The Jobber embed, preserved exactly from the original site.
// Rendered raw inside the QuoteForm component.
export const jobber = {
  clienthubId: "20e4967a-d1b4-4256-b3e1-75265d5650c0-4888609",
  scriptSrc:
    "https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js",
  formUrl:
    "https://clienthub.getjobber.com/client_hubs/20e4967a-d1b4-4256-b3e1-75265d5650c0/public/work_request/embedded_work_request_form?form_id=4888609",
  cssHref:
    "https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css",
} as const;

export type SubService = { name: string; desc: string };
export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  short: string; // one-line for cards / menus
  price: string; // "From $X installed" (sourced from the Price Sheet)
  icon: string; // Icon component name
  image: string;
  imageAlt: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[]; // body paragraphs
  included: string[];
  subservices: SubService[];
  process: { title: string; body: string }[];
  faqs: Faq[];
};

export const services: Service[] = [
  {
    slug: "whole-home-filtration",
    name: "Whole-Home Filtration",
    short: "Clean, great-tasting water from every tap in the house.",
    price: "From $2,400 installed",
    icon: "spray",
    image: "/images/svc-filtration.svg",
    imageAlt:
      "Whole-home water filtration system installed on the main line in a Philadelphia-area home",
    metaTitle: "Whole-Home Water Filtration in Montgomery & Chester County | Aquveda",
    metaDescription:
      "Whole-home water filtration in Blue Bell, Malvern, Exton & nearby. Remove chlorine, taste, odor, and emerging contaminants from every tap. Free in-home water test.",
    intro: [
      "What comes out of the tap is not what most homeowners think it is. Even water that meets municipal standards carries chlorine, the taste and smell that come with it, fine sediment, and a growing list of contaminants that treatment plants were never built to remove. Aquveda installs whole-home filtration that cleans the water for the entire house, not just one faucet.",
      "We start with a free in-home water test so you see exactly what is in your water before you spend a dollar. Then we size and install a filtration system on the main line, matched to your home, your water, and your flow. The result is water that tastes better, smells like nothing, and is gentler on your skin, your hair, your fixtures, and your appliances.",
      "Every install is performed by a licensed, insured installer, tested on completion, and backed by our workmanship warranty. Pair it with our Care plan and we test the water and change the filters for the life of the system, so it stays perfect without you thinking about it.",
    ],
    included: [
      "Free in-home water test and contaminant report",
      "System sized to your home, water, and flow rate",
      "Licensed, insured installation on the main line",
      "Carbon and sediment filtration for chlorine, taste, odor, and particulates",
      "Post-install water test to confirm results",
      "Workmanship warranty and optional Care plan",
    ],
    subservices: [
      { name: "Carbon Filtration", desc: "Removes chlorine, taste, and odor across the whole house." },
      { name: "Sediment Filtration", desc: "Captures sand, rust, and fine particulates before they reach your fixtures." },
      { name: "Emerging-Contaminant Media", desc: "Targeted media for concerns like PFAS where testing calls for it." },
      { name: "High-Flow Systems", desc: "Larger media tanks sized for homes with four or more bathrooms." },
      { name: "UV Disinfection", desc: "Inactivates bacteria, commonly added on well-water homes." },
      { name: "Well-Water Treatment", desc: "Iron, sulfur, and pH correction, quoted on your water-test result." },
    ],
    process: [
      { title: "Free water test", body: "We test your water in your home and show you exactly what is in it." },
      { title: "Right-sized recommendation", body: "We size the system to your home and water, and quote it on the spot." },
      { title: "Clean, licensed install", body: "A licensed installer fits the system on the main line and tidies up." },
      { title: "Test & guarantee", body: "We retest the water with you and back the work with our warranty." },
    ],
    faqs: [
      { q: "Do I really need filtration if my water is treated by the city?", a: "Municipal treatment makes water safe to the legal standard, but it still arrives with chlorine, taste and odor, sediment from aging pipes, and contaminants that plants are not required to remove. A free water test shows you exactly what is in yours, so you can decide from real data." },
      { q: "What does whole-home filtration remove?", a: "A properly sized system removes chlorine, taste, and odor across the whole house, captures sediment, and can target specific contaminants like PFAS when your test calls for it. We size the media to your actual water." },
      { q: "How long does an install take?", a: "Most whole-home filtration installs are completed in a single visit of a few hours by a licensed installer, with the water tested before and after." },
      { q: "Do the filters need maintenance?", a: "Yes, media and filters are serviced on a schedule. Our Care plan handles the testing and filter changes for you so the system stays at full performance for its life." },
    ],
  },
  {
    slug: "water-softening",
    name: "Water Softening & Conditioning",
    short: "End hard-water scale and protect your plumbing and appliances.",
    price: "From $2,200 installed",
    icon: "shield",
    image: "/images/svc-softener.svg",
    imageAlt:
      "Water softener system protecting a suburban Pennsylvania home from hard-water scale",
    metaTitle: "Water Softeners & Conditioners in Montgomery & Chester County | Aquveda",
    metaDescription:
      "Water softening and salt-free conditioning in Blue Bell, Malvern, West Chester & nearby. Stop scale, protect appliances, softer skin and laundry. Free water test.",
    intro: [
      "Hard water does slow, steady damage. It scales your fixtures, shortens the life of your water heater and appliances, leaves spots on glassware, and makes skin and hair feel dry and laundry feel stiff. Most of the Philadelphia suburbs run hard, and the cost adds up long before anyone connects it to the water.",
      "Aquveda installs metered water softeners and salt-free conditioners sized to your home and your hardness level, measured during a free in-home water test. A softener removes the minerals that cause scale; a salt-free conditioner controls scale without salt or backwash where that fits better. You feel the difference within a day, in the shower and at the sink.",
      "Each system is installed by a licensed, insured installer, plumbed with a clean loop and bypass, and backed by our workmanship warranty. Add the Care plan and we keep it dialed in and stocked with salt so it simply works.",
    ],
    included: [
      "Free in-home hardness test and recommendation",
      "Softener or salt-free conditioner sized to your home",
      "Clean loop-and-bypass installation by a licensed installer",
      "Protection for your water heater, fixtures, and appliances",
      "Post-install verification",
      "Workmanship warranty and optional Care plan",
    ],
    subservices: [
      { name: "Metered Softener", desc: "Removes hardness on demand and regenerates only when needed, saving salt and water." },
      { name: "Salt-Free Conditioner", desc: "Controls scale with no salt and no backwash where it suits the home." },
      { name: "Loop & Bypass Install", desc: "A clean plumbing loop so the system is easy to service and bypass." },
      { name: "Appliance Protection", desc: "Less scale means longer life for heaters, dishwashers, and washing machines." },
      { name: "Salt Delivery", desc: "Optional recurring salt delivery and fill as part of the Care plan." },
    ],
    process: [
      { title: "Free water test", body: "We measure your hardness and walk you through what it is costing you." },
      { title: "Right system, right size", body: "Softener or conditioner, sized to your home and water use." },
      { title: "Clean, licensed install", body: "A licensed installer plumbs a tidy loop and bypass." },
      { title: "Verify & guarantee", body: "We confirm the result and back the work with our warranty." },
    ],
    faqs: [
      { q: "How do I know if I have hard water?", a: "Spots on glassware, scale on faucets and shower doors, dry skin, stiff laundry, and a water heater that wears out early are all signs. A free in-home test gives you the exact hardness number in minutes." },
      { q: "What's the difference between a softener and a salt-free conditioner?", a: "A softener uses ion exchange to remove the hardness minerals entirely, which is the most complete fix. A salt-free conditioner changes the minerals so they don't form scale, with no salt and no backwash. We recommend the right one for your home and water." },
      { q: "Will a softener make my water feel slippery?", a: "Softened water lathers more easily and rinses cleaner, which some people describe as a silky feel. It also means you use less soap and detergent." },
      { q: "Do I have to keep buying salt?", a: "A metered softener uses salt efficiently, regenerating only when needed. Our Care plan can include scheduled salt delivery and fill so you never have to handle it." },
    ],
  },
  {
    slug: "drinking-water",
    name: "Drinking Water Systems",
    short: "Bottled-water quality at your kitchen tap with reverse osmosis.",
    price: "From $700 installed",
    icon: "window",
    image: "/images/svc-ro.svg",
    imageAlt:
      "Under-sink reverse osmosis drinking water system installed at a kitchen tap",
    metaTitle: "Reverse Osmosis Drinking Water in Montgomery & Chester County | Aquveda",
    metaDescription:
      "Under-sink reverse osmosis drinking water systems in Blue Bell, Malvern, Exton & nearby. Bottled-water quality at the tap. Free in-home water test and quote.",
    intro: [
      "For the water you actually drink and cook with, reverse osmosis is the most thorough treatment. Aquveda installs under-sink RO systems that push your water through a fine membrane and a series of filters, stripping out the dissolved solids, taste, and contaminants that even good whole-home filtration leaves behind. The result is clean, crisp, bottled-water quality straight from a dedicated tap.",
      "It is the simplest upgrade with the most noticeable daily payoff: better coffee and tea, clearer ice, better-tasting cooking, and the end of buying and hauling bottled water. We can add a remineralization stage that puts beneficial minerals back for taste, and a designer faucet that matches your kitchen.",
      "Every system is installed cleanly under the sink by a licensed installer, with the drinking water tested on completion. With the Care plan, we change the filters and the membrane on schedule so the water stays pure.",
    ],
    included: [
      "Multi-stage reverse osmosis at the kitchen tap",
      "Dedicated drinking-water faucet",
      "Optional remineralization for taste",
      "Clean under-sink installation by a licensed installer",
      "Post-install water quality check",
      "Workmanship warranty and optional Care plan",
    ],
    subservices: [
      { name: "4-Stage Reverse Osmosis", desc: "Membrane and carbon stages for bottled-water quality at the tap." },
      { name: "Remineralization", desc: "Adds beneficial minerals back for a crisp, balanced taste." },
      { name: "Designer Faucet Upgrade", desc: "A dedicated faucet that matches your kitchen finish." },
      { name: "Fridge & Ice Line", desc: "Optional connection so your fridge and ice maker get RO water too." },
      { name: "Filter & Membrane Service", desc: "Scheduled changes through the Care plan keep it pure." },
    ],
    process: [
      { title: "Free water test", body: "We test your tap water and show you what RO will remove." },
      { title: "Choose your setup", body: "Standard, remineralized, designer faucet, fridge line, your call." },
      { title: "Clean under-sink install", body: "A licensed installer fits it tidily and routes the drain and lines." },
      { title: "Taste the difference", body: "We test the finished water with you and back it with our warranty." },
    ],
    faqs: [
      { q: "What does reverse osmosis remove that filtration doesn't?", a: "RO pushes water through a fine membrane that removes dissolved solids, many contaminants, and the last of the taste that carbon filtration alone leaves behind. It is the highest level of treatment for drinking and cooking water." },
      { q: "Does RO water taste flat?", a: "Pure RO water can taste very clean. If you prefer a fuller taste, we add a remineralization stage that puts beneficial minerals back, which most people prefer." },
      { q: "Can it connect to my fridge and ice maker?", a: "Yes. We can run an RO line to your refrigerator and ice maker so they get the same clean water as the tap." },
      { q: "How often do the filters need changing?", a: "Pre- and post-filters are typically changed annually and the membrane every few years. Our Care plan handles it on schedule so you never have to track it." },
    ],
  },
  {
    slug: "service-plan",
    name: "Care Plan & Water Testing",
    short: "We test your water and change your filters for life, automatically.",
    price: "From $49/month",
    icon: "repeat",
    image: "/images/svc-care.svg",
    imageAlt:
      "Aquveda technician testing home water quality during a scheduled Care plan visit",
    metaTitle: "Water Testing & Filter Service Plan in Montgomery & Chester County | Aquveda",
    metaDescription:
      "The Aquveda Care plan: annual water testing, scheduled filter changes, priority service, and member pricing. Keep your water perfect for the life of the system.",
    intro: [
      "A water system is only as good as its upkeep. Filters load up, membranes age, and softeners drift out of adjustment, and most homeowners never notice until performance drops. The Aquveda Care plan takes that off your plate entirely.",
      "Members get an annual in-home water test, scheduled filter and membrane changes, priority service if anything ever needs attention, and member pricing on parts and any future systems. We track your system, show up on schedule, and keep your water exactly where it should be, for the life of the equipment.",
      "With the plan, you never have to track your water system yourself. It is available on any Aquveda install, and on most existing systems we did not install, after an initial assessment.",
    ],
    included: [
      "Annual in-home water test and report",
      "Scheduled filter and membrane changes",
      "Priority scheduling for any service need",
      "Member pricing on parts and future systems",
      "Optional softener salt delivery and fill",
      "System tracking so nothing is ever overdue",
    ],
    subservices: [
      { name: "Annual Water Test", desc: "We retest your water every year and confirm the system is performing." },
      { name: "Scheduled Filter Changes", desc: "Filters and membranes changed on time, included in the plan." },
      { name: "Priority Service", desc: "Members move to the front of the schedule whenever something is needed." },
      { name: "Member Pricing", desc: "Discounted parts and preferred pricing on any future systems." },
      { name: "Salt Delivery", desc: "Optional recurring softener salt delivery and fill." },
    ],
    process: [
      { title: "Enroll", body: "Add the Care plan to a new install or after an assessment of your current system." },
      { title: "We track it", body: "Your system and service dates live in our system, not your memory." },
      { title: "We show up", body: "Scheduled visits for testing and filter changes, on time." },
      { title: "Water stays perfect", body: "You never think about your water again. That's the point." },
    ],
    faqs: [
      { q: "What does the Care plan cost?", a: "Plans start around $49 a month, or an annual option that saves versus monthly. The exact price depends on your systems and whether salt delivery is included. We quote it with your install." },
      { q: "Can I get the plan if Aquveda didn't install my system?", a: "Usually yes. We do an initial assessment of your existing equipment, and if it is in good shape we can put it on the Care plan." },
      { q: "What's included versus extra?", a: "The plan includes the annual test, scheduled filter and membrane changes, priority service, and member pricing. Major repairs or new equipment are quoted separately at member pricing." },
      { q: "Can I cancel?", a: "Yes. You can cancel anytime, and you return to paying per visit." },
    ],
  },
];

export type Town = {
  slug: string;
  name: string;
  county: string;
  region: string;
  blurb: string;
};

// To add a town: add one entry here. A page, schema, sitemap entry,
// and service-area link are generated automatically.
export const towns: Town[] = [
  { slug: "blue-bell", name: "Blue Bell", county: "Montgomery County", region: "Montgomery County",
    blurb: "From the neighborhoods off Skippack Pike to the homes around Normandy Farms, Blue Bell runs hard on municipal water, ideal for whole-home softening and filtration." },
  { slug: "whitpain", name: "Whitpain", county: "Montgomery County", region: "Montgomery County",
    blurb: "Whitpain Township mixes municipal and well-water homes, both of which benefit from testing and the right treatment system." },
  { slug: "ambler", name: "Ambler", county: "Montgomery County", region: "Montgomery County",
    blurb: "Ambler's historic borough homes and newer construction alike see hard-water scale that a softener puts an end to." },
  { slug: "malvern", name: "Malvern", county: "Chester County", region: "Chester County",
    blurb: "From the borough to the surrounding townships, Malvern has real well-water pockets where filtration and disinfection are often genuinely needed." },
  { slug: "exton", name: "Exton", county: "Chester County", region: "Chester County",
    blurb: "Exton's mix of municipal-hard and private-well homes makes a free water test the right first step for nearly every household." },
  { slug: "west-chester", name: "West Chester", county: "Chester County", region: "Chester County",
    blurb: "West Chester's historic homes and newer developments both benefit from softening, filtration, and clean drinking water at the tap." },
  { slug: "great-valley", name: "Great Valley", county: "Chester County", region: "Chester County",
    blurb: "Homes across the Great Valley see hard water and aging service lines, exactly what whole-home treatment is built for." },
  { slug: "wayne", name: "Wayne", county: "Delaware County", region: "Main Line",
    blurb: "Main Line homes in Wayne set a high bar, premium whole-home filtration and drinking water fit right in." },
  { slug: "media", name: "Media", county: "Delaware County", region: "Delaware County",
    blurb: "From borough rowhomes to leafy side streets, Media households improve their water with testing and the right system." },
  { slug: "doylestown", name: "Doylestown", county: "Bucks County", region: "Bucks County",
    blurb: "Doylestown has significant well-water acreage where filtration, softening, and UV disinfection make a real difference." },
  { slug: "newtown", name: "Newtown", county: "Bucks County", region: "Bucks County",
    blurb: "Newtown's well and municipal homes alike rely on testing and treatment for clean, soft, great-tasting water." },
];

// Towns featured in the hero service-area band (a readable subset).
export const featuredTownNames = ["Blue Bell", "Malvern", "Exton", "West Chester", "Ambler", "Wayne"];

export type WhyItem = { icon: string; title: string; body: string };

export const whyChoose: WhyItem[] = [
  { icon: "bolt", title: "Free In-Home Water Test", body: "We test your water in your home and show you exactly what is in it before you spend a dollar." },
  { icon: "shield", title: "Licensed & Insured", body: "Every system is installed by a licensed, insured installer. You're protected start to finish." },
  { icon: "badge", title: "Workmanship Warranty", body: "If your water isn't right, we make it right. We stand behind every install." },
  { icon: "home", title: "Locally Owned & Operated", body: "We live and work in Montgomery and Chester County, your neighbors, not a franchise." },
  { icon: "repeat", title: "Care Plan for Life", body: "We test your water and change your filters on schedule, so the system stays perfect." },
  { icon: "tag", title: "Upfront, Honest Pricing", body: "The number we quote is the number you pay. No pressure, no surprises." },
  { icon: "star", title: "Premium Equipment", body: "Systems sized to your home and your water, not a one-size box off a shelf." },
  { icon: "users", title: "Clean, Careful Installs", body: "Tidy, professional work that protects your home and leaves the space better than we found it." },
];

export type Stat = { value: string; label: string };

// HONEST credibility band, no fabricated history or job counts.
export const stats: Stat[] = [
  { value: "Free", label: "In-Home Water Test" },
  { value: "Licensed", label: "& Fully Insured" },
  { value: "Warranty", label: "On Every Install" },
  { value: "Local", label: "Montgomery & Chester County" },
];

// Review-platform placeholders for the testimonials section.
export const reviewPlatforms = ["Google", "Yelp", "Facebook", "Nextdoor"];

export type Testimonial = { quote: string; name: string; town: string };

// Editable placeholders, replace with real reviews once you have them.
export const testimonials: Testimonial[] = [
  { quote: "{{TESTIMONIAL_1, paste a real customer review here once you have one.}}", name: "{{Customer name}}", town: "{{Town}}" },
  { quote: "{{TESTIMONIAL_2, paste a real customer review here once you have one.}}", name: "{{Customer name}}", town: "{{Town}}" },
  { quote: "{{TESTIMONIAL_3, paste a real customer review here once you have one.}}", name: "{{Customer name}}", town: "{{Town}}" },
];

// Primary navigation (the mega-menu is built from `services`).
export const nav = [
  { label: "Services", href: "/#services", mega: true },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Learn", href: "/learn" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ============================================================
// FLAGSHIP SYSTEM (the featured bundle on the home page)
// Pricing sourced from "Aquveda - Price Sheet.xlsx":
// filtration + softener combo $5,400; whole-home + RO bundle 10% off.
// ============================================================
export const flagship = {
  eyebrow: "The Aquveda Flagship",
  name: "The Complete Home Water System",
  tagline:
    "Whole-home filtration, a water softener, and reverse-osmosis drinking water, sized to your home and installed in one trip.",
  price: "From $5,400 installed",
  priceNote: "Bundle filtration, softening, and RO and save 10%.",
  image: "/images/flagship-system.svg",
  imageAlt:
    "The complete Aquveda home water system: whole-home filter, softener, and under-sink reverse osmosis",
  features: [
    "Chlorine, taste, odor, and sediment removed from every tap",
    "Hard-water scale stopped, protecting your plumbing and appliances",
    "Bottled-water quality at the kitchen tap with reverse osmosis",
    "Sized to your home after a free in-home water test",
    "Installed by a licensed, insured installer in one visit",
    "Backed by our workmanship warranty and the optional Care plan",
  ],
};

// ============================================================
// HOW IT WORKS (3-step flow on the home page)
// ============================================================
export type Step = { title: string; body: string };
export const steps: Step[] = [
  { title: "Free in-home water test", body: "We test your water in your home and show you exactly what is in it, no pressure, no obligation." },
  { title: "Review and quote", body: "We explain the results in plain language and quote the right-sized system on the spot, with upfront pricing." },
  { title: "Install and enjoy", body: "A licensed installer fits your system cleanly in one visit, then we retest the water with you and back it with our warranty." },
];

// ============================================================
// COMPARISON TABLE (generic, no named competitors)
// ============================================================
export type CompareRow = { feature: string; aquveda: boolean; typical: boolean; diy: boolean };
export const comparison = {
  columns: ["Aquveda", "Typical providers", "Big-box DIY"],
  rows: [
    { feature: "Free in-home water test before you buy", aquveda: true, typical: false, diy: false },
    { feature: "Licensed, insured installer", aquveda: true, typical: true, diy: false },
    { feature: "System sized to your home and water", aquveda: true, typical: true, diy: false },
    { feature: "Upfront pricing, no high-pressure sales", aquveda: true, typical: false, diy: true },
    { feature: "No long-term contracts or rentals", aquveda: true, typical: false, diy: true },
    { feature: "Workmanship warranty on the install", aquveda: true, typical: false, diy: false },
    { feature: "Local, owner-operated service", aquveda: true, typical: false, diy: false },
    { feature: "Care plan: testing and filters handled for life", aquveda: true, typical: false, diy: false },
  ] as CompareRow[],
};

// ============================================================
// LEARN (water-education articles; starter set, expand anytime)
// Add an entry to generate a page at /learn/<slug>.
// ============================================================
export type Article = {
  slug: string;
  title: string;
  tag: string;
  excerpt: string;
  metaDescription: string;
  body: string[]; // paragraphs
};
export const articles: Article[] = [
  {
    slug: "is-montgomery-chester-county-water-hard",
    title: "Is the water hard in Montgomery and Chester County?",
    tag: "Local water",
    excerpt: "Most of the western Philadelphia suburbs run moderately hard to hard. Here is what that means for your home, and how to know your number.",
    metaDescription: "Is water hard in Montgomery & Chester County, PA? What hardness means for your home and how a free water test gives you the exact number. Aquveda explains.",
    body: [
      "If you see spots on your glassware, crusty buildup on faucets and showerheads, or your soap never seems to lather, you are almost certainly dealing with hard water. Across Montgomery and Chester County, most homes, whether on municipal supply or a private well, see water that runs moderately hard to hard.",
      "Hardness is dissolved calcium and magnesium. It scales the inside of your water heater and pipes, shortens the life of dishwashers and washing machines, and leaves skin and hair feeling dry. It will not harm your health, and the costs add up quietly. The harder the water, the faster the damage adds up.",
      "The only way to know your real number is to test. A free in-home water test measures your hardness in minutes and shows you whether a softener or a salt-free conditioner is the right fix. From there, you decide based on your actual water.",
    ],
  },
  {
    slug: "what-a-water-test-reveals",
    title: "What a free water test actually reveals",
    tag: "Getting started",
    excerpt: "A good test takes minutes and tells you far more than hardness. Here is what we measure and why it matters before you spend a dollar.",
    metaDescription: "What does a home water test reveal? Hardness, chlorine, sediment, and more, and why Aquveda starts every job with a free in-home test before recommending anything.",
    body: [
      "Every Aquveda job starts with a free in-home water test, because the right system depends entirely on what is in your water. Guessing leads to oversized equipment you do not need, or undersized equipment that cannot keep up.",
      "We check hardness, chlorine and the taste and odor that come with it, sediment and clarity, and, for well homes, signs of iron, sulfur, and pH issues. Where testing calls for it, we can target specific contaminants like PFAS. You see the results in plain language, right at your kitchen table.",
      "From there we recommend only what your water needs. Sometimes that is a full system, sometimes it is a single softener or a drinking-water unit. Either way, you make the call with real data in front of you, and the test costs you nothing.",
    ],
  },
  {
    slug: "softener-vs-salt-free-conditioner",
    title: "Softener vs. salt-free conditioner: which is right?",
    tag: "Softening",
    excerpt: "Both control scale, but they work differently. Here is how to choose between a traditional softener and a salt-free conditioner.",
    metaDescription: "Water softener vs. salt-free conditioner: how they differ, the pros and cons of each, and how to choose the right one for your Montgomery or Chester County home.",
    body: [
      "A traditional softener uses ion exchange to actually remove the calcium and magnesium that cause hardness. It is the most complete fix: no scale, easier lathering, softer laundry, and longer appliance life. It uses salt and a small amount of water to regenerate, and a metered head only regenerates when needed, which keeps both in check.",
      "A salt-free conditioner does not remove the minerals; it changes their structure so they do not stick and form scale. It uses no salt and no backwash, which suits homes that want low maintenance or have drainage or sodium concerns. You will not get the slippery softened-water feel, but you will get strong scale control.",
      "Which is right comes down to your hardness level, your household, and your preferences. A free in-home test gives us the number, and we recommend the option that fits your home and water.",
    ],
  },
  {
    slug: "why-reverse-osmosis-for-drinking-water",
    title: "Why reverse osmosis for the water you drink",
    tag: "Drinking water",
    excerpt: "Whole-home filtration cleans every tap. For the water you actually drink and cook with, reverse osmosis takes it one step further.",
    metaDescription: "Why use reverse osmosis for drinking water? How RO differs from whole-home filtration, what it removes, and whether remineralization is worth it. Aquveda explains.",
    body: [
      "Whole-home filtration strips chlorine, taste, odor, and sediment from every tap in the house. For most uses, that is exactly what you want. For the water you drink and cook with, reverse osmosis goes further.",
      "RO pushes water through a very fine membrane that removes dissolved solids and many contaminants that carbon filtration alone leaves behind. The result is clean, crisp, bottled-water quality straight from a dedicated faucet, with no more buying or hauling cases of bottled water.",
      "Pure RO water can taste very clean; if you prefer a fuller taste, a remineralization stage adds beneficial minerals back. We can also run a line to your refrigerator and ice maker so they get the same water. It is the simplest upgrade with the most noticeable daily payoff.",
    ],
  },
]; 