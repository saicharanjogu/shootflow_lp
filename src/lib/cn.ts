/** Minimal class-name joiner — avoids pulling in clsx for a single-page site. */
export function cn(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(" ");
}
