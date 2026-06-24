"use client";

import { useTransition, useRef, useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { sendContactEmail } from "@/app/actions/contact";
import { site } from "@/data/site";

export function Contact() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
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

  return (
    <section id="contact" className="bg-section-base section-y">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">

          {/* Left: intro + mailto fallback */}
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Contact"
              title="Let's work together."
              intro="Got a problem worth solving? Tell me what you're dealing with and I'll tell you honestly whether I can help, and how I'd approach it."
              headingSize="xl"
            />
            <p className="text-sm text-muted-foreground">
              Prefer email?{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-foreground underline underline-offset-4 transition-colors hover:text-primary"
              >
                {site.email}
              </a>
            </p>
          </div>

          {/* Right: form */}
          <div>
            {success ? (
              <div className="rounded-lg border border-border bg-muted/40 px-6 py-10 text-center space-y-2">
                <p className="font-display text-lg font-semibold text-foreground">
                  Message sent.
                </p>
                <p className="text-sm text-muted-foreground">
                  Thanks for reaching out — I&apos;ll reply soon.
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
          </div>

        </div>
      </div>
    </section>
  );
}
