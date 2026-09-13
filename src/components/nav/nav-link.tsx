import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/*
 * Styling for a primary nav link, as a cva recipe.
 *
 * Not shadcn's NavigationMenu: that component exists for menus with dropdown
 * content panels, and wiring four flat anchor links through it would add JS and
 * announce ARIA semantics that describe something this nav is not. shadcn's own
 * site header is plain styled links plus a Sheet — which is the pattern here.
 */
export const navLinkVariants = cva(
  "relative inline-flex items-center rounded-md font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        desktop: "min-h-12 px-2.5 text-[0.95rem] lg:px-3",
        mobile: "min-h-14 w-full gap-2.5 text-lg",
      },
      active: {
        true: "text-foreground",
        false: "text-muted hover:text-foreground",
      },
    },
    defaultVariants: { variant: "desktop", active: false },
  },
);

export type NavLinkVariants = VariantProps<typeof navLinkVariants>;

/** The accent underline marking the current section on desktop. */
export function ActiveUnderline({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute inset-x-2.5 bottom-2 h-0.5 rounded-full bg-primary transition-opacity duration-200 lg:inset-x-3",
        active ? "opacity-100" : "opacity-0",
      )}
    />
  );
}
