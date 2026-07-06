// ============================================================
// SINGLE SOURCE OF TRUTH for Wellbrook.
// Edit business facts, services, and towns here, pages, the
// mega-menu, the service grid, schema, and the sitemap all read
// from this file. To add a town, add one entry to `towns`.
// {{ }} markers are placeholders YOU must fill in (see README).
// ============================================================

export const business = {
  name: "Wellbrook",
  legalName: "Wellbrook",
  domain: "https://wellbrookwater.com",
  phoneDisplay: "(215) 978-9719",
  phoneHref: "tel:2159789719",
  email: "chris@wellbrookwater.com",
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
    facebook: "https://www.facebook.com/profile.php?id=61591441258904",
    instagram: "https://www.instagram.com/wellbrookwater/",
    google: "{{GOOGLE_PROFILE_URL}}",
  },
  // Counties served (used in schema + copy).
  counties: ["Montgomery County", "Chester County"],
  state: "PA",
} as const;

export type SubService = { name: string; desc: string };
export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  short: string; // one-line for cards / menus
  price?: string; // optional; Raleigh-style cards show no per-service price
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
    short: "Removes hardness, chlorine, and 75+ contaminants from every tap.",
    icon: "spray",
    image: "/images/svc-filtration.svg",
    imageAlt:
      "Whole-home water filtration system installed on the main line in a Philadelphia-area home",
    metaTitle: "Whole-Home Water Filtration in Greater Philadelphia | Wellbrook",
    metaDescription:
      "Whole-home water filtration in Blue Bell, Malvern, Exton & nearby. Remove chlorine, taste, odor, and emerging contaminants from every tap. Free, no-obligation quotes.",
    intro: [
      "What comes out of the tap is not what most homeowners think it is. Even water that meets municipal standards carries chlorine, the taste and smell that come with it, fine sediment, and a growing list of contaminants that treatment plants were never built to remove. Wellbrook installs whole-home filtration that cleans the water for the entire house, not just one faucet.",
      "We start with a free, no-obligation quote so you know the system and the price up front. Then we size and install a filtration system on the main line, matched to your home, your water, and your flow. The result is water that tastes better, smells like nothing, and is gentler on your skin, your hair, your fixtures, and your appliances.",
      "Every install is performed by a licensed, insured installer, tested on completion, and backed by our lifetime workmanship warranty and the manufacturer equipment warranty.",
    ],
    included: [
      "Free, no-obligation quote",
      "System sized to your home, water, and flow rate",
      "Licensed, insured installation on the main line",
      "Hardness, chlorine, taste, odor, sediment, and 75+ contaminants addressed",
      "Post-install water test to confirm results",
      "Lifetime workmanship warranty and manufacturer equipment warranty",
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
      { title: "Free quote", body: "Tell us your home and water needs and we send a clear, no-obligation quote." },
      { title: "Right-sized recommendation", body: "We size the system to your home and water, and quote it on the spot." },
      { title: "Clean, licensed install", body: "A licensed installer fits the system on the main line and tidies up." },
      { title: "Test & guarantee", body: "We retest the water with you and back the work with our warranty." },
    ],
    faqs: [
      { q: "Do I really need filtration if my water is treated by the city?", a: "Municipal treatment makes water safe to the legal standard, but it still arrives with chlorine, taste and odor, sediment from aging pipes, and contaminants that plants are not required to remove. Tell us about your home and we'll quote the right fix, with no obligation." },
      { q: "What does whole-home filtration remove?", a: "A properly sized system removes chlorine, taste, and odor across the whole house, captures sediment, and can target specific contaminants like PFAS when your test calls for it. We size the media to your actual water." },
      { q: "How long does an install take?", a: "Most whole-home filtration installs are completed in a single visit of a few hours by a licensed installer, with the water tested before and after." },
      { q: "Do the filters need maintenance?", a: "Yes, media and filters are serviced on a schedule. We can handle the testing and filter changes for you so the system stays at full performance for its life." },
    ],
  },
  {
    slug: "reverse-osmosis",
    name: "Reverse Osmosis",
    short: "Drinking water for your kitchen. 7-stage filtration with alkaline post-filter.",
    icon: "drop",
    image: "/images/svc-ro.svg",
    imageAlt:
      "Under-sink reverse osmosis drinking water system installed at a kitchen tap",
    metaTitle: "Reverse Osmosis Drinking Water in Greater Philadelphia | Wellbrook",
    metaDescription:
      "Under-sink reverse osmosis drinking water in Blue Bell, Malvern, Exton & nearby. 7-stage filtration with alkaline post-filter. Free, no-obligation quote.",
    intro: [
      "For the water you drink and cook with, reverse osmosis is the most thorough treatment. Wellbrook installs under-sink RO systems that push your water through a multi-stage process and a fine membrane, removing dissolved solids, taste, and contaminants that whole-home filtration leaves behind. The result is clean, crisp, bottled-water quality from a dedicated tap.",
      "Our system uses 7-stage filtration with an alkaline post-filter that adds beneficial minerals back for a balanced taste. You get better coffee and tea, clearer ice, better-tasting cooking, and the end of buying and hauling bottled water. We can run a line to your refrigerator and ice maker so they get the same water.",
      "Every system is installed cleanly under the sink by a licensed installer, with the drinking water tested on completion and backed by our lifetime workmanship warranty.",
    ],
    included: [
      "7-stage under-sink reverse osmosis",
      "Alkaline post-filter that remineralizes for taste",
      "Dedicated drinking-water faucet",
      "Clean under-sink installation by a licensed installer",
      "Optional refrigerator and ice-maker line",
      "Lifetime workmanship warranty and manufacturer equipment warranty",
    ],
    subservices: [
      { name: "7-Stage Reverse Osmosis", desc: "Multi-stage filtration and a fine membrane for bottled-water quality." },
      { name: "Alkaline Post-Filter", desc: "Adds beneficial minerals back for a crisp, balanced taste." },
      { name: "Dedicated Faucet", desc: "A separate drinking-water faucet at the kitchen sink." },
      { name: "Fridge & Ice Line", desc: "Optional connection so your fridge and ice maker get RO water too." },
      { name: "Filter & Membrane Service", desc: "Scheduled changes keep the water pure." },
    ],
    process: [
      { title: "Free quote", body: "Tell us what you need and we quote the right RO setup, no obligation." },
      { title: "Choose your setup", body: "Standard, with a fridge line or other options, your call." },
      { title: "Clean under-sink install", body: "A licensed installer fits it tidily and routes the drain and lines." },
      { title: "Taste the difference", body: "We test the finished water with you and back it with our warranty." },
    ],
    faqs: [
      { q: "What does reverse osmosis remove that filtration doesn't?", a: "RO pushes water through a fine membrane that removes dissolved solids, many contaminants, and the last of the taste that carbon filtration alone leaves behind. It is the highest level of treatment for drinking and cooking water." },
      { q: "What is the alkaline post-filter for?", a: "Pure RO water can taste very clean. The alkaline post-filter adds beneficial minerals back for a fuller, balanced taste, which most people prefer." },
      { q: "Can it connect to my fridge and ice maker?", a: "Yes. We can run an RO line to your refrigerator and ice maker so they get the same clean water as the tap." },
      { q: "How often do the filters need changing?", a: "Pre- and post-filters are typically changed annually and the membrane every few years. We can handle it on a schedule so you never have to track it." },
    ],
  },
  {
    slug: "well-water-treatment",
    name: "Well Water Treatment",
    short: "Specialized systems for rural homes with iron, manganese, or sulfur issues.",
    icon: "wrench",
    image: "/images/svc-softener.svg",
    imageAlt:
      "Well water treatment system removing iron, manganese, and sulfur for a rural Pennsylvania home",
    metaTitle: "Well Water Treatment in Greater Philadelphia | Wellbrook",
    metaDescription:
      "Well water treatment for rural Philadelphia-area homes: iron, manganese, sulfur, pH, and bacteria. Free, no-obligation quote, then a system sized to your home.",
    intro: [
      "Well water gives you independence from the municipal supply, and a different set of problems. Iron stains fixtures and laundry rust-orange, manganese leaves black specks, sulfur brings a rotten-egg smell, low pH eats at copper pipes, and bacteria can show up without warning. Wellbrook builds well-water systems for rural homes across the greater Philadelphia area, sized to what your water actually contains.",
      "It starts with a free quote. Well water varies house to house, so we design the right system for your home, whether that means an iron and sulfur filter, pH correction, UV disinfection, or a combination, and price it upfront.",
      "Every system is installed by a licensed, insured installer and backed by our lifetime workmanship warranty. We retest the water with you on completion so you can see the difference.",
    ],
    included: [
      "Free, no-obligation quote",
      "System designed around your specific results",
      "Iron, manganese, and sulfur removal as needed",
      "pH correction and UV disinfection where called for",
      "Licensed, insured installation",
      "Lifetime workmanship warranty and manufacturer equipment warranty",
    ],
    subservices: [
      { name: "Iron & Manganese Removal", desc: "Stops the orange and black staining on fixtures and laundry." },
      { name: "Sulfur Removal", desc: "Clears the rotten-egg smell from hydrogen sulfide." },
      { name: "pH Correction", desc: "Neutralizes acidic water that corrodes copper pipes." },
      { name: "UV Disinfection", desc: "Inactivates bacteria, common on private wells." },
      { name: "Sediment Filtration", desc: "Captures sand and grit from the well." },
      { name: "Whole-Home Softening", desc: "Adds hardness removal where your results call for it." },
    ],
    process: [
      { title: "Free quote", body: "Tell us about your well and we provide a quote; we confirm well specifics before install." },
      { title: "System designed to your results", body: "We design around your iron, sulfur, pH, and bacteria readings, and quote it." },
      { title: "Clean, licensed install", body: "A licensed installer fits the system and tidies up." },
      { title: "Retest & guarantee", body: "We retest the water with you and back the work with our warranty." },
    ],
    faqs: [
      { q: "Why is well water treated differently than city water?", a: "City water is already disinfected and regulated. Well water is not, so it can carry iron, manganese, sulfur, low pH, sediment, and bacteria that vary house to house. The right system depends on your specific test results." },
      { q: "What causes the rotten-egg smell?", a: "Usually hydrogen sulfide gas, sometimes with sulfur bacteria. We confirm the source with a test and remove it with the right filter or treatment." },
      { q: "Do I need UV disinfection?", a: "If your test shows bacteria, UV is a reliable way to inactivate it without chemicals. We recommend it when the results call for it, not by default." },
      { q: "How often should well water be tested?", a: "At least once a year, and any time the taste, smell, or color changes. We can test it as part of a service visit." },
    ],
  },
  {
    slug: "specialty-services",
    name: "Specialty Services",
    short: "Water softeners, UV purification, iron & sulfur removal, and other niche treatment.",
    icon: "shield",
    image: "/images/svc-care.svg",
    imageAlt:
      "Specialty water treatment equipment including a water softener and UV purification",
    metaTitle: "Specialty Water Treatment in Greater Philadelphia | Wellbrook",
    metaDescription:
      "Specialty water treatment across Greater Philadelphia: water softeners, UV purification, iron and sulfur removal, and niche systems, with free, no-obligation quotes.",
    intro: [
      "Some water problems need a targeted fix rather than a full system. Wellbrook installs the specialty equipment that solves a specific issue: a water softener for hard-water scale, UV purification for bacteria, iron and sulfur removal for staining and odor, and other niche treatment that matches what your test finds.",
      "Every recommendation starts with a free, no-obligation quote. We size the equipment to your home and water, explain it in plain language, and price it upfront, so you buy only what your water needs.",
      "Each install is handled by a licensed, insured installer and backed by our lifetime workmanship warranty.",
    ],
    included: [
      "Free, no-obligation quote and recommendation",
      "Water softeners, metered or salt-free",
      "UV purification for bacteria",
      "Iron and sulfur removal",
      "Equipment sized to your home and water",
      "Lifetime workmanship warranty and manufacturer equipment warranty",
    ],
    subservices: [
      { name: "Water Softeners", desc: "Metered softeners and salt-free conditioners that stop hard-water scale." },
      { name: "UV Purification", desc: "Inactivates bacteria without adding chemicals." },
      { name: "Iron & Sulfur Removal", desc: "Clears staining and the rotten-egg smell." },
      { name: "Sediment Filtration", desc: "Captures sand, rust, and grit before it reaches fixtures." },
      { name: "pH Correction", desc: "Neutralizes acidic water that corrodes pipes." },
      { name: "Filter & Salt Service", desc: "Scheduled filter changes and softener salt delivery." },
    ],
    process: [
      { title: "Free quote", body: "Tell us the issue and we quote the right fix, no obligation." },
      { title: "Targeted recommendation", body: "We size the right equipment for the problem and quote it upfront." },
      { title: "Clean, licensed install", body: "A licensed installer fits it and tidies up." },
      { title: "Verify & guarantee", body: "We confirm the result and back the work with our warranty." },
    ],
    faqs: [
      { q: "Do you install just a water softener?", a: "Yes. A softener is one of our most common specialty installs. We size it to your home and water, and the quote is free with no obligation." },
      { q: "What is the difference between a softener and a salt-free conditioner?", a: "A softener removes the hardness minerals using ion exchange, the most complete fix. A salt-free conditioner changes the minerals so they don't form scale, with no salt and no backwash. We recommend the right one for your home and water." },
      { q: "Is UV purification worth it?", a: "If your test shows bacteria, UV is a reliable, chemical-free way to inactivate it. We recommend it when the results call for it." },
      { q: "Can you service equipment you didn't install?", a: "Usually yes, after an initial assessment. We can handle filter changes, salt delivery, and repairs on most existing systems." },
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
    blurb: "Exton's mix of municipal-hard and private-well homes makes a free, no-obligation quote the right first step for nearly every household." },
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
  { icon: "bolt", title: "Free, No-Obligation Quote", body: "Tell us what you need and we send a clear, upfront quote before you spend a dollar." },
  { icon: "shield", title: "Licensed & Insured", body: "Every system is installed by a licensed, insured installer. You're protected start to finish." },
  { icon: "badge", title: "Lifetime Workmanship Warranty", body: "We stand behind every install for as long as you own your home." },
  { icon: "home", title: "Locally Owned & Operated", body: "We live and work in the western Philadelphia suburbs, your neighbors, not a franchise." },
  { icon: "report", title: "Manufacturer Equipment Warranty", body: "Your system is covered by the manufacturer warranty, on top of our lifetime workmanship guarantee." },
  { icon: "tag", title: "Upfront, Honest Pricing", body: "The number we quote is the number you pay. No pressure, no surprises." },
  { icon: "star", title: "Premium Equipment", body: "Systems sized to your home and your water, not a one-size box off a shelf." },
  { icon: "users", title: "Clean, Careful Installs", body: "Tidy, professional work that protects your home and leaves the space better than we found it." },
];

