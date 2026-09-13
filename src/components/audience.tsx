import {
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui/section";
import { AUDIENCE } from "@/lib/content";

/*
 * Who it is for.
 *
 * Each card is a matched pair: the reader's situation, then ShootFlow's answer
 * to it. Keeping them visually distinct (muted description, ink answer) lets
 * someone scan only the situations, find themselves, and read one answer —
 * rather than reading four full paragraphs to locate the relevant one.
 *
 * This also does the work Hick's Law asks of the pricing section further down:
 * by the time the tiers appear, the reader has already self-identified.
 */
export function Audience() {
  return (
    <Section id="audience" tone="cream">
      <Container>
        <Eyebrow>{AUDIENCE.eyebrow}</Eyebrow>
        <SectionHeading id="audience" className="max-w-2xl text-ink">
          {AUDIENCE.heading}
        </SectionHeading>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {AUDIENCE.personas.map((persona) => (
            <li
              key={persona.title}
              className="flex flex-col rounded-card border border-line bg-paper p-6 sm:p-7"
            >
              <h3 className="font-display text-h3 text-ink">{persona.title}</h3>
              <p className="mt-3 text-pretty text-muted">{persona.situation}</p>
              <p className="mt-auto pt-4 font-medium text-pretty text-accent-ink">
                {persona.answer}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
