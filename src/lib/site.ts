/**
 * Site-wide constants.
 *
 * `process.env.NEXT_PUBLIC_*` must be referenced as a full literal expression
 * (never destructured) so Next can inline the value at build time.
 */

export const SITE_NAME = "ShootFlow";

const LOCAL_FALLBACK = "http://localhost:3000";

/**
 * First value that is present AND non-blank.
 *
 * This deliberately treats "" as absent. An unset environment variable and one
 * set to an empty string are the same intent, but they are NOT the same value:
 * `??` falls back only on null/undefined, so an empty string sails straight
 * through it. That is exactly how `new URL("")` once reached module evaluation
 * and took down the whole production build.
 */
function firstNonBlank(
  ...values: Array<string | undefined>
): string | undefined {
  for (const value of values) {
    const trimmed = value?.trim();
    if (trimmed) return trimmed;
  }
  return undefined;
}

/**
 * Turn a loosely-typed origin into one that is safe to concatenate against.
 *
 * - Adds `https://` when missing, because Vercel's system variables are bare
 *   hostnames (`shootflow.vercel.app`, not a full URL).
 * - Strips trailing slashes, so `${SITE_URL}/privacy` can never become
 *   `//privacy`.
 * - Falls back rather than throwing, so a typo in a dashboard field degrades to
 *   wrong-but-working metadata instead of a failed deploy.
 */
function normaliseOrigin(raw: string | undefined, fallback: string): string {
  if (!raw) return fallback;

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    const url = new URL(withProtocol);
    return `${url.origin}${url.pathname.replace(/\/+$/, "")}`;
  } catch {
    return fallback;
  }
}

/**
 * The public origin, used for metadataBase, canonical URLs, OG image URLs,
 * robots.txt and the sitemap.
 *
 * Resolution order — the first non-blank value wins:
 *   1. NEXT_PUBLIC_SITE_URL                        explicit, always wins
 *   2. NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL   stable production domain
 *   3. NEXT_PUBLIC_VERCEL_URL                      this deployment (previews)
 *   4. http://localhost:3000
 *
 * The NEXT_PUBLIC_-prefixed Vercel variables are used on purpose. This module
 * is imported by client components for SIGNUP_URL, so it ends up in the browser
 * bundle; the bare VERCEL_* variables are server-only and would be undefined
 * there, giving the client a different value than the server.
 */
export const SITE_URL = normaliseOrigin(
  firstNonBlank(
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.NEXT_PUBLIC_VERCEL_URL,
  ),
  LOCAL_FALLBACK,
);

/**
 * `SITE_URL` as a URL object, for Next's `metadataBase`.
 *
 * SITE_URL has already been validated by normaliseOrigin, so this cannot throw
 * — which is the point. Constructing a URL inline in the metadata export makes
 * every bad environment value a build-breaking error pointing at a line of
 * metadata rather than at the setting that actually caused it.
 */
export function siteUrl(): URL {
  try {
    return new URL(SITE_URL);
  } catch {
    return new URL(LOCAL_FALLBACK);
  }
}

/**
 * Every "Start Free Trial" button on the page resolves to this one value.
 *
 * Until the real signup app exists it falls back to `#signup`, which is a real
 * element id on the final CTA section — so no button ever dead-ends. Swapping
 * in the production URL is a single environment variable.
 */
export const SIGNUP_URL =
  firstNonBlank(process.env.NEXT_PUBLIC_SIGNUP_URL) ?? "#signup";

/** True when CTAs still point at the on-page placeholder rather than a real app. */
export const SIGNUP_IS_PLACEHOLDER = SIGNUP_URL.startsWith("#");

export const SITE_DESCRIPTION =
  "ShootFlow helps wedding photographers capture enquiries from Instagram, WhatsApp and their website, follow up on time, and turn interest into booked weddings.";
