import { cn } from "@/lib/cn";

/**
 * The ShootFlow wordmark: an aperture-blade mark plus the name.
 *
 * Drawn inline as SVG rather than shipped as an image file — it is a handful of
 * paths, it inherits `currentColor` so it works on any surface, and it costs no
 * extra request and no layout shift.
 */
export function Wordmark({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "cream";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        tone === "ink" ? "text-ink" : "text-cream",
        className,
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v9l7.8 4.5" />
        <path d="M12 12L4.2 16.5" />
        <path d="M12 12l7.8-4.5" />
      </svg>
      <span className="text-[0.95rem] font-semibold tracking-[0.18em] uppercase">
        Shootflow
      </span>
    </span>
  );
}
