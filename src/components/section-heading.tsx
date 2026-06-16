import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title:   string;
  intro?:  string;
  align?:  "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-3", align === "center" && "text-center", className)}>
      <p className="text-xs font-medium uppercase tracking-wider text-primary">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {intro && (
        <p className={cn("text-base text-muted-foreground", align === "left" && "max-w-2xl")}>
          {intro}
        </p>
      )}
    </div>
  );
}
