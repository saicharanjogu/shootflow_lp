"use client";

import { useEffect, useState } from "react";

/**
 * Reports which of the given section ids is currently the reader's position.
 *
 * Returns `null` when none of them are on the page — which is the normal case
 * on /privacy, /terms and 404, where this same header renders but the home
 * page's sections do not exist. That must be a quiet no-op, not a crash.
 */
export function useActiveSection(ids: ReadonlyArray<string>) {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Join the ids so the effect re-runs only when the actual set changes, not on
  // every render that happens to build a new array literal.
  const key = ids.join("|");

  useEffect(() => {
    const sections = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0 || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Take the intersecting section nearest the top of the viewport rather
        // than whichever entry happened to fire last — with several sections
        // in view during a fast scroll, "last" is arbitrary.
        const nearestToTop = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          .at(0);

        if (nearestToTop) setActiveId(nearestToTop.target.id);
      },
      {
        // A band just below the header: a section becomes current once its top
        // passes under the header, and stays current until it has scrolled most
        // of the way off.
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key]);

  return activeId;
}
