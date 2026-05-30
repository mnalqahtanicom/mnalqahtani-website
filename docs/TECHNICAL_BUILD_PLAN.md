# Technical Build Plan — mnalqahtani.com

**Status:** Awaiting approval. No production code until sign-off.
**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · next-intl · Vercel
**Languages:** Arabic (RTL, default) · English (LTR)

---

## 1. Folder Structure

```
mnalqahtani-website/
├── app/
│   └── [locale]/                  # locale segment: "ar" | "en"
│       ├── layout.tsx             # sets <html lang dir>, fonts, providers
│       ├── page.tsx               # Home
│       ├── about/page.tsx
│       ├── expertise/
│       │   ├── page.tsx           # expertise overview
│       │   └── [slug]/page.tsx    # one discipline (dynamic)
│       ├── insights/
│       │   ├── page.tsx           # article hub (list + filter)
│       │   └── [slug]/page.tsx    # article detail
│       ├── speaking/page.tsx
│       ├── media/page.tsx
│       ├── contact/page.tsx
│       ├── not-found.tsx
│       └── opengraph-image.tsx    # dynamic OG images
│   ├── sitemap.ts                 # generates /sitemap.xml (both locales)
│   ├── robots.ts                  # generates /robots.txt
│   └── api/
│       └── contact/route.ts       # contact form handler (server)
│
├── components/
│   ├── layout/                    # Header, Footer, LanguageSwitcher, MobileNav
│   ├── sections/                  # Hero, ExpertiseGrid, ApproachSteps, InsightsGrid, QuoteBlock, CtaBand, Timeline
│   ├── ui/                        # Button, Card, Container, SectionHeading, Pill
│   └── seo/                       # JsonLd schema components
│
├── i18n/
│   ├── routing.ts                 # locales, defaultLocale, pathnames
│   ├── request.ts                 # next-intl request config
│   └── navigation.ts              # typed Link/redirect/usePathname
│
├── messages/
│   ├── ar.json                    # Arabic UI strings
│   └── en.json                    # English UI strings
│
├── content/                       # (Phase 1) local MDX/JSON until CMS
│   ├── insights/
│   └── expertise/
│
├── lib/                           # cms client, fonts, utils, metadata helpers
├── styles/                        # globals.css, tailwind layers
├── public/                        # images, favicon, og fallback, /fonts if self-hosted
├── middleware.ts                  # next-intl locale negotiation + redirects
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
├── .env.local                     # secrets (gitignored)
├── .env.example                   # documented placeholders
└── .github/workflows/ci.yml       # lint, typecheck, build
```

---

## 2. Page Routing

Locale-prefixed URLs. Arabic is the default brand experience but **both locales are prefixed** for clean SEO and unambiguous `hreflang`.

| Page | English | Arabic |
|---|---|---|
| Home | `/en` | `/ar` |
| About | `/en/about` | `/ar/about` |
| Expertise (hub) | `/en/expertise` | `/ar/expertise` |
| Expertise (detail) | `/en/expertise/strategy-execution` | `/ar/expertise/strategy-execution` |
| Insights (hub) | `/en/insights` | `/ar/insights` |
| Insight (article) | `/en/insights/[slug]` | `/ar/insights/[slug]` |
| Speaking | `/en/speaking` | `/ar/speaking` |
| Media | `/en/media` | `/ar/media` |
| Contact | `/en/contact` | `/ar/contact` |

- **Root `/`** → middleware redirects to the visitor's preferred locale (Accept-Language), defaulting to `ar`.
- **Slugs stay identical across locales** (English/transliterated) so links are shareable and unbreakable; the *visible* title is translated. (We can add localized slugs later via `pathnames` if desired.)
- **Rendering:** Static Generation (SSG) + ISR for content pages; `generateStaticParams` over `[locale]` × slugs. Contact uses a server action / route handler.

---

## 3. i18n Structure (next-intl)

**`i18n/routing.ts`**
```ts
export const routing = {
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  localePrefix: 'always',     // /ar and /en both prefixed
};
```

**`middleware.ts`** — runs next-intl middleware: locale detection, redirect of `/` → `/ar`, and rewrites. Matcher excludes `/api`, `/_next`, static assets.

**Layout direction** — `app/[locale]/layout.tsx`:
```tsx
const dir = locale === 'ar' ? 'rtl' : 'ltr';
return <html lang={locale} dir={dir}> ... </html>;
```

**Message strategy**
- `messages/{locale}.json` hold **UI chrome** (nav, buttons, labels, section headings) — namespaced (`nav.*`, `hero.*`, `cta.*`).
- **Long-form content** (articles, expertise copy, bio) lives in the **CMS / content layer**, not message files — keeps translations editorial and editable without code.
- Type-safe keys via next-intl's TypeScript augmentation.

