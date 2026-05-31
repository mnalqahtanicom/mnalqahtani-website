import { defineField, defineType } from 'sanity';

export const leadershipPerspective = defineType({
  name: 'leadershipPerspective',
  title: 'Leadership Perspective',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'localeString',
    }),
    defineField({
      name: 'organization',
      title: 'Organization',
      type: 'localeString',
    }),
    defineField({
      name: 'photo',
      title: 'Executive photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial',
      type: 'localeText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on homepage',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    { title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'organization.en', media: 'photo' },
  },
});
