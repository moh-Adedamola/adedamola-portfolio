# Environment Variables

Catalog of every environment variable used by the portfolio.
Add new variables here before adding them to code.

## Convention

- Public (browser-readable) vars are prefixed `NEXT_PUBLIC_`.
- All other vars are server-only and never appear in
  client-bundled code.
- Local development uses `.env.local` (never committed).
- Production secrets live in Vercel project settings.

This site has a small set of integrations: a Postgres database
(Neon) and Clerk auth for the blog/admin CMS, Cloudinary for
image uploads, Resend for the contact form, GA4 for analytics,
and site config.

## Required Variables

### Database (Neon Postgres)

| Variable        | Example                                            | Where to get it                          |
| --------------- | -------------------------------------------------- | ---------------------------------------- |
| `DATABASE_URL`  | `postgresql://user:pass@host/db?sslmode=require`   | Neon dashboard → pooled connection. Runtime queries. |
| `DIRECT_URL`    | `postgresql://user:pass@host/db?sslmode=require`   | Neon dashboard → direct (non-pooled). Used by Prisma migrate. |

### Auth (Clerk — single admin)

| Variable                              | Example       | Where to get it                          |
| ------------------------------------- | ------------- | ---------------------------------------- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`   | `pk_test_...` | Clerk dashboard → API Keys.              |
| `CLERK_SECRET_KEY`                    | `sk_test_...` | Clerk dashboard → API Keys.              |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL`       | `/admin/sign-in` | Constant.                             |
| `ADMIN_EMAIL_ALLOWLIST`               | `you@email.com` | The single admin email allowed into the dashboard. Server-only. |

Use Clerk **test** keys in development, **production** keys
before launch. There is no public sign-up; only the allowlisted
email can access `/admin`.

### Image Storage (Cloudinary)

| Variable                              | Example         | Where to get it                          |
| ------------------------------------- | --------------- | ---------------------------------------- |
| `CLOUDINARY_CLOUD_NAME`               | `afeez`         | Cloudinary dashboard → Product Environment. |
| `CLOUDINARY_API_KEY`                  | `123456789...`  | Cloudinary dashboard → Account Details.  |
| `CLOUDINARY_API_SECRET`               | `Ab1Cd2...`     | Cloudinary dashboard → Account Details. Server-only. |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`   | `afeez`         | Same cloud name, for building image URLs client-side. |

Uploads use a server-signed signature; the secret never reaches
the browser.

### Analytics

| Variable             | Example         | Where to get it                                |
| -------------------- | --------------- | ---------------------------------------------- |
| `NEXT_PUBLIC_GA_ID`  | `G-XXXXXXXXXX`  | Google Analytics 4 → Admin → Data Streams. Use a stream/property distinct from the agency site. |

If unset, the analytics script is not loaded (fine for local
dev).

### Contact Form (Resend)

| Variable          | Example                                   | Where to get it                          |
| ----------------- | ----------------------------------------- | ---------------------------------------- |
| `RESEND_API_KEY`  | `re_...`                                  | Resend dashboard → API Keys. Server-only. |
| `CONTACT_TO`      | `hello@refacint.com`                      | Destination for contact submissions.     |
| `CONTACT_FROM`    | `Afeez Portfolio <hello@refacint.com>`    | Must be a verified Resend domain.        |

If `RESEND_API_KEY` is unset, the contact form degrades to a
mailto link rather than failing.

### App Configuration

| Variable                 | Example                          | Where to get it                       |
| ------------------------ | -------------------------------- | ------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`   | `https://afeez.refacint.com`     | Production subdomain URL.             |
| `NEXT_PUBLIC_SITE_NAME`  | `Afeez — Refacint`               | Used in metadata/UI.                  |

## Template `.env.example`

```env
# Database (Neon)
DATABASE_URL=
DIRECT_URL=

# Auth (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/admin/sign-in
ADMIN_EMAIL_ALLOWLIST=

# Image storage (Cloudinary)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

# Analytics
NEXT_PUBLIC_GA_ID=

# Contact form (Resend)
RESEND_API_KEY=
CONTACT_TO=hello@refacint.com
CONTACT_FROM=Afeez Portfolio <hello@refacint.com>

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Afeez — Refacint
```

## Validation

A single Zod schema at `src/lib/env.ts` validates environment
variables. Public and server vars are validated separately so
client code never imports server secrets. Missing or malformed
required vars should surface clearly rather than failing
silently at runtime.

```ts
// src/lib/env.ts pattern
import { z } from "zod";

const serverEnv = z.object({
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url(),
  CLERK_SECRET_KEY: z.string().startsWith("sk_"),
  ADMIN_EMAIL_ALLOWLIST: z.string().email(),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  RESEND_API_KEY: z.string().startsWith("re_").optional(),
  CONTACT_TO: z.string().email().default("hello@refacint.com"),
  CONTACT_FROM: z.string().min(1).optional(),
});

const publicEnv = z.object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().startsWith("pk_"),
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_SITE_NAME: z.string().min(1),
});

export const env = serverEnv.parse(process.env);
export const publicEnvVars = publicEnv.parse({
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
});
```

## Notes on Each Service

### Neon (Postgres)

- Use the **pooled** URL for `DATABASE_URL` (runtime) and the
  **direct/unpooled** URL for `DIRECT_URL` (Prisma migrate).
- Free tier is plenty for a blog. Branch databases can be used
  for previews.

### Clerk (Auth)

- Single admin only — do **not** enable public sign-up.
- Add your admin email to `ADMIN_EMAIL_ALLOWLIST`; the app
  rejects anyone else even with a valid Clerk session.
- Test keys in dev, production keys before launch.

### Cloudinary (Images)

- Free tier is sufficient to start.
- Uploads are **server-signed**: the dashboard requests a
  signature from `/api/admin/uploads/sign`, then the browser
  uploads directly to Cloudinary. The API secret stays
  server-only.
- Cloudinary URLs work directly with `next/image`.

### Google Analytics 4

- Create a separate property or data stream for
  afeez.refacint.com so its traffic is not mixed with the
  agency site.
- Load via `next/script` with `afterInteractive`, guarded on
  `NEXT_PUBLIC_GA_ID` being present.

### Resend

- Verify the sending domain (refacint.com) in Resend before
  using a `@refacint.com` from-address in production.
- For local dev, `onboarding@resend.dev` works as a from
  address.
- The API key is server-only — used exclusively inside the
  contact Server Action.

### Vercel

- Set production env vars in the Vercel project settings for
  this project (separate from the agency project).
- Map the project to the `afeez.refacint.com` subdomain.
