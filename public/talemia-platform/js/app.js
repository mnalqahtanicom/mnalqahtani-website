/* ============================================================
   TALEMIA EX PLATFORM — APP (router, state, screens)
   MVP clickable prototype. Vanilla JS, RTL, role-based.
   ============================================================ */
(function () {
  'use strict';
  const $ = (s, r=document) => r.querySelector(s);
  const beh = id => TP.behaviors.find(b => b.id === id) || {ar:'',d:''};
  const pri = id => TP.priorities.find(p => p.id === id) || {ar:'',color:'#999'};
  const dobj = id => TP.deptObjectives.find(d => d.id === id);

  /* ---- working state (mutable session copies) ---- */
  const S = TP.state = {
    role: 'employee',
    route: 'home',
    activeGoal: null,
    draft: { title:'', desc:'', priorities:[], behaviors:[], kpi:'' },
    goals: JSON.parse(JSON.stringify(TP.goals)),
    recv: JSON.parse(JSON.stringify(TP.recognitionsReceived)),
    feed: JSON.parse(JSON.stringify(TP.recognitionFeed)),
    voice: JSON.parse(JSON.stringify(TP.voiceItems)),
    pulseAns: {},
    give: { to:'', behavior:'', msg:'' },
    voiceConf: 'named',
  };

  /* ---- role + nav config ---- */
  const ROLES = [
    { id:'employee', ar:'موظف' },
    { id:'manager', ar:'مدير' },
    { id:'executive', ar:'قيادة' },
    { id:'console', ar:'تشغيل/تغيير' },
    { id:'admin', ar:'إدارة' },
  ];
  const NAV = {
    employee: [
      {r:'home', ar:'الرئيسية', ic:'⌂'},
      {r:'los', ar:'خط الرؤية', ic:'≣'},
      {r:'goals', ar:'أهدافي ومؤشراتي', ic:'◎'},
      {r:'conversations', ar:'محادثاتي', ic:'❒'},
      {r:'experience', ar:'تجربتي', ic:'✦'},
      {r:'voice', ar:'الصوت', ic:'◌'},
      {r:'profile', ar:'ملفي المهني', ic:'☰'},
    ],
    manager: [
      {r:'home', ar:'الرئيسية', ic:'⌂'},
      {r:'team', ar:'فريقي', ic:'♟'},
      {r:'goals', ar:'التوافق', ic:'◎'},
      {r:'conversations', ar:'محادثات ١:١', ic:'❒'},
      {r:'experience', ar:'التجارب', ic:'✦'},
      {r:'voice', ar:'الصوت', ic:'◌'},
    ],
    executive: [
      {r:'home', ar:'الرئيسية', ic:'⌂'},
      {r:'organization', ar:'المنظمة', ic:'▦'},
      {r:'experience', ar:'التجارب', ic:'✦'},
      {r:'voice', ar:'الصوت (تجميعي)', ic:'◌'},
    ],
    console: [
      {r:'home', ar:'الرئيسية', ic:'⌂'},
      {r:'console', ar:'لوحة التشغيل', ic:'▤'},
    ],
    admin: [
      {r:'home', ar:'الرئيسية', ic:'⌂'},
      {r:'admin', ar:'الإدارة والحوكمة', ic:'⚙'},
    ],
  };
  const MOBILE_TABS = {
    employee: [['home','الرئيسية','⌂'],['goals','التوافق','◎'],['experience','تجربتي','✦'],['voice','الصوت','◌'],['more','المزيد','☰']],
    manager: [['home','الرئيسية','⌂'],['team','فريقي','♟'],['experience','التجارب','✦'],['voice','الصوت','◌'],['more','المزيد','☰']],
    executive: [['home','الرئيسية','⌂'],['organization','المنظمة','▦'],['experience','التجارب','✦'],['voice','الصوت','◌'],['more','المزيد','☰']],
    console: [['home','الرئيسية','⌂'],['console','التشغيل','▤'],['more','المزيد','☰']],
    admin: [['home','الرئيسية','⌂'],['admin','الإدارة','⚙'],['more','المزيد','☰']],
  };

  /* ---- helpers ---- */
  function completeness() {
    const g = S.goals.filter(x => x.status !== 'flagged');
    const linked = S.goals.filter(x => x.priorities.length && x.behaviors.length).length;
    return Math.round((linked / Math.max(S.goals.length,1)) * 100);
  }
  function meter(pct) {
    const fills = Math.round((pct/100)*5);
    let h=''; for(let i=1;i<=5;i++) h += `<i class="${i<=fills?'f':''}"></i>`;
    return `<div class="meter">${h}</div>`;
  }
  function chip(text, cls='') { return `<span class="chip ${cls}">${text}</span>`; }
  function priChips(ids){ return ids.length ? ids.map(id=>chip(pri(id).ar,'priority')).join('') : chip('⚑ بحاجة لربط أولوية','flag'); }
  function behChips(ids){ return ids.length ? ids.map(id=>chip(beh(id).ar,'behavior')).join('') : chip('⚑ بحاجة لربط سلوك','flag'); }
  function statusChip(st){
    const m={active:['نشط','active'],pending:['بانتظار اعتماد المدير','pending'],draft:['مسودة','draft'],flagged:['بحاجة لمراجعة','flagged']};
    const x=m[st]||['',''];return `<span class="status ${x[1]}">${x[0]}</span>`;
  }
  function avatarColor(name){ const c=['#2C5F90','#1B3A5C','#6CBE99','#2EA1A1','#5FA570','#90C685']; let s=0; for(const ch of name)s+=ch.charCodeAt(0); return c[s%c.length]; }
  let toastT;
  function toast(msg){ let t=$('#toast'); if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t);} t.textContent=msg; t.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('show'),2600); }

  /* ============================================================
     SCREENS
     ============================================================ */
  const V = {};

  V.home = () => {
    if (S.role==='executive') return V.organization();
    if (S.role==='console') return V.console();
    if (S.role==='admin') return V.admin();
    const pendingApprovals = S.goals.filter(g=>g.status==='pending').length;
    const flagged = S.goals.filter(g=>g.status==='flagged').length;
    const lastRec = S.recv[0];
    return `
    <div class="page-head"><h1>مرحباً، ${TP.me.name.split(' ')[0]} 👋</h1>
      <div class="sub">صبغتُنا: أنا تعليمي… أفهم مؤشري، وأحقّق الأثر</div></div>
    <div class="card soft" style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;margin-bottom:24px">
      <div><div class="cardlabel">اكتمال خط الرؤية</div>${meter(completeness())}</div>
      <div style="font-size:34px;font-weight:900;color:var(--brand-navy)">${completeness()}%</div>
      <div class="muted" style="flex:1;min-width:160px">نسبة أهدافك المرتبطة بأولويات ٢٠٢٦ والسلوكيات.</div>
      <button class="btn ghost sm" data-go="los">استكشف المسار</button>
    </div>
    <div class="grid cols-2">
      <!-- ALIGNMENT region -->
      <div>
        <div class="card" style="margin-bottom:16px">
          <h3>يحتاج انتباهك</h3>
          ${flagged?`<div class="notice flag" style="margin-bottom:10px">⚑ لديك ${flagged} هدف بحاجة لإكمال الربط (أولوية + سلوك).</div>`:''}
          ${pendingApprovals?`<div class="notice info" style="margin-bottom:10px">⏳ ${pendingApprovals} هدف بانتظار اعتماد المدير.</div>`:''}
          <div class="notice privacy">◌ نبض جديد متاح — شارك رأيك.</div>
          <div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn primary sm" data-go="goals">أهدافي</button>
            <button class="btn ghost sm" data-go="voice">النبض والصوت</button>
          </div>
        </div>
        <div class="card">
          <h3>أهدافي (ملخّص)</h3>
          <div class="row" style="gap:24px">
            <div class="metric"><div class="big">${S.goals.filter(g=>g.status==='active').length}</div><div class="lbl">نشطة</div></div>
            <div class="metric"><div class="big">${S.goals.filter(g=>g.status==='pending').length}</div><div class="lbl">بانتظار اعتماد</div></div>
            <div class="metric"><div class="big">${flagged}</div><div class="lbl">بحاجة لمراجعة</div></div>
          </div>
        </div>
      </div>
      <!-- EXPERIENCE region -->
      <div>
        <div class="card" style="background:linear-gradient(135deg,#0E2533,#16384F);color:#FAFAF7;border:none;margin-bottom:16px">
          <div class="cardlabel" style="color:#90C685">تجربة توقيعية</div>
          <h3 style="color:#fff;margin:6px 0">بطاقة التقدير السنوي بانتظارك</h3>
          <p style="color:rgba(250,250,247,.8);font-size:15px">رسالة شخصية موقّعة من القيادة — تنتظر فقط فتحها.</p>
          <button class="btn aqua sm" style="margin-top:14px" data-x="open">افتح تجربتك ✦</button>
        </div>
        <div class="card">
          <div class="cardlabel">آخر تقدير لك</div>
          ${lastRec?`<div class="reccard"><div>${chip(beh(lastRec.behavior).ar,'behavior')}</div>
            <p style="margin:10px 0 6px">"${lastRec.msg}"</p>
            <div class="muted" style="font-size:13px">— ${lastRec.from} · ${lastRec.when}</div></div>`:'<div class="muted">لا يوجد بعد.</div>'}
          <button class="btn ghost sm" style="margin-top:12px" data-go="experience">تجربتي والتقدير</button>
        </div>
      </div>
    </div>`;
  };

  V.los = () => {
    const nodes = [['الاستراتيجية',true],['أولوية ٢٠٢٦',true],['هدف الإدارة',true],['أهدافي',true],['المؤشرات',true],['السلوكيات',true]];
    return `
    <div class="page-head"><h1>خط الرؤية</h1><div class="sub">من الاستراتيجية إلى السلوك — تتبّع مسار عملك.</div></div>
    <div class="card" style="margin-bottom:20px">
      <div class="los">${nodes.map((n,i)=>`<span class="node on">${n[0]}</span>${i<nodes.length-1?'<span class="arr">◂</span>':''}`).join('')}</div>
    </div>
    ${S.goals.map(g=>`
      <div class="card" style="margin-bottom:14px">
        <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap">
          <div class="title" style="font-weight:700">${g.title}</div>${statusChip(g.status)}
        </div>
        <div class="los" style="margin-top:14px">
          <span class="node on">${dobj(g.deptObj)?dobj(g.deptObj).ar:'—'}</span><span class="arr">◂</span>
          <span class="node ${g.priorities.length?'on':''}">${g.priorities.length?pri(g.priorities[0]).ar:'⚑ أولوية ناقصة'}</span><span class="arr">◂</span>
          <span class="node ${g.behaviors.length?'on':''}">${g.behaviors.length?beh(g.behaviors[0]).ar:'⚑ سلوك ناقص'}</span>
        </div>
        <div style="margin-top:10px">${g.priorities.length&&g.behaviors.length?'<span class="chip behavior">✔ الربط مكتمل</span>':'<span class="chip flag">⚑ بحاجة لمراجعة</span>'}</div>
      </div>`).join('')}`;
  };

  V.goals = () => {
    const mgr = S.role==='manager';
    return `
    <div class="page-head" style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:12px">
      <div><h1>${mgr?'توافق الفريق':'أهدافي ومؤشراتي'}</h1><div class="sub">كل هدف يرتبط بأولوية ٢٠٢٦ وسلوك من صبغتنا.</div></div>
      <button class="btn primary" data-go="goalnew">+ هدف جديد</button>
    </div>
    ${S.goals.map(g=>`
      <div class="lrow" data-goal="${g.id}">
        <div class="grow">
          <div class="title">${g.title}</div>
          <div class="meta">${priChips(g.priorities)} ${behChips(g.behaviors)}</div>
        </div>
        ${statusChip(g.status)}
        <button class="btn ghost sm" data-goal-open="${g.id}">تفاصيل</button>
        ${mgr && g.status==='pending' ? `<button class="btn aqua sm" data-approve="${g.id}">اعتماد</button>`:''}
      </div>`).join('')}`;
  };

  V.goal = () => {
    const g = S.goals.find(x=>x.id===S.activeGoal); if(!g) return V.goals();
    const mgr = S.role==='manager';
    const linkOk = g.priorities.length && g.behaviors.length;
    return `
    <button class="btn ghost sm" data-go="goals" style="margin-bottom:16px">◂ رجوع للأهداف</button>
    <div class="card">
      <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:flex-start">
        <h2 style="color:var(--brand-navy);max-width:70%">${g.title}</h2>${statusChip(g.status)}
      </div>
      ${!linkOk?`<div class="notice flag" style="margin:14px 0">⚑ الربط ناقص — الهدف بحالة «بحاجة لمراجعة». يمكنك المتابعة، وسيُراجَع مع مديرك (لا يُحظر).</div>`:''}
      <div style="margin:16px 0"><div class="cardlabel">هدف الإدارة</div><div>${dobj(g.deptObj)?dobj(g.deptObj).ar:'—'}</div></div>
      <div style="margin:16px 0"><div class="cardlabel">الأولويات المرتبطة (≥١)</div><div class="meta">${priChips(g.priorities)}</div></div>
      <div style="margin:16px 0"><div class="cardlabel">السلوكيات المرتبطة (≥١)</div><div class="meta">${behChips(g.behaviors)}</div></div>
      <div style="margin:16px 0"><div class="cardlabel">المؤشرات (KPIs)</div>
        ${g.kpis.map(k=>`<div class="lrow" style="margin-bottom:8px"><div class="grow">${k}</div></div>`).join('')}</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px">
        ${mgr && g.status==='pending' ? `<button class="btn aqua" data-approve="${g.id}">اعتماد وتأكيد الوضوح</button>`:''}
        ${!mgr ? `<button class="btn ghost" data-go="oneonone">مناقشة في ١:١ مع المدير</button>`:''}
      </div>
    </div>`;
  };

  V.goalnew = () => {
    const d = S.draft;
    return `
    <button class="btn ghost sm" data-go="goals" style="margin-bottom:16px">◂ إلغاء</button>
    <div class="page-head"><h1>هدف جديد</h1><div class="sub">الربط بأولوية وسلوك مطلوب — وإن نقص يُعلَّم «بحاجة لمراجعة».</div></div>
    <div class="card">
      <div class="field"><label>عنوان الهدف</label><input class="input" id="g-title" placeholder="مثال: تطوير دليل جودة المحتوى" value="${d.title}"></div>
      <div class="field"><label>النتيجة / الوصف</label><textarea class="input" id="g-desc" placeholder="ما الأثر المتوقّع؟">${d.desc}</textarea></div>
      <div class="field"><label>اربط بأولويات ٢٠٢٦ <span class="muted">(اختر واحدة على الأقل)</span></label>
        <div class="meta" id="g-pri">${TP.priorities.map(p=>`<span class="chip ${d.priorities.includes(p.id)?'priority':''}" data-pick-pri="${p.id}" style="cursor:pointer">${d.priorities.includes(p.id)?'✔ ':''}${p.ar}</span>`).join('')}</div></div>
      <div class="field"><label>اربط بسلوكيات الصبغة <span class="muted">(اختر واحداً على الأقل)</span></label>
        <div class="meta" id="g-beh">${TP.behaviors.map(b=>`<span class="chip ${d.behaviors.includes(b.id)?'behavior':''}" data-pick-beh="${b.id}" style="cursor:pointer">${d.behaviors.includes(b.id)?'✔ ':''}${b.ar}</span>`).join('')}</div></div>
      <div class="field"><label>مؤشر أداء (KPI)</label><input class="input" id="g-kpi" placeholder="مثال: نسبة الاعتماد من أول مرة" value="${d.kpi}"></div>
      <div id="g-flagnote"></div>
      <div style="display:flex;gap:10px;margin-top:8px">
        <button class="btn primary" data-save-goal="1">إرسال للمراجعة</button>
      </div>
    </div>`;
  };

  V.conversations = () => `
    <div class="page-head"><h1>${S.role==='manager'?'محادثات ١:١':'محادثاتي'}</h1><div class="sub">محادثة التوافق هي اللحظة المحورية لوضوح الأهداف.</div></div>
    <div class="lrow"><div class="grow"><div class="title">محادثة توافق — ${S.role==='manager'?'سعد الأسمري':'دينا الزهراني'}</div>
      <div class="meta"><span class="chip">مجدولة</span></div></div>
      <button class="btn primary sm" data-go="oneonone">افتح المحادثة</button></div>
    <div class="lrow"><div class="grow"><div class="title">متابعة تغذية راجعة</div><div class="meta"><span class="chip behavior">مكتملة</span></div></div></div>`;

  V.oneonone = () => {
    const g = S.goals.find(x=>x.status==='pending') || S.goals[0];
    return `
    <button class="btn ghost sm" data-go="conversations" style="margin-bottom:16px">◂ رجوع</button>
    <div class="page-head"><h1>محادثة توافق ١:١</h1><div class="sub">${TP.me.name} ◆ ${TP.me.manager}</div></div>
    <div class="card">
      <h3>أهداف للمناقشة</h3>
      <div class="lrow"><div class="grow"><div class="title">${g.title}</div><div class="meta">${priChips(g.priorities)} ${behChips(g.behaviors)}</div></div>${statusChip(g.status)}</div>
      <div class="field" style="margin-top:18px"><label>وضوح الأهداف</label>
        <div class="notice info">عند تأكيد المدير للوضوح، يُفعَّل الهدف (الحالة → نشط). يُوثَّق الإجراء (Audit).</div></div>
      <div class="field"><label>ملاحظات وإجراءات</label><textarea class="input" placeholder="نقاط الاتفاق والخطوات التالية..."></textarea></div>
      ${S.role==='manager'
        ? `<button class="btn aqua" data-approve="${g.id}">✔ تأكيد الوضوح واعتماد الهدف</button>`
        : `<div class="notice privacy">بانتظار تأكيد مديرك للوضوح خلال المحادثة.</div>`}
    </div>`;
  };

  V.experience = () => {
    const authoring = (S.role==='manager');
    return `
    <div class="page-head"><h1>${authoring?'التجارب التوقيعية':'تجربتي'}</h1>
      <div class="sub">الجانب الإنساني للمنصة — التقدير، الانتماء، واللحظات التي تُحتفى بها.</div></div>
    <div class="card" style="background:linear-gradient(135deg,#0E2533,#16384F);color:#FAFAF7;border:none;margin-bottom:18px">
      <div class="cardlabel" style="color:#90C685">برنامج التقدير السنوي</div>
      <h3 style="color:#fff;margin:6px 0">بطاقة تقدير شخصية موقّعة من القيادة</h3>
      <p style="color:rgba(250,250,247,.82)">موسيقى التعليمية الرسمية · شهادة مخصّصة باسمك · صبغتنا الجينيّة وقيمنا.</p>
      <button class="btn aqua" style="margin-top:14px" data-x="open">افتح التجربة ✦</button>
    </div>
    ${authoring?`<div class="card" style="margin-bottom:18px"><h3>إنشاء تجربة لفريقك</h3>
      <p class="muted">أنشئ لحظة تقدير شخصية لأحد أعضاء فريقك باستخدام قالب حوكمة معتمد (يتطلب توقيع/اعتماد).</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:10px">
        <select class="input" style="max-width:240px"><option>اختر عضو الفريق…</option>${TP.team.map(t=>`<option>${t.name}</option>`).join('')}</select>
        <select class="input" style="max-width:240px"><option>اختر قالباً معتمداً…</option><option>تقدير على سلوك</option><option>إنجاز مشروع</option></select>
        <button class="btn primary" data-x="open">معاينة وإرسال</button>
      </div></div>`:''}
    <div class="card">
      <h3>تقديرات استلمتها</h3>
      ${S.recv.map(r=>`<div class="reccard" style="margin-bottom:12px"><div>${chip(beh(r.behavior).ar,'behavior')}</div>
        <p style="margin:10px 0 6px">"${r.msg}"</p><div class="muted" style="font-size:13px">— ${r.from} · ${r.when}</div></div>`).join('')}
      <div style="margin-top:6px"><button class="btn aqua" data-go="give">قدّم تقديراً لزميل ✦</button></div>
    </div>`;
  };

  V.give = () => `
    <button class="btn ghost sm" data-go="experience" style="margin-bottom:16px">◂ رجوع</button>
    <div class="page-head"><h1>قدّم تقديراً</h1><div class="sub">التقدير مرتبط دائماً بسلوك من صبغتنا — وغير مرتبط بالتعويض.</div></div>
    <div class="card">
      <div class="field"><label>الزميل</label>
        <select class="input" id="rec-to">${['<option value="">اختر زميلاً…</option>'].concat(TP.colleagues.map(c=>`<option ${S.give.to===c.name?'selected':''}>${c.name}</option>`)).join('')}</select></div>
      <div class="field"><label>السلوك (مطلوب)</label>
        <div class="meta" id="rec-beh">${TP.behaviors.map(b=>`<span class="chip ${S.give.behavior===b.id?'behavior':''}" data-rec-beh="${b.id}" style="cursor:pointer">${S.give.behavior===b.id?'✔ ':''}${b.ar}</span>`).join('')}</div></div>
      <div class="field"><label>رسالتك</label><textarea class="input" id="rec-msg" placeholder="اكتب تقديراً صادقاً يبرز الأثر...">${S.give.msg}</textarea></div>
      <button class="btn aqua" data-send-rec="1">إرسال التقدير ✦</button>
    </div>`;

  V.voice = () => {
    const agg = (S.role==='executive');
    return `
    <div class="page-head"><h1>${agg?'الصوت (تجميعي)':'الصوت'}</h1><div class="sub">إصغاء مستمر — وكل صوت يقترن بحالة إجراء واضحة.</div></div>
    ${agg ? `
      <div class="notice privacy" style="margin-bottom:16px">◌ عرض تجميعي فقط — لا تظهر بيانات أفراد (حدّ الإخفاء n≥٥).</div>
      <div class="grid cols-3">
        ${TP.themes.map(t=>`<div class="card"><div class="metric"><div class="big">${t.n}</div><div class="lbl">${t.ar}</div></div></div>`).join('')}
      </div>
      <div class="card" style="margin-top:16px"><div class="cardlabel">معدّل إغلاق الأصوات بإجراء</div>
        <div class="metric" style="text-align:start"><div class="big">64%</div><div class="trend up">▲ تحسّن مستمر</div></div></div>`
    : `
      <div class="card" style="margin-bottom:18px">
        <h3>نبض سريع</h3>
        ${TP.pulse.map(q=>`<div class="lrow" style="flex-wrap:wrap">
          <div class="grow"><div class="title" style="font-weight:600">${q.ar}</div><div class="muted" style="font-size:12px">${q.code}</div></div>
          <div class="segmented">${[1,2,3,4,5].map(n=>`<button class="${S.pulseAns[q.id]==n?'on':''}" data-pulse="${q.id}:${n}">${n}</button>`).join('')}</div>
        </div>`).join('')}
      </div>
      <div class="card" style="margin-bottom:18px">
        <h3>شارك فكرة أو همّاً</h3>
        <textarea class="input" id="voice-text" placeholder="رأيك يصنع فرقاً..."></textarea>
        <div style="display:flex;align-items:center;gap:14px;margin-top:12px;flex-wrap:wrap">
          <span class="muted">الخصوصية (اختيارك):</span>
          <div class="segmented">
            <button class="${S.voiceConf==='named'?'on':''}" data-vconf="named">باسمي</button>
            <button class="${S.voiceConf==='anon'?'on':''}" data-vconf="anon">مجهول</button>
          </div>
          <button class="btn primary" data-send-voice="1">إرسال</button>
        </div>
        <div class="notice privacy" style="margin-top:12px">المجهول يظهر فقط ضمن تجميع (n≥٥) ولا يُعاد التعرّف عليه.</div>
      </div>
      <div class="card"><h3>أصواتي ← الحالة</h3>
        ${S.voice.map(v=>`<div class="lrow" style="flex-direction:column;align-items:stretch">
          <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap">
            <div class="grow">${v.text}</div>
            <span class="status ${v.status}">${v.status==='actioned'?'تم اتخاذ إجراء':'مفتوح'}</span>
          </div>
          <div class="meta" style="margin-top:8px"><span class="chip">${v.conf==='anon'?'مجهول':'باسمي'}</span>
            ${v.response?`<span class="chip behavior">↩ ${v.response}</span>`:''}</div>
        </div>`).join('')}
      </div>`}`;
  };

  V.profile = () => `
    <div class="page-head"><h1>ملفي المهني</h1><div class="sub">هويتك المهنية — تُمكّن النمو والاكتشاف الداخلي (نسخة مبسّطة).</div></div>
    <div class="grid cols-2">
      <div class="card"><div class="cardlabel">المهارات</div>
        <div class="meta">${['تصميم تعليمي','مراجعة جودة','تطوير محتوى','تحليل مناهج'].map(s=>chip(s)).join('')}<span class="chip" style="cursor:pointer">+ إضافة</span></div></div>
      <div class="card"><div class="cardlabel">الشهادات <span class="muted" style="font-size:11px">(تتحقق منها الموارد البشرية)</span></div>
        <div class="meta">${chip('✔ مصمم تعليمي معتمد','behavior')}${chip('إدارة مشاريع PMP')}</div></div>
      <div class="card"><div class="cardlabel">مجالات الخبرة</div>
        <div class="meta">${['جودة المحتوى','المرحلة الابتدائية','الأصول الرقمية'].map(s=>chip(s)).join('')}</div></div>
      <div class="card"><div class="cardlabel">الظهور في «عرّفني على» (Connect)</div>
        <div class="segmented" style="margin-top:6px"><button class="on">مفعّل</button><button>معطّل</button></div>
        <div class="notice privacy" style="margin-top:12px">الظهور اختياري (opt-in) — أنت تتحكم به.</div></div>
    </div>`;

  /* ---------- Manager ---------- */
  V.team = () => {
    const clarity = Math.round(TP.team.filter(t=>t.clarity).length/TP.team.length*100);
    const conv = `${TP.team.filter(t=>t.conv).length}/${TP.team.length}`;
    return `
    <div class="page-head"><h1>فريقي</h1><div class="sub">أنت محور تجربة فريقك — الوضوح، التقدير، والإصغاء.</div></div>
    <div class="grid cols-3" style="margin-bottom:20px">
      <div class="card"><div class="metric"><div class="big">${clarity}%</div><div class="lbl">وضوح الفريق</div></div></div>
      <div class="card"><div class="metric"><div class="big">${conv}</div><div class="lbl">محادثات ١:١ مكتملة</div></div></div>
      <div class="card"><div class="metric"><div class="big">${TP.recognitionFeed.length}</div><div class="lbl">تقديرات هذا الأسبوع</div></div></div>
    </div>
    <div class="card" style="margin-bottom:18px;display:flex;gap:10px;flex-wrap:wrap;align-items:center">
      <strong>الإسناد (Cascade):</strong> <span class="muted">هدف الإدارة ▸ أهداف الفريق</span>
      <button class="btn primary sm" data-go="cascade" style="margin-inline-start:auto">ابدأ الإسناد</button>
    </div>
    ${TP.team.map(t=>`<div class="lrow">
      <span class="avatar" style="background:${avatarColor(t.name)};width:34px;height:34px;font-size:13px">${t.name[0]}</span>
      <div class="grow"><div class="title">${t.name}</div>
        <div class="meta">
          ${t.clarity?'<span class="chip behavior">وضوح ✔</span>':'<span class="chip flag">⚑ وضوح ناقص</span>'}
          <span class="chip">أهداف: ${t.goals}</span>
          ${t.conv?'<span class="chip">١:١ ✔</span>':'<span class="chip">١:١ —</span>'}
          ${t.voice?`<span class="chip flag">صوت بانتظار إجراء: ${t.voice}</span>`:''}
        </div></div>
      ${t.pendingGoal?`<button class="btn aqua sm" data-approve-name="${t.name}">اعتماد هدف</button>`:''}
    </div>`).join('')}
    <div class="card" style="margin-top:18px"><div class="cardlabel">صحة الفريق (إشارات تفاعل — فريقك فقط)</div>
      <div class="bars">${TP.team.map(t=>`<i style="height:${t.eng}%" title="${t.eng}%"></i>`).join('')}</div></div>`;
  };

  V.cascade = () => `
    <button class="btn ghost sm" data-go="team" style="margin-bottom:16px">◂ رجوع لفريقي</button>
    <div class="page-head"><h1>الإسناد — هدف الإدارة ▸ أهداف الفريق</h1></div>
    <div class="card" style="margin-bottom:16px"><div class="cardlabel">اختر هدف الإدارة</div>
      ${TP.deptObjectives.map((d,i)=>`<div class="lrow"><div class="grow"><div class="title">${d.ar}</div>
        <div class="meta">${chip(pri(d.priority).ar,'priority')}</div></div>
        <button class="btn ${i===0?'primary':'ghost'} sm">${i===0?'محدّد':'اختر'}</button></div>`).join('')}</div>
    <div class="card"><div class="cardlabel">أهداف فريق مقترحة (ترث الأولوية والسلوك)</div>
      ${['مراجعة جودة محتوى المرحلة الابتدائية','توحيد قوالب التصميم التعليمي'].map(t=>`<div class="lrow">
        <div class="grow"><div class="title">${t}</div><div class="meta">${chip('التركيز على العميل','priority')}${chip('الأثر','behavior')}</div></div>
        <select class="input" style="max-width:180px"><option>أسند إلى…</option>${TP.team.map(m=>`<option>${m.name}</option>`).join('')}</select></div>`).join('')}
      <button class="btn primary" style="margin-top:12px" data-cascade-done="1">إسناد وتأكيد</button></div>`;

  /* ---------- Executive ---------- */
  V.organization = () => {
    const o = TP.org;
    const adopt = Object.entries(o.adoptionStages);
    const maxA = Math.max(...adopt.map(a=>a[1]));
    return `
    <div class="page-head"><h1>المنظمة — صحة تنظيمية</h1><div class="sub">عرض تجميعي فقط · لا تظهر بيانات أفراد · حدّ الإخفاء n≥٥.</div></div>
    <div class="grid cols-4" style="margin-bottom:18px">
      <div class="card"><div class="metric"><div class="big">${o.engagementPct}<span style="font-size:18px">%ile</span></div><div class="lbl">التفاعل (السعودية)</div><div class="trend up">▲ مسار التحسّن</div></div></div>
      <div class="card"><div class="metric"><div class="big">${o.enps}</div><div class="lbl">eNPS</div><div class="trend up">▲ نحو الموجب</div></div></div>
      <div class="card"><div class="metric"><div class="big">${o.completeness}%</div><div class="lbl">اكتمال خط الرؤية</div></div></div>
      <div class="card"><div class="metric"><div class="big">${o.behaviorPrev[6]}%</div><div class="lbl">حضور سلوك «الأثر»</div></div></div>
    </div>
    <div class="grid cols-2" style="margin-bottom:18px">
      <div class="card"><div class="cardlabel">حضور السلوكيات (صبغتنا — ١٢)</div>
        <div class="bars">${o.behaviorPrev.map((v,i)=>`<i style="height:${v}%" title="${TP.behaviors[i].ar}: ${v}%"></i>`).join('')}</div></div>
      <div class="card"><div class="cardlabel">مراحل التبنّي</div>
        ${adopt.map(a=>`<div style="display:flex;align-items:center;gap:10px;margin:8px 0">
          <span style="width:60px;font-size:13px">${a[0]}</span>
          <div style="flex:1;background:var(--n100);border-radius:6px;height:14px;overflow:hidden">
            <div style="width:${a[1]/maxA*100}%;height:100%;background:var(--brand-aqua)"></div></div>
          <span class="muted" style="font-size:12px">${a[1]}%</span></div>`).join('')}</div>
    </div>
    <div class="card" style="margin-bottom:18px"><div class="cardlabel">القطاعات (تجميعي · n≥٥)</div>
      <div class="grid cols-4">${TP.sectors.map(s=>`<div class="card soft" style="padding:14px">
        <span class="sdot" style="background:${s.color}"></span> <strong style="font-size:13px">${s.ar}</strong>
        <div class="metric" style="margin-top:8px"><div class="big" style="font-size:24px">${s.eng}%</div><div class="lbl">تفاعل · ${s.adoption}</div></div></div>`).join('')}</div></div>
    <div class="card"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
      <div><div class="cardlabel">مراجعة البوابة + التجارب القيادية</div>
        <span class="muted">أدلة جاهزة لمراجعة بوابة المرحلة.</span></div>
      <div style="display:flex;gap:8px"><button class="btn ghost sm">أدلة البوابة</button><button class="btn aqua sm" data-x="open">وقّع/ابرز تجربة ✦</button></div></div></div>`;
  };

  /* ---------- Console (HC / Change) ---------- */
  V.console = () => `
    <div class="page-head"><h1>لوحة التشغيل</h1><div class="sub">إدارة التغيير + الموارد البشرية — تشغيل الدورات، الإصغاء، وتنسيق التجارب.</div></div>
    <div class="grid cols-3" style="margin-bottom:18px">
      ${TP.cycles.map(c=>`<div class="card"><div class="cardlabel">${c.ar}</div>
        <div style="background:var(--n100);border-radius:8px;height:14px;overflow:hidden;margin-top:8px">
          <div style="width:${c.done}%;height:100%;background:var(--brand-aqua)"></div></div>
        <div class="muted" style="font-size:13px;margin-top:6px">اكتمال ${c.done}%</div></div>`).join('')}
    </div>
    <div class="grid cols-2">
      <div class="card"><h3>تجميع الإصغاء (themes · n≥٥)</h3>
        ${TP.themes.map(t=>`<div class="lrow"><div class="grow">${t.ar}</div><span class="chip">${t.n}</span></div>`).join('')}</div>
      <div class="card"><h3>تنسيق التجارب التوقيعية</h3>
        <p class="muted">شخصنة بالهوية · توقيع قيادي · تسليم (بريد ▸ ويب ▸ بطاقة).</p>
        <div class="field" style="margin-top:10px"><label>الجمهور</label><select class="input"><option>كل الموظفين (٢٠٤)</option><option>قطاع المحتوى والمناهج</option></select></div>
        <button class="btn aqua" data-x="open">معاينة وإطلاق التجربة ✦</button></div>
    </div>`;

  /* ---------- Admin ---------- */
  V.admin = () => `
    <div class="page-head"><h1>الإدارة والحوكمة والخصوصية</h1><div class="sub">الأساس الحاكم لكل الوحدات — كل إجراء موثّق (Audit).</div></div>
    <div class="grid cols-2">
      ${[
        ['الهويات والأدوار','إدارة الأشخاص الستة + الإدارة'],
        ['مزامنة الهيكل/القطاعات','المستويات N..N-4 والألوان'],
        ['الصلاحيات والتجميع','من يرى أي مستوى (تجميعي/فردي)'],
        ['الخصوصية والموافقات','سرّية الصوت · شخصنة التجارب · حدّ n≥٥'],
        ['دورة حياة المحتوى (AR/EN)','إنشاء ▸ اعتماد ▸ تحديث ▸ أرشفة'],
        ['السجل (Audit)','كل وصول لبيانات الأفراد موثّق'],
      ].map(c=>`<div class="card"><h3>${c[0]}</h3><p class="muted">${c[1]}</p>
        <button class="btn ghost sm" style="margin-top:10px">فتح</button></div>`).join('')}
    </div>
    <div class="notice info" style="margin-top:16px">قرارات الحوكمة المعتمدة: الربط = «علّم للمراجعة» · الصوت = اختيار المستخدم · الإخفاء n=٥ · تجارب المديرين ضمن قوالب · التقدير غير مرتبط بالتعويض.</div>`;

  V.more = () => {
    const items = (S.role==='manager') ? [['conversations','محادثات ١:١','❒'],['goals','التوافق','◎']]
      : (S.role==='executive') ? [['voice','الصوت (تجميعي)','◌']]
      : [['conversations','محادثاتي','❒'],['profile','ملفي المهني','☰'],['los','خط الرؤية','≣']];
    return `<div class="page-head"><h1>المزيد</h1></div>
    ${items.map(i=>`<div class="lrow" data-go="${i[0]}"><span class="ic" style="font-size:20px">${i[2]}</span><div class="grow title">${i[1]}</div><span class="arr">‹</span></div>`).join('')}
    <div class="card" style="margin-top:16px"><div class="cardlabel">تبديل الدور (للعرض التجريبي)</div>
      <div class="meta">${ROLES.map(r=>`<span class="chip ${S.role===r.id?'behavior':''}" data-role="${r.id}" style="cursor:pointer">${r.ar}</span>`).join('')}</div></div>`;
  };

  /* ============================================================
     SIGNATURE EXPERIENCE OVERLAY  (Experience Mode)
     ============================================================ */
  function openExperience() {
    const me = TP.me;
    const ov = document.createElement('div');
    ov.className = 'experience'; ov.id = 'experience';
    ov.innerHTML = `
      <audio id="sigaudio" src="audio/signature-bg.wav" loop></audio>
      <div class="x-wrap">
        <div class="x-top">
          <div class="x-eq"><i></i><i></i><i></i><i></i><i></i></div>
          <div style="display:flex;gap:8px">
            <button class="x-muso" id="muso">♪ الموسيقى</button>
            <button class="x-close" data-x="close">إغلاق ✕</button>
          </div>
        </div>
        <div class="x-fade">
          <div class="x-kicker">برنامج التقدير السنوي · ٢٠٢٦</div>
          <div class="x-kicker" style="letter-spacing:.1em;color:rgba(250,250,247,.6)">تكريــمــاً لـ</div>
          <div class="x-name">${me.name}</div>
          <div class="x-sector">${me.sector}</div>
          <div class="x-story">بعض الأسماء لا تمر… بل تترك أثراً.</div>
          <div class="x-story" style="font-size:16px;color:rgba(250,250,247,.7)">تقديــراً لأثــرك البــاقي في التعليمية — أثرك يصنع التعليمية.</div>
          <div class="x-seal"><div class="ring"></div><div class="inner">التعليمية<br>✦ تقدير ✦<br>٢٠٢٦</div></div>
          <div class="x-sign">مع وافر الامتنان والتقدير<br><br>الإدارة العامة للاستراتيجية ◆ إدارة التغيير</div>
          <div class="x-divider"></div>
          <div class="x-section-t">صِبغـتـنــا</div>
          <div class="x-section-h">صِبغتُنا الجينيّة</div>
          <div class="muted" style="color:rgba(250,250,247,.55);margin-bottom:18px">الشِّفرة التي تحدّد من نحن</div>
          <div class="x-dna">${TP.behaviors.map(b=>`<div class="it"><div class="t">${b.ar}</div><div class="d">${b.d}</div></div>`).join('')}</div>
          <div class="x-divider"></div>
          <div class="x-section-t">قِيَـمُـنــا</div>
          <div class="x-section-h">القيم الأربع التي تُشكّل عقلنا الجماعي</div>
          <div class="x-core">${TP.core.map(v=>`<div class="v"><div class="ar">${v.ar}</div><div class="en">${v.en}</div></div>`).join('')}</div>
          <div class="x-eq-line">قِيَمُنا مجتمعةً <span class="g">= همّة</span></div>
          <div class="x-actions">
            <button class="x-btn solid" data-x="download">تحميل البطاقة PDF</button>
            <button class="x-btn" data-x="close">تابع إلى منصتك</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(ov);
    const audio = $('#sigaudio'); audio.volume = 0.5;
    const p = audio.play(); if (p) p.catch(()=>{});
    let muted=false;
    $('#muso').onclick = () => { muted=!muted; audio.muted=muted; $('#muso').textContent = muted?'♪ صامت':'♪ الموسيقى'; };
  }
  function closeExperience(){ const ov=$('#experience'); if(ov){ const a=$('#sigaudio'); if(a){a.pause();} ov.remove(); } }

  /* ============================================================
     SHELL + ROUTER
     ============================================================ */
  function render() {
    const nav = NAV[S.role];
    const view = (V[S.route] || V.home)();
    const tabs = MOBILE_TABS[S.role];
    document.getElementById('app').innerHTML = `
      <div class="topbar">
        <div class="brandmark"><div class="equalizer"><i></i><i></i><i></i><i></i><i></i></div>
          <span>التعليميَّة · منصة الموظف</span></div>
        <div class="spacer"></div>
        <div class="roleswitch">${ROLES.map(r=>`<button class="${S.role===r.id?'active':''}" data-role="${r.id}">${r.ar}</button>`).join('')}</div>
        <button class="iconbtn">🔔<span class="dot"></span></button>
        <span class="avatar" style="background:${TP.me.sectorColor}">${TP.me.name[0]}</span>
      </div>
      <div class="body">
        <aside class="rail"><nav class="nav">
          ${nav.map(n=>`<button class="navlink ${S.route===n.r?'active':''}" data-go="${n.r}"><span class="ic">${n.ic}</span><span>${n.ar}</span></button>`).join('')}
        </nav></aside>
        <main class="content">${view}</main>
      </div>
      <nav class="bottomnav">
        ${tabs.map(t=>`<button class="${S.route===t[0]?'active':''}" data-go="${t[0]}"><span class="ic">${t[2]}</span><span>${t[1]}</span></button>`).join('')}
      </nav>`;
    window.scrollTo(0,0);
  }
  function go(route){ S.route = route; render(); }
  function setRole(r){ S.role = r; S.route = 'home'; render(); }

  /* ---- event delegation ---- */
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-go],[data-role],[data-goal-open],[data-approve],[data-approve-name],[data-x],[data-pick-pri],[data-pick-beh],[data-save-goal],[data-rec-beh],[data-send-rec],[data-pulse],[data-vconf],[data-send-voice],[data-cascade-done]');
    if (!t) return;
    const d = t.dataset;
    if (d.go) return go(d.go);
    if (d.role) return setRole(d.role);
    if (d.x === 'open') return openExperience();
    if (d.x === 'close') return closeExperience();
    if (d.x === 'download') { toast('تم تجهيز بطاقتك (نموذج تجريبي).'); return; }
    if (d.goalOpen) { S.activeGoal = d.goalOpen; return go('goal'); }
    if (d.approve) { const g=S.goals.find(x=>x.id===d.approve); if(g){g.status='active';} toast('تم اعتماد الهدف وتأكيد الوضوح ✔'); return go('goals'); }
    if (d.approveName) { toast(`تم اعتماد هدف ${d.approveName} ✔`); const m=TP.team.find(x=>x.name===d.approveName); if(m){m.pendingGoal=false;m.clarity=true;} return go('team'); }
    if (d.pickPri) { const a=S.draft.priorities; const i=a.indexOf(d.pickPri); i<0?a.push(d.pickPri):a.splice(i,1); return go('goalnew'); }
    if (d.pickBeh) { const a=S.draft.behaviors; const i=a.indexOf(d.pickBeh); i<0?a.push(d.pickBeh):a.splice(i,1); return go('goalnew'); }
    if (d.saveGoal) return saveGoal();
    if (d.recBeh) { S.give.behavior = (S.give.behavior===d.recBeh?'':d.recBeh); syncGive(); return go('give'); }
    if (d.sendRec) return sendRec();
    if (d.pulse) { const [q,n]=d.pulse.split(':'); S.pulseAns[q]=+n; toast('شكراً — تم تسجيل نبضك.'); return go('voice'); }
    if (d.vconf) { S.voiceConf = d.vconf; return go('voice'); }
    if (d.sendVoice) return sendVoice();
    if (d.cascadeDone) { toast('تم الإسناد وتأكيده ✔'); return go('team'); }
  });

  function syncGive(){ const to=$('#rec-to'); const msg=$('#rec-msg'); if(to)S.give.to=to.value; if(msg)S.give.msg=msg.value; }
  function saveGoal(){
    const title=$('#g-title').value.trim(); const desc=$('#g-desc').value.trim(); const kpi=$('#g-kpi').value.trim();
    S.draft.title=title;S.draft.desc=desc;S.draft.kpi=kpi;
    if(!title){ $('#g-flagnote').innerHTML='<div class="notice flag">يرجى إدخال عنوان الهدف.</div>'; return; }
    const linked = S.draft.priorities.length && S.draft.behaviors.length;
    const ng = { id:'g'+(S.goals.length+1), title, deptObj:'do1', priorities:[...S.draft.priorities], behaviors:[...S.draft.behaviors],
      kpis: kpi?[kpi]:['—'], status: linked?'pending':'flagged' };
    S.goals.push(ng);
    S.draft={ title:'', desc:'', priorities:[], behaviors:[], kpi:'' };
    toast(linked ? 'تم إرسال الهدف للمراجعة ✔' : '⚑ حُفظ الهدف بحالة «بحاجة لمراجعة» (الربط ناقص).');
    go('goals');
  }
  function sendRec(){
    syncGive();
    if(!S.give.to){ toast('اختر زميلاً أولاً.'); return; }
    if(!S.give.behavior){ toast('السلوك مطلوب — اختر سلوكاً.'); return; }
    S.feed.unshift({ from:TP.me.name, to:S.give.to, behavior:S.give.behavior });
    toast(`تم إرسال تقديرك إلى ${S.give.to} ✦`);
    S.give={ to:'', behavior:'', msg:'' };
    go('experience');
  }
  function sendVoice(){
    const txt=$('#voice-text').value.trim();
    if(!txt){ toast('اكتب رأيك أولاً.'); return; }
    S.voice.unshift({ id:'v'+(S.voice.length+1), text:txt, conf:S.voiceConf, status:'open', response:null });
    toast(S.voiceConf==='anon' ? 'تم الإرسال (مجهول — تجميعي n≥٥).' : 'تم إرسال صوتك — ستتابع حالته.');
    go('voice');
  }

  /* boot */
  render();
})();
