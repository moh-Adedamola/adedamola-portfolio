import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { site } from "@/data/site";

// ─── About copy ───────────────────────────────────────────────────────────────
// All text below is first-person founder voice. Replace each TODO(content)
// block with real copy. Rules from brand-context.md:
//   • First person ("I build…"), specific, no hype
//   • No invented facts — if unsure, leave TODO(content)
//   • Plain language, short sentences, vary rhythm
//   • Mention Lagos + global reach, the automation/AI focus,
//     and the real delivery track record (named clients are fine)
// ─────────────────────────────────────────────────────────────────────────────

// TODO(content): punchy section heading — a phrase that captures who you are,
// not just "About me". Example shape: "Builder. Founder. Automation nerd." —
// but write it in your own words.
const HEADING = "A bit about me";

const PARAGRAPHS: string[] = [
  "I'm a software engineer. I studied computer science, then went back to learn software engineering properly, because knowing how something works and being able to build it well are two different skills.",
  "These days I run Refacint Technologies, a small studio where I build apps, AI assistants and automation for businesses. I plan before I build: the use cases, the diagrams, how it should behave when someone uses it in a way nobody expected. The work I'm proudest of is a school exam system that runs offline, because you can't count on the internet to hold.",
]

// ─────────────────────────────────────────────────────────────────────────────

export function About() {
  const isTodo = (s: string) => s.startsWith("TODO");

  return (
    <section id="about" className="ground-stone bg-background section-y">
      <div className="shell"><div className="mx-auto max-w-3xl">

        <SectionHeading
          eyebrow="About"
          title={HEADING}
          headingSize="xl"
        />

        <RevealGroup className="mt-10 space-y-5">
          {PARAGRAPHS.map((p, i) =>
            isTodo(p) ? (
              <RevealItem
                as="p"
                key={i}
                className="rounded-lg border border-dashed border-border px-4 py-3 font-mono text-sm italic text-muted-foreground/50"
              >
                {p}
              </RevealItem>
            ) : (
              <RevealItem as="p" key={i} className="text-body text-muted-foreground">
                {p}
              </RevealItem>
            )
          )}
        </RevealGroup>

        {/* Required cross-link to the agency */}
        <p className="mt-10 text-sm text-muted-foreground">
          My agency:{" "}
          <a
            href={site.agencyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary"
          >
            Refacint Technologies
          </a>, custom systems and AI for businesses that want to move faster.
        </p>

        <Reveal className="mt-12">
          <Image
            src="/images/founder-about.webp"
            alt="Mohammed Adegbite working"
            width={966}
            height={742}
            priority
            className="rounded-xl object-cover"
          />
        </Reveal>

      </div></div>
    </section>
  );
}
