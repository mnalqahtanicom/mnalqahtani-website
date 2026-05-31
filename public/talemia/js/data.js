/* ==========================================================================
   TALEMIA · DATA (redesign prototype) — mock content
   ========================================================================== */
window.TP = {
  me: { name:'ناصر العويشق', first:'ناصر', sector:'المحتوى والمناهج', color:'#2C5F90', manager:'دينا الزهراني', role:'أخصائي أول' },

  priorities: [
    { id:'p1', ar:'التركيز على العميل' },
    { id:'p2', ar:'التحوّل لموجّه وطني للسوق' },
    { id:'p3', ar:'الاستدامة المالية والتميّز التشغيلي' },
    { id:'p4', ar:'تطوير الأعمال وضمان النمو' },
    { id:'p5', ar:'منظومة محوكَمة ومُمكِّنة' },
    { id:'p6', ar:'موظفو التعليمية هم أساس التميّز' },
  ],
  behaviors: [
    { id:'b1', ar:'الوعي', d:'نفهم الهدف قبل التنفيذ', icon:'compass' },
    { id:'b2', ar:'المرونة', d:'الإنجاز والتقدّم أهم من الكمال', icon:'growth' },
    { id:'b3', ar:'التعاون', d:'ننجح مع بعض', icon:'team' },
    { id:'b4', ar:'المسؤولية', d:'نكمل الشغل للنهاية', icon:'shield' },
    { id:'b5', ar:'الدقة', d:'نهتم لآخر التفاصيل', icon:'target' },
    { id:'b6', ar:'الالتزام', d:'نلتزم بالمواعيد والوعد', icon:'check' },
    { id:'b7', ar:'الأثر', d:'نهتم بالأثر لا بالرقم', icon:'spark' },
    { id:'b8', ar:'السرعة', d:'نتحرك بسرعة ونتعلم', icon:'play' },
    { id:'b9', ar:'التطوير', d:'نطوّر أنفسنا باستمرار', icon:'star' },
    { id:'b10', ar:'الاهتمام', d:'نهتم بتجربة المستفيد', icon:'heart' },
    { id:'b11', ar:'الحلول', d:'نبحث عن الحلول لا الأعذار', icon:'sparkle' },
    { id:'b12', ar:'التكامل', d:'نشتغل بروح الفريق الواحد', icon:'grid' },
  ],
  core: [ {ar:'اهتمام',en:'CARE'},{ar:'مرونة',en:'AGILITY'},{ar:'تعاون',en:'COLLABORATION'},{ar:'مسؤولية',en:'OWNERSHIP'} ],

  deptObjective: { ar:'رفع جودة المحتوى التعليمي المحلي', priority:'p1' },
  goals: [
    { id:'g1', title:'تطوير إطار جودة موحّد لمحتوى المرحلة الابتدائية', priorities:['p1'], behaviors:['b7','b5'],
      kpis:['نسبة الاعتماد من أول مرة','زمن دورة المراجعة'], status:'active', progress:64 },
    { id:'g2', title:'بناء مكتبة أصول رقمية قابلة لإعادة الاستخدام', priorities:['p4'], behaviors:['b9','b12'],
      kpis:['عدد الأصول المنشورة'], status:'pending', progress:20 },
    { id:'g3', title:'إطلاق مبادرة تغذية راجعة لفريق المحتوى', priorities:[], behaviors:[],
      kpis:['معدل المشاركة'], status:'flagged', progress:0 },
  ],
  recv: [
    { from:'دينا الزهراني', role:'مديرة المحتوى', behavior:'b7', msg:'أثرك في رفع جودة المراجعات واضح وملموس — هذا ما يصنع الفرق.', when:'قبل ٣ أيام' },
    { from:'بدر العتيبي', role:'العمليات التعليمية', behavior:'b3', msg:'تعاونك مع فريقنا سرّع التسليم بشكل كبير. ممتنّون لك.', when:'الأسبوع الماضي' },
  ],
  colleagues: ['نجاح العنيزي','بدر العتيبي','ريم الفضلي','عبدالرحمن القلاع','سعد الأسمري','مها السبيعي'],

  team: [
    { name:'عبدالرحمن القلاع', clarity:true, conv:true, goals:3, voice:0, eng:78 },
    { name:'نجاح العنيزي', clarity:true, conv:false, goals:2, voice:1, eng:61 },
    { name:'سعد الأسمري', clarity:false, conv:false, goals:1, voice:0, eng:48, pending:true },
    { name:'مها السبيعي', clarity:true, conv:true, goals:4, voice:0, eng:82 },
    { name:'خالد الحربي', clarity:false, conv:true, goals:2, voice:2, eng:55, pending:true },
  ],
  sectors: [
    { ar:'المحتوى والمناهج', c:'#2C5F90', eng:58, los:72 },
    { ar:'التربية الخاصة', c:'#2C5F90', eng:51, los:64 },
    { ar:'العمليات التعليمية', c:'#2C5F90', eng:55, los:70 },
    { ar:'التطوير المهني', c:'#2C5F90', eng:49, los:61 },
    { ar:'حلول رأس المال البشري', c:'#2C5F90', eng:62, los:75 },
    { ar:'الاستراتيجية وتطوير الأعمال', c:'#1B3A5C', eng:66, los:81 },
    { ar:'الموارد البشرية', c:'#E0A07E', eng:60, los:68 },
    { ar:'الحوكمة والمخاطر', c:'#1B3A5C', eng:57, los:66 },
  ],
  org: { engagement:15, enps:-19, los:71, behaviorPrev:[62,55,71,58,49,53,68,47,44,57,60,51],
    adoption:[['وعي',18],['فهم',24],['تجربة',29],['تبنّي',21],['متجذّر',8]] },

  /* ---------- Change Management operational data (HC + Change Mgmt only) ---------- */
  cm: {
    headcount: 204,
    feedbackGiven: 147, feedbackPending: 57,          // who gave feedback vs not
    managersTotal: 45, oneOnOneDone: 31, oneOnOnePending: 14,
    goalsApproved: 138, goalsAwaiting: 41, goalsFlagged: 25,
    participationRate: 72, recognitionThisMonth: 213, recognitionTrend:'+18%',
    adoptionRate: 58,
    // supportive follow-up lists (NOT punitive, NOT rankings) — by sector aggregate + sample individuals for HC follow-up
    followUp: {
      noFeedback: [   // sectors with pending feedback participation
        {sector:'التطوير المهني', pending:14, total:32},
        {sector:'التربية الخاصة', pending:12, total:28},
        {sector:'العمليات التعليمية', pending:9, total:30},
      ],
      pendingOneOnOne: [ // managers who haven't completed 1:1s (for supportive nudge)
        {name:'م. قسم الجودة', team:8, done:3},
        {name:'م. التطوير المهني', team:6, done:2},
        {name:'م. التربية الخاصة', team:7, done:4},
      ],
    },
    // pulse participation
    pulseDone: 156, pulsePending: 48,
    // recognition flow
    recSent: 213, recReceived: 198, recTrend:[120,138,164,181,199,213],
    engagementTrend:[12,12,13,14,15,15], participationTrend:[55,60,64,68,70,72],
    // sector operational rollup (participation/feedback/goals/1:1/adoption/readiness/engagement)
    sectorOps:[
      {ar:'المحتوى والمناهج', c:'#2C5F90', participation:74, feedback:78, goals:82, oneonone:80, adoption:62, readiness:70, engagement:58, recognition:52},
      {ar:'التربية الخاصة', c:'#2C5F90', participation:61, feedback:57, goals:64, oneonone:57, adoption:48, readiness:54, engagement:51, recognition:34},
      {ar:'العمليات التعليمية', c:'#2C5F90', participation:70, feedback:71, goals:70, oneonone:66, adoption:55, readiness:63, engagement:55, recognition:41},
      {ar:'التطوير المهني', c:'#2C5F90', participation:58, feedback:49, goals:61, oneonone:50, adoption:44, readiness:49, engagement:49, recognition:29},
      {ar:'حلول رأس المال البشري', c:'#2C5F90', participation:79, feedback:80, goals:75, oneonone:78, adoption:62, readiness:72, engagement:62, recognition:58},
      {ar:'الاستراتيجية وتطوير الأعمال', c:'#1B3A5C', participation:84, feedback:82, goals:81, oneonone:83, adoption:66, readiness:80, engagement:66, recognition:61},
      {ar:'الموارد البشرية', c:'#E0A07E', participation:76, feedback:74, goals:68, oneonone:72, adoption:60, readiness:68, engagement:60, recognition:44},
      {ar:'الحوكمة والمخاطر', c:'#1B3A5C', participation:69, feedback:66, goals:66, oneonone:64, adoption:57, readiness:61, engagement:57, recognition:31},
    ],
    // department rollup (sample) for heatmaps
    deptOps:[
      {ar:'تطوير المحتوى', sector:'المحتوى والمناهج', participation:80, feedback:82, goals:85, oneonone:84, adoption:66},
      {ar:'الجودة', sector:'المحتوى والمناهج', participation:71, feedback:73, goals:78, oneonone:74, adoption:58},
      {ar:'المحتوى الرقمي', sector:'المحتوى والمناهج', participation:69, feedback:70, goals:80, oneonone:72, adoption:60},
      {ar:'مراكز التربية الخاصة', sector:'التربية الخاصة', participation:60, feedback:55, goals:62, oneonone:55, adoption:46},
      {ar:'تطوير التربية الخاصة', sector:'التربية الخاصة', participation:63, feedback:59, goals:66, oneonone:60, adoption:50},
      {ar:'عمليات التدريب', sector:'التطوير المهني', participation:57, feedback:48, goals:60, oneonone:49, adoption:43},
      {ar:'تصميم المنتجات', sector:'التطوير المهني', participation:60, feedback:51, goals:63, oneonone:52, adoption:46},
      {ar:'عمليات رأس المال البشري', sector:'حلول رأس المال البشري', participation:81, feedback:82, goals:76, oneonone:80, adoption:64},
    ],
    // manager accountability rollup (1:1 completion / goal approval / recognition activity)
    managerOps:[
      {ar:'مدير تطوير المحتوى', sector:'المحتوى والمناهج', team:8, oneonone:8, goalsApproved:90, recSent:14},
      {ar:'مدير الجودة', sector:'المحتوى والمناهج', team:8, oneonone:3, goalsApproved:62, recSent:5},
      {ar:'مدير المحتوى الرقمي', sector:'المحتوى والمناهج', team:6, oneonone:5, goalsApproved:78, recSent:9},
      {ar:'مدير مراكز التربية الخاصة', sector:'التربية الخاصة', team:7, oneonone:4, goalsApproved:64, recSent:6},
      {ar:'مدير التطوير المهني', sector:'التطوير المهني', team:6, oneonone:2, goalsApproved:55, recSent:4},
      {ar:'مدير عمليات رأس المال البشري', sector:'حلول رأس المال البشري', team:9, oneonone:8, goalsApproved:84, recSent:12},
    ],
  },

  /* ---------- Strategic alignment (Golden Thread analytics) ---------- */
  alignment: {
    // per 2026 priority: goal completion %, employees contributing, departments contributing
    priorities:[
      {id:'p1', ar:'التركيز على العميل', completion:64, employees:78, depts:9},
      {id:'p2', ar:'التحوّل لموجّه وطني للسوق', completion:41, employees:43, depts:6},
      {id:'p3', ar:'الاستدامة المالية والتميّز التشغيلي', completion:57, employees:61, depts:8},
      {id:'p4', ar:'تطوير الأعمال وضمان النمو', completion:49, employees:52, depts:7},
      {id:'p5', ar:'منظومة محوكَمة ومُمكِّنة', completion:70, employees:66, depts:10},
      {id:'p6', ar:'موظفو التعليمية هم أساس التميّز', completion:62, employees:120, depts:13},
    ],
  },

  /* ---------- Genetic Code analytics (behavior demonstration) ---------- */
  behaviorAnalytics: {
    // demonstrated counts per behavior id b1..b12 (from recognition + goal links)
    demonstrated:{ b1:62, b2:55, b3:71, b4:58, b5:49, b6:53, b7:68, b8:47, b9:44, b10:57, b11:60, b12:51 },
    // recognition-by-behavior (how often each is celebrated)
    recognitionBy:{ b1:18, b2:14, b3:31, b4:22, b5:16, b6:13, b7:29, b8:11, b9:9, b10:24, b11:20, b12:17 },
  },

  /* personal interaction snapshot (employee view — growth, not comparison).
     NOTE: recognition RECEIVED is intentionally NOT a Himmah input (avoids popularity effects). */
  myMetrics: {
    recSent:7, fbShared:4, coffee:2, knowledge:1, goalsDone:1, goalsTotal:3, conversations:2,
  },
  /* Himmah activity FACTS — rule-based stages are derived from these booleans/counts.
     No hidden numeric score is computed or shown; rules map facts -> qualitative stage. */
  himmahFacts: {
    // alignment
    activeGoals: 3, goalsLinkedToPriority: 3, goalsLinkedToBehavior: 2, clarityConfirmed: true,
    // participation
    pulseDone: true, voiceShared: true, oneOnOneAttended: true,
    // development
    skillsUpdated: true, devActionsDone: 1, learningParticipated: false,
    // contribution
    contributedToGoals: true, meaningfulRecognitionSent: 7, knowledgeShared: true, supportedOthers: true,
  },
};
