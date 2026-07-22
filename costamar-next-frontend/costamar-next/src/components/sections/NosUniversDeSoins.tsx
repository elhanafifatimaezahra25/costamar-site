"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/Logo";
import { IMG } from "@/lib/images";

const UNIVERS = [
  {
    number: "01",
    label: "Spa & Massage",
    category: "SPA_MASSAGE",
    image: IMG.treatmentCards[0],
    description:
      "Des rituels sur-mesure aux huiles précieuses pour dénouer les tensions en profondeur.",
  },
  {
    number: "02",
    label: "Soins",
    category: "SOINS",
    image: IMG.treatmentCards[3],
    description:
      "Bains d'huiles rituels et protocoles profonds pour sublimer et nourrir la fibre capillaire.",
  },
  {
    number: "03",
    label: "Beauté",
    category: "BEAUTE",
    image: IMG.treatmentCards[2],
    description: "Manucure, pédicure et rituels de beauté pour sublimer chaque détail.",
  },
  {
    number: "04",
    label: "Hammam",
    category: "HAMMAM_PRIVE",
    image: IMG.signature.gommage,
    description:
      "L'expérience ancestrale du hammam marocain — vapeur et savon noir pour une peau neuve.",
  },
];

export default function NosUniversDeSoins() {
  const [active, setActive] = useState(0);
  const main = UNIVERS[active];

  return (
    <section id="univers" className="section-pad bg-[var(--color-bg-inset)]">
      <div className="container-lux">
        <Reveal>
          <p className="eyebrow-numbered mb-10">Nos univers de soins</p>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          <Reveal className="lg:row-span-1">
            <Link
              href={`/soins?category=${main.category}`}
              className="photo-treated group relative block aspect-[4/3] w-full overflow-hidden rounded-sm lg:aspect-auto lg:h-full lg:min-h-[520px]"
            >
              <Image
                src={main.image}
                alt={main.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute left-1/2 top-10 z-10 -translate-x-1/2">
                <LogoMark className="h-20 w-auto text-[var(--color-fg)] opacity-90 drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]" />
              </div>
              <div className="absolute inset-x-0 bottom-0 z-10 p-8">
                <p className="text-xs font-semibold text-[var(--color-gold)]">{main.number}</p>
                <h3 className="font-headline mt-2 text-3xl text-[var(--color-fg)] sm:text-4xl">
                  {main.label}
                </h3>
                <p className="mt-3 max-w-sm text-sm text-[var(--color-fg-muted)]">
                  {main.description}
                </p>
              </div>
            </Link>
          </Reveal>

          <div className="grid gap-4 lg:gap-6">
            {UNIVERS.map((u, i) => (
              <Reveal key={u.category} delay={i * 0.08}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="w-full text-left"
                >
                  <Link
                    href={`/soins?category=${u.category}`}
                    className={`photo-treated group relative block h-32 w-full overflow-hidden rounded-sm transition-all duration-500 sm:h-36 ${
                      active === i ? "ring-1 ring-[var(--color-gold)]" : ""
                    }`}
                  >
                    <Image
                      src={u.image}
                      alt={u.label}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 z-10 flex items-center justify-between p-6">
                      <div>
                        <p className="text-xs font-semibold text-[var(--color-gold)]">
                          {u.number}
                        </p>
                        <h3 className="font-headline mt-1 text-xl text-[var(--color-fg)] sm:text-2xl">
                          {u.label}
                        </h3>
                      </div>
                      <motion.span
                        animate={{ x: active === i ? 4 : 0 }}
                        className="text-[var(--color-gold)]"
                      >
                        →
                      </motion.span>
                    </div>
                  </Link>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
