import type { KnowledgeFormat, Pillar } from './types';

// Formats that belong to each pillar (also drives the CMS dropdown order)
export const KNOWLEDGE_FORMATS: KnowledgeFormat[] = [
  'article',
  'lesson-learned',
  'insight',
  'book-summary',
  'course-summary',
  'best-practice',
];

export const FRAMEWORK_FORMATS: KnowledgeFormat[] = [
  'framework',
  'template',
  'tool',
  'checklist',
  'model',
  'resource',
];

export const ALL_FORMATS: KnowledgeFormat[] = [
  ...KNOWLEDGE_FORMATS,
  ...FRAMEWORK_FORMATS,
];

export function pillarOf(format: KnowledgeFormat): Pillar {
  return KNOWLEDGE_FORMATS.includes(format) ? 'knowledge' : 'frameworks';
}

export function formatsForPillar(pillar: Pillar): KnowledgeFormat[] {
  return pillar === 'knowledge' ? KNOWLEDGE_FORMATS : FRAMEWORK_FORMATS;
}

/** Link to an item's detail page, routed by its pillar. */
export function itemHref(item: { pillar: Pillar; slug: string }): string {
  return `/${item.pillar}/${item.slug}`;
}
