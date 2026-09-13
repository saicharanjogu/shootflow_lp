import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Canonical shadcn `cn()`.
 *
 * The upgrade over a plain join is `tailwind-merge`: when a caller passes a
 * class that conflicts with a component's default (`px-4` over `px-2`), the
 * later one wins instead of both landing in the class list and letting CSS
 * source order decide. That is what makes shadcn components overridable.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
