import { Bot, Zap, Users, Code2, FileText, Lightbulb } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
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
      <div className="mx-auto max-w-6xl px-4 md:px-6">

        <SectionHeading
          eyebrow="Consulting"
          title="What I build."
          intro="Six areas I work in. Every project starts with the real problem — not the nearest popular tool."
          headingSize="xl"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((service) => {
            const Icon = isIconName(service.icon) ? ICON_MAP[service.icon] : null;

            return (
              <article
                key={service.id}
                className="flex flex-col gap-5 rounded-2xl border border-border bg-section-card shadow-sm p-6"
              >
                {/* Icon */}
                {Icon && (
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                )}

                {/* Title */}
                <h3 className="font-semibold text-card-foreground">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                {/* Outcomes */}
                <ul className="mt-auto space-y-2">
                  {service.outcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="mt-0.5 shrink-0 text-primary" aria-hidden="true">
                        —
                      </span>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
