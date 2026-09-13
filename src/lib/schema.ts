/**
 * JSON-LD structured data, derived from the same content module the page
 * renders — so the markup can never drift from the visible copy.
 *
 * Deliberately omits `aggregateRating` and `review`: ShootFlow has no real
 * ratings yet, and fabricating them risks a Google manual action.
 */

import { FAQ, PRICING } from "@/lib/content";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export function buildSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "CRM",
    operatingSystem: "Web",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    audience: {
      "@type": "Audience",
      audienceType: "Wedding photographers and photography studios",
    },
    offers: PRICING.tiers.map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      description: tier.audience,
      price: String(tier.priceValue),
      priceCurrency: PRICING.currency,
      url: `${SITE_URL}/#pricing`,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: String(tier.priceValue),
        priceCurrency: PRICING.currency,
        valueAddedTaxIncluded: false,
        billingDuration: 1,
        billingIncrement: 1,
        unitCode: "MON",
      },
    })),
  };
}

export function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };
}
