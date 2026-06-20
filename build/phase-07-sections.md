# Phase 7 — Homepage Sections

## What you're building and why

This is the big, satisfying one: the actual homepage. You'll
build each section in turn — Hero, the capability marquee, About,
Work, Why Work With Me, Consulting, Stack, Speaking, and FAQ —
each reading from the data files you made in Phase 6 and styled
in your Espresso & Teal brand. By the end, you'll have a real,
scrollable, polished homepage that tells your story.

(Two sections are intentionally *not* here: **Writing** comes in
Phase 12, because it shows your latest blog posts and the blog
doesn't exist until then; **Contact** is Phase 13. The header's
nav links to them won't jump anywhere until those phases — that's
expected.)

This is a long phase. Don't try to do it in one sitting — build
a section, check it, commit it, and come back for the next. Each
section is its own small win.

## How to run this phase

Build **one section at a time**, each as its own slice with its
own commit. Have Claude Code read the relevant part of
`context/feature-specs.md`, plus `context/ui-context.md`,
`context/design-reference.md`, and `context/brand-context.md`,
for each section. Standing rules: **PowerShell-native, Espresso &
Teal, real content from `src/data/` (never hardcoded or
invented), check in the browser in both modes after each.**

If you saved screenshots of the reference sites into
`context/refs/`, now's when they earn their keep — point Claude
Code at them for the sections where you want the Vysta polish or
the Stanlee content feel.

## The rhythm for every section (read this once)

Every section follows the same loop. Rather than repeat it nine
times below, learn it once:

1. **Kick off:** tell Claude Code which section, and which spec
   sections to read. It builds the section component in
   `src/components/sections/`, reading content from the matching
   `src/data/` file, and adds it to the homepage.
2. **Look at it:** `npm run dev`, hard refresh (Ctrl + Shift + R),
   view the section. Check it in **light and dark**.
3. **Check the essentials:** content comes from your data (not
   invented); it's responsive (narrow the window to phone width);
   images use `next/image` with alt text; console is clean (F12).
4. **Refine:** if the look or copy is off, say so specifically.
   Approve when right.
5. **Commit:** "confirm build passes, update progress-tracker,
   commit and push."

That's the loop. Below, each section just notes what's specific
to it.

## The sections, in order

### 7.1 — Hero (`#hero`)

The first thing visitors see. Reads from `site.ts`. Bold,
oversized DM Sans headline (Vysta-style confidence) with an
honest, first-person positioning line (Stanlee-style), your role,
a primary "Work with me" button, a secondary "See my work" link,
and your founder photo.

- **You provide:** your positioning one-liner (if still
  `TODO(content)`, now's the time to write it — one honest
  sentence on who you are and what you do), and your founder
  photo (drop it in `public/`; if not ready, use a tasteful
  placeholder and mark `TODO(asset)`).
- **Specific check:** a visitor should grasp who you are within
  ~5 seconds. The headline should feel confident but true — no
  hype. Coordinated entrance animation is a nice touch; make sure
  it respects reduced-motion.

### 7.2 — Capability Marquee

A slim, horizontally scrolling ticker of your capabilities, just
below the hero. Reads from `capabilities.ts`.

- **Specific check:** it loops smoothly and is not distracting.
  Under reduced-motion it should sit static, not animate. The
  items must be real Refacint capabilities.

### 7.3 — Stats Strip (optional)

Big-number proof blocks. Reads from `stats.ts`. **Only renders if
you put real numbers in `stats.ts`.** If that file is empty, skip
this — and that's fine.

- **Specific check:** if it shows, every number must be one you
  can stand behind. If you're not comfortable with a figure,
  remove it from the data; the section adapts.

### 7.4 — About (`#about`)

A reading-width, first-person section telling your story.

- **You provide:** your real story — background, why
  automation/AI, the Lagos-and-global angle. First person ("I
  build…"). If not ready, `TODO(content)` and refine later.
- **Specific check:** personality and specifics, not generic
  bio-speak. Links to refacint.com. No invented biography.

### 7.5 — Work (`#work`)

A grid of project cards from `projects.ts` (the featured ones),
plus a client logo wall. Each card tells the project as a short
story (problem → built → outcome) with links to the live site
and/or repo where public.

- **Specific check:** only your real projects (MOLEK, Klassrun,
  Tenderville, Refacint). Outcomes shown must be real — no
  invented metrics. Cards should lift subtly on hover. The logo
  wall only shows logos you have rights to (else text names).

### 7.6 — Why Work With Me (`#why`)

Three columns of honest differentiators (Vysta-style: a label, a
quote-ish heading, a divider, a paragraph). Your genuine edges:
local market knowledge, real delivery track record,
automation-first focus.

- **Specific check:** confident but defensible — no "the best",
  no absolutes. Honest confidence per `brand-context.md`.

### 7.7 — Consulting (`#consulting`)

Icon feature cards from `services.ts`.

- **Specific check:** flexible-terms language, **no prices**.
  Benefits grounded in real delivered work, not hype.

### 7.8 — Stack (`#stack`)

Your "tools of the craft" from `stack.ts` — a clean labelled
list/grid.

- **Specific check:** only tools you actually use. Doubles as a
  credibility signal for technical prospects.

### 7.9 — Speaking (`#speaking`)

From `talks.ts`. Lists topics you'd offer and any real past
talks. If there are none yet, it shows a designed "available for
talks" state with a CTA — never a sad empty gap.

- **Specific check:** offered topics are fine; past talks must be
  real. The empty/coming-soon state should look intentional.

### 7.10 — FAQ (`#faq`)

An accordion (the shadcn one) from `faq.ts`.

- **Specific check:** honest answers, realistic timelines, no
  fake guarantees, flexible pricing language. The accordion opens
  and closes smoothly in both modes.

## Verify (whole phase)

- Every section above exists in `src/components/sections/` and
  appears on the homepage in order.
- Each reads from its `src/data/` file — no content hardcoded in
  the markup that should be data, nothing invented.
- The whole page works top-to-bottom in **light and dark**, and
  is responsive at phone width.
- Header nav anchor links jump to the right sections (Work,
  Consulting, etc.).
- All images via `next/image` with alt text; founder photo in
  place (or `TODO(asset)`).
- Console clean; `npm run build` passes with zero errors and
  warnings.

## Common problems and fixes

- **Changes not showing:** hard refresh; then restart dev; then
  `Remove-Item -Recurse -Force .next` and `npm run dev`.
- **A section reads from invented content:** stop and replace
  with `TODO(content)`. The page must never display anything you
  didn't actually provide.
- **Layout breaks at phone width:** name the section and ask
  Claude Code to fix the responsive layout (mobile-first).
- **Header overlaps the hero:** the transparent sticky header may
  sit over the top section — ask for top offset/padding so
  content isn't hidden.
- **An animation flickers or causes a hydration warning:** apply
  the mounted-guard / client-component pattern, same as Phase 4's
  toggle fix.

## Commit & wrap-up

Commit after **each** section (not just at the end) — that way
each is a safe checkpoint. When all sections are done:

> All homepage sections are built, reading from the data files,
> working in both modes and responsive. Confirm `npm run build`
> passes, update `context/progress-tracker.md` to mark the
> homepage sections done, then commit and push. PowerShell-native.

You now have a real, polished homepage telling your story — minus
the Writing and Contact sections, which come once the blog and
contact form exist.

Next: `phase-08-database.md`, the first of the blog + CMS phases,
where you set up the database that will store your posts. The
pace changes here — these phases are more involved (a database, a
login, a dashboard) — so take them one at a time.
