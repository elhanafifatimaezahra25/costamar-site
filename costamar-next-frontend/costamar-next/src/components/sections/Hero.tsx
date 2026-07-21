"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IMG } from "@/lib/images";

const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden">
      <motion.div
        className="absolute inset-0 photo-treated"
        style={{ y: imgY }}
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE_PREMIUM }}
      >
        <Image
          src={IMG.heroBg}
          alt="Plafond étoilé et marbre du hammam traditionnel Costamar"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          className="eyebrow mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: EASE_PREMIUM }}
        >
          Hammam &amp; Spa de Luxe — Casablanca
        </motion.p>

        <motion.h1
          className="font-display max-w-4xl text-5xl leading-[1.05] text-[var(--color-fg)] md:text-8xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: EASE_PREMIUM }}
        >
          Le temps s&apos;arrête, <br className="hidden md:block" />
          votre corps respire.
        </motion.h1>

        <motion.p
          className="mt-8 max-w-xl text-lg text-[var(--color-fg-muted)] md:text-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: EASE_PREMIUM }}
        >
          Un sanctuaire où rituels ancestraux et soins contemporains se
          rencontrent, pour une parenthèse de sérénité absolue.
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.9, ease: EASE_PREMIUM }}
        >
          <Button href="/reservation">Réserver votre rituel</Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-[var(--color-fg-muted)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={22} />
        </motion.div>
      </motion.div>
    </section>
  );
}
