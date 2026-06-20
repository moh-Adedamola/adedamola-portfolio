export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const site = {
  name:        "Afeez",
  personName:  "Afeez Adedamola",
  role:        "Founder, Refacint Technologies",
  description: "Personal site of Afeez Adedamola — founder of Refacint Technologies, building software and AI solutions for African businesses.",
  tagline:     "",
  url:         siteUrl,
  agencyUrl:   "https://refacint.com",
  email:       "hello@refacint.com",
  ogImage:     "/og.png",
} as const;
