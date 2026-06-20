import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/admin/sign-in");
  }

  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress ?? "";
  const allowlist = (process.env.ADMIN_EMAIL_ALLOWLIST ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase());

  if (!allowlist.includes(email.toLowerCase())) {
    redirect("/");
  }
}
