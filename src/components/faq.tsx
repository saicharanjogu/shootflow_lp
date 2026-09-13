import {
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui/section";
import { FAQ } from "@/lib/content";

/*
 * FAQ.
 *
 * Native <details>/<summary>, not a React accordion. That buys, for free:
 * keyboard operation, correct screen-reader announcement, working before
 * hydration, and zero JavaScript. A hand-rolled version would need code to
 * match what the browser already does correctly.
 *
 * Order matters. Serial Position Effect says the first and last items are the
 * ones that stick, so the list opens on "is this actually for me?" and closes
 * on the free trial — the answer worth leaving in memory.
 *
 * Each item is a bordered card (Law of Common Region): the boundary is what
 * makes a collapsed question and its expanded answer read as one unit.
 */
export function Faq() {
  return (
    <Section id="faq" tone="sand">
      <Container width="narrow">
        <Eyebrow tone="onSand">{FAQ.eyebrow}</Eyebrow>
        <SectionHeading id="faq" className="text-ink">
          {FAQ.heading}
        </SectionHeading>

        <div className="mt-8 space-y-2.5 sm:mt-10 sm:space-y-3">
          {FAQ.items.map((item) => (
            <details
              key={item.question}
              // Deliberately NOT an exclusive accordion (no `name` attribute):
              // collapsing an item above the one being opened shifts the page
              // upward under the reader's finger. Letting several stay open is
              // the less surprising behaviour.
              className="group rounded-card border border-line bg-paper px-5 open:border-edge"
            >
              <summary className="flex min-h-14 items-center justify-between gap-4 py-4 font-medium text-ink">
                {item.question}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="h-5 w-5 shrink-0 text-accent-ink transition-transform duration-200 group-open:rotate-45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M10 4v12M4 10h12" />
                </svg>
              </summary>
              <p className="pb-5 text-pretty text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
