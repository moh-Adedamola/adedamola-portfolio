"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { FaLinkedin, FaXTwitter, FaGithub } from "react-icons/fa6";
import { Dialog as DialogPrimitive } from "radix-ui";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FounderAvatar } from "@/components/founder-avatar";

const navLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Blog",     href: "/blog"     },
  { label: "Contact",  href: "/contact"  },
];

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const socialLinks = [
  { label: "LinkedIn",      href: "https://www.linkedin.com/in/mohammed-adegbite-2a6990301/", Icon: FaLinkedin },
  { label: "X (Twitter)",   href: "https://x.com/adedamoh",                                    Icon: FaXTwitter },
  { label: "GitHub",        href: "https://github.com/moh-Adedamola",                          Icon: FaGithub   },
];

export function SiteHeader() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Radix's modal Dialog blocks pointer events on the rest of the page via
  // `document.body.style.pointerEvents = "none"` but doesn't lock scroll
  // here (no Overlay is rendered), so the background can still be scrolled
  // behind the full-screen menu. Lock/restore it manually.
  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  // Clicking the logo while already on "/" doesn't trigger Next.js's
  // scroll-to-top (no navigation occurs), so do it explicitly.
  function handleLogoClick() {
    if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
  }

  function handleNavClick() {
    setMobileOpen(false);
  }

  return (
    <motion.header
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      }
      className={cn(
        // Radix's modal Dialog sets `pointer-events: none` on <body> while
        // open to block interaction with the rest of the page. The header
        // lives outside the Dialog's portal, so it inherits that `none` and
        // becomes visible-but-unclickable unless explicitly re-enabled here.
        "ground-ink pointer-events-auto fixed top-0 left-0 right-0 z-50 w-full bg-background/95 text-foreground backdrop-blur-xl transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500",
        scrolled
          ? "border-b border-border shadow-sm"
          : "border-b border-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">

        <Link
          href="/"
          onClick={handleLogoClick}
          aria-label="MOH, back to top"
          className="group inline-flex items-center gap-2.5 justify-self-start rounded-full pr-2 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <FounderAvatar size={32} eager className="size-8 ring-1 ring-border" />
          <span className="text-label font-medium uppercase tracking-[0.12em] transition-opacity group-hover:opacity-80">
            MOH
          </span>
        </Link>

        {/* Desktop nav — floating pill */}
        <nav
          className="hidden items-center gap-0.5 rounded-full border border-border bg-foreground/[0.04] p-1 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const isActive = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-1.5 text-label font-medium uppercase tracking-[0.12em] outline-none transition-colors duration-200 ease-standard focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-foreground/10 text-foreground"
                    : "text-muted-foreground hover:bg-foreground/[0.07] hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop right */}
        <div className="hidden justify-self-end md:flex">
          <Link
            href="/contact"
            className="group inline-flex h-9 items-center gap-1.5 rounded-md border border-foreground/25 px-3.5 text-label font-medium uppercase tracking-[0.12em] text-foreground outline-none transition-colors duration-200 ease-standard hover:border-foreground/50 hover:bg-foreground/[0.06] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Work with me
            <span
              className="inline-block transition-transform duration-200 ease-standard group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            >
              ↗
            </span>
          </Link>
        </div>

        {/* Mobile right */}
        <div className="flex items-center gap-1 md:hidden">
          <DialogPrimitive.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <DialogPrimitive.Trigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </DialogPrimitive.Trigger>

            <AnimatePresence>
              {mobileOpen && (
                <DialogPrimitive.Portal forceMount>
                  <DialogPrimitive.Content
                    forceMount
                    asChild
                    aria-describedby={undefined}
                    onInteractOutside={(event) => {
                      // The header (logo, theme toggle, close button) sits
                      // outside this full-screen Content, so Radix treats
                      // taps on it as "outside" and would otherwise close
                      // the menu. Each control already manages open state
                      // itself (or shouldn't close it, e.g. the toggle), so
                      // suppress the automatic dismiss-on-outside-click here.
                      event.preventDefault();
                    }}
                  >
                    <motion.div
                      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
                      className="ground-ink fixed inset-0 z-40 overflow-y-auto bg-background pt-16 text-foreground outline-none"
                    >
                      <DialogPrimitive.Title className="sr-only">
                        Navigation menu
                      </DialogPrimitive.Title>

                      <div className="flex flex-col px-6 py-8">

                        <nav className="flex flex-col" aria-label="Mobile navigation">
                          {navLinks.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={handleNavClick}
                              aria-current={isActivePath(pathname, link.href) ? "page" : undefined}
                              className="group flex items-center justify-between border-b border-border py-4 font-display text-h4 text-foreground outline-none transition-colors duration-300 ease-standard aria-[current=page]:text-primary hover:bg-foreground/[0.02] hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            >
                              {link.label}
                              <ArrowRight
                                className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 ease-standard group-hover:translate-x-0.5 group-hover:text-primary"
                                aria-hidden="true"
                              />
                            </Link>
                          ))}
                        </nav>

                        <Link
                          href="/contact"
                          onClick={handleNavClick}
                          className="mt-6 block rounded-md bg-primary px-6 py-4 text-center font-semibold text-primary-foreground outline-none transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                          Work with me
                        </Link>

                        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6">
                          <a
                            href="mailto:hello@refacint.com"
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                          >
                            hello@refacint.com
                          </a>
                          <div className="flex gap-2">
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
                    </motion.div>
                  </DialogPrimitive.Content>
                </DialogPrimitive.Portal>
              )}
            </AnimatePresence>
          </DialogPrimitive.Root>
        </div>

      </div>
    </motion.header>
  );
}
