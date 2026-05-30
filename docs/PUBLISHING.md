# Publishing Articles — Guide for Mohammed

This site has a built-in content management system (CMS) powered by **Sanity**.
Once it's connected (one-time setup below), you can write and publish articles —
in **Arabic and English** — with **no coding**, from any browser.

Until the CMS is connected, the site shows a set of built-in sample articles, so
nothing ever looks empty.

---

## One-time setup (≈ 5 minutes)

You only do this once.

1. Go to **https://www.sanity.io** and sign up (free) — "Continue with Google"
   is easiest.
2. Create a new **project** (name it e.g. *mnalqahtani*). Choose the
   **Production** dataset and make it **public**.
3. Copy your **Project ID** (shown in the project's settings / dashboard).
4. In **Vercel** → your project → **Settings → Environment Variables**, add:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = *your Project ID*
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
   Apply to **Production, Preview, and Development**, then **Redeploy**.
5. Tell me your Project ID and I'll deploy your editing dashboard (one command:
   `npx sanity deploy`, using the schema already in this repo). After that your
   editing dashboard lives at a hosted URL:
   - **https://your-project.sanity.studio** (bookmark it)

   The dashboard is hosted by Sanity — fast, always up to date, and kept out of
   the website's own build for reliability.

---

## Publishing an article (the everyday workflow)

1. Open **https://your-project.sanity.studio** and log in.
2. Click **Article → Create new**.
3. Fill in:
   - **Title** — English and Arabic tabs
   - **Slug** — click "Generate" (creates the web address)
   - **Excerpt** — a one-line summary (English + Arabic)
   - **Category** — pick from the list (or create one under *Category*)
   - **Tags** — type and press enter
   - **Cover image** — drag-and-drop; it's optimized automatically
   - **Body** — write the article (English + Arabic tabs)
   - **Featured** — toggle ON to show it on the homepage
4. Click **Publish**. It appears on the live site within seconds.

That's it — no code, no redeploy.

---

## What each field controls

| Field | Where it shows |
|---|---|
| Title / Excerpt | Article page, cards, search, SEO |
| Category | Filter buttons on `/insights`, related articles |
| Tags | Search + the tag list on the article |
| Cover image | Card thumbnail + article header |
| Featured | Homepage Insights section + the "Featured" row |
| Body | The article itself (supports headings, lists, quotes, bold) |

---

## Notes

- **Bilingual:** every text field has English + Arabic. Fill both for the best
  experience; the site shows each visitor the right language automatically.
- **Images** are hosted and optimized by Sanity + Next.js (fast, responsive).
- **Search** on the Insights page works instantly across titles, excerpts,
  and tags.
