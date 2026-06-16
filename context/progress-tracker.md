# Progress Tracker

Update this file after every meaningful implementation change.
Treat it as a running journal of where the project is and how
it got there.

## Current Phase

- Phase 0 — Foundation complete. Scaffold, brand theme,
  typography, and shadcn/ui all done. Ready for Phase 1
  (site shell: SiteHeader + SiteFooter).

## Current Goal

- Build the site shell: `SiteHeader` (sticky nav, transparent →
  blur on scroll, Sheet mobile menu, ThemeToggle, primary CTA)
  and `SiteFooter` (founder line, section links, socials,
  refacint.com cross-link).

## Completed

- Scope and goals confirmed: founder portfolio at
  afeez.refacint.com serving three goals (win clients, personal
  brand, speaking/consulting).
- Decisions confirmed: **new dedicated repo**, subdomain on
  Vercel, same stack as the agency site (Next.js + Tailwind v4
  + shadcn), built with Claude Code.
- Design references chosen: Vysta (visual polish) + Stanlee
  (content approach). Captured in `design-reference.md`.
- **CMS decision:** the portfolio runs its own founder-voiced
  blog with a **custom admin dashboard** (deliberate choice
  after weighing MDX / headless / custom). Stack: Postgres
  (Neon) + Prisma, Clerk single-admin auth, markdown editor
  with live preview, Cloudinary image uploads. Blog + dashboard
  are part of launch. Context files updated accordingly
  (`architecture`, `database-schema` [new], `api-routes` [new],
  `content-model`, `feature-specs`, `env-variables`,
  `project-overview`, `seo-context`, `brand-context`).
- Context documentation drafted and revised (this folder).

## In Progress

- **Site shell:** `SiteHeader` + `SiteFooter`.

## Next Up

In order. Foundation first, then static sections, then the
blog + CMS, then SEO/analytics/deploy. The blog and dashboard
are part of launch.

1. ~~**Project scaffold:** `create-next-app` with TypeScript,
   Tailwind v4, ESLint, App Router, `src/` dir. Verify
   `npm run build` and `npm run dev`.~~ ✓ Done — Next.js 15
   scaffolded, `npm run dev` and `npm run build` both clean,
   pushed to GitHub (`moh-Adedamola/adedamola-portfolio`),
   `context/` and `build/` included. `.gitignore` extended
   with `!/build`, `!.env.example`, `src/generated/`.
2. ~~**Brand theme:** semantic tokens from `ui-context.md` in
   `globals.css` via `@theme` (navy/blue, light + dark);
   `next-themes` provider + toggle.~~ ✓ Done — Espresso & Teal
   palette, 14 semantic tokens, `next-themes` + `ThemeToggle`,
   `--brand-espresso` anchor, `ui-context.md` updated.
3. ~~**Typography:** Inter + DM Sans via `next/font/google`.~~ ✓ Done —
   both fonts loaded with `display: "swap"`, `--font-sans` and
   `--font-display` wired through `@theme inline`.
4. ~~**shadcn/ui init:** v4 mode, install MVP components
   (incl. accordion, sheet, sonner).~~ ✓ Done — `components.json`
   hand-crafted (Tailwind v4, new-york style, cssVariables);
   13 MVP components in `src/components/ui/`; accordion
   keyframes added to `globals.css`; `TooltipProvider` + `Toaster`
   wired in `providers.tsx`; `ThemeToggle` in
   `src/components/layout/` uses mounted-state pattern to
   eliminate hydration mismatch; Espresso & Teal tokens
   untouched throughout.
5. **Site shell:** `SiteHeader` + `SiteFooter` (required
   refacint.com cross-link).
6. **Static content data files:** `src/data/` — `site.ts`,
   `projects.ts`, `services.ts`, `stack.ts`, `capabilities.ts`,
   `stats.ts` (real or empty), `faq.ts`, `talks.ts`,
   `socials.ts` per `content-model.md`. (No `posts.ts` — blog
   is DB-backed.)
7. **Hero** → 8. **Capability marquee** + optional **Stats** →
   9. **About** → 10. **Work** (story cards + logo wall) →
   11. **Why Work With Me** → 12. **Consulting** → 13. **Stack**
   → 14. **Speaking** → 15. **FAQ**. Each a slice, each a commit.
   (The homepage **Writing teaser** is wired in step 19 once
   the blog data layer exists.)
16. **Database setup:** Prisma + Neon, the `Post` model from
    `database-schema.md`, initial migration, `lib/db.ts`
    singleton + read/write helpers, seed a draft locally.
17. **Auth setup:** Clerk single-admin, middleware guarding
    `/admin/*` and post-mutating routes (404 for non-admins),
    `requireAdmin` helper + `ADMIN_EMAIL_ALLOWLIST`.
