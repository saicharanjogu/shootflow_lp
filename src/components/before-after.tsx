import {
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui/section";
import { BEFORE_AFTER } from "@/lib/content";

/*
 * Before / After — the peak moment of the page.
 *
 * Peak-End Rule: people judge an experience largely by its most intense point
 * and its ending. This is the section where a photographer recognises their own
 * week, so it gets the page's one dark band and its most deliberate layout. The
 * ending (the final CTA) is the other half of that pair.
 *
 * The two chains are drawn differently on purpose:
 *
 *  - BEFORE is a dotted, broken line. Each step sits on its own with nothing
 *    binding it to the next — the visual equivalent of enquiries scattered
 *    across three apps.
 *  - AFTER is a solid, continuous rule through every step (Law of Uniform
 *    Connectedness). Elements joined by a visible connector are perceived as
 *    one process rather than a pile of separate items.
 *
 * That contrast is doing the argument's work before a single word is read.
 */
export function BeforeAfter() {
  return (
    <Section id="before-after" tone="ink">
      <Container>
        <Eyebrow tone="onInk">{BEFORE_AFTER.eyebrow}</Eyebrow>
        <SectionHeading id="before-after" className="max-w-2xl text-cream">
          {BEFORE_AFTER.heading}
        </SectionHeading>

        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-8 md:grid-cols-2 md:gap-10">
          {/* BEFORE — deliberately unresolved */}
          <div className="rounded-card border border-white/10 bg-white/[0.03] p-5 sm:p-7">
            <h3 className="text-eyebrow font-semibold text-ink-muted uppercase">
              {BEFORE_AFTER.before.title}
            </h3>

            <ol className="mt-6 space-y-0">
              {BEFORE_AFTER.before.steps.map((step, index) => {
                const last = index === BEFORE_AFTER.before.steps.length - 1;
                return (
                  <li key={step} className="relative flex gap-4 pb-6 last:pb-0">
                    {!last ? (
                      <span
                        aria-hidden="true"
                        className="absolute top-3 bottom-0 left-[5px] w-px border-l border-dashed border-ink-muted/50"
                      />
                    ) : null}
                    <span
                      aria-hidden="true"
                      className="relative z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border border-ink-muted bg-ink"
                    />
                    <span className="text-ink-muted">{step}</span>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* AFTER — one continuous chain */}
          <div className="rounded-card border border-accent-light/40 bg-accent-light/[0.07] p-5 sm:p-7">
            <h3 className="text-eyebrow font-semibold text-accent-light uppercase">
              {BEFORE_AFTER.after.title}
            </h3>

            <ol className="mt-6 space-y-0">
              {BEFORE_AFTER.after.steps.map((step, index) => {
                const last = index === BEFORE_AFTER.after.steps.length - 1;
                return (
                  <li key={step} className="relative flex gap-4 pb-6 last:pb-0">
                    {!last ? (
                      <span
                        aria-hidden="true"
                        className="absolute top-3 bottom-0 left-[5px] w-px bg-accent-light/60"
                      />
                    ) : null}
                    <span
                      aria-hidden="true"
                      className={
                        last
                          ? "relative z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-accent-light ring-4 ring-accent-light/25"
                          : "relative z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-accent-light"
                      }
                    />
                    <span
                      className={
                        last ? "font-semibold text-cream" : "text-cream/90"
                      }
                    >
                      {step}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <p className="mt-10 font-display text-h3 text-cream">
          {BEFORE_AFTER.footnote}
        </p>
      </Container>
    </Section>
  );
}
