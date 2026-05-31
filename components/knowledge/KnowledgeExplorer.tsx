'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Category, KnowledgeItem } from '@/lib/knowledge/types';
import { ALL_FORMATS } from '@/lib/knowledge/formats';
import KnowledgeCard from './KnowledgeCard';
import { cn } from '@/lib/utils';

export default function KnowledgeExplorer({
  items,
  categories,
  labels,
}: {
  items: KnowledgeItem[];
  categories: Category[];
  labels: {
    searchPlaceholder: string;
    allFormats: string;
    allCategories: string;
    noResults: string;
  };
}) {
  const tFormats = useTranslations('knowledgeFormats');
  const [query, setQuery] = useState('');
  const [activeFormat, setActiveFormat] = useState<string>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const availableFormats = useMemo(() => {
    const present = new Set(items.map((i) => i.format));
    return ALL_FORMATS.filter((f) => present.has(f));
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      if (activeFormat !== 'all' && i.format !== activeFormat) return false;
      if (activeCategory !== 'all' && i.category?.slug !== activeCategory)
        return false;
      if (!q) return true;
      const haystack = [
        i.title,
        i.excerpt,
        i.category?.title ?? '',
        tFormats(i.format),
        ...i.tags,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [items, query, activeFormat, activeCategory, tFormats]);

  const pill = (active: boolean) =>
    cn(
      'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
      active
        ? 'border-gold bg-gold text-navy'
        : 'border-line bg-white text-slate hover:border-gold hover:text-gold',
    );

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.searchPlaceholder}
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-muted focus:border-gold"
          />
          {categories.length ? (
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="rounded-xl border border-line bg-white px-4 py-3 text-base text-ink outline-none focus:border-gold sm:w-64"
            >
              <option value="all">{labels.allCategories}</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </select>
          ) : null}
        </div>

        {availableFormats.length > 1 ? (
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              className={pill(activeFormat === 'all')}
              onClick={() => setActiveFormat('all')}
            >
              {labels.allFormats}
            </button>
            {availableFormats.map((f) => (
              <button
                key={f}
                type="button"
                className={pill(activeFormat === f)}
                onClick={() => setActiveFormat(f)}
              >
                {tFormats(f)}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {filtered.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <KnowledgeCard key={item.slug} item={item} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-muted">{labels.noResults}</p>
      )}
    </div>
  );
}
