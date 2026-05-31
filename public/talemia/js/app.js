/* ==========================================================================
   TALEMIA · EXPERIENCE PLATFORM — REDESIGN APP
   Scope of this build: Foundations + Home + Golden Thread + Signature Exp.
   Other routes show an elegant "coming in next pass" placeholder.
   ========================================================================== */
(function () {
  'use strict';
  const $ = (s,r=document)=>r.querySelector(s);
  const I = (n,c)=>window.ICON(n,c||'ic');
  const beh = id => TP.behaviors.find(b=>b.id===id)||{};
  const pri = id => TP.priorities.find(p=>p.id===id)||{};

  const S = { role:'employee', route:'home', draft:{title:'',priorities:[],behaviors:[]} };

  /* ---------------- nav config ---------------- */
  const NAV = {
    employee:[['home','الرئيسية','home'],['himmah','هِمّتي','spark'],['thread','خط الرؤية','thread'],['goals','أهدافي','target'],
      ['conversations','محادثاتي','chat'],['experience','تجربتي','star'],['voice','الصوت','voice'],['profile','ملفي','user']],
    manager:[['home','الرئيسية','home'],['team','فريقي','team'],['thread','خط الرؤية','thread'],['experience','التجارب','star']],
    executive:[['home','الرئيسية','home'],['organization','المنظمة','org'],['thread','خط الرؤية','thread'],['experience','التجارب','star']],
    change:[['cmdash','لوحة التغيير','console'],['organization','المنظمة','org'],['thread','خط الرؤية','thread']],
  };
  const TABS = {
    employee:[['home','الرئيسية','home'],['himmah','هِمّتي','spark'],['thread','المسار','thread'],['voice','الصوت','voice'],['profile','ملفي','user']],
    manager:[['home','الرئيسية','home'],['team','فريقي','team'],['thread','المسار','thread'],['experience','التجارب','star']],
    executive:[['home','الرئيسية','home'],['organization','المنظمة','org'],['thread','المسار','thread'],['experience','التجارب','star']],
    change:[['cmdash','اللوحة','console'],['organization','المنظمة','org'],['thread','المسار','thread']],
  };
  const ROUTE_TITLES = { home:'الرئيسية', himmah:'رحلة الهِمّة', thread:'خط الرؤية الاستراتيجي', goals:'أهدافي ومؤشراتي',
    conversations:'محادثاتي', experience:'تجربتي', voice:'الصوت', profile:'ملفي المهني',
    team:'فريقي', organization:'المنظمة', cmdash:'لوحة إدارة التغيير' };

  /* ---------------- helpers ---------------- */
  const losPct = ()=>{ const n=TP.goals.length, ok=TP.goals.filter(g=>g.priorities.length&&g.behaviors.length).length; return Math.round(ok/n*100); };
  const avColor = name=>{ const c=['#2C5F90','#1B3A5C','#2EA1A1','#5FA570','#90C685']; let s=0; for(const ch of name)s+=ch.charCodeAt(0); return c[s%c.length]; };
  let tT; function toast(m){ let t=$('#toast'); if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t);} t.textContent=m; t.classList.add('show'); clearTimeout(tT); tT=setTimeout(()=>t.classList.remove('show'),2600); }
  /* Himmah: a personal DEVELOPMENT JOURNEY — RULE-BASED stages, NO numbers anywhere.
     Each pillar maps activity FACTS -> one of: seed | grow | bloom | inspire. */
  const STAGE_ORDER = ['seed','grow','bloom','inspire'];
  const stageMeta = tone => COPY.himmah.stages.find(s=>s.tone===tone) || COPY.himmah.stages[0];
  function pillarStage(key){
    const f = TP.himmahFacts;
    switch(key){
      case 'alignment': {
        const allPriority = f.activeGoals>0 && f.goalsLinkedToPriority>=f.activeGoals;
        const allBehavior = f.activeGoals>0 && f.goalsLinkedToBehavior>=f.activeGoals;
        const some = f.goalsLinkedToPriority>0 || f.goalsLinkedToBehavior>0;
        if(allPriority && allBehavior && f.clarityConfirmed) return 'inspire'; // sustained + confirmed
        if(allPriority && allBehavior) return 'bloom';   // rule: all active goals linked to a priority AND a behavior
        if(some) return 'grow';
        return 'seed';
      }
      case 'participation': {
        const n = (f.pulseDone?1:0)+(f.voiceShared?1:0)+(f.oneOnOneAttended?1:0);
        return STAGE_ORDER[Math.min(n,3)]; // 0..3 facts -> seed/grow/bloom/inspire
      }
      case 'development': {
        const n = (f.skillsUpdated?1:0)+((f.devActionsDone>0)?1:0)+(f.learningParticipated?1:0);
        return STAGE_ORDER[Math.min(n,3)];
      }
      case 'contribution': {
        const n = (f.contributedToGoals?1:0)+((f.meaningfulRecognitionSent>0)?1:0)+(f.knowledgeShared?1:0)+(f.supportedOthers?1:0);
        // 4 ways of contributing -> map to 4 stages
        return STAGE_ORDER[Math.max(0,Math.min(n,4)-1)];
      }
      default: return 'seed';
    }
  }
  const PILLAR_KEYS = ['alignment','contribution','development','participation'];
  /* overall = the typical (lowest) stage across pillars — encourages balanced growth, no number */
  function overallStage(){ const idxs=PILLAR_KEYS.map(k=>STAGE_ORDER.indexOf(pillarStage(k)));
    return COPY.himmah.overall[ STAGE_ORDER[Math.min(...idxs)] ]; }
  /* mini journey dots for the home card (stage reached) */
  function journeyDots(key){ const idx=STAGE_ORDER.indexOf(pillarStage(key));
    return `<div class="jdots">${STAGE_ORDER.map((t,i)=>`<span class="jdot ${i<=idx?'on':''}" title="${stageMeta(t).ar}"></span>${i<3?'<span class="jline '+(i<idx?'on':'')+'"></span>':''}`).join('')}</div>`; }

  /* ============================================================
     HOME — inspiring, editorial, dual-mode balanced
     ============================================================ */
  function home(){
    if(S.role==='manager') return managerHome();
    if(S.role==='executive') return execHome();
    const rec = TP.recv[0];
    const pending = TP.goals.filter(g=>g.status==='pending').length;
    const flagged = TP.goals.filter(g=>g.status==='flagged').length;
    return `
    <section class="hero reveal">
      <span class="ring r1"></span><span class="ring r2"></span>
      <img class="hero-logo float" src="assets/talemia-logo-white.png" alt="التعليمية">
      <div class="eyebrow">صبغتُنا · أنا تعليمي</div>
      <h1>صباح الخير، ${TP.me.first}.</h1>
      <p class="lead">عملك اليوم يصنع أثراً في منظومة التعليم. هذه رحلتك — من أهدافك الشخصية إلى أولويات تَعليميَّة ٢٠٢٦.</p>
      <div class="cta-row">
        <button class="btn green" data-x="open">${I('spark')} افتح بطاقة تقديرك</button>
        <button class="btn ghost" style="background:rgba(255,255,255,.12);box-shadow:inset 0 0 0 1px rgba(255,255,255,.25);color:#fff" data-go="thread">${I('thread')} استكشف مسارك</button>
      </div>
    </section>

    <div class="grid g-7-5 reveal d2" style="margin-top:22px">
      <!-- ALIGNMENT column -->
      <div class="stack">
        <div class="card lift" style="cursor:pointer" data-go="himmah">
          <div class="h">${I('spark','ic-lg')}<h3>رحلة الهِمّة</h3><span class="tag info" style="margin-inline-start:auto">${overallStage().ar}</span></div>
          <p class="soft" style="margin-bottom:14px">${overallStage().msg}</p>
          <div class="hpills">
            ${PILLAR_KEYS.map(k=>{ const p=COPY.himmah.pillars[k]; return `<div class="hpill">
              <span class="hpill-ic">${I(p.icon,'ic-sm')}</span>
              <div class="grow"><div class="hpill-t">${p.ar}</div><div class="hpill-st">${stageMeta(pillarStage(k)).ar}</div></div>
              ${journeyDots(k)}</div>`; }).join('')}
          </div>
          <div class="rowflex" style="margin-top:14px"><span class="btn ghost sm">${I('arrow')} اكتشف رحلتك</span></div>
        </div>
        <div class="card">
          <div class="h">${I('thread','ic-lg')}<h3>خط الرؤية — مسارك إلى ٢٠٢٦</h3></div>
          <div class="rowflex" style="justify-content:space-between">
            <div class="donut" style="--p:${losPct()}"><div class="hole"><b class="tnum">${losPct()}%</b></div></div>
            <div style="flex:1;min-width:180px">
              <p class="soft" style="margin-bottom:12px">نسبة أهدافك المرتبطة بأولوية وسلوك من الصبغة الجينية.</p>
              ${ribbon()}
            </div>
          </div>
        </div>
        <div class="card">
          <div class="h">${I('target','ic-lg')}<h3>يحتاج انتباهك</h3></div>
          ${flagged?`<div class="notice flag" style="margin-bottom:10px">${I('flag','ic-sm')} لديك ${flagged} هدف بحاجة لإكمال الربط.</div>`:''}
          ${pending?`<div class="notice info" style="margin-bottom:10px">${I('check','ic-sm')} ${pending} هدف بانتظار اعتماد مديرك.</div>`:''}
          <div class="notice privacy">${I('voice','ic-sm')} نبض جديد بانتظارك — رأيك يصنع فرقاً.</div>
          <div class="rowflex" style="margin-top:14px">
            <button class="btn primary sm" data-go="goals">${I('target')} أهدافي</button>
            <button class="btn ghost sm" data-go="voice">${I('voice')} شارك صوتك</button>
          </div>
        </div>
      </div>

      <!-- EXPERIENCE column (warm) -->
      <div class="stack">
        <div class="card lift" style="background:radial-gradient(120% 120% at 90% -10%,rgba(108,190,153,.5),transparent 55%),linear-gradient(140deg,#0E2533,#16384F);color:#fff;border:none;cursor:pointer" data-x="open">
          <div class="eyebrow" style="color:var(--green-2)">تجربة توقيعية</div>
          <h3 style="color:#fff;font-size:22px;margin:8px 0">بطاقة التقدير السنوي بانتظارك</h3>
          <p style="color:rgba(250,247,241,.82);font-size:15px">رسالة شخصية موقّعة من القيادة — تنتظر فقط أن تفتحها.</p>
          <div class="rowflex" style="margin-top:16px"><span class="btn green sm">${I('spark')} افتح تجربتك</span></div>
        </div>
        <div class="rec lift">
          <div class="pill beh">${I(beh(rec.behavior).icon,'ic-sm')} ${beh(rec.behavior).ar}</div>
          <p class="quote">"${rec.msg}"</p>
          <div class="by">— ${rec.from} · ${rec.role} · ${rec.when}</div>
        </div>
      </div>
    </div>`;
  }

  function ribbon(){
    const segs=['الاستراتيجية','أولوية ٢٠٢٦','هدف الإدارة','أهدافي','مؤشراتي','سلوكي'];
    return `<div class="ribbon">${segs.map((s,i)=>`<div class="seg s${i+1}"><div class="k">${i+1<10?'٠'+(i+1):i+1}</div><div class="v">${s}</div></div>`).join('')}</div>`;
  }

  /* ============================================================
     GOLDEN THREAD — the showpiece vertical cascade
     ============================================================ */
  function thread(){
    const g = TP.goals[0];
    const nodes = [
      { k:'الاستراتيجية', v:'الشريك الوطني الموثوق', sub:'رؤية التعليمية ٢٠٣٠', icon:'compass', on:true },
      { k:'أولوية ٢٠٢٦', v:pri(g.priorities[0]).ar, sub:'إحدى أولويات تَعليميَّة الستّ', icon:'star', on:true },
      { k:'هدف الإدارة', v:TP.deptObjective.ar, sub:'قطاع المحتوى والمناهج', icon:'org', on:true },
      { k:'هدفي', v:g.title, sub:'هدفك الشخصي لهذا العام', icon:'target', on:true },
      { k:'مؤشراتي', v:g.kpis.join(' · '), sub:'كيف نقيس الأثر', icon:'growth', on:true },
      { k:'سلوكي', v:g.behaviors.map(b=>beh(b).ar).join(' + '), sub:'صبغتنا الجينية في العمل', icon:'spark', on:true },
    ];
    return `
    <div class="sec-head reveal"><div><h2 class="grad-warm">خيط الرؤية الذهبي</h2>
      <div class="desc">من استراتيجية التعليمية إلى سلوكك اليومي — مسار واحد متّصل، يجعل لكل جهدٍ معنى.</div></div>
      <div class="donut" style="--p:${losPct()};width:84px;height:84px"><div class="hole" style="width:58px;height:58px"><b class="tnum" style="font-size:18px">${losPct()}%</b></div></div>
    </div>
    <div class="card pad-lg reveal d2">
      <div class="thread">
        <div class="track"></div>
        ${nodes.map((n,i)=>`
          <div class="node ${n.on?'on':''} reveal d${Math.min(i+1,6)}">
            <div class="dot"><div class="ring2">${I(n.icon)}</div></div>
            <div class="body"><div class="k">${n.k}</div><div class="v">${n.v}</div><div class="sub">${n.sub}</div>
              ${n.k==='سلوكي'?`<div class="meta" style="display:flex;gap:7px;margin-top:8px">${g.behaviors.map(b=>`<span class="pill beh">${I(beh(b).icon,'ic-sm')} ${beh(b).ar}</span>`).join('')}</div>`:''}
            </div>
          </div>`).join('')}
      </div>
      <div class="notice info" style="margin-top:10px">${I('check','ic-sm')} هذا الهدف مرتبط بالكامل — أولوية واضحة وسلوك واضح. كل عملك يصبّ في رؤية التعليمية.</div>
    </div>`;
  }

  /* ============================================================
     HIMMAH — personal, developmental (no comparison/ranking)
     ============================================================ */
  function himmah(){
    const m=TP.myMetrics, ov=overallStage(), P=COPY.himmah.pillars;
    const pillarCard=(key)=>{ const p=P[key], tone=pillarStage(key), st=stageMeta(tone); return `
      <div class="card flat hp-card reveal">
        <div class="h" style="margin-bottom:10px"><span class="hpill-ic lg">${I(p.icon)}</span>
          <div><h3 style="font-size:17px">${p.ar}</h3><span class="tag mute">المرحلة: ${st.ar}</span></div></div>
        <p class="soft" style="font-size:13.5px;margin-bottom:14px">${p.d}</p>
        ${journeyPath(tone)}
        <div class="hp-insight">${I('compass','ic-sm')} <span>${p.insight[tone]}</span></div>
        <div class="hp-next">${I('arrow','ic-sm')} <div><span class="hp-next-k">خطوتك القادمة</span><span>${p.next[tone]}</span></div></div>
      </div>`; };
    const stat=(lbl,v,ic)=>`<div class="kpi" style="padding:18px"><div class="rowflex" style="gap:11px"><span style="color:var(--teal)">${I(ic)}</span><div><div class="num tnum" style="font-size:26px">${v}</div><div class="lbl">${lbl}</div></div></div></div>`;
    return `
    <div class="sec-head reveal"><div><h2 class="grad-warm">${COPY.himmah.title}</h2><div class="desc">${COPY.himmah.sub}</div></div></div>

    <div class="card pad-lg reveal d2" style="background:radial-gradient(120% 130% at 88% -20%,rgba(108,190,153,.20),transparent 55%)">
      <span class="tag info">${ov.ar}</span>
      <h2 style="margin:12px 0 8px;max-width:34ch">${ov.msg}</h2>
      <p class="soft">رحلة الهِمّة ليست رقماً ولا ترتيباً — هي مسارُك أنت في أربع ركائز، تنمو بخطواتك.</p>
      <div class="journey-legend">${COPY.himmah.stages.map((s,i)=>`<span class="jl"><span class="jdot on s${i}"></span>${s.ar}</span>`).join('<span class="jl-arr">←</span>')}</div>
    </div>

    <div class="sec-head reveal d3" style="margin-top:24px"><div><h2 style="font-size:22px">ركائز رحلتك الأربع</h2>
      <div class="desc">لكل ركيزة مرحلتها وإضاءةٌ تطويرية تدعم خطوتك القادمة.</div></div></div>
    <div class="grid g4 reveal d3">${['alignment','contribution','development','participation'].map(pillarCard).join('')}</div>

    <div class="sec-head reveal d4" style="margin-top:24px"><div><h2 style="font-size:22px">إسهامك ومشاركتك</h2>
      <div class="desc">${COPY.himmah.growthLabel}</div></div></div>
    <div class="grid g4 reveal d4">
      ${stat('تقدير قدّمته لزملائك',m.recSent,'heart')}
      ${stat('مرّات شاركت صوتك',m.fbShared,'voice')}
      ${stat('جلسات معرفة وتواصل',m.knowledge+m.coffee,'team')}
      ${stat('محادثات تطوير مع مديرك',m.conversations,'chat')}
    </div>

    <div class="notice info reveal d5" style="margin-top:18px">${I('shield','ic-sm')} ${COPY.himmah.note}</div>`;
  }
  /* full horizontal journey path with stage labels (no numbers) */
  function journeyPath(tone){ const idx=STAGE_ORDER.indexOf(tone);
    return `<div class="jpath">${COPY.himmah.stages.map((s,i)=>`
      <div class="jstep ${i<idx?'done':i===idx?'cur':''}"><span class="jnode">${i<=idx?I('check','ic-sm'):''}</span><span class="jlabel">${s.ar}</span></div>
      ${i<3?`<span class="jbar ${i<idx?'on':''}"></span>`:''}`).join('')}</div>`; }

  /* ============================================================
     CHANGE MANAGEMENT DASHBOARD (Operations layer — HC & Change Mgmt)
     Aggregate + SUPPORTIVE follow-up. No employee rankings.
     ============================================================ */
  function cmStat(lbl,val,sub,ic,tone){ return `<div class="kpi lift"><div class="glow"></div>
    <div class="rowflex" style="gap:11px;align-items:flex-start"><span style="color:var(--${tone||'teal'})">${I(ic)}</span>
      <div><div class="num tnum">${val}</div><div class="lbl">${lbl}</div>${sub?`<div class="delta up">${sub}</div>`:''}</div></div></div>`; }
  function splitBar(done,pending,doneL,pendL){ const t=done+pending,p=Math.round(done/t*100);
    return `<div class="splitbar"><div class="sb-fill" style="width:${p}%"></div></div>
      <div class="rowflex" style="justify-content:space-between;margin-top:8px;font-size:13px;font-weight:700">
        <span style="color:var(--success)">${doneL}: ${done}</span><span style="color:var(--flag)">${pendL}: ${pending}</span></div>`; }

  function cmdash(){
    const c=TP.cm;
    const ops=c.sectorOps;
    const heat=(v)=>{ const a=Math.max(.12,Math.min(1,v/100)); return `background:rgba(46,161,161,${a});color:${v>=60?'#fff':'#13303D'}`; };
    return `
    <section class="hero reveal" style="background:radial-gradient(120% 140% at 88% -20%,rgba(46,161,161,.5),transparent 55%),linear-gradient(120deg,#0E2533,#16384F)">
      <span class="ring r1"></span><span class="ring r2"></span>
      <img class="hero-logo float" src="assets/talemia-logo-white.png" alt="التعليمية">
      <div class="eyebrow" style="color:var(--green-2)">إدارة التغيير · المتابعة التشغيلية</div>
      <h1>لوحة قيادة التغيير</h1>
      <p class="lead">متابعةٌ داعمة لمشاركة المنظومة وتبنّيها — لتمكين الفرق، لا لمقارنتها. كل مؤشّر يقترن بإجراء متابعةٍ لطيف.</p>
    </section>

    <!-- KPI row -->
    <div class="grid g4 reveal d2" style="margin-top:22px">
      ${cmStat('معدّل المشاركة', c.participationRate+'%','مشاركة المنظومة','team')}
      ${cmStat('معدّل التبنّي', c.adoptionRate+'%','نحو التجذّر','growth')}
      ${cmStat('تقدير هذا الشهر', c.recognitionThisMonth, c.recognitionTrend+' عن السابق','heart')}
      ${cmStat('اعتماد الأهداف', Math.round(c.goalsApproved/(c.goalsApproved+c.goalsAwaiting)*100)+'%','من الأهداف المرسلة','target')}
    </div>

    <!-- Participation & 1:1 split -->
    <div class="grid g2 reveal d3" style="margin-top:20px">
      <div class="card"><div class="h">${I('voice','ic-lg')}<h3>مشاركة التغذية الراجعة</h3></div>
        ${splitBar(c.feedbackGiven,c.feedbackPending,'شاركوا','بانتظار المشاركة')}
        <p class="soft" style="margin-top:10px;font-size:13px">${c.feedbackGiven} موظفاً شاركوا صوتهم؛ ${c.feedbackPending} بانتظار دعوةٍ ودّية للمشاركة.</p>
      </div>
      <div class="card"><div class="h">${I('chat','ic-lg')}<h3>محادثات ١:١ (المدراء)</h3></div>
        ${splitBar(c.oneOnOneDone,c.oneOnOnePending,'أكملوا','لم يُكملوا')}
        <p class="soft" style="margin-top:10px;font-size:13px">${c.oneOnOneDone} من ${c.managersTotal} مديراً أكملوا محادثات التوافق؛ ${c.oneOnOnePending} بحاجة لتذكيرٍ داعم.</p>
      </div>
    </div>

    <!-- Goal approval funnel -->
    <div class="card reveal d3" style="margin-top:20px"><div class="h">${I('target','ic-lg')}<h3>حالة اعتماد الأهداف</h3></div>
      <div class="grid g3">
        ${cmStat('معتمدة', c.goalsApproved,'مكتملة الربط والاعتماد','check','success')}
        ${cmStat('بانتظار الاعتماد', c.goalsAwaiting,'لدى المدراء','chat','flag')}
        ${cmStat('بحاجة لمراجعة', c.goalsFlagged,'ربط ناقص (غير محظور)','flag','flag')}
      </div>
    </div>

    <!-- Operational heatmap by sector -->
    <div class="card reveal d4" style="margin-top:20px"><div class="h">${I('grid','ic-lg')}<h3>خريطة حرارية تشغيلية — حسب القطاع</h3>
      <span class="tag mute" style="margin-inline-start:auto">تجميعي · n ≥ ٥</span></div>
      <div class="heat">
        <div class="heat-row heat-head"><span class="heat-name">القطاع</span>
          <span>المشاركة</span><span>التغذية الراجعة</span><span>الأهداف</span><span>١:١</span><span>التبنّي</span></div>
        ${ops.map(s=>`<div class="heat-row"><span class="heat-name"><span class="sdot" style="background:${s.c}"></span> ${s.ar}</span>
          <span class="heat-cell" style="${heat(s.participation)}">${s.participation}</span>
          <span class="heat-cell" style="${heat(s.feedback)}">${s.feedback}</span>
          <span class="heat-cell" style="${heat(s.goals)}">${s.goals}</span>
          <span class="heat-cell" style="${heat(s.oneonone)}">${s.oneonone}</span>
          <span class="heat-cell" style="${heat(s.adoption)}">${s.adoption}</span></div>`).join('')}
      </div>
    </div>

    <!-- Supportive follow-up (HC & Change Mgmt only) -->
    <div class="grid g2 reveal d5" style="margin-top:20px">
      <div class="card"><div class="h">${I('compass','ic-lg')}<h3>متابعة داعمة — مشاركة التغذية الراجعة</h3></div>
        ${c.followUp.noFeedback.map(f=>`<div class="lrow"><div class="grow"><div class="title">${f.sector}</div>
          <div class="soft" style="font-size:13px">${f.pending} من ${f.total} بانتظار المشاركة</div></div>
          <button class="btn ghost sm" data-toast="تم إرسال دعوة ودّية للمشاركة إلى ${f.sector}">${I('voice')} دعوة لطيفة</button></div>`).join('')}
      </div>
      <div class="card"><div class="h">${I('chat','ic-lg')}<h3>متابعة داعمة — محادثات ١:١</h3></div>
        ${c.followUp.pendingOneOnOne.map(m=>`<div class="lrow"><div class="grow"><div class="title">${m.name}</div>
          <div class="soft" style="font-size:13px">أكمل ${m.done} من ${m.team} محادثة</div></div>
          <button class="btn ghost sm" data-toast="تم إرسال تذكير داعم إلى ${m.name}">${I('arrow')} تذكير داعم</button></div>`).join('')}
      </div>
    </div>
    <div class="notice privacy reveal d5" style="margin-top:18px">${I('shield','ic-sm')} قوائم المتابعة داعمة وتمكينية — لتقديم العون لا للمحاسبة. مرئيّة لإدارة التغيير والموارد البشرية فقط، ولا تُعرَض كترتيبٍ للأفراد.</div>`;
  }

  /* ============================================================
     MANAGER / EXECUTIVE home (light, for context)
     ============================================================ */
  function managerHome(){
    const clarity=Math.round(TP.team.filter(t=>t.clarity).length/TP.team.length*100);
    return `
    <section class="hero reveal" style="background:radial-gradient(120% 140% at 90% -20%,rgba(46,161,161,.5),transparent 55%),linear-gradient(120deg,#0E2533,#1c4a63)">
      <span class="ring r1"></span>
      <div class="eyebrow" style="color:var(--green-2)">قيادة الفريق</div>
      <h1>أهلاً، قائد المحتوى.</h1>
      <p class="lead">أنت محور تجربة فريقك. وضوحٌ، تقديرٌ، وإصغاء — هذا ما يحرّك الأثر.</p>
    </section>
    <div class="grid g3 reveal d2" style="margin-top:22px">
      ${kpi('وضوح الفريق', clarity+'%', 'up', 'تحسّن هذا الربع')}
      ${kpi('محادثات ١:١', TP.team.filter(t=>t.conv).length+'/'+TP.team.length, 'up','مكتملة')}
      ${kpi('تقدير هذا الأسبوع', '٧', 'up','سلوكيات مُعزَّزة')}
    </div>
    <div class="card reveal d3" style="margin-top:20px">
      <div class="h">${I('team','ic-lg')}<h3>فريقك</h3></div>
      ${TP.team.map(t=>`<div class="lrow"><span class="avatar sm" style="background:${avColor(t.name)}">${t.name[0]}</span>
        <div class="grow"><div class="title">${t.name}</div><div class="meta">
        ${t.clarity?'<span class="tag ok">وضوح ✓</span>':'<span class="tag warn">وضوح ناقص</span>'}
        <span class="tag mute">أهداف ${t.goals}</span>${t.voice?`<span class="tag info">صوت ${t.voice}</span>`:''}</div></div>
        ${t.pending?'<button class="btn green sm" data-toast="تم اعتماد الهدف ✓">اعتماد</button>':''}</div>`).join('')}
    </div>`;
  }
  function execHome(){
    const o=TP.org;
    return `
    <section class="hero reveal" style="background:radial-gradient(120% 140% at 88% -20%,rgba(108,190,153,.5),transparent 55%),linear-gradient(120deg,#0E2533,#16384F)">
      <span class="ring r1"></span><span class="ring r2"></span>
      <div class="eyebrow" style="color:var(--green-2)">صحة المنظومة · عرض تجميعي</div>
      <h1>نبض التعليمية.</h1>
      <p class="lead">صورة واحدة واضحة لصحة المنظمة — تفاعلاً، سلوكاً، ومواءمةً استراتيجية. لا تظهر بيانات أفراد.</p>
    </section>
    <div class="grid g4 reveal d2" style="margin-top:22px">
      ${kpi('التفاعل (مئوي)', o.engagement+'<small> %ile</small>','up','مسار التحسّن')}
      ${kpi('eNPS', o.enps,'up','نحو الموجب')}
      ${kpi('اكتمال خط الرؤية', o.los+'%','up','مواءمة استراتيجية')}
      ${kpi('حضور «الأثر»', o.behaviorPrev[6]+'%','up','السلوك الأبرز')}
    </div>
    <div class="grid g2 reveal d3" style="margin-top:20px">
      <div class="card"><div class="h">${I('voice','ic-lg')}<h3>حضور السلوكيات (صبغتنا — ١٢)</h3></div>
        <div class="chart">${o.behaviorPrev.map((v,i)=>`<div class="bar" style="height:${v}%" data-v="${v}" title="${TP.behaviors[i].ar}"></div>`).join('')}</div></div>
      <div class="card"><div class="h">${I('growth','ic-lg')}<h3>مراحل التبنّي</h3></div>
        ${o.adoption.map(a=>`<div class="fbar"><span class="name">${a[0]}</span><div class="track"><div class="fill" style="width:${a[1]/29*100}%"></div></div><span class="pct">${a[1]}%</span></div>`).join('')}
        <div class="notice privacy" style="margin-top:12px">${I('shield','ic-sm')} عرض تجميعي · حدّ الإخفاء n ≥ ٥ · لا تظهر بيانات أفراد.</div></div>
    </div>`;
  }
  function kpi(lbl,num,dir,delta){ return `<div class="kpi lift"><div class="glow"></div><div class="lbl">${lbl}</div>
    <div class="num tnum">${num}</div><div class="delta ${dir}">${I(dir==='up'?'growth':'arrow','ic-sm')} ${delta}</div></div>`; }

  /* ============================================================
     PLACEHOLDER (routes not in this redesign pass)
     ============================================================ */
  function placeholder(title){
    return `<div class="card pad-lg reveal" style="text-align:center;padding:64px 32px">
      <div class="eq lg animate" style="justify-content:center;height:54px;margin-bottom:20px"><i></i><i></i><i></i><i></i><i></i></div>
      <h2 class="grad-warm">${title}</h2>
      <p class="soft" style="max-width:46ch;margin:12px auto 0">هذه الشاشة ستُعاد بنفس مستوى الجودة الجديد في الجولة القادمة. هذه المعاينة تركّز على
      <b>الأسس، الرئيسية، خط الرؤية، والتجربة التوقيعية</b> — لتعتمد مستوى الجودة أولاً.</p>
      <button class="btn primary" style="margin-top:22px" data-go="home">${I('arrow')} رجوع للرئيسية</button>
    </div>`;
  }

  /* simple goals view to support the thread story (kept light this pass) */
  function goals(){
    return `<div class="sec-head reveal"><div><h2>أهدافي ومؤشراتي</h2>
      <div class="desc">كل هدف يرتبط بأولوية ٢٠٢٦ وسلوك من صبغتنا — هذا ما يصنع خط الرؤية.</div></div>
      <button class="btn primary" data-toast="نموذج إنشاء الهدف يُعرض في الجولة القادمة">${I('plus')} هدف جديد</button></div>
    ${TP.goals.map(g=>`<div class="lrow reveal"><div class="ring2" style="width:46px;height:46px;border-radius:14px;display:grid;place-items:center;background:${g.status==='active'?'linear-gradient(135deg,var(--teal),var(--green-2))':'#fff'};color:${g.status==='active'?'#fff':'var(--teal)'};box-shadow:var(--sh-1)">${I('target')}</div>
      <div class="grow"><div class="title">${g.title}</div><div class="meta">
        ${g.priorities.length?g.priorities.map(p=>`<span class="pill pri">${I('star','ic-sm')} ${pri(p).ar}</span>`).join(''):'<span class="pill flag">'+I('flag','ic-sm')+' أولوية ناقصة</span>'}
        ${g.behaviors.length?g.behaviors.map(b=>`<span class="pill beh">${I(beh(b).icon,'ic-sm')} ${beh(b).ar}</span>`).join(''):'<span class="pill flag">'+I('flag','ic-sm')+' سلوك ناقص</span>'}
      </div></div>
      <span class="tag ${g.status==='active'?'ok':g.status==='pending'?'info':'warn'}">${g.status==='active'?'نشط':g.status==='pending'?'بانتظار اعتماد':'بحاجة لمراجعة'}</span></div>`).join('')}`;
  }

  /* ============================================================
     SIGNATURE EXPERIENCE — cinematic overlay
     ============================================================ */
  function openExperience(){
    const me=TP.me;
    const ov=document.createElement('div'); ov.id='xp'; ov.className='xp';
    ov.innerHTML=`
      <audio id="xaudio" src="audio/signature-bg.wav" loop></audio>
      <div class="xp-bg"></div>
      <div class="xp-top">
        <button class="xp-pill" id="xmute">${I('play','ic-sm')} <span>الموسيقى</span></button>
        <button class="xp-pill" data-x="close">${I('close','ic-sm')} إغلاق</button>
      </div>
      <div class="xp-scroll">
        <div class="xp-stage">
          <img class="xp-logo xp-r" style="--d:.1s" src="assets/talemia-logo-white.png" alt="التعليمية">
          <div class="xp-kicker xp-r" style="--d:.3s">برنامج التقدير السنوي · ٢٠٢٦</div>
          <div class="xp-tribute xp-r" style="--d:.6s">تكريــمــاً لـ</div>
          <h1 class="xp-name xp-r" style="--d:.9s">${me.name}</h1>
          <div class="xp-sector xp-r" style="--d:1.2s">${me.sector}</div>
          <p class="xp-story xp-r" style="--d:1.6s">بعض الأسماء لا تمرّ… بل تترك <b>أثراً</b>.</p>
          <p class="xp-story sub xp-r" style="--d:2s">تقديراً لأثرك الباقي في التعليمية — أثرُك يصنع التعليمية.</p>
          <div class="xp-seal xp-r" style="--d:2.4s">
            <svg viewBox="0 0 200 200" class="xp-seal-svg">
              <defs><path id="cp" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"/></defs>
              <circle cx="100" cy="100" r="86" fill="none" stroke="rgba(108,190,153,.35)" stroke-width="1" stroke-dasharray="3 5"/>
              <circle cx="100" cy="100" r="74" fill="none" stroke="rgba(108,190,153,.6)" stroke-width="2"/>
              <text fill="#90C685" font-size="13" font-weight="700" letter-spacing="3">
                <textPath href="#cp" startOffset="0%">✦ التعليمية ✦ تقدير ✦ التعليمية ✦ تقدير </textPath></text>
              <g class="xp-seal-core"><text x="100" y="92" text-anchor="middle" fill="#FAF7F1" font-size="21" font-weight="900">أثر</text>
              <text x="100" y="118" text-anchor="middle" fill="#90C685" font-size="13" font-weight="700">٢٠٢٦</text></g>
            </svg>
          </div>
          <div class="xp-sign xp-r" style="--d:2.8s">مع وافر الامتنان والتقدير<br><span>الإدارة العامة للاستراتيجية ◆ إدارة التغيير</span></div>

          <div class="xp-divider xp-r" style="--d:3s"></div>
          <div class="xp-sec-k xp-r" style="--d:3.1s">صِبغـتُـنــا الجينيّة</div>
          <div class="xp-sec-sub xp-r" style="--d:3.2s">الشِّفرة التي تحدّد من نحن</div>
          <div class="xp-dna">${TP.behaviors.map((b,i)=>`<div class="xp-dna-it xp-r" style="--d:${3.3+i*.05}s">
            <div class="xp-dna-ic">${I(b.icon,'ic-sm')}</div><div><div class="t">${b.ar}</div><div class="d">${b.d}</div></div></div>`).join('')}</div>

          <div class="xp-divider xp-r"></div>
          <div class="xp-sec-k xp-r">قِيَمُنا الأربع</div>
          <div class="xp-core">${TP.core.map(v=>`<div class="xp-core-it xp-r"><div class="ar">${v.ar}</div><div class="en">${v.en}</div></div>`).join('')}</div>
          <div class="xp-eqline xp-r">قِيَمُنا مجتمعةً <span>= همّة</span></div>

          <div class="xp-actions xp-r">
            <button class="btn green lg" data-x="download">${I('download')} حمّل بطاقتك</button>
            <button class="btn ghost lg" style="background:rgba(255,255,255,.08);box-shadow:inset 0 0 0 1px rgba(108,190,153,.4);color:#90C685" data-x="close">تابع إلى منصتك</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(ov);
    document.body.style.overflow='hidden';
    requestAnimationFrame(()=>ov.classList.add('show'));
    const a=$('#xaudio'); a.volume=.55; const pr=a.play(); let playing=true; if(pr)pr.catch(()=>{playing=false;setMute();});
    function setMute(){ $('#xmute').innerHTML = (playing?window.ICON('pause','ic-sm')+' <span>الموسيقى</span>':window.ICON('play','ic-sm')+' <span>تشغيل</span>'); }
    setMute();
    $('#xmute').onclick=()=>{ if(a.paused){a.play();playing=true;}else{a.pause();playing=false;} setMute(); };
  }
  function closeExperience(){ const ov=$('#xp'); if(ov){ const a=$('#xaudio'); if(a)a.pause(); ov.classList.remove('show'); document.body.style.overflow=''; setTimeout(()=>ov.remove(),400);} }

  /* ============================================================
     SHELL + ROUTER
     ============================================================ */
  const VIEW = { home, himmah, thread, goals, cmdash,
    conversations:()=>placeholder('محادثاتي'), experience:()=>{ openExperience(); return home(); },
    voice:()=>placeholder('الصوت'), profile:()=>placeholder('ملفي المهني'),
    team:()=>placeholder('فريقي'), organization:execHome };

  function render(){
    const nav=NAV[S.role], tabs=TABS[S.role];
    const view=(VIEW[S.route]||home)();
    document.getElementById('app').innerHTML=`
      <div class="shell">
        <aside class="rail">
          <div class="brand"><img class="brand-logo" src="assets/talemia-logo.png" alt="التعليمية Talemia">
            <span class="brand-tag">EXPERIENCE</span></div>
          <nav class="nav">
            <div class="section">المنصّة</div>
            ${nav.map(n=>`<a class="${S.route===n[0]?'active':''}" data-go="${n[0]}">${I(n[2])}<span>${n[1]}</span></a>`).join('')}
          </nav>
          <div class="me"><span class="avatar sm" style="background:${TP.me.color}">${TP.me.name[0]}</span>
            <div style="min-width:0"><div style="font-weight:800;font-size:14px">${TP.me.name}</div><div class="muted" style="font-size:12px">${TP.me.sector}</div></div></div>
          <div class="viewas"><div class="lbl">استعراض كـ (للعرض)</div>
            <select id="roleSel">
              <option value="employee" ${S.role==='employee'?'selected':''}>موظف</option>
              <option value="manager" ${S.role==='manager'?'selected':''}>مدير</option>
              <option value="executive" ${S.role==='executive'?'selected':''}>قيادة</option>
              <option value="change" ${S.role==='change'?'selected':''}>إدارة التغيير</option>
            </select></div>
        </aside>
        <div class="main">
          <header class="topbar">
            <div class="crumb">${ROUTE_TITLES[S.route]||''}</div><div class="sp"></div>
            <button class="iconbtn">${I('bell','ic-sm')}<span class="dot"></span></button>
            <span class="avatar" style="background:${TP.me.color}">${TP.me.name[0]}</span>
          </header>
          <main class="canvas">${view}</main>
        </div>
      </div>
      <nav class="tabbar">${tabs.map(t=>`<a class="${S.route===t[0]?'active':''}" data-go="${t[0]}">${I(t[2])}<span>${t[1]}</span></a>`).join('')}</nav>`;
    const sel=$('#roleSel'); if(sel) sel.onchange=e=>{ S.role=e.target.value; S.route=(S.role==='change'?'cmdash':'home'); render(); };
    window.scrollTo(0,0);
  }
  function go(r){ if(r==='experience'){ openExperience(); return; } S.route=r; render(); }

  document.addEventListener('click', e=>{
    const t=e.target.closest('[data-go],[data-x],[data-toast]'); if(!t) return;
    if(t.dataset.go!==undefined) return go(t.dataset.go);
    if(t.dataset.x==='open') return openExperience();
    if(t.dataset.x==='close') return closeExperience();
    if(t.dataset.x==='download') return toast('تم تجهيز بطاقتك (نموذج تجريبي).');
    if(t.dataset.toast) return toast(t.dataset.toast);
  });

  render();
})();
