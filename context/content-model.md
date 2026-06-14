# Content Model

This file is the source of truth for the site's **static**
content shapes — everything that is not a blog post. Static
content is defined in typed TypeScript files under `src/data/`.
Define types alongside the data they describe and export both.

**Blog posts are the exception:** they are stored in the
database (Postgres + Prisma) and authored through the custom
admin dashboard, not in a typed file. The post shape lives in
`database-schema.md`, and the blog's behavior in
`feature-specs.md`. This file covers the static data only.

This mirrors the Refacint agency site's `projects.ts`
single-source-of-truth pattern: one typed array drives every
place a static content type appears.

## Conventions

- One file per static content domain: `projects.ts`,
  `services.ts`, `talks.ts`, `stack.ts`, `capabilities.ts`,
  `stats.ts`, `faq.ts`, `socials.ts`, `site.ts`.
- Each file exports a `readonly` array and the item type.
- IDs/slugs are stable, URL-safe, lowercase-kebab strings.
- Dates are ISO strings (`"2026-01-15"`).
- Image paths point to assets in `public/` (e.g.
  `/images/work/molek.webp`).
- **Every entry is real.** No invented projects, metrics,
  testimonials, or talks. Missing data is omitted or marked
  with a `TODO(content)` comment, never fabricated. See
  `brand-context.md`.

## Projects (`src/data/projects.ts`)

Selected work and client builds. Drives the Work section and
any `/work/[slug]` case-study pages. Known real entries:
**MOLEK Schools**, **Klassrun Technologies**, **Tenderville
School**, and **Refacint** itself.

```ts
export type ProjectTag =
  | "custom-software"
  | "ai-agent"
  | "automation"
  | "crm"
  | "web"
  | "consulting";

export interface Project {
  slug: string;            // "molek-schools"
  name: string;            // "MOLEK Schools"
  client: string;          // Client/org name
  summary: string;         // One-line, what it is (real)
  // Case-study fields. Only fill with verifiable detail.
  problem?: string;        // The real problem solved
  approach?: string;       // What was built / how
  outcome?: string;        // Verifiable result — no invented metrics
  tags: ProjectTag[];
  year?: string;           // "2025"
  imageUrl?: string;       // /images/work/...
  liveUrl?: string;        // External link if public
  featured: boolean;       // Show on homepage Work grid
  displayOrder: number;    // Lower = earlier
}

export const projects: readonly Project[] = [/* real entries */];
```

Rules:

- `summary`, and any case-study field, must describe what
  actually happened. If the detailed outcome is not confirmed,
  omit `outcome` rather than inventing a number.
- `featured: true` items appear on the homepage; the full set
  appears on a Work page or expanded view.
- A project with a populated `problem`/`approach`/`outcome`
  may get a `/work/[slug]` page in Phase 2.

## Services / Consulting (`src/data/services.ts`)

What the founder offers and advises on. Drives the Consulting
section.

```ts
export interface Service {
  id: string;              // "lead-triage-automation"
  title: string;           // "Lead triage automation"
  description: string;     // What it is, in founder voice
  outcomes: string[];      // Concrete benefits (real, not hype)
  icon?: string;           // lucide icon name
  displayOrder: number;
}

export const services: readonly Service[] = [/* ... */];
```

Rules:

- Pricing is **not** stored as fixed figures. Consulting copy
  uses flexible payment-terms language suited to the Nigerian
  market. No dollar amounts in data or copy. See
  `brand-context.md`.
- Outcomes are grounded in real pattern observations from
  delivered work, not aspirational marketing claims.

## Talks (`src/data/talks.ts`)

Speaking topics and any past talks. Drives the Speaking
section. May be empty at launch — the section renders a
"coming soon / invite to book" state when it is.

```ts
export interface Talk {
  id: string;
  title: string;           // Talk title or topic offered
  type: "topic" | "past";  // Offered topic vs. delivered talk
  description: string;
  event?: string;          // For past talks: where (real)
  date?: string;           // ISO, for past talks
  url?: string;            // Slides / recording, if real
}

export const talks: readonly Talk[] = [/* topics offered */];
```

Rules:

