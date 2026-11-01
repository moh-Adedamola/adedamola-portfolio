import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { site, siteUrl } from "@/data/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Chillax (Fontshare, ITF Free Font License) — not on Google Fonts, self-hosted
const chillax = localFont({
  variable: "--font-display",
  src: [
    { path: "../fonts/Chillax-300.woff2", weight: "300", style: "normal" },
    { path: "../fonts/Chillax-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Chillax-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Chillax-600.woff2", weight: "600", style: "normal" },
  ],
  display: "swap",
});

const defaultTitle = `${site.personName} · ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:  defaultTitle,
    template: `%s · ${site.personName}`,
  },
  description: site.description,
  openGraph: {
    type:        "website",
    siteName:    site.personName,
    url:         siteUrl,
    title:       defaultTitle,
    description: site.description,
  },
  twitter: {
    card:        "summary_large_image",
    title:       defaultTitle,
    description: site.description,
  },
};

// Light-only site: tell the browser not to apply a dark UA scheme
export const viewport: Viewport = {
  colorScheme: "light",
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
        className={`${schibstedGrotesk.variable} ${chillax.variable}`}
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
