import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import PortableTextBody from '@/components/knowledge/PortableTextBody';
import KnowledgeCard from '@/components/knowledge/KnowledgeCard';
import FormatBadge from '@/components/knowledge/FormatBadge';
import { ArticleJsonLd } from '@/components/seo/JsonLd';
import type { KnowledgeItem, Locale } from '@/lib/knowledge/types';
import { itemHref } from '@/lib/knowledge/formats';

export default async function KnowledgeDetail({
  item,
  related,
  locale,
}: {
  item: KnowledgeItem;
  related: KnowledgeItem[];
  locale: Locale;
}) {
  const t = await getTranslations({ locale, namespace: 'library' });
  const tFormats = await getTranslations({ locale, namespace: 'knowledgeFormats' });

  const hubHref = item.pillar === 'frameworks' ? '/frameworks' : '/knowledge';
  const dateLabel = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(item.publishedAt));

  return (
    <>
      <ArticleJsonLd
        locale={locale}
        path={itemHref(item)}
        title={item.title}
        description={item.excerpt}
        datePublished={item.publishedAt}
        image={item.coverImageUrl}
      />

      <article>
        <header className="motif bg-navy py-14 text-ivory sm:py-20">
          <Container narrow>
            <Link
              href={hubHref}
              className="text-sm font-medium text-gold transition-colors hover:text-gold-soft"
            >
              <span className="rtl:hidden">←</span>
              <span className="hidden rtl:inline">→</span> {t('back')}
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <FormatBadge format={item.format} />
              {item.category ? (
                <span className="text-sm text-ivory/60">· {item.category.title}</span>
              ) : null}
            </div>
            <h1 className="mt-3 text-[clamp(1.875rem,4vw,3rem)] text-white">
              {item.title}
            </h1>
            <p className="mt-4 text-sm text-ivory/60">{dateLabel}</p>
          </Container>
        </header>

        {item.coverImageUrl ? (
          <Container narrow className="-mt-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line shadow-card">
              <Image
                src={item.coverImageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 90vw, 760px"
                className="object-cover"
                priority
              />
            </div>
          </Container>
        ) : null}

        <Container narrow className="py-14 sm:py-20">
          <PortableTextBody value={item.body} />

          {item.fileUrl ? (
            <div className="mt-10 rounded-2xl border border-gold/40 bg-gold/5 p-6">
              <p className="mb-3 text-sm font-semibold text-navy">
                {tFormats(item.format)}
              </p>
              <a
                href={item.fileUrl}
                download={item.fileName ?? true}
                className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3.5 text-sm font-semibold text-navy transition-all hover:-translate-y-0.5 hover:bg-gold-soft"
              >
                <span aria-hidden>↓</span> {t('download')}
                {item.fileName ? (
                  <span className="font-normal text-navy/70">
                    ({item.fileName})
                  </span>
                ) : null}
              </a>
            </div>
          ) : null}

          {item.tags.length ? (
            <div className="mt-12 flex flex-wrap items-center gap-2.5 border-t border-line pt-8">
              <span className="text-sm font-semibold text-navy">
                {t('tagsLabel')}:
              </span>
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line bg-white px-3 py-1 text-sm text-slate"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </Container>

        {related.length ? (
          <section className="border-t border-line bg-white py-14 sm:py-20">
            <Container>
              <h2 className="mb-8 text-2xl text-navy">{t('relatedTitle')}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <KnowledgeCard key={r.slug} item={r} />
                ))}
              </div>
            </Container>
          </section>
        ) : null}
      </article>
    </>
  );
}
