import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { fontVariables } from '@/lib/fonts';
import { siteConfig } from '@/lib/site';
import { getSettings } from '@/lib/settings';
import type { Locale } from '@/lib/knowledge/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MaintenancePage from '@/components/MaintenancePage';
import ScrollReveal from '@/components/motion/ScrollReveal';
import '../globals.css';

// Revalidate every 60s so CMS changes (content, settings, maintenance mode)
// appear on the live site without a redeploy.
export const revalidate = 60;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.meta' });
  const settings = await getSettings(locale as Locale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: settings.seo.title ?? t('title'),
      template: `%s — ${siteConfig.name}`,
    },
    description: settings.seo.description ?? t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ar: '/ar',
        en: '/en',
        'x-default': '/ar',
      },
    },
    openGraph: {
      type: 'website',
      locale,
      url: `${siteConfig.url}/${locale}`,
      siteName: siteConfig.name,
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const settings = await getSettings(locale as Locale);

  return (
    <html lang={locale} dir={dir} className={fontVariables}>
      <body>
        <NextIntlClientProvider>
          {settings.maintenance.enabled ? (
            <MaintenancePage
              title={settings.maintenance.title}
              line1={settings.maintenance.line1}
              line2={settings.maintenance.line2}
            />
          ) : (
            <div className="flex min-h-screen flex-col">
              <ScrollReveal />
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          )}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
