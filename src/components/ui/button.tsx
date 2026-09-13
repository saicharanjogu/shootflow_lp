import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * shadcn Button.
 *
 * Two deviations from the stock component, both deliberate:
 *
 *  1. `hover:bg-accent` is written as `hover:bg-secondary`. In this project
 *     `--color-accent` is the terracotta brand fill, not shadcn's pale hover
 *     surface — see the note in globals.css. Anything pasted from
 *     ui.shadcn.com needs the same swap.
 *  2. Heights are floored at 48px (`min-h-12`) rather than shadcn's 36px
 *     default. Every button here is a touch target on a phone first.
 *
 * `asChild` is what makes this usable for navigation: the header CTA is a link,
 * and rendering a real <a> keeps middle-click, open-in-new-tab and the status
 * bar working. A <button> that navigates does none of that.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill text-[0.95rem] font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-card hover:bg-accent-ink active:bg-accent-deep",
        outline:
          "border border-input bg-transparent text-foreground hover:bg-secondary hover:border-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "text-muted hover:bg-secondary hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-12 px-5",
        sm: "min-h-11 px-4 text-note",
        lg: "min-h-14 px-7 text-base sm:text-lg",
        icon: "min-h-12 min-w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
