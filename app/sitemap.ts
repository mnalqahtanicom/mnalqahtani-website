import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/lib/site';

// Routes that exist today (expanded as pages ship in later phases)
const paths = ['', '/about'];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          ar: `${siteConfig.url}/ar${path}`,
          en: `${siteConfig.url}/en${path}`,
        },
      },
    })),
  );
}
