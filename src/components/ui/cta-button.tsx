import { CTA_LABEL } from "@/lib/content";
import { SIGNUP_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline";
type Size = "md" | "lg";

interface CtaButtonProps {
  /** Defaults to the single shared CTA label. */
  label?: string;
  variant?: Variant;
  size?: Size;
  /** Full width on mobile, auto from `sm:` up. The default for in-page CTAs. */
  block?: boolean;
  className?: string;
}

/*
 * Every call to action on this page is a navigation, not an in-page action, so
 * this renders an <a> rather than a <button>. That keeps middle-click, "open in
 * new tab" and the browser status bar working the way people expect.
 *
 * Tap targets are held at 48px minimum (min-h-12) — Fitts's Law matters most on
 * a phone held one-handed.
 */
const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-card hover:bg-accent-ink active:bg-accent-deep",
  outline:
    "border border-edge bg-transparent text-ink hover:border-ink hover:bg-paper",
};

const SIZES: Record<Size, string> = {
  md: "min-h-12 px-5 text-[0.95rem]",
  lg: "min-h-14 px-7 text-base sm:text-lg",
};

export function CtaButton({
  label = CTA_LABEL,
  variant = "primary",
  size = "md",
  block = false,
  className,
}: CtaButtonProps) {
  return (
    <a
      href={SIGNUP_URL}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-pill font-semibold tracking-tight",
        "transition-colors duration-200",
        VARIANTS[variant],
        SIZES[size],
        block ? "w-full sm:w-auto" : "",
        className,
      )}
    >
      {label}
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="h-4 w-4 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 8h9.5M8.5 4l4 4-4 4" />
      </svg>
    </a>
  );
}
