# Phase 1 — Repo & Scaffold

## What you're building and why

In this phase you create the actual project: an empty but
working Next.js website running on your computer, connected to
your GitHub repo, with your context files inside it. "Scaffold"
just means generating the standard starting skeleton of a
Next.js app — the folders and config files every Next.js
project begins with.

At the end you'll be able to open a browser, see a (default,
unstyled) page running locally, and you'll have saved that
starting point to GitHub. Everything after this builds on top
of it.

## Concepts you need first

- **Next.js:** the framework your site is built with. It's
  React (a popular tool for building interfaces) plus a system
  for pages, routing, and rendering on the server. You don't
  need to know React deeply — Claude Code writes it — but it
  helps to know that's what's underneath.
- **App Router:** the modern way Next.js organizes pages, using
  a `src/app/` folder. Our context files assume it.
- **TypeScript:** JavaScript with type-checking that catches
  mistakes before they reach the browser. Files end in `.ts` or
  `.tsx`. Our project uses it throughout.
- **Tailwind v4:** the styling system. Instead of writing
  separate CSS files, you apply small utility classes directly
  in the markup (like `text-lg` or `bg-background`). Version 4
  is configured inside one CSS file rather than a JavaScript
  config — a detail that matters later.
- **`npm run dev`:** the command that starts a local
  development server so you can preview the site on your own
  computer at an address like `http://localhost:3000`.
- **`npm run build`:** the command that compiles the site the
  way it will run in production. If this passes with no errors,
  the site is healthy. We treat a clean build as a required
  checkpoint after every phase.
- **Commit and push:** "commit" saves a checkpoint in Git on
  your computer; "push" uploads those checkpoints to GitHub.

## What you provide

- The **GitHub repo URL** from Phase 0.
- Your **context files** (and reference screenshots), ready to
  copy into the project.

## Steps

### Step 1 — Open the project folder in your terminal

Open your terminal and move into the folder you made in Phase
0. "cd" means "change directory":

```bash
cd ~/Projects/afeez-portfolio
```

Adjust the path to wherever you put it. If the folder already
contains your `context/` folder, that's fine.

### Step 2 — Open Claude Code here

Start Claude Code inside this folder so it has the right
working directory:

```bash
claude
```

Everything from here, you do by giving Claude Code instructions
and reviewing what it proposes. The commands shown in this guide
are what Claude Code will run for you — you generally won't type
them yourself, but seeing them helps you understand what's
happening and lets you sanity-check before approving.

### Step 3 — Tell Claude Code to scaffold the project

Paste this prompt into Claude Code (adjust nothing except where
noted):

> I'm starting a new project: a personal founder portfolio that
> will live at afeez.refacint.com. The full spec is in the
> `context/` folder — please read `context/README.md`,
> `context/ai-workflow-rules.md`, `context/architecture.md`,
> and `context/progress-tracker.md` first so you understand the
> stack and how I want to work.
>
> For this first step only: scaffold a new Next.js 15 project
> in the current folder using the App Router, TypeScript,
> ESLint, Tailwind CSS v4, and the `src/` directory, with npm
> as the package manager. Keep my existing `context/` folder
> intact. Add a sensible `.gitignore`. Deliver everything as a
> single executable bash script I run from the project root,
> and explain what the script does before I run it. Stop after
> the scaffold — don't build any pages or theme yet.

**What to expect:** Claude Code will explain its plan and give
you a bash script. It will likely use Next.js's official
scaffolding tool under the hood (similar to
`npx create-next-app@latest`). Read the explanation, then
approve and run it.

**Why a script you run yourself:** it keeps you in control. You
see exactly what will happen before it happens, and if anything
looks off, you can ask Claude Code to adjust before running.

### Step 4 — Let it install dependencies

The scaffold step installs the project's libraries (this is
`npm install` running, which creates a `node_modules/` folder —
that folder is large and is intentionally never saved to Git).
This can take a minute or two. Let it finish.

### Step 5 — Confirm the context files are in place

Ask Claude Code:

> Confirm my `context/` folder and its files are still present
> and untouched, and show me the project's folder structure.

You should see your 13 context files and a standard Next.js
structure with a `src/app/` folder.

### Step 6 — Start the local preview

Ask Claude Code to start the dev server, or run it yourself:

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser. You should
see the default Next.js starter page. It will look generic and
unstyled — that's correct. We're only confirming the engine
runs. Press `Ctrl + C` in the terminal to stop the server when
you're done looking.

### Step 7 — Confirm a clean production build

This is the health check we'll repeat after every phase. Run:

```bash
npm run build
```

It should finish with no red error text. If it does, the
foundation is solid.

### Step 8 — Connect the project to your GitHub repo

Now save this starting point to GitHub. Ask Claude Code:

> Initialize git if it isn't already, connect this project to
> my GitHub repo at <PASTE YOUR REPO URL>, make an initial
> commit, and push it. Deliver it as one bash script and tell
> me what each command does.

Replace `<PASTE YOUR REPO URL>` with the URL from Phase 0.

**What this does, in plain terms:**
- `git init` — start tracking this folder with Git (if not
  already).
- `git add .` — stage all current files to be saved.
- `git commit -m "..."` — save the checkpoint with a message.
- `git remote add origin <url>` — point your local repo at the
  GitHub repo.
- `git push -u origin main` — upload it to GitHub.

If GitHub asks you to authenticate, follow its prompt (it may
open a browser window or ask for a token).

### Step 9 — Confirm it pushed

Refresh your GitHub repo page in the browser. You should now see
all the project files there, including your `context/` folder.

## Verify

- `http://localhost:3000` showed the default Next.js page.
- `npm run build` completed with no errors.
- Your `context/` folder and its files are present in the
  project.
- Your GitHub repo now shows the project files (it's no longer
  empty).

## Common problems and fixes

- **"The folder is not empty" error during scaffold:** if the
  scaffolding tool refuses because your `context/` folder is
  there, ask Claude Code to scaffold into the current directory
  anyway (its tooling can handle a non-empty folder) or to
  temporarily move `context/` aside and restore it after. Don't
  delete your context files.
- **`npm run build` fails right after scaffolding:** copy the
  exact error text to Claude Code and ask it to fix it before
  you continue. A fresh scaffold should build cleanly, so this
  usually means a version mismatch it can resolve.
- **`git push` is rejected:** the most common cause is the
  GitHub repo wasn't empty (it had a README). Ask Claude Code
  to reconcile, or recreate the GitHub repo empty and push
  again.
- **Authentication fails on push:** GitHub now uses tokens
  rather than passwords for command-line access. If prompted,
  follow GitHub's instructions to create a personal access
  token, or use the GitHub CLI. Claude Code can walk you
  through it if you paste the error.

## Commit & wrap-up

You've already committed and pushed in this phase (Step 8). To
keep the record clean, the commit message can be something like
`chore: scaffold next.js app with context files`.

Before moving on, make sure: the site runs locally, the build
is clean, and everything is on GitHub. Also ask Claude Code to
update `context/progress-tracker.md` to note that Phase 1 is
complete — keeping that file current is part of the workflow.

Next: `phase-02-theme.md`, where you'll bring in the navy/blue
brand colors and dark mode so the site starts to look like
yours.
