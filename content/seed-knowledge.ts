import type { KnowledgeFormat } from '@/lib/knowledge/types';

/**
 * In-repo seed content. Powers the Knowledge Hub and Frameworks & Tools out of
 * the box and serves as launch content. When Sanity is configured, live CMS
 * content takes over automatically (see lib/knowledge/index.ts).
 */

interface SeedItem {
  slug: string;
  format: KnowledgeFormat;
  publishedAt: string;
  featured: boolean;
  tags: string[];
  category: { slug: string; title: { ar: string; en: string } };
  title: { ar: string; en: string };
  excerpt: { ar: string; en: string };
  body: { ar: string[]; en: string[] };
  file?: { url: string; name: string } | null;
}

export const seedCategories = [
  { slug: 'strategy-execution', title: { ar: 'تنفيذ الاستراتيجية', en: 'Strategy Execution' } },
  { slug: 'transformation', title: { ar: 'التحول المؤسسي', en: 'Transformation' } },
  { slug: 'change-management', title: { ar: 'إدارة التغيير', en: 'Change Management' } },
  { slug: 'performance', title: { ar: 'الأداء', en: 'Performance' } },
  { slug: 'governance', title: { ar: 'الحوكمة', en: 'Governance' } },
  { slug: 'leadership', title: { ar: 'القيادة', en: 'Leadership' } },
];

const cat = (slug: string) =>
  seedCategories.find((c) => c.slug === slug) ?? seedCategories[0];

