import type { Metadata } from "next";
import { Container } from "@/components/ui/section";
import { NAV_LINKS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="bg-cream py-20 sm:py-28">
      <Container width="narrow">
        <p className="text-eyebrow font-semibold text-accent-ink uppercase">
          404
        </p>
        <h1 className="mt-4 font-display text-h2 text-balance text-ink">
          That page is not here.
        </h1>
        <p className="mt-5 text-lead text-muted">
          The link may be out of date. Everything about ShootFlow lives on the
          home page.
        </p>

        <ul className="mt-8 divide-y divide-line border-y border-line">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={`/${link.href}`}
                className="flex min-h-14 items-center justify-between font-medium text-ink"
              >
                {link.label}
                <span aria-hidden="true" className="text-accent-ink">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
