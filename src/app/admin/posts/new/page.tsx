import { requireAdmin } from "@/lib/auth";
import { PostEditor } from "@/components/admin/post-editor";

export default async function NewPostPage() {
  await requireAdmin();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">New post</h1>
      <PostEditor />
    </div>
  );
}