export const seedKnowledge: SeedItem[] = [
  // --- Knowledge Hub ---
  {
    slug: 'why-transformations-fail-in-execution',
    format: 'article',
    publishedAt: '2026-05-12',
    featured: true,
    tags: ['transformation', 'execution', 'PMO'],
    category: cat('strategy-execution'),
    title: {
      en: 'Why most transformations fail in the execution layer',
      ar: 'لماذا تفشل معظم التحولات في مرحلة التنفيذ',
    },
    excerpt: {
      en: "In my experience the gap isn't strategy — it's the bridge to delivery.",
      ar: 'في خبرتي، الفجوة ليست في الاستراتيجية، بل في جسر التنفيذ.',
    },
    body: {
      en: [
        'In the work I have done, organizations rarely fail because their strategy is wrong. They fail because the distance between the boardroom and the front line is never closed.',
        'Execution is not a phase that comes after strategy — it is the strategy in practice. Treating delivery, governance, and change as one connected system is what separates plans that move from plans that stall.',
      ],
      ar: [
        'في العمل الذي قمت به، نادرًا ما تفشل المؤسسات لأن استراتيجيتها خاطئة، بل تفشل لأن المسافة بين قاعة المجلس وخط المواجهة لا تُردم.',
        'التنفيذ ليس مرحلة تأتي بعد الاستراتيجية، بل هو الاستراتيجية في الممارسة. والتعامل مع التنفيذ والحوكمة والتغيير كمنظومة واحدة هو ما يفصل الخطط التي تتحرّك عن الخطط التي تتوقّف.',
      ],
    },
  },
  {
    slug: 'a-lesson-on-stakeholder-alignment',
    format: 'lesson-learned',
    publishedAt: '2026-05-02',
    featured: false,
    tags: ['stakeholders', 'alignment', 'change'],
    category: cat('change-management'),
    title: {
      en: 'A lesson on stakeholder alignment I learned the hard way',
      ar: 'درس في مواءمة أصحاب المصلحة تعلّمته بالطريقة الصعبة',
    },
    excerpt: {
      en: 'Agreement in the room is not alignment. Test it before you move.',
      ar: 'الموافقة في الاجتماع ليست مواءمة. اختبرها قبل أن تتحرّك.',
    },
    body: {
      en: [
        'Early in a large change effort I mistook polite agreement in a meeting for genuine alignment. Weeks later the same stakeholders quietly pulled in different directions.',
        'The lesson: alignment is something you verify, not assume. A short follow-up — one question, one conversation, in writing — surfaces the disagreement while it is still cheap to fix.',
      ],
      ar: [
        'في بداية جهد تغيير كبير، ظننت أن الموافقة المهذّبة في اجتماع تعني مواءمة حقيقية. وبعد أسابيع، اتجه أصحاب المصلحة أنفسهم بهدوء في اتجاهات مختلفة.',
        'الدرس: المواءمة شيء تتحقّق منه لا تفترضه. متابعة قصيرة — سؤال واحد، حوار واحد، مكتوب — تُظهر الخلاف بينما لا يزال إصلاحه رخيصًا.',
      ],
    },
  },
  {
    slug: 'governance-that-accelerates',
    format: 'insight',
    publishedAt: '2026-04-28',
    featured: true,
    tags: ['governance', 'boards', 'decision-making'],
    category: cat('governance'),
    title: {
      en: 'Governance that accelerates, not slows',
      ar: 'حوكمة تُسرّع ولا تُبطئ',
    },
    excerpt: {
      en: 'Good oversight removes ambiguity instead of adding gates.',
      ar: 'الرقابة الجيدة تزيل الغموض بدل أن تضيف البوابات.',
    },
    body: {
      en: [
        'Governance is often confused with more committees and longer approvals. In practice that design slows the very decisions it was meant to protect.',
        'The governance I have seen work clarifies who decides what, by when, and on what evidence — then gets out of the way.',
      ],
      ar: [
        'كثيرًا ما تُختزل الحوكمة في مزيد من اللجان وموافقات أطول، وهو تصميم يُبطئ القرارات ذاتها التي وُجد لحمايتها.',
        'الحوكمة التي رأيتها تنجح توضّح من يقرّر ماذا، ومتى، وبأي دليل — ثم تُفسح الطريق.',
      ],
    },
  },
  {
    slug: 'good-strategy-bad-strategy-summary',
    format: 'book-summary',
    publishedAt: '2026-04-15',
    featured: false,
    tags: ['strategy', 'reading'],
    category: cat('strategy-execution'),
    title: {
      en: 'Book summary: the kernel of good strategy',
      ar: 'ملخص كتاب: نواة الاستراتيجية الجيدة',
    },
    excerpt: {
      en: 'Diagnosis, a guiding policy, and coherent action — notes I return to.',
      ar: 'تشخيص، وسياسة موجِّهة، وفعل متّسق — ملاحظات أعود إليها.',
    },
    body: {
      en: [
        'A good strategy has a simple core: an honest diagnosis of the challenge, a guiding policy to address it, and a coherent set of actions to carry it out.',
        'Most "strategies" I review are really lists of goals. The discipline is to name the real obstacle first — everything else follows from that.',
      ],
      ar: [
        'للاستراتيجية الجيدة نواة بسيطة: تشخيص صادق للتحدّي، وسياسة موجِّهة لمعالجته، ومجموعة أفعال متّسقة لتنفيذه.',
        'معظم ما أراجعه من «استراتيجيات» هو في الحقيقة قوائم أهداف. والانضباط هو تسمية العائق الحقيقي أولًا — وكل شيء بعده يتبع ذلك.',
      ],
    },
  },
  {
    slug: 'measuring-what-matters',
    format: 'best-practice',
    publishedAt: '2026-03-22',
    featured: false,
    tags: ['performance', 'KPIs', 'measurement'],
    category: cat('performance'),
    title: {
      en: 'Measuring what matters: a practice for KPIs',
      ar: 'قياس ما يهم: ممارسة لمؤشرات الأداء',
    },
    excerpt: {
      en: 'A metric should trigger a decision, not decorate a report.',
      ar: 'المؤشر يجب أن يُطلق قرارًا لا أن يزيّن تقريرًا.',
    },
    body: {
      en: [
        'A dashboard full of green is not the goal. The goal is a small set of measures that genuinely change what the organization decides and does.',
        'The practice I recommend: for every KPI, name the decision it informs. If there is no decision, drop the metric.',
      ],
      ar: [
        'لوحة مؤشرات يملؤها الأخضر ليست هي الهدف؛ الهدف مجموعة صغيرة من المقاييس تغيّر فعلًا ما تقرّره المؤسسة وما تفعله.',
        'الممارسة التي أوصي بها: لكل مؤشر، سمِّ القرار الذي يخدمه. وإن لم يوجد قرار، فاحذف المؤشر.',
      ],
    },
  },

  // --- Frameworks & Tools ---
  {
    slug: 'strategy-to-results-framework',
    format: 'framework',
    publishedAt: '2026-05-10',
    featured: true,
    tags: ['framework', 'execution'],
    category: cat('strategy-execution'),
    title: {
      en: 'Strategy to Results™ — the framework on one page',
      ar: 'الاستراتيجية إلى النتائج™ — الإطار في صفحة واحدة',
    },
    excerpt: {
      en: 'Six connected stages from strategy through to results.',
      ar: 'ست مراحل متصلة من الاستراتيجية إلى النتائج.',
    },
    body: {
      en: [
        'A one-page view of the six stages — Strategy, Execution, Change, Adoption, Performance, Results — and the questions to ask at each.',
      ],
      ar: [
        'عرض في صفحة واحدة للمراحل الست — الاستراتيجية، التنفيذ، التغيير، التبنّي، الأداء، النتائج — والأسئلة التي تُطرح في كل مرحلة.',
      ],
    },
    file: { url: '/files/strategy-to-results-framework.md', name: 'strategy-to-results-framework.md' },
  },
  {
    slug: 'strategy-on-a-page-template',
    format: 'template',
    publishedAt: '2026-04-20',
    featured: false,
    tags: ['template', 'planning'],
    category: cat('strategy-execution'),
    title: {
      en: 'Strategy on a page — template',
      ar: 'الاستراتيجية في صفحة — قالب',
    },
    excerpt: {
      en: 'A simple template to put a whole strategy on a single page.',
      ar: 'قالب بسيط لوضع استراتيجية كاملة في صفحة واحدة.',
    },
    body: {
      en: ['Fill-in-the-blanks: diagnosis, guiding policy, priorities, measures, and owners.'],
      ar: ['املأ الفراغات: التشخيص، السياسة الموجِّهة، الأولويات، المقاييس، والمسؤولون.'],
    },
    file: { url: '/files/strategy-on-a-page-template.md', name: 'strategy-on-a-page-template.md' },
  },
  {
    slug: 'change-readiness-checklist',
    format: 'checklist',
    publishedAt: '2026-04-05',
    featured: false,
    tags: ['change', 'checklist'],
    category: cat('change-management'),
    title: {
      en: 'Change readiness checklist',
      ar: 'قائمة تحقّق جاهزية التغيير',
    },
    excerpt: {
      en: 'A short checklist to test readiness before you launch a change.',
      ar: 'قائمة قصيرة لاختبار الجاهزية قبل إطلاق التغيير.',
    },
    body: {
      en: ['Sponsorship, case for change, impact, capacity, and reinforcement — checked before you begin.'],
      ar: ['الرعاية، مبرّر التغيير، الأثر، القدرة، والتعزيز — تُفحص قبل أن تبدأ.'],
    },
    file: { url: '/files/change-readiness-checklist.md', name: 'change-readiness-checklist.md' },
  },
];
