import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/lib/site';
import { getAllKnowledgeRefs } from '@/lib/knowledge';

const staticPaths = [
  '',
  '/strategy-to-results',
  '/knowledge',
  '/frameworks',
  '/about',
  '/contact',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const refs = await getAllKnowledgeRefs();
  const paths = [
    ...staticPaths,
    ...refs.map((r) => `/${r.pillar}/${r.slug}`),
  ];

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
