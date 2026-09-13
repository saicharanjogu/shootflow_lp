"use client";

import { useRef, useState } from "react";
import { PRODUCT, type ProductIconKey } from "@/lib/content";
import { cn } from "@/lib/cn";

/*
 * Product feature groups, as tabs.
 *
 * WHY TABS: the four groups hold 21 features between them. Shown as one flat
 * list that is a wall of bullets; chunked behind four labels the reader takes in
 * one group at a time (Miller's Law, and progressive disclosure for the rest).
 *
 * WHY ALL FOUR PANELS STILL RENDER: only the active panel is *visible*, but all
 * four are in the HTML. Rendering just the active one would leave roughly three
 * quarters of the feature copy out of the page source — invisible to search
 * engines and to in-page find.
 *
 * `role="tablist"` is a contract: it promises arrow-key navigation and a roving
 * tabindex. Half-implemented ARIA is worse than none, so both are here.
 */

const ICONS: Record<ProductIconKey, React.ReactNode> = {
  capture: (
    <>
      <path d="M4 7h16v12H4z" />
      <path d="M8 7l1.5-3h5L16 7" />
      <circle cx="12" cy="13" r="3.2" />
    </>
  ),
  follow: (
    <>
      <path d="M4 6h16v10H8l-4 4z" />
      <path d="M8.5 10.5h7" />
    </>
  ),
  book: (
    <>
      <path d="M4 6h16v14H4z" />
      <path d="M4 10h16M9 4v4M15 4v4" />
      <path d="M9.5 14.5l1.8 1.8 3.4-3.4" />
    </>
  ),
  manage: (
    <>
      <path d="M4 5h16M4 12h16M4 19h10" />
      <circle cx="8" cy="5" r="1.6" />
      <circle cx="15" cy="12" r="1.6" />
      <circle cx="11" cy="19" r="1.6" />
    </>
  ),
};

function TabIcon({ name }: { name: ProductIconKey }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICONS[name]}
    </svg>
  );
}

export function ProductTabs() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (index: number) => {
    setActive(index);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const count = PRODUCT.groups.length;

    switch (event.key) {
      // Down/Up are accepted alongside Right/Left because the tabs wrap into a
      // 2x2 grid on phones, where reaching for a vertical arrow is natural.
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusTab((active + 1) % count);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusTab((active - 1 + count) % count);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(count - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {/* On phones the four tabs sit in a 2x2 GRID, not a scrolling row.
          A horizontal strip needed 501px at a 320px viewport, so "Book" and
          "Manage" sat entirely off-screen with no scroll affordance — a quarter
          of the product invisible to anyone who did not think to swipe a
          control that did not look swipeable. Hick's Law only works when the
          options are actually on screen. From `sm:` there is room for one row. */}
      <div
        role="tablist"
        aria-label="ShootFlow features"
        aria-orientation="horizontal"
        className="grid grid-cols-2 gap-1.5 rounded-card border border-line bg-paper p-1.5 sm:flex sm:gap-2 sm:rounded-pill"
      >
        {PRODUCT.groups.map((group, index) => {
          const selected = index === active;
          return (
            <button
              key={group.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`tab-${group.id}`}
              aria-selected={selected}
              aria-controls={`panel-${group.id}`}
              // Roving tabindex: one stop for the whole group, arrows move within.
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown}
              className={cn(
                "inline-flex min-h-12 items-center justify-center gap-2 rounded-pill px-2 text-[0.95rem] font-medium whitespace-nowrap transition-colors sm:flex-1 sm:px-4",
                selected
                  ? "bg-ink text-cream"
                  : "text-muted hover:bg-sand hover:text-ink",
              )}
            >
              <TabIcon name={group.icon} />
              {group.name}
            </button>
          );
        })}
      </div>

      {/* All four panels occupy the SAME grid cell, so the container is always
          as tall as the tallest panel and switching tabs never shifts the page.
          Inactive panels use visibility (not display:none) to keep that height —
          visibility:hidden still removes them from the accessibility tree and
          from tab order, while leaving their text in the HTML for crawlers. */}
      <div className="mt-6 grid sm:mt-8">
        {PRODUCT.groups.map((group, index) => {
          const activePanel = index === active;
          return (
            <div
              key={group.id}
              role="tabpanel"
              id={`panel-${group.id}`}
              aria-labelledby={`tab-${group.id}`}
              // Focusable so keyboard users can Tab straight from the tab strip
              // into the content it controls.
              tabIndex={activePanel ? 0 : -1}
              className={cn(
                "col-start-1 row-start-1 rounded-card border border-line bg-paper p-5 sm:p-8",
                activePanel ? "visible" : "invisible pointer-events-none",
              )}
            >
              <h3 className="font-display text-h3 text-ink">{group.tagline}</h3>

              <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {group.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-ink">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      className="mt-1 h-4 w-4 shrink-0 text-accent-ink"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 10.5l4 4 8-9" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
