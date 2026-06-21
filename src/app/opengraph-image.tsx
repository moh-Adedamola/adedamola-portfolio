import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt         = `${site.personName} — ${site.role}`;
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

// Design tokens (approximating site dark-mode CSS vars)
const BG     = "#120e0a"; // --background dark
const FG     = "#f0e8da"; // --foreground dark
const ACCENT = "#1db5a0"; // --primary dark
const MUTED  = "#998b7d"; // --muted-foreground dark

function clampWords(str: string, max: number): string {
  if (str.length <= max) return str;
  const cut = str.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut) + "…";
}

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: BG,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", width: 32, height: 3, backgroundColor: ACCENT }} />
          <div
            style={{
              display: "flex",
              color: ACCENT,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.15em",
            }}
          >
            PORTFOLIO
          </div>
        </div>

        {/* Name + Role */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              display: "flex",
              color: FG,
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              color: MUTED,
              fontSize: 28,
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            {site.role}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              color: MUTED,
              fontSize: 17,
              lineHeight: 1.5,
              maxWidth: 700,
            }}
          >
            {clampWords(site.description, 120)}
          </div>
          <div
            style={{
              display: "flex",
              color: MUTED,
              fontSize: 13,
              opacity: 0.55,
            }}
          >
            {site.agencyUrl.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
