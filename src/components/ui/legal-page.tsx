import { Container } from "@/components/ui/section";

/**
 * Shared shell for the placeholder legal pages.
 *
 * These exist so the footer's Privacy and Terms links resolve to a real page
 * rather than dead-ending. They are honest placeholders on purpose — the actual
 * policy text has to come from whoever is accountable for it, and inventing
 * binding legal language here would be worse than an empty page.
 */
export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: ReadonlyArray<{ heading: string; body: string }>;
}) {
  return (
    <article className="bg-cream py-16 sm:py-20 lg:py-24">
      <Container width="narrow">
        <p className="mb-4 text-eyebrow font-semibold text-accent-ink uppercase">
          Legal
        </p>
        <h1 className="font-display text-h2 text-balance text-ink">{title}</h1>
        <p className="mt-6 text-lead text-pretty text-muted">{intro}</p>

        <div
          role="note"
          className="mt-8 rounded-card border border-edge bg-wash p-5 text-pretty text-ink"
        >
          <strong className="font-semibold">This page is a placeholder.</strong>{" "}
          The full text is being prepared and will replace this page before
          ShootFlow starts accepting payments.
        </div>

        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-h3 text-ink">
                {section.heading}
              </h2>
              <p className="mt-2 text-pretty text-muted">{section.body}</p>
            </section>
          ))}
        </div>

        <p className="mt-12 border-t border-line pt-8">
          <a
            href="/"
            className="inline-flex min-h-12 items-center font-medium text-accent-ink hover:text-accent-deep"
          >
            ← Back to ShootFlow
          </a>
        </p>
      </Container>
    </article>
  );
}

export function legalMetadata(title: string, description: string) {
  return {
    title,
    description,
    robots: { index: false, follow: true },
  } satisfies {
    title: string;
    description: string;
    robots: { index: boolean; follow: boolean };
  };
}

export type LegalSections = ReadonlyArray<{ heading: string; body: string }>;
