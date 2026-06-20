# Phase 10 — Admin Dashboard (the CMS)

## What you're building and why

Now that the lock is on (Phase 9) and the database is ready
(Phase 8), you build the actual thing you wanted all along: a
dashboard where **you write and manage blog posts without
touching code**. A list of your posts, a "New post" button, and
an editor where you type your post in markdown and see it
formatted live as you go — then save it as a draft or publish it.

By the end, you'll be able to log in, create a post, write it,
save it as a draft, and edit it — all from a web interface. (It
won't be publicly visible yet — that's Phase 12. And images come
in Phase 11. This phase is the writing-and-managing core.)

## How to run this phase

Have Claude Code read `context/feature-specs.md` (§12.2 Post List
and §12.3 Create/Edit Post), `context/api-routes.md` (the post
CRUD routes and auth pattern), `context/database-schema.md` (the
`Post` model and helpers), `context/code-standards.md` (forms,
validation), and this file. Standing rules: **PowerShell-native,
Espresso & Teal, auth-checked on every write, Zod validation,
real content only.** Build one piece at a time.

## Concepts you need first

- **CRUD.** The four things you do with data: Create, Read,
  Update, Delete. Your dashboard does all four with posts.
- **Markdown.** A simple way to write formatted text using plain
  characters — `# Heading`, `**bold**`, `- list item`. It's easy
  to write and stores cleanly. You'll write posts in markdown;
  the blog renders it to formatted HTML.
- **Live preview.** As you type markdown on one side, the
  formatted result shows on the other (or via a toggle). So you
  see what the post will look like *while* writing it.
- **Server Action vs API route.** Two ways the dashboard saves
  data to the server. Both work; the key rule (from your specs)
  is the same either way: **check auth first, validate input with
  Zod, then write.** Claude Code will pick one approach and stay
  consistent.
- **Zod validation.** Before saving a post, the server checks the
  data is valid (title present, slug well-formed, etc.). This
  runs on the server even if the browser already checked —
  because the server can never trust the browser.
- **Draft vs Published.** A post starts as a DRAFT (only you see
  it, in the dashboard). Publishing flips it to PUBLISHED (it'll
  go live on the blog in Phase 12). You can unpublish back to
  draft.
- **Slug.** The URL-friendly version of the title — "My First
  Post" → `my-first-post`, giving `/blog/my-first-post`. It
  auto-generates from the title but you can edit it. Once a post
  is published, changing its slug changes its public URL, so the
  editor warns before that.

## What you provide

Nothing new account-wise — you set up Clerk and the database
already. You'll provide real post content when you test (even a
short real draft is better than lorem ipsum, since you'll
actually publish it later). The earlier seed draft can be your
test subject.

## Steps

### Step 1 — The admin dashboard shell

> Read `context/feature-specs.md` §12 and `context/api-routes.md`.
> Build a simple admin layout for the `/admin` area (distinct
> from the public site — it can reuse the theme but doesn't need
> the marketing header/footer). It should confirm I'm the signed-
> in admin and provide basic navigation (Posts, sign out). Keep
> it clean and on-brand with Espresso & Teal. This sits behind
> the Phase 9 auth gate. PowerShell-native; show me first.

### Step 2 — The post list (`/admin/posts`)

> Build the post list at `/admin/posts` per §12.2: a list/table
> of all posts (DRAFT and PUBLISHED) showing title, status badge,
> last updated, and actions (Edit, Publish/Unpublish, Delete).
> Read posts via the `getAllPostsForAdmin` helper from
> `lib/db.ts`. Add a "New post" button. Include a designed empty
> state for when there are no posts. Delete asks for
> confirmation. PowerShell-native.

**Check:** sign in, go to `/admin/posts`. You should see your
seed draft from Phase 8 listed, with a DRAFT badge and the
actions. The "New post" button is present.

### Step 3 — The create/edit form with markdown + live preview

This is the heart of the CMS. It's the biggest single piece —
let Claude Code build it, then test thoroughly.

> Build the create/edit post form (used at `/admin/posts/new` and
> `/admin/posts/[id]`) per §12.3. Fields: title, slug
> (auto-generated from title, editable; warn before changing a
> published post's slug), excerpt, tags, and the markdown body
> editor with **live preview** (split or toggle view) using the
> same rendering and styling the public post page will use, so
> preview matches production. Use react-hook-form + Zod,
> validating on client and server. "Save as draft" and "Publish"
> actions; saving computes reading time from the body. All writes
> go through auth-checked Server Actions or API routes per
> `api-routes.md`, using the `lib/db` helpers. (Leave image
> upload as a placeholder for now — that's Phase 11.)
> PowerShell-native; show me the plan before building.

**Check thoroughly:**
- Click "New post." Type a title — the slug auto-fills.
- Type some markdown in the body (`# A heading`, `**bold**`, a
  list). The **live preview** shows it formatted, matching how
  it'll look published.
- Save as draft. You return to the post list; the new draft
  appears.
- Edit it — your content loads back into the form correctly.
- Both light and dark look right; console is clean.

### Step 4 — Publish / unpublish / delete

> Wire up the publish, unpublish, and delete actions per
> `api-routes.md` (each auth-checked). Publishing sets the post
> to PUBLISHED and stamps `publishedAt` the first time. Unpublish
> returns it to DRAFT. Delete asks for confirmation and removes
> the post. PowerShell-native.

**Check:** publish your test draft → its badge changes to
PUBLISHED. Unpublish → back to DRAFT. Create a throwaway post and
delete it (with the confirmation) to confirm delete works. (The
published post still won't appear on a public blog yet — that's
Phase 12.)

### Step 5 — Security re-check

Quick but important — confirm the dashboard's writes are
protected:

> Confirm that every post create/edit/publish/delete route or
> action checks auth (`requireAdmin`) before any database write,
> and re-validates input server-side with Zod. Show me where the
> auth check happens in each.

And test it yourself: in an incognito window (signed out), try to
visit `/admin/posts/new` — you should be blocked (404/sign-in),
exactly like the Phase 9 break-in test.

## Verify

- `/admin/posts` lists all posts with status and actions.
- You can create a post, write markdown with accurate live
  preview, save as draft, and edit it.
- Publish/unpublish/delete all work (delete confirms first).
- Every write is auth-checked and Zod-validated server-side.
- Signed-out access to admin post routes is blocked (404/sign-in).
- Both modes look right; console clean; `npm run build` passes.

## Common problems and fixes

- **Changes not showing:** hard refresh; restart dev; clear
  `.next` if needed.
- **Live preview doesn't match what you'll see published:** the
  preview must use the *same* markdown renderer/styles as the
  Phase 12 post page. Tell Claude Code to share one rendering
  component between preview and the public post, so they can't
  drift.
- **Save fails silently:** check the browser console and terminal
  for the real error and paste it. Often a Zod validation
  mismatch or a missing field.
- **Slug collisions (two posts, same slug):** the create should
  reject or auto-suffix duplicates — ask Claude Code to handle
  the unique-slug case with a clear message.
- **You can reach an admin write route while signed out:** stop —
  that's a security gap; have the `requireAdmin` check added to
  that route before continuing.

## Commit & wrap-up

> The dashboard works — I can create, edit, draft, publish,
> unpublish, and delete posts, all auth-checked. Confirm
> `npm run build` passes, update `context/progress-tracker.md`,
> commit and push (no secrets staged). PowerShell-native.

You now have a working CMS — the core of what you asked for. Next:
`phase-11-image-uploads.md`, which lets you add cover and inline
images to posts via Cloudinary, so your writing isn't text-only.
