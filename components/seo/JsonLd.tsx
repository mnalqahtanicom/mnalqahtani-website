import { siteConfig } from '@/lib/site';

export function PersonJsonLd({ locale }: { locale: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mohammed Nasser Al-Qahtani',
    jobTitle: 'Executive Strategy & Transformation Advisor',
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
    sameAs: [siteConfig.linkedin],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
