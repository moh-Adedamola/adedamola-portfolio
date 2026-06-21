export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const site = {
  name:        "Moh",
  personName:  "Mohammed Adegbite",
  role:        "Founder, Refacint Technologies",
  description: "Personal site of Mohammed Adegbite — founder of Refacint Technologies, building software and AI solutions for African businesses.",
  tagline:     "Hi, I'm Moh Adegbite. I build the software businesses actually run on — and the AI and automation that makes the boring parts disappear.",
  url:         siteUrl,
  agencyUrl:   "https://refacint.com",
  email:       "hello@refacint.com",
  ogImage:     "/og.png",
} as const;
