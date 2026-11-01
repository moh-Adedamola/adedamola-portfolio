"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import { EASE_STANDARD } from "@/components/reveal";
import { site } from "@/data/site";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

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
      className="relative flex min-h-[90vh] items-center bg-section-base"
    >
      <div className="shell py-24 text-center md:py-32">
        <motion.div
          className="mx-auto flex max-w-4xl flex-col items-center gap-6"
          initial="hidden"
          animate="visible"
          variants={container}
        >

          {/* Eyebrow */}
          <motion.p
            className="eyebrow mb-0 justify-center font-medium text-eyebrow"
            variants={item}
          >
            {site.role}
          </motion.p>

          {/* Display headline */}
          <motion.h1
            className="font-display text-hero text-foreground"
            variants={item}
          >
            {site.name}
          </motion.h1>

          {/* Positioning line */}
          <motion.p
            className="max-w-xl text-body text-muted-foreground"
            variants={item}
          >
            {site.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
            variants={item}
          >
            <Button asChild size="lg">
              <a href="#contact">Work with me</a>
            </Button>
            <a
              href="#work"
              className="group inline-flex items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              See my work
              <span
                className="inline-block transition-transform duration-200 ease-standard group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
