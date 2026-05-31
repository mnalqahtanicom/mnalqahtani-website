import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { Story } from '@/lib/stories';

export default function StoryCard({ item }: { item: Story }) {
  return (
    <Link
      href={`/stories/${item.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-card"
    >
      <div className="relative h-[160px] overflow-hidden bg-gradient-to-br from-[#1a3454] to-navy">
        {item.coverImageUrl ? (
          <Image
            src={item.coverImageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 90vw, 540px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 opacity-60 motif" aria-hidden />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {item.sector ? (
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-gold rtl:tracking-normal rtl:normal-case">
            {item.sector}
          </span>
        ) : null}
        <h3 className="my-2.5 text-lg leading-snug text-navy">{item.title}</h3>
        {item.summary ? (
          <p className="text-sm text-muted">{item.summary}</p>
        ) : null}
      </div>
    </Link>
  );
}
