import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
 * Layout primitives.
 *
 * `Section` owns vertical rhythm and the surface tone; `Container` owns the
 * horizontal gutter and measure. Keeping both in one place is what makes the
 * Law of Proximity readable across the page: the gap *between* sections is
 * always larger than any gap *inside* one, so section boundaries never
 * have to be guessed at.
 */

type Tone = "cream" | "sand" | "ink";

const TONES: Record<Tone, string> = {
  cream: "bg-cream text-ink",
  sand: "bg-sand text-ink",
  ink: "bg-ink text-cream",
};

interface SectionProps {
  id?: string;
  tone?: Tone;
  children: ReactNode;
  className?: string;
  /** Renders as <header>/<footer> etc. when the landmark matters. */
  as?: "section" | "div";
}

export function Section({
  id,
  tone = "cream",
  children,
  className,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag
      id={id}
      // scroll-mt clears the sticky header when an anchor jumps here.
      className={cn(
        "scroll-mt-22 py-16 sm:py-20 lg:py-28",
        TONES[tone],
        className,
      )}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      {children}
    </Tag>
  );
}

export function Container({
  children,
  className,
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: "default" | "narrow" | "wide";
}) {
  const widths = {
    narrow: "max-w-2xl",
    default: "max-w-5xl",
    wide: "max-w-6xl",
  } as const;

  return (
    <div
      // px-5 is the mobile gutter and never collapses — the page must never
      // let text touch the edge of a phone screen.
      className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8", widths[width], className)}
    >
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "onSand" | "onInk";
  className?: string;
}) {
  const tones = {
    default: "text-accent-ink",
    onSand: "text-accent-deep",
    onInk: "text-cream/70",
  } as const;

  return (
    <p
      className={cn(
        "mb-4 font-semibold text-eyebrow uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      id={id ? `${id}-heading` : undefined}
      className={cn(
        "font-display text-h2 text-balance",
        className,
      )}
    >
      {children}
    </h2>
  );
}

/** Constrains body copy to a comfortable ~60–70 character measure. */
export function Lead({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("max-w-2xl text-lead text-muted text-pretty", className)}>
      {children}
    </p>
  );
}
