import type { PortableTextBlock } from '@portabletext/types';

export type Locale = 'ar' | 'en';

export interface Category {
  slug: string;
  title: string;
}

export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  category: Category | null;
  tags: string[];
  coverImageUrl: string | null;
  publishedAt: string; // ISO date
  featured: boolean;
  body: PortableTextBlock[];
}
