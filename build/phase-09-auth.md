# Phase 9 — Admin Auth (Clerk, Single Admin)

## What you're building and why

Your blog dashboard must be locked so that **only you** can reach
it. This phase adds that lock using Clerk — a service that
handles secure login so you never have to build (or risk getting
wrong) password handling yourself. The result: a dashboard that
is invisible and inaccessible to everyone except your single
admin account.

This is the security-critical phase of the whole build. We do it
*before* building the dashboard itself, so the dashboard is born
protected — there's never a moment where an unprotected admin
page exists. Take it carefully; the verification at the end
(trying to break in) matters.

## How to run this phase

Have Claude Code read `context/architecture.md` (the auth and
access invariants), `context/api-routes.md` (the `requireAdmin`
pattern and the 404-not-403 rule), `context/feature-specs.md`
(§12.1 Access & Security), `context/env-variables.md` (Clerk
keys), and this file. Standing rules: **PowerShell-native, real
values only, never commit secrets.**

## Concepts you need first

- **Authentication ("auth").** Proving who someone is — here, a
  login. Clerk provides the login screens and the secure session
  handling.
- **Single admin, no public sign-up.** A normal app lets anyone
  register. Yours must not — there's exactly one user (you).
  We disable public sign-up entirely and only allow one specific
  email. This makes the site dramatically safer: there's no
  sign-up form to attack.
- **Allowlist.** A list of permitted admin emails — in your case,
  just one. Even if someone somehow had a valid Clerk session,
  if their email isn't on the allowlist, they're rejected.
- **Middleware.** Code that runs *before* a page loads and can
  block access. Clerk's middleware checks every request to an
  admin route and stops anyone not logged in as the admin.
- **404 not 403 (hide, don't announce).** When a non-admin tries
  an admin URL, we return "404 Not Found" rather than "403
  Forbidden." 403 would tell an attacker "this exists but you
  can't have it" — an invitation to keep trying. 404 says
  "there's nothing here," hiding the dashboard's very existence.
  Your `api-routes.md` specifies this deliberately.
- **`requireAdmin` helper.** A small function every admin
  route/action calls first. It checks: is there a valid session,
  and is the user on the allowlist? If not, it stops the request.
  "Auth before logic" — the check happens before anything else.

## What you provide

- **Your Clerk keys** (from Phase 0): the **publishable key**
  (`pk_...`) and the **secret key** (`sk_...`). Use the **test**
  keys for now.
- **Your admin email** — the one email allowed to log in. This
  becomes `ADMIN_EMAIL_ALLOWLIST`.

## Steps

### Step 1 — Add Clerk secrets to `.env.local`

> Add my Clerk keys and admin email to `.env.local` (gitignored):
> `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`,
> `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/admin/sign-in`, and
> `ADMIN_EMAIL_ALLOWLIST` (my single admin email). Update
> `.env.example` with these keys (empty values) per
> `context/env-variables.md`. I'll paste the values.
> PowerShell-native.

Confirm again: `.env.local` is gitignored. Secrets never get
committed.

### Step 2 — Install and wire up Clerk

> Install Clerk for Next.js and wrap the app with its provider in
> the root `layout.tsx`. Configure it for our single-admin setup:
> **no public sign-up**. Set up Clerk's middleware
> (`middleware.ts`). At this step, just get Clerk installed and
> the provider working without breaking the existing site — show
> me the build still passes. PowerShell-native; explain before
> running.

**Check:** the existing homepage still loads and builds. Clerk is
now present but not yet guarding anything — that's the next step.

### Step 3 — The `requireAdmin` helper

> Create `src/lib/auth.ts` with a `requireAdmin` helper as
> described in `context/api-routes.md`: it checks the Clerk
> session and that the user's email is in `ADMIN_EMAIL_ALLOWLIST`.
> On failure it triggers a 404 response (not 403), so admin
> routes stay hidden. PowerShell-native.

### Step 4 — Protect the admin routes with middleware

> Configure the Clerk middleware so that **every** route under
> `/admin` (and any future post-mutating API route under
> `/api/admin`) requires authentication, and non-admins get a
> 404 — hiding their existence — exactly per
> `context/architecture.md` and `api-routes.md`. Public routes
> (homepage, and later /blog) stay open. Show me the middleware
> config before applying.

### Step 5 — A sign-in page and a placeholder admin page

> Create the admin sign-in at `/admin/sign-in` using Clerk's
> hosted sign-in UI (no public sign-up link). Then create a
> minimal placeholder protected page at `/admin` that just says
> "Admin — signed in as <email>" so I can test that login works
> and the protection holds. Style it lightly with our Espresso &
> Teal tokens. Mark `/admin` pages `noindex`. PowerShell-native.

### Step 6 — Create your admin user in Clerk

Since there's no public sign-up, create your single user in the
Clerk dashboard:

1. Go to your Clerk application's dashboard → **Users** → **Create
   user** (or **Add user**).
2. Use the **same email** you put in `ADMIN_EMAIL_ALLOWLIST`. Set
   a strong password.
3. That's your one admin account.

## Verify — including a break-in test

This phase's verification is the most important in the build. Run
`npm run dev`, then:

**1. The lock works (you can get in):**
- Go to `http://localhost:3000/admin`. You should be redirected
  to `/admin/sign-in`. Sign in with your admin email/password.
  You should then reach the placeholder admin page showing your
  email.

**2. The lock holds (others can't):**
- Sign out. In a **private/incognito window**, go directly to
  `http://localhost:3000/admin`. You must **not** see the admin
  page — you should get a 404 or be bounced to sign-in. The admin
  area must be unreachable without logging in.
- Try `http://localhost:3000/admin/anything` — also 404/blocked.

**3. No public sign-up exists:**
- Confirm there's no way to register a new account anywhere on
  the site. The only entry is your one account.

If any of those fail — especially if you can reach `/admin`
without logging in — **stop and tell me immediately.** That's a
security hole and must be fixed before going further. Do not
proceed to the dashboard phase until the break-in test passes.

## Verify (checklist)

- `.env.local` has the Clerk keys + admin email; not committed.
- Signing in with your admin email reaches `/admin`.
- Incognito/non-admin access to `/admin` returns 404 / is
  blocked.
- No public sign-up exists anywhere.
- `/admin` pages are `noindex`.
- Console clean; `npm run build` passes.

## Common problems and fixes

- **You can reach `/admin` without logging in:** the middleware
  isn't matching the admin routes. Stop — tell Claude Code "the
  middleware isn't protecting /admin; non-admins can reach it,
  fix the matcher" and re-test. Don't proceed until fixed.
- **Logged in but rejected:** your signed-in email may not match
  `ADMIN_EMAIL_ALLOWLIST` exactly (check casing/typos), or the
  Clerk user's email differs from the allowlist value.
- **Hydration or provider errors after adding Clerk:** ensure the
  Clerk provider wraps the app correctly in `layout.tsx`; paste
  the error and we'll sort it.
- **Secret committed by accident:** stop, tell me — we remove it
  from history and you rotate the Clerk keys.

## Commit & wrap-up

> Auth works and the break-in test passes — non-admins get a 404,
> only my admin email gets in, no public sign-up. Confirm
> `.env.local` is not staged, commit the auth code (middleware,
> `lib/auth.ts`, sign-in and placeholder admin pages), update
> `context/progress-tracker.md`, and push. PowerShell-native.

Your dashboard's security gate is now in place — and proven. Next:
`phase-10-admin-dashboard.md`, where you build the actual CMS
behind this lock: the post list and the markdown editor with live
preview.
