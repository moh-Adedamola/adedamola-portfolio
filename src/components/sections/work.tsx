import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { projects } from "@/data/projects";

export function Work() {
  const featured = [...projects]
    .filter((p) => p.featured)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section id="work" className="bg-section-base section-y">
      <div className="shell">

        <SectionHeading
          eyebrow="Work"
          title="Selected projects"
          intro="A few of the things I've built."
          headingSize="xl"
        />

        {/* Project grid */}
        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2">
          {featured.map((project) => (
            <RevealItem key={project.slug} className="flex">
              <ProjectCard project={project} />
            </RevealItem>
          ))}
        </RevealGroup>

      </div>
    </section>
  );
}
