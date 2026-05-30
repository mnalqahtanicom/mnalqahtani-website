/**
 * Minimal className combiner — joins truthy class strings with a space.
 * Kept dependency-free; swap for clsx/tailwind-merge later if needed.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
