import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { Insight } from '@/lib/insights/types';

export default function InsightCard({ insight }: { insight: Insight }) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-card"
    >
      <div className="relative h-[160px] overflow-hidden bg-gradient-to-br from-[#1a3454] to-navy">
        {insight.coverImageUrl ? (
          <Image
            src={insight.coverImageUrl}
            alt={insight.title}
            fill
            sizes="(max-width: 768px) 90vw, 360px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 opacity-60 motif" aria-hidden />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {insight.category ? (
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-gold rtl:tracking-normal rtl:normal-case">
            {insight.category.title}
          </span>
        ) : null}
        <h3 className="my-2.5 text-lg leading-snug text-navy">
          {insight.title}
        </h3>
        <p className="text-sm text-muted">{insight.excerpt}</p>
      </div>
    </Link>
  );
}
