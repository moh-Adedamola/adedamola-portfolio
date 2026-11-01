import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";

// There's no admin dashboard; /admin is just the entry point to the posts list.
// Guard first so non-admins get the same treatment as on /admin/posts.
export default async function AdminIndexPage() {
  await requireAdmin();
  redirect("/admin/posts");
}
