import { defineField, defineType } from 'sanity';

// Unified content type covering the Knowledge Hub and Frameworks & Tools.
const FORMATS = [
  // Knowledge Hub
  { title: 'Article', value: 'article' },
  { title: 'Lesson Learned', value: 'lesson-learned' },
  { title: 'Professional Insight', value: 'insight' },
  { title: 'Book Summary', value: 'book-summary' },
  { title: 'Course Summary', value: 'course-summary' },
  { title: 'Best Practice', value: 'best-practice' },
  // Frameworks & Tools
  { title: 'Framework', value: 'framework' },
  { title: 'Template', value: 'template' },
  { title: 'Tool', value: 'tool' },
  { title: 'Checklist', value: 'checklist' },
  { title: 'Model', value: 'model' },
  { title: 'Downloadable Resource', value: 'resource' },
];

export const knowledge = defineType({
  name: 'knowledge',
  title: 'Knowledge / Resource',
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
      name: 'format',
      title: 'Type',
      type: 'string',
      group: 'content',
      description:
        'Knowledge Hub: Article, Lesson Learned, Insight, Book/Course Summary, Best Practice. Frameworks & Tools: Framework, Template, Tool, Checklist, Model, Resource.',
      options: { list: FORMATS },
      initialValue: 'article',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      description: 'Used in the URL. Generated from the English title.',
      options: { source: 'title.en', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'localeText',
      group: 'content',
      description: 'Short summary shown on cards and in search.',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      group: 'content',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
    }),
    defineField({
      name: 'file',
      title: 'Downloadable file',
      type: 'file',
      group: 'content',
      description: 'Optional. Attach a template, framework, checklist, or tool to download.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'localeBlockContent',
      group: 'content',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'meta',
      description: 'Featured items appear on the homepage.',
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
  preview: {
    select: { title: 'title.en', subtitle: 'format', media: 'coverImage' },
  },
});
