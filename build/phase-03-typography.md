# Phase 3 — Typography

## What you're building and why

Fonts carry a surprising amount of a brand's feel. This phase
loads the two brand typefaces — **DM Sans** for headings and
**Inter** for body text — the same pairing as your agency site,
so the portfolio feels like a sibling. It's a short phase, but
doing it properly (loading fonts the right way) protects your
site's speed and prevents an ugly flicker where text loads in
one font then jumps to another.

By the end, your headings will render in DM Sans and your body
text in Inter, loaded efficiently with no layout jump.

## Concepts you need first

- **`next/font`:** Next.js has a built-in way to load Google
  Fonts that downloads and self-hosts them with your site. This
  is faster and more private than the old method of linking to
  Google's servers, and it prevents layout shift (text jumping)
  because Next.js reserves the right space in advance.
- **Font variable:** the fonts get attached to CSS variable
  names (`--font-display` for DM Sans, `--font-sans` for Inter),
  which your theme then references. This mirrors how the colours
  work — defined once, used by name.
- **Display vs body font:** "display" means large headline text
  (DM Sans here); "body" means paragraphs and UI text (Inter).
  Your `ui-context.md` type scale says which font each text size
  uses.

## What you provide

Nothing new — the font choices and the type scale are already
in `context/ui-context.md`.

## Steps

### Step 1 — Load the fonts

In Claude Code:

> Read the Typography section of `context/ui-context.md`. Load
> the two brand fonts using `next/font/google`: **DM Sans** as
> the display font (weights 500, 600, 700) mapped to the CSS
> variable `--font-display`, and **Inter** as the body font
> (weights 400, 500, 600, 700) mapped to `--font-sans`. Wire
> them into the root layout and the Tailwind v4 theme so the
> `font-display` and `font-sans` utility classes work. Deliver
> as one bash script.

### Step 2 — Apply the base typography

> Set Inter as the default body font on the page, and make sure
> the type scale classes from `ui-context.md` (hero display,
> page title, section title, etc.) use the right font and
> weights. Add a small temporary sample on the homepage showing
> a hero-size heading, a section title, a paragraph, and a small
> caption, so I can confirm the fonts render correctly.

### Step 3 — Check it

Run `npm run dev` and look at `http://localhost:3000`. The big
heading should be DM Sans (geometric, confident); the paragraph
should be Inter (clean, highly readable). Reload a couple of
times — the text should appear in the correct font immediately,
with no visible jump from a fallback font.

### Step 4 — Remove the sample

> Remove the temporary typography sample and confirm the build
> is clean.

## Verify

- Headings render in DM Sans, body text in Inter.
- No visible font "jump" or flicker on page load.
- The `font-display` and `font-sans` utility classes work where
  applied.
- Both fonts look correct in light and dark mode.
- `npm run build` passes with no errors.

## Common problems and fixes

- **Text flashes in a different font on load:** usually means
  the font isn't wired through `next/font` properly. Ask Claude
  Code to confirm the fonts are loaded via `next/font/google`
  and attached as variables on the html/body, not linked
  externally.
- **A weight looks wrong (too thin/bold):** the requested
  weights may not match what's used. Check the weights in
  `ui-context.md` and ask Claude Code to align them.
- **Headings still look like the default font:** the
  `font-display` class may not be mapped in the theme. Point
  Claude Code back to the Tailwind v4 `@theme` setup from
  Phase 2 and ask it to add the font family mappings.

## Commit & wrap-up

> Commit with the message `feat: typography (Inter + DM Sans)`
> and update `context/progress-tracker.md`.

You should now have the brand colours *and* fonts in place —
the site is starting to feel like Refacint. Next:
`phase-04-shadcn.md`, where you install the UI component
toolkit you'll build sections from.