- Offered topics are fine to list. Past talks must be real and
  attributable — no invented engagements.

## Blog Posts — Database, Not a Typed File

Blog posts are **not** defined here. They live in the database
(Postgres + Prisma) and are authored in the custom admin
dashboard. The `Post` shape and rules are in
`database-schema.md`; the blog and dashboard behavior is in
`feature-specs.md`.

The portfolio runs its **own founder-voiced blog** on this
domain (`/blog`, `/blog/[slug]`). It does **not** link out to
the Refacint agency blog — that earlier "feed / link-out"
approach has been replaced by a real, self-hosted blog. The
homepage Writing section shows the latest few PUBLISHED posts
read from the database and links to `/blog`.

Do not create a `posts.ts` typed file. The only thing that
might exist in `src/data/` related to the blog is incidental
(e.g. a list of allowed tags), and only if a real need appears.

## Stack / Tools (`src/data/stack.ts`)

The "tools of the craft" list (Stanlee model). Drives the
Stack section.

```ts
export interface StackItem {
  name: string;            // "Next.js", "OpenAI", "Vercel"
  category?: "frontend" | "backend" | "ai" | "infra" | "tools";
}

export const stack: readonly StackItem[] = [/* tools used */];
```

Rules: list only tools actually used in real work.

## FAQ (`src/data/faq.ts`)

Drives the FAQ accordion.

```ts
export interface Faq {
  question: string;
  answer: string;          // Plain, honest. No fake guarantees.
}

export const faq: readonly Faq[] = [/* ... */];
```

Rules: realistic timelines, flexible-terms pricing language,
no manufactured urgency. See `brand-context.md`.

## Stats (`src/data/stats.ts`) — Optional, Real Only

Drives the optional Stats strip. Include only if there are
real, verifiable numbers.

```ts
export interface Stat {
  value: string;           // "3+", "2025" — a REAL figure
  label: string;           // "clients shipped", "building since"
}

export const stats: readonly Stat[] = [/* real numbers or [] */];
```

Rules: **never fabricate a metric.** If the array is empty,
the Stats section does not render. See `design-reference.md`.

## Capabilities (`src/data/capabilities.ts`)

Drives the capability marquee. A simple ordered list of real
Refacint capabilities.

```ts
export const capabilities: readonly string[] = [
  "AI Agents",
  "Workflow Automation",
  "Custom CRMs",
  "Custom Software",
  "Content Automation",
  "AI Consulting",
];
```

## Social Links (`src/data/socials.ts`)

```ts
export interface Social {
  label: string;           // "LinkedIn", "X", "GitHub"
  href: string;            // Absolute URL
  icon: string;            // lucide icon name
}

export const socials: readonly Social[] = [/* real profiles */];
```

## Site Config (`src/data/site.ts`)

Single place for site-wide constants used in metadata,
header, and footer.

```ts
export const site = {
  name: "Afeez",
  role: "Founder, Refacint Technologies",
  tagline: "", // founder positioning one-liner (real, founder-toned)
  url: "https://afeez.refacint.com",
  agencyUrl: "https://refacint.com",
  email: "hello@refacint.com",
  ogImage: "/og.png",
} as const;
```

Rules:

- `email` is `hello@refacint.com`.
- `agencyUrl` is used for the required cross-link to the
  agency site.
- The positioning `tagline` is founder-authored; do not
  generate generic agency-speak — see `brand-context.md`.

## Where Content Lives vs. Where It Renders

| Data file          | Renders in                          |
| ------------------ | ----------------------------------- |
| `projects.ts`      | Work section, logo wall, `/work/[slug]` |
| `services.ts`      | Consulting section                  |
| `stack.ts`         | Stack ("tools of the craft")        |
| `capabilities.ts`  | Capability marquee                  |
| `stats.ts`         | Stats strip (optional)              |
| `faq.ts`           | FAQ accordion                       |
| `talks.ts`         | Speaking section                    |
| `posts` (database) | Writing section, `/blog`, `/blog/[slug]` |
| `socials.ts`       | Footer, Contact                     |
| `site.ts`          | Metadata, Header, Footer, Hero      |

Components import from `src/data/`. They never hardcode this
content inline.
