# Database Schema

This is the source of truth for the portfolio's data model.
The site is mostly static (typed files in `src/data/`), so the
database is small and focused: it stores **blog posts** authored
through the custom admin dashboard. Everything else stays in
typed files.

The stack is Prisma + PostgreSQL (Neon), mirroring the agency
site's conventions.

## Conventions

- Table names: `PascalCase` singular.
- Column names: `camelCase`.
- Primary keys: `id String @id @default(cuid())`.
- Timestamps: `createdAt` and `updatedAt` on every table.
- Slugs are URL-safe, lowercase-kebab, unique.
- Never hand-edit a generated migration. Create a new one.

## Enums

```prisma
enum PostStatus {
  DRAFT       // Visible only in the admin dashboard
  PUBLISHED   // Live on the public blog
}
```

## Models

### Post

A single founder blog post. Created and edited only in the
admin dashboard; read publicly when `status = PUBLISHED`.

```prisma
model Post {
  id            String     @id @default(cuid())
  slug          String     @unique           // URL: /blog/<slug>
  title         String
  excerpt       String                        // Short summary for cards + meta description
  body          String     @db.Text           // Markdown source
  coverImageUrl String?                        // Cloudinary URL
  coverImageAlt String?
  tags          String[]                       // Simple tag list
  status        PostStatus @default(DRAFT)
  readingTime   Int?                           // Minutes, computed on save
  publishedAt   DateTime?                       // Set when first published
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt

  @@index([status, publishedAt])
  @@index([slug])
}
```

Notes:

- `body` holds **markdown** as written in the dashboard editor.
  The public blog renders it to HTML at display time. Storing
  markdown (not pre-rendered HTML) keeps posts editable and
  portable.
- `excerpt` doubles as the meta description and the card
  summary. If empty, derive from the first ~150 chars of the
  body on save — but prefer an authored excerpt.
- `readingTime` is computed from the body word count when the
  post is saved, so the public page does not recompute it.
- `publishedAt` is set the first time a post moves to
  `PUBLISHED` and then left stable (used for ordering and the
  `Article` structured data). `updatedAt` tracks edits.
- `coverImageUrl` references a Cloudinary asset. The image
  bytes are never stored in the database.

## Access Rules

- **Public reads:** the public blog lists and shows only posts
  where `status = PUBLISHED`. Drafts are never exposed on any
  public route, sitemap, or feed.
- **Admin reads/writes:** only the authenticated admin (single
  Clerk user on the allowlist) can list drafts, create, edit,
  publish, unpublish, or delete posts. Every mutation checks
  auth first.
- **Slugs are immutable-ish:** once a post is published, avoid
  changing its slug (it's the public URL). If a slug must
  change, plan a redirect. The editor may warn on slug changes
  to published posts.

## Prisma Client

- A single Prisma client instance lives in `src/lib/db.ts`
  (singleton pattern to avoid exhausting connections in
  development).
- Small read/write helpers (e.g. `getPublishedPosts`,
  `getPostBySlug`, `getAllPostsForAdmin`, `createPost`,
  `updatePost`) wrap Prisma so routes and components do not
  scatter raw queries.

## Migrations

- Local development: `prisma migrate dev` (creates and applies
  migrations, updates the client).
- Production: `prisma migrate deploy` against the Neon
  production database.
- Seed script (`prisma/seed.ts`) may create one or two sample
  DRAFT posts for local testing — never seed published content
  into production.

## Environment

- `DATABASE_URL` — pooled Neon connection (used at runtime).
- `DIRECT_URL` — direct (non-pooled) Neon connection, used by
  Prisma migrate.

See `env-variables.md` for the full list.

## Future (Phase 2, not now)

- A `Tag` model if tags grow beyond a simple string list.
- A `Series` model if posts get grouped into series.
- Resist adding these until real need appears — keep the model
  as small as the blog actually requires.
