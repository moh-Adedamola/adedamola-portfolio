import type { ComponentType } from "react";
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
  SiPython,
  SiMongodb,
  SiMysql,
  SiClaude,
  SiJavascript,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { SectionHeading } from "@/components/section-heading";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { stack } from "@/data/stack";

interface TechIconEntry {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: ComponentType<any>;
  color: string;
}

// Brand hex from simple-icons.
const TECH_ICONS: Partial<Record<string, TechIconEntry>> = {
  "Next.js":      { Icon: SiNextdotjs,  color: "#000000" },
  "React":        { Icon: SiReact,      color: "#61DAFB" },
  "TypeScript":   { Icon: SiTypescript, color: "#3178C6" },
  "Tailwind CSS": { Icon: SiTailwindcss,color: "#06B6D4" },
  "Node.js":      { Icon: SiNodedotjs,  color: "#339933" },
  "Prisma":       { Icon: SiPrisma,     color: "#2D3748" },
  "PostgreSQL":   { Icon: SiPostgresql, color: "#4169E1" },
  "OpenAI":       { Icon: SiOpenai,     color: "#412991" },
  "Vercel":       { Icon: SiVercel,     color: "#000000" },
  "Cloudinary":   { Icon: SiCloudinary, color: "#3448C5" },
  // Simple Icons dropped the Java logo for trademark reasons, so this uses
  // Font Awesome's coffee-cup glyph instead.
  "Java":         { Icon: FaJava,       color: "#f89820" },
  "Python":       { Icon: SiPython,     color: "#3776AB" },
  "MongoDB":      { Icon: SiMongodb,    color: "#47A248" },
  "MySQL":        { Icon: SiMysql,      color: "#4479A1" },
  "Claude":       { Icon: SiClaude,     color: "#D97757" },
  // Official JS yellow (#F7DF1E) is too pale against the near-white card
  // background, so this uses a deeper amber/gold of the same hue.
  "Javascript":   { Icon: SiJavascript, color: "#8a6d00" },
};

export function Stack() {
  return (
    <section id="stack" className="ground-stone bg-background section-y">
      <div className="shell">
        <SectionHeading
          eyebrow="Stack"
          title="Tools I build with."
          intro="Only tools I've shipped real work in."
          headingSize="xl"
        />

        <RevealGroup as="ul" stagger={0.04} className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {stack.map((item) => {
            const entry = TECH_ICONS[item.name];

            return (
              <RevealItem as="li" key={item.name}>
                <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-section-card shadow-card p-4 transition-[transform,border-color,box-shadow] duration-200 ease-standard hover:scale-105 hover:border-foreground/25 hover:shadow-md">
                  {entry ? (
                    <span
                      aria-hidden="true"
                      style={{ color: entry.color }}
                    >
                      <entry.Icon size={44} aria-label={item.name} />
                    </span>
                  ) : (
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-md bg-muted text-sm font-bold tracking-tight text-muted-foreground"
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
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
