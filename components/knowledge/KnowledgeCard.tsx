import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { KnowledgeItem } from '@/lib/knowledge/types';
import { itemHref } from '@/lib/knowledge/formats';
import FormatBadge from './FormatBadge';

export default function KnowledgeCard({ item }: { item: KnowledgeItem }) {
  return (
    <Link
      href={itemHref(item)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-card"
    >
      <div className="relative h-[150px] overflow-hidden bg-gradient-to-br from-[#1a3454] to-navy">
        {item.coverImageUrl ? (
          <Image
            src={item.coverImageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 90vw, 360px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 opacity-60 motif" aria-hidden />
        )}
        {item.fileUrl ? (
          <span className="absolute bottom-3 end-3 rounded-full bg-gold/90 px-2.5 py-1 text-[11px] font-semibold text-navy">
            ↓
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2">
          <FormatBadge format={item.format} />
          {item.category ? (
            <span className="text-xs text-muted">· {item.category.title}</span>
          ) : null}
        </div>
        <h3 className="my-2.5 text-lg leading-snug text-navy">{item.title}</h3>
        <p className="text-sm text-muted">{item.excerpt}</p>
      </div>
    </Link>
  );
}
