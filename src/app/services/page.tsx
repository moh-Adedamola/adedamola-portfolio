import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Consulting } from "@/components/sections/consulting";
import { Why } from "@/components/sections/why";
import { Faq } from "@/components/sections/faq";
import { siteUrl } from "@/data/site";

export const metadata: Metadata = {
  title:       "Services",
  description: "AI agents, custom CRMs, custom software, content automation and AI consulting for founders and small businesses, built around the real problem.",
  alternates:  { canonical: `${siteUrl}/services` },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        label="Services"
        title="What I build."
        intro="The areas I work in. Every project starts with the real problem — not the nearest popular tool."
      />
      <Consulting variant="full" />
      <Why />
      <Faq />
    </>
  );
}
