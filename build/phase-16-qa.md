# Phase 16 — Pre-Launch QA

## What you're building and why

Before the site goes live, you give it a thorough once-over to catch
anything broken, off-brand, fabricated, slow, or inaccessible. This
is the gate between "built" and "launched." It's worth doing
properly — fixing things now, on your own machine, is far easier than
discovering them after the site is public and people are looking.

By the end, you'll have a site that builds clean, works on every
screen size in both modes, has no fabricated content, loads fast, and
is ready to deploy.

## How to run this phase

This is a review-and-fix phase, not a build phase. Have Claude Code
help you work through the checklist, fixing issues as they surface.
A good kickoff:

> Read `context/ai-workflow-rules.md` (the definition of done) and
> `build/phase-16-qa.md`. Help me run a full pre-launch QA pass on the
> whole site. Go through the checklist with me, and as we find issues,
> fix them one at a time (PowerShell-native, preserving Espresso &
> Teal, real content only). Start by running `npm run build` and
> reporting anything that isn't clean.

## The QA checklist

Work through these. Tick each; fix anything that fails before moving
on.

### Build & code health
- `npm run build` passes with **zero** TypeScript errors and **zero**
  ESLint warnings.
- No leftover `console.log`s or commented-out dead code in what ships.
- Revisit the npm audit warnings noted back in Phase 4 — ask Claude
  Code whether any are real/actionable now, and address genuinely
  risky ones (don't chase low-severity noise in build tooling).

### Content honesty (the most important pass)
- **No fabricated content anywhere** — no invented projects, metrics,
  testimonials, outcomes, or quotes. Re-read every section with this
  lens.
- **No `TODO(content)` or `TODO(asset)` left** in anything public.
  Every placeholder is either filled with real content or the section
  is adjusted to not need it.
- Copy is founder-voiced, specific, no hype, no fixed prices, no
  "30-day" claims (per `brand-context.md`).

### Visual & responsive
- Every page/section works at **375px (mobile)**, ~768px (tablet),
  and desktop. Narrow the browser or use device tools (F12 → device
  toolbar).
- Everything works in **both light and dark** — toggle through every
  section; check contrast (text readable, nothing washed out).
- No layout shift on load; images sized properly.

### Links & navigation
- Every header/footer nav link goes to the right place.
- The **refacint.com cross-link** works.
- All external links (socials, project live/repo links) open
  correctly.
- In-page anchors (Work, Writing, Contact, etc.) scroll to the right
  sections.

### The blog & CMS
- `/blog` shows only published posts; drafts absent.
- A post page renders correctly and matches the dashboard preview.
- **Draft privacy:** a draft's direct URL returns 404.
- The admin area is unreachable signed-out (re-run the Phase 9
  break-in test).
- RSS (`/rss.xml`) lists published posts only.

### Forms
- Contact form delivers an email; validation works; spam honeypot in
  place; mailto fallback works if the key is unset.

### SEO & sharing
- `/sitemap.xml` correct (no drafts/admin); `/robots.txt` disallows
  `/admin`.
- Each page has a unique title/description; `Person` and `Article`
  JSON-LD present and accurate.
- `og.png` exists (no placeholder shipping).

### Accessibility
- Everything reachable by keyboard (Tab through it); visible focus
  rings.
- Images have meaningful `alt` text.
- One `<h1>` per page; logical heading order.
- Motion respects reduced-motion.

### Performance
- Run **Lighthouse** (Chrome DevTools → Lighthouse tab → analyze).
  Aim for green on Performance, Accessibility, Best Practices, SEO.
- Address the big hits — usually the hero image (size it well), and
  any layout shift. Ask Claude Code to fix specific Lighthouse
  findings.

## How to work through it

Don't try to fix everything at once. Go category by category:

> Let's do the [responsive / accessibility / performance / …]
> section of the QA checklist now. Here's what I'm seeing: [describe
> or paste]. Fix these one at a time, PowerShell-native.

Commit after each meaningful batch of fixes, so progress is saved.

## Verify

- Every checklist item above passes.
- `npm run build` clean; Lighthouse green (or close, with known
  reasons).
- No fabricated content; no public placeholders.
- The whole site reviewed in both modes and at mobile/desktop.

## Common problems and fixes

- **A Lighthouse performance hit from the hero image:** size it,
  use `next/image` priority for the above-the-fold hero, ensure
  width/height set.
- **Contrast failures in one mode:** name the element/mode; small
  token or class tweak.
- **A placeholder you forgot:** search the project for
  `TODO(content)` and `TODO(asset)` — Claude Code can list every
  remaining one so nothing slips through.

## Commit & wrap-up

> QA pass complete — build clean, no fabricated content, responsive
> and accessible in both modes, blog/CMS and forms verified,
> Lighthouse green. Confirm everything committed and pushed, and
> update `context/progress-tracker.md`. PowerShell-native.

The site is now genuinely launch-ready. Next: `phase-17-deploy.md`,
where you put it live on Vercel.
