# Phase 0 — Accounts & Prerequisites

## What you're building and why

You're not writing any code in this phase. You're setting up
the accounts, tools, and raw materials the rest of the build
needs. Doing this first means you never have to stop mid-build
to go create an account or hunt for a photo. Think of it as
laying out all your ingredients before you start cooking.

By the end of this phase you'll have: the right software
installed on your computer, an empty code repository on
GitHub, and accounts ready at Vercel (hosting), Resend (email),
and Google Analytics (traffic stats) — plus your real content
gathered or clearly marked as "still to come".

## Concepts you need first

A few terms you'll see throughout the guide:

- **Terminal (or command line):** a text window where you type
  commands instead of clicking buttons. **On Windows this guide
  uses PowerShell** (the default terminal in VS Code and
  Windows). You'll paste commands here. (Avoid WSL/Git Bash for
  this project — stay on PowerShell so everything is consistent.)
- **Node.js and npm:** Node.js lets your computer run
  JavaScript outside a browser, which is what a Next.js site
  needs to build. `npm` ("node package manager") comes with
  Node and installs the code libraries your project depends on.
- **Git:** software that tracks changes to your code over time,
  so you can save checkpoints ("commits") and undo mistakes.
- **GitHub:** a website that stores your Git repository online,
  so Vercel can read it and deploy your site automatically.
- **Repository (repo):** the folder that holds your whole
  project, tracked by Git.
- **Vercel:** the company that will host your live site. It
  reads your code from GitHub and publishes it to the web.
- **Resend:** a service that sends emails from your contact
  form to your inbox.
- **GA4 (Google Analytics 4):** Google's free tool for seeing
  how many people visit your site and what they do.
- **Claude Code:** the AI coding tool you'll use to actually
  write the site, by giving it instructions in plain English.

## What you provide

Gather what you can now. Anything not ready is fine — you'll
mark it `TODO(content)` later and fill it in. Nothing here gets
invented.

- **A founder photo** — a high-quality photo of you for the
  hero/About sections. Ideally a few options.
- **Client logos** — image files for MOLEK Schools, Klassrun
  Technologies, and Tenderville School, *only if you have the
  right to display them*. If unsure, skip for now.
- **Your real project stories** — for each of the four projects
  (MOLEK, Klassrun, Tenderville, Refacint): what the real
  problem was, what you actually built, and the real outcome.
  Rough notes are fine; you'll refine the wording later.
- **Your positioning one-liner** — one honest sentence that
  says who you are and what you do. You'll draft this during
  the Hero phase; just start thinking about it now.
- **Social profile URLs** — your LinkedIn, X/Twitter, GitHub,
  etc.
- **Latest blog posts** — the titles and URLs of the 3–4 most
  recent Refacint blog posts you want to feature.

## Steps

### Step 1 — Install Node.js

1. Go to the Node.js website and download the **LTS** version
   (LTS means "long-term support" — the stable one).
2. Run the installer and accept the defaults.
3. Open your terminal and confirm it worked by running these
   two commands (type each, press Enter):

```bash
node -v
npm -v
```

Each should print a version number (for example `v20.11.1` and
`10.2.4`). If you see "command not found", the install didn't
finish — restart your terminal, and if it still fails, reinstall
Node.

### Step 2 — Install Git

1. Check whether you already have it:

```bash
git --version
```

If that prints a version, you're done — skip to Step 3.

2. If not, download Git from its official site and install with
   defaults, then re-run `git --version` to confirm.

### Step 3 — Confirm Claude Code is installed

You mentioned you're building with Claude Code, so this is
likely done. To confirm, run:

```bash
claude --version
```

If it prints a version, you're set. If not, install Claude Code
per Anthropic's instructions, then re-check. (Claude Code needs
Node.js, which is why we installed that first.)

### Step 4 — Create an empty GitHub repository

1. Sign in to GitHub (create a free account if you don't have
   one).
2. Click **New repository**.
3. Name it something like `afeez-portfolio`.
4. Set it to **Private** (you can make it public later).
5. **Important:** do **not** check "Add a README",
   ".gitignore", or a license. You want it completely empty, so
   it doesn't conflict with the project Claude Code will create.
6. Click **Create repository**. Leave the page open — GitHub
   shows you the repo's URL (something like
   `https://github.com/yourname/afeez-portfolio.git`). You'll
   need it in Phase 1.

### Step 5 — Create a Vercel account

1. Go to Vercel and sign up.
2. Choose **"Continue with GitHub"** so the two are linked.
   This lets Vercel deploy your repo automatically later.
3. That's all for now. You'll import the project in Phase 12.

### Step 6 — Create a Resend account

