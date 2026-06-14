# UI Context

## Theme

The portfolio shares Refacint's brand DNA: a confident,
modern, tech-forward look anchored by a deep navy and a
vivid blue. Light mode is clean and bright with navy text
on near-white; dark mode is a deep navy canvas with the
blue accent carrying energy. The design reference is the
same direction used for the agency site (clean, premium,
Azuro-Digital-adjacent), interpreted for a personal/founder
feel: more first-person, more photography of the founder,
slightly warmer and more human than the corporate site.

Both modes are supported via `next-themes` with a toggle.
System preference is respected on first visit and the
choice persists.

Every component must work in both modes. Use semantic
tokens, not raw hex.

## Brand Colors

The two brand anchors:

- **Navy** `#0E1435` — primary brand color, dark surfaces,
  primary text in light mode. HSL ≈ `231 58% 13%`.
- **Blue** `#0D70DA` — accent, links, primary buttons,
  focus rings, highlights. HSL ≈ `211 89% 45%`.

These are declared once as theme tokens and referenced
semantically everywhere. Never paste the hex into a
component.

## Color System (Tailwind v4, CSS-first)

Tokens are declared in `src/app/globals.css`. Define the raw
values on `:root` and `.dark`, then map them in an `@theme`
block so Tailwind generates the `bg-*`, `text-*`, `border-*`
utilities.

### Semantic Tokens

| Role                 | Token                  | Light                | Dark                 |
| -------------------- | ---------------------- | -------------------- | -------------------- |
| Page background      | `--background`         | `0 0% 100%`          | `231 58% 9%`         |
| Surface (card)       | `--card`               | `220 33% 98%`        | `231 45% 13%`        |
| Surface elevated     | `--surface-elevated`   | `220 30% 96%`        | `231 40% 16%`        |
| Primary text         | `--foreground`         | `231 58% 13%` (navy) | `220 30% 96%`        |
| Muted text           | `--muted-foreground`   | `231 12% 42%`        | `220 14% 68%`        |
| Accent (primary)     | `--primary`            | `211 89% 45%` (blue) | `211 89% 55%`        |
| Accent foreground    | `--primary-foreground` | `0 0% 100%`          | `231 58% 9%`         |
| Brand navy surface   | `--brand-navy`         | `231 58% 13%`        | `231 58% 13%`        |
| Border               | `--border`             | `220 16% 88%`        | `231 30% 22%`        |
| Input border         | `--input`              | `220 16% 85%`        | `231 30% 24%`        |
| Ring (focus)         | `--ring`               | `211 89% 45%`        | `211 89% 55%`        |
| Muted surface        | `--muted`              | `220 20% 94%`        | `231 35% 15%`        |
| Destructive          | `--destructive`        | `0 75% 50%`          | `0 70% 55%`          |
| Success              | `--success`            | `152 60% 38%`        | `152 55% 50%`        |

### Color Philosophy

- **Navy carries authority; blue carries action.** Navy is
  the canvas and the text; the blue is reserved for things
  the visitor should act on (CTAs, links, key highlights).
- Use the blue with intent — a single confident accent beats
  a rainbow. Calm canvas, sharp accent.
- The hero may use a navy surface (`--brand-navy`) as a bold
  full-bleed block, with the founder photo and blue CTA on
  top, echoing the agency site's hero treatment.
- No purple gradients, no secondary competing accent. Stay on
  brand.

## Typography

Two fonts via `next/font/google`, matching the agency site:

| Role     | Font     | CSS Variable     | Weights            |
| -------- | -------- | ---------------- | ------------------ |
| Display  | DM Sans  | `--font-display` | 500, 600, 700      |
| Body/UI  | Inter    | `--font-sans`    | 400, 500, 600, 700 |

### Why these fonts

- **DM Sans** for headlines, the hero title, and section
  titles — geometric, confident, modern, matches the Refacint
  brand.
- **Inter** for body copy, UI labels, and buttons — highly
  legible at all sizes.

Tighten tracking on large display text (`tracking-tight` or
`tracking-tighter`). Keep body comfortable.

### Type Scale

| Use            | Class                                                              | Font     |
| -------------- | ----------------------------------------------------------------- | -------- |
| Hero display   | `text-5xl md:text-7xl font-display font-bold tracking-tighter`    | DM Sans  |
| Page title     | `text-3xl md:text-4xl font-display font-semibold tracking-tight`  | DM Sans  |
| Section title  | `text-2xl md:text-3xl font-display font-semibold`                 | DM Sans  |
| Card title     | `text-lg font-semibold`                                           | Inter    |
| Body           | `text-base leading-relaxed`                                       | Inter    |
| Small / caption| `text-sm text-muted-foreground`                                   | Inter    |
| Label / eyebrow| `text-xs font-medium uppercase tracking-wider text-primary`       | Inter    |

The eyebrow label (small uppercase blue text above a section
title) is a recurring brand motif — use it to introduce
sections.

## Border Radius

| Context                    | Class          | Variable      |
| -------------------------- | -------------- | ------------- |
| Inline elements, badges    | `rounded-md`   | `--radius-sm` |
| Buttons, inputs            | `rounded-lg`   | `--radius`    |
| Cards, panels              | `rounded-2xl`  | `--radius-lg` |
| Large feature blocks       | `rounded-3xl`  | `--radius-xl` |
| Avatars, circular elements | `rounded-full` | —             |

Base `--radius: 0.625rem` (10px). Other radii derive from it.

## Spacing and Layout

- Use Tailwind's spacing scale. Avoid arbitrary values except
  for one-off needs.
