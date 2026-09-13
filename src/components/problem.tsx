import {
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui/section";
import { PROBLEM } from "@/lib/content";

/*
 * Problem.
 *
 * The three scattered sources render as three separate cards on purpose. Set as
 * one paragraph they read as a list of facts; set apart with visible gaps
 * between them they *look* like the fragmentation they describe, and the
 * resolution line below lands against that.
 */
export function Problem() {
  return (
    <Section id="problem" tone="sand">
      <Container>
        <Eyebrow tone="onSand">{PROBLEM.eyebrow}</Eyebrow>
        <SectionHeading id="problem" className="max-w-2xl text-ink">
          {PROBLEM.heading}
        </SectionHeading>

        <ul className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
          {PROBLEM.sources.map((source) => (
            <li
              key={source}
              className="rounded-card border border-line bg-paper p-5 text-ink"
            >
              {source}
            </li>
          ))}
        </ul>

        <div className="mt-8 max-w-2xl space-y-3">
          <p className="text-lead text-pretty text-muted">
            {PROBLEM.consequence}
          </p>
          {/* The one line in this section carrying real weight gets the accent
              rule — a single point of emphasis, not a highlighted paragraph. */}
          <p className="border-l-2 border-accent pl-4 text-lead font-medium text-pretty text-ink">
            {PROBLEM.stake}
          </p>
        </div>

        <p className="mt-8 max-w-2xl text-pretty text-muted">
          {PROBLEM.resolution}
        </p>
      </Container>
    </Section>
  );
}
