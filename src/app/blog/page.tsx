import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { site } from "@/data/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title:       "Blog",
  description: `Writing on software, AI, and automation from ${site.personName}.`,
};

async function getPublishedPosts() {
  try {
    return await db.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      select: {
        slug: true,
        title: true,
        excerpt: true,
        coverImage: true,
        publishedAt: true,
      },
    });
  } catch (error) {
    console.error("BlogPage: failed to load posts", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-semibold mb-12">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet. Check back soon.</p>
      ) : (
        <ul className="space-y-12">
          {posts.map((post) => (
            <li key={post.slug}>
              {post.coverImage && (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : null}
                </p>
                <h2 className="text-xl font-semibold leading-snug">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                {post.excerpt && (
                  <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
