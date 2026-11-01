"use client";

import { useTransition, useRef, useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Copy, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { CONTACT_TITLE, CONTACT_INTRO } from "@/components/contact-copy";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { sendContactEmail } from "@/app/actions/contact";
import { site } from "@/data/site";

const valueLinkClass =
  "block break-words rounded-sm text-body text-foreground underline-offset-4 outline-none transition-colors hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** Homepage closing band (ink): headline + two CTAs. The full details and
 *  form live on /contact. */
export function ContactBand() {
  return (
    <section id="contact" className="ground-ink bg-background text-foreground section-y">
      <RevealGroup className="shell">
        <RevealItem as="p" className="eyebrow font-medium text-eyebrow">
          Contact
        </RevealItem>
        <RevealItem as="h2" className="font-display text-display text-foreground">
          {CONTACT_TITLE}
        </RevealItem>
        <RevealItem as="p" className="mt-8 max-w-2xl text-body text-muted-foreground">
          {CONTACT_INTRO}
        </RevealItem>
        <RevealItem className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild size="lg" className="group">
            <a href={`mailto:${site.email}`}>
              Say hello
              <span className="transition-transform duration-200 ease-standard group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </a>
          </Button>
          <Link
            href="/contact"
            className="group inline-flex h-10 items-center gap-2 rounded-md border border-foreground/30 px-6 text-sm font-medium text-foreground outline-none transition-colors duration-200 ease-standard hover:border-foreground/60 hover:bg-foreground/[0.06] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Get in touch
            <span className="transition-transform duration-200 ease-standard group-hover:translate-x-0.5" aria-hidden="true">→</span>
          </Link>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}

/** /contact body (stone): email / WhatsApp / location columns + the form. */
export function ContactDetails() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await sendContactEmail(data);
      if (result.success) {
        setSuccess(true);
        formRef.current?.reset();
      } else {
        setError(result.error ?? "Something went wrong. Please try again.");
      }
    });
  }

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }

  const channels = [
    {
      label: "Email",
      Icon:  Mail,
      value: (
        <a href={`mailto:${site.email}`} className={valueLinkClass}>
          {site.email}
        </a>
      ),
      sub: (
        <button
          type="button"
          onClick={handleCopyEmail}
          className="inline-flex items-center gap-1.5 rounded-sm text-sm text-muted-foreground underline-offset-4 outline-none transition-colors hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
          {copied ? "Copied" : "Copy email"}
          <span className="sr-only" aria-live="polite">
            {copied ? "Email address copied to clipboard" : ""}
          </span>
        </button>
      ),
    },
    {
      label: "WhatsApp",
      Icon:  FaWhatsapp,
      value: (
        <a
          href="https://wa.me/2349031204293"
          target="_blank"
          rel="noopener noreferrer"
          className={valueLinkClass}
        >
          +234 903 120 4293
        </a>
      ),
      sub: <p className="text-sm text-muted-foreground">Fastest way to reach me</p>,
    },
    {
      label: "Location",
      Icon:  MapPin,
      value: <p className="text-body text-foreground">Lagos, Nigeria</p>,
      sub:   <p className="text-sm text-muted-foreground">Working with clients remotely</p>,
    },
  ];

  return (
    <section id="contact-details" className="ground-stone bg-background section-y">
      <div className="shell">

        {/* Channels */}
        <RevealGroup className="grid border-y border-border md:grid-cols-3">
          {channels.map(({ label, Icon, value, sub }, i) => (
            <RevealItem
              key={label}
              className={cn(
                "flex gap-4 py-6 md:py-8",
                i > 0 && "border-t border-border md:border-t-0 md:border-l md:pl-8",
                i < channels.length - 1 && "md:pr-8",
              )}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-foreground/25 text-foreground" aria-hidden="true">
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 space-y-1">
                <p className="text-label font-medium uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
                {value}
                {sub}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Form */}
        <div className="mt-16 max-w-2xl md:mt-20">

          <Reveal>
            {success ? (
              <div className="rounded-xl border border-border bg-muted/40 px-6 py-10 text-center space-y-2">
                <p className="font-display text-h4 text-foreground">
                  Message sent.
                </p>
                <p className="text-sm text-muted-foreground">
                  Thanks for reaching out. I&apos;ll reply soon.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-2 text-xs underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
              >
                {/* Honeypot — off-screen, not display:none, so bots fill it but real users never see it */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    top: "-9999px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input
                    id="contact-name"
                    name="name"
                    placeholder="Your name"
                    required
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell me about your project…"
                    required
                    disabled={isPending}
                    className="min-h-[140px] resize-none"
                  />
                </div>

                {error && (
                  <p role="alert" className="text-sm text-destructive">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full sm:w-auto"
                >
                  {isPending ? "Sending…" : "Send message"}
                </Button>
              </form>
            )}
          </Reveal>

        </div>
      </div>
    </section>
  );
}
