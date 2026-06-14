# Phase 2 — Brand Theme & Dark Mode

## What you're building and why

Right now your site runs but looks like a generic Next.js
starter. In this phase you give it the Refacint identity: the
navy (`#0E1435`) and blue (`#0D70DA`) colours, and the ability
to switch between light and dark mode. Getting this in early
matters — every component you build afterward will use these
colours, so you want them defined once, properly, before there's
anything to retrofit.

By the end, your site will have the right brand colours in both
light and dark mode, a working toggle to switch between them,
and a system where you never write a raw colour value again —
you use named "tokens" instead.

## Concepts you need first

- **Design tokens:** instead of writing the hex code `#0D70DA`
  all over your code, you define it once with a name like
  `--primary`, and everywhere you want that blue you refer to
  the name. Change the name's value in one place and the whole
  site updates. This is what `ui-context.md` means by "semantic
  tokens".
- **Light and dark mode:** two sets of colour values. In light
  mode the background is near-white and text is navy; in dark
  mode the background is deep navy and text is near-white. The
  *names* stay the same (`--background`, `--foreground`); only
  the values swap. That's why components written against tokens
  "just work" in both modes.
- **Tailwind v4's CSS-first config:** in older Tailwind you
  configured colours in a JavaScript file. In version 4 (what
  you're using, matching your agency site) you define them in
  your main CSS file inside a special `@theme` block. Your
  `ui-context.md` lists the exact token values to use.
- **`next-themes`:** a small library that handles the
  light/dark switching — remembering the user's choice and
  respecting their system preference.

## What you provide

Nothing new from you here — the colour values are already
specified in `context/ui-context.md`. You're directing Claude
Code to implement what's written there.

## Steps

### Step 1 — Point Claude Code at the spec

Open Claude Code in your project and give it this:

> Read `context/ui-context.md` (the Color System and Tailwind
> v4 sections) and `context/architecture.md` (the Tailwind v4
> note). I want to set up the brand theme now.
>
> Implement the semantic colour tokens exactly as specified in
> `ui-context.md`, for both light (`:root`) and dark (`.dark`)
> modes, in `src/app/globals.css` using Tailwind v4's CSS-first
> `@theme` approach. The brand anchors are navy `#0E1435` and
> blue `#0D70DA`. Do not hardcode hex anywhere except the token
> definitions themselves. Deliver it as a single bash script
> and explain the approach before I run it.

Read its explanation. It should be defining CSS variables for
things like `--background`, `--foreground`, `--primary`,
`--border`, and so on, with one set of values under `:root` and
another under `.dark`. Approve and run.

### Step 2 — Add the light/dark switching library

Next:

> Now install and configure `next-themes`. Add a theme provider
> in the root layout so the whole app can switch between light
> and dark, respecting the user's system preference on first
> visit and remembering their choice. Set it up so there's no
> flash of the wrong theme on page load. One bash script.

The "flash of the wrong theme" note matters — without care, a
site can briefly show light mode before switching to dark on
load, which looks broken. Claude Code knows the standard fix
(a `suppressHydrationWarning` on the html tag and the provider
configured correctly); mentioning it ensures it's handled.

### Step 3 — Add a theme toggle button

> Create a simple `ThemeToggle` client component (a button with
> a sun/moon icon from lucide-react that switches between light
> and dark). Place it somewhere temporary on the homepage so I
> can test it. We'll move it into the header in a later phase.

### Step 4 — Add a quick visual test

To confirm the tokens actually work, ask:

> On the homepage, temporarily add a small test area with a few
> boxes and text using the semantic tokens — for example a
> `bg-background` area with `text-foreground` text, a
> `bg-primary` button with `text-primary-foreground`, a
> `bg-card` card with a `border` — so I can see the brand
> colours render correctly in both modes. I'll remove this
> after checking.

### Step 5 — Look at it

Start the dev server (`npm run dev`) and open
`http://localhost:3000`. You should see your navy and blue
brand colours. Click the toggle: the whole test area should
flip between light and dark cleanly, with no flash and no
unreadable colour combinations.

### Step 6 — Remove the test bits

Once you're happy:

> Remove the temporary test area and the temporary placement of
> the theme toggle (keep the `ThemeToggle` component file — we'll
> use it in the header). Confirm the build is clean.

## Verify

- The site shows the navy/blue brand palette, not the generic
  starter colours.
- The toggle switches the whole page between light and dark.
- There's no flash of the wrong theme when you reload the page.
- Text is readable in both modes (navy on light, light on
  navy — no grey-on-grey or blue-on-navy that disappears).
- `npm run build` passes with no errors.

## Common problems and fixes

- **A flash of light mode before dark loads:** tell Claude Code
  "there's a flash of the wrong theme on load, please fix the
  hydration handling" — it's a known, solvable pattern.
- **Colours look wrong or washed out:** the token values may
  have been entered in the wrong colour format. Point Claude
  Code back to the exact values in `ui-context.md` and ask it
  to match them precisely.
- **The toggle does nothing:** the `ThemeToggle` must be a
  client component (it needs `"use client"` at the top because
  it uses interactivity). Ask Claude Code to confirm that.
- **Some text is hard to read in one mode:** that's a contrast
  issue — note which element and which mode, and ask Claude Code
  to adjust the token or the element to meet the contrast
  guidance in `ui-context.md`.

## Commit & wrap-up

When everything checks out, commit:

> Commit this with the message `feat: brand theme tokens and
> dark mode`, and update `context/progress-tracker.md` to mark
> the theme phase complete.

Before the next phase you should have: brand colours live in
both modes, a working (if not-yet-placed) theme toggle, and a
clean build. Next: `phase-03-typography.md`, where you bring in
the brand fonts.
