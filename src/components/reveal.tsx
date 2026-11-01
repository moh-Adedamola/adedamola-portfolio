"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

// Single easing curve for the whole site — mirrors --ease-standard in globals.css
export const EASE_STANDARD = [0.4, 0, 0.2, 1] as const;

// Fires once when the element's top passes ~85% of the viewport height
const VIEWPORT = { once: true, margin: "0px 0px -15% 0px" } as const;

const TAGS = {
  div:     motion.div,
  section: motion.section,
  article: motion.article,
  ul:      motion.ul,
  li:      motion.li,
  p:       motion.p,
  h1:      motion.h1,
  h2:      motion.h2,
};

type Tag = keyof typeof TAGS;

interface RevealProps {
  as?: Tag;
  className?: string;
  children: React.ReactNode;
}

function useItemVariants(): Variants {
  const shouldReduceMotion = useReducedMotion();
  return {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.8, ease: EASE_STANDARD },
    },
  };
}

/** Fades + rises a single block into view once. */
export function Reveal({ as = "div", className, children }: RevealProps) {
  const variants = useItemVariants();
  const Comp = TAGS[as] as typeof motion.div;

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={variants}
    >
      {children}
    </Comp>
  );
}

/** Parent that staggers its <RevealItem> children into view once. */
export function RevealGroup({
  as = "div",
  className,
  children,
  stagger = 0.1,
}: RevealProps & { stagger?: number }) {
  const shouldReduceMotion = useReducedMotion();
  const Comp = TAGS[as] as typeof motion.div;

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: shouldReduceMotion ? 0 : stagger },
        },
      }}
    >
      {children}
    </Comp>
  );
}

/** Child of <RevealGroup>; inherits the group's hidden/visible state. */
export function RevealItem({ as = "div", className, children }: RevealProps) {
  const variants = useItemVariants();
  const Comp = TAGS[as] as typeof motion.div;

  return (
    <Comp className={className} variants={variants}>
      {children}
    </Comp>
  );
}
