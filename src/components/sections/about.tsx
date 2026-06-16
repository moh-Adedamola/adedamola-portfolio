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
const HEADING = "TODO(content): section heading";

// TODO(content): one-line intro that sits under the heading. Optional.
// Leave as empty string to omit it.
const INTRO = "";

// TODO(content): replace each string with a real paragraph. Write 3–4.
// Suggested beats:
//   1. Who you are and how you got into building software
//   2. Why you started Refacint — the gap you were solving
//   3. The AI / automation focus and what that means in practice
//   4. Lagos-and-global: local market knowledge, clients you've shipped for
const PARAGRAPHS: string[] = [
  "TODO(content): paragraph 1 — background, how you got into building",
  "TODO(content): paragraph 2 — why you started Refacint and what gap you were solving",
  "TODO(content): paragraph 3 — the AI / automation focus, what that looks like in practice",
  "TODO(content): paragraph 4 — Lagos-and-global angle, clients, real delivery track record",
];

// ─────────────────────────────────────────────────────────────────────────────

export function About() {
  const isTodo = (s: string) => s.startsWith("TODO");

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6">

        <SectionHeading
          eyebrow="About"
          title={HEADING}
          intro={INTRO || undefined}
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
          {" "}— custom software and AI for businesses that want to move faster.
        </p>

        {/*
          TODO(asset): optional secondary founder photo.
          When ready, add below using next/image:

          <div className="mt-12">
            <Image
              src="/images/founder-about.jpg"
              alt="Afeez"
              width={640}
              height={400}
              className="rounded-2xl object-cover"
            />
          </div>
        */}

      </div>
    </section>
  );
}
