import { defineField, defineType } from 'sanity';

export const transformationStory = defineType({
  name: 'transformationStory',
  title: 'Transformation Story',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Meta & SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title.en', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sector',
      title: 'Sector',
      type: 'localeString',
      group: 'content',
      description: 'e.g. Government, Banking, Energy (optional).',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'localeText',
      group: 'content',
    }),
    // Structure: Challenge -> Solution -> Impact -> Lessons Learned
    defineField({ name: 'challenge', title: 'Challenge', type: 'localeBlockContent', group: 'content' }),
    defineField({ name: 'solution', title: 'Solution', type: 'localeBlockContent', group: 'content' }),
    defineField({ name: 'impact', title: 'Impact', type: 'localeBlockContent', group: 'content' }),
    defineField({ name: 'lessonsLearned', title: 'Lessons Learned', type: 'localeBlockContent', group: 'content' }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'meta',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'meta' }),
  ],
  orderings: [
    {
      title: 'Published date, newest',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: { select: { title: 'title.en', subtitle: 'sector.en', media: 'coverImage' } },
});
