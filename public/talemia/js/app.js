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
    employee:[['home','الرئيسية','home'],['thread','خط الرؤية','thread'],['goals','أهدافي','target'],
      ['conversations','محادثاتي','chat'],['experience','تجربتي','spark'],['voice','الصوت','voice'],['profile','ملفي','user']],
    manager:[['home','الرئيسية','home'],['team','فريقي','team'],['thread','خط الرؤية','thread'],['experience','التجارب','spark']],
    executive:[['home','الرئيسية','home'],['organization','المنظمة','org'],['thread','خط الرؤية','thread'],['experience','التجارب','spark']],
  };
  const TABS = {
    employee:[['home','الرئيسية','home'],['thread','المسار','thread'],['experience','تجربتي','spark'],['voice','الصوت','voice'],['profile','ملفي','user']],
    manager:[['home','الرئيسية','home'],['team','فريقي','team'],['thread','المسار','thread'],['experience','التجارب','spark']],
    executive:[['home','الرئيسية','home'],['organization','المنظمة','org'],['thread','المسار','thread'],['experience','التجارب','spark']],
  };
  const ROUTE_TITLES = { home:'الرئيسية', thread:'خط الرؤية الاستراتيجي', goals:'أهدافي ومؤشراتي',
    conversations:'محادثاتي', experience:'تجربتي', voice:'الصوت', profile:'ملفي المهني',
    team:'فريقي', organization:'المنظمة' };

  /* ---------------- helpers ---------------- */
  const losPct = ()=>{ const n=TP.goals.length, ok=TP.goals.filter(g=>g.priorities.length&&g.behaviors.length).length; return Math.round(ok/n*100); };
  const avColor = name=>{ const c=['#2C5F90','#1B3A5C','#2EA1A1','#5FA570','#90C685']; let s=0; for(const ch of name)s+=ch.charCodeAt(0); return c[s%c.length]; };
  let tT; function toast(m){ let t=$('#toast'); if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t);} t.textContent=m; t.classList.add('show'); clearTimeout(tT); tT=setTimeout(()=>t.classList.remove('show'),2600); }

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
      <div class="eq lg animate hero-art" style="position:absolute;inset-inline-start:44px;inset-block-start:46px;height:64px"><i></i><i></i><i></i><i></i><i></i></div>
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
          <div class="xp-eq xp-r" style="--d:.1s"><i></i><i></i><i></i><i></i><i></i></div>
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
  const VIEW = { home, thread, goals,
    conversations:()=>placeholder('محادثاتي'), experience:()=>{ openExperience(); return home(); },
    voice:()=>placeholder('الصوت'), profile:()=>placeholder('ملفي المهني'),
    team:()=>placeholder('فريقي'), organization:execHome };

  function render(){
    const nav=NAV[S.role], tabs=TABS[S.role];
    const view=(VIEW[S.route]||home)();
    document.getElementById('app').innerHTML=`
      <div class="shell">
        <aside class="rail">
          <div class="brand"><div class="eq"><i></i><i></i><i></i><i></i><i></i></div>
            <div class="name">التعليميَّة<small>EXPERIENCE</small></div></div>
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
    const sel=$('#roleSel'); if(sel) sel.onchange=e=>{ S.role=e.target.value; S.route='home'; render(); };
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
