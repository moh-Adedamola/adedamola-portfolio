# Phase 18 — Subdomain DNS (afeez.refacint.com)

## What you're building and why

Your site is live on a `*.vercel.app` URL. This phase gives it its real
address — **afeez.refacint.com** — by pointing that subdomain at your
Vercel project. This is the one phase with an external dependency:
you'll need access to wherever **refacint.com's DNS** is managed (the
same place the agency site's domain is configured).

By the end, typing `afeez.refacint.com` in a browser will load your
portfolio, over HTTPS, with a valid security certificate.

## How to run this phase

Part is in Vercel, part is in your DNS provider's dashboard. Take it
slowly — DNS changes are simple but can take time to take effect, and
you don't want to touch the records that run the main refacint.com site.

## Concepts you need first

- **Domain vs subdomain.** `refacint.com` is the domain (the agency
  site). `afeez.refacint.com` is a *subdomain* of it. Subdomains are
  independent — pointing `afeez` somewhere new does **not** affect the
  main site or `www`.
- **DNS.** The system that maps a human address (afeez.refacint.com) to
  a server. You add a "record" in your DNS provider telling it where the
  subdomain should point.
- **CNAME record.** The specific type of DNS record for a subdomain
  pointing at another hostname. You'll add a CNAME for `afeez` pointing
  to Vercel's hostname.
- **DNS provider.** Wherever refacint.com's DNS lives — could be your
  domain registrar (e.g. Namecheap, GoDaddy), Cloudflare, or your
  hosting panel. It's the same place the agency site's records are.
- **Propagation.** After you add a record, it can take anywhere from a
  few minutes to a couple of hours to take effect worldwide. Normal.
- **SSL/HTTPS.** Vercel automatically issues a security certificate for
  your subdomain once DNS is verified, so the site loads over `https://`
  with the padlock. No action needed beyond the DNS record.

## What you provide

- **Access to refacint.com's DNS settings** (login to the registrar/
  DNS provider).
- A few minutes, and patience for propagation.

## Steps

### Step 1 — Add the domain in Vercel

1. In your Vercel project → **Settings → Domains**.
2. Enter `afeez.refacint.com` and click **Add**.
3. Vercel will show you the **exact DNS record to create** — typically a
   **CNAME** with:
   - **Name/Host:** `afeez`
   - **Value/Target:** something like `cname.vercel-dns.com`
   (Use exactly what Vercel shows you — copy it precisely; it can differ
   slightly.)
4. Leave this Vercel page open; you'll come back to it.

### Step 2 — Add the CNAME in your DNS provider

1. Log in to wherever refacint.com's DNS is managed.
2. Find the DNS records / DNS management section for refacint.com.
3. **Add a new record:**
   - Type: **CNAME**
   - Name/Host: **afeez** (just the subdomain part — the provider knows
     the domain. Some providers want `afeez`, some the full
     `afeez.refacint.com` — follow their convention.)
   - Value/Target/Points to: **the exact value Vercel gave you** (e.g.
     `cname.vercel-dns.com`)
   - TTL: leave default (e.g. Automatic / 3600).
4. **Save.** Do **not** touch the existing records for `@`/root,
   `www`, mail, or anything else — those run the agency site and email.
   You're only adding one new `afeez` record.

### Step 3 — Wait and verify

1. Back on the Vercel Domains page, Vercel will check for the record. It
   may say "Invalid Configuration" at first — that's just propagation;
   wait.
2. Within minutes to a couple of hours, Vercel detects the CNAME, marks
   the domain **Valid**, and automatically issues the SSL certificate.
3. Once it shows valid, visit **https://afeez.refacint.com** — your site
   should load over HTTPS with a padlock.

### Step 4 — Update the live URL settings

Now that the real URL works:

1. Confirm `NEXT_PUBLIC_SITE_URL` in Vercel is
   `https://afeez.refacint.com` (set in Phase 17). If not, update it and
   redeploy.
2. In the **Clerk** dashboard, add `https://afeez.refacint.com` to the
   allowed origins/redirect URLs (so login works on the real domain, not
   just the vercel.app one).
3. Re-test on the real URL: homepage, blog, `/admin` login, contact
   form.

## Verify

- `https://afeez.refacint.com` loads your site over HTTPS (valid
  certificate, padlock).
- The main refacint.com site and www still work (you didn't disturb
  them).
- Login, blog, and contact form work on the real subdomain.
- `NEXT_PUBLIC_SITE_URL` is the real URL; Clerk allows the real domain.

## Common problems and fixes

- **Vercel stuck on "Invalid Configuration":** propagation isn't done,
  or the CNAME value/name is slightly off. Double-check the record
  matches exactly what Vercel showed. Wait longer (up to a couple of
  hours).
- **The subdomain doesn't resolve at all:** confirm the CNAME was saved
  under refacint.com's DNS and the host is `afeez` (not
  `afeez.refacint.com.refacint.com` — some providers append the domain
  automatically; if so, just use `afeez`).
- **HTTPS warning / no certificate:** Vercel issues it automatically
  once DNS is valid — give it time after the domain shows valid.
- **Login broken on the real URL:** add the subdomain to Clerk's allowed
  origins (Step 4.2).
- **Worried about the main site:** you only added one new `afeez` record
  and changed nothing else, so refacint.com and www are unaffected.
  Confirm by visiting them.

## Commit & wrap-up

No code change needed (unless you updated `NEXT_PUBLIC_SITE_URL`, which
is a Vercel setting). 

> Update `context/progress-tracker.md` to note afeez.refacint.com is
> live over HTTPS.

Your portfolio now lives at its real address. Next:
`phase-19-search-and-crosslinks.md`, where you make it discoverable in
search and connect it with the agency site.
