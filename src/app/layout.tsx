import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { site, siteUrl } from "@/data/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

const defaultTitle = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:  defaultTitle,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type:        "website",
    siteName:    site.name,
    url:         siteUrl,
    title:       defaultTitle,
    description: site.description,
    images:      [{ url: site.ogImage }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       defaultTitle,
    description: site.description,
    images:      [site.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
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
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
