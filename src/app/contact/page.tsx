import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ContactDetails } from "@/components/sections/contact";
import { CONTACT_TITLE, CONTACT_INTRO } from "@/components/contact-copy";
import { siteUrl } from "@/data/site";

export const metadata: Metadata = {
  title:       "Contact",
  description: "Tell Mohammed Adegbite what you're dealing with. Email, WhatsApp or the contact form; based in Lagos, working with clients remotely.",
  alternates:  { canonical: `${siteUrl}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader label="Contact" title={CONTACT_TITLE} intro={CONTACT_INTRO} />
      <ContactDetails />
    </>
  );
}
