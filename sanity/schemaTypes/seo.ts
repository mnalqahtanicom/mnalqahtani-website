import { defineField, defineType } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'title',
      title: 'SEO title',
      type: 'localeString',
      description: 'Overrides the page title in search results (optional).',
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      type: 'localeText',
      description: 'Short summary for search engines (optional).',
    }),
  ],
});
