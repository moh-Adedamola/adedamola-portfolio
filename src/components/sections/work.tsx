import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";

// Clients for the logo wall — text-only until real logo assets are supplied.
// TODO(asset): swap each name for a next/image logo once you have the files.
const LOGO_WALL_CLIENTS = [
  "MOLEK Schools",
  "Klassrun Technologies",
  "Tenderville School",
];

export function Work() {
  const featured = [...projects]
    .filter((p) => p.featured)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section id="work" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">

        <SectionHeading
          eyebrow="Work"
          title="Selected projects"
          intro="A few of the things I've built."
        />

        {/* Project grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {/* Logo wall */}
        <div className="mt-20">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Brands I've worked with
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6">
            {LOGO_WALL_CLIENTS.map((name) => (
              <span
                key={name}
                className="text-base font-semibold text-foreground/40 transition-colors hover:text-foreground/70"
              >
                {/* TODO(asset): replace with next/image logo */}
                {name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
