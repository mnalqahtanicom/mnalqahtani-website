/* ============================================================
   TALEMIA EX PLATFORM — MOCK DATA (prototype)
   ============================================================ */
window.TP = window.TP || {};

TP.priorities = [
  { id:'p1', ar:'التركيز على العميل', color:'#2C5F90' },
  { id:'p2', ar:'التحوّل لموجّه وطني للسوق', color:'#2C5F90' },
  { id:'p3', ar:'الاستدامة المالية والتميّز التشغيلي', color:'#1B3A5C' },
  { id:'p4', ar:'تطوير الأعمال وضمان النمو', color:'#1B3A5C' },
  { id:'p5', ar:'منظومة محوكَمة ومُمكِّنة', color:'#5FA570' },
  { id:'p6', ar:'موظفو التعليمية هم أساس التميّز', color:'#6CBE99' },
];

TP.behaviors = [
  { id:'b1',  ar:'الوعي',     d:'نفهم الهدف قبل التنفيذ' },
  { id:'b2',  ar:'المرونة',   d:'الإنجاز والتقدّم أهم من الكمال' },
  { id:'b3',  ar:'التعاون',   d:'ننجح مع بعض' },
  { id:'b4',  ar:'المسؤولية', d:'نكمل الشغل للنهاية' },
  { id:'b5',  ar:'الدقة',     d:'نهتم لآخر التفاصيل' },
  { id:'b6',  ar:'الالتزام',  d:'نلتزم بالمواعيد والوعد' },
  { id:'b7',  ar:'الأثر',     d:'نهتم بالأثر، لا بالرقم' },
  { id:'b8',  ar:'السرعة',    d:'نتحرك بسرعة ونتعلم باستمرار' },
  { id:'b9',  ar:'التطوير',   d:'نطوّر أنفسنا باستمرار' },
  { id:'b10', ar:'الاهتمام',  d:'نهتم بالتفاصيل وتجربة المستفيد' },
  { id:'b11', ar:'الحلول',    d:'نبحث عن الحلول، لا الأعذار' },
  { id:'b12', ar:'التكامل',   d:'نشتغل بروح الفريق الواحد' },
];

TP.core = [
  { ar:'اهتمام', en:'CARE' }, { ar:'مرونة', en:'AGILITY' },
  { ar:'تعاون', en:'COLLAB.' }, { ar:'مسؤولية', en:'RESPONS.' },
];

TP.me = { name:'ناصر العويشق', sector:'المحتوى والمناهج', sectorColor:'#2C5F90', manager:'دينا الزهراني', role:'أخصائي أول' };

TP.colleagues = [
  { name:'نجاح العنيزي', sector:'الجودة' },
  { name:'بدر العتيبي', sector:'العمليات التعليمية' },
  { name:'ريم الفضلي', sector:'التطوير المهني' },
  { name:'عبدالرحمن القلاع', sector:'المحتوى الرقمي' },
  { name:'سعد الأسمري', sector:'حلول رأس المال البشري' },
];

TP.deptObjectives = [
  { id:'do1', ar:'رفع جودة المحتوى التعليمي المحلي', priority:'p1' },
  { id:'do2', ar:'تمكين قدرات مركز التميّز للمناهج', priority:'p4' },
  { id:'do3', ar:'تعزيز تجربة وتفاعل فريق المحتوى', priority:'p6' },
];

TP.goals = [
  { id:'g1', title:'تطوير إطار جودة محتوى موحّد للمرحلة الابتدائية',
    deptObj:'do1', priorities:['p1'], behaviors:['b7','b5'], kpis:['نسبة المراجعات المعتمدة من أول مرة','زمن دورة المراجعة'],
    status:'active' },
  { id:'g2', title:'بناء مكتبة أصول رقمية قابلة لإعادة الاستخدام',
    deptObj:'do2', priorities:['p4'], behaviors:['b9','b12'], kpis:['عدد الأصول المنشورة'], status:'pending' },
  { id:'g3', title:'إطلاق مبادرة تغذية راجعة لفريق المحتوى',
    deptObj:'do3', priorities:[], behaviors:[], kpis:['معدل المشاركة'], status:'flagged' },
];

