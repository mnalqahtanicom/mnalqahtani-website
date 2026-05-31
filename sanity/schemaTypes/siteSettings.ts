import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'homepage', title: 'Homepage', default: true },
    { name: 'featured', title: 'Featured' },
    { name: 'maintenance', title: 'Maintenance Mode' },
    { name: 'contact', title: 'Contact & Social' },
    { name: 'seo', title: 'SEO Defaults' },
    { name: 'sections', title: 'Sections' },
  ],
  fields: [
    // --- Homepage ---
    defineField({
      name: 'portrait',
      title: 'Professional portrait',
      type: 'image',
      group: 'homepage',
      options: { hotspot: true },
      description: 'Used as the main photo on the homepage and About page.',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero — eyebrow (optional override)',
      type: 'localeString',
      group: 'homepage',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero — headline (optional override)',
      type: 'localeString',
      group: 'homepage',
    }),
    defineField({
      name: 'heroSubline',
      title: 'Hero — subline (optional override)',
      type: 'localeText',
      group: 'homepage',
    }),

    // --- Featured ---
    defineField({
      name: 'featuredKnowledge',
      title: 'Featured Knowledge (homepage)',
      type: 'array',
      group: 'featured',
      description: 'Leave empty to feature the latest automatically.',
      of: [{ type: 'reference', to: [{ type: 'knowledge' }] }],
    }),
    defineField({
      name: 'featuredFrameworks',
      title: 'Featured Frameworks & Tools (homepage)',
      type: 'array',
      group: 'featured',
      description: 'Leave empty to feature the latest automatically.',
      of: [{ type: 'reference', to: [{ type: 'knowledge' }] }],
    }),

    // --- Maintenance ---
    defineField({
      name: 'maintenanceMode',
      title: 'Maintenance mode',
      type: 'boolean',
      group: 'maintenance',
      initialValue: false,
      description: 'When on, the whole site shows a branded maintenance page.',
    }),
    defineField({
      name: 'maintenanceTitle',
      title: 'Maintenance — title',
      type: 'localeString',
      group: 'maintenance',
    }),
    defineField({
      name: 'maintenanceLine1',
      title: 'Maintenance — line 1',
      type: 'localeString',
      group: 'maintenance',
    }),
    defineField({
      name: 'maintenanceLine2',
      title: 'Maintenance — line 2',
      type: 'localeString',
      group: 'maintenance',
    }),

    // --- Contact & Social ---
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'linkedinEnabled',
      title: 'Show LinkedIn',
      type: 'boolean',
      group: 'contact',
      initialValue: false,
    }),
    defineField({
      name: 'xUrl',
      title: 'X (Twitter) URL',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'xEnabled',
      title: 'Show X (Twitter)',
      type: 'boolean',
      group: 'contact',
      initialValue: false,
    }),

    // --- SEO Defaults ---
    defineField({
      name: 'seoTitle',
      title: 'Default SEO title',
      type: 'localeString',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Default meta description',
      type: 'localeText',
      group: 'seo',
    }),

    // --- Sections ---
    defineField({
      name: 'showStoriesOnHome',
      title: 'Show Transformation Stories on homepage',
      type: 'boolean',
      group: 'sections',
      initialValue: true,
    }),
    defineField({
      name: 'showPerspectivesOnHome',
      title: 'Show Leadership Perspectives on homepage',
      type: 'boolean',
      group: 'sections',
      initialValue: true,
    }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
});
