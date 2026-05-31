import 'server-only';
import type { PortableTextBlock } from '@portabletext/types';
import { sanityClient } from '@/lib/sanity/client';
import { urlForImage } from '@/lib/sanity/image';
import { seedCategories, seedKnowledge } from '@/content/seed-knowledge';
import type { Category, KnowledgeItem, Locale, Pillar } from './types';
import { pillarOf } from './formats';

export type { Category, KnowledgeItem, Locale, Pillar } from './types';

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

function seedToItem(
  item: (typeof seedKnowledge)[number],
  locale: Locale,
): KnowledgeItem {
  return {
    slug: item.slug,
    title: item.title[locale],
    excerpt: item.excerpt[locale],
    format: item.format,
    pillar: pillarOf(item.format),
    category: { slug: item.category.slug, title: item.category.title[locale] },
    tags: item.tags,
    coverImageUrl: null,
    fileUrl: item.file?.url ?? null,
    fileName: item.file?.name ?? null,
    publishedAt: item.publishedAt,
    featured: item.featured,
    body: item.body[locale].map(paragraph),
    seo: { title: null, description: null },
  };
}

function seedList(locale: Locale): KnowledgeItem[] {
  return [...seedKnowledge]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .map((i) => seedToItem(i, locale));
}

// --- Sanity source ---------------------------------------------------------

const projection = `{
  "slug": slug.current,
  "title": title[$locale],
  "excerpt": excerpt[$locale],
  format,
  tags,
  featured,
  publishedAt,
  "body": body[$locale],
  coverImage,
  "fileUrl": file.asset->url,
  "fileName": file.asset->originalFilename,
  "category": category->{"slug": slug.current, "title": title[$locale]},
  "seo": {"title": seo.title[$locale], "description": seo.description[$locale]}
}`;

interface RawItem extends Omit<KnowledgeItem, 'coverImageUrl' | 'pillar'> {
  coverImage?: unknown;
}

function mapRaw(raw: RawItem): KnowledgeItem {
  const { coverImage, ...rest } = raw;
  return {
    ...rest,
    pillar: pillarOf(rest.format),
    tags: rest.tags ?? [],
    body: rest.body ?? [],
    fileUrl: rest.fileUrl ?? null,
    fileName: rest.fileName ?? null,
    seo: rest.seo ?? { title: null, description: null },
    coverImageUrl: coverImage ? urlForImage(coverImage) : null,
  };
}

async function sanityList(locale: Locale): Promise<KnowledgeItem[]> {
  if (!sanityClient) return [];
  const raw = await sanityClient.fetch<RawItem[]>(
    `*[_type == "knowledge" && defined(slug.current)] | order(publishedAt desc) ${projection}`,
    { locale },
  );
  return raw.map(mapRaw);
}

// --- public API ------------------------------------------------------------

export async function getAllKnowledge(locale: Locale): Promise<KnowledgeItem[]> {
  return sanityClient ? sanityList(locale) : seedList(locale);
}

export async function getByPillar(
  locale: Locale,
  pillar: Pillar,
): Promise<KnowledgeItem[]> {
  const all = await getAllKnowledge(locale);
  return all.filter((i) => i.pillar === pillar);
}

export async function getFeatured(
  locale: Locale,
  pillar: Pillar | 'all' = 'all',
  limit = 3,
): Promise<KnowledgeItem[]> {
  const all = await getAllKnowledge(locale);
  const scoped = pillar === 'all' ? all : all.filter((i) => i.pillar === pillar);
  const featured = scoped.filter((i) => i.featured);
  return (featured.length ? featured : scoped).slice(0, limit);
}

export async function getKnowledgeBySlug(
  slug: string,
  locale: Locale,
): Promise<KnowledgeItem | null> {
  const all = await getAllKnowledge(locale);
  return all.find((i) => i.slug === slug) ?? null;
}

export async function getAllKnowledgeRefs(): Promise<
  { slug: string; pillar: Pillar }[]
> {
  if (!sanityClient) {
    return seedKnowledge.map((i) => ({ slug: i.slug, pillar: pillarOf(i.format) }));
  }
  const rows = await sanityClient.fetch<{ slug: string; format: KnowledgeItem['format'] }[]>(
    `*[_type == "knowledge" && defined(slug.current)]{"slug": slug.current, format}`,
  );
  return rows.map((r) => ({ slug: r.slug, pillar: pillarOf(r.format) }));
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
