import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <span className="font-semibold text-sm">Admin</span>
        <nav className="flex items-center gap-4 text-sm">
          <a href="/admin/posts" className="hover:underline">Posts</a>
          <Link href="/" className="hover:underline">← View site</Link>
        </nav>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
