import { cn } from '@/lib/utils';

export default function SectionHeading({
  tag,
  title,
  subtitle,
  dark = false,
  className,
}: {
  tag: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('max-w-2xl', className)}>
      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold ltr:tracking-[0.2em] rtl:tracking-normal rtl:normal-case">
        {tag}
      </span>
      <h2
        className={cn(
          'mt-3.5 text-3xl sm:text-4xl',
          dark ? 'text-white' : 'text-navy',
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            'mt-4 text-lg',
            dark ? 'text-ivory/70' : 'text-slate',
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
