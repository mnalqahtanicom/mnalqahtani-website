import 'server-only';
import { sanityClient } from '@/lib/sanity/client';
import { urlForImage } from '@/lib/sanity/image';
import type { Locale } from '@/lib/knowledge/types';

export interface Perspective {
  id: string;
  name: string;
  position: string | null;
  organization: string | null;
  photoUrl: string | null;
  quote: string;
  featured: boolean;
}

const projection = `{
  "id": _id,
  name,
  "position": position[$locale],
  "organization": organization[$locale],
  photo,
  "quote": quote[$locale],
  featured
}`;

interface Raw extends Omit<Perspective, 'photoUrl'> {
  photo?: unknown;
}

export async function getPerspectives(locale: Locale): Promise<Perspective[]> {
  if (!sanityClient) return [];
  const raw = await sanityClient.fetch<Raw[]>(
    `*[_type == "leadershipPerspective"] | order(order asc) ${projection}`,
    { locale },
  );
  return raw.map(({ photo, ...rest }) => ({
    ...rest,
    photoUrl: photo ? urlForImage(photo) : null,
  }));
}

export async function getFeaturedPerspectives(
  locale: Locale,
): Promise<Perspective[]> {
  const all = await getPerspectives(locale);
  const featured = all.filter((p) => p.featured);
  return featured.length ? featured : all;
}
