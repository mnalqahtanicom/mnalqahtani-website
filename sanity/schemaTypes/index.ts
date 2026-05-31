import type { SchemaTypeDefinition } from 'sanity';
import { localeString, localeText, localeBlockContent } from './localized';
import { category } from './category';
import { insight } from './insight';

export const schemaTypes: SchemaTypeDefinition[] = [
  // localized field objects
  localeString,
  localeText,
  localeBlockContent,
  // documents
  category,
  insight,
];
