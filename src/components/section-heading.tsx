import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title:   string;
  intro?:  string;
  align?:  "left" | "center";
  className?: string;
  /** "xl" gives Vysta-scale headings: larger size, bold weight, tighter tracking */
  headingSize?: "default" | "xl";
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  headingSize = "default",
}: SectionHeadingProps) {
  return (
    <div className={cn(
      headingSize === "xl" ? "space-y-4" : "space-y-3",
      align === "center" && "text-center",
      className,
    )}>
      <p className="text-xs font-medium uppercase tracking-wider text-primary">
        {eyebrow}
      </p>
      <h2 className={cn(
        "font-display text-foreground",
        headingSize === "xl"
          ? "text-4xl font-bold tracking-tighter md:text-5xl"
          : "text-3xl font-semibold tracking-tight md:text-4xl",
      )}>
        {title}
      </h2>
      {intro && (
        <p className={cn(
          "text-muted-foreground",
          headingSize === "xl" ? "text-lg" : "text-base",
          align === "left" && "max-w-2xl",
        )}>
          {intro}
        </p>
      )}
    </div>
  );
}
