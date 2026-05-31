# Talemia Employee Experience Platform — Vision Update v2.0
### Strategic Employee Experience, Engagement, Recognition, Feedback, Development & Change Management System

> This document updates the approved platform vision per the refinement directive.
> It **does not add new business modules** — it deepens **branding, content quality,
> and the analytics/intelligence layer** so the platform becomes a *strategic system*,
> not only an employee portal. Build work resumes only after this vision is acknowledged.

---

## 0. Positioning shift

**From:** an employee portal that runs the MVP flows (goals, recognition, voice, signature experience).
**To:** a **strategic EX & change-management system** with three audiences and a serious intelligence layer:

| Layer | Audience | Purpose |
|---|---|---|
| **Experience layer** | Employees & Managers | Clarity, recognition, feedback, development, belonging (the human product) |
| **Operations layer** | **Change Management + HC** | Drive, monitor, and sustain participation & adoption (the engine room) |
| **Intelligence layer** | **Executives** | Strategic insight: who/what/where the energy and alignment are (the boardroom) |

The new requirements (1–8) overwhelmingly strengthen the **Operations** and **Intelligence** layers.

---

## 1. Official Talemia Branding — MANDATORY, LOCKED

- **Logo:** use the **official Talemia logo exactly as provided** in the brand files.
  - Full-color logo (`assets/talemia-logo.png`) on light surfaces (sidebar, light screens).
  - Official white logo (`assets/talemia-logo-white.png`) on dark surfaces (hero, Signature Experience).
  - **No** alternative logos, simplified marks, redrawn symbols, or replacement branding.
  - The equalizer “bars” may appear only as a **decorative motif**, never as a logo substitute.
- **Colors:** official palette only — DarkBlue `#22577B`, MediumAquamarine `#6CBE99`, DarkSeaGreen `#90C685`, LightSeaGreen `#2EA1A1`, LightGreen `#C1DFC4`, DimGray `#575756`, with the deep-navy `#0E2533` for Experience Mode (from the official pilot).
- **Typography:** Tajawal for digital UI (brand-consistent), with Symbio/Greta reserved for brand assets; Arabic-first, RTL.
- **Visual identity:** logo clear-space, min-size, and usage rules from the Brand Identity Guidelines are respected throughout.

✅ *Implemented in this pass: official logo wired into sidebar, hero, and Signature Experience.*

---

## 2. Professional Arabic Content — executive-grade, no placeholders

All employee-facing copy must read as **professionally crafted, inspiring, executive-level Arabic** — never lorem/placeholder, never robotic. A central **content library** (`content.js`) will hold curated, emotionally meaningful Arabic for:

- **Recognition messages** (per Genetic-Code behavior) — warm, specific, impact-led.
- **Feedback prompts & acknowledgements** — respectful, growth-oriented.
- **Leader / executive messages** — dignified, motivating, on-brand.
- **Onboarding & belonging messages** ("أنا تعليمي…") — welcoming, identity-building.
- **Signature Experience narrative** — already cinematic; extend the same voice everywhere.
- **System & empty states** — encouraging, never sterile.

**Tone principles:** فصيح ومُلهِم · يركّز على الأثر لا الرقم · يخاطب الإنسان قبل الوظيفة · يعكس صبغتنا الجينية وقيمنا (همّة).

---

## 3. Change Management Dashboard *(new dedicated view — Operations layer)*

A first-class workspace for **إدارة التغيير** to drive and sustain adoption. Monitors (all privacy-governed, aggregate where required, n≥5):

- Employees who **gave feedback** vs. **did not** (participation gap).
- Managers who **completed 1:1 conversations** vs. **did not** (the C2 lever).
- **Recognition activity** levels (sent/received volume & trend).
- **Goal-approval completion** rates.
- **Employee participation** rates (overall + by sector/department).
- **Adoption** rates (awareness → embedded funnel).
- **Engagement indicators** (pulse, eNPS direction, behavior prevalence).

Designed for **action**: each metric pairs with a "nudge / follow-up" affordance and a sector/manager breakdown so Change Management can target intervention.

---

## 4. Executive Analytics *(Intelligence layer — AGGREGATE ONLY, NO employee leaderboards)*

