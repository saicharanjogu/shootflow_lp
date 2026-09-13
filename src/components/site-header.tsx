"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CTA_LABEL, NAV_LINKS } from "@/lib/content";
import { SIGNUP_URL } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Wordmark } from "@/components/ui/wordmark";

/*
 * Sticky header.
 *
 * Jakob's Law throughout: wordmark left, links right, hamburger on mobile.
 * Nothing here is invented — people already know how to drive this.
 *
 * The header SHRINKS once the page scrolls. A sticky header plus a sticky
 * bottom CTA bar plus the iOS URL bar can otherwise eat roughly a third of a
 * small phone viewport, which would leave very little room for the content
 * they are wrapped around.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  // Initial state matches the server render (false) and only changes in an
  // effect — branching on scroll position during render is a hydration error.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Escape to close, and keep Tab inside the open sheet.
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
        'a[href], button:not([disabled])',
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

  // Lock background scrolling while the sheet is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Move focus into the sheet when it opens.
  useEffect(() => {
    if (!open) return;
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow] duration-200",
        scrolled
          ? "border-line bg-cream/95 shadow-xs backdrop-blur-sm"
          : "border-transparent bg-cream",
      )}
    >
      <div className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 bg-inherit px-5 sm:px-6 lg:px-8">
        <a
          href="#top"
          className={cn(
            "-ml-1 flex min-h-12 items-center rounded-md px-1 transition-[padding] duration-200",
            scrolled ? "py-2" : "py-3",
          )}
          aria-label="ShootFlow — back to top"
        >
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-12 items-center rounded-md px-3 text-[0.95rem] font-medium text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* The header CTA is hidden on mobile: the sticky bottom bar owns the
              action there, and two competing buttons would split attention. */}
          <a
            href={SIGNUP_URL}
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
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-md text-ink lg:hidden"
          >
            <span className="sr-only">
              {open ? "Close menu" : "Open menu"}
            </span>
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
        <div className="lg:hidden" role="presentation">
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
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={close}
                      className="flex min-h-14 items-center text-lg font-medium text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
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
