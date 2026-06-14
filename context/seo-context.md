# SEO Context

A founder portfolio earns its keep largely through search and
sharing: it should rank for the founder's name, reinforce
Refacint's presence, and look right when shared on social.
This file is the contract for everything search- and
share-related.

## Goals

1. Rank for the founder's name and "Refacint founder"-style
   queries.
2. Reinforce, not cannibalize, refacint.com. The subdomain
   complements the main domain.
3. Render correctly and attractively when shared (Open Graph,
   Twitter cards).
4. Be fully crawlable and fast (Core Web Vitals are a ranking
   and UX factor).

## Metadata

- Every route exports `metadata` (or `generateMetadata`) with
  a unique title and description.
- Root layout sets defaults: site name, default description,
  canonical `metadataBase` of `https://afeez.refacint.com`,
  default OG and Twitter card.
- **Title pattern:** `"<Page> — Afeez | Refacint Technologies"`.
  Homepage: `"Afeez — Founder, Refacint Technologies"` (or a
  founder-toned variant). Keep titles under ~60 chars.
- **Description:** 140-160 chars, specific and human, per page.
  No keyword stuffing. Founder voice (see `brand-context.md`).

## Open Graph and Twitter

- Provide a branded OG image at `/og.png` (1200×630), on-brand
  (navy/blue, founder name + role). Reference it in default
  metadata via `openGraph.images` and `twitter.images`.
- `twitter.card` = `summary_large_image`.
- `openGraph.type` = `website` for the homepage, `article` for
  any case-study pages.
- Per-project pages may generate a project-specific OG image
  in Phase 2; MVP can reuse the default.

## Structured Data (JSON-LD)

- Add a `Person` schema in the root layout or homepage: name,
  jobTitle ("Founder"), worksFor (Organization "Refacint
  Technologies", url refacint.com), url, sameAs (social
  profiles from `socials.ts`).
- Add an `Article` (or `BlogPosting`) schema on each
  `/blog/[slug]` page: headline (title), description (excerpt),
  image (cover), datePublished (`publishedAt`), dateModified
  (`updatedAt`), and author (the founder). Generate it from the
  post data.
- For `/work/[slug]` case studies (Phase 2), consider
  `CreativeWork` schema.
- Keep JSON-LD accurate — only assert real facts. Never emit
  Article data for a draft.

## Blog SEO

- Each post page sets per-post metadata via `generateMetadata`:
  title (post title), description (excerpt), and Open Graph
  image (the post's cover image; fall back to the site default).
- Canonical URL per post: `https://afeez.refacint.com/blog/<slug>`.
- The blog index and each post are included in the sitemap once
  PUBLISHED.
- Drafts are `noindex` and excluded from sitemap, RSS, and all
  public listings.
- Stable slugs for published posts (see `database-schema.md`);
  if a slug must change, add a redirect to preserve link equity.

## Crawlability

- `app/sitemap.ts` generates a sitemap including the homepage,
  `/blog`, every PUBLISHED `/blog/[slug]`, and any published
  `/work/[slug]` routes. Drafts and `/admin/*` are excluded.
- `app/robots.ts` allows public routes, **disallows `/admin`**,
  and points to the sitemap.
- All `/admin/*` pages are `noindex` (and blocked in robots).
- `/rss.xml` provides an RSS feed of PUBLISHED posts, linked
  from the blog index `<head>`.
- Canonical URLs set via `metadataBase` + per-route
  `alternates.canonical` where needed.
- All primary content is server-rendered HTML — no content
  hidden behind client-only rendering that crawlers might miss.

## Subdomain Considerations

- `afeez.refacint.com` is a subdomain of the agency site.
  Search engines may treat it as related-but-distinct. The
  goal is mutual reinforcement:
  - The footer links to refacint.com (required cross-link).
  - The agency site should link to afeez.refacint.com (e.g.
    an "About the founder" link) — coordinate this on the
    agency side.
- Submit afeez.refacint.com as its own property in Google
  Search Console (the agency uses GSC already).
- Use a distinct GA4 property/stream for this subdomain so its
  traffic is measured separately from the agency site.

## Performance (ranking + UX)

- Fonts via `next/font` (no layout shift, no external font
  requests).
- All images via `next/image`, correctly sized, lazy below the
  fold, with explicit dimensions to avoid CLS.
- Minimal client JS; most of the page is static SSR.
- Target green Core Web Vitals (LCP, CLS, INP). The hero image
  is the likely LCP element — prioritize and size it well.

## Accessibility (overlaps SEO)

- One `<h1>` per page (the hero title on the homepage).
- Logical heading hierarchy (`h2` per section, `h3` within).
- Meaningful `alt` on every image.
- Descriptive link text — never "click here".

## Checklist per New Route

1. Unique `metadata` title + description.
2. Canonical correct.
3. OG/Twitter image resolves.
4. Added to `sitemap.ts` if public.
5. Single `<h1>`, logical headings.
6. JSON-LD accurate if applicable.
7. Images sized, `alt` set.