1. Go to Resend and sign up (free tier is fine to start).
2. You don't need to configure anything yet. In Phase 8 you'll
   verify your `refacint.com` domain and create an API key.
   Just having the account ready is enough now.
3. *Optional but helpful:* start the domain verification for
   `refacint.com` now if you can, because DNS changes can take
   a little time to take effect. If you're not sure how, leave
   it — Phase 8 walks through it.

### Step 7 — Create a Google Analytics 4 property

1. Go to Google Analytics and sign in with a Google account.
2. Create a **new property** specifically for this site (don't
   reuse the agency site's property — you want this subdomain's
   traffic measured separately).
3. Name it something like "Afeez Portfolio".
4. Set up a **Web data stream** with the URL
   `https://afeez.refacint.com`.
5. After creating it, you'll see a **Measurement ID** that
   looks like `G-XXXXXXXXXX`. Copy it and save it somewhere
   safe — you'll paste it in Phase 15.

### Step 7.1 — Create a Neon database (for the blog)

Your blog posts need somewhere to live. Neon is a hosted
Postgres database with a free tier.

1. Go to Neon and sign up (you can use your GitHub account).
2. Create a new **project** — name it something like
   "afeez-portfolio". Pick the region closest to your audience.
3. After it's created, open the project's **Connection Details**.
   You'll see connection strings. You need two of them:
   - the **pooled** connection string (this becomes
     `DATABASE_URL`),
   - the **direct / unpooled** connection string (this becomes
     `DIRECT_URL`).
4. Copy both and save them somewhere safe for now. You'll use
   them in Phase 8. Treat them like passwords — they grant
   access to your database.

### Step 7.2 — Create a Clerk application (for the admin login)

Clerk handles the secure login for your admin dashboard, so you
never build password handling yourself.

1. Go to Clerk and sign up.
2. Create a new **application** — name it "Afeez Portfolio".
3. For sign-in options, email is enough (you're the only user).
   You do **not** need social logins unless you want them.
4. Clerk will show you two **API keys**: a **Publishable key**
   (starts with `pk_`) and a **Secret key** (starts with `sk_`).
   Copy both and save them. These are the **test** keys, which
   is what you want during the build.
5. Note the email address you'll use to log in as admin — this
   becomes your `ADMIN_EMAIL_ALLOWLIST` value later. Only this
   email will be allowed into the dashboard.

### Step 7.3 — Create a Cloudinary account (for blog images)

Cloudinary stores the cover and inline images for your posts.

1. Go to Cloudinary and sign up (free tier is fine).
2. On the dashboard you'll see your **Cloud name**, **API
   Key**, and **API Secret**. Copy all three and save them.
   You'll use them in Phase 11.
3. Nothing else to configure now.

### Step 8 — Make a folder for your context files

On your computer, create the folder where the project will
live, for example a `Projects/afeez-portfolio` folder. Inside
it, create a `context/` folder and put the 13 context files
there. Also create a `context/refs/` folder and drop in your
screenshots of the two reference sites (Vysta and Stanlee).

You don't have to do this perfectly now — Phase 1 will confirm
the structure — but having the context files ready on disk
makes the next phase smooth.

## Verify

Before moving on, confirm all of these are true:

- `node -v`, `npm -v`, `git --version`, and `claude --version`
  all print version numbers.
- You have an **empty** GitHub repo and its URL.
- You can log in to Vercel, and it's connected to GitHub.
- You have a Resend account.
- You have a GA4 Measurement ID saved (`G-XXXXXXXXXX`).
- You have a **Neon** database with its pooled and direct
  connection strings saved.
- You have a **Clerk** application with its publishable and
  secret keys saved, and you know your admin email.
- You have a **Cloudinary** account with its cloud name, API
  key, and API secret saved.
- Your context files (and any reference screenshots) are saved
  in a `context/` folder on your computer.
- You've gathered your real content, or noted what's still
  missing.

A note on all these saved keys: keep them in a private, secure
place (a password manager is ideal). You'll paste them into a
local `.env.local` file during the relevant phases, and into
Vercel's settings at deploy time. They never go into the code
itself or into Git.

## Common problems and fixes

- **`node -v` works but `npm -v` doesn't (or vice versa):**
  reinstall Node from the official installer; don't install
  them separately.
- **GitHub repo isn't empty (it has a README):** delete that
  file later, or just delete the repo and recreate it without
  the starter files. An empty repo avoids a conflict in Phase 1.
- **Not sure if you can use client logos:** when in doubt,
  leave them out for now. The site works fine with text names
  and you can add logos once you've confirmed permission.

## Commit & wrap-up

There's nothing to commit yet — no code exists. You're done
with Phase 0 when the Verify checklist above is all true.

Next: `phase-01-repo-and-scaffold.md`, where you'll create the
actual Next.js project and push it to GitHub.