- Container: `max-w-6xl` for most sections, `max-w-3xl` for
  reading-width prose (About, writing intros), centered with
  `mx-auto px-4 md:px-6`.
- Vertical rhythm: section padding `py-16 md:py-24`. The hero
  may be taller.
- Grid gaps: `gap-4` tight, `gap-6` standard, `gap-8` spacious.
- Single-page layout with smooth in-page anchor scrolling
  between sections; supporting routes (`/work/[slug]`) use the
  same container widths.

## Component Library

shadcn/ui on Tailwind v4, initialized in v4 mode. Primitives
live in `src/components/ui/`. Customize by editing the
generated files, not by wrapping.

Likely MVP components:
`button`, `input`, `textarea`, `label`, `card`, `badge`,
`avatar`, `separator`, `tooltip`, `sonner` (toast),
`dropdown-menu` (theme/menu), `sheet` (mobile nav).

Custom components (in `src/components/`):
`Hero`, `About`, `WorkGrid`, `ProjectCard`, `ConsultingSection`,
`SpeakingSection`, `WritingFeed`, `PostCard`, `ContactForm`,
`SiteHeader`, `SiteFooter`, `ThemeToggle`, `SectionHeading`
(eyebrow + title + optional intro), `EmptyState`.

## Design Reference & Recurring Patterns

The visual system is guided by `design-reference.md` (Vysta
for polish, Stanlee for content). These recurring patterns
appear across sections — build them as reusable components:

- **Oversized display headings.** Sections lead with large
  DM Sans titles and a small blue uppercase eyebrow. Let type
  carry the design.
- **Capability marquee.** A horizontally scrolling ticker of
  Refacint capabilities ("AI Agents • Workflow Automation •
  Custom CRMs • Custom Software • AI Consulting •"), bullet-
  separated, looping, paused on `prefers-reduced-motion`.
- **Stat / proof blocks.** Big number + short label, used
  sparingly. **Real numbers only** — see `design-reference.md`
  and `brand-context.md`. Omit if not verifiable.
- **Differentiator columns.** A three-column "Why work with
  me" block: each column has a small label, a quote-style
  heading, a thin divider motif, and a short paragraph.
- **Icon feature/process cards.** A row of cards (icon +
  title + 1-2 lines) for Consulting services or a process.
- **Logo wall.** A tidy row/grid of client logos (MOLEK,
  Klassrun, Tenderville) under a short heading.
- **Repeated primary CTA.** The single primary action
  ("Work with me" / "Book a call") recurs down the page —
  confident, not pushy.
- **FAQ accordion.** Plain, honest Q&A. No fake guarantees.

Adapt all of these to navy/blue, light + dark. Take the
structure and confidence of the reference, never its hype.

## Layout Patterns

### Site Header

- Sticky top nav: founder name/wordmark left, in-page section
  links center (or right), theme toggle and a primary CTA
  ("Work with me") on the right.
- Transparent over the hero, becomes solid with backdrop blur
  on scroll.
- Collapses to a `Sheet` mobile menu below `md`.

### Site Footer

- Three areas: a short founder line + link to refacint.com;
  section links; contact (hello@refacint.com) and social
  links.
- Bottom bar: copyright, "Built by Refacint" (or similar),
  and a link back to the agency site. The cross-link to
  refacint.com is required.

### Sections

- Each section opens with a `SectionHeading`: small uppercase
  blue eyebrow, then a DM Sans title, then optional one-line
  intro. Keeps the page rhythmic and on-brand.

## Motion

Framer Motion (`motion`) for coordinated entrances; CSS
transitions for simple hover/focus.

- One coordinated entry per section beats scattered
  micro-interactions.
- Stagger list items (project cards, posts) with ~50ms
  increments.
- Respect `prefers-reduced-motion` — disable non-essential
  motion.
- Durations: 150ms (micro), 250ms (standard), 400ms
  (section/page), 600ms+ (hero).
- Easing: a custom ease-out such as `[0.32, 0.72, 0, 1]`.
  Avoid the default ease.
- Patterns: hero title fades up with a slight rise; cards lift
  subtly on hover (`translateY(-2px)` + shadow grow, 200ms).

## Icons

lucide-react, 1.5px stroke.

| Size                 | Class       |
| -------------------- | ----------- |
| Inline / button icon | `h-4 w-4`   |
| Standalone UI        | `h-5 w-5`   |
| Section heading icon | `h-6 w-6`   |
| Empty state icon     | `h-12 w-12` |

Never mix icon libraries.

## Imagery

- A real, high-quality photo of the founder in the hero and/or
  About. Show the founder as a person — this is a key
  portfolio best practice, not decoration.
- Project images reuse the agency site's assets where
  appropriate (consistent with the shared `projects` data).
- All images via `next/image` with width/height or `fill` +
  sizing, blur placeholder where useful, and meaningful `alt`.
- Provide a branded Open Graph image (1200×630) for social
  sharing. See `seo-context.md`.

## Empty and Loading States

- The Speaking section ships as a designed "coming soon" /
  invite-to-book state until there is a track record.
- The Writing feed shows skeletons while loading and a
  graceful fallback (link to the blog) if the feed fails.
- Every optional/async area has a designed empty state — never
  a blank gap.

## Accessibility

- All interactive elements reachable by keyboard, with visible
  focus rings (`focus-visible:ring-2 focus-visible:ring-ring`).
- Color contrast meets WCAG AA (4.5:1 body, 3:1 large text).
  Verify blue-on-navy and navy-on-white combinations.
- Icons that convey meaning have `aria-label` or accompanying
  text.
- The mobile menu traps focus and restores it on close.
- Respect reduced motion.
