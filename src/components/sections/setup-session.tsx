import { Check } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL =
  "https://wa.me/2349031204293?text=" +
  encodeURIComponent("Hi Moh, I'd like to book an AI Setup Session.");

const INCLUDES = [
  "A 90-minute call, screen shared",
  "Your AI tools set up properly",
  "Prompts built around the work you actually do",
];

// Featured offer: one ink panel on a stone section, so it reads as a
// standalone offer next to the ink Services block (homepage) and the ink
// page header (/services).
export function SetupSession() {
  return (
    <section id="setup-session" className="ground-stone bg-background section-y">
      <div className="shell">
        <RevealGroup className="ground-ink grid gap-10 rounded-xl border border-border bg-background p-6 text-foreground shadow-card sm:p-10 md:grid-cols-[1.2fr_1fr] md:gap-16 md:p-14">

          {/* Pitch */}
          <div>
            <RevealItem as="p" className="eyebrow font-medium text-eyebrow">
              AI Setup Session
            </RevealItem>
            <RevealItem as="h2" className="font-display text-h2 text-foreground">
              You&apos;re probably using AI like Google.
            </RevealItem>
            <RevealItem as="p" className="mt-6 max-w-xl text-body text-muted-foreground">
              Give me 90 minutes on a call and I&apos;ll set it up so it actually works for your business. You leave with tools you&apos;ll use every day, not a list of tips.
            </RevealItem>
          </div>

          {/* What you get + CTA */}
          <RevealItem className="flex flex-col justify-end gap-8 border-t border-border pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-12">
            <ul className="space-y-4">
              {INCLUDES.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-foreground">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-primary/60 text-primary" aria-hidden="true">
                    <Check className="size-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="space-y-4">
              <Button asChild size="lg" className="group w-full whitespace-normal sm:w-auto">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  Book a session on WhatsApp
                  <span className="transition-transform duration-200 ease-standard group-hover:translate-x-0.5" aria-hidden="true">→</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Button>
              <p className="text-sm text-muted-foreground">
                For business owners who&apos;ve tried ChatGPT and didn&apos;t get much out of it.
              </p>
            </div>
          </RevealItem>

        </RevealGroup>
      </div>
    </section>
  );
}
