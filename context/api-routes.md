# API Routes

Catalogue of the portfolio's server endpoints. The public site
is mostly static; the routes here exist to support the **blog**
and the **admin dashboard**. Consult this before adding a route
to avoid duplication or invented endpoints.

Most of the site needs no API at all (sections render from
typed data). The contact form uses a Server Action. The blog's
write operations and the image upload need real endpoints
because they mutate data and must check auth.

## Conventions

- Routes live under `src/app/api/`.
- Handlers are thin: parse → check auth → validate with Zod →
  call a `lib/db` helper → format response.
- Auth is checked via Clerk's server helpers. Mutating routes
  also confirm the user is the single allowed admin (email
  allowlist) before any write.
- Response shape:
  - Success: `{ data: T }`
  - Error: `{ error: { code: string; message: string } }`
- Drafts are never returned from any public route.

## Public (no auth)

The public blog is best served by **Server Components reading
the database directly** through `lib/db` helpers (not by
calling these as APIs). A read API is only added if something
client-side needs it.

| Method | Path                | Auth   | Purpose                                  |
| ------ | ------------------- | ------ | ---------------------------------------- |
| GET    | `/blog` (page)      | Public | Lists PUBLISHED posts (Server Component). |
| GET    | `/blog/[slug]` (page)| Public| Renders one PUBLISHED post (Server Component). |
| GET    | `/rss.xml`          | Public | RSS feed of PUBLISHED posts.             |

(The page routes are App Router pages, not `api/` handlers;
listed here for completeness.)

## Admin — Post Management (auth required)

All require an authenticated session **and** the single admin
allowlist check. Non-admins get a 404.

| Method | Path                          | Auth  | Purpose                                  |
| ------ | ----------------------------- | ----- | ---------------------------------------- |
| POST   | `/api/admin/posts`            | Admin | Create a new post (starts as DRAFT).     |
| GET    | `/api/admin/posts`            | Admin | List all posts incl. drafts (dashboard). |
| GET    | `/api/admin/posts/[id]`       | Admin | Get one post for editing.                |
| PATCH  | `/api/admin/posts/[id]`       | Admin | Update a post's fields/body.             |
| POST   | `/api/admin/posts/[id]/publish`  | Admin | Set status PUBLISHED, set publishedAt. |
| POST   | `/api/admin/posts/[id]/unpublish`| Admin | Set status DRAFT.                      |
| DELETE | `/api/admin/posts/[id]`       | Admin | Delete a post.                           |

> Server Actions are an acceptable alternative to these route
> handlers for the dashboard's own forms. If Server Actions are
> used, the same rules apply: auth check first, Zod validation,
> then the `lib/db` helper. Pick one approach and stay
> consistent — do not split the same operation across both.

## Admin — Image Upload (auth required)

| Method | Path                       | Auth  | Purpose                                       |
| ------ | -------------------------- | ----- | --------------------------------------------- |
| POST   | `/api/admin/uploads/sign`  | Admin | Return a signed Cloudinary upload signature.  |

The browser uploads the image directly to Cloudinary using the
signature (the image bytes do not pass through our server). The
returned Cloudinary URL is then saved on the post.

## Contact (no auth)

The contact form uses a **Server Action** (preferred) rather
than a route handler. If a handler is needed instead:

| Method | Path            | Auth   | Purpose                          |
| ------ | --------------- | ------ | -------------------------------- |
| POST   | `/api/contact`  | Public | Validate + send via Resend.      |

Includes a honeypot field and Zod validation; never leaks
internal errors.

## Standard Error Codes

| Code               | HTTP | Meaning                              |
| ------------------ | ---- | ------------------------------------ |
| `UNAUTHORIZED`     | 401  | No valid session.                    |
| `NOT_FOUND`        | 404  | Resource missing OR admin route hit by a non-admin (hidden). |
| `VALIDATION_ERROR` | 400  | Input failed Zod validation.         |
| `CONFLICT`         | 409  | e.g. duplicate slug.                 |
| `INTERNAL_ERROR`   | 500  | Unexpected server error.             |

## Auth Pattern

Every admin route/action begins with the same guard, e.g.:

```ts
const user = await requireAdmin(); // throws if no session or not on allowlist
```

`requireAdmin` (in `src/lib/auth.ts`) checks the Clerk session
and that the user's email is in `ADMIN_EMAIL_ALLOWLIST`. On
failure it triggers a 404 response at the boundary so admin
routes stay invisible.

## Rules

- Auth before logic on every mutation. No exceptions.
- Validate every body and param with Zod before writing.
- Public routes/pages filter to `status = PUBLISHED`.
- Slugs are unique; on collision, return `CONFLICT` or
  auto-suffix and tell the user.
- Keep handlers thin; put real logic in `lib/db` helpers.
