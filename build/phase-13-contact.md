# Phase 13 — Contact Form

## What you're building and why

This is the last homepage section: a contact form so visitors can
reach you. When someone fills it in, the message is emailed to
`hello@refacint.com` using Resend (an email-sending service). If
email isn't configured for any reason, the form gracefully falls
back to a plain mailto link so it never just fails silently.

By the end, your homepage is content-complete — every section
exists — and people have a real way to get in touch, which
directly serves the "win clients / get speaking gigs" goals.

## How to run this phase

Have Claude Code read `context/feature-specs.md` (§8 Contact),
`context/code-standards.md` (forms, validation, error handling),
`context/env-variables.md` (Resend variables), and this file.
Standing rules apply, including **never commit secrets**.

## Concepts you need first

- **Server Action.** The form submits to a small server-side
  function (a "Server Action") that validates the input and sends
  the email. The visitor's browser never sees your email
  credentials.
- **Resend.** The service that actually sends the email. You give
  it your API key (a secret) and a verified "from" address, and it
  delivers the message to your inbox.
- **Domain verification.** To send email *from* a `@refacint.com`
  address, Resend needs you to prove you own that domain (by
  adding some DNS records). Until verified, you use a test sender.
- **Validation (Zod) + honeypot.** The form checks the input is
  valid (name, a real-looking email, a message) on both client and
  server. A "honeypot" is a hidden field bots tend to fill but
  humans never see — if it's filled, you silently reject the
  submission as spam.
- **Graceful fallback.** If the email key isn't set, the form
  shows a mailto link (opens the visitor's email app to
  hello@refacint.com) instead of pretending to send and failing.

## What you provide

- A **Resend account** (from Phase 0). Ideally, start **verifying
  the `refacint.com` domain** in Resend now if you haven't — DNS
  verification can take a little time. If it's not verified yet,
  you can build and test with Resend's test sender and switch the
  from-address later.
- Your **Resend API key** once you've created one.

## Steps

### Step 1 — Set up Resend and add the secret

> Add my Resend settings to `.env.local` (gitignored):
> `RESEND_API_KEY`, `CONTACT_TO=hello@refacint.com`, and
> `CONTACT_FROM` (a verified sender; if my domain isn't verified
> yet, use Resend's test sender for now). Update `.env.example`
> with these keys (empty). I'll paste the key. PowerShell-native.

Confirm `.env.local` stays gitignored.

### Step 2 — Build the contact section and form

> Build the Contact section (`#contact`) per `feature-specs.md`
> §8: a short heading, my email (hello@refacint.com), social
> links, and a contact form (name, email, message, plus a hidden
> honeypot field) using react-hook-form + Zod. Submitting calls a
> Server Action that re-validates with Zod server-side and sends
> the message via Resend to hello@refacint.com. On success, show a
> Sonner toast + inline success and reset the form; on error, show
> a user-readable inline error and a mailto fallback. If
> `RESEND_API_KEY` is missing, degrade to a mailto link. Never
> leak internal errors. Add it to the homepage and make the header
> "Contact" anchor and the hero/"Work with me" buttons scroll to
> it. Espresso & Teal, both modes. PowerShell-native; show me
> first.

### Step 3 — Test it end to end

**Check thoroughly:**
- Fill in the form with valid details and submit. You should see
  the success toast/inline confirmation, and an email should
  arrive at hello@refacint.com (check inbox/spam).
- Submit with a bad email or empty message → clear inline
  validation errors, on client and (you can trust) server.
- Confirm the "Work with me" buttons and header "Contact" link
  scroll here.
- Both modes look right; console clean.

### Step 4 — Spam protection check

> Confirm the honeypot field is in place and that a submission
> with the honeypot filled is silently rejected. If we want, we
> can add basic rate limiting later — note it for QA.

## Verify

- `.env.local` has the Resend keys; not committed.
- Submitting a valid message delivers an email to
  hello@refacint.com.
- Invalid input shows clear errors (client + server validated).
- Missing key → graceful mailto fallback (no silent failure).
- Honeypot rejects bot-style submissions.
- Internal errors never shown to the user.
- Both modes correct; console clean; `npm run build` passes.

## Common problems and fixes

- **Email doesn't arrive:** check spam; confirm the API key is
  correct; confirm the `CONTACT_FROM` is a sender Resend allows
  (verified domain or the test sender). Paste any error.
- **"Domain not verified" error:** use Resend's test sender for
  now and finish domain verification before launch; switch
  `CONTACT_FROM` then.
- **Form submits but nothing happens:** check the browser console
  and terminal for the real error (often a Zod mismatch) and paste
  it.
- **Validation passes bad input:** ensure Zod runs on the
  **server** too, not just the client.

## Commit & wrap-up

> Contact form works — delivers email, validates, falls back to
> mailto, rejects spam. Confirm `.env.local` not staged,
> `npm run build` passes, update `context/progress-tracker.md`,
> commit and push. PowerShell-native.

Your homepage is now **content-complete** — every section exists,
and people can reach you. Next: `phase-14-seo.md`, where you make
the site discoverable and shareable (metadata, social preview
image, sitemap, structured data).
