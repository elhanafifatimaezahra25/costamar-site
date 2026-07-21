"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { IMG } from "@/lib/images";
import { Reveal } from "@/components/ui/Reveal";

const CAPTIONS = [
  "Le salon principal",
  "Espace coiffure & lumière naturelle",
  "Thé à la menthe sur plateau ciselé",
  "Le hammam traditionnel",
  "Le patio pédicure",
  "Cabines de coiffure",
];

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);

  return (
    <section id="galerie" ref={ref} className="relative h-[300svh] bg-[var(--color-bg-inset)]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="container-lux mb-10">
          <Reveal>
            <p className="eyebrow mb-4">Galerie</p>
            <h2 className="font-display text-4xl text-[var(--color-fg)] md:text-5xl">
              Un lieu pensé pour l&apos;émerveillement
            </h2>
          </Reveal>
        </div>

        <motion.div className="flex gap-6 pl-6 md:pl-[calc((100vw-1280px)/2+32px)]" style={{ x }}>
          {IMG.gallery.map((src, i) => (
            <div
              key={i}
              className="photo-treated relative h-[50svh] w-[70vw] flex-shrink-0 overflow-hidden rounded-sm md:h-[60svh] md:w-[32vw]"
            >
              <Image
                src={src}
                alt={CAPTIONS[i % CAPTIONS.length]}
                fill
                className="object-cover"
              />
              <p className="absolute bottom-4 left-4 z-10 text-sm text-[var(--color-fg)]">
                {CAPTIONS[i % CAPTIONS.length]}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
