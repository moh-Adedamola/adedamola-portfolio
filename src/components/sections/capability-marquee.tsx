import { capabilities } from "@/data/capabilities";

export function CapabilityMarquee() {
  // Duplicate the list so the second copy picks up exactly where the first
  // ends — translateX(-50%) on the combined track creates a seamless loop.
  const track = [...capabilities, ...capabilities];

  return (
    <div className="ground-ink bg-background text-foreground border-y border-border py-5 overflow-hidden">
      {/* Accessible label — hidden visually; screen readers read this once */}
      <p className="sr-only">
        Refacint capabilities: {capabilities.join(", ")}
      </p>

      {/* Animated track — aria-hidden so screen readers skip the duplicate */}
      <div
        aria-hidden
        className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none"
      >
        {track.map((cap, i) => (
          <span key={i} className="flex items-center">
            <span className="mx-5 text-muted-foreground select-none" aria-hidden>•</span>
            <span className="font-display text-label font-medium uppercase text-foreground/70 whitespace-nowrap">
              {cap}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
