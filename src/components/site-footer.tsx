import { Container } from "@/components/ui/section";
import { Wordmark } from "@/components/ui/wordmark";
import { FOOTER } from "@/lib/content";

/*
 * Footer.
 *
 * Link rows are 48px tall even though they are "just" footer links — this is
 * exactly where cramped 20px tap targets usually survive a design review and
 * then frustrate people on phones (Fitts's Law does not stop applying at the
 * bottom of the page).
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    // The extra bottom padding below `lg` reserves room for the sticky mobile
    // CTA bar, so the copyright line is never trapped underneath it. The bar
    // hides itself on short (landscape) viewports, so the reservation lifts
    // there too rather than leaving dead space.
    <footer className="bg-ink pt-12 pb-28 text-cream sm:pt-16 lg:pb-16 [@media(max-height:500px)]:pb-16">
      <Container width="wide">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Wordmark tone="cream" />
            <p className="mt-4 text-ink-muted">{FOOTER.tagline}</p>
            <p className="mt-1 font-display text-h3 text-cream">
              {FOOTER.rhythm}
            </p>
          </div>

          {FOOTER.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-eyebrow font-semibold text-ink-muted uppercase">
                {column.title}
              </h2>
              <ul className="mt-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="flex min-h-12 items-center text-cream/90 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="mt-12 border-t border-white/10 pt-8 text-sm text-ink-muted">
          © {year} ShootFlow
        </p>
      </Container>
    </footer>
  );
}