export type Stat = { value: string; label: string };

// HONEST credibility band, no fabricated history or job counts.
export const stats: Stat[] = [
  { value: "Free", label: "No-Obligation Quotes" },
  { value: "Licensed", label: "& Fully Insured" },
  { value: "Warranty", label: "On Every Install" },
  { value: "Local", label: "Greater Philadelphia" },
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
  { label: "Care Plan", href: "/care-plan" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ============================================================
// FLAGSHIP SYSTEM (the featured bundle on the home page)
// Pricing sourced from "Wellbrook - Price Sheet.xlsx":
// Complete Home Water System: founder $2,699, regular $5,998 (matches the reference site).
// ============================================================
export const flagship = {
  eyebrow: "Founder pricing — limited install slots",
  name: "The Complete Home Water System",
  tagline:
    "Whole-home softening with chlorine and chloramine carbon filtration, plus an under-sink reverse-osmosis drinking water system, installed by a licensed plumber in one trip.",
  priceRegular: "$5,998",
  price: "$2,699",
  priceUnit: "installed",
  priceNote: "Founder pricing, limited to a set number of installs each month. Regular price $5,998.",
  image: "/images/complete-system.webp",
  imageAlt:
    "Wellbrook Complete Home Water System: whole-home softener and filtration tanks with an under-sink reverse-osmosis unit and faucet",
  features: [
    "Complete home system: softening plus chlorine and chloramine carbon filtration",
    "Under-sink reverse-osmosis drinking water system with alkaline post-filter",
    "Licensed plumber installation",
    "Lifetime workmanship warranty",
    "Manufacturer equipment warranty",
  ],
};

// ============================================================
// OUTCOME GUARANTEE (risk reversal — guarantee the result, not just labor)
// ============================================================
export const guarantee = {
  title: "The Wellbrook Water Guarantee",
  promise:
    "If your water isn't measurably softer and cleaner on a follow-up retest, we make it right.",
  detail:
    "We guarantee the result, not just the labor. Every install is backed by our lifetime workmanship warranty and the manufacturer equipment warranty, and we retest your water with you so you can see the difference.",
};

// ============================================================
// SYSTEM TIERS (Good / Better / Best ladder — Complete System is the anchor)
// Prices reference the Jobber price sheet; Complete is the founder bundle.
// ============================================================
export type Tier = {
  name: string;
  tagline: string;
  price: string;
  anchor?: string;
  priceNote?: string;
  popular?: boolean;
  image: string;
  features: string[];
};
export const systemTiers: Tier[] = [
  {
    name: "Reverse Osmosis",
    tagline: "Bottled-water quality at your kitchen sink.",
    price: "From $900",
    image: "/images/reverse-osmosis.webp",
    features: [
      "Under-sink 4-stage reverse osmosis",
      "Alkaline remineralization option",
      "Dedicated faucet, fridge & ice line",
      "Filter & membrane service available",
      "Licensed installation",
    ],
  },
  {
    name: "Whole-Home Filtration & Softening",
    tagline: "Clean, soft water from every tap.",
    price: "From $2,600",
    image: "/images/whole-home.webp",
    features: [
      "Whole-home chlorine & chloramine carbon filtration",
      "Metered softener or salt-free conditioner",
      "Protects plumbing, water heater & appliances",
      "High-flow option for larger homes",
      "Licensed install + lifetime workmanship warranty",
    ],
  },
  {
    name: "Complete Home Water System",
    tagline: "Whole-home filtration + softening + under-sink RO. Everything, one install.",
    price: "$2,699",
    anchor: "$5,998",
    priceNote: "During founder pricing, less than the whole-home system alone.",
    popular: true,
    image: "/images/complete-system.webp",
    features: [
      "Everything in Whole-Home, plus reverse osmosis",
      "Softening + chlorine/chloramine carbon filtration",
      "Under-sink RO with alkaline post-filter",
      "One licensed plumber visit, done for you",
      "Lifetime workmanship + manufacturer warranty",
    ],
  },
];

// ============================================================
// WELLBROOK WATER CARE PLAN (recurring-revenue membership)
// ============================================================
export type CareTier = {
  name: string;
  monthly: string;
  annual: string;
  popular?: boolean;
  features: string[];
};
export const carePlan = {
  eyebrow: "Keep it running",
  title: "The Wellbrook Water Care Plan",
  intro:
    "Your system does its best work when it's maintained. Wellbrook Care members get scheduled filter changes, an annual water re-test, priority scheduling, and an extended equipment warranty. No contracts. Cancel anytime.",
  tiers: [
    {
      name: "Essential Care",
      monthly: "$29",
      annual: "$319/yr (1 month free)",
      features: [
        "One scheduled care visit per year: 28-point inspection and performance check",
        "Whole-home sediment pre-filter change included",
        "Annual in-home water re-test so you see it's working",
        "Extended equipment warranty stays active while you're a member",
        "Priority scheduling and zero trip fees",
        "10% off any parts and repairs",
      ],
    },
    {
      name: "Complete Care",
      monthly: "$49",
      annual: "$539/yr (1 month free)",
      popular: true,
      features: [
        "Everything in Essential, plus:",
        "Two scheduled care visits per year (spring and fall)",
        "Annual RO filter set change included",
        "Built for homes with whole-home filtration plus reverse osmosis",
      ],
    },
    {
      name: "Total Care",
      monthly: "$79",
      annual: "$869/yr (1 month free)",
      features: [
        "Everything in Complete, plus:",
        "Four visits per year: two care visits and two salt deliveries",
        "Softener salt delivered and filled, included",
        "Annual UV lamp replacement included",
        "Transferable to the new owner if you sell your home",
        "Built for softener plus RO homes, UV systems, and well water",
      ],
    },
  ] as CareTier[],
};

// ============================================================
// HOW IT WORKS (3-step flow on the home page)
// ============================================================
export type Step = { title: string; body: string };
export const steps: Step[] = [
  { title: "Get your free water report", body: "Enter your zip and we'll send a free, plain-English report on your area's water. No cost, no salesperson." },
  { title: "We review and call you", body: "We go over your results, size the right system for your home, and give you a clear, no-obligation quote." },
  { title: "Install and enjoy", body: "A licensed plumber installs your system cleanly in one visit, backed by our lifetime workmanship warranty." },
];

// ============================================================
// COMPARISON TABLE (generic, no named competitors)
// ============================================================
export type CompareRow = { feature: string; wellbrook: boolean; typical: boolean; diy: boolean };
export const comparison = {
  columns: ["Wellbrook", "Typical providers", "Big-box DIY"],
  rows: [
    { feature: "Free, no-obligation quote before you buy", wellbrook: true, typical: false, diy: false },
    { feature: "Licensed, insured installer", wellbrook: true, typical: true, diy: false },
    { feature: "System sized to your home and water", wellbrook: true, typical: true, diy: false },
    { feature: "Upfront pricing, no high-pressure sales", wellbrook: true, typical: false, diy: true },
    { feature: "No long-term contracts or rentals", wellbrook: true, typical: false, diy: true },
    { feature: "Lifetime workmanship warranty on the install", wellbrook: true, typical: false, diy: false },
    { feature: "Local, owner-operated service", wellbrook: true, typical: false, diy: false },
    { feature: "Ongoing filter and service plans available", wellbrook: true, typical: false, diy: false },
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
    title: "Is the water hard in the Philadelphia suburbs?",
    tag: "Local water",
    excerpt: "Most of the western Philadelphia suburbs run moderately hard to hard. Here is what that means for your home, and how to know your number.",
    metaDescription: "Is water hard in the Philadelphia suburbs? What hardness means for your home and how Wellbrook fixes it. Free, no-obligation quotes.",
    body: [
      "If you see spots on your glassware, crusty buildup on faucets and showerheads, or your soap never seems to lather, you are almost certainly dealing with hard water. Across the Philadelphia suburbs, most homes, whether on municipal supply or a private well, see water that runs moderately hard to hard.",
      "Hardness is dissolved calcium and magnesium. It scales the inside of your water heater and pipes, shortens the life of dishwashers and washing machines, and leaves skin and hair feeling dry. It will not harm your health, and the costs add up quietly. The harder the water, the faster the damage adds up.",
      "A softener or a salt-free conditioner fixes it, and we'll quote the right one for your home with no obligation.",
    ],
  },
  {
    slug: "what-a-water-test-reveals",
    title: "What's really in your tap water",
    tag: "Getting started",
    excerpt: "Even treated water carries more than you think. Here is what is really in your tap, and why it matters before you spend a dollar.",
    metaDescription: "What's really in your tap water in the Philadelphia suburbs: chlorine, hardness, sediment, and more, and how Wellbrook fixes it. Free, no-obligation quotes.",
    body: [
      "What comes out of your tap is rarely just water. Even treated municipal supply carries chlorine, the taste and odor that come with it, hardness, and sediment from aging pipes, and the right system depends entirely on what is in yours.",
      "City water arrives with chlorine and hardness; well water can carry iron, sulfur, manganese, and even bacteria. Hardness scales your pipes and appliances, chlorine affects taste and smell, and sediment shortens the life of your fixtures.",
      "We recommend only what your water needs. Sometimes that is a full system, sometimes a single softener or a drinking-water unit. Either way, the quote is free and there is no obligation.",
    ],
  },
  {
    slug: "softener-vs-salt-free-conditioner",
    title: "Softener vs. salt-free conditioner: which is right?",
    tag: "Softening",
    excerpt: "Both control scale, but they work differently. Here is how to choose between a traditional softener and a salt-free conditioner.",
    metaDescription: "Water softener vs. salt-free conditioner: how they differ, the pros and cons of each, and how to choose the right one for your Philadelphia-area home.",
    body: [
      "A traditional softener uses ion exchange to actually remove the calcium and magnesium that cause hardness. It is the most complete fix: no scale, easier lathering, softer laundry, and longer appliance life. It uses salt and a small amount of water to regenerate, and a metered head only regenerates when needed, which keeps both in check.",
      "A salt-free conditioner does not remove the minerals; it changes their structure so they do not stick and form scale. It uses no salt and no backwash, which suits homes that want low maintenance or have drainage or sodium concerns. You will not get the slippery softened-water feel, but you will get strong scale control.",
      "Which is right comes down to your hardness level, your household, and your preferences. We recommend the option that fits your home and water, and the quote is free with no obligation.",
    ],
  },
  {
    slug: "why-reverse-osmosis-for-drinking-water",
    title: "Why reverse osmosis for the water you drink",
    tag: "Drinking water",
    excerpt: "Whole-home filtration cleans every tap. For the water you actually drink and cook with, reverse osmosis takes it one step further.",
    metaDescription: "Why use reverse osmosis for drinking water? How RO differs from whole-home filtration, what it removes, and whether remineralization is worth it. Wellbrook explains.",
    body: [
      "Whole-home filtration strips chlorine, taste, odor, and sediment from every tap in the house. For most uses, that is exactly what you want. For the water you drink and cook with, reverse osmosis goes further.",
      "RO pushes water through a very fine membrane that removes dissolved solids and many contaminants that carbon filtration alone leaves behind. The result is clean, crisp, bottled-water quality straight from a dedicated faucet, with no more buying or hauling cases of bottled water.",
      "Pure RO water can taste very clean; if you prefer a fuller taste, a remineralization stage adds beneficial minerals back. We can also run a line to your refrigerator and ice maker so they get the same water. It is the simplest upgrade with the most noticeable daily payoff.",
    ],
  },
];

// ============================================================
// HOME FAQ (answers buyer questions; drives FAQPage schema)
// ============================================================
export const homeFaqs: Faq[] = [
  { q: "What is the Complete Home Water System?", a: "It is our flagship setup: a complete home system with softening and chlorine and chloramine carbon filtration, plus an under-sink reverse-osmosis drinking water system. A licensed plumber installs it in one trip. The whole-home system cleans and softens every tap, and reverse osmosis gives you bottled-water quality at the kitchen sink." },
  { q: "How much does the Complete Home Water System cost?", a: "During founder pricing, the Complete Home Water System is $2,699 installed, regularly $5,998. Founder pricing is limited to a set number of installs each month. That covers the whole-home softening and filtration system, the under-sink reverse-osmosis system, and licensed plumber installation. Reach out for a free, no-obligation quote." },
  { q: "Do I have to buy the complete system?", a: "No. We offer three options: reverse osmosis for drinking water, whole-home filtration and softening for every tap, or the Complete Home Water System that bundles both. We size to your home and water and quote what you need, with no obligation." },
  { q: "Do you guarantee the results?", a: "Yes. If your water isn't measurably softer and cleaner on a follow-up retest, we make it right. We guarantee the result, not just the labor, and every install is backed by our lifetime workmanship warranty plus the manufacturer equipment warranty." },
  { q: "Do you offer a maintenance plan?", a: "Yes. The Wellbrook Water Care Plan keeps your system serviced on schedule, with priority scheduling and member-only pricing. Plans start at $29 per month, with no contracts and cancel anytime, and can be added at install so you never have to guess when a filter is due." },
];