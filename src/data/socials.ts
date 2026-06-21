export interface Social {
  label: string;  // "LinkedIn", "X", "GitHub"
  href:  string;  // Absolute URL
  icon:  string;  // lucide icon name (note: lucide v1.x has no brand icons;
                  // swap href and add brand SVGs when URLs are confirmed)
}

// TODO(content): replace each href with your real profile URL.
// All three are placeholder "#" until confirmed.
export const socials: readonly Social[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mohammed-adegbite-2a6990301/", icon: "Linkedin" },
  { label: "X",        href: "https://x.com/adedamoh",                                   icon: "Twitter"  },
  { label: "GitHub",   href: "https://github.com/moh-Adedamola",                         icon: "Github"   },
];
