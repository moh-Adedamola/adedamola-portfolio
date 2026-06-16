import { Separator } from "@/components/ui/separator";

const navLinks = [
  { label: "Work",       href: "#work"       },
  { label: "Consulting", href: "#consulting" },
  { label: "Writing",    href: "#writing"    },
  { label: "Contact",    href: "#contact"    },
];

// TODO(content): replace "#" with real profile URLs
// Brand icons can be added (react-icons or inline SVG) once URLs are confirmed.
const socialLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "X",        href: "#" },
  { label: "GitHub",   href: "#" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">

          {/* Founder line */}
          <div className="space-y-3">
            <p className="font-display font-semibold text-foreground">Afeez</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Founder of{" "}
              <a
                href="https://refacint.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 transition-colors hover:text-primary"
              >
                Refacint Technologies
              </a>
              , a Lagos-based software and AI agency.
            </p>
          </div>

          {/* Section nav */}
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Navigate
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + socials */}
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Get in touch
            </p>
            <a
              href="mailto:hello@refacint.com"
              className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              hello@refacint.com
            </a>
            <div className="flex gap-4 pt-1">
              {socialLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      <Separator />

      {/* Bottom bar */}
      <div className="mx-auto max-w-6xl px-4 py-4 md:px-6">
        <div className="flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <span>© {year} Afeez. All rights reserved.</span>
          <span>
            Built by{" "}
            <a
              href="https://refacint.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Refacint Technologies
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
