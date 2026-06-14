# Afeez Founder Portfolio — Project Overview

## Overview

This is the personal portfolio site of **Afeez**, founder
of **Refacint Technologies** — a Lagos-based software and
AI agency that builds custom software, AI agents, workflow
automation, custom CRMs, and offers AI consulting. Refacint's
tagline is "We Build. We Automate. You Grow."

The portfolio lives at **afeez.refacint.com** (a subdomain
of the agency site) and presents the founder as a credible,
specific, locally-grounded operator. It is the human face
behind the agency: where refacint.com sells the company,
this site builds trust in the person behind it.

The site is a marketing/content site with one dynamic feature:
the founder's own **blog**, managed through a custom admin
dashboard. Static content (hero, about, work, etc.) is defined
in typed data files; blog posts are stored in a database and
authored through the dashboard. There is no public sign-up and
no payment processing — the only authenticated user is the
founder, who signs in to write posts.

## Audiences and Goals

The site serves three goals at once. Every page should
serve at least one without undermining the others.

1. **Win Refacint clients.** Lagos/Nigerian SMBs and
   global-facing prospects evaluating whether to hire the
   agency. They want proof the founder can deliver.
2. **Build a personal brand / thought leadership.** Peers,
   the local tech community, and a broader audience who
   discover the founder through writing and talks.
3. **Attract speaking and consulting engagements.** Event
   organizers and companies looking for an automation/AI
   advisor.

### Success Criteria

1. A prospect can land on the homepage, understand who
   Afeez is and what he does within five seconds, see
   credible proof of work, and reach a contact path — in
   under two minutes.
2. The site ranks for the founder's name and surfaces
   alongside Refacint in search.
3. Every claim on the site is real and verifiable. Zero
   fabricated stories, metrics, or testimonials.
4. The site loads fast (good Core Web Vitals) and works on
   mobile and desktop, light and dark.
5. `npm run build` passes with zero TypeScript errors and
   zero ESLint warnings.

## Sections

The site is primarily a single-page experience with a few
supporting routes. Minimal navigation is a deliberate
choice — keep the focus on the founder and the work.

- **Hero** — Name, role ("Founder, Refacint Technologies"),
  a one-line positioning statement, and a primary CTA
  (book a call / work with me). A real photo of the founder.
- **About** — First-person founder story: background, why
  automation/AI, the Lagos-and-global angle. Specific, not
  generic. Links to Refacint.
- **Work** — Selected projects and client work: MOLEK
  Schools, Klassrun Technologies, Tenderville School, plus
  Refacint itself. Each as a structured case-study card or
  page (problem → approach → outcome), grounded in real,
  verifiable detail.
- **Consulting** — What the founder advises on (AI agents,
  workflow automation, sales/ops bots, content pipelines),
  engagement types, and how to start. Flexible payment-terms
  language suited to the Nigerian market — no fixed dollar
  figures.
- **Speaking** — Talks and topics offered. Designed to work
  as an empty/coming-soon state until there is a track
  record to show.
- **Writing** — A homepage teaser of the latest posts from the
  founder's **own blog** (hosted on this domain), linking to
  `/blog`. The full blog and individual posts live at `/blog`
  and `/blog/[slug]`. Posts are founder-voiced and written
  through the custom admin dashboard. Establishes thought
  leadership on the founder's own domain.
- **Contact** — Email (hello@refacint.com), a simple contact
  form, and social links. Clear single call to action.

Supporting routes: the public blog (`/blog`, `/blog/[slug]`,
`/rss.xml`) at launch; the protected admin dashboard
(`/admin/*`) for writing posts; and, content permitting,
case-study pages under `/work/[slug]` (Phase 2).

## Scope

### Phase 1 — MVP (In Scope)

The minimum needed to put a credible, fast, on-brand founder
site live and cross-linked with Refacint.

- Single-page homepage with all core sections: Hero, About,
  Work, Consulting, Speaking, Writing, Contact.
- Typed content data files for static content (projects,
  services, talks, stack, faq — see `content-model.md`).
- **A founder blog hosted on this domain:** `/blog` index,
  `/blog/[slug]` post pages, and an RSS feed. Posts stored in
  Postgres (Neon) via Prisma.
- **A custom admin dashboard** (`/admin/*`) to write and manage
  posts without touching code: Clerk-secured single-admin
  login, markdown editor with live preview, Cloudinary image
  uploads, draft/publish. See `feature-specs.md` §12.
- Contact form via a server action + Resend email, or a
  graceful mailto fallback.
- Light and dark modes with a toggle.
- Full SEO baseline: per-page metadata, Open Graph image,
  sitemap, robots, structured data (`Person`, and `Article`
  for posts).
- Google Analytics 4 wired via `NEXT_PUBLIC_GA_ID`.
- Cross-linking: footer link to refacint.com (and back from
  the agency site).
- Responsive and accessible.

### Phase 2 — Post-MVP (Out of Scope for now)

- Dedicated case-study pages with deep write-ups per project.
- A speaking page with a talk archive, slides, and video
  embeds once a track record exists.
- Testimonials section (only when real, attributable quotes
  are available).
- A newsletter signup (could pair with the blog later).
- Blog enhancements: tag/category pages, search, related
  posts, scheduled publishing, multiple authors.
- Micro-interactions and richer motion beyond the Phase 1
  baseline.

### Permanently Out of Scope

- **Public** user accounts or sign-up. The only login is the
  single founder admin for the dashboard; visitors never
  authenticate.
- Gated/paywalled content.
- Payments or booking transactions on this domain.
- A second hand-rolled CMS that duplicates the agency site's —
  this site has its own, but we do not build redundant admin
  tooling beyond what the blog needs.
- Duplicating the full Refacint agency site here. This site
  links to it; it does not replace it.

## Relationship to Refacint

Separate repo, separate Vercel project, deployed as the
`afeez.refacint.com` subdomain. Shares brand DNA (navy/blue
palette, Inter + DM Sans, confident founder voice) but is
the founder's voice, not the company's. The two sites
cross-link in their footers.
