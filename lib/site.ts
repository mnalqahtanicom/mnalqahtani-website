export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mnalqahtani.com',
  name: 'Mohammed Nasser Al-Qahtani',
  email: 'mohammed@mnalqahtani.com',
} as const;

/**
 * Social channels. Only `enabled` links with an href are ever displayed —
 * keep LinkedIn / X disabled until the accounts are live and maintained.
 */
export const socialLinks: { label: string; href: string; enabled: boolean }[] = [
  { label: 'LinkedIn', href: '', enabled: false },
  { label: 'X', href: '', enabled: false },
];

export const activeSocialLinks = socialLinks.filter((s) => s.enabled && s.href);

/** Maintenance mode (CMS-controlled later; env-controlled for now). */
export const maintenanceMode = process.env.MAINTENANCE_MODE === 'on';

/**
 * Executive portrait source. Leave `null` to show the premium placeholder.
 * Set to a path (e.g. '/portrait.jpg') or wire to the CMS in Phase 2 to
 * display the real photo with zero further code changes.
 */
export const portraitSrc: string | null = null;

// Ordered list of expertise disciplines (slugs map to message keys)
export const expertiseSlugs = [
  'strategy-execution',
  'organizational-transformation',
  'change-management',
  'performance-management',
  'governance',
  'leadership',
] as const;

export type ExpertiseSlug = (typeof expertiseSlugs)[number];
