# Architecture Context

## Stack

| Layer        | Technology                          | Role                                                  |
| ------------ | ----------------------------------- | ----------------------------------------------------- |
| Framework    | Next.js 15 (App Router) + TypeScript | Server-rendered React with file-based routing        |
| UI           | Tailwind CSS v4 + shadcn/ui          | Utility-first styling, CSS-first config, primitives  |
| Fonts        | `next/font/google` (Inter, DM Sans)  | Self-hosted brand typography                          |
| Static content | Typed TS data files (`src/data/`)  | Projects, services, talks, stack, faq — single source of truth |
| Blog content | Postgres (Neon) + Prisma             | Founder blog posts, written via the custom admin dashboard |
| Auth         | Clerk (single admin user)            | Secures the admin dashboard and post-writing routes   |
| Image storage| Cloudinary                           | Blog cover/inline images and other uploads            |
| Editor       | Markdown + live preview              | Post authoring surface in the admin dashboard         |
| Email        | Resend (contact form)                | Transactional send for the contact form               |
| Validation   | Zod                                  | Runtime input validation at every boundary            |
| Forms        | react-hook-form + Zod resolver       | Contact form and post editor handling/validation      |
| Analytics    | Google Analytics 4                   | Traffic and conversion measurement                    |
| Icons        | lucide-react                         | Stroke-based icon set                                 |
| Motion       | Framer Motion (`motion`)             | Coordinated, restrained animation                     |
| Hosting      | Vercel                               | Deployment, serverless functions, subdomain           |

This mirrors the Refacint agency stack intentionally so the
two codebases feel like siblings and skills transfer between
them.

## Tailwind v4 Note

Tailwind v4 is configured **CSS-first**. The theme (colors,
fonts, radius) is declared in `src/app/globals.css` inside an
`@theme` block, not in a `tailwind.config.ts` file. shadcn/ui
is initialized in v4-compatible mode. Do not add a JS Tailwind
config unless a specific feature requires it — and propose it
first. See `ui-context.md` for the token definitions.

## System Boundaries

- `src/app/` — Next.js App Router. The homepage (`page.tsx`)
  composes section components. Route groups separate audiences:
  the public marketing/blog pages and the protected `admin`
  area. `globals.css` holds the theme. `layout.tsx` sets fonts,
  theme provider, analytics, and root metadata.
- `src/app/(public)/` — public pages: homepage, `/blog`,
  `/blog/[slug]`, `/work/[slug]`.
- `src/app/admin/` — the protected custom CMS dashboard. Guarded
  by Clerk middleware. Never reachable without the admin login.
- `src/app/api/` — Route handlers. Used for the post CRUD
  endpoints the dashboard calls and the Cloudinary upload
  signature. The contact form prefers a Server Action; post
  mutations may use Server Actions or route handlers, but every
  one checks auth first.
- `src/components/ui/` — shadcn/ui primitives. Generated via
  CLI. Do not hand-edit.
- `src/components/` — Application components, organized by area
  (`sections/`, `work/`, `blog/`, `admin/`, `layout/`).
- `src/data/` — Typed **static** content (projects, services,
  talks, stack, faq, etc.). The single source of truth for
  everything that is not a blog post. See `content-model.md`.
- `src/lib/` — Framework-agnostic utilities and clients. No
  React. Houses `cn()`, the Prisma client singleton (`db.ts`),
  the Cloudinary helper, the Resend client, auth helpers
  (`auth.ts`), and the Zod schemas (`validators/`).
- `prisma/` — Prisma schema, migrations, and seed script. Owns
  the blog data model. See `database-schema.md`.
- `public/` — Static assets only: founder photo, OG image,
  favicons. No source code. (Blog images live in Cloudinary,
  not here.)
- `context/` — This folder. Project documentation and AI
  workflow source of truth.

## Content and Storage Model

Content lives in three places, by type:

- **Typed TS data files** (`src/data/`): all **static** site
  content — projects, services, talks, stack, faq, capabilities,
  socials, site config. Importing a typed array into a Server
  Component is the default pattern, mirroring the agency site's
  `projects.ts` single-source-of-truth approach. This content
  rarely changes and does not need a database.
- **Postgres (Neon) via Prisma**: the **blog**. Posts are
  created and edited in the custom admin dashboard and stored in
  the database. Post bodies are markdown text; the public blog
  renders them to HTML. See `database-schema.md`.
- **Cloudinary**: binary blog content — cover images and inline
  images uploaded through the dashboard. The database stores the
  Cloudinary URL/public ID, never the image bytes.

Other binary assets (founder photo, project images, OG image)
are optimized and served from `public/` via `next/image`.

## Invariants

1. **Server Components by default.** Sections render on the
   server. `"use client"` is added only for interactivity
   (theme toggle, contact form, motion wrappers, mobile nav).
2. **Content is data, not JSX.** Projects, services, and
   talks come from typed files in `src/data/`. Do not hardcode
   this content directly in component markup.
3. **No fabricated content, ever.** Every claim, metric,
   client reference, and testimonial must be real and
   verifiable. Missing facts become marked `TODO(content)`
   placeholders, never invention. (See `brand-context.md`.)
4. **Input is validated at the boundary.** The contact form
   validates with Zod on both client and server before any
   send. Unknown or malformed input is rejected.
5. **No hardcoded secrets.** The database URL, Clerk keys,
   Cloudinary keys, Resend key, and GA ID all live in
   environment variables. The repo never contains a real key.
6. **The admin dashboard is auth-gated, always.** Every route
   under `src/app/admin/` and every post-mutating API route or
   Server Action checks the Clerk session AND that the user is
   the single allowed admin before doing anything. Auth is
   checked before logic. There is no public sign-up.
7. **Admin URLs are hidden.** Middleware blocks non-admins from
   admin and post-write routes with a 404 (not a 403), so the
   existence of the dashboard is not revealed.
8. **Prisma is accessed through `lib/db.ts` and small data
   helpers, not scattered.** The public blog reads posts; only
   authenticated admin paths write them. The client never
   talks to the database directly.
9. **Input is validated at every boundary.** The contact form
   and the post editor both validate with Zod on client and
   server before any write or send. Unknown input is rejected.
10. **Semantic color tokens only.** Components reference
    semantic tokens (`bg-background`, `text-foreground`,
    `text-primary`), never raw hex. Every color works in light
    and dark.
11. **`next/image` for all images.** Never `<img>`. Cloudinary
    URLs work with `next/image`. Always set sizing and `alt`.
12. **`<Link>` for internal navigation.** Never `<a>` for
    internal links. External links use `<a>` with
    `rel="noopener noreferrer"`.
13. **Every public route sets metadata.** No page ships without
    a title, description, and OG config per `seo-context.md`.
    Blog posts generate per-post metadata.
14. **Performance is a feature.** Good Core Web Vitals, no
    layout shift, fonts via `next/font`, images sized and lazy
    below the fold, motion respects `prefers-reduced-motion`.

## Deployment

- Hosted on Vercel as a project mapped to the
  `afeez.refacint.com` subdomain. DNS for the subdomain is
  managed wherever refacint.com's DNS lives; a CNAME points
  the subdomain at Vercel.
- Production environment variables are set in Vercel project
  settings. Local development uses `.env.local`.
- Database migrations run with `prisma migrate deploy` against
  the Neon production database as part of release; local dev
  uses `prisma migrate dev`. Never hand-edit a generated
  migration.
- This is a distinct project from the refacint.com repo.
