"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import type { SpaService } from "@/lib/api";
import { pickServiceImage } from "@/lib/images";
import { Reveal, SplitTextReveal } from "@/components/ui/Reveal";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
const TAGS = ["Signature", "Intense", "Douceur", "Sculptant", "Ressourçant", "Éclat"];

export default function RituelsSignatureClient({ services }: { services: SpaService[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-68%"]);
  const categoryCounts: Record<string, number> = {};
  const cards = services.slice(0, 6);

  return (
    <section id="rituels" ref={ref} className="relative h-[320svh] bg-[var(--color-bg-inset)]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="container-lux mb-10">
          <Reveal>
            <p className="eyebrow-numbered mb-6">02 / Rituels Signature</p>
          </Reveal>
          <SplitTextReveal
            as="h2"
            text="Un geste, une transformation."
            goldWords={["transformation."]}
            className="font-headline text-4xl text-[var(--color-fg)] sm:text-5xl lg:text-6xl"
          />
          <Reveal delay={0.15} className="mt-6 max-w-lg">
            <p className="text-[var(--color-fg-muted)]">
              Chaque rituel est une chorégraphie sensorielle, pensée dans les
              moindres détails pour sublimer chaque forme, apaiser chaque
              tension et révéler l&apos;éclat naturel de votre peau.
            </p>
          </Reveal>
        </div>

        <motion.div
          className="flex gap-6 pl-6 md:pl-[calc((100vw-1280px)/2+32px)]"
          style={{ x }}
        >
          {cards.map((s, i) => (
            <Link
              key={s.id}
              href={`/reservation?service=${s.id}`}
              className="group w-[78vw] flex-shrink-0 sm:w-[42vw] lg:w-[24vw]"
            >
              <div className="photo-treated relative aspect-[3/4] overflow-hidden rounded-sm">
                <Image
                  src={s.imageUrl || pickServiceImage(s, categoryCounts)}
                  alt={s.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute right-4 top-4 z-10 font-display text-2xl text-[var(--color-fg)]">
                  {ROMAN[i % ROMAN.length]}
                </span>
              </div>
              <div className="mt-5">
                <h3 className="font-headline text-lg text-[var(--color-fg)] sm:text-xl">
                  {s.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-[var(--color-fg-muted)]">
                  {s.description}
                </p>
                <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3 py-1 text-xs uppercase tracking-wide text-[var(--color-gold)]">
                  {s.durationMinutes} min · {TAGS[i % TAGS.length]}
                </p>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
