import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function AdminPostsPage() {
  await requireAdmin();

  const posts = await db.post.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      publishedAt: true,
      createdAt: true,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="bg-foreground text-background px-4 py-2 rounded-md text-sm font-medium hover:opacity-90"
        >
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground text-sm">No posts yet.</p>
      ) : (
        <ul className="divide-y">
          {posts.map((post) => (
            <li key={post.id} className="py-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{post.title}</p>
                <p className="text-sm text-muted-foreground">{post.slug}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  post.status === "PUBLISHED"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {post.status}
                </span>
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="text-sm hover:underline"
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
