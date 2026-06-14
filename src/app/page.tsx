import { ThemeToggle } from "@/components/theme-toggle";

// TEMPORARY: theme and colour-token test page.
// Replace with real homepage sections starting from step 7 (Hero).
export default function Home() {
  return (
    <div className="min-h-screen p-8">
      {/* Toggle — top right */}
      <div className="flex justify-end mb-10">
        <ThemeToggle />
      </div>

      <div className="max-w-lg mx-auto space-y-6">
        {/* bg-background + text-foreground */}
        <div className="rounded-lg border border-border bg-background p-6">
          <p className="text-sm font-medium uppercase tracking-wider text-primary mb-2">
            Token test
          </p>
          <p className="text-foreground text-base leading-relaxed">
            <strong>bg-background</strong> with <strong>text-foreground</strong> —
            white canvas / navy text in light mode; deep-navy canvas / near-white
            text in dark mode.
          </p>
        </div>

        {/* bg-primary button */}
        <button className="w-full rounded bg-primary px-4 py-3 text-primary-foreground font-medium">
          bg-primary — vivid blue (light) / slightly lighter blue (dark)
        </button>

        {/* bg-card + border-border + text-muted-foreground */}
        <div className="rounded-lg border border-border bg-card p-6 space-y-2">
          <p className="text-foreground font-semibold">bg-card surface</p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            text-muted-foreground — medium slate in light mode, soft grey-blue in
            dark mode.
          </p>
        </div>

        {/* bg-surface-elevated */}
        <div className="rounded-lg bg-surface-elevated p-6">
          <p className="text-foreground text-sm">
            bg-surface-elevated — one step above card in both modes.
          </p>
        </div>
      </div>
    </div>
  );
}
