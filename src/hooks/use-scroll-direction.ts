"use client";

import { useEffect, useRef, useState } from "react";

interface Options {
  /** Ignore travel smaller than this, so a trackpad twitch cannot flap the header. */
  delta?: number;
  /** Never report "hidden" within this distance of the top of the page. */
  hideAfter?: number;
  /** Distance past which the header is considered "scrolled" (for its shrink state). */
  shrinkAfter?: number;
}

/**
 * Tracks whether the page is scrolled, and whether a sticky element should
 * currently be hidden because the reader is travelling down the page.
 *
 * Both values start `false`, matching the server render — reading scroll
 * position during render is a hydration mismatch, so the first update happens
 * in an effect.
 */
export function useScrollDirection({
  delta = 6,
  hideAfter = 140,
  shrinkAfter = 12,
}: Options = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const travelled = y - lastY.current;

      setScrolled(y > shrinkAfter);

      if (Math.abs(travelled) > delta) {
        setHidden(travelled > 0 && y > hideAfter);
        lastY.current = y;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [delta, hideAfter, shrinkAfter]);

  return { scrolled, hidden, setHidden };
}
