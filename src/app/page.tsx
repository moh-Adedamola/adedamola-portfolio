import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { CapabilityMarquee } from "@/components/sections/capability-marquee";
import { About } from "@/components/sections/about";
import { Work } from "@/components/sections/work";
import { Why } from "@/components/sections/why";
import { Consulting } from "@/components/sections/consulting";
import { Stack } from "@/components/sections/stack";
import { Speaking } from "@/components/sections/speaking";
import { Writing } from "@/components/sections/writing";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { site, siteUrl } from "@/data/site";

export const revalidate = 60;

export const metadata: Metadata = {
  alternates: { canonical: siteUrl },
};

const personSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type":       "Person",
      "@id":         `${siteUrl}/#person`,
      "name":        site.personName,
      "jobTitle":    "Founder",
      "url":         siteUrl,
      "description": site.description,
      "sameAs":      [site.agencyUrl],
      "worksFor":    { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Organization",
      "@id":   `${siteUrl}/#organization`,
      "name":  "Refacint Technologies",
      "url":   site.agencyUrl,
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Hero />
      <CapabilityMarquee />
      <About />
      <Work />
      <Why />
      <Consulting />
      <Stack />
      <Speaking />
      <Writing />
      <Faq />
      <Contact />
    </>
  );
}
