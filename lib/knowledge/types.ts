import type { PortableTextBlock } from '@portabletext/types';

export type Locale = 'ar' | 'en';

export type Pillar = 'knowledge' | 'frameworks';

export type KnowledgeFormat =
  // Knowledge Hub
  | 'article'
  | 'lesson-learned'
  | 'insight'
  | 'book-summary'
  | 'course-summary'
  | 'best-practice'
  // Frameworks & Tools
  | 'framework'
  | 'template'
  | 'tool'
  | 'checklist'
  | 'model'
  | 'resource';

export interface Category {
  slug: string;
  title: string;
}

export interface KnowledgeItem {
  slug: string;
  title: string;
  excerpt: string;
  format: KnowledgeFormat;
  pillar: Pillar;
  category: Category | null;
  tags: string[];
  coverImageUrl: string | null;
  fileUrl: string | null;
  fileName: string | null;
  publishedAt: string; // ISO date
  featured: boolean;
  body: PortableTextBlock[];
  seo: { title: string | null; description: string | null };
}
