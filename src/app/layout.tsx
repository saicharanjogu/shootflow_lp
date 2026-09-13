import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { buildOrganizationSchema } from "@/lib/schema";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

/*
 * Fonts are self-hosted by next/font — no request to a third party at runtime,
 * and `display: swap` plus a matched fallback keeps layout shift at zero.
 *
 * The serif is for display sizes only. Body copy and, importantly, PRICES stay
 * on Inter: many display faces ship without the ₹ glyph (U+20B9), which would
 * silently drop every price into a fallback font mid-line.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK"],
});

export const metadata: Metadata = {
  // Without metadataBase, OG and Twitter image URLs resolve against
  // localhost:3000 in the built HTML.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — More Enquiries. More Bookings.`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "wedding photography CRM",
    "photography lead management",
    "Instagram enquiry management",
    "WhatsApp lead capture",
    "photography booking software",
    "photographer follow-up automation",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — More Enquiries. More Bookings.`,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — More Enquiries. More Bookings.`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

/*
 * In Next 16 viewport is its own export, separate from metadata.
 *
 * `viewportFit: "cover"` is load-bearing: without it, every
 * env(safe-area-inset-*) in the stylesheet resolves to 0, and the sticky mobile
 * CTA bar sits under the iPhone home indicator.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#faf7f2",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${fraunces.variable}`}>
      <body
        // overflow-x-clip is the page-level guard against any single element
        // (a scroll strip, a decorative blur, a wide grid) introducing a
        // horizontal scrollbar on a narrow phone.
        className="overflow-x-clip antialiased"
      >
        {/* Skip link: first thing in the tab order, invisible until focused.
            Padding has to be re-applied inside the focus variant — Tailwind's
            `not-sr-only` resets padding to 0, which would otherwise leave this
            a 24px-tall target the moment it becomes visible. */}
        <a
          href="#main"
          className="sr-only rounded-md bg-ink font-medium text-cream focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100 focus:inline-flex focus:min-h-12 focus:items-center focus:px-5 focus:py-3"
        >
          Skip to content
        </a>

        <SiteHeader />

        <main id="main">{children}</main>

        <SiteFooter />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildOrganizationSchema()),
          }}
        />

        {/*
          ANALYTICS SLOT
          --------------
          Uncomment and set NEXT_PUBLIC_PLAUSIBLE_DOMAIN in the environment.
          Plausible is cookieless, so it needs no consent banner in most
          jurisdictions; a GA4 snippet would go in the same place but should be
          gated behind a consent prompt.

          {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? (
            <Script
              defer
              data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
              src="https://plausible.io/js/script.js"
            />
          ) : null}
        */}
      </body>
    </html>
  );
}
