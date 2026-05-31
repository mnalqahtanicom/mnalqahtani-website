'use client';

import { useEffect, useRef, useState } from 'react';

type Stage = { name: string; desc: string; q: string[]; out: string };

const STAGES: Record<'en' | 'ar', Stage[]> = {
  en: [
    { name: 'Strategy', desc: 'A clear, ownable direction the whole organization can act on.', q: ['What is the real challenge?', 'Where will we focus — and not?', 'What does winning look like?'], out: 'Output: a clear strategic direction' },
    { name: 'Execution', desc: 'Turning intent into disciplined, governed delivery.', q: ['Who owns each priority?', 'How is progress governed?', 'Where are the bottlenecks?'], out: 'Output: a delivery & governance rhythm' },
    { name: 'Change', desc: 'Leading people through the change the strategy demands.', q: ['Who is affected, and how?', 'Is sponsorship visible?', 'What will people resist?'], out: 'Output: an engaged organization' },
    { name: 'Adoption', desc: 'Embedding new ways of working so they actually hold.', q: ['Are the new behaviors in use?', 'What reinforces them?', 'What pulls people back?'], out: 'Output: new ways of working that stick' },
    { name: 'Performance', desc: 'Measuring what matters and improving continuously.', q: ['Which few measures matter?', 'What decision does each inform?', 'Are we learning fast enough?'], out: 'Output: a performance feedback loop' },
    { name: 'Results', desc: 'Sustained, measurable impact that endures beyond the project.', q: ['Did outcomes move, not just outputs?', 'Will results hold next year?', 'What did we learn?'], out: 'Output: durable, measurable impact' },
  ],
  ar: [
    { name: 'الاستراتيجية', desc: 'وجهة واضحة يمكن للمؤسسة كلها التحرّك وفقها.', q: ['ما التحدّي الحقيقي؟', 'أين نركّز — وأين لا؟', 'كيف يبدو النجاح؟'], out: 'المُخرَج: وجهة استراتيجية واضحة' },
    { name: 'التنفيذ', desc: 'تحويل النيّة إلى تنفيذ منضبط ومحوكم.', q: ['من يملك كل أولوية؟', 'كيف يُحوكَم التقدّم؟', 'أين الاختناقات؟'], out: 'المُخرَج: إيقاع تنفيذ وحوكمة' },
    { name: 'التغيير', desc: 'قيادة الناس عبر التغيير الذي تتطلّبه الاستراتيجية.', q: ['من يتأثّر وكيف؟', 'هل الرعاية ظاهرة؟', 'ما الذي سيُقاوَم؟'], out: 'المُخرَج: مؤسسة متفاعلة' },
    { name: 'التبنّي', desc: 'ترسيخ طرق العمل الجديدة لتدوم فعلًا.', q: ['هل السلوكيات الجديدة قيد الاستخدام؟', 'ما الذي يعزّزها؟', 'ما الذي يعيد الناس للخلف؟'], out: 'المُخرَج: طرق عمل تدوم' },
    { name: 'الأداء', desc: 'قياس ما يهم والتحسين المستمر.', q: ['أي مقاييس قليلة تهم؟', 'أي قرار يخدمه كل مقياس؟', 'هل نتعلّم بسرعة كافية؟'], out: 'المُخرَج: حلقة تغذية راجعة للأداء' },
    { name: 'النتائج', desc: 'أثر مستدام وقابل للقياس يدوم بعد المشروع.', q: ['هل تحرّكت النتائج لا المخرجات فقط؟', 'هل ستدوم النتائج العام المقبل؟', 'ماذا تعلّمنا؟'], out: 'المُخرَج: أثر دائم وقابل للقياس' },
  ],
};

const T = {
  en: { eyebrow: 'Interactive preview · light motion', title: 'Strategy to Results™', sub: 'A signature, interactive way to explore the six stages — calm motion, executive feel, fully accessible.', framework: 'The Framework', explore: 'Explore the six stages.', tap: 'Tap a stage — or use arrow keys — to see its purpose, the key questions, and what it produces.', keyq: 'Key questions', stage: 'Stage', toggle: 'عربي', hint: 'This is the interactive experience proposed for the Strategy to Results™ page.', note: 'Preview page · click عربي to switch · try arrow keys on the stages' },
  ar: { eyebrow: 'معاينة تفاعلية · حركة خفيفة', title: 'الاستراتيجية إلى النتائج™', sub: 'طريقة تفاعلية مميّزة لاستكشاف المراحل الست — حركة هادئة، إحساس تنفيذي، ومتاحة بالكامل.', framework: 'الإطار', explore: 'استكشف المراحل الست.', tap: 'اضغط على مرحلة — أو استخدم مفاتيح الأسهم — لرؤية هدفها وأسئلتها المحورية ومُخرجاتها.', keyq: 'أسئلة محورية', stage: 'المرحلة', toggle: 'EN', hint: 'هذه هي التجربة التفاعلية المقترحة لصفحة الاستراتيجية إلى النتائج™.', note: 'صفحة معاينة · اضغط EN للتبديل · جرّب مفاتيح الأسهم على المراحل' },
};

