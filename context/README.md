# Context Files — Afeez Founder Portfolio

This folder is the source of truth for the founder
portfolio site at **afeez.refacint.com**. Every
implementation decision references one of these files.
When in doubt, the docs win.

The site is the personal portfolio of Afeez, founder
of **Refacint Technologies** (refacint.com). It serves
three goals at once: win Refacint clients, build a
personal brand, and attract speaking and consulting
engagements. It is a marketing/content site with one
dynamic feature — the founder's **own blog**, written
through a custom admin dashboard (Clerk-secured, single
admin). Postgres (Neon) + Prisma store posts; Cloudinary
stores images. No public sign-up, no payments.

## How to Use This Folder

When working with Claude Code, include the relevant
context files in your prompts. For most tasks, this
pattern works:

```
@context/ai-workflow-rules.md
@context/architecture.md
@context/code-standards.md
@context/progress-tracker.md
@context/<feature-relevant-file>.md
```

Then describe the unit of work you want done.

## File Index

| File                     | Purpose                                                            | Read When                                         |
| ------------------------ | ------------------------------------------------------------------ | ------------------------------------------------- |
| `project-overview.md`    | What the site is, who it's for, goals, sections, phased scope.     | Starting any feature; questioning scope.          |
| `architecture.md`        | Stack, system boundaries, content approach, invariants.            | Touching a new layer; structural decisions.       |
| `code-standards.md`      | TypeScript, Next.js, React, styling, naming rules.                 | Every implementation. Always.                     |
| `ui-context.md`          | Brand tokens, colors, typography, layout, motion.                  | Building any UI component or page.                |
| `design-reference.md`    | Reference sites (Vysta, Stanlee): what to take, what to avoid.     | Building any section's look or content.           |
| `content-model.md`       | TypeScript data shapes for static content (projects, services, talks). | Touching static site content or data files. |
| `database-schema.md`     | Prisma model for blog posts (the only DB-backed content).         | Touching the blog data model or database.         |
| `api-routes.md`          | Blog/admin API routes and their auth requirements.                | Adding or changing a server route.                |
| `feature-specs.md`       | Detailed behavior per section (hero, work, consulting, contact).   | Implementing any section.                         |
| `seo-context.md`         | Metadata, structured data, sitemap, OG, subdomain SEO.             | Adding pages; anything affecting search.          |
| `brand-context.md`       | Voice, founder tone, copy rules, no-slop / no-fabrication rules.   | Writing any user-facing copy.                     |
| `env-variables.md`       | Every environment variable, where to get it, what it's for.        | Setting up; adding integrations.                  |
| `ai-workflow-rules.md`   | How to work: scoping, splitting, doc syncing, definition of done.  | Every session, by Claude Code itself.             |
| `progress-tracker.md`    | Where we are, what's next, decisions made.                         | Resuming work; planning the next unit.            |

## Update Cadence

- `progress-tracker.md` — after every unit of work.
- `feature-specs.md`, `content-model.md`, `seo-context.md`
  — when implementing or changing the relevant area.
- `architecture.md`, `code-standards.md`, `ui-context.md`,
  `brand-context.md` — when a convention shifts (rare).
- `project-overview.md` — when scope changes.
- `env-variables.md` — when a new env var is introduced.
- `ai-workflow-rules.md` — rarely. Keep it stable.

## Quick Start for Claude Code

1. Read `ai-workflow-rules.md` (workflow constraints).
2. Read `progress-tracker.md` (where the project is).
3. Read the feature-relevant context files
   (`feature-specs.md`, `content-model.md`, `ui-context.md`,
   `brand-context.md`, etc.).
4. Confirm scope with the user before writing code.
5. Implement the unit.
6. Update `progress-tracker.md` and any other affected docs.
7. Run `npm run build` to verify.

## Relationship to Refacint

This is a **separate Next.js project**, deployed as the
`afeez.refacint.com` subdomain on Vercel. It is not part
of the refacint.com codebase. It shares brand DNA (colors,
fonts, voice) but has its own repo, its own analytics
property, and its own deployment. Where the agency site is
the company's voice, this site is the founder's voice.
