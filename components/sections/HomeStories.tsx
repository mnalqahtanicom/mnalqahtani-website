import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import StoryCard from '@/components/stories/StoryCard';
import { getSettings } from '@/lib/settings';
import { getFeaturedStories } from '@/lib/stories';
import type { Locale } from '@/lib/knowledge/types';

export default async function HomeStories() {
  const locale = (await getLocale()) as Locale;
  const settings = await getSettings(locale);
  if (!settings.showStoriesOnHome) return null;

  const stories = await getFeaturedStories(locale, 2);
  if (!stories.length) return null;

  const t = await getTranslations('home.stories');

  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28">
      <Container>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading tag={t('tag')} title={t('title')} />
          <Link
            href="/stories"
            className="text-sm font-semibold text-slate transition-colors hover:text-gold"
          >
            {t('viewAll')}{' '}
            <span className="rtl:-scale-x-100 inline-block" aria-hidden>
              →
            </span>
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {stories.map((s) => (
            <StoryCard key={s.slug} item={s} />
          ))}
        </div>
      </Container>
    </section>
  );
}
