/**
 * Site-wide constants.
 *
 * `process.env.NEXT_PUBLIC_*` must be referenced as a full literal expression
 * (never destructured) so Next can inline the value at build time.
 */

export const SITE_NAME = "ShootFlow";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * Every "Start Free Trial" button on the page resolves to this one value.
 *
 * Until the real signup app exists it falls back to `#signup`, which is a real
 * element id on the final CTA section — so no button ever dead-ends. Swapping
 * in the production URL is a single environment variable.
 */
export const SIGNUP_URL =
  process.env.NEXT_PUBLIC_SIGNUP_URL || "#signup";

/** True when CTAs still point at the on-page placeholder rather than a real app. */
export const SIGNUP_IS_PLACEHOLDER = SIGNUP_URL.startsWith("#");

export const SITE_DESCRIPTION =
  "ShootFlow helps wedding photographers capture enquiries from Instagram, WhatsApp and their website, follow up on time, and turn interest into booked weddings.";
