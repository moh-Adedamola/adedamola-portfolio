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
  // Simple Icons dropped the Java logo for trademark reasons, so this uses
  // Font Awesome's coffee-cup glyph instead.
  "Java":         { Icon: FaJava,       color: "#f89820", darkColor: "#f89820" },
  "Python":       { Icon: SiPython,     color: "#3776AB", darkColor: "#6aa9d8" },
  "MongoDB":      { Icon: SiMongodb,    color: "#47A248", darkColor: "#6fcf73" },
  "MySQL":        { Icon: SiMysql,      color: "#4479A1", darkColor: "#6b9cc4" },
  "Claude":       { Icon: SiClaude,     color: "#D97757", darkColor: "#D97757" },
  // Official JS yellow (#F7DF1E) is too pale against the near-white light
  // card background, so light mode uses a deeper amber/gold of the same
  // hue; dark mode keeps the bright official yellow, which pops fine there.
  "Javascript":   { Icon: SiJavascript, color: "#8a6d00", darkColor: "#F7DF1E" },
};

export function Stack() {
  return (
    <section id="stack" className="bg-section-raised section-y">
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
                <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-section-card shadow-sm p-4 transition-[transform,border-color,box-shadow] duration-200 ease-standard hover:scale-105 hover:border-foreground/25 hover:shadow-md">
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
