import type { ComponentType, CSSProperties } from "react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPrisma,
  SiPostgresql,
  SiOpenai,
  SiVercel,
  SiCloudinary,
} from "react-icons/si";
import { SectionHeading } from "@/components/section-heading";
import { stack } from "@/data/stack";

interface TechIconEntry {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: ComponentType<any>;
  color: string;
  darkColor: string;
}

// Brand hex from simple-icons. darkColor lightens colors that are
// near-black on the site's dark card background (hsl 30 33% 11%).
const TECH_ICONS: Partial<Record<string, TechIconEntry>> = {
  "Next.js":      { Icon: SiNextdotjs,  color: "#000000", darkColor: "#ffffff" },
  "React":        { Icon: SiReact,      color: "#61DAFB", darkColor: "#61DAFB" },
  "TypeScript":   { Icon: SiTypescript, color: "#3178C6", darkColor: "#5b9bd5" },
  "Tailwind CSS": { Icon: SiTailwindcss,color: "#06B6D4", darkColor: "#22d3ee" },
  "Node.js":      { Icon: SiNodedotjs,  color: "#339933", darkColor: "#4ade80" },
  "Prisma":       { Icon: SiPrisma,     color: "#2D3748", darkColor: "#94a3b8" },
  "PostgreSQL":   { Icon: SiPostgresql, color: "#4169E1", darkColor: "#6b87ee" },
  "OpenAI":       { Icon: SiOpenai,     color: "#412991", darkColor: "#a78bfa" },
  "Vercel":       { Icon: SiVercel,     color: "#000000", darkColor: "#ffffff" },
  "Cloudinary":   { Icon: SiCloudinary, color: "#3448C5", darkColor: "#7a8eff" },
};

export function Stack() {
  return (
    <section id="stack" className="bg-section-raised section-y">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Stack"
          title="Tools I build with."
          intro="Only tools I've shipped real work in."
          headingSize="xl"
        />

        <ul className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {stack.map((item) => {
            const entry = TECH_ICONS[item.name];

            return (
              <li key={item.name}>
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-section-card shadow-sm p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                  {entry ? (
                    <span
                      className="icon-col"
                      aria-hidden="true"
                      style={{
                        "--icon-color":   entry.color,
                        "--icon-color-d": entry.darkColor,
                      } as CSSProperties}
                    >
                      <entry.Icon size={44} aria-label={item.name} />
                    </span>
                  ) : (
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-sm font-bold tracking-tight text-muted-foreground"
                      aria-label={item.name}
                    >
                      {item.name
                        .split(/[\s./]/)
                        .map((w) => w[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 3)}
                    </span>
                  )}
                  <span className="text-center text-xs font-medium leading-tight text-foreground">
                    {item.name}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
