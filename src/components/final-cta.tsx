import { Container } from "@/components/ui/section";
import { CtaButton } from "@/components/ui/cta-button";
import { CTA_REASSURANCE, FINAL_CTA } from "@/lib/content";

/*
 * Final CTA.
 *
 * The "end" half of the Peak-End Rule — the last thing seen is a
 * disproportionate share of what gets remembered. So it closes on relief
 * (free, no card) rather than on friction or a form.
 *
 * The headline points at something the reader already owns and has not dealt
 * with yet. An open loop like that is stickier than a finished one (Zeigarnik),
 * and the three short steps beneath it make the remaining distance look short
 * (Goal-Gradient).
 *
 * This section carries id="signup", so the placeholder SIGNUP_URL ("#signup")
 * resolves to a real element. No button on the page dead-ends, even before the
 * real signup app exists.
 */
export function FinalCta() {
  return (
    <section
      id="signup"
      aria-labelledby="signup-heading"
      className="scroll-mt-22 border-y border-line bg-wash py-20 sm:py-24 lg:py-28"
    >
      <Container width="narrow">
        <h2
          id="signup-heading"
          className="font-display text-h2 text-balance text-ink"
        >
          {FINAL_CTA.heading}
        </h2>

        <p className="mt-6 text-lead text-ink">{FINAL_CTA.lead}</p>

        <ul className="mt-6 space-y-2">
          {FINAL_CTA.steps.map((step) => (
            <li
              key={step}
              className="flex items-center gap-3 text-lead font-medium text-ink"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              />
              {step}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <CtaButton size="lg" block />
          <p className="mt-3 text-note text-muted">{CTA_REASSURANCE}</p>
        </div>
      </Container>
    </section>
  );
}
