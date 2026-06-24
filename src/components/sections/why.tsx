import { SectionHeading } from "@/components/section-heading";

// Three honest differentiators — per feature-specs.md §4b and brand-context.md.
// Copy here reflects what is genuinely known and defensible about this founder.
// Do NOT add invented metrics, awards, or absolutist claims.
// Replace any text you want to rephrase in your own voice.
const DIFFERENTIATORS = [
  {
    label: "Market",
    heading: "I build for people like you.",
    body: "I build for founders and small businesses who need software that just works — not enterprise tools bent to fit, not demos that fall apart in real use. I get the constraints, because I work in them.",
  },
  {
    label: "Track record",
    heading: "Real work, real clients.",
    // Why: MOLEK Schools is a real paid client; EventIQ is also a paid client
    // build (in progress). Klassrun is the founder's own startup, not a client
    // engagement — the copy must keep that distinction honest.
    body: "MOLEK Schools runs on a platform I built . EventIQ is another client build in progress: a vendor marketplace with escrow payments. Klassrun is my own — an AI school platform I'm co-founding. Real projects, real stakes.",
  },
  {
    label: "Approach",
    heading: "Built to last, not babysit.",
    body: "I build things that keep working after I leave — tested properly, planned before they're coded, and designed so they don't fall over the first time someone uses them differently than expected.",
  },
] as const;

export function Why() {
  return (
    <section id="why" className="bg-section-raised section-y">
      <div className="mx-auto max-w-6xl px-4 md:px-6">

        <SectionHeading
          eyebrow="Why work with me"
          title="What I bring."
          headingSize="xl"
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