18. **Admin dashboard:** `/admin` sign-in, `/admin/posts` list,
    create/edit with markdown + live preview, Cloudinary signed
    uploads, draft/publish — per `feature-specs.md` §12.
19. **Public blog:** `/blog` index, `/blog/[slug]` post page
    (markdown render, `Article` JSON-LD), `/rss.xml`, and wire
    the homepage **Writing teaser** to the latest published
    posts.
20. **Contact:** form + Server Action + Resend, mailto fallback.
21. **SEO baseline:** root metadata, OG image, `sitemap.ts`
    (incl. published posts), `robots.ts` (disallow `/admin`),
    `Person` + per-post `Article` JSON-LD.
22. **Analytics:** GA4 via `NEXT_PUBLIC_GA_ID`.
23. **Deploy:** Vercel project mapped to afeez.refacint.com;
    env vars incl. DB/Clerk/Cloudinary; `prisma migrate deploy`;
    Search Console; agency-side cross-link.

## Open Questions

- **Founder photo:** Source a real, high-quality photo for the
  hero/About. Needed before Hero is "done".
- **Positioning one-liner:** The founder authors the hero
  positioning statement (founder voice, real). Placeholder
  until provided.
- **About copy:** First-person founder story — to be written by
  / with the founder. No invented biography.
- **Project case-study detail:** Confirm verifiable
  problem/approach/outcome per project before any `/work/[slug]`
  page (Phase 2). Omit unconfirmed metrics.
- **Social profiles:** Confirm which profiles to list in
  `socials.ts` (LinkedIn, X, GitHub, etc.) and their URLs.
- **Resend domain:** Confirm refacint.com is verified in Resend
  for the contact from-address.
- **Neon database:** Create the project; have pooled + direct
  connection strings ready before the database phase.
- **Clerk:** Create the application; decide the single admin
  email for `ADMIN_EMAIL_ALLOWLIST`; test vs production keys.
- **Cloudinary:** Create the account; have cloud name + API
  key/secret before the image-upload phase.
- **First posts:** Have one or two real founder posts ready (or
  drafted) so the blog launches with content, not empty.

## Architecture Decisions

| Date    | Decision                                              | Why                                                                 |
| ------- | ----------------------------------------------------- | ------------------------------------------------------------------- |
| Phase 0 | Separate repo + subdomain, not a route on the agency  | Clean brand/analytics separation; won't bloat the agency site.      |
| Phase 0 | Same stack as Refacint (Next.js + Tailwind v4 + shadcn)| Skill transfer; sibling codebases; consistent brand.               |
| Phase 0 | Contact via Server Action + Resend, mailto fallback   | Simple; graceful degradation.                                       |
| Phase 0 | Single-page homepage with in-page anchors             | Minimal nav keeps focus on founder + work (2026 best practice).     |
| Phase 0 | Light + dark from day one                             | Easier to bake in than retrofit; matches agency.                    |
| Phase 0 | Inter + DM Sans, Espresso & Teal palette              | Founder-specific warmth; distinct from the agency site.             |
| Phase 0 | New dedicated repo, built with Claude Code            | Clean separation; founder-owned codebase.                           |
| Phase 0 | Design refs: Vysta (look) + Stanlee (content)         | Agency-grade polish with honest, first-person founder content.      |
| Phase 0 | Stats strip is optional, real numbers only            | No fabricated metrics; honesty over filling the layout.             |
| Phase 0 | Own founder blog on this domain (not link-out)        | Builds the personal brand on the founder's own domain.              |
| Phase 0 | Custom admin dashboard for the blog (deliberate)      | Founder wants to post without touching code; chosen over MDX/headless after weighing trade-offs. |
| Phase 0 | Postgres (Neon) + Prisma for posts                    | Matches agency stack; serverless-friendly; skill transfer.          |
| Phase 0 | Clerk single-admin auth, no public sign-up            | Secure, maintained auth; only the founder ever logs in.             |
| Phase 0 | Markdown editor + live preview                        | Simplest reliable editor; matches the agency CMS.                   |
| Phase 0 | Cloudinary for blog images, signed uploads            | Standard; secret stays server-side; works with `next/image`.        |

## Session Notes

- This site is the founder's voice; the agency site is the
  company's voice. Keep them distinct.
- The single biggest risk is fabricated copy. Every claim must
  be real. When a fact is missing, leave a `TODO(content)`
  marker — never invent.
- Ship less, ship real, ship fast. Phase 2 features (case-study
  pages, talk archive, testimonials, blog tag pages/search)
  wait until there is real content to fill them.
- The portfolio blog is the founder's own ("I"), distinct from
  the agency blog ("we"). Two blogs, two jobs.
- CMS security is non-negotiable: every admin route and post
  mutation checks auth first; no public sign-up; drafts never
  leak to any public surface.
