import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { db } from "@/lib/db";

async function getRecentPosts() {
  try {
    return await db.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: {
        slug: true,
        title: true,
        excerpt: true,
        coverImage: true,
        publishedAt: true,
      },
    });
  } catch (error) {
    // A DB hiccup (e.g. Neon cold-start/autosuspend) shouldn't 500 the
    // whole homepage — fall back to the empty state below instead.
    console.error("Writing: failed to load posts", error);
    return [];
  }
}

export async function Writing() {
  const posts = await getRecentPosts();

  if (posts.length === 0) return null;

  return (
    <section id="writing" className="bg-section-base section-y">
      <div className="shell">

        <SectionHeading eyebrow="Writing" title="Thoughts on building." headingSize="xl" />

        <RevealGroup as="ul" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <RevealItem as="li" key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col space-y-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {post.coverImage && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-standard group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="space-y-1">
                  {post.publishedAt && (
                    <p className="text-xs text-muted-foreground">
                      {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}
                  <h3 className="font-display text-h4 text-foreground group-hover:underline">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-8">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1 text-sm font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
          >
            View all writing
            <span
              className="inline-block transition-transform duration-200 ease-standard group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
