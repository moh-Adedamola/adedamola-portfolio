import { ArrowRight } from "lucide-react";
import { FaLinkedin, FaXTwitter, FaGithub } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";

const navLinks = [
  { label: "Projects", href: "#work"       },
  { label: "Services", href: "#consulting" },
  { label: "Blog",     href: "#writing"    },
  { label: "Contact",  href: "#contact"    },
];

const socialLinks = [
  { label: "LinkedIn",    href: "https://www.linkedin.com/in/mohammed-adegbite-2a6990301/", Icon: FaLinkedin },
  { label: "X (Twitter)", href: "https://x.com/adedamoh",                                    Icon: FaXTwitter },
  { label: "GitHub",      href: "https://github.com/moh-Adedamola",                          Icon: FaGithub   },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">

          {/* Founder line */}
          <div className="space-y-3">
            <p className="font-display font-semibold text-foreground">MOH</p>
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
              , a  software and AI agency.
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
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <ArrowRight
                      className="size-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden="true"
                    />
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
            <div className="flex gap-2 pt-1">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full text-muted-foreground outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Icon className="size-5" aria-hidden="true" />
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
          <span>© {year} Moh. All rights reserved.</span>
          {/* <span>
            Built by{" "}
            <a
              href="https://refacint.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Refacint Technologies
            </a>
          </span> */}
        </div>
      </div>
    </footer>
  );
}
