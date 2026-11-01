import Link from "next/link";
import { Bot, Zap, Users, Code2, FileText, Lightbulb } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { services } from "@/data/services";

// Icon map: keys must match the `icon` field in services.ts
const ICON_MAP = { Bot, Zap, Users, Code2, FileText, Lightbulb } as const;
type IconName = keyof typeof ICON_MAP;

function isIconName(name: string | undefined): name is IconName {
  return !!name && name in ICON_MAP;
}

interface ConsultingProps {
  /** "compact" (homepage, ink): heading, title + one-line summary per card,
   *  link to /services. "full" (/services, stone): description + outcomes,
   *  no heading — the page header has it. */
  variant?: "compact" | "full";
}

export function Consulting({ variant = "compact" }: ConsultingProps) {
  const isCompact = variant === "compact";
  const sorted = [...services].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section
      id="consulting"
      className={cn(
        "bg-background section-y",
        isCompact ? "ground-ink text-foreground" : "ground-stone",
      )}
    >
      <div className="shell">

        {isCompact && (
          <SectionHeading
            eyebrow="Services"
            title="What I build."
            intro="The areas I work in. Every project starts with the real problem, not the nearest popular tool."
            headingSize="xl"
            className="mb-12"
          />
        )}

        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((service, i) => {
            const Icon = isIconName(service.icon) ? ICON_MAP[service.icon] : null;

            return (
              <RevealItem
                as="article"
                key={service.id}
                className={cn(
                  "flex flex-col rounded-xl border border-border bg-section-card shadow-card p-6 transition-colors duration-300 ease-standard hover:border-foreground/20",
                  isCompact ? "gap-4" : "gap-5",
                )}
              >
                {/* Icon + mono index */}
                <div className="flex items-start justify-between">
                  {Icon && (
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-muted text-foreground">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  )}
                  <span className="ml-auto font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-h4 text-card-foreground">
                  {service.title}
                </h3>

                {isCompact ? (
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {service.summary}
                  </p>
                ) : (
                  <>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>

                    <ul className="space-y-2">
                      {service.outcomes.map((outcome, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-[0.7em] h-px w-3 shrink-0 bg-muted-foreground" aria-hidden="true" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>

        {isCompact && (
          <div className="mt-10 border-t border-border pt-6">
            <Link
              href="/services"
              className="group inline-flex h-9 items-center gap-2 rounded-md border border-foreground/30 px-4 text-sm font-medium text-foreground outline-none transition-colors duration-200 ease-standard hover:border-foreground/60 hover:bg-foreground/[0.06] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View all services
              <span
                className="inline-block transition-transform duration-200 ease-standard group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
