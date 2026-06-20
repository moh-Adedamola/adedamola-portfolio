# Phase 8 — Database (Prisma + Neon)

## What you're building and why

This is the first of the blog/CMS phases. Your blog posts need
somewhere to live — and unlike your static content (which sits in
typed files), posts get created and edited through a dashboard,
so they need a real **database**. This phase sets up that
database: Postgres hosted on Neon, accessed through Prisma (a
tool that lets your code talk to the database safely and in
plain TypeScript).

By the end, you'll have a `Post` table in a live database, the
connection wired into your app, and small helper functions for
reading and writing posts — all tested. No dashboard or blog
pages yet; those come in the next phases. This phase is the
foundation they stand on.

## How to run this phase

Have Claude Code read `context/database-schema.md` (the exact
`Post` model — this is the authority), `context/architecture.md`
(the storage model and invariants), `context/env-variables.md`
(the database variables), and this file. Standing rules:
**PowerShell-native, real values only, never commit secrets.**
Work step by step, pausing at each check.

## Concepts you need first

- **Database.** A structured store for data that changes over
  time. Your posts (which you'll add, edit, publish) belong here,
  not in code files.
- **Postgres.** The specific type of database you're using — a
  reliable, widely-used one. **Neon** is just a company that
  hosts a Postgres database for you in the cloud (you created the
  account in Phase 0).
- **Prisma.** The bridge between your code and the database.
  Instead of writing raw database commands, you describe your
  data shape in a "schema" file, and Prisma generates type-safe
  functions to read and write it. Much safer and clearer.
- **Schema and migration.** The *schema* (`prisma/schema.prisma`)
  describes your tables in Prisma's language. A *migration* is
  the actual change applied to the real database to match the
  schema. You run a command, Prisma creates a migration, and
  your database gets the `Post` table. Migrations are generated
  files — never hand-edit them (this is in your protected-files
  rules).
- **`.env.local` and secrets.** Your database connection strings
  are secrets — they grant access to your data. They live in a
  local file called `.env.local`, which your `.gitignore`
  already keeps out of GitHub. Never paste them into code or
  commit them.
- **The Prisma client singleton.** A single shared connection to
  the database, created once in `src/lib/db.ts`. The "singleton"
  pattern prevents the dev server from opening too many
  connections as it reloads.

## What you provide

- **Your Neon connection strings** (saved in Phase 0): the
  **pooled** one (becomes `DATABASE_URL`) and the **direct /
  unpooled** one (becomes `DIRECT_URL`). If you don't have them
  handy, get them from your Neon project → Connection Details.

## Steps

### Step 1 — Put the database secrets in `.env.local`

First, create your local environment file with the database
connection strings. Tell Claude Code:

> Create a `.env.local` file in the project root (it's already
> gitignored) and add my Neon connection strings. I'll paste the
> values. Add `DATABASE_URL` (pooled) and `DIRECT_URL` (direct/
> unpooled). Also create or update `.env.example` with these
> keys but **empty values** as a committed template, per
> `context/env-variables.md`. PowerShell-native.

Then paste your two Neon URLs when prompted. Double-check: the
**pooled** URL is `DATABASE_URL`, the **direct** one is
`DIRECT_URL` (Prisma's migrations need the direct one).

**Important:** confirm `.env.local` is NOT tracked by git. Quick
check — ask Claude Code: "confirm `.env.local` is gitignored and
won't be committed." Your secrets must never reach GitHub.

### Step 2 — Install and initialise Prisma

> Install Prisma and initialise it. Set the datasource to
> PostgreSQL using `DATABASE_URL` for the runtime connection and
> `DIRECT_URL` for migrations (Neon's recommended setup). Don't
> define models yet — just the base setup. PowerShell-native;
> show me before running.

This creates a `prisma/` folder with a `schema.prisma` file.

### Step 3 — Add the Post model

> Now add the `Post` model to `prisma/schema.prisma` exactly as
> specified in `context/database-schema.md` — including the
> `PostStatus` enum (DRAFT/PUBLISHED) and all fields (slug,
> title, excerpt, body, coverImageUrl, coverImageAlt, tags,
> status, readingTime, publishedAt, createdAt, updatedAt) and
> the indexes. Then validate the schema with `npx prisma
> validate`. Show me the schema before applying anything.

Give the schema a look against `database-schema.md` — it should
match field-for-field. Approve when it does.

### Step 4 — Run the first migration

> Create and apply the first migration to my Neon database with
> `prisma migrate dev` (name it something like `init_post`). This
> creates the Post table in the real database. Then confirm it
> succeeded. PowerShell-native.

This is the moment the `Post` table actually gets created in your
cloud database. If it succeeds, you'll see a new folder under
`prisma/migrations/` and a success message.

### Step 5 — The Prisma client singleton + helpers

> Create `src/lib/db.ts` with the Prisma client singleton
> pattern (safe for dev hot-reloading). Then add small typed
> helper functions for posts as described in
> `context/database-schema.md` — e.g. `getPublishedPosts`,
> `getPostBySlug`, `getAllPostsForAdmin`, `createPost`,
> `updatePost` — keeping raw Prisma calls inside these helpers,
> not scattered through the app. PowerShell-native.

### Step 6 — Verify the connection with a seed/test

> Create a `prisma/seed.ts` that inserts one sample DRAFT post
> for local testing (clearly fake placeholder content, never
> published). Run it, then open Prisma Studio (`npx prisma
> studio`) so I can see the post in the database.

**Check it:** Prisma Studio opens in your browser (usually
`localhost:5555`) and shows your `Post` table with the one
sample draft. Seeing it there confirms the whole chain works:
schema → migration → database → connection. Close Prisma Studio
(Ctrl + C) when done.

## Verify

- `.env.local` holds `DATABASE_URL` and `DIRECT_URL`, and is
  **not** committed to git.
- `prisma/schema.prisma` has the `Post` model matching
  `database-schema.md`; `npx prisma validate` passes.
- The first migration ran; `prisma/migrations/` has a folder.
- `src/lib/db.ts` exists with the singleton and helper functions.
- Prisma Studio showed the sample draft post.
- `npm run build` passes clean.

## Common problems and fixes

- **Migration fails to connect:** usually the connection strings.
  Confirm `DATABASE_URL` is the **pooled** Neon URL and
  `DIRECT_URL` is the **direct** one, and that they're pasted
  correctly (no missing characters, includes `?sslmode=require`).
- **"Environment variable not found":** the `.env.local` keys
  may be misnamed or the file in the wrong place (must be project
  root). Ask Claude Code to confirm Prisma is reading the right
  env vars.
- **Prisma Studio shows no table:** the migration may not have
  run — re-run `prisma migrate dev` and check for errors.
- **You accidentally committed `.env.local`:** stop and tell me
  immediately — we'll remove it from git history and you should
  rotate (regenerate) the Neon credentials. Prevention: confirm
  it's gitignored in Step 1.

## Commit & wrap-up

Note: only code and the schema/migrations get committed — your
**secrets stay local**.

> Database is set up and verified. Confirm `.env.local` is NOT
> staged, then commit the schema, migration, `lib/db.ts`,
> helpers, and seed (not the secrets). Update
> `context/progress-tracker.md` to mark the database phase done,
> then push. PowerShell-native.

Glance at GitHub after pushing: you should see `prisma/schema.prisma`
and the migration folder, but **not** `.env.local`.

Next: `phase-09-auth.md`, where you add the secure admin login
(Clerk) that protects the dashboard — the security gate for your
whole CMS.
