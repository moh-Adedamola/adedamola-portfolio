"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { FaLinkedin, FaXTwitter, FaGithub } from "react-icons/fa6";
import { Dialog as DialogPrimitive } from "radix-ui";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const navLinks = [
  { label: "Projects", href: "#work"       },
  { label: "Services", href: "#consulting" },
  { label: "Blog",     href: "#writing"    },
  { label: "Contact",  href: "#contact"    },
];

const socialLinks = [
  { label: "LinkedIn",      href: "https://www.linkedin.com/in/mohammed-adegbite-2a6990301/", Icon: FaLinkedin },
  { label: "X (Twitter)",   href: "https://x.com/adedamoh",                                    Icon: FaXTwitter },
  { label: "GitHub",        href: "https://github.com/moh-Adedamola",                          Icon: FaGithub   },
];

export function SiteHeader() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        "pointer-events-auto fixed top-0 left-0 right-0 z-50 w-full transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500",
        scrolled
          ? "border-b border-border bg-background/80 shadow-sm backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">

        <Link
          href="/"
          onClick={handleLogoClick}
          className="rounded-sm font-display font-semibold text-foreground transition-opacity outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Moh
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm">
            <a href="#contact">Work with me</a>
          </Button>
        </div>

        {/* Mobile right */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
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
                      className="fixed inset-0 z-40 overflow-y-auto bg-background pt-16 outline-none"
                    >
                      <DialogPrimitive.Title className="sr-only">
                        Navigation menu
                      </DialogPrimitive.Title>

                      <div className="flex flex-col px-6 py-8">

                        <nav className="flex flex-col" aria-label="Mobile navigation">
                          {navLinks.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              onClick={handleNavClick}
                              className="group flex items-center justify-between border-b border-border py-4 font-display text-lg font-bold text-foreground outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            >
                              {link.label}
                              <ArrowRight
                                className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
                                aria-hidden="true"
                              />
                            </a>
                          ))}
                        </nav>

                        <a
                          href="#contact"
                          onClick={handleNavClick}
                          className="mt-6 block rounded-full bg-primary px-6 py-4 text-center font-semibold text-primary-foreground outline-none transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                          Work with me
                        </a>

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
