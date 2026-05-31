import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Container from '@/components/ui/Container';
import ContactForm from '@/components/contact/ContactForm';
import { routing } from '@/i18n/routing';
import { activeSocialLinks, siteConfig } from '@/lib/site';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        ar: '/ar/contact',
        en: '/en/contact',
        'x-default': '/ar/contact',
      },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <>
      <section className="motif bg-navy py-16 text-ivory sm:py-20">
        <Container>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold rtl:tracking-normal rtl:normal-case">
            {t('tag')}
          </span>
          <h1 className="mt-3 text-[clamp(2rem,4.5vw,3.25rem)] text-white">
            {t('title')}
          </h1>
          <p className="mt-4 max-w-xl text-lg font-light text-ivory/80">
            {t('subtitle')}
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <ContactForm
              labels={{
                nameLabel: t('nameLabel'),
                emailLabel: t('emailLabel'),
                messageLabel: t('messageLabel'),
                send: t('send'),
              }}
            />
            <aside className="rounded-2xl border border-line bg-white p-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-gold rtl:tracking-normal rtl:normal-case">
                {t('emailHeading')}
              </h2>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-2 block text-lg text-navy transition-colors hover:text-gold"
              >
                {siteConfig.email}
              </a>
              {activeSocialLinks.length ? (
                <div className="mt-6 flex flex-wrap gap-4">
                  {activeSocialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-slate transition-colors hover:text-gold"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
