"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { LogoStacked } from "@/components/Logo";
import { Marquee } from "@/components/ui/Marquee";

const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex h-[100svh] w-full flex-col overflow-hidden"
    >
      <motion.div className="tadelakt-texture absolute inset-0" style={{ y: bgY }} />

      <motion.div
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center"
        style={{ opacity: contentOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE_PREMIUM }}
        >
          <LogoStacked className="h-40 w-auto sm:h-52" />
        </motion.div>

        <motion.p
          className="mt-8 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-gold)] sm:text-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: EASE_PREMIUM }}
        >
          Hammam &amp; Spa Privé — Tétouan
        </motion.p>
      </motion.div>

      <motion.div
        className="relative z-10 hidden items-center justify-center gap-2 pb-6 text-[var(--color-fg-muted)] sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-xs uppercase tracking-[0.3em]">Défiler</span>
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>

      <div className="relative z-10 border-t border-[var(--color-fg)]/10 bg-black/10 py-4 backdrop-blur-sm">
        <Marquee />
      </div>
    </section>
  );
}
