import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] items-center bg-background"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-24 md:px-6 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-2">

          {/* ── Text column */}
          <div className="space-y-6">

            {/* Eyebrow */}
            <p
              className="animate-fade-up motion-reduce:animate-none text-xs font-medium uppercase tracking-wider text-primary"
              style={{ animationDelay: "0ms" }}
            >
              {site.role}
            </p>

            {/* Display headline */}
            <h1
              className="animate-fade-up motion-reduce:animate-none font-display text-5xl font-bold tracking-tighter text-foreground md:text-7xl"
              style={{ animationDelay: "80ms" }}
            >
              {site.name}
            </h1>

            {/* Positioning line — renders real copy when site.tagline is set;
                shows a clearly-marked placeholder until then */}
            {site.tagline ? (
              <p
                className="animate-fade-up motion-reduce:animate-none max-w-md text-lg leading-relaxed text-muted-foreground"
                style={{ animationDelay: "160ms" }}
              >
                {site.tagline}
              </p>
            ) : (
              <p
                className="animate-fade-up motion-reduce:animate-none max-w-md rounded-lg border border-dashed border-border px-4 py-3 font-mono text-sm italic text-muted-foreground/50"
                style={{ animationDelay: "160ms" }}
              >
                {/* TODO(content): write your positioning one-liner in site.ts */}
                TODO(content): positioning one-liner
              </p>
            )}

            {/* CTAs */}
            <div
              className="animate-fade-up motion-reduce:animate-none flex flex-wrap items-center gap-4 pt-2"
              style={{ animationDelay: "240ms" }}
            >
              <Button asChild size="lg">
                <a href="#contact">Work with me</a>
              </Button>
              <a
                href="#work"
                className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                See my work →
              </a>
            </div>

          </div>

          {/* ── Photo column */}
          <div
            className="animate-fade-up motion-reduce:animate-none flex justify-center md:justify-end"
            style={{ animationDelay: "120ms" }}
          >
            {/*
              TODO(asset): replace this block with next/image once the founder
              photo is in public/images/founder.jpg (or .webp).

              <Image
                src="/images/founder.jpg"
                alt="Afeez — Founder, Refacint Technologies"
                width={480}
                height={560}
                priority
                className="rounded-2xl object-cover"
              />
            */}
            <div className="flex h-[400px] w-full max-w-[360px] items-center justify-center rounded-2xl bg-muted text-sm text-muted-foreground md:max-w-[400px]">
              TODO(asset): founder photo
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
