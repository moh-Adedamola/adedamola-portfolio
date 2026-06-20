import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostEditor } from "@/components/admin/post-editor";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();

  const { id } = await params;

  const post = await db.post.findUnique({ where: { id } });

  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Edit post</h1>
      <PostEditor
        initialData={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          body: post.body,
          coverImage: post.coverImage ?? "",
          status: post.status,
        }}
      />
    </div>
  );
}
