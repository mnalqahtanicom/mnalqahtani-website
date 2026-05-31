import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';
import KnowledgeExplorer from '@/components/knowledge/KnowledgeExplorer';
import KnowledgeCard from '@/components/knowledge/KnowledgeCard';
import {
  getByPillar,
  getCategories,
  getFeatured,
  type Locale,
  type Pillar,
} from '@/lib/knowledge';

export default async function PillarHub({
  locale,
  pillar,
  namespace,
}: {
  locale: Locale;
  pillar: Pillar;
  namespace: 'knowledgePage' | 'frameworksPage';
}) {
  const t = await getTranslations({ locale, namespace });
  const tLib = await getTranslations({ locale, namespace: 'library' });

  const [items, allCategories, featured] = await Promise.all([
    getByPillar(locale, pillar),
    getCategories(locale),
    getFeatured(locale, pillar, 2),
  ]);

  const categories = allCategories.filter((c) =>
    items.some((i) => i.category?.slug === c.slug),
  );

  return (
    <>
      <section className="motif bg-navy py-16 text-ivory sm:py-20">
        <Container>
          <span className="enter text-sm font-semibold uppercase tracking-[0.2em] text-gold rtl:tracking-normal rtl:normal-case">
            {t('title')}
          </span>
          <h1 className="enter d1 mt-3 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] text-white">
            {t('subtitle')}
          </h1>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          {featured.length ? (
            <div className="mb-14">
              <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-gold rtl:tracking-normal rtl:normal-case">
                {tLib('featured')}
              </h2>
              <div className="grid gap-6 lg:grid-cols-2">
                {featured.map((item) => (
                  <KnowledgeCard key={item.slug} item={item} />
                ))}
              </div>
            </div>
          ) : null}

          <KnowledgeExplorer
            items={items}
            categories={categories}
            labels={{
              searchPlaceholder: tLib('searchPlaceholder'),
              allFormats: tLib('allFormats'),
              allCategories: tLib('allCategories'),
              noResults: tLib('noResults'),
            }}
          />
        </Container>
      </section>
    </>
  );
}
