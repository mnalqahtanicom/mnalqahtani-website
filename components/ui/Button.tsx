import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type Variant = 'gold' | 'ghost' | 'navy';

const variants: Record<Variant, string> = {
  gold: 'bg-gold text-navy hover:bg-gold-soft hover:-translate-y-0.5',
  ghost:
    'border border-ivory/30 text-ivory hover:border-gold hover:text-gold',
  navy: 'bg-navy text-white hover:bg-slate',
};

export default function Button({
  href,
  children,
  variant = 'gold',
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold transition-all',
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
