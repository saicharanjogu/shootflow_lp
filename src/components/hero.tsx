import { Container } from "@/components/ui/section";
import { CtaButton } from "@/components/ui/cta-button";
import { CTA_REASSURANCE, HERO } from "@/lib/content";

/*
 * Hero.
 *
 * Exactly ONE action (Hick's Law). No "watch a demo", no secondary link, no
 * newsletter box — every additional choice here measurably slows the only
 * decision that matters.
 *
 * The reassurance line sits directly beneath the button rather than above it:
 * the objection ("will this cost me anything?") is answered at the moment it
 * is felt, which is the moment the button is in view.
 */
export function Hero() {
  return (
    <section
      id="top"
      // A hero that exactly fills the viewport hides the fact that the page
      // continues. Leaving it shorter than 100dvh keeps the next section's edge
      // visible, which is what invites the first scroll.
      className="relative overflow-hidden border-b border-line bg-cream pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-28"
    >
      {/* Soft warm wash behind the headline. Decorative only, and clipped by
          the section so it can never create horizontal overflow. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 h-[26rem] w-[26rem] rounded-full bg-wash opacity-70 blur-3xl sm:-right-12"
      />

      <Container className="relative">
        <p className="mb-5 inline-flex items-center gap-2 rounded-pill border border-line bg-paper px-3 py-1.5 text-eyebrow font-semibold text-accent-ink uppercase">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-accent"
          />
          {HERO.eyebrow}
        </p>

        <h1 className="max-w-3xl font-display text-display text-balance text-ink">
          {HERO.headline}
        </h1>

        <p className="mt-6 max-w-2xl text-lead text-pretty text-ink">
          {HERO.lead}
        </p>

        <p className="mt-4 max-w-2xl text-pretty text-muted">{HERO.support}</p>

        <div className="mt-9">
          <CtaButton size="lg" block />
          <p className="mt-3 text-sm text-muted">{CTA_REASSURANCE}</p>
        </div>
      </Container>
    </section>
  );
}