TP.recognitionsReceived = [
  { from:'دينا الزهراني', behavior:'b7', msg:'أثرك في رفع جودة المراجعات واضح وملموس — شكراً لك.', when:'قبل ٣ أيام' },
  { from:'بدر العتيبي', behavior:'b3', msg:'تعاونك مع فريق العمليات سرّع التسليم بشكل كبير.', when:'الأسبوع الماضي' },
];
TP.recognitionFeed = [
  { from:'ريم الفضلي', to:'سعد الأسمري', behavior:'b12' },
  { from:'نجاح العنيزي', to:'ناصر العويشق', behavior:'b5' },
];

TP.pulse = [
  { id:'q1', ar:'أعرف ما هو متوقّع مني في عملي', code:'Q01' },
  { id:'q3', ar:'لديّ الفرصة لتقديم أفضل ما لديّ', code:'Q03' },
  { id:'q12', ar:'لديّ فرص للتعلّم والنمو', code:'Q12' },
];
TP.voiceItems = [
  { id:'v1', text:'أقترح توحيد قوالب المراجعة بين الفرق لتقليل التكرار.', conf:'named', status:'actioned',
    response:'تم تبنّي القالب الموحّد بدءاً من هذا الربع. شكراً لك.' },
  { id:'v2', text:'نحتاج وقتاً مخصّصاً للتطوير المهني ضمن الأسبوع.', conf:'anon', status:'open', response:null },
];

TP.team = [
  { name:'عبدالرحمن القلاع', clarity:true,  conv:true,  goals:3, voice:0, eng:74 },
  { name:'نجاح العنيزي',     clarity:true,  conv:false, goals:2, voice:1, eng:61 },
  { name:'سعد الأسمري',      clarity:false, conv:false, goals:1, voice:0, eng:48, pendingGoal:true },
  { name:'مها السبيعي',      clarity:true,  conv:true,  goals:4, voice:0, eng:80 },
  { name:'خالد الحربي',      clarity:false, conv:true,  goals:2, voice:2, eng:55, pendingGoal:true },
];

TP.sectors = [
  { ar:'المحتوى والمناهج', color:'#2C5F90', eng:58, completeness:72, adoption:'تبنّي' },
  { ar:'التربية الخاصة', color:'#2C5F90', eng:51, completeness:64, adoption:'تجربة' },
  { ar:'العمليات التعليمية', color:'#2C5F90', eng:55, completeness:70, adoption:'تبنّي' },
  { ar:'التطوير المهني', color:'#2C5F90', eng:49, completeness:61, adoption:'وعي' },
  { ar:'حلول رأس المال البشري', color:'#2C5F90', eng:62, completeness:75, adoption:'تبنّي' },
  { ar:'الاستراتيجية وتطوير الأعمال', color:'#1B3A5C', eng:66, completeness:81, adoption:'تبنّي' },
  { ar:'الموارد البشرية', color:'#E0A07E', eng:60, completeness:68, adoption:'تبنّي' },
  { ar:'الحوكمة والمخاطر', color:'#1B3A5C', eng:57, completeness:66, adoption:'تجربة' },
];

TP.org = {
  engagementPct: 15,      // percentile (KSA)
  enps: -19,
  completeness: 71,       // line-of-sight completeness %
  adoptionStages: { 'وعي':18, 'فهم':24, 'تجربة':29, 'تبنّي':21, 'متجذّر':8 },
  behaviorPrev: [62,55,71,58,49,53,68,47,44,57,60,51], // 12 behaviors
};

TP.cycles = [
  { ar:'دورة وضوح الأهداف — الربع الحالي', done:68 },
  { ar:'نبض التفاعل', done:91 },
  { ar:'إطلاق تجربة التقدير السنوي', done:100 },
];
TP.themes = [
  { ar:'الحاجة لوضوح أكبر في توقعات الأدوار', n:34 },
  { ar:'طلب وقت مخصّص للتطوير والنمو', n:28 },
  { ar:'تقدير أكثر انتظاماً للسلوكيات', n:19 },
];
