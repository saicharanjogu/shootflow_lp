"use client";

import { useEffect, useState } from "react";
import { CTA_LABEL } from "@/lib/content";
import { SIGNUP_URL } from "@/lib/site";
import { cn } from "@/lib/cn";

/*
 * Sticky mobile CTA bar.
 *
 * Fitts's Law, applied where it counts most: on a phone held one-handed, the
 * bottom of the screen is the easiest region to reach and the top is the
 * hardest. Parking the single primary action there makes it permanently cheap
 * to hit, at any scroll depth, without hunting back up for the header.
 *
 * It is hero-gated rather than always-on. While the hero's own button is still
 * on screen, a second copy of the same action would just be visual noise.
 *
 * HYDRATION: the bar always renders, and starts in its translated-off state so
 * the server HTML and the first client render agree. Only a class flips, in an
 * effect. Returning `null` until visible would be a hydration mismatch.
 */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;

    // No IntersectionObserver (very old browsers): leave the bar hidden rather
    // than pinning it permanently over the content.
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px" },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 shadow-bar backdrop-blur-sm transition-transform duration-300 lg:hidden",
        // Hidden on short viewports — a phone in landscape is only ~390px tall,
        // where this bar plus the header would claim over a third of the screen.
        // The in-page CTAs still carry the action there.
        "[@media(max-height:500px)]:hidden",
        // env() resolves to 0 unless the layout sets viewportFit: "cover".
        "px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      // Hidden from assistive tech while off-screen: the same action is already
      // reachable in the page, and a duplicate in the tab order is just clutter.
      // React 19 supports `inert` natively as a boolean prop.
      aria-hidden={!visible}
      inert={!visible}
    >
      <a
        href={SIGNUP_URL}
        className="flex min-h-13 w-full items-center justify-center rounded-pill bg-accent px-6 font-semibold text-white"
        tabIndex={visible ? undefined : -1}
      >
        {CTA_LABEL}
      </a>
    </div>
  );
}
