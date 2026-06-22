import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { db } from "@/lib/db";

export async function Writing() {
  const posts = await db.post.findMany({
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

  if (posts.length === 0) return null;

  return (
    <section id="writing" className="bg-section-base section-y">
      <div className="mx-auto max-w-6xl px-4 md:px-6">

        <SectionHeading eyebrow="Writing" title="Thoughts on building." headingSize="xl" />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group flex flex-col space-y-3">
                {post.coverImage && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                  <h3 className="font-display text-lg font-semibold text-foreground group-hover:underline">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Link
            href="/blog"
            className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
          >
            View all writing →
          </Link>
        </div>

      </div>
    </section>
  );
}
