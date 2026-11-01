import Image from "next/image";
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
  /** 1-based position in the grid, shown as a mono "01" index */
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { name, client, summary, problem, approach, outcome,
          tags, year, imageUrl, liveUrl, linkLabel } = project;

  const hasStory = !isTodo(summary) && (problem || approach || outcome);

  return (
    <article className="group flex w-full flex-col rounded-xl border border-border bg-section-card shadow-card overflow-hidden transition-[border-color,box-shadow] duration-300 ease-standard hover:border-foreground/20 hover:shadow-lg">

      {/* Image */}
      {imageUrl ? (
        <div className="relative h-52 w-full shrink-0 overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-standard group-hover:scale-105"
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
          <p className="flex items-baseline gap-3 text-xs text-muted-foreground">
            <span className="font-mono text-foreground">{String(index).padStart(2, "0")}</span>
            <span>{client}{year ? ` · ${year}` : ""}</span>
          </p>
          <div className="mt-1 flex items-start justify-between gap-4">
            <h3 className="font-display text-h4 text-card-foreground">
              {name}
            </h3>
            {liveUrl && !isTodo(liveUrl) && (
              <span
                className="mt-1 text-sm text-muted-foreground transition-[color,transform] duration-200 ease-standard group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                aria-hidden="true"
              >
                ↗
              </span>
            )}
          </div>
        </div>

        {/* Summary / story */}
        {hasStory ? (
          <div className="space-y-2 text-base leading-relaxed text-muted-foreground">
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
          <p className="text-base leading-relaxed text-muted-foreground">{summary}</p>
        )}

        {/* Tags — mono chips */}
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2" aria-label="Tags">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-sm border border-foreground/15 px-2 py-0.5 font-mono text-xs leading-5 text-muted-foreground"
            >
              {TAG_LABELS[tag]}
            </li>
          ))}
        </ul>

        {/* Link */}
        {liveUrl && !isTodo(liveUrl) && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link mt-1 inline-flex items-center gap-1 text-xs font-medium text-eyebrow underline-offset-4 hover:underline"
          >
            {linkLabel ?? "View live"}
            <span
              className="inline-block transition-transform duration-200 ease-standard group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        )}

      </div>
    </article>
  );
}
