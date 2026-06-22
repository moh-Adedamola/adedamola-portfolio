"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: shouldReduceMotion
        ? { staggerChildren: 0 }
        : { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const item: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.45, ease: [0.32, 0.72, 0, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] items-center bg-section-base"
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-24 text-center md:px-6 md:py-32">
        <motion.div
          className="flex flex-col items-center gap-6"
          initial="hidden"
          animate="visible"
          variants={container}
        >

          {/* Eyebrow */}
          <motion.p
            className="text-xs font-medium uppercase tracking-wider text-primary"
            variants={item}
          >
            {site.role}
          </motion.p>

          {/* Display headline */}
          <motion.h1
            className="font-display text-5xl font-bold tracking-tighter text-foreground md:text-7xl"
            variants={item}
          >
            {site.name}
          </motion.h1>

          {/* Positioning line — renders real copy when site.tagline is set;
              shows a clearly-marked placeholder until then */}
          {site.tagline ? (
            <motion.p
              className="max-w-xl text-lg leading-relaxed text-muted-foreground"
              variants={item}
            >
              {site.tagline}
            </motion.p>
          ) : (
            <motion.p
              className="max-w-xl rounded-lg border border-dashed border-border px-4 py-3 font-mono text-sm italic text-muted-foreground/50"
              variants={item}
            >
              {/* TODO(content): write your positioning one-liner in site.ts */}
              TODO(content): positioning one-liner
            </motion.p>
          )}

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
              className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              See my work →
            </a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
