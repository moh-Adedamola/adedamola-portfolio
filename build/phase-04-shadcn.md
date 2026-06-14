# Phase 4 — shadcn/ui Component Toolkit

## What you're building and why

You don't want to hand-build every button, input, and dropdown
from scratch — that's slow and error-prone. **shadcn/ui** gives
you a set of well-made, accessible building-block components
(buttons, cards, form inputs, accordions, and more) that you
install into your own project and then style with your brand
tokens. This phase sets it up and installs the specific
components your site will need.

By the end, you'll have a folder of ready-to-use UI components
that already match your navy/blue theme and work in light and
dark mode.

## Concepts you need first

- **shadcn/ui is not a typical library.** Instead of installing
  a package you import from, it *copies the component code into
  your project* (into `src/components/ui/`). That means you own
  the code and can adjust it — and it's why `ui-context.md` says
  "do not hand-edit these unless regenerating", because they're
  generated files with a known shape.
- **Primitives vs your components.** The shadcn components are
  low-level "primitives" (a generic button, a generic card).
  Later you'll build your own higher-level components (like a
  `ProjectCard`) *using* these primitives. This phase only
  installs the primitives.
- **It uses your theme automatically.** Because shadcn
  components reference the same semantic tokens you set up in
  Phase 2, they'll adopt your brand colours and dark mode with
  no extra work.
- **The CLI.** shadcn has a command-line tool that adds
  components one at a time (e.g. "add button"). Claude Code will
  run it for you.

## What you provide

Nothing new — `context/ui-context.md` lists exactly which
components to install under "Component Library".

## Steps

### Step 1 — Initialise shadcn/ui

In Claude Code:

> Read the Component Library section of `context/ui-context.md`.
> Initialise shadcn/ui in this project in Tailwind v4 mode. When
> it asks for configuration, use settings consistent with our
> setup (TypeScript, the `src/` directory, our existing
> `globals.css` and theme tokens — do not let it overwrite our
> brand colours). Explain any prompts it will ask before
> running. Deliver as a bash script where possible; if the init
> is interactive, tell me exactly what to choose.

**Why the caution about colours:** shadcn's setup sometimes
offers to add its own default colour tokens. You've already
defined yours in Phase 2, so Claude Code should preserve those,
not replace them. If init proposes overwriting `globals.css`,
have it merge rather than replace.

### Step 2 — Install the components you need

> Now install the MVP components listed in `ui-context.md`:
> button, input, textarea, label, card, badge, avatar,
> separator, tooltip, sonner, dropdown-menu, sheet, and
> accordion. Install them via the shadcn CLI. One bash script.

These cover everything the site needs: the accordion is for the
FAQ, the sheet is for the mobile menu, sonner is for the contact
form's success/error toasts, and the rest are general building
blocks.

### Step 3 — Confirm they adopt the theme

> Add a temporary showcase on the homepage with one of each key
> component — a primary button, a card with a title, a badge,
> an input with a label, and an open accordion — so I can
> confirm they render with our brand colours in both light and
> dark mode.

### Step 4 — Look at it

Run `npm run dev`. The button should be your brand blue, the
card should use your surface colour, everything should be
readable, and toggling dark mode should restyle them all
correctly. The accordion should expand and collapse; hovering
the button should feel right.

### Step 5 — Clean up

> Remove the temporary component showcase and confirm the build
> is clean. Leave the installed components in
> `src/components/ui/` — we'll use them throughout the build.

## Verify

- `src/components/ui/` contains the installed component files.
- The showcase components rendered in your brand colours, in
  both modes.
- The accordion and any interactive bits worked.
- `npm run build` passes with no errors and no warnings.

## Common problems and fixes

- **shadcn init wants to overwrite your theme/colours:** stop
  and tell Claude Code to preserve your existing `globals.css`
  tokens from Phase 2 and only add what's strictly needed.
- **Components render in default grey/black, not your brand:**
  the components aren't picking up your tokens. Ask Claude Code
  to confirm the shadcn config points at your semantic tokens
  rather than its own defaults.
- **A component fails to install:** copy the exact CLI error to
  Claude Code. Usually a version or path mismatch it can fix.
- **Dark mode looks off on a component:** note which one and
  ask Claude Code to align it with the dark token values in
  `ui-context.md`.

## Commit & wrap-up

> Commit with `feat: shadcn/ui setup and base components` and
> update `context/progress-tracker.md`.

You now have the full foundation: colours, fonts, and a
component toolkit, all theme-aware. From here on you're
assembling real sections of the site. Next:
`phase-05-site-shell.md`, where you build the header and footer
that frame every page.
