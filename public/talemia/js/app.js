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

  const S = { role:'employee', route:'home', cmTab:'overview',
    cmPeriod:'month', cmScope:'all', draft:{title:'',priorities:[],behaviors:[]} };

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

  /* heat cell color by value */
  const heatStyle = v=>{ const a=Math.max(.10,Math.min(1,v/100)); return `background:rgba(46,161,161,${a});color:${v>=58?'#fff':'#13303D'}`; };
  function sparkline(arr,w,h){ w=w||120;h=h||34; const mx=Math.max(...arr),mn=Math.min(...arr);
    const pts=arr.map((v,i)=>`${(i/(arr.length-1))*w},${h-((v-mn)/Math.max(1,mx-mn))*(h-6)-3}`).join(' ');
    return `<svg viewBox="0 0 ${w} ${h}" style="width:${w}px;height:${h}px"><polyline points="${pts}" fill="none" stroke="url(#hg)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <defs><linearGradient id="hg" x1="0" x2="1"><stop offset="0" stop-color="#2EA1A1"/><stop offset="1" stop-color="#90C685"/></linearGradient></defs></svg>`; }
  function heatTable(rows,cols,nameLabel){ return `<div class="heat"><div class="heat-row heat-head" style="grid-template-columns:1.7fr repeat(${cols.length},1fr)">
      <span class="heat-name">${nameLabel}</span>${cols.map(c=>`<span>${c.l}</span>`).join('')}</div>
      ${rows.map(r=>`<div class="heat-row" style="grid-template-columns:1.7fr repeat(${cols.length},1fr)">
        <span class="heat-name">${r.dot?`<span class="sdot" style="background:${r.dot}"></span>`:''} ${r.ar}${r.sub?`<span class="muted" style="font-size:11px"> · ${r.sub}</span>`:''}</span>
        ${cols.map(c=>`<span class="heat-cell" style="${heatStyle(r[c.k])}">${r[c.k]}</span>`).join('')}</div>`).join('')}</div>`; }

  /* ---- CM dashboard sub-tabs ---- */
  const CM_TABS = [
    ['overview','نظرة عامة','grid'],
    ['participation','المشاركة','voice'],
    ['managers','دعم المدراء','team'],
    ['recognition','التقدير والتفاعل','heart'],
    ['alignment','المواءمة الاستراتيجية','thread'],
    ['behaviors','صبغتنا الجينية','spark'],
    ['readiness','الجاهزية والخرائط','growth'],
    ['followup','المتابعة الداعمة','compass'],
  ];

  const PERIODS=[['week','أسبوع'],['month','شهر'],['quarter','ربع'],['year','سنة']];
  function cmScopeOptions(){
    const opts=['<option value="all">كل القطاعات والإدارات</option>'];
    opts.push('<optgroup label="القطاعات">'+TP.cm.sectorOps.map(s=>`<option value="sec:${s.ar}" ${S.cmScope==='sec:'+s.ar?'selected':''}>${s.ar}</option>`).join('')+'</optgroup>');
    opts.push('<optgroup label="الإدارات">'+TP.cm.deptOps.map(d=>`<option value="dep:${d.ar}" ${S.cmScope==='dep:'+d.ar?'selected':''}>${d.ar}</option>`).join('')+'</optgroup>');
    opts.push('<optgroup label="المدراء">'+TP.cm.managerOps.map(m=>`<option value="mgr:${m.ar}" ${S.cmScope==='mgr:'+m.ar?'selected':''}>${m.ar}</option>`).join('')+'</optgroup>');
    return opts.join('');
  }
  function cmFilters(){
    return `<div class="cmfilters reveal d2">
      <div class="seg-period">${PERIODS.map(p=>`<button class="${S.cmPeriod===p[0]?'on':''}" data-cmperiod="${p[0]}">${p[1]}</button>`).join('')}</div>
      <div class="cmscope">${I('grid','ic-sm')}<select id="cmScopeSel">${cmScopeOptions()}</select></div>
      ${S.cmScope!=='all'?`<span class="tag info">${I('compass','ic-sm')} مُصفّى: ${S.cmScope.split(':')[1]}</span>`:''}
    </div>`;
  }

  function cmdash(){
    const c=TP.cm; const tab=S.cmTab||'overview';
    const body = ({
      overview:cmOverview, participation:cmParticipation, managers:cmManagers,
      recognition:cmRecognition, alignment:cmAlignment, behaviors:cmBehaviors,
      readiness:cmReadiness, followup:cmFollowup,
    }[tab]||cmOverview)();
    return `
    <section class="hero reveal" style="background:radial-gradient(120% 140% at 88% -20%,rgba(46,161,161,.5),transparent 55%),linear-gradient(120deg,#0E2533,#16384F)">
      <span class="ring r1"></span><span class="ring r2"></span>
      <img class="hero-logo float" src="assets/talemia-logo-white.png" alt="التعليمية">
      <div class="eyebrow" style="color:var(--green-2)">إدارة التغيير · الموارد البشرية · مكتب الاستراتيجية</div>
      <h1>لوحة قيادة التغيير</h1>
      <p class="lead">متابعةٌ داعمة للتبنّي والمشاركة والجاهزية التنظيمية — لتمكين الفرق ودعمها، لا لمقارنتها أو محاسبتها.</p>
    </section>
    ${cmFilters()}
    <div class="cmtabs reveal d2">${CM_TABS.map(t=>`<button class="cmtab ${tab===t[0]?'on':''}" data-cmtab="${t[0]}">${I(t[2],'ic-sm')} ${t[1]}</button>`).join('')}</div>
    <div class="reveal d2" style="margin-top:18px">${body}</div>
    <div class="notice privacy reveal" style="margin-top:18px">${I('shield','ic-sm')} لوحة داعمة وتمكينية — لإدارة التغيير والموارد البشرية ومكتب الاستراتيجية. تجميعية (n ≥ ٥)، غير تنافسية، ولا تُستخدم للمحاسبة أو ترتيب الأفراد.</div>`;
  }

  /* 1 · Executive Summary + trends + improvement opportunities */
  function cmOverview(){ const c=TP.cm; const L=c.trendLabels;
    const exec=(lbl,val,ic)=>`<div class="exec-cell"><span class="exec-ic">${I(ic,'ic-sm')}</span><div><div class="exec-v tnum">${val}</div><div class="exec-l">${lbl}</div></div></div>`;
    const lineChart=(arr,label,col)=>{ const mx=Math.max(...arr),mn=Math.min(...arr)-2,W=300,H=90;
      const pts=arr.map((v,i)=>`${(i/(arr.length-1))*W},${H-((v-mn)/Math.max(1,mx-mn))*(H-10)-5}`).join(' ');
      const area=`0,${H} `+pts+` ${W},${H}`;
      return `<div class="card"><div class="h">${I('growth','ic-lg')}<h3>${label}</h3><span class="tag ok" style="margin-inline-start:auto">${I('growth','ic-sm')} +${arr.at(-1)-arr[0]} نقطة</span></div>
        <svg viewBox="0 0 ${W} ${H+22}" style="width:100%;height:130px">
          <defs><linearGradient id="ar${col}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${col}" stop-opacity=".28"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></linearGradient></defs>
          <polygon points="${area}" fill="url(#ar${col})"/>
          <polyline points="${pts}" fill="none" stroke="${col}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          ${arr.map((v,i)=>`<circle cx="${(i/(arr.length-1))*W}" cy="${H-((v-mn)/Math.max(1,mx-mn))*(H-10)-5}" r="3.5" fill="#fff" stroke="${col}" stroke-width="2"/>`).join('')}
          ${L.map((l,i)=>`<text x="${(i/(arr.length-1))*W}" y="${H+16}" text-anchor="middle" font-size="10" fill="#7B8A91" font-family="Tajawal">${l}</text>`).join('')}
        </svg></div>`; };
    return `
    <div class="card exec-summary"><div class="h">${I('compass','ic-lg')}<h3>الملخّص التنفيذي</h3>
      <span class="tag mute" style="margin-inline-start:auto">${PERIODS.find(p=>p[0]===S.cmPeriod)[1]} · ${S.cmScope==='all'?'كامل المنظومة':S.cmScope.split(':')[1]}</span></div>
      <div class="exec-grid">
        ${exec('المشاركة', c.participationRate+'%','team')}
        ${exec('اعتماد الأهداف', Math.round(c.goalsApproved/(c.goalsApproved+c.goalsAwaiting)*100)+'%','target')}
        ${exec('إكمال ١:١', Math.round(c.oneOnOneDone/c.managersTotal*100)+'%','chat')}
        ${exec('نشاط التقدير', c.recognitionThisMonth,'heart')}
        ${exec('الجاهزية', c.adoptionRate+'%','growth')}
      </div>
    </div>
    <div class="grid g2" style="margin-top:20px">
      ${lineChart(c.participationTrend,'اتجاه المشاركة عبر الوقت','#2EA1A1')}
      ${lineChart(c.adoptionTrend,'اتجاه التبنّي عبر الوقت','#6CBE99')}
    </div>
    <div class="card" style="margin-top:20px"><div class="h">${I('sparkle','ic-lg')}<h3>أبرز فرص التحسين</h3>
      <span class="tag mute" style="margin-inline-start:auto">مبنيّة على بيانات اللوحة · داعمة وتطويرية</span></div>
      <div class="opps">${c.opportunities.map(o=>`<div class="opp">
        <span class="opp-ic">${I(o.ic)}</span>
        <div class="grow"><div class="opp-t">${o.ar} <span class="tag ${o.impact==='مرتفع'?'ok':'info'}" style="font-size:11px">أثر ${o.impact}</span></div>
          <div class="soft" style="font-size:13px">${o.why}</div>
          <div class="opp-action">${I('arrow','ic-sm')} ${o.action}</div></div></div>`).join('')}</div>
    </div>`;
  }

  /* 2 · Participation Monitoring */
  function cmParticipation(){ const c=TP.cm;
    return `<div class="grid g2">
      <div class="card"><div class="h">${I('voice','ic-lg')}<h3>التغذية الراجعة</h3></div>
        ${splitBar(c.feedbackGiven,c.feedbackPending,'قدّموا التغذية الراجعة','لم يقدّموا بعد')}
        <p class="soft" style="margin-top:10px;font-size:13px">${c.feedbackGiven} شاركوا · ${c.feedbackPending} بانتظار دعوةٍ ودّية.</p></div>
      <div class="card"><div class="h">${I('voice','ic-lg')}<h3>استبانة النبض</h3></div>
        ${splitBar(c.pulseDone,c.pulsePending,'شاركوا في النبض','لم يشاركوا بعد')}
        <p class="soft" style="margin-top:10px;font-size:13px">${c.pulseDone} استجابوا · ${c.pulsePending} بانتظار التذكير.</p></div>
    </div>
    <div class="card" style="margin-top:20px"><div class="h">${I('grid','ic-lg')}<h3>المشاركة حسب القطاع</h3></div>
      ${heatTable(c.sectorOps.map(s=>({ar:s.ar,dot:s.c,participation:s.participation,feedback:s.feedback})),
        [{k:'participation',l:'المشاركة'},{k:'feedback',l:'التغذية الراجعة'}],'القطاع')}</div>`;
  }

  /* 3 · Manager Accountability (supportive) */
  function cmManagers(){ const c=TP.cm;
    return `<div class="grid g2">
      <div class="card"><div class="h">${I('chat','ic-lg')}<h3>إكمال محادثات ١:١</h3></div>
        ${splitBar(c.oneOnOneDone,c.oneOnOnePending,'مدراء أكملوا','بحاجة لدعم')}
        <p class="soft" style="margin-top:10px;font-size:13px">${c.oneOnOneDone} من ${c.managersTotal} مديراً أكملوا محادثات التوافق.</p></div>
      <div class="card"><div class="h">${I('target','ic-lg')}<h3>اعتماد الأهداف</h3></div>
        ${splitBar(c.goalsApproved,c.goalsAwaiting,'معتمدة','بانتظار الاعتماد')}
        <p class="soft" style="margin-top:10px;font-size:13px">${c.goalsFlagged} هدفاً بحاجة لإكمال الربط (غير محظور).</p></div>
    </div>
    <div class="card" style="margin-top:20px"><div class="h">${I('team','ic-lg')}<h3>متابعة المدراء — ١:١ واعتماد الأهداف والتقدير</h3>
      <span class="tag mute" style="margin-inline-start:auto">للدعم لا للمحاسبة</span></div>
      ${heatTable(c.managerOps.map(m=>({ar:m.ar,sub:m.sector,oneonone:Math.round(m.oneonone/m.team*100),goalsApproved:m.goalsApproved,recSent:m.recSent})),
        [{k:'oneonone',l:'١:١ %'},{k:'goalsApproved',l:'اعتماد الأهداف %'},{k:'recSent',l:'تقدير قدّمه'}],'المدير')}</div>`;
  }

  /* 4 · Recognition & Engagement */
  function cmRecognition(){ const c=TP.cm;
    return `<div class="grid g4">
      ${cmStat('تقدير مُرسَل', c.recSent,'هذا الشهر','heart')}
      ${cmStat('تقدير مُستلَم', c.recReceived,'هذا الشهر','star')}
      ${cmStat('اتجاه المشاركة', c.participationRate+'%','+'+(c.participationTrend.at(-1)-c.participationTrend.at(-2))+' نقطة','growth')}
      ${cmStat('مؤشّر التفاعل', c.engagementTrend.at(-1)+' %ile','مسار التحسّن','spark')}
    </div>
    <div class="grid g2" style="margin-top:20px">
      <div class="card"><div class="h">${I('heart','ic-lg')}<h3>نمو التقدير</h3></div><div class="chart">${c.recTrend.map(v=>`<div class="bar" style="height:${v/Math.max(...c.recTrend)*100}%" data-v="${v}"></div>`).join('')}</div></div>
      <div class="card"><div class="h">${I('growth','ic-lg')}<h3>نمو المشاركة</h3></div><div class="chart">${c.participationTrend.map(v=>`<div class="bar" style="height:${v}%" data-v="${v}%"></div>`).join('')}</div></div>
    </div>
    <div class="card" style="margin-top:20px"><div class="h">${I('grid','ic-lg')}<h3>التقدير حسب القطاع</h3>
      <span class="tag mute" style="margin-inline-start:auto">نشاط تقدير تجميعي · للاحتفاء لا للمقارنة</span></div>
      ${heatTable(c.sectorOps.map(s=>({ar:s.ar,dot:s.c,recognition:s.recognition,engagement:s.engagement})),
        [{k:'recognition',l:'نشاط التقدير'},{k:'engagement',l:'التفاعل'}],'القطاع')}</div>`;
  }

  /* 5 · Strategic Alignment */
  function cmAlignment(){ const a=TP.alignment.priorities;
    return `<div class="sec-head"><div><h2 style="font-size:20px">المواءمة الاستراتيجية — أولويات ٢٠٢٦</h2>
      <div class="desc">إكمال الأهداف، والموظفون والإدارات المُسهِمون في كل أولوية.</div></div></div>
      <div class="grid g3">${a.map(p=>`<div class="card flat">
        <div class="h" style="margin-bottom:8px">${I('star')}<h3 style="font-size:15px">${p.ar}</h3></div>
        <div class="fbar"><span class="name">الإكمال</span><div class="track"><div class="fill" style="width:${p.completion}%"></div></div><span class="pct">${p.completion}%</span></div>
        <div class="rowflex" style="gap:18px;margin-top:12px">
          <div><div class="num tnum" style="font-size:24px">${p.employees}</div><div class="lbl">موظف مُسهِم</div></div>
          <div><div class="num tnum" style="font-size:24px">${p.depts}</div><div class="lbl">إدارة مُسهِمة</div></div>
        </div></div>`).join('')}</div>`;
  }

  /* 6 · Genetic Code Analytics */
  function cmBehaviors(){ const da=TP.behaviorAnalytics.demonstrated, rb=TP.behaviorAnalytics.recognitionBy;
    const arr=TP.behaviors.map(b=>({b,d:da[b.id],r:rb[b.id]})).slice();
    const sorted=[...arr].sort((x,y)=>y.d-x.d);
    const most=sorted.slice(0,3), least=sorted.slice(-3).reverse();
    return `<div class="grid g2">
      <div class="card"><div class="h">${I('star','ic-lg')}<h3>الأكثر حضوراً</h3></div>
        ${most.map(x=>`<div class="fbar"><span class="name">${x.b.ar}</span><div class="track"><div class="fill" style="width:${x.d}%"></div></div><span class="pct">${x.d}</span></div>`).join('')}</div>
      <div class="card"><div class="h">${I('compass','ic-lg')}<h3>الأقل حضوراً — فرص تعزيز</h3></div>
        ${least.map(x=>`<div class="fbar"><span class="name">${x.b.ar}</span><div class="track"><div class="fill" style="width:${x.d}%;background:linear-gradient(90deg,var(--sand),var(--peach))"></div></div><span class="pct">${x.d}</span></div>`).join('')}</div>
    </div>
    <div class="card" style="margin-top:20px"><div class="h">${I('spark','ic-lg')}<h3>حضور السلوكيات ١٢ (تقديرٌ ومواءمة)</h3></div>
      <div class="chart">${arr.map(x=>`<div class="bar" style="height:${x.d}%" data-v="${x.d}" title="${x.b.ar}"></div>`).join('')}</div>
      <div class="rowflex" style="gap:6px;margin-top:10px;flex-wrap:wrap">${arr.map(x=>`<span class="tag mute" style="font-size:11px">${x.b.ar}</span>`).join('')}</div></div>`;
  }

  /* 7 · Organizational Readiness + heatmaps */
  function cmReadiness(){ const c=TP.cm;
    const cols=[{k:'participation',l:'المشاركة'},{k:'adoption',l:'التبنّي'},{k:'readiness',l:'الجاهزية'},{k:'engagement',l:'التفاعل'}];
    return `<div class="card"><div class="h">${I('grid','ic-lg')}<h3>الجاهزية التنظيمية — حسب القطاع</h3>
      <span class="tag mute" style="margin-inline-start:auto">تجميعي · n ≥ ٥</span></div>
      ${heatTable(c.sectorOps.map(s=>({ar:s.ar,dot:s.c,...s})),cols,'القطاع')}</div>
    <div class="card" style="margin-top:20px"><div class="h">${I('org','ic-lg')}<h3>خريطة حرارية — حسب الإدارة</h3></div>
      ${heatTable(c.deptOps.map(d=>({ar:d.ar,sub:d.sector,participation:d.participation,adoption:d.adoption,goals:d.goals,oneonone:d.oneonone})),
        [{k:'participation',l:'المشاركة'},{k:'adoption',l:'التبنّي'},{k:'goals',l:'الأهداف'},{k:'oneonone',l:'١:١'}],'الإدارة')}</div>`;
  }

  /* 8 · Supportive Follow-Up */
  function cmFollowup(){ const c=TP.cm;
    const lowEng=c.sectorOps.filter(s=>s.engagement<55);
    return `<div class="grid g2">
      <div class="card"><div class="h">${I('voice','ic-lg')}<h3>قطاعات تستفيد من دعمٍ إضافي للمشاركة</h3></div>
        ${c.followUp.noFeedback.map(f=>`<div class="lrow"><div class="grow"><div class="title">${f.sector}</div>
          <div class="soft" style="font-size:13px">${f.pending} من ${f.total} بانتظار المشاركة</div></div>
          <button class="btn ghost sm" data-toast="تم إرسال دعوة ودّية للمشاركة إلى ${f.sector}">${I('voice')} دعوة لطيفة</button></div>`).join('')}</div>
      <div class="card"><div class="h">${I('chat','ic-lg')}<h3>مدراء يستفيدون من متابعةٍ داعمة</h3></div>
        ${c.followUp.pendingOneOnOne.map(m=>`<div class="lrow"><div class="grow"><div class="title">${m.name}</div>
          <div class="soft" style="font-size:13px">أكمل ${m.done} من ${m.team} محادثة</div></div>
          <button class="btn ghost sm" data-toast="تم إرسال تذكير داعم إلى ${m.name}">${I('arrow')} تذكير داعم</button></div>`).join('')}</div>
    </div>
    <div class="card" style="margin-top:20px"><div class="h">${I('team','ic-lg')}<h3>فرق تستفيد من اهتمامٍ إضافي بالتفاعل</h3>
      <span class="tag mute" style="margin-inline-start:auto">للدعم لا للمحاسبة</span></div>
      ${lowEng.length?lowEng.map(s=>`<div class="lrow"><span class="sdot" style="background:${s.c}"></span><div class="grow"><div class="title">${s.ar}</div>
        <div class="soft" style="font-size:13px">مؤشّر التفاعل ${s.engagement}% · التبنّي ${s.adoption}%</div></div>
        <button class="btn ghost sm" data-toast="تم اقتراح جلسة دعمٍ وإصغاء لقطاع ${s.ar}">${I('heart')} جلسة دعم</button></div>`).join('')
        :'<p class="soft">جميع الفرق ضمن مسارٍ إيجابي حالياً — واصلوا الدعم والاحتفاء.</p>'}</div>`;
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
    const scp=$('#cmScopeSel'); if(scp) scp.onchange=e=>{ S.cmScope=e.target.value; render(); };
    window.scrollTo(0,0);
  }
  function go(r){ if(r==='experience'){ openExperience(); return; } S.route=r; render(); }

  document.addEventListener('click', e=>{
    const t=e.target.closest('[data-go],[data-x],[data-toast],[data-cmtab],[data-cmperiod]'); if(!t) return;
    if(t.dataset.cmperiod!==undefined){ S.cmPeriod=t.dataset.cmperiod; render(); return; }
    if(t.dataset.cmtab!==undefined){ S.cmTab=t.dataset.cmtab; render(); return; }
    if(t.dataset.go!==undefined) return go(t.dataset.go);
    if(t.dataset.x==='open') return openExperience();
    if(t.dataset.x==='close') return closeExperience();
    if(t.dataset.x==='download') return toast('تم تجهيز بطاقتك (نموذج تجريبي).');
    if(t.dataset.toast) return toast(t.dataset.toast);
  });

  render();
})();
