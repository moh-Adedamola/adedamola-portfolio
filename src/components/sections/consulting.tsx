import { Bot, Zap, Users, Code2, FileText, Lightbulb } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { services } from "@/data/services";

// Icon map: keys must match the `icon` field in services.ts
const ICON_MAP = { Bot, Zap, Users, Code2, FileText, Lightbulb } as const;
type IconName = keyof typeof ICON_MAP;

function isIconName(name: string | undefined): name is IconName {
  return !!name && name in ICON_MAP;
}

export function Consulting() {
  const sorted = [...services].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section id="consulting" className="bg-section-base section-y">
      <div className="shell">

        <SectionHeading
          eyebrow="Consulting"
          title="What I build."
          intro="The areas I work in. Every project starts with the real problem — not the nearest popular tool."
          headingSize="xl"
        />

        <RevealGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((service) => {
            const Icon = isIconName(service.icon) ? ICON_MAP[service.icon] : null;

            return (
              <RevealItem
                as="article"
                key={service.id}
                className="flex flex-col gap-5 rounded-xl border border-border bg-section-card shadow-sm p-6 transition-colors duration-300 ease-standard hover:border-foreground/20"
              >
                {/* Icon */}
                {Icon && (
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-muted text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                )}

                {/* Title */}
                <h3 className="font-display text-h4 text-card-foreground">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-base leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                {/* Outcomes */}
                <ul className="space-y-2">
                  {service.outcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-0.5 shrink-0 text-primary" aria-hidden="true">
                        —
                      </span>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            );
          })}
        </RevealGroup>

      </div>
    </section>
  );
}
