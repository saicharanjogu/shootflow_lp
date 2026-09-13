import { NAV_LINKS } from "@/lib/content";
import { ActiveUnderline, navLinkVariants } from "@/components/nav/nav-link";

/**
 * The primary link row. Appears from `md:` (768px); below that the four labels
 * plus the wordmark and CTA no longer fit on one line and the Sheet takes over.
 */
export function DesktopNav({
  activeId,
  onNavigate,
}: {
  activeId: string | null;
  onNavigate?: () => void;
}) {
  return (
    <nav aria-label="Primary" className="hidden md:block">
      <ul className="flex items-center gap-0.5 lg:gap-1">
        {NAV_LINKS.map((link) => {
          const active = activeId === link.id;
          return (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={onNavigate}
                // aria-current is what actually conveys "you are here" to a
                // screen reader; the underline alone would not.
                aria-current={active ? "true" : undefined}
                className={navLinkVariants({ variant: "desktop", active })}
              >
                {link.label}
                <ActiveUnderline active={active} />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
