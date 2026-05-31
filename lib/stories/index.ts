import 'server-only';
import type { PortableTextBlock } from '@portabletext/types';
import { sanityClient } from '@/lib/sanity/client';
import { urlForImage } from '@/lib/sanity/image';
import type { Locale } from '@/lib/knowledge/types';

export interface Story {
  slug: string;
  title: string;
  sector: string | null;
  summary: string | null;
  challenge: PortableTextBlock[];
  solution: PortableTextBlock[];
  impact: PortableTextBlock[];
  lessonsLearned: PortableTextBlock[];
  coverImageUrl: string | null;
  publishedAt: string;
  featured: boolean;
  seo: { title: string | null; description: string | null };
}

const projection = `{
  "slug": slug.current,
  "title": title[$locale],
  "sector": sector[$locale],
  "summary": summary[$locale],
  "challenge": challenge[$locale],
  "solution": solution[$locale],
  "impact": impact[$locale],
  "lessonsLearned": lessonsLearned[$locale],
  coverImage,
  publishedAt,
  featured,
  "seo": {"title": seo.title[$locale], "description": seo.description[$locale]}
}`;

interface Raw extends Omit<Story, 'coverImageUrl'> {
  coverImage?: unknown;
}

function mapRaw(raw: Raw): Story {
  const { coverImage, ...rest } = raw;
  return {
    ...rest,
    challenge: rest.challenge ?? [],
    solution: rest.solution ?? [],
    impact: rest.impact ?? [],
    lessonsLearned: rest.lessonsLearned ?? [],
    seo: rest.seo ?? { title: null, description: null },
    coverImageUrl: coverImage ? urlForImage(coverImage) : null,
  };
}

export async function getStories(locale: Locale): Promise<Story[]> {
  if (!sanityClient) return [];
  try {
    const raw = await sanityClient.fetch<Raw[]>(
      `*[_type == "transformationStory" && defined(slug.current)] | order(publishedAt desc) ${projection}`,
      { locale },
    );
    return raw.map(mapRaw);
  } catch {
    return [];
  }
}

export async function getFeaturedStories(
  locale: Locale,
  limit = 2,
): Promise<Story[]> {
  const all = await getStories(locale);
  const featured = all.filter((s) => s.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export async function getStoryBySlug(
  slug: string,
  locale: Locale,
): Promise<Story | null> {
  const all = await getStories(locale);
  return all.find((s) => s.slug === slug) ?? null;
}

export async function getStorySlugs(): Promise<string[]> {
  if (!sanityClient) return [];
  try {
    return await sanityClient.fetch<string[]>(
      `*[_type == "transformationStory" && defined(slug.current)].slug.current`,
    );
  } catch {
    return [];
  }
}
