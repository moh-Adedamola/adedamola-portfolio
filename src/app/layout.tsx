import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Afeez — Founder, Refacint Technologies",
  description: "Personal portfolio of Afeez, founder of Refacint Technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: next-themes patches the class attribute on
    // <html> client-side (adds "dark" or "light"). Without this, React warns
    // about the server/client mismatch on that attribute.
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
