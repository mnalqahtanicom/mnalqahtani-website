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

  /* personal interaction metrics (employee view — not comparative) */
  myMetrics: {
    recSent:7, recReceived:5, fbSent:4, fbReceived:3,
    coffee:2, knowledge:1, goalsDone:1, goalsTotal:3, meetings:6,
  },
  /* Himmah pillars (0-100) — personal, developmental */
  himmah: { alignment:67, contribution:72, development:58, participation:81 },
};
