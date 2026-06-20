# Phase 5 — Site Shell (Header & Footer)

## What you're building and why

This is the first phase where you build something a visitor will
actually see on every page: the **header** at the top (your
name/wordmark, navigation links, the theme toggle, and a "Work
with me" button) and the **footer** at the bottom (a short line
about you, links, your socials, and — importantly — the
cross-link to refacint.com). Together these are the "frame"
that wraps every page of the site.

Building the frame before the content is deliberate: once the
header and footer exist, every section you add afterward
immediately looks like part of a real site, not a floating
fragment. It also gives your `ThemeToggle` its permanent home
(in the header), which is where it was always headed.

By the end, your site will have a polished, sticky header that
reacts to scrolling, a proper footer with the required link back
to the agency, and a working mobile menu — all in your Espresso
& Teal palette, both modes.

## How to run this phase

Use the workflow that's been working: have Claude Code read the
relevant context and this file, and work one step at a time,
pausing for you to check in the browser. Your standing rules
apply automatically — **PowerShell-native commands, preserve the
Espresso & Teal palette, real content only (placeholders marked
`TODO(content)`, never invented).**

## Concepts you need first

- **Layout vs page.** In Next.js, a `layout.tsx` file wraps
  every page — anything you put there (like a header and footer)
  appears on all pages automatically. That's where the shell
  lives, so you write it once and it's everywhere.
- **Sticky header.** A header that stays pinned to the top of
  the screen as you scroll, rather than scrolling away. Yours
  will start transparent over the hero and become solid (with a
  subtle blur) once you scroll down — a common polished touch.
- **Server vs client components (a light touch).** Most of the
  shell can be a Server Component (faster, simpler). The bits
  that need interactivity — the mobile menu that opens/closes,
  the scroll reaction, the theme toggle — are Client Components.
  Claude Code handles which is which; you just may see
  `"use client"` at the top of those specific files.
- **In-page anchor links.** Your homepage is one long page with
  sections. The header's nav links (like "Work", "Writing")
  jump to those sections using anchors (`#work`, `#writing`)
  rather than loading new pages.
- **The mobile menu (Sheet).** On phones there's no room for a
  row of nav links, so they collapse into a menu that slides out
  — built with the shadcn `Sheet` component you installed in
  Phase 4.

## What you provide

You chose placeholders for these, so Claude Code will insert
`TODO(content)` markers you fill in later — nothing invented:

- **Header wordmark** — your name or brand mark (placeholder for
  now).
- **Social links** — LinkedIn, X, and GitHub (placeholder URLs
  for now).

What's already decided (no input needed):

