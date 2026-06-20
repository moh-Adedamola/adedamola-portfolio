import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

async function assertAdmin(): Promise<Response | null> {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress ?? "";
  const allowlist = (process.env.ADMIN_EMAIL_ALLOWLIST ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase());

  if (!allowlist.includes(email.toLowerCase())) {
    return Response.json({ error: "Forbidden" }, { status: 401 });
  }

  return null;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await assertAdmin();
  if (denied) return denied;

  const { id } = await params;

  const existing = await db.post.findUnique({ where: { id } });
  if (!existing) {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }

  const body = await request.json();
  const { title, slug, excerpt, coverImage, status } = body;
  const bodyText: string | undefined = body.body;

  // Only stamp publishedAt on the first transition to PUBLISHED
  let publishedAt = existing.publishedAt;
  if (status === "PUBLISHED" && !existing.publishedAt) {
    publishedAt = new Date();
  } else if (status === "DRAFT") {
    publishedAt = null;
  }

  const post = await db.post.update({
    where: { id },
    data: {
      ...(title !== undefined && { title }),
      ...(slug !== undefined && { slug }),
      ...(excerpt !== undefined && { excerpt }),
      ...(bodyText !== undefined && { body: bodyText }),
      ...(coverImage !== undefined && { coverImage }),
      ...(status !== undefined && { status }),
      publishedAt,
    },
  });

  return Response.json(post);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await assertAdmin();
  if (denied) return denied;

  const { id } = await params;

  const existing = await db.post.findUnique({ where: { id } });
  if (!existing) {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }

  await db.post.delete({ where: { id } });

  return new Response(null, { status: 204 });
}
