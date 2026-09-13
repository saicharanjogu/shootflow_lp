import {
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui/section";
import { OUTCOMES } from "@/lib/content";

/*
 * Outcomes.
 *
 * Five items — at the top of what working memory handles comfortably in one
 * pass (Miller's Law). Each is a short title plus one line, so the list can be
 * skimmed on titles alone and only the relevant one gets read in full. That is
 * how people actually read a benefits list.
 */
export function Outcomes() {
  return (
    <Section id="outcomes" tone="cream">
      <Container>
        <Eyebrow>{OUTCOMES.eyebrow}</Eyebrow>
        <SectionHeading id="outcomes" className="max-w-3xl text-ink">
          {OUTCOMES.heading}
        </SectionHeading>
        <p className="mt-5 text-lead text-muted">{OUTCOMES.intro}</p>

        <ul className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OUTCOMES.items.map((item) => (
            <li
              key={item.title}
              className="rounded-card border border-line bg-paper p-5 sm:p-6"
            >
              <div className="flex items-start gap-3">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent-ink"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="10" cy="10" r="7.5" />
                  <path d="M6.5 10.2l2.4 2.4 4.6-5" />
                </svg>
                <div>
                  <h3 className="font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1.5 text-note text-pretty text-muted">
                    {item.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
