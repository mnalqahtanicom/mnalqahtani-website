# التعليميَّة · Talemia Employee Experience Platform — MVP Clickable Prototype

A self-contained, clickable prototype of the **Talemia Employee Experience, Engagement,
Development, Recognition & Organizational Change Platform** (MVP scope).

## How to view
- Served by the site at **`/talemia-platform/`** (e.g. `https://<host>/talemia-platform/`).
- Or open `index.html` directly in a browser (works on `file://`; the signature
  experience music autoplays after the click that opens it).

No build step. Vanilla HTML/CSS/JS. Arabic-first, RTL.

## Prototype affordance
Use the **role switcher** (top bar on desktop, "المزيد" on mobile) to explore the
six experiences: **موظف · مدير · قيادة · تشغيل/تغيير · إدارة**.

## What it demonstrates (MVP modules)
- **M1 Golden Thread / Line-of-Sight** — Strategy ▸ Priorities(6) ▸ Dept Objective ▸ Goals ▸ KPIs ▸ Behaviors(12).
- **M2 Goals & KPIs** — create a goal with **mandatory dual-link** (priority + behavior);
  missing links are **flagged for review** (non-blocking — per approved decision).
- **M3 Manager Enablement** — alignment 1:1, **clarity handshake**, goal approval, cascade.
- **M4 Recognition** — behavior-anchored, **non-compensatory**, manager + peer.
- **M5 Voice** — pulse + idea submission with **user-choice confidentiality**; n≥5 aggregate.
- **M8 Insights** — Home (self), Team (team), Organization (aggregate-only, no individuals).
- **M9 Signature Experience** — the personalized recognition certificate (deep-navy + brand-green,
  official **Talemia music**, the 12 Genetic-Code behaviors and the C.O.R.E. → همّة values).
- **M10 Admin/Governance/Privacy** — identity, org-sync, permissions, privacy, content, audit.
- **M13 Profile (lite)** — skills, validated certifications, opt-in discoverability.

## Design system
- **Alignment Mode** (light, brand blue/green) for functional screens.
- **Experience Mode** (deep navy `#0E2533` + brand green `#6CBE99`) for signature moments —
  values extracted from the original Talemia experience pilot for brand fidelity.
- Brand palette, Tajawal type, equalizer-bar growth motif, sector colours from the 2026 structure.
- Responsive: employee mobile-first (bottom tabs: الرئيسية · التوافق · تجربتي · الصوت · المزيد),
  manager/executive desktop-first.

## Confirmed governance reflected in the prototype
Flag-for-review · Voice = user choice · Anonymity n=5 · Manager-authored experiences via templates ·
Recognition non-compensatory · Executives see aggregate only (no individual data).

## Files
```
talemia-platform/
  index.html          app shell
  css/tokens.css      design tokens (brand + experience)
  css/app.css         components, layout, responsive, experience mode
  js/data.js          mock data (priorities, behaviors, goals, team, org…)
  js/app.js           router, state, all screens, signature experience
  audio/signature-bg.wav   official Talemia music (signature experience)
```

> Prototype only — mock data, no backend, no persistence. Built to validate the MVP
> experience and flows before high-fidelity build/engineering.
