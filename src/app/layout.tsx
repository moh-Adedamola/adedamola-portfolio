import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${dmSans.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <Providers>
          <SiteHeader />
          <main className="pt-16">
            {children}
          </main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
