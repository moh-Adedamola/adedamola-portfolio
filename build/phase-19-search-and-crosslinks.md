# Phase 19 — Search Console & Cross-Links

## What you're building and why

Your site is live at afeez.refacint.com. This phase helps the world
*find* it: you register the site with Google Search Console (so Google
indexes it and you can see search performance), submit your sitemap, and
set up the reciprocal link between your portfolio and the Refacint agency
site so the two reinforce each other.

By the end, Google knows your site exists, and your portfolio and the
agency site point to each other.

## How to run this phase

Mostly done in web dashboards (Google Search Console, and your agency
site's code/CMS). Short phase.

## Concepts you need first

- **Google Search Console.** A free Google tool where you register your
  site, prove you own it, submit your sitemap, and watch how you appear
  in search. Different from Analytics (which measures visitors) — this is
  about *search visibility*.
- **Sitemap submission.** Telling Google where your sitemap is so it
  finds all your pages (you built the sitemap in Phase 14).
- **Reciprocal cross-link.** Your footer already links to refacint.com.
  This phase adds the link the *other* way — from the agency site to your
  portfolio. Mutual links help both sites and let visitors move between
  "the company" and "the founder."

## What you provide

- Access to your **Google account** (for Search Console).
- Access to the **refacint.com site** (to add the link back) — its code
  or CMS.

## Steps

### Step 1 — Register in Google Search Console

1. Go to Google Search Console and sign in.
2. Add a property for **afeez.refacint.com** (URL prefix:
   `https://afeez.refacint.com`).
3. Verify ownership. The easiest method for a Vercel site is usually the
   **HTML tag** method (add a meta tag) or DNS verification. If you use
   the HTML tag:
   > Claude Code: "Add this Google Search Console verification meta tag
   > to the site's `<head>` in the root layout: [paste the tag]. Then
   > I'll redeploy and verify." (PowerShell-native, commit, push.)
   After it deploys, click Verify in Search Console.

### Step 2 — Submit your sitemap

1. In Search Console → **Sitemaps**.
2. Submit `https://afeez.refacint.com/sitemap.xml`.
3. It should be accepted (it may take time to process). This tells Google
   about your homepage, `/blog`, and your posts.

### Step 3 — Add the reciprocal link on the agency site

On **refacint.com**, add a link to your portfolio — for example an "About
the founder" link in the footer or about page, pointing to
`https://afeez.refacint.com`. This is the mirror of the cross-link already
in your portfolio's footer.

(If the agency site is a separate project/repo, do this there — it's a
small content edit, not part of this codebase.)

### Step 4 — Optional: Bing Webmaster Tools

If you want broader coverage, also add the subdomain to Bing Webmaster
Tools (the agency already uses it) and submit the same sitemap.

## Verify

- afeez.refacint.com is a verified property in Google Search Console.
- The sitemap is submitted and accepted.
- refacint.com links to afeez.refacint.com (reciprocal to your footer
  link).
- (Optional) Bing set up.

## Common problems and fixes

- **Search Console won't verify:** make sure the verification tag/method
  is actually live on the deployed site (redeploy after adding the tag),
  then retry. DNS verification is an alternative if the tag method is
  fiddly.
- **Sitemap "couldn't fetch":** confirm `https://afeez.refacint.com/sitemap.xml`
  loads in your browser first; if it does, retry submission (processing
  can lag).
- **Don't expect instant search results:** Google takes days to weeks to
  index a new site. Submitting the sitemap just starts the process.

## Commit & wrap-up

> If a verification tag was added, confirm it's committed and deployed.
> Update `context/progress-tracker.md` to note Search Console is set up,
> the sitemap submitted, and the agency cross-link added.

Next: `phase-20-signoff.md` — the final check, and what to do after
launch.
