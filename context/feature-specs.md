# Feature Specifications

This file defines *how* each section behaves. Where
`project-overview.md` says *what* exists, this is the
implementation contract. Implement against this spec, not
intuition. All copy follows `brand-context.md`; all content
shapes follow `content-model.md`.

The site is primarily one page (`/`) composed of sections,
plus a few supporting routes. In-page navigation uses anchor
links to section IDs. Visual patterns follow
`design-reference.md` and `ui-context.md`.

**Canonical homepage order:** Hero → Capability Marquee →
(optional) Stats strip → About → Work → Why Work With Me →
Consulting → Stack → Speaking → Writing → FAQ → Contact.
Sections below are grouped by purpose, not strictly by this
order.

## 1. Site Shell (Header, Footer, Theme)

### Behavior

1. `SiteHeader` is sticky. It shows the founder
   name/wordmark (left), section anchor links (`#about`,
   `#work`, `#consulting`, `#writing`, `#contact`), a theme
   toggle, and a primary CTA button ("Work with me" → scrolls
   to Contact).
2. Header is transparent over the hero and becomes solid with
   `backdrop-blur` after the user scrolls past the hero.
3. Below `md`, links collapse into a `Sheet` mobile menu.
4. `SiteFooter` shows a short founder line + link to
   refacint.com, section links, contact email
   (hello@refacint.com), social links, and a bottom bar with
   copyright and a required link back to the agency site.
5. Theme toggle switches light/dark via `next-themes`, persists
   the choice, and respects system preference on first visit.

### Rules

- The cross-link to refacint.com in the footer is mandatory.
- The mobile menu traps focus and closes on link tap or Escape.

## 2. Hero (`#hero`)

### Behavior

1. Full-width, tall section. May use a navy brand surface as a
   bold block.
