# Build Guide — How to Use This

This folder is a step-by-step guide to building the founder
portfolio (afeez.refacint.com) from nothing to a live site,
using Claude Code. It is written to be followed by someone who
has not done this before. Almost everything is explained.

## How this guide is organized

The build is broken into numbered phases. Each phase is its
own file, and you do them in order, one at a time. Do not jump
ahead — each phase assumes the previous one is finished and
working.

```
build/
  README.md            ← you are here
  phase-00-prerequisites.md
  phase-01-repo-and-scaffold.md
  phase-02-theme.md
  phase-03-typography.md
  phase-04-shadcn.md
  phase-05-site-shell.md
  phase-06-content-data.md
  phase-07-sections.md          ← all homepage sections
  phase-08-database.md          ← Prisma + Neon (blog storage)
  phase-09-auth.md              ← Clerk single-admin
  phase-10-admin-dashboard.md   ← the custom CMS
  phase-11-image-uploads.md     ← Cloudinary
  phase-12-public-blog.md       ← /blog, /blog/[slug], RSS
  phase-13-contact.md
  phase-14-seo.md
  phase-15-analytics.md
  phase-16-qa.md
  phase-17-deploy.md
  phase-18-dns.md
  phase-19-search-and-crosslinks.md
  phase-20-signoff.md
```

The blog and custom admin dashboard (Phases 8–12) are part of
launch. They come after the static site is built, because the
homepage's "Writing" teaser depends on the blog existing first.
This per-phase guide supersedes the earlier single-file
`context/build-guide.md`.

## Every phase file has the same shape

So you always know what you're looking at:

1. **What you're building and why** — the goal in plain
   English, and how it fits the bigger picture.
2. **Concepts you need first** — the background to understand
   before you start. Skip what you already know.
3. **What you provide** — anything real that has to come from
   you (your words, photos, account details). Flagged clearly
   so nothing gets invented.
4. **Steps** — exact terminal commands, exact prompts to paste
   into Claude Code, and any file contents — with an
   explanation of what each does.
5. **Verify** — how to check it actually worked, what success
   looks like, and the common problems with their fixes.
6. **Commit & wrap-up** — save your work in git, and confirm
   the state you should be in before the next phase.

## A few ground rules that apply to the whole build

- **The `context/` folder is the source of truth.** Those 13
  files (project-overview, architecture, ui-context,
  feature-specs, brand-context, design-reference, etc.) define
  what we're building. This `build/` folder tells you *how* to
  execute it. When you prompt Claude Code, you'll often point
  it at specific context files.
- **One slice at a time.** Build one thing, look at it in the
  browser, confirm it's right, save it, then move on. This is
  slower per step but far faster overall, because problems stay
  small and findable.
- **Real content only.** Never let Claude Code invent client
  stories, numbers, testimonials, or biographical facts. If a
  real value isn't ready, it goes in as a clearly-marked
  `TODO(content)` placeholder and you fill it later. This rule
  is non-negotiable and comes straight from `brand-context.md`.
- **Commands are PowerShell-native.** This project is built on
  Windows using PowerShell. When Claude Code makes changes, it
  gives you PowerShell commands — or a single `.ps1` script when
  several steps are needed — that you run from the project root.
  It does **not** hand you bash/`.sh` scripts. **This supersedes
  any phase file below that says "deliver as one bash script" —
  read those as "deliver as PowerShell-native commands."** If a
  phase's pasted prompt mentions a bash script, you can either
  ignore that word or add "give me PowerShell commands, not
  bash" to the prompt. Either way Claude Code already has the
  standing instruction once you've set it (Phase 1).
- **Approve direction first, then refine.** When Claude Code
  proposes an approach, read it, adjust it, and only then let
  it write the code. You're the director; it's the builder.

## What "done" means for the whole project

By the end you'll have: a fast, polished, on-brand single-page
portfolio live at afeez.refacint.com, in light and dark mode,
with a working contact form, analytics, SEO, and cross-links
to the Refacint agency site — built entirely from real content.

Start with `phase-00-prerequisites.md`.
