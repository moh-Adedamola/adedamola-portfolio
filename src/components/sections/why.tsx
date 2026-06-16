import { SectionHeading } from "@/components/section-heading";

// Three honest differentiators — per feature-specs.md §4b and brand-context.md.
// Copy here reflects what is genuinely known and defensible about this founder.
// Do NOT add invented metrics, awards, or absolutist claims.
// Replace any text you want to rephrase in your own voice.
const DIFFERENTIATORS = [
  {
    label: "Market",
    heading: "I build for the market I know.",
    // Why: Afeez works in Lagos. Nigerian SMBs face constraints (connectivity,
    // lean teams, seasonality) that generic software advice glosses over.
    body: "Most software advice assumes a context that does not fit Lagos SMBs. I work inside this market — I understand the real constraints and what actually ships here.",
  },
  {
    label: "Track record",
    heading: "Real clients, shipped.",
    // Why: MOLEK Schools, Klassrun Technologies, Tenderville School are confirmed
    // real clients from projects.ts. Naming them is the most honest proof.
    body: "MOLEK Schools, Klassrun Technologies, Tenderville School — real businesses with specific problems I built for. That track record is the most honest thing I can show you.",
  },
  {
    label: "Approach",
    heading: "Systems, not one-off tools.",
    // Why: Automation-first focus is the stated core of Refacint's positioning.
    // "Systems that compound" is the literal phrase from feature-specs.md.
    body: "I build things that keep working after I leave. Automation that compounds — not a dependency on me for every change, but a system that does more over time.",
  },
] as const;

export function Why() {
  return (
    <section id="why" className="bg-card py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">

        <SectionHeading
          eyebrow="Why work with me"
          title="What I bring."
        />

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {DIFFERENTIATORS.map(({ label, heading, body }) => (
            <div key={label} className="space-y-4">
              {/* Label */}
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {label}
              </p>

              {/* Quote-style heading */}
              <h3 className="font-display text-xl font-semibold leading-snug text-foreground md:text-2xl">
                {heading}
              </h3>

              {/* Thin divider */}
              <div className="h-px w-10 bg-border" />

              {/* Body */}
              <p className="text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
