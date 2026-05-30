export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mnalqahtani.com',
  name: 'Mohammed Al-Qahtani',
  linkedin: 'https://www.linkedin.com/',
  email: 'contact@mnalqahtani.com',
} as const;

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
