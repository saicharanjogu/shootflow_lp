"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CTA_LABEL, NAV_LINKS } from "@/lib/content";
import { SIGNUP_URL } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Wordmark } from "@/components/ui/wordmark";

/*
 * Sticky header.
 *
 * Jakob's Law throughout: wordmark left, links right, hamburger on narrow
 * screens. Nothing here is invented — people already know how to drive it.
 *
 * Three behaviours beyond the markup:
 *
 *  1. It SHRINKS once the page scrolls, because a sticky header plus a sticky
 *     bottom CTA bar plus the iOS URL bar can otherwise eat a third of a small
 *     phone viewport.
 *  2. It HIDES on scroll down and returns on scroll up, reclaiming that space
 *     while reading without putting the nav more than one flick away.
 *  3. It tracks the ACTIVE SECTION, so the four links say where you are. On a
 *     page this long, anchor links with no "you are here" leave the reader
 *     with no sense of position.
 *
 * Every link is root-relative (`/#pricing`). This component renders from the
 * root layout, so it also appears on /privacy and /terms where those sections
 * do not exist — a bare `#pricing` is a dead link there.
 */

/** Ignore jitter below this many pixels of travel before hiding or showing. */
const SCROLL_DELTA = 6;
/** Never hide the header within this distance of the top of the page. */
const HIDE_AFTER = 140;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const lastY = useRef(0);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  /* --- Shrink + auto-hide ------------------------------------------------ */
  // All initial state matches the server render and only changes inside an
  // effect. Branching on scroll position during render is a hydration error.
  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      setScrolled(y > 12);

      if (Math.abs(delta) > SCROLL_DELTA) {
        // Hide only when travelling down and clear of the top of the page.
        setHidden(delta > 0 && y > HIDE_AFTER);
        lastY.current = y;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // An open sheet must never be carried off-screen with the header.
  useEffect(() => {
    if (open) setHidden(false);
  }, [open]);

  /* --- Active section ---------------------------------------------------- */
  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.id),
    ).filter((el): el is HTMLElement => el !== null);

    // No-op on /privacy, /terms and 404, where none of these sections exist.
    if (sections.length === 0 || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry nearest the top of the viewport among those visible,
        // rather than trusting whichever fired last.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      {
        // A band just under the header: a section counts as current once its
        // top passes the header and until it has scrolled most of the way off.
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* --- Sheet: Escape, focus trap, scroll lock ---------------------------- */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();
  }, [open]);

  /* --- Render ------------------------------------------------------------ */
  // Activating a nav link reveals the header, so an anchor jump never lands
  // underneath a hidden one.
  const reveal = () => setHidden(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[transform,background-color,border-color,box-shadow] duration-300",
        hidden ? "-translate-y-full" : "translate-y-0",
        scrolled
          ? "border-line bg-cream/95 shadow-xs backdrop-blur-sm"
          : "border-transparent bg-cream",
      )}
    >
      <div className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 bg-inherit px-5 sm:px-6 lg:px-8">
        <a
          href="/#top"
          onClick={reveal}
          className={cn(
            "-ml-1 flex min-h-12 items-center rounded-md px-1 transition-[padding] duration-200",
            scrolled ? "py-2" : "py-3",
          )}
          aria-label="ShootFlow — back to top"
        >
          <Wordmark />
        </a>

        {/* Links appear from md: (768px). Below that the four labels plus the
            wordmark and CTA no longer fit on one line. */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-0.5 lg:gap-1">
            {NAV_LINKS.map((link) => {
              const current = activeId === link.id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={reveal}
                    // aria-current is what actually conveys "you are here" to a
                    // screen reader; the underline alone would not.
                    aria-current={current ? "true" : undefined}
                    className={cn(
                      "relative inline-flex min-h-12 items-center rounded-md px-2.5 text-[0.95rem] font-medium transition-colors lg:px-3",
                      current ? "text-ink" : "text-muted hover:text-ink",
                    )}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-2.5 bottom-2 h-0.5 rounded-full transition-opacity duration-200 lg:inset-x-3",
                        current
                          ? "bg-accent opacity-100"
                          : "bg-accent opacity-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Hidden on phones: the sticky bottom bar owns the action there, and
              two competing buttons would split attention. */}
          <a
            href={SIGNUP_URL}
            onClick={reveal}
            className="hidden min-h-12 items-center justify-center rounded-pill bg-accent px-5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-accent-ink sm:inline-flex"
          >
            {CTA_LABEL}
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-md text-ink md:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile sheet. Rendered only when open so its links stay out of the
          tab order otherwise. Items get generous 56px rows — this is the one
          place where a mis-tap costs the most. */}
      {open ? (
        <div className="md:hidden" role="presentation">
          <div
            className="fixed inset-0 z-0 bg-ink/20"
            onClick={close}
            aria-hidden="true"
          />
          <div
            ref={panelRef}
            id="mobile-menu"
            className="relative z-10 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-cream px-5 pt-2 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-lift"
          >
            <nav aria-label="Mobile">
              <ul className="divide-y divide-line">
                {NAV_LINKS.map((link) => {
                  const current = activeId === link.id;
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={close}
                        aria-current={current ? "true" : undefined}
                        className={cn(
                          "flex min-h-14 items-center gap-2 text-lg font-medium",
                          current ? "text-accent-ink" : "text-ink",
                        )}
                      >
                        {current ? (
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-accent"
                          />
                        ) : null}
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <a
              href={SIGNUP_URL}
              onClick={close}
              className="mt-5 flex min-h-14 w-full items-center justify-center rounded-pill bg-accent px-6 text-base font-semibold text-white"
            >
              {CTA_LABEL}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
