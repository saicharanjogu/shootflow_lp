/**
 * Every word on the landing page lives here.
 *
 * Two hard constraints on this file:
 *
 * 1. It must stay 100% serializable — plain strings, numbers, arrays, objects.
 *    No icon components or functions. This data crosses into client components
 *    (the product tabs), and React throws "Functions cannot be passed to Client
 *    Components" the moment something non-serializable sneaks in. Icons are
 *    referenced by string key and mapped to components inside the client file.
 *
 * 2. No Tailwind class fragments. Tailwind v4's content scanner cannot see
 *    dynamically assembled strings like `bg-${tone}`, so those classes would be
 *    purged from the build. Styling decisions stay in the components.
 */

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQs", href: "#faq" },
] as const;

export const CTA_LABEL = "Start Free Trial";
export const CTA_REASSURANCE = "14 days free. No credit card required.";

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

export const HERO = {
  headline: "More Enquiries. More Bookings.",
  lead: "Turn your wedding photography enquiries into booked weddings without chasing every lead yourself.",
  support:
    "ShootFlow helps you capture enquiries, follow up on time, manage bookings, and keep your client work organised in one place.",
  eyebrow: "Built for wedding photographers",
} as const;

/* -------------------------------------------------------------------------- */
/* Problem                                                                    */
/* -------------------------------------------------------------------------- */

export const PROBLEM = {
  eyebrow: "The problem",
  heading: "You do the photography. Who follows up?",
  /** Each source renders as its own item — the copy's line breaks are meaningful. */
  sources: [
    "A new enquiry can come from Instagram.",
    "Another can come through WhatsApp.",
    "Another can come from your website.",
  ],
  consequence:
    "When you are shooting, travelling, editing, or meeting a client, it is easy to miss one.",
  stake: "A missed reply can become a missed booking.",
  resolution:
    "ShootFlow keeps every enquiry in one place and helps you follow up on time.",
} as const;

/* -------------------------------------------------------------------------- */
/* Value proposition — the 4-beat journey                                     */
/* -------------------------------------------------------------------------- */

