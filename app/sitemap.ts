import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/lib/site';
import { getAllKnowledgeRefs } from '@/lib/knowledge';
import { getStorySlugs } from '@/lib/stories';

export const revalidate = 3600;

const staticPaths = [
  '',
  '/strategy-to-results',
  '/knowledge',
  '/frameworks',
  '/stories',
  '/perspectives',
  '/about',
  '/contact',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [refs, storySlugs] = await Promise.all([
    getAllKnowledgeRefs(),
    getStorySlugs(),
  ]);
  const paths = [
    ...staticPaths,
    ...refs.map((r) => `/${r.pillar}/${r.slug}`),
    ...storySlugs.map((slug) => `/stories/${slug}`),
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
