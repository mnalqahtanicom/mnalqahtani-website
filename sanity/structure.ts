import type { StructureResolver } from 'sanity/structure';

// Custom Studio structure: Site Settings as a single (singleton) document,
// then the content types.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings'),
        ),
      S.divider(),
      S.documentTypeListItem('knowledge').title('Knowledge / Resources'),
      S.documentTypeListItem('transformationStory').title('Transformation Stories'),
      S.documentTypeListItem('leadershipPerspective').title('Leadership Perspectives'),
      S.documentTypeListItem('category').title('Categories'),
    ]);
