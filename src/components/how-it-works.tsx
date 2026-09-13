import {
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui/section";
import { HOW_IT_WORKS } from "@/lib/content";

/*
 * How it works.
 *
 * Four steps, connected by a continuous rule rather than left as four separate
 * cards (Law of Uniform Connectedness) — the connector is what makes it read as
 * a sequence with an end, rather than four unrelated chores.
 *
 * The three closing lines are the objection-handling: setup effort is the main
 * reason someone bounces off a tool like this, and each line removes one worry.
 */
export function HowItWorks() {
  return (
    <Section id="how-it-works" tone="sand">
      <Container>
        <Eyebrow tone="onSand">{HOW_IT_WORKS.eyebrow}</Eyebrow>
        <SectionHeading id="how-it-works" className="max-w-2xl text-ink">
          {HOW_IT_WORKS.heading}
        </SectionHeading>

        <div className="relative mt-12">
          {/* Mobile spine: one vertical rule threading the numerals. */}
          <span
            aria-hidden="true"
            className="absolute top-4 bottom-4 left-[19px] w-px bg-edge/50 md:hidden"
          />

          <ol className="grid gap-8 md:grid-cols-4 md:gap-6">
            {HOW_IT_WORKS.steps.map((step, index) => (
              <li key={step.number} className="relative flex gap-5 md:block">
                {/* Desktop connector, drawn per step and omitted after the
                    last one — a rule that runs past step 4 would suggest the
                    sequence keeps going. It ends where the process ends. */}
                {index < HOW_IT_WORKS.steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute top-[19px] left-12 hidden h-px bg-edge/50 md:block md:right-[-1.5rem]"
                  />
                ) : null}
                <span
                  aria-hidden="true"
                  className="tnum relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-edge bg-sand font-display text-lg text-accent-deep"
                >
                  {step.number}
                </span>
                <div className="md:mt-5">
                  <h3 className="font-display text-h3 text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-pretty text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2">
          {HOW_IT_WORKS.footnote.map((line) => (
            <li
              key={line}
              className="flex items-center gap-2 text-sm font-medium text-ink"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="h-4 w-4 shrink-0 text-accent-deep"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 10.5l4 4 8-9" />
              </svg>
              {line}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
