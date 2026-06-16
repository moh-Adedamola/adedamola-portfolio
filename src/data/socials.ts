export interface Social {
  label: string;  // "LinkedIn", "X", "GitHub"
  href:  string;  // Absolute URL
  icon:  string;  // lucide icon name (note: lucide v1.x has no brand icons;
                  // swap href and add brand SVGs when URLs are confirmed)
}

// TODO(content): replace each href with your real profile URL.
// All three are placeholder "#" until confirmed.
export const socials: readonly Social[] = [
  { label: "LinkedIn", href: "#", icon: "Linkedin" },
  { label: "X",        href: "#", icon: "Twitter"  },
  { label: "GitHub",   href: "#", icon: "Github"   },
];
