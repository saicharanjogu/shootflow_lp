"use client";

import { useState } from "react";
import { MenuIcon } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/ui/wordmark";
import { navLinkVariants } from "@/components/nav/nav-link";
import { CTA_LABEL, CTA_REASSURANCE, NAV_LINKS } from "@/lib/content";
import { SIGNUP_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

/*
 * Mobile navigation.
 *
 * The Sheet portals to document.body, which is the fix for the bug this
 * refactor exists to solve: the previous hand-rolled panel lived inside the
 * translated <header>, so its `fixed inset-0` backdrop was sized against the
 * header's box rather than the viewport (see the note in ui/sheet.tsx).
 *
 * Radix now owns the focus trap, Escape, scroll lock, focus restoration and
 * aria-modal wiring that were previously written by hand here.
 */
export function MobileNav({ activeId }: { activeId: string | null }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <MenuIcon className="size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[min(20rem,85vw)] gap-0 p-0 sm:max-w-sm"
      >
        <SheetHeader className="border-b border-border px-5 py-4 text-left">
          <SheetTitle className="flex">
            <Wordmark />
          </SheetTitle>
        </SheetHeader>

        <nav aria-label="Mobile" className="px-5">
          <ul className="divide-y divide-border">
            {NAV_LINKS.map((link) => {
              const active = activeId === link.id;
              return (
                <li key={link.href}>
                  {/* SheetClose asChild keeps the link a real anchor while
                      still dismissing the sheet on activation. */}
                  <SheetClose asChild>
                    <a
                      href={link.href}
                      aria-current={active ? "true" : undefined}
                      className={cn(
                        navLinkVariants({ variant: "mobile", active }),
                        active && "text-accent-ink",
                      )}
                    >
                      {active ? (
                        <span
                          aria-hidden="true"
                          className="size-1.5 rounded-full bg-primary"
                        />
                      ) : null}
                      {link.label}
                    </a>
                  </SheetClose>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto border-t border-border p-5">
          <SheetClose asChild>
            <Button asChild size="lg" className="w-full">
              <a href={SIGNUP_URL}>{CTA_LABEL}</a>
            </Button>
          </SheetClose>
          <p className="mt-3 text-note text-muted">{CTA_REASSURANCE}</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
