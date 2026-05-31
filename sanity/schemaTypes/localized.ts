import { defineType } from 'sanity';

// Languages available for localized fields (English + Arabic)
export const supportedLanguages = [
  { id: 'en', title: 'English' },
  { id: 'ar', title: 'العربية' },
] as const;

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized string',
  type: 'object',
  fields: supportedLanguages.map((lang) => ({
    name: lang.id,
    title: lang.title,
    type: 'string',
  })),
});

export const localeText = defineType({
  name: 'localeText',
  title: 'Localized text',
  type: 'object',
  fields: supportedLanguages.map((lang) => ({
    name: lang.id,
    title: lang.title,
    type: 'text',
    rows: 3,
  })),
});

export const localeBlockContent = defineType({
  name: 'localeBlockContent',
  title: 'Localized rich text',
  type: 'object',
  fields: supportedLanguages.map((lang) => ({
    name: lang.id,
    title: lang.title,
    type: 'array',
    of: [{ type: 'block' }],
  })),
});
