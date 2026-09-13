"use client";

import { NAV_LINKS, CTA_LABEL } from "@/lib/content";
import { SIGNUP_URL } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/ui/wordmark";
import { DesktopNav } from "@/components/nav/desktop-nav";
import { MobileNav } from "@/components/nav/mobile-nav";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrollDirection } from "@/hooks/use-scroll-direction";

/*
 * Site header — composition only. The behaviour lives in two hooks and the
 * mobile sheet, so this file stays readable:
 *
 *   useScrollDirection  — shrink on scroll, hide travelling down, show on up
 *   useActiveSection    — which section the reader is in ("you are here")
 *   MobileNav           — the Sheet, portalled out of this element
 *
 * LAYERING. The header is z-50 and, because its auto-hide uses `translate`, it
 * is a containing block for fixed-position descendants. That is fine only
 * because nothing fixed is nested inside it any more: the mobile sheet portals
 * to document.body, landing as a sibling at the same z-index but later in DOM
 * order, so it paints above the header. The full scale:
 *
 *   10   in-section decoration
 *   40   sticky mobile CTA bar
 *   50   this header
 *   50   sheet overlay + panel (portalled — later sibling, so above)
 *   100  skip link, when focused
 *
 * Links are root-relative (`/#pricing`) because this renders from the root
 * layout and so appears on /privacy and /terms, where a bare `#pricing` would
 * be a dead link.
 */

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

export function SiteHeader() {
  const { scrolled, hidden, setHidden } = useScrollDirection();
  const activeId = useActiveSection(SECTION_IDS);

  // Activating a nav link reveals the header, so an anchor jump can never land
  // underneath a hidden one.
  const reveal = () => setHidden(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[translate,background-color,border-color,box-shadow] duration-300",
        hidden ? "-translate-y-full" : "translate-y-0",
        scrolled
          ? "border-border bg-background/95 shadow-xs backdrop-blur-sm"
          : "border-transparent bg-background",
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <a
          href="/#top"
          onClick={reveal}
          className={cn(
            "-ml-1 flex min-h-12 items-center rounded-md px-1 outline-none transition-[padding] duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            scrolled ? "py-2" : "py-3",
          )}
          aria-label="ShootFlow — back to top"
        >
          <Wordmark />
        </a>

        <DesktopNav activeId={activeId} onNavigate={reveal} />

        <div className="flex items-center gap-1">
          {/* Hidden on phones: the sticky bottom bar owns the action there, and
              two competing buttons would split attention. */}
          <Button asChild className="hidden sm:inline-flex" onClick={reveal}>
            <a href={SIGNUP_URL}>{CTA_LABEL}</a>
          </Button>

          <MobileNav activeId={activeId} />
        </div>
      </div>
    </header>
  );
}
