import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import KnowledgeDetail from '@/components/knowledge/KnowledgeDetail';
import { routing } from '@/i18n/routing';
import {
  getAllKnowledgeRefs,
  getByPillar,
  getKnowledgeBySlug,
  type Locale,
} from '@/lib/knowledge';

export async function generateStaticParams() {
  const refs = await getAllKnowledgeRefs();
  return routing.locales.flatMap((locale) =>
    refs
      .filter((r) => r.pillar === 'frameworks')
      .map((r) => ({ locale, slug: r.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = await getKnowledgeBySlug(slug, locale as Locale);
  if (!item) return {};
  return {
    title: item.seo.title ?? item.title,
    description: item.seo.description ?? item.excerpt,
    alternates: {
      canonical: `/${locale}/frameworks/${slug}`,
      languages: {
        ar: `/ar/frameworks/${slug}`,
        en: `/en/frameworks/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      title: item.title,
      description: item.excerpt,
      images: item.coverImageUrl ? [item.coverImageUrl] : undefined,
    },
  };
}

export default async function FrameworkItemPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;

  const item = await getKnowledgeBySlug(slug, loc);
  if (!item || item.pillar !== 'frameworks') notFound();

  const related = (await getByPillar(loc, 'frameworks'))
    .filter(
      (i) => i.slug !== item.slug && i.category?.slug === item.category?.slug,
    )
    .slice(0, 3);

  return <KnowledgeDetail item={item} related={related} locale={loc} />;
}
