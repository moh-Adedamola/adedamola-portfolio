export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const site = {
  name:        "Moh",
  personName:  "Mohammed Adegbite",
  role:        "Founder, Refacint Technologies",
  description: "Personal site of Mohammed Adegbite — founder of Refacint Technologies, building software and AI solutions for African businesses.",
  tagline:     "Hi, I'm Moh Adegbite. I build  systems that businesses actually run on, and the AI that takes the repetitive work off your plate.",
  url:         siteUrl,
  agencyUrl:   "https://refacint.com",
  email:       "hello@refacint.com",
} as const;
