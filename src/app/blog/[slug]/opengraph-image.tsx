import { ImageResponse } from "next/og";
import { db } from "@/lib/db";
import { site } from "@/data/site";

export const runtime     = "nodejs"; // needs DB via pg adapter — not edge-compatible
export const alt         = `Blog · ${site.personName}`;
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG     = "#120e0a";
const FG     = "#f0e8da";
const ACCENT = "#1db5a0";
const MUTED  = "#998b7d";

function clampWords(str: string, max: number): string {
  if (str.length <= max) return str;
  const cut = str.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut) + "…";
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await db.post
    .findUnique({
      where:  { slug },
      select: { title: true, publishedAt: true, status: true },
    })
    .catch(() => null);

  const isPublished = post?.status === "PUBLISHED";

  // Falls back to the default branded card for drafts / missing posts
  const eyebrow  = isPublished ? `${site.name.toUpperCase()} · BLOG` : "PORTFOLIO";
  const title    = isPublished ? clampWords(post!.title, 72) : site.name;
  const subtitle = isPublished
    ? post?.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
          day: "numeric", month: "long", year: "numeric",
        })
      : null
    : site.role;
  const footer   = isPublished
    ? `${site.personName} — ${site.role}`
    : clampWords(site.description, 90);

  // Shrink font for longer titles so they fit in one or two lines
  const titleSize = title.length > 50 ? 54 : title.length > 35 ? 64 : 76;

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
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
            {eyebrow}
          </div>
        </div>

        {/* Title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              color: FG,
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: "95%",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                display: "flex",
                color: MUTED,
                fontSize: 22,
                fontWeight: 400,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", color: MUTED, fontSize: 16 }}>
            {footer}
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
