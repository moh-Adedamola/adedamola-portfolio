import { RevealGroup, RevealItem } from "@/components/reveal";

interface PageHeaderProps {
  label: string;
  title: React.ReactNode;
  intro?: string;
  children?: React.ReactNode;
}

// Ink page header for inner pages — sits where the hero does on "/".
export function PageHeader({ label, title, intro, children }: PageHeaderProps) {
  return (
    <section className="ground-ink bg-background text-foreground">
      <RevealGroup className="shell pt-24 pb-16 md:pt-32 md:pb-24">
        <RevealItem as="p" className="eyebrow font-medium text-eyebrow">
          {label}
        </RevealItem>
        <RevealItem as="h1" className="font-display text-display text-foreground">
          {title}
        </RevealItem>
        {intro && (
          <RevealItem as="p" className="mt-8 max-w-2xl text-body text-muted-foreground">
            {intro}
          </RevealItem>
        )}
        {children && <RevealItem className="mt-8">{children}</RevealItem>}
      </RevealGroup>
    </section>
  );
}