export default function LabStrategyToResults() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [active, setActive] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const stages = STAGES[lang];
  const t = T[lang];

  // scroll reveal
  useEffect(() => {
    const els = rootRef.current?.querySelectorAll('.reveal');
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const dir = lang === 'ar' ? -1 : 1;
      const delta = e.key === 'ArrowRight' ? dir : -dir;
      setActive((a) => Math.max(0, Math.min(5, a + delta)));
      setFadeKey((k) => k + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lang]);

  function toggle() {
    const next = lang === 'ar' ? 'en' : 'ar';
    setLang(next);
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = next;
    setFadeKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function select(i: number) { setActive(i); setFadeKey((k) => k + 1); }

  const fill = (active / (stages.length - 1)) * 100;
  const s = stages[active];

  return (
    <div className="lab" ref={rootRef}>
      <style>{CSS}</style>

      <header className="lab-head">
        <div className="lab-wrap nav">
          <div className="brand">
            <span className="seal">MQ</span>
            <b>{lang === 'ar' ? 'محمد ناصر القحطاني' : 'Mohammed Nasser Al-Qahtani'}</b>
          </div>
          <button className="toggle" onClick={toggle}>{t.toggle}</button>
        </div>
      </header>

      <section className="hero">
        <div className="lab-wrap hero-inner">
          <div className="eyebrow enter">{t.eyebrow}</div>
          <h1 className="enter d1">{t.title}</h1>
          <p className="enter d2">{t.sub}</p>
        </div>
      </section>

      <section className="block s2r">
        <div className="lab-wrap">
          <div className="reveal">
            <span className="tag">{t.framework}</span>
            <h2>{t.explore}</h2>
            <p className="lead">{t.tap}</p>
          </div>

          <div className="stepper reveal" role="tablist" aria-label="Stages">
            <div className="track" />
            <div className="track-fill" style={{ width: `${fill}%` }} />
            {stages.map((st, i) => (
              <button key={st.name} className="node" role="tab" aria-selected={i === active} onClick={() => select(i)}>
                <span className="dot">{i + 1}</span>
                <span className="nm">{st.name}</span>
              </button>
            ))}
          </div>

          <div className="panel reveal" aria-live="polite">
            <div key={fadeKey} className="fade panel-grid">
              <div>
                <div className="step-no">{t.stage} {active + 1} / 6</div>
                <h3>{s.name}</h3>
                <p className="desc">{s.desc}</p>
                <span className="out">{s.out}</span>
              </div>
              <div>
                <div className="qh">{t.keyq}</div>
                <ul>{s.q.map((q) => <li key={q}>{q}</li>)}</ul>
              </div>
            </div>
            <div className="hint">↑ {t.hint}</div>
          </div>
        </div>
      </section>

      <div className="lab-note">{t.note}</div>
    </div>
  );
}

const CSS = `
.lab{--navy:#0B1F3A;--slate:#33415C;--gold:#C8A24B;--gold-soft:#d8bd7e;--ivory:#F7F5F0;--white:#fff;--ink:#11161D;--muted:#6B7280;--line:rgba(11,31,58,.10);--ease:cubic-bezier(.22,.61,.36,1);background:var(--ivory);color:var(--ink);min-height:100vh}
.lab .lab-wrap{max-width:1100px;margin:0 auto;padding:0 28px}
.lab h1,.lab h2,.lab h3{font-weight:500;line-height:1.15;letter-spacing:-.01em}
html[dir="rtl"] .lab h1,html[dir="rtl"] .lab h2,html[dir="rtl"] .lab h3{letter-spacing:0;line-height:1.4}
.lab-head{position:sticky;top:0;z-index:50;background:rgba(247,245,240,.82);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
.lab .nav{display:flex;align-items:center;justify-content:space-between;height:68px}
.lab .brand{display:flex;align-items:center;gap:12px}
.lab .seal{width:40px;height:40px;border-radius:50%;background:var(--navy);color:var(--gold);display:grid;place-items:center;font-weight:600;font-size:15px;box-shadow:0 0 0 1px var(--gold),inset 0 0 0 3px var(--navy),0 0 0 4px rgba(200,162,75,.45)}
.lab .brand b{font-size:17px;color:var(--navy);font-weight:600}
.lab .toggle{border:1px solid var(--line);background:#fff;color:var(--navy);font-weight:600;font-size:13px;padding:8px 14px;border-radius:999px;cursor:pointer;transition:all .2s}
.lab .toggle:hover{border-color:var(--gold);color:var(--gold)}
.lab .hero{background:var(--navy);color:var(--ivory);position:relative;overflow:hidden}
.lab .hero::before{content:"";position:absolute;inset:0;background-image:linear-gradient(135deg,transparent 49.6%,rgba(200,162,75,.06) 49.6%,rgba(200,162,75,.06) 50.4%,transparent 50.4%),radial-gradient(circle at 85% 15%,rgba(200,162,75,.10),transparent 42%);background-size:38px 38px,100% 100%}
.lab .hero-inner{position:relative;padding:84px 0 72px}
.lab .eyebrow{color:var(--gold);font-size:12px;font-weight:700;letter-spacing:.22em;text-transform:uppercase}
html[dir="rtl"] .lab .eyebrow{letter-spacing:0;text-transform:none;font-size:14px}
.lab .hero h1{color:#fff;font-size:clamp(34px,5.5vw,58px);margin:16px 0 18px}
.lab .hero p{color:rgba(247,245,240,.8);font-size:clamp(16px,2vw,20px);max-width:52ch;font-weight:300}
.lab .enter{opacity:0;transform:translateY(18px);animation:labrise .7s var(--ease) forwards}
.lab .enter.d1{animation-delay:.08s}.lab .enter.d2{animation-delay:.18s}
@keyframes labrise{to{opacity:1;transform:none}}
.lab .reveal{opacity:0;transform:translateY(24px);transition:opacity .6s var(--ease),transform .6s var(--ease)}
.lab .reveal.in{opacity:1;transform:none}
.lab .block{padding:80px 0}
.lab .tag{color:var(--gold);font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase}
html[dir="rtl"] .lab .tag{letter-spacing:0;text-transform:none;font-size:14px}
.lab .block h2{font-size:clamp(26px,3.6vw,40px);color:#fff;margin:10px 0 14px}
.lab .lead{color:rgba(247,245,240,.72);font-size:18px;max-width:60ch}
.lab .s2r{background:var(--navy);color:var(--ivory)}
.lab .stepper{position:relative;display:flex;justify-content:space-between;gap:8px;margin:44px 0 0}
.lab .track{position:absolute;top:23px;left:0;right:0;height:2px;background:rgba(247,245,240,.16)}
.lab .track-fill{position:absolute;top:23px;inset-inline-start:0;height:2px;background:var(--gold);transition:width .5s var(--ease)}
.lab .node{position:relative;z-index:2;flex:1;display:flex;flex-direction:column;align-items:center;gap:10px;background:none;border:0;cursor:pointer;color:inherit;font-family:inherit}
.lab .dot{width:48px;height:48px;border-radius:50%;display:grid;place-items:center;background:var(--navy);border:2px solid rgba(247,245,240,.3);color:rgba(247,245,240,.6);font-weight:600;font-size:17px;transition:all .35s var(--ease)}
.lab .node .nm{font-size:13px;color:rgba(247,245,240,.6);font-weight:500;transition:color .3s;text-align:center}
.lab .node[aria-selected="true"] .dot{border-color:var(--gold);background:var(--gold);color:var(--navy);transform:scale(1.08)}
.lab .node[aria-selected="true"] .nm{color:#fff}
.lab .node:hover .dot{border-color:var(--gold-soft)}
.lab .node:focus-visible .dot{outline:2px solid var(--gold);outline-offset:3px}
.lab .panel{margin-top:48px;background:rgba(255,255,255,.04);border:1px solid rgba(247,245,240,.14);border-radius:18px;padding:36px;min-height:240px}
.lab .panel-grid{display:grid;grid-template-columns:1fr 1fr;gap:36px}
@media(max-width:720px){.lab .panel-grid{grid-template-columns:1fr;gap:24px}}
.lab .step-no{color:var(--gold);font-size:14px;font-weight:600}
.lab .panel h3{color:#fff;font-size:28px;margin:6px 0 14px}
.lab .panel .desc{color:rgba(247,245,240,.82);font-size:17px}
.lab .panel .qh{color:var(--gold);font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:12px}
html[dir="rtl"] .lab .panel .qh{letter-spacing:0;text-transform:none;font-size:14px}
.lab .panel ul{list-style:none;display:flex;flex-direction:column;gap:10px;padding:0;margin:0}
.lab .panel li{display:flex;gap:10px;color:rgba(247,245,240,.85);font-size:15px}
.lab .panel li::before{content:"";flex:none;margin-top:9px;width:6px;height:6px;border-radius:50%;background:var(--gold)}
.lab .out{margin-top:18px;display:inline-flex;align-items:center;gap:8px;border:1px dashed rgba(200,162,75,.5);color:var(--gold);border-radius:999px;padding:7px 16px;font-size:13px;font-weight:600}
.lab .fade{animation:labfade .45s var(--ease)}
@keyframes labfade{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.lab .hint{margin-top:18px;font-size:13px;color:rgba(247,245,240,.5)}
.lab .lab-note{position:fixed;bottom:16px;inset-inline-start:16px;z-index:60;background:var(--gold);color:var(--navy);font-size:12px;font-weight:600;padding:8px 14px;border-radius:8px;box-shadow:0 8px 20px -8px rgba(0,0,0,.4)}
@media (prefers-reduced-motion: reduce){.lab *{animation:none!important;transition:none!important}.lab .enter,.lab .reveal{opacity:1;transform:none}}
`;
