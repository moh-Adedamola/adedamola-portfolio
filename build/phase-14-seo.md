# Phase 14 — SEO Baseline

## What you're building and why

A founder portfolio earns much of its value through search and
sharing. This phase makes your site discoverable by search engines
and attractive when shared on social media: page titles and
descriptions, a branded preview image, a sitemap, a robots file,
and structured data that tells Google "this is Afeez, founder of
Refacint." Most of this is invisible on the page but matters a lot
for being found.

By the end, your site will have proper metadata on every page, a
nice social-share preview, and the machine-readable signals search
engines want.

## How to run this phase

Have Claude Code read `context/seo-context.md` (the authority for
all of this) and this file. Standing rules apply.

## Concepts you need first

- **Metadata.** The title and description for each page — what
  shows in the browser tab and in Google results. Each page should
  have a unique, accurate one.
- **Open Graph (OG) image.** The preview image/card that appears
  when your link is shared on LinkedIn, X, WhatsApp, etc. A branded
  1200×630 image makes shares look intentional, not broken.
- **Sitemap.** A file (`/sitemap.xml`) listing your public pages so
  search engines can find them all. Includes the homepage, `/blog`,
  and each published post — never drafts or `/admin`.
- **robots.txt.** A file telling search engines what they may
  crawl. Yours allows public pages and **disallows `/admin`**.
- **Structured data (JSON-LD).** Hidden machine-readable facts. A
  `Person` schema for you (name, role, employer, social profiles)
  on the homepage; `Article` on each post (done in Phase 12).
- **Canonical URL.** The official URL for a page, so search engines
  don't treat duplicates as separate pages.

## What you provide

- A **branded OG image** (1200×630) — on-brand espresso/teal, with
  your name and role. If you can't make one now, Claude Code can
  generate a simple branded one, or use a tasteful placeholder
  marked `TODO(asset)` and replace before launch.
- Confirmation of your **social profile URLs** (for the `Person`
  schema's `sameAs`) — or keep `TODO(content)` if not ready.

## Steps

### Step 1 — Root metadata and canonical

> Read `context/seo-context.md`. Set up the root metadata in
> `layout.tsx`: site name, default description, `metadataBase` of
> `https://afeez.refacint.com`, and the default Open Graph +
> Twitter card. Use the title pattern from `seo-context.md`. Ensure
> every page can set its own title/description. PowerShell-native;
> show me first.

### Step 2 — Per-page metadata

> Confirm each route sets a unique title and description: the
> homepage, `/blog`, and `/blog/[slug]` (per-post, done in Phase
> 12). Add/verify titles for any other public pages. Keep titles
> under ~60 chars and descriptions 140–160, in founder voice.
> PowerShell-native.

### Step 3 — The OG image

> Add the social preview image at `public/og.png` (1200×630),
> on-brand Espresso & Teal with my name and "Founder, Refacint
> Technologies", and reference it in the default Open Graph and
> Twitter metadata. If I haven't supplied one, generate a clean
> branded version. PowerShell-native.

### Step 4 — Person structured data

> Add `Person` JSON-LD (in the root layout or homepage): my name,
> jobTitle "Founder", worksFor the Organization "Refacint
> Technologies" (url refacint.com), my site url, and `sameAs` my
> social profiles from `socials.ts` (use placeholders if those are
> still TODO). Only assert real facts. PowerShell-native.

### Step 5 — Sitemap and robots

> Create/confirm `app/sitemap.ts` generating a sitemap with the
> homepage, `/blog`, and every PUBLISHED `/blog/[slug]` (drafts and
> `/admin` excluded). Create/confirm `app/robots.ts` that allows
> public routes, **disallows `/admin`**, and points to the sitemap.
> PowerShell-native.

### Step 6 — Check it

**Check:**
- Visit `/sitemap.xml` — it lists your public pages and published
  posts, no drafts, no `/admin`.
- Visit `/robots.txt` — it disallows `/admin` and references the
  sitemap.
- View page source on the homepage (right-click → View Source) and
  confirm the title, description, OG tags, and the `Person` JSON-LD
  are present.
- Each post page shows its own title/description and `Article`
  JSON-LD.

(You can fully validate share previews after deploy, when the site
has a real URL — note it for QA.)

## Verify

- Root + per-page metadata set; titles/descriptions unique and
  accurate.
- `public/og.png` exists and is referenced (or `TODO(asset)`).
- `Person` JSON-LD on homepage; `Article` on posts; only real
  facts.
- `/sitemap.xml` correct (no drafts/admin); `/robots.txt`
  disallows `/admin`.
- One `<h1>` per page; logical headings.
- `npm run build` passes.

## Common problems and fixes

- **Sitemap includes drafts or admin:** the generator must filter
  to PUBLISHED and exclude `/admin` — have Claude Code fix the
  query.
- **OG image not showing in previews:** confirm the path is correct
  and absolute via `metadataBase`; full validation happens
  post-deploy.
- **Duplicate/missing titles:** ensure each route exports its own
  metadata; the homepage shouldn't share a generic title with
  posts.

## Commit & wrap-up

> SEO baseline done: metadata, OG image, Person/Article JSON-LD,
> sitemap, robots. Confirm `npm run build` passes, update
> `context/progress-tracker.md`, commit and push. PowerShell-
> native.

Next: `phase-15-analytics.md` — add Google Analytics so you can see
who's visiting once you're live.
