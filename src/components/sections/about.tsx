import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
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

const INTRO = "Software that businesses run on, not demos that look good in a pitch.";

const PARAGRAPHS: string[] = [
  "I'm a software engineer. I studied computer science, then went back to learn software engineering properly, because understanding how something works and being able to build it well are two different things, and I wanted both.",
  "These days I run a small agency called Refacint, where I build apps, AI agents, and automation for businesses. Most of my work starts the same way: someone's fighting software that almost fits, and I build the thing that actually does.",
  "I don't just start building. I map out the use cases, draw the UML diagrams and flowcharts, and figure out how it should work before I build it so that everything actually holds up instead of breaking the moment someone uses it differently than I expected.",
  "A lot of my work now is AI and automation — handling the repetitive decisions and the manual steps nobody should still be doing by hand. The work I'm proudest of solves real problems, like a school exam system that runs offline, because you can't always count on the internet to hold.",
  "Some of my work is for clients, some is my own — a school platform, an AI integrated product I'm co-founding, a marketplace that i am building from scratch. What ties it together is simple: I like building things people actually depend on.",
];

// ─────────────────────────────────────────────────────────────────────────────

export function About() {
  const isTodo = (s: string) => s.startsWith("TODO");

  return (
    <section id="about" className="bg-section-raised section-y">
      <div className="mx-auto max-w-3xl px-4 md:px-6">

        <SectionHeading
          eyebrow="About"
          title={HEADING}
          intro={INTRO || undefined}
          headingSize="xl"
        />

        <div className="mt-10 space-y-5">
          {PARAGRAPHS.map((p, i) =>
            isTodo(p) ? (
              <p
                key={i}
                className="rounded-lg border border-dashed border-border px-4 py-3 font-mono text-sm italic text-muted-foreground/50"
              >
                {p}
              </p>
            ) : (
              <p key={i} className="text-base leading-relaxed text-muted-foreground">
                {p}
              </p>
            )
          )}
        </div>

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
          </a>
          {" "}— custom systems and AI for businesses that want to move faster.
        </p>

        <div className="mt-12">
          <Image
            src="/images/founder-about.webp"
            alt="Mohammed Adegbite working"
            width={966}
            height={742}
            priority
            className="rounded-2xl object-cover"
          />
        </div>

      </div>
    </section>
  );
}
