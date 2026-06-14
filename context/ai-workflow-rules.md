# AI Workflow Rules

## Approach

Build the founder portfolio incrementally using a
spec-driven workflow. The files in this `context/`
folder define what to build (`project-overview.md`,
`feature-specs.md`), how to build it (`architecture.md`,
`code-standards.md`, `ui-context.md`), what conventions
exist (`content-model.md`, `seo-context.md`,
`brand-context.md`), and the current state of progress
(`progress-tracker.md`).

Always implement against these specs. Do not infer,
invent, or improvise behavior. If a spec is missing or
ambiguous, stop and resolve it in the relevant context
file before writing code.

The goal is a shippable, polished, fast portfolio — not
speculative architecture, not over-engineered
abstractions, not a CMS this site does not need.

## Scoping Rules

- Work on one section or component at a time. A unit is
  a vertical slice that can be reviewed in the browser
  end to end (e.g. "the Work section, wired to data, in
  light and dark, responsive").
- Prefer small, verifiable increments over large
  speculative changes.
- Do not combine unrelated concerns in a single step
  (e.g. a content-shape change and a new page layout).
- Confirm scope before starting any unit that takes
  more than ~30 minutes of work.
- Do not refactor unrelated code while implementing a
  section. Note it in `progress-tracker.md` and do it
  separately.

## When to Split Work

Split an implementation step if it combines any of:

- A content-model change and a UI change.
- A new page/route and a new shared component that other
  pages will depend on.
- The contact form (server action + email integration)
  and any unrelated section.
- A spec with undefined behavior — resolve the spec first.
- Multiple unrelated sections in one step.

If a change cannot be reviewed in the browser in under
ten minutes, the scope is too broad — split it.

## Handling Missing Requirements

- Do not invent site behavior not defined in the context
  files.
- **Never fabricate copy, client stories, metrics, or
  testimonials.** Every claim about Refacint, the founder,
  or client work must be grounded in something real and
  verifiable. If a fact is missing, leave a clearly marked
  `TODO(content)` placeholder and add it to
  `progress-tracker.md` under "Open Questions" — do not
  fill it with plausible-sounding invention. See
  `brand-context.md`.
- If a requirement is ambiguous, stop. Ask the user or
  document the resolution in the relevant context file
  before implementing.
- Do not assume libraries beyond the stack in
  `architecture.md`. If a new dependency is needed,
  propose it before installing.

## Protected Files

Do not modify the following without explicit instruction:

- `components/ui/*` — generated shadcn/ui components.
  Regenerate via the CLI if changes are needed.
- `.env*` — environment files. Suggest changes in
  `env-variables.md` and let the user apply them.
- `package-lock.json` — lockfile. Only changed by the
  package manager.
- `prisma/migrations/*` — generated migration files. Never
  hand-edit. Create a new migration instead.
- `next.config.ts`, `tsconfig.json`, `components.json`,
  `postcss.config.mjs` — configuration. Propose changes
  before making them. (Note: Tailwind v4 is configured
  in `globals.css` via `@theme`, not a JS config file.)
- Files inside `node_modules/` or `.next/`. Ever.

## Keeping Docs in Sync

Update the relevant context file whenever implementation
changes documented behavior:

- New content type or static data shape → `content-model.md`.
- New database table/field → `database-schema.md`.
- New API route or Server Action → `api-routes.md`.
- New page/route → `feature-specs.md` and `seo-context.md`.
- New environment variable → `env-variables.md`.
- Stack change → `architecture.md`.
- New convention or rule → `code-standards.md`.
- New design token or component pattern → `ui-context.md`.
- New voice/copy rule → `brand-context.md`.
- New section behavior or scope change →
  `project-overview.md` and `feature-specs.md`.
- Always update `progress-tracker.md` after every
  meaningful change.

Treat context files as the source of truth. If code and
docs disagree, fix one or the other — never leave it
ambiguous.

## Before Moving to the Next Unit

A unit is not complete until all of the following are true:

1. The unit works end to end within its scope. Reviewed
   in the browser.
2. No invariant in `architecture.md` was violated.
3. No rule in `code-standards.md` was violated.
4. The UI matches `ui-context.md` — works in light and
   dark, uses semantic tokens, no hardcoded hex in
   components.
5. The page is responsive: verified at 375px (mobile),
   768px (tablet), and desktop.
6. Any new content is wired to a typed data source per
   `content-model.md` — no hardcoded content buried in JSX
   where the model says it should be data.
7. Page-level metadata (title, description, OG) is set per
   `seo-context.md` for any new route.
8. All copy follows `brand-context.md` — founder voice,
   no slop, no fabricated claims.
9. For any admin or post-mutating work: auth is checked
   before logic, input is Zod-validated on the server, and
   drafts are never exposed on a public route, sitemap, or
   feed (per `architecture.md` and `api-routes.md`).
10. If the database schema changed: `npx prisma validate`
    passes and a migration was created (never hand-edited).
11. `progress-tracker.md` is updated.
12. `npm run build` passes with zero TypeScript errors and
    zero ESLint warnings.

If any of these is false, the unit is not done. Do not
proceed.

## Communication with the User

- Before starting a unit, summarize what will be built and
  confirm.
- During implementation, surface decisions not specified in
  context files. Do not make them silently — especially
  any copy or claim about the founder or clients.
- After completing a unit, summarize what changed, which
  files were touched, and what to review.
- When errors occur, share the actual error message and the
  file/line, not a paraphrase.
- When uncertain, say so. Do not guess and frame it as
  certainty.

## What "Done" Looks Like

A section is done when:

- A visitor can read and act on it end to end without help.
- It works in both light and dark modes.
- It works on mobile (375px) and desktop.
- All links resolve (internal `<Link>`, external links to
  refacint.com and socials open correctly).
- Loading and empty states exist where content is async or
  optional (e.g. the writing feed).
- Images use `next/image` with correct sizing and alt text.
- Copy is real, specific, and founder-toned — no
  placeholders shipped to production, no invented facts.
- The relevant context files reflect the implementation.
