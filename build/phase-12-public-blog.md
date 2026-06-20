# Phase 12 — Public Blog

## What you're building and why

Everything in Phases 8–11 happened behind the login. This phase
makes your published posts **public**: a `/blog` page listing your
posts, a page for each post (`/blog/[slug]`), an RSS feed, and —
finally — the homepage **Writing** section that was deliberately
left out of Phase 7 because the blog didn't exist yet.

By the end, the loop is complete: you write a post in the
dashboard, publish it, and it appears live on your blog and in the
homepage Writing teaser. This is the moment your custom CMS pays
off end to end.

## How to run this phase

Have Claude Code read `context/feature-specs.md` (§11 Blog and §7
the Writing teaser), `context/database-schema.md` (the read
helpers, PUBLISHED-only rule), `context/seo-context.md` (blog SEO,
Article JSON-LD, sitemap, RSS), and this file. Standing rules
apply.

## Concepts you need first

- **Public vs draft.** The blog shows **only PUBLISHED** posts.
  Drafts must never appear on any public page, the sitemap, or the
  RSS feed — even by guessing the URL. This is a firm rule from
  your specs.
- **Rendering markdown to HTML.** Your posts are stored as
  markdown. The public post page converts that markdown into
  formatted HTML (headings, lists, links, images, code blocks)
  and styles it for comfortable reading. It should use the **same
  renderer** as the dashboard's live preview, so what you saw
  while writing is exactly what readers see.
- **`/blog/[slug]` (dynamic route).** One page template that
  serves every post, filling in the right post based on the slug
  in the URL. `/blog/my-first-post` loads the post with that slug.
- **RSS feed.** A machine-readable list of your posts at
  `/rss.xml`, so readers can subscribe in feed readers and other
  tools can syndicate your writing.
- **Article structured data (JSON-LD).** Hidden, machine-readable
  info on each post page that tells search engines "this is an
  article, here's its title, date, author." Helps SEO. Only for
  published posts — never drafts.
- **The Writing teaser.** The homepage section (left out of Phase
  7) showing your latest few posts, linking into `/blog`.

## What you provide

- At least **one real published post** to see the blog working
  properly (you can write it now in the dashboard if you haven't —
  a genuine short first post is better than placeholder text,
  since it's going live).

## Steps

### Step 1 — The blog index (`/blog`)

> Read `context/feature-specs.md` §11 and `context/seo-context.md`.
> Build the public blog index at `/blog`: a page header, then a
> grid/list of all **PUBLISHED** posts (newest first), read from
> the database via the `getPublishedPosts` helper. Each card shows
> cover image, title, excerpt, date, reading time, tags, linking
> to `/blog/[slug]`. Include a designed empty state. Drafts must
> never appear. Per-page metadata per `seo-context.md`. Espresso &
> Teal, both modes. PowerShell-native; show me first.

**Check:** visit `/blog`. Your published post appears as a card;
drafts do not. Looks right in both modes.

### Step 2 — The post page (`/blog/[slug]`)

> Build the individual post page at `/blog/[slug]` per §11.2: it
> renders the post's cover, title, date, reading time, tags, then
> the body — markdown rendered to styled, readable HTML
> (`max-w-prose`, proper heading/list/quote/code styling, both
> modes), using the **same renderer** as the dashboard preview so
> they match. Code blocks syntax-highlighted; body images
> responsive via `next/image`. Add `generateMetadata` per post
> (title, excerpt as description, cover as OG image) and `Article`
> JSON-LD. A DRAFT or unknown slug returns **404**. Render markdown
> safely. End the post with a back-link to `/blog` and a subtle
> Contact CTA. PowerShell-native.

**Check thoroughly:**
- Click your post from `/blog` — it opens and reads well.
- The formatting matches what you saw in the dashboard preview.
- Try a fake slug (`/blog/does-not-exist`) → 404.
- **Draft privacy test:** make sure a DRAFT post's slug returns
  404 if you type it directly — drafts must be unreachable
  publicly. Test this with a real draft.

### Step 3 — RSS feed

> Add an RSS feed at `/rss.xml` listing PUBLISHED posts (title,
> link, excerpt, date) with absolute URLs, and link it from the
> blog index `<head>` per `seo-context.md`. Drafts excluded.
> PowerShell-native.

**Check:** visit `/rss.xml` — you should see XML listing your
published post(s), no drafts.

### Step 4 — Wire the homepage Writing teaser

This completes the section deferred from Phase 7.

> Build the homepage **Writing** section (`#writing`) per
> `feature-specs.md` §7: a `SectionHeading` then the latest 3
> PUBLISHED posts (from `getPublishedPosts`) as cards linking to
> `/blog/[slug]`, plus a "Read all posts" link to `/blog`. If no
> posts are published yet, show the designed empty state. Add it
> to the homepage in its correct position, and make sure the
> header's "Writing" nav anchor now jumps to it. PowerShell-native.

**Check:** on the homepage, the Writing section shows your latest
post(s) and links into the blog. The header "Writing" link now
scrolls to it.

### Step 5 — Add blog to sitemap & SEO finishing

> Update `app/sitemap.ts` to include `/blog` and every PUBLISHED
> `/blog/[slug]` (drafts and `/admin` excluded), and confirm
> `app/robots.ts` disallows `/admin`. Confirm each post page emits
> correct metadata and `Article` JSON-LD. PowerShell-native.

(If `sitemap.ts`/`robots.ts` don't exist yet, that's fine — they
get fully set up in Phase 14; here just ensure published posts
will be included when they do.)

## Verify

- `/blog` lists PUBLISHED posts (newest first); drafts absent;
  empty state works.
- `/blog/[slug]` renders posts cleanly, matching the dashboard
  preview; unknown/draft slugs 404.
- Drafts are unreachable publicly (tested by direct URL).
- `/rss.xml` lists published posts only.
- Homepage Writing section shows latest posts and links to `/blog`;
  header anchor works.
- Post pages have per-post metadata + Article JSON-LD.
- Both modes correct; console clean; `npm run build` passes.

## Common problems and fixes

- **A draft shows publicly (or its URL works):** serious — the
  public queries must filter `status = PUBLISHED` and the slug
  route must 404 on drafts. Stop and have Claude Code fix the
  filter before continuing.
- **Preview and published post look different:** they must share
  one markdown renderer/style. Point Claude Code to unify them.
- **Markdown renders unsafely / weird HTML:** ensure a safe
  renderer is used. The author is just you, but render safely
  anyway.
- **Images in posts don't load:** Cloudinary domain may need
  adding to the Next.js image config (from Phase 11).
- **Changes not showing:** hard refresh; restart dev; clear
  `.next`.

## Commit & wrap-up

> The public blog works end to end: `/blog`, `/blog/[slug]`, RSS,
> and the homepage Writing section, all showing only published
> posts, drafts private. Confirm `npm run build` passes, update
> `context/progress-tracker.md`, commit and push. PowerShell-
> native.

Take a moment — this is a real milestone. You can now write a post
in your own dashboard and publish it to your own blog, on your own
domain. The custom CMS you decided on is fully working.

Next: `phase-13-contact.md`, the last homepage section — the
contact form (with email delivery) — after which the site is
content-complete and we move to SEO, analytics, QA, and launch.