export const VALUE_PROP = {
  eyebrow: "Value",
  heading: "From new enquiry to booked wedding",
  steps: [
    {
      number: "01",
      title: "Capture every enquiry",
      body: "Bring enquiries from your website, Instagram, and WhatsApp into one place.",
      detail: "No more searching through chats to find your next client.",
    },
    {
      number: "02",
      title: "Follow up on time",
      body: "Set up automatic follow-ups so interested clients do not get forgotten.",
      detail: "Spend less time remembering who to message next.",
    },
    {
      number: "03",
      title: "Turn interest into meetings",
      body: "Use your booking calendar to make it easy for clients to choose a time.",
      detail: "Move the conversation forward without back and forth.",
    },
    {
      number: "04",
      title: "Close more bookings",
      body: "Manage quotes, proposals, payment reminders, and client details from one place.",
      detail: "Keep the next step clear until the booking is done.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Product — feature groups, rendered as tabs                                 */
/* -------------------------------------------------------------------------- */

/** Icon keys are strings; the client component maps them to SVG components. */
export type ProductIconKey = "capture" | "follow" | "book" | "manage";

export const PRODUCT = {
  eyebrow: "Product",
  heading: "One simple system for your photography business",
  groups: [
    {
      id: "capture",
      icon: "capture" as ProductIconKey,
      name: "Capture",
      tagline: "See your enquiries in one place.",
      features: [
        "Website enquiries",
        "Instagram enquiries",
        "WhatsApp enquiries",
        "Lead details",
        "Custom fields",
      ],
    },
    {
      id: "follow-up",
      icon: "follow" as ProductIconKey,
      name: "Follow Up",
      tagline: "Stay in touch without doing every follow-up yourself.",
      features: [
        "Automated follow-ups",
        "Message templates",
        "Workflows",
        "Lead qualification",
        "AI-assisted follow-ups",
      ],
    },
    {
      id: "book",
      icon: "book" as ProductIconKey,
      name: "Book",
      tagline: "Make the path to a booking simple.",
      features: [
        "Booking calendar",
        "Multiple calendars",
        "Quotes",
        "Proposals",
        "Payment reminders",
      ],
    },
    {
      id: "manage",
      icon: "manage" as ProductIconKey,
      name: "Manage",
      tagline: "Keep your client work organised.",
      features: [
        "Client management",
        "Team access",
        "Multiple pipelines",
        "Contracts",
        "Invoicing",
        "Reports",
      ],
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Before / After — the emotional peak of the page                            */
/* -------------------------------------------------------------------------- */

export const BEFORE_AFTER = {
  eyebrow: "Before / After",
  heading: "Stop managing your business from scattered chats",
  before: {
    title: "Before ShootFlow",
    steps: [
      "New enquiry in Instagram.",
      "Reply later.",
      "Forget to follow up.",
      "Search WhatsApp for the conversation.",
      "Lose track of the enquiry.",
    ],
  },
  after: {
    title: "With ShootFlow",
    steps: [
      "New enquiry",
      "Captured",
      "Follow-up sent",
      "Meeting booked",
      "Quote sent",
      "Wedding booked",
    ],
  },
  footnote: "Every step has a place.",
} as const;

/* -------------------------------------------------------------------------- */
/* Outcomes                                                                   */
/* -------------------------------------------------------------------------- */

export const OUTCOMES = {
  eyebrow: "Outcomes",
  heading: "Spend less time chasing leads. Spend more time shooting.",
  intro: "ShootFlow helps you:",
  items: [
    {
      title: "Save time",
      body: "Automate routine follow-ups and reduce manual work.",
    },
    {
      title: "Respond faster",
      body: "Keep new enquiries visible and ready for action.",
    },
    {
      title: "Stay organised",
      body: "Keep leads, bookings, clients, and follow-ups together.",
    },
    {
      title: "Book more confidently",
      body: "Know which enquiries need your attention.",
    },
    {
      title: "Grow without adding more admin",
      body: "Use workflows and simple reports as your business grows.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* How it works                                                               */
/* -------------------------------------------------------------------------- */

export const HOW_IT_WORKS = {
  eyebrow: "How it works",
  heading: "Start in minutes",
  steps: [
    {
      number: "1",
      title: "Connect your enquiries",
      body: "Bring your website, Instagram, and WhatsApp enquiries into your workflow.",
    },
    {
      number: "2",
      title: "Set your follow-ups",
      body: "Create simple follow-up steps for new and interested clients.",
    },
    {
      number: "3",
      title: "Manage your bookings",
      body: "Use your calendar, quotes, proposals, and reminders to move clients forward.",
    },
    {
      number: "4",
      title: "Track your business",
      body: "See your enquiries, bookings, and activity in simple reports.",
    },
  ],
  footnote: [
    "No complex setup.",
    "No accounting knowledge.",
    "No new process to learn.",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Audience                                                                   */
/* -------------------------------------------------------------------------- */

export const AUDIENCE = {
  eyebrow: "Who it is for",
  heading: "Built for photographers at every stage",
  personas: [
    {
      title: "Solo Photographers",
      situation: "You handle the shoots, editing, sales, and client work.",
      answer: "ShootFlow handles the follow-up.",
    },
    {
      title: "Growing Photographers",
      situation: "You have more enquiries and more weddings to manage.",
      answer: "ShootFlow keeps your sales process organised.",
    },
    {
      title: "Photography Studios",
      situation: "Your team manages multiple clients, calendars, and projects.",
      answer: "ShootFlow gives your team one place to work.",
    },
    {
      title: "Growing Brands",
      situation: "You manage multiple locations or brands.",
      answer:
        "ShootFlow gives you the tools to manage your workflow at a larger scale.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Pricing                                                                    */
/* -------------------------------------------------------------------------- */

export const PRICING = {
  eyebrow: "Pricing",
  heading: "Start simple. Grow when you need to.",
  /** Kept as a separate line so the tier cards stay uncluttered. */
  taxNote: "All prices are exclusive of GST.",
  currency: "INR",
  tiers: [
    {
      id: "starter",
      name: "Starter",
      price: "₹999",
      period: "/ month",
      priceValue: 999,
      audience: "For solo photographers getting organised.",
      inherits: null,
      featured: false,
      features: [
        "Lead capture",
        "Enquiry management",
        "Automated follow-ups",
        "Booking calendar",
        "Message templates",
        "Basic reports",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      price: "₹1,999",
      period: "/ month",
      priceValue: 1999,
      audience: "For photographers who want more bookings.",
      inherits: "Everything in Starter, plus:",
      featured: true,
      badge: "Most Popular",
      features: [
        "AI-assisted follow-ups",
        "Smart lead qualification",
        "Advanced workflows",
        "Quotes and proposals",
        "Payment reminders",
        "Custom fields and pipelines",
        "Advanced reports",
      ],
    },
    {
      id: "studio",
      name: "Studio",
      price: "₹3,999",
      period: "/ month",
      priceValue: 3999,
      audience: "For studios managing a team.",
      inherits: "Everything in Pro, plus:",
      featured: false,
      features: [
        "Up to 5 team members",
        "Role-based access",
        "Multiple calendars",
        "Multiple pipelines",
        "Client management",
        "Contracts and invoicing",
        "Advanced automation",
        "Detailed analytics",
      ],
    },
    {
      id: "agency",
      name: "Agency",
      price: "₹5,999",
      period: "/ month",
      priceValue: 5999,
      audience: "For larger studios and multi-brand businesses.",
      inherits: "Everything in Studio, plus:",
      featured: false,
      features: [
        "Multiple locations and brands",
        "Custom workflows",
        "Higher usage limits",
        "Advanced reporting",
        "Priority onboarding",
        "Priority support",
        "Dedicated account support",
      ],
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Trust                                                                      */
/* -------------------------------------------------------------------------- */

export const TRUST = {
  eyebrow: "Trust",
  heading: "Your client data stays yours",
  points: [
    "Your enquiries are valuable.",
    "Your client list is valuable.",
    "Your business information should stay private.",
  ],
  body: "ShootFlow is built to help you manage your business without using your client information to compete with you.",
  close: "Your business. Your clients. Your data.",
} as const;

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

export const FAQ = {
  eyebrow: "FAQs",
  heading: "Questions, answered",
  items: [
    {
      question: "Is ShootFlow made for wedding photographers?",
      answer:
        "Yes. ShootFlow is designed around the enquiry, follow-up, booking, and client workflow used by wedding photographers.",
    },
    {
      question: "Do I need technical knowledge?",
      answer: "No. ShootFlow is designed to be simple to set up and use.",
    },
    {
      question: "Can I capture Instagram and WhatsApp enquiries?",
      answer:
        "Yes. ShootFlow can capture enquiries from your website, Instagram, and WhatsApp.",
    },
    {
      question: "Can ShootFlow follow up with leads automatically?",
      answer: "Yes. You can create automated follow-ups and workflows.",
    },
    {
      question: "Does ShootFlow use AI?",
      answer:
        "Some plans include AI-assisted follow-ups and smart lead qualification.",
    },
    {
      question: "Can my team use ShootFlow?",
      answer:
        "Yes. Studio and Agency plans support team access with different permission levels.",
    },
    {
      question: "Can I manage bookings?",
      answer:
        "Yes. ShootFlow includes calendars, booking workflows, quotes, proposals, and payment reminders.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes. You can start with a 14-day free trial. No credit card required.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Final CTA                                                                  */
/* -------------------------------------------------------------------------- */

export const FINAL_CTA = {
  heading: "Your next booking could already be in your inbox.",
  lead: "Do not let good enquiries go cold.",
  steps: ["Capture them.", "Follow up.", "Book the wedding."],
} as const;

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */

export const FOOTER = {
  tagline: "Built for wedding photographers.",
  rhythm: "Capture. Follow up. Book. Grow.",
  columns: [
    {
      title: "Explore",
      links: [
        { label: "Product", href: "#product" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "Pricing", href: "#pricing" },
        { label: "FAQs", href: "#faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ],
} as const;
