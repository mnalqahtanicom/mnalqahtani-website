import 'server-only';
import type { PortableTextBlock } from '@portabletext/types';
import { sanityClient } from '@/lib/sanity/client';
import { urlForImage } from '@/lib/sanity/image';
import { seedCategories, seedInsights } from '@/content/seed-insights';
import type { Category, Insight, Locale } from './types';

export type { Category, Insight, Locale } from './types';

// --- helpers ---------------------------------------------------------------

let keyCounter = 0;
function paragraph(text: string): PortableTextBlock {
  keyCounter += 1;
  return {
    _type: 'block',
    _key: `seed-${keyCounter}`,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `seed-s-${keyCounter}`, text, marks: [] }],
  } as PortableTextBlock;
}

// --- seed source -----------------------------------------------------------

function seedToInsight(
  item: (typeof seedInsights)[number],
  locale: Locale,
): Insight {
  return {
    slug: item.slug,
    title: item.title[locale],
    excerpt: item.excerpt[locale],
    category: { slug: item.category.slug, title: item.category.title[locale] },
    tags: item.tags,
    coverImageUrl: null,
    publishedAt: item.publishedAt,
    featured: item.featured,
    body: item.body[locale].map(paragraph),
  };
}

function seedList(locale: Locale): Insight[] {
  return [...seedInsights]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .map((i) => seedToInsight(i, locale));
}

// --- Sanity source ---------------------------------------------------------

const insightProjection = `{
  "slug": slug.current,
  "title": title[$locale],
  "excerpt": excerpt[$locale],
  tags,
  featured,
  publishedAt,
  "body": body[$locale],
  coverImage,
  "category": category->{"slug": slug.current, "title": title[$locale]}
}`;

interface RawInsight extends Omit<Insight, 'coverImageUrl'> {
  coverImage?: unknown;
}

function mapRaw(raw: RawInsight): Insight {
  const { coverImage, ...rest } = raw;
  return {
    ...rest,
    tags: rest.tags ?? [],
    body: rest.body ?? [],
    coverImageUrl: coverImage ? urlForImage(coverImage) : null,
  };
}

// --- public API ------------------------------------------------------------

export async function getAllInsights(locale: Locale): Promise<Insight[]> {
  if (!sanityClient) return seedList(locale);
  const raw = await sanityClient.fetch<RawInsight[]>(
    `*[_type == "insight" && defined(slug.current)] | order(publishedAt desc) ${insightProjection}`,
    { locale },
  );
  return raw.map(mapRaw);
}

export async function getFeaturedInsights(
  locale: Locale,
  limit = 3,
): Promise<Insight[]> {
  const all = await getAllInsights(locale);
  const featured = all.filter((i) => i.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export async function getInsightBySlug(
  slug: string,
  locale: Locale,
): Promise<Insight | null> {
  if (!sanityClient) {
    return seedList(locale).find((i) => i.slug === slug) ?? null;
  }
  const raw = await sanityClient.fetch<RawInsight | null>(
    `*[_type == "insight" && slug.current == $slug][0] ${insightProjection}`,
    { slug, locale },
  );
  return raw ? mapRaw(raw) : null;
}

export async function getAllInsightSlugs(): Promise<string[]> {
  if (!sanityClient) return seedInsights.map((i) => i.slug);
  return sanityClient.fetch<string[]>(
    `*[_type == "insight" && defined(slug.current)].slug.current`,
  );
}

export async function getCategories(locale: Locale): Promise<Category[]> {
  if (!sanityClient) {
    return seedCategories.map((c) => ({ slug: c.slug, title: c.title[locale] }));
  }
  return sanityClient.fetch<Category[]>(
    `*[_type == "category"] | order(title.en asc){"slug": slug.current, "title": title[$locale]}`,
    { locale },
  );
}
