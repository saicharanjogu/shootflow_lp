import {
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui/section";
import { VALUE_PROP } from "@/lib/content";

/*
 * The 01 → 04 journey.
 *
 * This is the mental model the whole page reuses (capture → follow up → book →
 * manage). Teaching it once here means the product tabs and the how-it-works
 * steps later cost the reader almost nothing to parse.
 *
 * The numbered sequence is deliberately shown as an unfinished progression:
 * an incomplete chain is more memorable than a completed one (Zeigarnik), and
 * the visible end state is the thing being sold.
 */
export function ValueProp() {
  return (
    <Section id="value" tone="cream">
      <Container>
        <Eyebrow>{VALUE_PROP.eyebrow}</Eyebrow>
        <SectionHeading id="value" className="max-w-2xl text-ink">
          {VALUE_PROP.heading}
        </SectionHeading>

        <ol className="mt-8 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:mt-12 sm:grid-cols-2">
          {VALUE_PROP.steps.map((step) => (
            <li key={step.number} className="bg-paper p-5 sm:p-7">
              <p
                aria-hidden="true"
                className="tnum font-display text-2xl text-accent-ink"
              >
                {step.number}
              </p>
              <h3 className="mt-3 font-display text-h3 text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-pretty text-muted">{step.body}</p>
              <p className="mt-2 text-note text-pretty text-muted">
                {step.detail}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
