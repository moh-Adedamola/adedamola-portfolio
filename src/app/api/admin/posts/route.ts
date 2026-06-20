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

export async function POST(request: Request) {
  const denied = await assertAdmin();
  if (denied) return denied;

  const body = await request.json();
  const { title, slug, excerpt, coverImage, status } = body;
  const bodyText: string = body.body;

  if (!title || !slug || !bodyText) {
    return Response.json(
      { error: "title, slug, and body are required" },
      { status: 400 }
    );
  }

  const post = await db.post.create({
    data: {
      title,
      slug,
      excerpt: excerpt ?? null,
      body: bodyText,
      coverImage: coverImage ?? null,
      status: status ?? "DRAFT",
      publishedAt: status === "PUBLISHED" ? new Date() : null,
    },
  });

  return Response.json(post, { status: 201 });
}
