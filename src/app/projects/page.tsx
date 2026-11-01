import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Work } from "@/components/sections/work";
import { siteUrl } from "@/data/site";

export const metadata: Metadata = {
  title:       "Projects",
  description: "Client platforms, AI products and custom software built by Mohammed Adegbite: school portals, marketplaces and the systems behind them.",
  alternates:  { canonical: `${siteUrl}/projects` },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        label="Projects"
        title="Projects"
        intro="A few of the things I've built."
      />
      <Work variant="full" />
    </>
  );
}
