# Phase 6 — Static Content Data Files

## What you're building and why

This phase has almost no visible result — and it's one of the
most important. You're creating the **typed data files** that
hold your real site content: your projects, the services you
offer, your tech stack, your FAQ, and so on. These live in
`src/data/` and become the **single source of truth** the
homepage sections will read from in Phase 7.

Why separate the content from the design like this? Because when
your project descriptions live in one tidy data file instead of
being scattered through the page code, you can update them in one
place, they stay consistent everywhere they appear, and — most
importantly for you — there's one clear spot where you make sure
every word is **real**. This is the phase where the "no
fabricated content" rule does its most important work.

By the end, you'll have a set of small, well-organised files
containing your genuine content (or clearly-marked placeholders),
ready for the sections to display.

## How to run this phase

Have Claude Code read `context/content-model.md` (the exact
shapes) and `context/brand-context.md` (the voice and the
no-fabrication rule) and this file, then build the data files
one at a time. Standing rules apply: **PowerShell-native, real
content only, anything you can't supply becomes a clearly-marked
`TODO(content)` — never invented.**

## Concepts you need first

- **Typed data file.** A small TypeScript file that exports a
  list (array) of items in a fixed shape. For example,
  `projects.ts` exports a list of projects, each with a name,
  summary, tags, and so on. "Typed" means TypeScript checks
  every item has the right fields, catching mistakes early.
- **Single source of truth.** Each kind of content is defined
  once, in one file. The Work section, a logo wall, and any
  future project page all read the *same* `projects.ts`. Change
  it once, it updates everywhere.
- **Why not just type content into the page?** Because then the
  same project name might live in three places and drift out of
  sync, and there's no single spot to audit for accuracy. Data
  files keep it clean and honest.
- **`TODO(content)`.** A placeholder marker. Wherever you don't
  yet have the real words, photo, or number, the file gets a
  clearly-labelled `TODO(content)` so you (and Claude Code) can
  see exactly what's still needed — and so nothing fake ships.

## What you provide

This is the heavy-input phase. The more real content you bring,
the more finished the site looks in Phase 7. Don't worry about
perfect wording — rough but *true* is the goal; you'll refine
phrasing later. Gather what you can for each:

- **Site basics (`site.ts`):** your name, your role ("Founder,
  Refacint Technologies"), a one-line positioning statement
  (this can stay `TODO(content)` for now — you'll craft it in
  the Hero step), the site URL (`afeez.refacint.com`), the
  agency URL (`refacint.com`), and the contact email
  (`hello@refacint.com`).
- **Projects (`projects.ts`):** your four real ones — **MOLEK
  Schools, Klassrun Technologies, Tenderville School, and
  Refacint** itself. For each: the client/name, a one-line
  summary of what it is, and — in your own honest words — the
  real problem, what you built, and the outcome. **Only real
  outcomes.** If you don't have a verifiable result/number,
  leave that field out rather than inventing one. Also: tags
  (e.g. custom-software, automation), the year, and whether to
  feature it on the homepage.
- **Services / Consulting (`services.ts`):** what you actually
  offer and advise on (AI agents, workflow automation, custom
  CRMs, content automation, AI consulting). For each: a title,
  a short founder-voice description, and 2–3 concrete, real
  benefits. **No prices** — flexible-terms language only.
- **Stack (`stack.ts`):** the tools you genuinely build with
  (Next.js, TypeScript, Tailwind, OpenAI, Vercel, etc.).
- **Capabilities (`capabilities.ts`):** the short list for the
  scrolling marquee (your real Refacint capabilities).
- **Stats (`stats.ts`):** **optional, real numbers only.** If
  you have genuine figures (years building, clients shipped,
  projects delivered), add them. If you don't, leave this as an
  empty list — the Stats strip simply won't render. Never invent
  a metric to fill it.
- **FAQ (`faq.ts`):** the real questions a prospect or organiser
  would ask, with honest answers (realistic timelines, flexible
  pricing language — no fake guarantees).
- **Talks (`talks.ts`):** speaking topics you'd offer (fine to
  list) and any *real* past talks (only if they actually
  happened). Empty is fine — the Speaking section has a
  "coming soon" state.
- **Socials (`socials.ts`):** LinkedIn, X, GitHub — you're using
  `TODO(content)` placeholder URLs for now.

If a whole category isn't ready, it's fine to fill it with one
real example plus `TODO(content)` notes and expand later. The
site will still build.

## Steps

### Step 1 — Kick off

> Read `context/content-model.md` (the exact data shapes) and
> `context/brand-context.md` (voice and the no-fabrication
> rule), and `build/phase-06-content-data.md`. We're creating
> the static content data files in `src/data/`. Build them one
> file at a time, in this order: `site.ts`, `projects.ts`,
> `services.ts`, `stack.ts`, `capabilities.ts`, `stats.ts`,
> `faq.ts`, `talks.ts`, `socials.ts`. Match the types in
> `content-model.md` exactly. Use the real content I give you;
> for anything I haven't provided, insert a clearly-marked
> `TODO(content)` placeholder — do not invent projects, metrics,
> testimonials, outcomes, or copy. Do **not** create a
> `posts.ts` — the blog is database-backed, not a data file.
> Start with `site.ts` and show me before moving on.
> PowerShell-native.

### Step 2 — Feed in your real content, file by file

Claude Code will work through each file. As it reaches each one,
**paste in your real content** for that file. Go one at a time —
it keeps you focused on getting each piece accurate. For the big
one, `projects.ts`, take your time: this is your proof of work,
and it's worth writing each project's problem → build → outcome
honestly and specifically.

Watch for two things as it builds each file:
- **Nothing invented.** If you see a project detail, number, or
  testimonial you didn't provide, stop and have it replaced with
  `TODO(content)`. This is the single most important check in
  the whole build.
- **Founder voice.** First person, specific, no hype. If copy
  drifts into generic marketing-speak, tell it to rewrite in
  your voice per `brand-context.md`.

### Step 3 — Type-check

> All data files are in. Confirm they type-check and the build
> passes (`npm run build`). Show me any TypeScript errors.

Type errors here usually mean an item is missing a required
field or has a typo in a field name — easy fixes, and far better
to catch now than when a section tries to display the data.

## Verify

- `src/data/` contains: `site.ts`, `projects.ts`, `services.ts`,
  `stack.ts`, `capabilities.ts`, `stats.ts`, `faq.ts`,
  `talks.ts`, `socials.ts`. (No `posts.ts`.)
- Each file matches the shape in `content-model.md` and
  type-checks.
- Your four real projects are present and honestly described.
- No invented content anywhere — gaps are `TODO(content)`.
- Services use no prices; stats are real or empty.
- `npm run build` passes clean.

## Common problems and fixes

- **TypeScript complains about a missing field:** an item is
  missing a required property from the shape. Add it (or mark it
  `TODO(content)`), or ask Claude Code which field is missing.
- **You're tempted to let it "fill in" a project outcome:**
  don't. An empty/omitted outcome is correct; an invented one
  undermines the whole site's credibility. Leave `TODO(content)`.
- **Unsure whether something counts as a real stat:** if you
  can't stand behind the number publicly, it's not real — leave
  it out. The Stats section is optional by design.

## Commit & wrap-up

> Data files complete and type-checking. Update
> `context/progress-tracker.md` to mark the content data layer
> done, then commit and push. PowerShell-native.

You now have your real content in one well-organised place. It's
not visible yet — that's Phase 7, where the sections finally
display it. But the hard part (getting the content right and
honest) is done here.

Next: `phase-07-sections.md`, where you build the homepage
sections that bring all this content to life.
