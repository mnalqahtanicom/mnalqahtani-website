/**
 * In-repo seed articles. These power the Insights section out of the box
 * and serve as launch content. When Sanity is configured, live CMS content
 * takes over automatically (see lib/insights/index.ts).
 */

interface SeedInsight {
  slug: string;
  publishedAt: string;
  featured: boolean;
  tags: string[];
  category: { slug: string; title: { ar: string; en: string } };
  title: { ar: string; en: string };
  excerpt: { ar: string; en: string };
  body: { ar: string[]; en: string[] };
}

export const seedCategories = [
  { slug: 'strategy-execution', title: { ar: 'تنفيذ الاستراتيجية', en: 'Strategy Execution' } },
  { slug: 'governance', title: { ar: 'الحوكمة', en: 'Governance' } },
  { slug: 'leadership', title: { ar: 'القيادة', en: 'Leadership' } },
  { slug: 'performance', title: { ar: 'الأداء', en: 'Performance' } },
];

export const seedInsights: SeedInsight[] = [
  {
    slug: 'why-transformations-fail-in-execution',
    publishedAt: '2026-05-12',
    featured: true,
    tags: ['transformation', 'execution', 'PMO'],
    category: seedCategories[0],
    title: {
      en: 'Why 70% of transformations fail in the execution layer',
      ar: 'لماذا تفشل 70٪ من التحولات في مرحلة التنفيذ',
    },
    excerpt: {
      en: "The gap isn't strategy — it's the bridge to delivery.",
      ar: 'الفجوة ليست في الاستراتيجية، بل في جسر التنفيذ.',
    },
    body: {
      en: [
        'Most organizations do not fail because their strategy is wrong. They fail because the distance between the boardroom slide and the front line is never bridged.',
        'Execution is not an afterthought to strategy — it is the strategy. The Strategy to Results™ Framework treats delivery, governance, and change as one connected system rather than separate hand-offs.',
        'When leaders invest as much rigor in the execution layer as they do in the planning layer, transformation stops being an event and becomes a capability.',
      ],
      ar: [
        'لا تفشل معظم المؤسسات لأن استراتيجيتها خاطئة، بل لأن المسافة بين شريحة العرض في قاعة المجلس وخط المواجهة الأول لا تُردم أبدًا.',
        'التنفيذ ليس أمرًا لاحقًا للاستراتيجية، بل هو الاستراتيجية ذاتها. ويتعامل إطار «الاستراتيجية إلى النتائج™» مع التنفيذ والحوكمة والتغيير كمنظومة واحدة مترابطة لا كمراحل منفصلة.',
        'وحين يستثمر القادة في مرحلة التنفيذ بالدقّة نفسها التي يمنحونها لمرحلة التخطيط، يتحوّل التحوّل من حدثٍ عابر إلى قدرة مؤسسية راسخة.',
      ],
    },
  },
  {
    slug: 'governance-that-accelerates',
    publishedAt: '2026-04-28',
    featured: true,
    tags: ['governance', 'boards', 'decision-making'],
    category: seedCategories[1],
    title: {
      en: 'Governance that accelerates, not slows',
      ar: 'حوكمة تُسرّع ولا تُبطئ',
    },
    excerpt: {
      en: 'Designing oversight that enables bold decisions.',
      ar: 'تصميم رقابة تمكّن القرارات الجريئة.',
    },
    body: {
      en: [
        'Good governance is too often confused with more committees and longer approval chains. In practice, that design slows the very decisions it was meant to protect.',
        'The best governance clarifies who decides what, by when, and on what evidence — then gets out of the way. It accelerates bold action by removing ambiguity, not by adding gates.',
      ],
      ar: [
        'كثيرًا ما تُختزل الحوكمة الجيدة في مزيدٍ من اللجان وسلاسل أطول من الموافقات، وهو تصميمٌ يُبطئ في الواقع القرارات ذاتها التي وُجد لحمايتها.',
        'أمّا أفضل أنظمة الحوكمة فتوضّح من يقرّر ماذا، ومتى، وبناءً على أي دليل — ثمّ تُفسح الطريق. إنها تُسرّع الفعل الجريء بإزالة الغموض، لا بإضافة البوابات.',
      ],
    },
  },
  {
    slug: 'leaders-role-in-making-change-stick',
    publishedAt: '2026-04-10',
    featured: false,
    tags: ['leadership', 'change', 'culture'],
    category: seedCategories[2],
    title: {
      en: "The leader's role in making change stick",
      ar: 'دور القائد في ترسيخ التغيير',
    },
    excerpt: {
      en: 'Culture is the operating system of execution.',
      ar: 'الثقافة هي نظام تشغيل التنفيذ.',
    },
    body: {
      en: [
        'Change does not survive on process alone. It survives because leaders model it, repeat it, and protect it until it becomes the way work is done.',
        'Culture is the operating system on which every strategy runs. Leaders who treat it as a deliverable — not a mood — are the ones whose results endure.',
      ],
      ar: [
        'لا يدوم التغيير بالعمليات وحدها، بل يدوم لأن القادة يجسّدونه ويكرّرونه ويحمونه حتى يصبح هو الطريقة التي يُنجَز بها العمل.',
        'الثقافة هي نظام التشغيل الذي تعمل عليه كل استراتيجية، والقادة الذين يتعاملون معها كمُخرَجٍ لا كمزاجٍ عابر هم من تدوم نتائجهم.',
      ],
    },
  },
  {
    slug: 'measuring-what-matters',
    publishedAt: '2026-03-22',
    featured: false,
    tags: ['performance', 'KPIs', 'measurement'],
    category: seedCategories[3],
    title: {
      en: 'Measuring what matters: performance beyond the dashboard',
      ar: 'قياس ما يهم: أداءٌ يتجاوز لوحة المؤشرات',
    },
    excerpt: {
      en: 'Metrics should drive decisions, not decorate reports.',
      ar: 'المؤشرات يجب أن تقود القرارات لا أن تزيّن التقارير.',
    },
    body: {
      en: [
        'A dashboard full of green is not the goal. The goal is a small set of measures that genuinely change what the organization decides and does.',
        'Performance management works when measurement is tied to learning loops — when a number triggers a conversation, and that conversation triggers an action.',
      ],
      ar: [
        'لوحة مؤشرات يملؤها اللون الأخضر ليست هي الهدف؛ الهدف مجموعة صغيرة من المقاييس تغيّر فعلًا ما تقرّره المؤسسة وما تفعله.',
        'تنجح إدارة الأداء حين يرتبط القياس بحلقات التعلّم — حين يُطلق الرقمُ حوارًا، ويُطلق الحوارُ إجراءً.',
      ],
    },
  },
];
