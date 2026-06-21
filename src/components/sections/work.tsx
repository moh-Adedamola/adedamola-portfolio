import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";

export function Work() {
  const featured = [...projects]
    .filter((p) => p.featured)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section id="work" className="bg-section-base section-y">
      <div className="mx-auto max-w-6xl px-4 md:px-6">

        <SectionHeading
          eyebrow="Work"
          title="Selected projects"
          intro="A few of the things I've built."
          headingSize="xl"
        />

        {/* Project grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}