- **The footer must link to refacint.com** — this is a required
  cross-link (it's in your spec). Real URL, not a placeholder.
- **Contact email** — `hello@refacint.com` (this is real and
  known).
- **Nav sections** — Work, Consulting, Writing, Contact, etc.,
  matching the homepage sections you'll build in Phase 7.

## Steps

### Step 1 — Kick off from the spec

Paste into Claude Code:

> Read `context/feature-specs.md` (section 1, Site Shell),
> `context/ui-context.md` (the Layout Patterns and the recurring
> Header/Footer guidance), and `build/phase-05-site-shell.md`.
> Then work through this phase step by step, pausing after each
> step for me to check in the browser.
>
> Start with the **header**: build a `SiteHeader` component in
> `src/components/layout/`. It should have my wordmark on the
> left (use a `TODO(content)` placeholder — I haven't finalised
> it), in-page anchor nav links in the centre/right (Work,
> Consulting, Writing, Contact — matching the planned homepage
> sections), the existing `ThemeToggle`, and a "Work with me"
> button that links to the contact section. Make it sticky:
> transparent over the top of the page, becoming solid with a
> backdrop blur after scrolling. Use my Espresso & Teal tokens,
> works in light and dark. PowerShell-native; show me before
> running.

### Step 2 — Check the header

Run `npm run dev`, open `http://localhost:3000`, hard refresh
(Ctrl + Shift + R). Since there are no real sections yet, the
page will be mostly empty — that's fine; you're checking the
header itself:

- Wordmark placeholder shows on the left, nav links and the
  "Work with me" button on the right.
- The theme toggle works and is now in the header.
- It looks right in **both** light and dark.
- If you add some temporary height to the page (Claude Code can
  drop in a tall empty block), scrolling down should make the
  header go from transparent to solid-with-blur.

Tell Claude Code to proceed when it looks right.

### Step 3 — The mobile menu

> Now add the mobile menu: below the `md` breakpoint, the nav
> links collapse into a slide-out menu using the shadcn `Sheet`
> component, opened by a hamburger icon. It should trap focus
> when open and close on link tap or Escape. Keep the theme
> toggle accessible on mobile too.

**Check it:** in your browser, narrow the window until it's
phone-width (or use the browser's device-toolbar, F12 → the
phone/tablet icon). The nav links should disappear into a
hamburger icon; clicking it slides out the menu; tapping a link
or pressing Escape closes it.

### Step 4 — The footer

> Now build the `SiteFooter` component in
> `src/components/layout/`. Per `context/feature-specs.md` and
> `ui-context.md`: a short founder line with a link to
> refacint.com (this cross-link is required and uses the real
> URL), the section nav links, the contact email
> `hello@refacint.com`, and social links for LinkedIn, X, and
> GitHub (use `TODO(content)` placeholder URLs — I'll fill them
> later). Add a bottom bar with copyright and the required link
> back to the agency. Espresso & Teal, both modes.

### Step 5 — Wire shell into the layout

> Place `SiteHeader` and `SiteFooter` in the root `layout.tsx`
> so they appear on every page, with the page content rendered
> between them. Remove any temporary height/test blocks. Confirm
> the homepage shows header + (empty middle) + footer.

### Step 6 — Full check, both modes

Hard refresh and confirm:

- Header and footer appear, framing the page.
- Theme toggle works; everything correct in light and dark.
- The refacint.com cross-link in the footer actually works
  (click it — it should head to the agency site).
- Mobile: hamburger menu opens/closes cleanly.
- Console is clean (F12 → Console — no red errors, no hydration
  warnings).

## Verify

- `SiteHeader` and `SiteFooter` live in `src/components/layout/`.
- Both render on the homepage via `layout.tsx`.
- Sticky header transitions transparent → solid on scroll.
- Mobile menu works and is keyboard-accessible.
- Footer's refacint.com cross-link works; email and socials
  present (socials as `TODO(content)`).
- Espresso & Teal correct in both modes; console clean.
- `npm run build` passes with zero errors and warnings.

## Common problems and fixes

- **Changes not showing:** hard refresh (Ctrl + Shift + R). Still
  stale? Stop the dev server (Ctrl + C), `npm run dev` again. Still
  stale? `Remove-Item -Recurse -Force .next` then `npm run dev`.
- **Hydration error from the header:** if the scroll-reaction or
  toggle triggers a hydration mismatch (like the one in Phase 4),
  the fix is the same — the interactive part needs a `mounted`
  guard or to be a proper client component. Tell Claude Code
  "there's a hydration mismatch from the header, apply the
  mounted-guard pattern."
- **Header overlaps the content:** a transparent sticky header
  can sit on top of the first section. Claude Code should add top
  padding/offset so content isn't hidden behind it — mention it
  if you see overlap once sections exist.
- **Mobile menu doesn't trap focus / won't close:** ask Claude
  Code to confirm the `Sheet` is wired with proper open/close
  state and focus handling.

## Commit & wrap-up

> Everything looks right. Confirm `npm run build` passes, update
> `context/progress-tracker.md` to mark the site shell done, then
> commit and push. PowerShell-native.

Before the next phase you should have: a working header and
footer on every page, the theme toggle in its permanent home, a
mobile menu, and the required refacint.com cross-link live — all
on-brand, both modes, clean console and build.

Next: `phase-06-content-data.md`, where you create the typed
data files that hold your real site content (projects, services,
stack, etc.) — the single source of truth the homepage sections
will read from.
