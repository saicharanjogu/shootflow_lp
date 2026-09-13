import {
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui/section";
import { CTA_LABEL, CTA_REASSURANCE, PRICING } from "@/lib/content";
import { SIGNUP_URL } from "@/lib/site";
import { cn } from "@/lib/cn";

/*
 * Pricing.
 *
 * Four tiers is more choice than Hick's Law would like, so the section is built
 * to make the decision one step rather than a feature audit:
 *
 *  - Each tier leads with WHO IT IS FOR, not what it contains. People pick by
 *    recognising themselves far faster than by comparing 25 features.
 *  - Each tier past the first says "Everything in X, plus:" so the list below
 *    it is only the delta — this is Tesler's Law in practice. The complexity
 *    is real and cannot be deleted, so it is carried by the layout instead of
 *    by the reader.
 *  - Pro is the single visual outlier on the entire page (Von Restorff): accent
 *    border, badge, lift. Emphasising a second tier would cancel both out.
 *
 * Pro also sits at position 2 of 4 — the weakest slot for recall (Serial
 * Position Effect) — which is precisely why it needs the emphasis to compete
 * with the first and last cards.
 *
 * Order stays cheapest → dearest. Leading with Pro would win the primary slot
 * but break the price ladder people expect from every pricing table they have
 * ever used (Jakob's Law). Worth A/B testing, not worth assuming.
 */
export function Pricing() {
  return (
    <Section id="pricing" tone="sand">
      <Container width="wide">
        <Eyebrow tone="onSand">{PRICING.eyebrow}</Eyebrow>
        <SectionHeading id="pricing" className="max-w-2xl text-ink">
          {PRICING.heading}
        </SectionHeading>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
          {PRICING.tiers.map((tier) => {
            const featured = tier.featured;

            return (
              <li
                key={tier.id}
                className={cn(
                  "flex flex-col rounded-card bg-paper p-6",
                  featured
                    ? "border-2 border-accent shadow-lift xl:-my-2 xl:py-8"
                    : "border border-line",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-h3 text-ink">{tier.name}</h3>
                  {featured && "badge" in tier ? (
                    // A text badge, not just a colour or a size change — the
                    // recommendation has to survive for anyone who cannot see
                    // the accent border.
                    <span className="rounded-pill bg-accent px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide text-white uppercase">
                      {tier.badge}
                    </span>
                  ) : null}
                </div>

                {/* Prices render in the UI sans, never the display serif: many
                    display faces ship without the ₹ glyph (U+20B9), which would
                    drop every price into a fallback font mid-line. */}
                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-price font-semibold text-ink">
                    {tier.price}
                  </span>
                  <span className="text-sm text-muted">{tier.period}</span>
                </p>

                <p className="mt-3 text-sm text-pretty text-muted">
                  {tier.audience}
                </p>

                {tier.inherits ? (
                  <p className="mt-5 border-t border-line pt-4 text-sm font-medium text-ink">
                    {tier.inherits}
                  </p>
                ) : null}

                <ul
                  className={cn(
                    "space-y-2.5 text-sm",
                    tier.inherits ? "mt-4" : "mt-5 border-t border-line pt-5",
                  )}
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 10.5l4 4 8-9" />
                      </svg>
                      <span className="text-ink">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* mt-auto pins every CTA to the bottom of its card. The cards
                    stretch to equal height in the grid, so the four buttons land
                    on one line despite the feature lists being different lengths
                    — four buttons at four different heights reads as four
                    unrelated cards rather than one comparable set. */}
                <div className="mt-auto pt-7">
                  <a
                    href={SIGNUP_URL}
                    className={cn(
                      "inline-flex min-h-12 w-full items-center justify-center rounded-pill px-5 font-semibold transition-colors",
                      featured
                        ? "bg-accent text-white hover:bg-accent-ink"
                        : "border border-edge text-ink hover:border-ink hover:bg-sand",
                    )}
                  >
                    {CTA_LABEL}
                    <span className="sr-only"> on the {tier.name} plan</span>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-col gap-1 text-sm text-muted">
          <p>{PRICING.taxNote}</p>
          <p>{CTA_REASSURANCE}</p>
        </div>
      </Container>
    </Section>
  );
}
