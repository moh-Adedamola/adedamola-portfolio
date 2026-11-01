import { cn } from "@/lib/utils";
import { RevealGroup, RevealItem } from "@/components/reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title:   string;
  intro?:  string;
  align?:  "left" | "center";
  className?: string;
  /** "xl" uses the section h2 scale; "default" steps down to the h3 scale */
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
    <RevealGroup className={cn(align === "center" && "text-center", className)}>
      <RevealItem
        as="p"
        className={cn("eyebrow font-medium text-eyebrow", align === "center" && "justify-center")}
      >
        {eyebrow}
      </RevealItem>
      <RevealItem
        as="h2"
        className={cn(
          "font-display text-foreground",
          headingSize === "xl" ? "text-h2" : "text-h3",
        )}
      >
        {title}
      </RevealItem>
      {intro && (
        <RevealItem
          as="p"
          className={cn(
            "mt-6 text-body text-muted-foreground",
            align === "left" && "max-w-2xl",
          )}
        >
          {intro}
        </RevealItem>
      )}
    </RevealGroup>
  );
}