> **Governance (locked):** the platform does **NOT** rank employees and does **NOT** show
> competitive public leaderboards of individuals. No "most engaged employee" lists.
> The goal is participation and belonging, never employee competition.

**Aggregate insights only**, at organizational / sector / department / manager level:
- Most **engaged** sector · most **active** sector · highest **recognition** sector ·
  highest **feedback-participation** sector · highest **goal-completion** sector.
- Department- and manager-level rollups of the same metrics.
- Organizational engagement, participation, recognition, feedback, and adoption trends.

**Personal view for the employee (not comparative):**
- A personal **Himmah Score (مؤشر الهِمّة)** — a growth/contribution indicator blending the
  employee's *alignment* (Golden-Thread completeness), *contribution* (goals/recognition given),
  *development* (growth activity), and *participation* (feedback/voice). It is **personal and
  developmental** — shown only to the employee (and their manager for support), never ranked
  against peers, never public, never tied to compensation.

Framing rule: insights celebrate collective momentum and guide support — they are **not**
performance ratings and never feed compensation.

---

## 5. Organizational Heatmaps *(Intelligence layer)*

Color-graded matrices (brand greens) across the dimensions:
- **Participation · Recognition · Feedback activity · Goal completion · Manager engagement · Change adoption**

…sliced **By Sector · By Department · By Manager**. Heatmaps make hotspots and cold-spots instantly legible for leadership and Change Management. Privacy: cells below n≥5 are suppressed/aggregated.

---

## 6. Employee Interaction Metrics *(per-employee + rollups)*

Track and report:
- Recognition **sent** / **received**
- Feedback **sent** / **received**
- **Coffee-chat** participation
- **Knowledge-sharing** participation
- **Goal completion**
- **Meeting / 1:1 participation**

*(Coffee-chat & knowledge-sharing relate to the previously-defined Connection module M15 — surfaced here as metrics, not a new module.)*

---

## 7. Strategic Alignment Metrics *(Golden Thread analytics)*

Make the Golden Thread measurable:
- **Goals linked to each** of the 6 strategic priorities.
- **Employees contributing** to each priority.
- **Departments contributing** to each priority.
- **Goal completion by** strategic priority.

This turns the line-of-sight principle into a live, board-level view of strategic mobilization.

---

## 8. Genetic Code Metrics *(culture analytics)*

Make the 12 behaviors measurable:
- **Most** demonstrated behaviors · **least** demonstrated behaviors.
- **Recognition by behavior** (which behaviors are celebrated most).
- **Sector** behavior distribution.
- **Manager** behavior distribution.

Lets leadership see culture forming in real terms — and spot under-reinforced behaviors.

---

## Scope guardrails (unchanged commitments)

- **No new business modules** beyond the approved 15; items 3–8 are an **analytics & operations deepening** of existing modules (M8 Insights, M7 Change, M4 Recognition, M5 Voice, M1 Golden Thread).
- **Governance preserved:** aggregate-only for executives, **n≥5** anonymity floor, voice confidentiality = user choice, recognition non-compensatory, flag-for-review for goals, manager-authored experiences via templates.
- **No employee competition:** no public ranking of individuals; aggregate (org/sector/dept/manager) insights for leadership; **operational follow-up lists** (who hasn't completed required activities) are visible **only to HC & Change Management** for supportive follow-up — never to executives as rankings, never punitive. Employees see a **personal, developmental Himmah Score** focused on growth/contribution/alignment, not comparison.
- **Redesign quality bar** (warm Culture Amp × structured Workday, Arabic-first, official branding) applies to every new view.

---

## Build sequence (proposed)

1. **Branding lock** — official logo + palette + type everywhere. *(started)*
2. **Professional Arabic content library** — replace all copy.
3. **Change Management dashboard** (req. 3) — Operations layer.
4. **Executive Analytics + Heatmaps** (req. 4, 5) — Intelligence layer.
5. **Strategic Alignment + Genetic Code metrics** (req. 7, 8).
6. **Interaction metrics** (req. 6) into employee/manager views.
7. Roll the redesign language across remaining employee/manager screens.

Each step deployed to the same Vercel preview for review before proceeding.
