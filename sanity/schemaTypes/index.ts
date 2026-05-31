import type { SchemaTypeDefinition } from 'sanity';
import { localeString, localeText, localeBlockContent } from './localized';
import { seo } from './seo';
import { category } from './category';
import { knowledge } from './knowledge';

export const schemaTypes: SchemaTypeDefinition[] = [
  // localized field objects
  localeString,
  localeText,
  localeBlockContent,
  // shared objects
  seo,
  // documents
  category,
  knowledge,
];