**RTL/LTR handling (concrete)**
- Tailwind **logical properties**: `ps-*/pe-*`, `ms-*/me-*`, `text-start/text-end`, `border-s/border-e` everywhere — no hard `left/right`.
- Directional icons (arrows) flipped with `rtl:-scale-x-100`.
- **Per-locale typography**: Arabic gets larger line-height and the Arabic font stack (see §4 fonts), set on `<html>` via a `data-locale` / `dir` selector.

---

## 4. Component Breakdown

**Layout**
- `Header` — sticky, frosted; logo/monogram, nav, `LanguageSwitcher`, contact CTA.
- `LanguageSwitcher` — swaps locale **preserving the current path** (next-intl `usePathname`/`Link`).
- `MobileNav` — accessible slide-in drawer (mirrors for RTL).
- `Footer` — nav, social, legal, locale switch.

**Sections (composable, content-driven)**
- `Hero` — eyebrow, H1 (headline), sub-line, dual CTAs, portrait. *(Arabic: headline "من الاستراتيجية إلى الأثر" + sub-line "من الاستراتيجية إلى نتائج قابلة للقياس".)*
- `CredibilityStrip` — 21+ yrs · MSc Michigan State · 6 domains.
- `ExpertiseGrid` — 6 cards → detail pages.
- `ApproachSteps` — **Strategy to Results™ Framework** (Diagnose → Design → Execute → Sustain).
- `InsightsGrid` — latest articles (from CMS).
- `QuoteBlock` — philosophy pull-quote.
- `CtaBand` — engagement CTA.
- `Timeline` — career milestones (About).
- `PrinciplesGrid`, `CredentialsPanels` (About).

**UI primitives**
- `Button` (gold / ghost / navy variants), `Card`, `Container`, `SectionHeading`, `Pill`, `Prose` (typographic wrapper for article bodies).

**SEO components**
- `JsonLd` renderers: `Person`, `Organization`, `Article`, `BreadcrumbList`, `Event`.

All section components receive typed props (no hardcoded copy) so they render from messages or CMS data and work identically in both directions.

---

## 5. Content Model

Defined as typed schemas (used by both the CMS and the local fallback). Every translatable field is **localized (ar/en pair)**.

**`Insight` (article)**
| Field | Type | Notes |
|---|---|---|
| `title` | localized string | |
| `slug` | string | shared across locales |
| `excerpt` | localized text | for cards + meta description |
| `body` | localized rich text / MDX | article content |
| `topic` | reference → `Topic` | filtering |
| `coverImage` | image | with alt (localized) |
| `publishedAt` | datetime | |
| `readingTime` | number (auto) | |
| `seo` | object | title, description, ogImage overrides |
| `featured` | boolean | homepage selection |

**`Expertise` (discipline)**
| Field | Type |
|---|---|
| `title`, `slug`, `summary` | localized / string |
| `problem`, `approach`, `engagement` | localized rich text |
| `order` | number |
| `relatedInsights` | references |

**`Topic`** — `title` (localized), `slug`.
**`SpeakingEngagement`** — `title`, `event`, `date`, `location`, `videoUrl`, `summary` (localized).
**`SiteSettings` (singleton)** — bio, contact details, social links, downloadable bio PDF (per locale), default SEO/OG.

---

## 6. CMS Recommendation (publish articles without coding)

**Primary recommendation: Sanity.io**

Why Sanity fits this project best:
- **First-class localization** — field-level ar/en with a clean editor; ideal for a bilingual site.
- **Non-technical publishing** — you write/edit articles in **Sanity Studio** (a friendly web dashboard) and hit publish; no code, no redeploy needed (ISR revalidates).
- **Generous free tier**, scales fine for a personal brand.
- **Portable Text** → clean, styled rendering with full RTL control.
- **Live preview** of drafts before publishing; scheduled publishing.
- **Great Next.js integration** (official toolkit, webhooks for on-demand revalidation).

**Alternatives considered**
| Option | Verdict |
|---|---|
| **Contentful** | Excellent localization & polished UI; heavier, pricier at scale. Strong runner-up. |
| **Strapi (self-hosted)** | Full control/open-source but you must host & maintain it — more ops overhead. |
| **MDX files in repo** | Zero cost, but **requires editing files in GitHub** = not "publish without coding." Good only as Phase-1 fallback. |

**Plan:** Build the content layer behind a thin `lib/cms` interface. **Phase 1** can ship with local MDX so the site goes live fast; **Phase 2** swaps in Sanity behind the same interface with no component changes. Studio can be hosted at `studio.mnalqahtani.com` or `/studio`.

---

## 7. SEO Checklist

