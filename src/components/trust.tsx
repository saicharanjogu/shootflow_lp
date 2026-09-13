import {
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui/section";
import { TRUST } from "@/lib/content";

/*
 * Trust.
 *
 * Placed immediately after pricing, where the "should I hand my client list to
 * these people?" objection actually surfaces.
 *
 * Note what is NOT here: no testimonials, no studio logos, no "trusted by 500+
 * photographers". None of that exists yet, and inventing it would be a lie the
 * page cannot walk back. Real quotes are the single highest-value addition to
 * this section once there are some.
 */
export function Trust() {
  return (
    <Section id="trust" tone="cream">
      <Container width="narrow">
        <Eyebrow>{TRUST.eyebrow}</Eyebrow>
        <SectionHeading id="trust" className="text-ink">
          {TRUST.heading}
        </SectionHeading>

        <ul className="mt-8 space-y-3">
          {TRUST.points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-lead text-ink">
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="mt-1.5 h-5 w-5 shrink-0 text-accent-ink"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 2.5l6 2.5v5c0 3.5-2.4 6.4-6 7.5-3.6-1.1-6-4-6-7.5v-5z" />
                <path d="M7.2 10.2l2 2 3.6-4" />
              </svg>
              {point}
            </li>
          ))}
        </ul>

        <p className="mt-8 text-pretty text-muted">{TRUST.body}</p>

        <p className="mt-8 border-t border-line pt-8 font-display text-h3 text-ink">
          {TRUST.close}
        </p>
      </Container>
    </Section>
  );
}
