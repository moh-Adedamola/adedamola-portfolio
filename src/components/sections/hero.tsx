"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { FounderAvatar } from "@/components/founder-avatar";
import { EASE_STANDARD } from "@/components/reveal";
import { site } from "@/data/site";

const CURRENTLY = ["AI assistants", "Web apps", "Portals & CRMs"];

const socialLinks = [
  { label: "GitHub",      href: "https://github.com/moh-Adedamola",                          Icon: FaGithub   },
  { label: "LinkedIn",    href: "https://www.linkedin.com/in/mohammed-adegbite-2a6990301/", Icon: FaLinkedin },
  { label: "X (Twitter)", href: "https://x.com/adedamoh",                                    Icon: FaXTwitter },
  { label: `Email ${site.email}`, href: `mailto:${site.email}`,                             Icon: FaEnvelope },
];

const TYPE_MS   = 70;
const DELETE_MS = 35;
const HOLD_MS   = 1800;

// Types each phrase out, holds, deletes, moves on. Reduced motion → the
// first phrase, static.
function useTypingCycle(items: string[], enabled: boolean) {
  const [index, setIndex]       = useState(0);
  const [length, setLength]     = useState(enabled ? 0 : items[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const word = items[index];
    let delay = deleting ? DELETE_MS : TYPE_MS;
    if (!deleting && length === word.length) delay = HOLD_MS;

    const id = window.setTimeout(() => {
      if (!deleting && length === word.length) {
        setDeleting(true);
      } else if (deleting && length === 0) {
        setDeleting(false);
        setIndex((i) => (i + 1) % items.length);
      } else {
        setLength((n) => n + (deleting ? -1 : 1));
      }
    }, delay);
    return () => window.clearTimeout(id);
  }, [enabled, items, index, length, deleting]);

  return enabled ? items[index].slice(0, length) : items[0];
}

const labelClass = "text-label font-medium uppercase tracking-[0.12em] text-muted-foreground";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const typed = useTypingCycle(CURRENTLY, !shouldReduceMotion);

  const container: Variants = {
    hidden: {},
    visible: {
      transition: shouldReduceMotion
        ? { staggerChildren: 0 }
        : { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const item: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.9, ease: EASE_STANDARD },
    },
  };

  return (
    <section
      id="hero"
      className="ground-ink bg-background text-foreground relative"
    >
      <motion.div
        className="shell pt-28 pb-10 md:pt-36 md:pb-12"
        initial="hidden"
        animate="visible"
        variants={container}
      >

        {/* Eyebrow */}
        <motion.p
          className="eyebrow font-medium text-eyebrow"
          variants={item}
        >
          {site.role}
        </motion.p>

        {/* Display headline — two lines, photo beside the second */}
        <motion.h1
          className="font-display text-hero text-foreground"
          variants={item}
        >
          <span className="block">Software</span>
          <span className="flex items-center gap-[0.18em]">
            Engineer
            <FounderAvatar
              size={120}
              eager
              alt={`Portrait of ${site.personName}`}
              className="size-[72px] ring-1 ring-border md:size-[120px]"
            />
          </span>
        </motion.h1>

        {/* Three-column strip */}
        <motion.div
          className="mt-14 grid border-t border-border md:mt-20 md:grid-cols-3"
          variants={item}
        >
          {/* Currently */}
          <div className="border-b border-border py-6 md:border-b-0 md:py-8 md:pr-8">
            <p className={labelClass}>Building now</p>
            <p className="mt-3 flex items-center gap-2.5 text-body text-foreground">
              <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              <span className="sr-only">{CURRENTLY.join(", ")}</span>
              <span aria-hidden="true" className="min-h-[1.625em]">
                {typed}
                <span className="ml-0.5 inline-block w-px translate-y-[0.15em] bg-foreground align-baseline motion-safe:animate-[caret_1s_steps(1)_infinite]" style={{ height: "1.05em" }} />
              </span>
            </p>
          </div>

          {/* About */}
          <div className="border-b border-border py-6 md:border-b-0 md:border-l md:px-8 md:py-8">
            <p className={labelClass}>In short</p>
            <p className="mt-3 text-body text-muted-foreground">
              {site.tagline}
            </p>
          </div>

          {/* Start here */}
          <div className="py-6 md:border-l md:border-border md:py-8 md:pl-8">
            <p className={labelClass}>Next step</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild size="lg" className="group">
                <Link href="/contact">
                  Work with me
                  <span className="transition-transform duration-200 ease-standard group-hover:translate-x-0.5" aria-hidden="true">→</span>
                </Link>
              </Button>
              <Link
                href="/projects"
                className="group inline-flex h-10 items-center gap-2 rounded-md border border-foreground/30 px-6 text-sm font-medium text-foreground outline-none transition-colors duration-200 ease-standard hover:border-foreground/60 hover:bg-foreground/[0.06] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                See my work
                <span className="transition-transform duration-200 ease-standard group-hover:translate-x-0.5" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Bottom row — socials + availability */}
        <motion.div
          className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6"
          variants={item}
        >
          <ul className="flex gap-2" aria-label="Social links">
            {socialLinks.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex size-10 items-center justify-center rounded-full border border-foreground/25 text-muted-foreground outline-none transition-colors duration-200 ease-standard hover:border-foreground/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>

          <p className={`flex items-center gap-2.5 ${labelClass}`}>
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full rounded-full bg-success opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            Available for new projects
          </p>
        </motion.div>

      </motion.div>
    </section>
  );
}
