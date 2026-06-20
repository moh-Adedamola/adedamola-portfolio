# Phase 15 — Analytics (GA4)

## What you're building and why

This adds Google Analytics 4 so that, once you're live, you can see
how many people visit, where they come from, and what they do —
which tells you whether the site is actually winning attention. It's
a small phase: wire in the Measurement ID you saved back in Phase 0,
guarded so it only runs when configured.

By the end, your site will report visits to your GA4 property (you'll
confirm this after deploy, since analytics needs a live URL to show
real traffic).

## How to run this phase

Have Claude Code read `context/feature-specs.md` (§10 Analytics),
`context/env-variables.md` (the GA variable), and this file.

## Concepts you need first

- **GA4 / Measurement ID.** Google Analytics 4 is the free tool that
  measures traffic. Your **Measurement ID** (looks like
  `G-XXXXXXXXXX`, saved in Phase 0) connects your site to your GA4
  property.
- **Loaded via a guarded script.** The analytics script is added with
  Next.js's `Script` component, set to load after the page is
  interactive (so it doesn't slow the page). It's **guarded** — if no
  Measurement ID is set, nothing loads (handy for local dev).
- **Public env var.** The ID goes in `NEXT_PUBLIC_GA_ID` — it's not a
  secret (it's visible in any analytics setup), but we still keep it
  in env config, not hardcoded.

## What you provide

- Your **GA4 Measurement ID** (`G-XXXXXXXXXX`) from Phase 0.

## Steps

### Step 1 — Add the ID

> Add `NEXT_PUBLIC_GA_ID` to `.env.local` (and the key, empty, to
> `.env.example`). I'll paste my Measurement ID. PowerShell-native.

### Step 2 — Wire in GA4

> Add Google Analytics 4 via `next/script` (`afterInteractive`) in
> the root `layout.tsx`, reading `NEXT_PUBLIC_GA_ID`. Guard it so
> nothing loads when the variable is unset. Where practical, track the
> primary conversions: contact-form submissions and clicks on the
> "Work with me" CTAs. No other third-party trackers.
> PowerShell-native; show me first.

### Step 3 — Confirm it's guarded

> Confirm that with `NEXT_PUBLIC_GA_ID` unset, no analytics script
> loads (so local dev stays clean), and with it set, the script is
> present in the page.

**Check (now):** view page source — with the ID set, the GA script
tag should be present; without it, absent. (Real traffic data only
shows once the site is deployed and you visit the live URL — you'll
confirm that in Phase 17/19 via GA4 Realtime.)

## Verify

- `NEXT_PUBLIC_GA_ID` in `.env.local`; key in `.env.example`.
- GA script loads only when the ID is set; absent otherwise.
- No other trackers added.
- Console clean; `npm run build` passes.

## Common problems and fixes

- **Script loads even without the ID:** the guard is missing — have
  Claude Code wrap it so it only renders when the ID is present.
- **Want to confirm it works now:** you can't fully — GA needs a live
  URL. You'll see your visit in GA4 Realtime after deploy.

## Commit & wrap-up

> Analytics wired and guarded. Confirm `npm run build` passes, update
> `context/progress-tracker.md`, commit and push. PowerShell-native.

Next: `phase-16-qa.md` — a thorough pre-launch quality pass before we
deploy.
