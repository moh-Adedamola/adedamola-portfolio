# Code Standards

## General

- Keep modules small and single-purpose. If a file exceeds
  ~200 lines, consider splitting.
- Fix root causes, not symptoms. Do not layer workarounds on
  broken behavior.
- Do not mix unrelated concerns in one component or module.
- Prefer composition over configuration. A component with 10
  boolean props should be two components.
- Optimize for readability first, performance second. Measure
  before optimizing.
- No dead code. Delete unused imports, variables, files, and
  routes immediately.

## TypeScript

- Strict mode is required (`"strict": true` in `tsconfig.json`).
- Avoid `any`. Use `unknown` and narrow, or define an explicit
  type. Exception: narrowing after a Zod parse.
- Avoid type assertions (`as Foo`). If you need one, the type
  system is telling you something.
- Validate all unknown external input (the contact form body,
  any fetched blog feed) with Zod before trusting it.
- Use `type` for unions, intersections, and primitives. Use
  `interface` for object shapes meant to be extended.
- Export content types alongside the data they describe (in
  `src/data/`), not in a central `types.ts`.

## Next.js

- Default to Server Components. Add `"use client"` only when a
  component uses state, effects, refs, or browser APIs — the
  theme toggle, contact form, motion wrappers, and mobile nav.
- Server Components fetch and import data directly. Do not call
  internal API routes from Server Components.
- Prefer a Server Action for the contact form submission. Use a
  route handler only if a webhook or external callback requires
  it.
- Use the `metadata` export (or `generateMetadata`) on every
  route. Never ship a page without a title.
- `loading.tsx` for any route that fetches async data (e.g. the
  writing feed). `error.tsx` at the app root.
- Never use `<a>` for internal links. Use `<Link>`. External
  links use `<a>` with `rel="noopener noreferrer"`.
- Use `next/font/google` for Inter and DM Sans. No external
  font `<link>` tags.

## React

- Components are PascalCase. Hooks are `useCamelCase`. Files
  match the export.
- Lift state only when necessary. Component-local state is
  preferred.
- Pass plain serializable props from server to client
  components. Pass data down; do not push hooks up.
- No `useEffect` for data fetching. Use Server Components or
  Server Actions.
- The contact form uses `react-hook-form` with a Zod resolver
  and validates on the client AND the server.

## Styling

- Use Tailwind utility classes. No inline `style` except for
  genuinely dynamic values (e.g. a CSS variable driven by a
  prop).
- Use the semantic CSS-variable tokens defined in
  `ui-context.md`. No hardcoded hex in components. The navy
  (`#0E1435`) and blue (`#0D70DA`) brand colors live in the
  theme tokens, not scattered through JSX.
- Follow the border-radius scale in `ui-context.md`.
- Light and dark mode are both supported via `next-themes`.
  Every color reference must work in both. Use semantic tokens
  (`bg-background`, `text-foreground`), never direct shades
  (`bg-zinc-900`).
- Mobile-first responsive design. Default styles target mobile;
  add `md:` and `lg:` for larger screens.
- Use `clsx` + `tailwind-merge` via the `cn()` helper for
  conditional classes.

## Content and Data

- Site content (projects, services, talks) lives in typed files
  under `src/data/`. Components import and render it. Do not
  inline content the model says should be data.
- Every project entry maps to a real client or a real Refacint
  build. No invented projects, metrics, or outcomes.
- Copy lives close to where it is used for one-off section
  prose, but anything list-shaped or repeated is data.
- Images referenced by content use stable paths in `public/`
  and are served via `next/image`.

## SEO and Metadata

- Every route exports `metadata` with a unique title and
  description. See `seo-context.md` for the title pattern.
- The root layout sets default Open Graph and Twitter card
  metadata and the canonical site URL.
- Add `Person` structured data (JSON-LD) for the founder in the
  root layout or homepage. See `seo-context.md`.

## Forms and Validation

- The contact form validates input with Zod before any send,
  on both client and server.
- Return clear, user-readable success and error states. Never
  leak internal errors (stack traces, API responses) to the
  user.
- Protect the form against spam with at least a honeypot field;
  add rate limiting if abuse appears.

## Error Handling

- Catch errors at the boundary (the Server Action, the fetch
  helper) and translate to user-readable states.
- Never swallow errors silently. If you catch, handle or
  rethrow.
- The writing feed must degrade gracefully: if the blog feed
  fails, show a fallback (a link to the blog) rather than a
  broken section.

## Performance

- Use `next/image` for all images with correct sizing. Never
  `<img>`.
- Lazy-load below-the-fold or conditional heavy client
  components with `next/dynamic`.
- Keep client JavaScript minimal. Most of the site is static
  server-rendered HTML.
- Motion respects `prefers-reduced-motion`. No animation that
  blocks interaction or causes layout shift.

## Naming

- Files: `kebab-case.ts` for utilities, `PascalCase.tsx` for
  components.
- Variables and functions: `camelCase`.
- Types and interfaces: `PascalCase`.
- Constants: `SCREAMING_SNAKE_CASE` for true module-level
  constants; `camelCase` otherwise.
- Boolean variables use `is`, `has`, `should`, `can` prefixes.

## Git and Commits

- Conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`,
  `docs:`, `style:`.
- One concern per commit. If the message needs "and", split it.
- Never commit `.env*`, `node_modules/`, or `.next/`.
