import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { type Project, type ProjectTag } from "@/data/projects";

const TAG_LABELS: Record<ProjectTag, string> = {
  "custom-software": "Custom software",
  "ai-agent":        "AI agent",
  "automation":      "Automation",
  "crm":             "CRM",
  "web":             "Web",
  "consulting":      "Consulting",
};

function isTodo(s: string) {
  return s.startsWith("TODO");
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { name, client, summary, problem, approach, outcome,
          tags, year, imageUrl, liveUrl, linkLabel } = project;

  const hasStory = !isTodo(summary) && (problem || approach || outcome);

  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-section-card shadow-sm overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">

      {/* Image */}
      {imageUrl ? (
        <div className="relative h-52 w-full shrink-0 overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <div className="flex h-52 w-full shrink-0 items-center justify-center bg-muted text-xs text-muted-foreground/50 font-mono italic">
          {/* TODO(asset): project image → public/images/work/{project.slug}.webp */}
          TODO(asset)
        </div>
      )}

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6">

        {/* Header */}
        <div>
          <p className="text-xs text-muted-foreground">
            {client}{year ? ` · ${year}` : ""}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-card-foreground">
            {name}
          </h3>
        </div>

        {/* Summary / story */}
        {hasStory ? (
          <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            {problem   && <p>{problem}</p>}
            {approach  && <p>{approach}</p>}
            {outcome   && <p className="font-medium text-foreground">{outcome}</p>}
          </div>
        ) : isTodo(summary) ? (
          <p className="rounded-lg border border-dashed border-border px-3 py-2 font-mono text-xs italic text-muted-foreground/50">
            {/* TODO(content): add project summary/story to projects.ts */}
            TODO(content): project summary
          </p>
        ) : (
          <p className="text-sm leading-relaxed text-muted-foreground">{summary}</p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {TAG_LABELS[tag]}
            </Badge>
          ))}
        </div>

        {/* Link */}
        {liveUrl && !isTodo(liveUrl) && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary underline-offset-4 hover:underline"
          >
            {linkLabel ?? "View live"} ↗
          </a>
        )}

      </div>
    </article>
  );
}
