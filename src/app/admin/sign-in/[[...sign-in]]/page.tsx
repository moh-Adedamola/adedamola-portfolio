import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      {/* Used when there's no redirect_url to return to (e.g. visiting
          /admin/sign-in directly). Deep links like /admin/posts/new still
          come back to where they started. */}
      <SignIn fallbackRedirectUrl="/admin/posts" />
    </main>
  );
}
