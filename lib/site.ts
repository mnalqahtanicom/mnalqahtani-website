export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mnalqahtani.com',
  name: 'Mohammed Nasser Al-Qahtani',
  email: 'mohammed@mnalqahtani.com',
} as const;

/**
 * Default executive portrait source (in public/). Used as the fallback when
 * the CMS Site Settings portrait isn't set. Leave the file absent to show the
 * premium placeholder; the Portrait component degrades gracefully.
 */
export const portraitSrc: string | null = '/portrait.jpg';
