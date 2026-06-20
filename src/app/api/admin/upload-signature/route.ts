import { v2 as cloudinary } from "cloudinary";
import { auth, currentUser } from "@clerk/nextjs/server";

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

export async function POST() {
  const denied = await assertAdmin();
  if (denied) return denied;

  const timestamp = Math.round(Date.now() / 1000);
  const folder = "portfolio-blog";

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET!
  );

  return Response.json({
    signature,
    timestamp,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    folder,
  });
}