**Architecture**
- [ ] Locale-prefixed URLs + `localePrefix: 'always'`.
- [ ] `hreflang` alternates for every page (ar ↔ en) + `x-default` → `ar`, via Next.js `alternates.languages` in `generateMetadata`.
- [ ] Correct `<html lang>` and `dir` per locale.
- [ ] Canonical URL on every page.

**Metadata**
- [ ] Per-page `generateMetadata` (localized title, description, OG, Twitter).
- [ ] Dynamic **OG images** (`opengraph-image.tsx`) per page/article.
- [ ] Title template: `%s — Mohammed Al-Qahtani` / Arabic equivalent.

**Structured data (JSON-LD)**
- [ ] `Person` (you) on Home/About — name, jobTitle, alumniOf (Michigan State), sameAs (LinkedIn).
- [ ] `Article` on each insight (headline, author, datePublished, image).
- [ ] `BreadcrumbList` on nested pages.
- [ ] `Event` on speaking engagements.
- [ ] `WebSite` + `Organization`.

**Technical**
- [ ] `sitemap.ts` → all routes × both locales, with `alternates`.
- [ ] `robots.ts` → allow all, link sitemap.
- [ ] Core Web Vitals: `next/font` (no layout shift), `next/image` (AVIF/WebP, sizes), route-level code splitting.
- [ ] Semantic HTML, one `<h1>`/page, logical heading order, descriptive alt text (localized).
- [ ] Accessibility: WCAG AA contrast (palette already passes), focus states, skip-link, keyboard nav.

**Off-page / setup**
- [ ] Google Search Console (verify both locales) + GA4.
- [ ] LinkedIn `sameAs` + consistent bio.

---

## 8. Deployment Checklist (Vercel)

- [ ] Connect GitHub repo to Vercel project.
- [ ] Framework preset: **Next.js** (auto). Build: `next build`.
- [ ] **Environment variables** set in Vercel (Production + Preview):
  - `NEXT_PUBLIC_SITE_URL=https://mnalqahtani.com`
  - `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_READ_TOKEN` (Phase 2)
  - `SANITY_REVALIDATE_SECRET` (webhook), contact-form provider key (e.g. `RESEND_API_KEY`)
- [ ] **Custom domain**: add `mnalqahtani.com` + `www` → set DNS (A/CNAME per Vercel), enforce HTTPS, redirect `www` → apex.
- [ ] **Preview Deployments**: every PR gets a unique preview URL for review.
- [ ] **ISR / On-demand revalidation**: Sanity webhook → `/api/revalidate` so published articles appear without redeploy.
- [ ] Image optimization + caching headers verified.
- [ ] Analytics: enable **Vercel Analytics / Speed Insights**.
- [ ] Post-deploy: run Lighthouse, validate `hreflang` & JSON-LD (Rich Results Test), submit sitemap to Search Console.

---

## 9. GitHub Workflow

**Branching**
- `main` — production (auto-deploys to mnalqahtani.com via Vercel). Protected.
- `claude/*` (e.g. current `claude/relaxed-gates-MLhG5`) — feature/working branches.
- Flow: branch → commit → push → **PR into `main`** → preview deploy + CI → review → merge.

**Branch protection on `main`** (recommended)
- [ ] Require PR before merge.
- [ ] Require CI status checks to pass.
- [ ] No direct pushes.

**CI — `.github/workflows/ci.yml`** (runs on every PR)
- [ ] `pnpm install`
- [ ] `pnpm lint` (ESLint)
- [ ] `pnpm typecheck` (`tsc --noEmit`)
- [ ] `pnpm build` (catch build errors before deploy)
- [ ] (optional) Lighthouse CI budget check on preview URL.

**Conventions**
- Conventional commit messages.
- PRs kept focused; Vercel preview link auto-posted.
- I can **watch the PR** (subscribe to CI/review events) and auto-fix CI failures + respond to review comments once we open one.

---

## 10. Proposed Build Phases (after approval)

1. **Scaffold** — Next.js + TS + Tailwind + next-intl, middleware, layout, fonts, design tokens (Navy/Gold/Ivory), CI.
2. **Core pages** — Home + About (from approved mockups), Header/Footer/LanguageSwitcher, all sections, full RTL/LTR.
3. **Expertise** — overview + 6 detail pages + Strategy to Results™ Framework.
4. **Insights** — hub + article template (MDX Phase-1), SEO + JSON-LD.
5. **Speaking / Media / Contact** — incl. contact route + bio PDF.
6. **SEO/perf pass** — sitemap, robots, OG images, Lighthouse, a11y.
7. **CMS (Phase 2)** — integrate Sanity + revalidation webhook.
8. **Launch** — domain, env, Search Console/GA4, final QA.

---

*End of plan. Awaiting your approval (or change requests) before any production code.*
