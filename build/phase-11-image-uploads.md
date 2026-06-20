# Phase 11 — Image Uploads (Cloudinary)

## What you're building and why

Right now your posts are text-only. This phase lets you add
images — a cover image for each post, and images inside the body
— by uploading them straight from the dashboard. The images are
stored on Cloudinary (a service built for hosting images), not in
your database, which keeps things fast and tidy.

By the end, you'll be able to pick an image in the editor, have it
upload to Cloudinary, and use it as a post's cover or drop it into
the body — all without leaving the dashboard.

## How to run this phase

Have Claude Code read `context/architecture.md` (the Cloudinary
storage model and the "images never pass through our server"
invariant), `context/api-routes.md` (the signed upload route),
`context/env-variables.md` (Cloudinary keys), and this file.
Standing rules apply, including **never commit secrets**.

## Concepts you need first

- **Why not store images in the database?** Databases are for
  text/data, not big binary files. Storing images there makes
  everything slow and bloated. Instead, the image lives on
  Cloudinary, and the database just stores its **URL** (a link to
  it). Standard practice.
- **Signed upload (the secure pattern).** Here's the clever part:
  the image goes from your browser **directly** to Cloudinary —
  it doesn't pass through your own server. To allow that securely,
  your server creates a short-lived "signature" (using your secret
  Cloudinary key) that authorises just that one upload. The
  browser uses the signature to upload. This means your secret
  key never reaches the browser, and your server never has to
  handle large files. Your `architecture.md` requires this
  pattern.
- **Cover image vs inline image.** The *cover* is the post's main
  image (shown on cards and at the top of the post). *Inline*
  images go inside the body via markdown (`![alt](url)`). Both
  upload the same way.
- **Alt text.** A short text description of an image, for
  accessibility and SEO. Every image needs it. The cover image
  has its own alt field (`coverImageAlt` in your schema).

## What you provide

- **Your Cloudinary credentials** (from Phase 0): cloud name, API
  key, and API secret.
- A **test image** or two to upload while building.

## Steps

### Step 1 — Add Cloudinary secrets to `.env.local`

> Add my Cloudinary credentials to `.env.local` (gitignored):
> `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`,
> `CLOUDINARY_API_SECRET`, and `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
> (the public one, for building image URLs). Update `.env.example`
> with these keys (empty) per `context/env-variables.md`. I'll
> paste the values. The API secret must stay server-only — never
> in client code. PowerShell-native.

Confirm `.env.local` is still gitignored.

### Step 2 — The signed-upload endpoint

> Create the signed upload route `/api/admin/uploads/sign` per
> `context/api-routes.md`: it's auth-checked (`requireAdmin`) and
> returns a short-lived Cloudinary upload signature generated with
> the server-side secret. The image will be uploaded by the
> browser directly to Cloudinary using this signature — the bytes
> never pass through our server, and the secret never reaches the
> client. PowerShell-native; show me before running.

### Step 3 — Cover image upload in the editor

> In the post editor (from Phase 10), add a cover-image control: a
> button to choose an image, which gets a signature from
> `/api/admin/uploads/sign`, uploads directly to Cloudinary, and
> saves the returned URL into the post's `coverImageUrl`, plus an
> alt-text field for `coverImageAlt`. Show an upload progress/
> loading state and a preview of the chosen cover. PowerShell-
> native.

**Check:** in the editor, choose a cover image. It should upload
(you'll see progress), then show a preview. Save the post; the
cover URL is stored.

### Step 4 — Inline images in the body

> Add a way to upload an inline image from the editor that, once
> uploaded to Cloudinary, inserts the correct markdown image
> syntax (`![alt](url)`) into the body at the cursor. Make sure
> the live preview then renders that image. PowerShell-native.

**Check:** upload an inline image; the editor inserts the markdown
and the live preview shows the image rendered.

### Step 5 — Confirm images render via next/image

> Ensure cover and body images render through `next/image` (per
> our invariants) with proper sizing and the alt text, so they're
> optimised and don't cause layout shift. Cloudinary URLs work
> directly with `next/image`. PowerShell-native.

## Verify

- `.env.local` has the Cloudinary keys; not committed; secret is
  server-only (never in client bundle).
- The signed-upload route is auth-checked.
- You can upload a cover image (with alt text) and see it
  previewed and saved.
- You can upload an inline image and it appears in the body and
  preview.
- Images render via `next/image` with alt text.
- Console clean; `npm run build` passes.

## Common problems and fixes

- **Upload fails / signature rejected:** usually a credential
  mismatch — confirm the cloud name, key, and secret are pasted
  correctly, and that the signature route uses the server secret.
  Paste the error.
- **The secret appears in the browser:** serious — the API secret
  must only be used server-side in the signature route, never in
  client code or a `NEXT_PUBLIC_` var. Only the cloud name is
  public. Ask Claude Code to confirm the secret isn't bundled
  client-side.
- **Image uploads but doesn't show:** check the saved URL is
  correct and that `next/image` is allowed to load Cloudinary's
  domain (Next.js may need Cloudinary added to its image config —
  Claude Code can add it).
- **Layout shift when images load:** ensure width/height or
  proper sizing is set on `next/image`.

## Commit & wrap-up

> Image uploads work — cover and inline, via signed Cloudinary
> uploads, rendering through next/image. Confirm `.env.local`
> isn't staged, `npm run build` passes, update
> `context/progress-tracker.md`, commit and push. PowerShell-
> native.

Your posts can now have images. Next: `phase-12-public-blog.md`,
where your published posts finally become visible to the world —
the `/blog` page, individual post pages, an RSS feed, and the
homepage Writing section wired to your latest posts.
