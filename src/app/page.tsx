// TEMPORARY: typography test — remove once fonts are confirmed, replace with real sections.
export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-16 max-w-3xl mx-auto space-y-10">

      {/* Hero display — DM Sans 700, tracking-tighter */}
      <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-foreground">
        I build software that moves businesses forward.
      </h1>

      {/* Section title — DM Sans 600, tracking-tight */}
      <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight text-foreground">
        Work & Projects
      </h2>

      {/* Body copy — Inter 400 */}
      <p className="text-base leading-relaxed text-foreground">
        This is body copy in Inter at base size. It should feel comfortable and
        highly legible at all sizes — the workhorse font for paragraphs, UI
        labels, and button text across the site.
      </p>

      {/* Card title — Inter 600 */}
      <p className="text-lg font-semibold text-foreground">
        Card Title — Inter Semibold
      </p>

      {/* Caption / small — Inter 400, muted */}
      <p className="text-sm text-muted-foreground">
        Small caption in Inter — muted foreground colour. Used for timestamps,
        tags, and supporting metadata throughout the UI.
      </p>

    </main>
  );
}
