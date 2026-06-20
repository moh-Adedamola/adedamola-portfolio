# Phase 17 — Deploy to Vercel

## What you're building and why

Your site has lived only on your computer so far. This phase puts it
on the internet — hosted by Vercel, deployed from your GitHub repo —
so it has a real, live URL. You'll first deploy to a temporary Vercel
URL to confirm everything works in production (including the database,
login, and email with real environment variables), before pointing
your actual subdomain at it in Phase 18.

By the end, your site will be live on a Vercel URL, fully working, and
ready for its real address.

## How to run this phase

This is mostly done in the Vercel website, not in code. Claude Code
can help with any config tweaks, but the main steps are clicks in
Vercel. Have it on standby for issues.

## Concepts you need first

- **Deploy / hosting.** Putting your site on a server so anyone can
  reach it. Vercel reads your code from GitHub and publishes it.
- **Preview/production URL.** Vercel gives every project a URL like
  `your-project.vercel.app`. That's your live site until you attach
  the custom subdomain (Phase 18).
- **Environment variables in Vercel.** Your secrets (database, Clerk,
  Cloudinary, Resend) live in `.env.local` on your machine — which is
  *not* uploaded to GitHub. So Vercel doesn't have them yet. You must
  add them in Vercel's settings, or the live site can't reach the
  database, log in, upload images, or send email.
- **Production migrations.** The live site needs the `Post` table in
  the database. Since you already ran the migration against your Neon
  database in Phase 8 (and Neon is the same database for local and
  production), the table already exists. You just ensure Vercel runs
  `prisma generate` on build.

## What you provide

- Your **GitHub repo** (already pushed).
- All your **environment values** (the ones from `.env.local`):
  database URLs, Clerk keys, Cloudinary keys, Resend key, GA ID, plus
  the app config. Have them ready to paste into Vercel.

## Steps

### Step 1 — Import the project into Vercel

1. Go to Vercel and sign in (you connected GitHub in Phase 0).
2. Click **Add New… → Project**.
3. Find and **Import** your `adedamola-portfolio` GitHub repo.
4. Vercel auto-detects Next.js — leave the framework preset as is.
5. **Don't deploy yet** — first add environment variables (next step).
   If Vercel deploys immediately, that's okay; it'll just fail or run
   without env until you add them, and you'll redeploy.

### Step 2 — Add environment variables

In the project's **Settings → Environment Variables**, add every
variable from your `.env.local`, for the **Production** (and Preview)
environment:

- `DATABASE_URL`, `DIRECT_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`,
  `NEXT_PUBLIC_CLERK_SIGN_IN_URL`, `ADMIN_EMAIL_ALLOWLIST`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`,
  `CLOUDINARY_API_SECRET`, `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_SITE_URL` → set this to `https://afeez.refacint.com`
  (your real final URL)
- `NEXT_PUBLIC_SITE_NAME`

Paste the values carefully. These are the same secrets from
`.env.local` — Vercel stores them securely; they're not exposed
publicly.

> Tip for Claude Code: "List every env var my app reads, so I can
> confirm I've added all of them to Vercel and none are missing."

### Step 3 — Deploy

Trigger a deploy (Vercel does this automatically after import, or hit
**Redeploy** after adding env vars). Watch the build log. If it
succeeds, you get a live `*.vercel.app` URL.

### Step 4 — Test the live site thoroughly

Open the Vercel URL and test the things that depend on environment/
production — these can pass locally but fail live if a var is wrong:

- The homepage loads, both modes, all sections.
- **The blog works** — `/blog` and a post render (database connection
  is good).
- **Login works** — go to the Vercel URL `/admin`, sign in. (You may
  need to add the Vercel URL to Clerk's allowed origins — see fixes.)
- **Create/publish a post** on the live site — confirms DB writes and,
  if you add an image, Cloudinary uploads.
- **Contact form** sends an email.
- **GA4 Realtime** — visit the site, then check Google Analytics →
  Realtime; you should see your visit (confirms analytics).

### Step 5 — Confirm production build settings

> Confirm the Vercel build runs `prisma generate` (so the Prisma
> client is available in production) and that the build command/output
> are correct for Next.js. If the build log shows any Prisma or env
> errors, help me read and fix them.

## Verify

- The site is live on a `*.vercel.app` URL and builds successfully.
- All env vars are set in Vercel; no "missing variable" errors.
- Blog, login, post creation, image upload, and contact email all work
  **on the live URL**.
- GA4 Realtime shows your live visit.

## Common problems and fixes

- **Build fails with a Prisma error:** ensure `prisma generate` runs on
  build (often via a `postinstall` script or the build command). Paste
  the log to Claude Code.
- **Login fails on the live URL (works locally):** Clerk may need the
  Vercel domain added to its allowed origins/redirect URLs in the Clerk
  dashboard. Add the `*.vercel.app` URL (and later the real subdomain).
- **"Missing environment variable" at runtime:** one var wasn't added to
  Vercel, or has a typo. Compare against the list from Step 2.
- **Database connection errors live:** confirm `DATABASE_URL` (pooled)
  and `DIRECT_URL` are both set in Vercel exactly as in `.env.local`.
- **Contact email fails live:** confirm `RESEND_API_KEY` and a valid
  `CONTACT_FROM` are set in Vercel; verify the domain in Resend before
  using a `@refacint.com` sender.

## Commit & wrap-up

No code commit is required for deploy itself (Vercel deploys from your
existing GitHub pushes). If Step 5 needed config changes, commit and
push them.

> Update `context/progress-tracker.md` to note the site is deployed and
> working on the Vercel URL, with all integrations verified live.

Your site is on the internet. Next: `phase-18-dns.md`, where you give it
its real address — afeez.refacint.com.
