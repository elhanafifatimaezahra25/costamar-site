"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Fade + 24px translate-Y reveal, triggered once on scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? undefined : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE_PREMIUM }}
    >
      {children}
    </motion.div>
  );
}

/** Staggers its direct motion children by 80ms, per the locked motion spec. */
export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const item: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_PREMIUM } },
  };

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

/** Word-by-word headline reveal ("splittext-reveal" in the motion spec). */
export function SplitTextReveal({
  text,
  className,
  as: Tag = "h2",
  goldWords = [],
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  /** Words (case-insensitive, punctuation-stripped) rendered in gold. */
  goldWords?: string[];
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.04 } },
  };
  const word: Variants = {
    hidden: { opacity: 0, y: "0.4em" },
    show: {
      opacity: 1,
      y: "0em",
      transition: { duration: 0.7, ease: EASE_PREMIUM },
    },
  };

  if (reduced) {
    const Plain = Tag;
    return <Plain className={className}>{text}</Plain>;
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      style={{ overflow: "hidden" }}
    >
      <Tag className="m-0 inline">
        {words.map((w, i) => {
          const bare = w.replace(/[.,!?'']/g, "").toLowerCase();
          const isGold = goldWords.some((g) => g.toLowerCase() === bare);
          return (
            <span key={i} style={{ display: "inline-block", overflow: "hidden" }}>
              <motion.span
                variants={word}
                style={{ display: "inline-block" }}
                className={isGold ? "text-[var(--color-gold)]" : undefined}
              >
                {w}
                {i < words.length - 1 ? "\u00A0" : ""}
              </motion.span>
            </span>
          );
        })}
      </Tag>
    </motion.div>
  );
}