2. Content: a small eyebrow label, the founder name as the
   hero display title, the role ("Founder, Refacint
   Technologies"), and a one-line positioning statement.
3. A real photo of the founder.
4. Primary CTA ("Work with me" / "Book a call") + secondary
   link ("See my work" → `#work`).
5. Coordinated entrance: title fades up, then supporting
   content staggers in. Respects reduced motion.

### Rules

- The positioning line is founder-authored, specific, and
  free of slop. It should make the three audiences (clients,
  peers, organizers) immediately understand who this is.
- A visitor must grasp who Afeez is and what he does within
  ~5 seconds of landing.

## 2b. Capability Marquee

### Behavior

1. A full-width horizontally scrolling ticker directly below
   the hero, listing Refacint capabilities bullet-separated:
   AI Agents • Workflow Automation • Custom CRMs • Custom
   Software • Content Automation • AI Consulting.
2. Loops seamlessly. Subtle, continuous, on-brand.

### Rules

- Pauses / does not animate under `prefers-reduced-motion`
  (render a static line instead).
- Capabilities listed must match what Refacint actually
  delivers — no invented services.

## 2c. Stats Strip (Optional, Real Numbers Only)

### Behavior

1. A row of big-number proof blocks (number + short label),
   Vysta-style treatment.
2. Examples of acceptable, verifiable stats: years building,
   number of clients/projects shipped, categories served.

### Rules

- **Only real, verifiable numbers.** If Afeez cannot stand
  behind a figure, the stat is omitted — never inflated to
  fill the layout. See `design-reference.md` and
  `brand-context.md`.
- If there are not yet enough real numbers to justify the
  strip, skip the section entirely. It is optional by design.

## 3. About (`#about`)

### Behavior

1. Reading-width (`max-w-3xl`) first-person section.
2. The founder story: background, what Refacint does and why,
   the automation/AI focus, the Lagos-and-global angle.
3. Optional secondary photo of the founder.
4. A clear link to refacint.com to learn about the agency.

### Rules

- First person ("I build...", not "Afeez builds...").
- Grounded and specific. Local market knowledge and real
  delivery track record are the differentiators — say so
  concretely, do not gesture at it with generic phrases.
- No invented biographical detail. If a fact is unconfirmed,
  leave a `TODO(content)` placeholder.

## 4. Work (`#work`)

### Behavior

1. A grid of project cards built from `projects.ts`
   (`featured: true`, ordered by `displayOrder`).
2. Each `ProjectCard` shows: image, name, client, and a
   short **first-person, story-driven** description in the
   Stanlee model — the real problem, what was built, and the
   outcome — plus tags. Hover lifts the card subtly.
3. Where a project is public, the card links to the **live
   site** and, if applicable, a **repo/GitHub** link, the way
   the Stanlee reference does.
4. Real entries to include: MOLEK Schools, Klassrun
   Technologies, Tenderville School, and Refacint.
5. Below the featured grid, a "brands I've worked with" logo
   wall (MOLEK, Klassrun, Tenderville) per `ui-context.md`.
6. If a project has populated case-study fields, its card
   links to `/work/[slug]` (Phase 2). Otherwise the card links
   to the live URL if public, or is non-clickable.

### Rules

- Only real projects. No filler cards, no invented clients.
- Outcomes shown must be verifiable. Omit a metric rather than
  inventing one.
- Empty/partial data must not break the grid layout.

## 4b. Why Work With Me (`#why`)

### Behavior

1. A three-column differentiator block (Vysta-style): each
   column has a short label, a quote-style heading, a thin
   divider, and a paragraph.
2. The three differentiators are honest and specific, e.g.:
   local market knowledge (Lagos/Nigerian SMBs), a real
   delivery track record (named clients shipped), and an
   automation-first focus (systems that compound, not one-off
   builds).

### Rules

- Differentiators are real and defensible — no absolutist or
  unverifiable claims ("the best", "no one else does this").
  Honest confidence, per `brand-context.md`.

## 5. Consulting (`#consulting`)

### Behavior

1. A `SectionHeading` (eyebrow + title + one-line intro), then
   a set of service cards from `services.ts` (e.g. lead triage
   automation, content engine pipelines, sales/ops bots, AI
   consulting).
2. Each card: title, short description, and 2-3 concrete
   outcomes.
3. A closing line + CTA to Contact about an engagement.

### Rules

- No fixed pricing. Use flexible payment-terms language suited
  to the Nigerian market — no dollar figures in copy or data.
- Outcomes are grounded in real delivered patterns, not hype.

## 5b. Stack — "Tools of the Craft" (`#stack`)

### Behavior

1. A labelled list/grid of the technologies and tools the
   founder builds with, in the Stanlee "tools of the craft"
   model (e.g. Next.js, TypeScript, Tailwind, shadcn/ui, the
   AI/automation stack, OpenAI, Vercel, etc.).
2. Driven by `src/data/stack.ts`.

### Rules

- List only tools actually used. This doubles as a credibility
  signal for technical prospects.

## 6. Speaking (`#speaking`)

### Behavior

1. Lists speaking topics offered from `talks.ts` (`type:
   "topic"`), and any real past talks (`type: "past"`) with
   event, date, and a link to slides/recording if available.
2. If there are no past talks yet, the section renders a
   designed "available for talks" state: a short invitation
   and a CTA to Contact — never a blank or apologetic empty
   section.
3. CTA: "Invite me to speak" → Contact.

### Rules

- Offered topics are fine. Past talks must be real and
  attributable.

## 7. Writing (`#writing`)

The portfolio runs its own founder-voiced blog on this domain.
The homepage Writing section is a teaser; the full blog lives
at `/blog`. See §11 (Blog) and §12 (Admin Dashboard).

### Behavior

1. A `SectionHeading`, then a small grid of the latest 3
   PUBLISHED posts, read from the database (Server Component
   via a `lib/db` helper). Each `PostCard`: cover image, title,
   excerpt, date, reading time — linking internally to
   `/blog/[slug]`.
2. A "Read all posts" link to `/blog`.
3. If there are no published posts yet, the section shows a
   designed empty state (a short line that writing is coming)
   rather than a blank gap — never an apology.

### Rules

- Only PUBLISHED posts appear. Drafts never show here.
- Internal links use `<Link>` to `/blog/[slug]` — this is the
  site's own blog, not an external feed.
- The section must look intentional with zero, one, or many
  posts.

## 7b. FAQ (`#faq`)

### Behavior

1. An accordion of common questions a prospect or organizer
   would ask: how engagements work, what Refacint does, how to
   start, what to expect on timelines, availability for
   speaking/consulting.
2. Driven by `src/data/faq.ts` (question + answer pairs).

### Rules

- Plain, honest answers. No fake guarantees, no manufactured
  urgency. Timelines are realistic (6-12 months where
  relevant), never "30 days to X". See `brand-context.md`.
- Pricing answers use flexible-terms language — no fixed
  figures.

## 8. Contact (`#contact`)

### Behavior

1. A short heading + the founder email (hello@refacint.com),
   social links, and a contact form.
2. The `ContactForm` fields: name, email, message (and a
   hidden honeypot field). Built with `react-hook-form` + Zod.
3. Submission goes to a **Server Action** that validates with
   Zod (server-side) and sends an email via Resend to
   hello@refacint.com.
4. On success: a Sonner toast + an inline success state, form
   resets. On error: an inline, user-readable error and a
   mailto fallback.

### Rules

- Validate on client AND server. Reject malformed input.
- Honeypot (and optional rate limiting) to deter spam.
- Never leak internal errors to the user.
- If Resend is not configured, the form gracefully degrades to
  a mailto link rather than failing silently.

## 9. Work Detail Pages (`/work/[slug]`) — Phase 2

### Behavior

1. Generated from `projects.ts` entries that have case-study
   fields populated.
2. Layout: hero (project name, client, tags, image), then
   Problem → Approach → Outcome, then a link to the live site
   (if public) and a back link to Work.
3. `generateStaticParams` from the projects data;
   `generateMetadata` per project.

### Rules

- Only render a page for a project with real, verifiable
  case-study content. No thin or invented pages.

## 10. Analytics

### Behavior

- Google Analytics 4 is loaded site-wide via the
  `NEXT_PUBLIC_GA_ID` environment variable, in the root layout
  (using `next/script` with `afterInteractive`).
- Track the primary conversion: contact-form submissions and
  CTA clicks to Contact.

### Rules

- No analytics if `NEXT_PUBLIC_GA_ID` is unset (e.g. local
  dev) — guard the script.
- No third-party trackers beyond GA4 without explicit
  approval.

## 11. Blog (Public)

The founder's own blog, hosted on this domain. Posts are stored
in the database (`database-schema.md`) and authored in the
admin dashboard (§12). All copy is founder-voiced
(`brand-context.md`).

### 11.1 Blog Index — `/blog`

**Behavior**
1. A page header (eyebrow + title + one-line intro).
2. A list/grid of all PUBLISHED posts, newest first
   (`publishedAt` desc), read from the database in a Server
   Component. Each `PostCard`: cover image, title, excerpt,
   date, reading time, tags; links to `/blog/[slug]`.
3. Optional simple tag filter (Phase 2 if posts are few).
4. A designed empty state if no posts are published yet.

**Rules**
- Only PUBLISHED posts. Drafts never appear.
- Paginate (or "load more") once there are many posts; not
  needed at launch.
- Per-page metadata per `seo-context.md`.

### 11.2 Post Page — `/blog/[slug]`

**Behavior**
1. `generateStaticParams` (or dynamic) from PUBLISHED posts;
   `generateMetadata` per post (title, excerpt as description,
   cover as OG image).
2. Renders: cover image, title, date, reading time, tags, then
   the post body — markdown rendered to HTML, styled for
   readability (`max-w-prose`, proper heading/list/code/quote
   styles, both light and dark).
3. Code blocks are syntax-highlighted; images within the body
   render responsively.
4. Footer of the post: a back link to `/blog` and a subtle CTA
   to Contact.
5. `Article` structured data (JSON-LD) per `seo-context.md`.

**Rules**
- A DRAFT or unknown slug returns 404. Drafts are never
  publicly reachable, even by direct URL.
- Markdown is rendered safely (sanitize/agreed renderer); no
  raw untrusted HTML injection. (The author is the only writer,
  but still render safely.)
- Slugs of published posts are stable (see `database-schema.md`).

### 11.3 RSS Feed — `/rss.xml`

**Behavior**
- Generates an RSS feed of PUBLISHED posts (title, link,
  excerpt, date). Linked from the blog index `<head>`.

**Rules**
- Only PUBLISHED posts. Absolute URLs.

## 12. Admin Dashboard (Custom CMS)

A protected area where the founder writes and manages blog
posts without touching code. Auth is Clerk with a single admin
user; data is Postgres via Prisma; images go to Cloudinary;
the editor is markdown with live preview. See
`architecture.md`, `database-schema.md`, and `api-routes.md`.

### 12.1 Access & Security

**Behavior**
1. All `/admin/*` routes require an authenticated Clerk session
   **and** the user's email on `ADMIN_EMAIL_ALLOWLIST`.
2. There is **no public sign-up**. The only way in is the
   single admin account.
3. A `/admin` (or `/admin/sign-in`) login uses Clerk's hosted
   UI. After sign-in, the admin lands on the post list.
4. Middleware guards every admin route and every post-mutating
   API/Server Action. Unauthorized access returns **404** (not
   403), hiding the dashboard's existence.

**Rules**
- Auth is checked before any logic, on every admin route and
  mutation. No client-only checks for security.
- Admin pages are `noindex` and excluded from the sitemap.

### 12.2 Post List — `/admin/posts`

**Behavior**
1. A table/list of all posts (DRAFT and PUBLISHED) with: title,
   status badge, last updated, and actions (Edit, Publish/
   Unpublish, Delete).
2. A "New post" button → `/admin/posts/new`.
3. Empty state when there are no posts yet.
4. Delete asks for confirmation.

### 12.3 Create / Edit Post — `/admin/posts/new` and `/admin/posts/[id]`

**Behavior**
1. A form with: title, slug (auto-generated from title, editable;
   warn before changing a published slug), excerpt, tags, cover
   image (upload), and the markdown body editor.
2. **Markdown editor with live preview:** a split or toggle
   view showing the rendered result as the founder types, using
   the same renderer/styles as the public post page so preview
   matches production.
3. **Cover & inline images:** uploaded via the dashboard to
   Cloudinary using a signed upload (`/api/admin/uploads/sign`);
   the returned URL is inserted (cover field, or markdown image
   for inline).
4. **Save as draft** and **Publish** actions. Saving computes
   reading time from the body. Publishing sets `publishedAt`
   (first time) and status PUBLISHED. Unpublish returns to DRAFT.
5. Validation (Zod) on client and server; clear inline errors;
   unsaved-changes awareness is a nice-to-have.

**Rules**
- All inputs validated with Zod before any write; the server
  re-validates and re-checks auth regardless of client checks.
- Slug uniqueness enforced; on collision, warn/auto-suffix.
- Drafts are fully editable and previewable but never public.
- Images never pass through our server as bytes; they go
  straight to Cloudinary via the signed upload.
- The editor and preview must work in light and dark.

### 12.4 Definition of Done for the CMS

- The founder can sign in, create a post, upload a cover image,
  write markdown with accurate live preview, save a draft,
  publish it, see it live at `/blog/[slug]`, edit it, and
  unpublish/delete — all without touching code.
- No `/admin` route or draft is reachable by an
  unauthenticated visitor (verified by trying direct URLs).
- The blog index, post page, Writing teaser, sitemap, and RSS
  all reflect published posts correctly and exclude drafts.
