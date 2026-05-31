import { getLocale, getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import PerspectiveCard from '@/components/perspectives/PerspectiveCard';
import { getSettings } from '@/lib/settings';
import { getFeaturedPerspectives } from '@/lib/perspectives';
import type { Locale } from '@/lib/knowledge/types';

export default async function HomePerspectives() {
  const locale = (await getLocale()) as Locale;
  const settings = await getSettings(locale);
  if (!settings.showPerspectivesOnHome) return null;

  const perspectives = (await getFeaturedPerspectives(locale)).slice(0, 3);
  if (!perspectives.length) return null;

  const t = await getTranslations('home.perspectives');

  return (
    <section className="py-16 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading tag={t('tag')} title={t('title')} className="mb-14" />
        <div className="grid gap-6 lg:grid-cols-3">
          {perspectives.map((p) => (
            <PerspectiveCard key={p.id} item={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
