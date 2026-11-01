import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { projects } from "@/data/projects";

interface WorkProps {
  /** "preview" (homepage): heading, featured projects, link to /projects.
   *  "full" (/projects): every project, no heading — the page header has it. */
  variant?: "preview" | "full";
  /** Max cards shown in the preview */
  limit?:   number;
}

export function Work({ variant = "preview", limit = 3 }: WorkProps) {
  const isPreview = variant === "preview";
  const sorted = [...projects]
    .filter((p) => !isPreview || p.featured)
    .sort((a, b) => a.displayOrder - b.displayOrder);
  const shown = isPreview ? sorted.slice(0, limit) : sorted;

  return (
    <section id="work" className="ground-stone bg-background section-y">
      <div className="shell">

        {isPreview && (
          <SectionHeading
            eyebrow="Projects"
            title="Selected projects"
            intro="A few of the things I've built."
            headingSize="xl"
            className="mb-12"
          />
        )}

        {/* Project grid — preview fits three across on desktop; the odd
            third card spans the row on tablet so nothing is orphaned. */}
        <RevealGroup
          className={cn(
            "grid gap-6",
            isPreview ? "md:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2",
          )}
        >
          {shown.map((project, i) => (
            <RevealItem
              key={project.slug}
              className={cn(
                "flex",
                isPreview && shown.length === 3 && i === 2 && "md:col-span-2 lg:col-span-1",
              )}
            >
              <ProjectCard project={project} index={i + 1} compact={isPreview} />
            </RevealItem>
          ))}
        </RevealGroup>

        {isPreview && (
          <div className="mt-10 border-t border-border pt-6">
            <Link
              href="/projects"
              className="group inline-flex h-9 items-center gap-2 rounded-md border border-foreground/30 px-4 text-sm font-medium text-foreground outline-none transition-colors duration-200 ease-standard hover:border-foreground/60 hover:bg-foreground/[0.06] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View all projects
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
