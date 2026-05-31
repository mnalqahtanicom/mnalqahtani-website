import { activeSocialLinks, siteConfig } from '@/lib/site';

export function PersonJsonLd({ locale }: { locale: string }) {
  const sameAs = activeSocialLinks.map((s) => s.href);
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mohammed Nasser Al-Qahtani',
    jobTitle: 'Strategy, Performance & Transformation',
    url: `${siteConfig.url}/${locale}`,
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Michigan State University',
    },
    knowsAbout: [
      'Strategy',
      'Strategy Execution',
      'Organizational Transformation',
      'Change Management',
      'Performance Management',
      'Governance',
      'Leadership',
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ArticleJsonLd({
  locale,
  slug,
  title,
  description,
  datePublished,
  image,
}: {
  locale: string;
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  image?: string | null;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    inLanguage: locale,
    image: image ? [image] : undefined,
    mainEntityOfPage: `${siteConfig.url}/${locale}/insights/${slug}`,
    author: { '@type': 'Person', name: 'Mohammed Nasser Al-Qahtani' },
    publisher: { '@type': 'Person', name: 'Mohammed Nasser Al-Qahtani' },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
