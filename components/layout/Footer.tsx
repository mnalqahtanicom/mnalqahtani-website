import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import { activeSocialLinks } from '@/lib/site';

const footerLinks = [
  { key: 'knowledge', href: '/knowledge' },
  { key: 'frameworks', href: '/frameworks' },
  { key: 'framework', href: '/strategy-to-results' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] as const;

export default function Footer() {
  const t = useTranslations('nav');
  const tFooter = useTranslations('footer');
  const tSite = useTranslations('site');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#081627] pb-7 pt-14 text-ivory/70">
      <Container>
        <div className="flex flex-wrap justify-between gap-10 border-b border-ivory/10 pb-9">
          <div className="max-w-[34ch]">
            <h4 className="mb-2.5 font-serif text-xl text-white rtl:font-serif-ar">
              {tSite('name')}
            </h4>
            <p className="text-sm">{tFooter('blurb')}</p>
          </div>
          <nav className="flex flex-wrap gap-7">
            {footerLinks.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm transition-colors hover:text-gold"
              >
                {t(item.key)}
              </Link>
            ))}
            {activeSocialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors hover:text-gold"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-wrap justify-between gap-2.5 pt-5 text-[13px] text-ivory/45">
          <span>
            © {year} mnalqahtani.com — {tFooter('rights')}
          </span>
          <span>
            {tFooter('privacy')} · {tFooter('terms')}
          </span>
        </div>
      </Container>
    </footer>
  );
}
