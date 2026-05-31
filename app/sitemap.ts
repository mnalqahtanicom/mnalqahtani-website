import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/lib/site';
import { getAllInsightSlugs } from '@/lib/insights';

// Static routes that exist today (expanded as pages ship in later phases)
const staticPaths = ['', '/about', '/insights'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllInsightSlugs();
  const paths = [...staticPaths, ...slugs.map((slug) => `/insights/${slug}`)];

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
