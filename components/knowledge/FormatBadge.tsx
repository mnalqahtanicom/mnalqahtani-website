import { useTranslations } from 'next-intl';
import type { KnowledgeFormat } from '@/lib/knowledge/types';

export default function FormatBadge({ format }: { format: KnowledgeFormat }) {
  const t = useTranslations('knowledgeFormats');
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.08em] text-gold rtl:tracking-normal rtl:normal-case">
      {t(format)}
    </span>
  );
}
