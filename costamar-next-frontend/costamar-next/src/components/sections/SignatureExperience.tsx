"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { IMG } from "@/lib/images";

const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

const STAGES = [
  {
    number: "I",
    title: "L'accueil",
    text: "Thé à la fleur d'oranger, ambiance tamisée : le rituel commence bien avant le soin.",
    image: IMG.signature.accueil,
    alt: "Salon d'accueil Costamar, thé marocain sur plateau en laiton",
  },
  {
    number: "II",
    title: "La vapeur",
    text: "Le hammam traditionnel ouvre les pores et prépare le corps à recevoir le soin.",
    image: IMG.signature.vapeur,
    alt: "Banc en marbre du hammam traditionnel Costamar, éclairage chaud",
  },
  {
    number: "III",
    title: "Le gommage",
    text: "Savon noir et gant kessa : la peau retrouve sa douceur d'origine.",
    image: IMG.signature.gommage,
    alt: "Table de gommage en marbre du hammam Costamar avec bols traditionnels",
  },
  {
    number: "IV",
    title: "Le massage",
    text: "Huiles chaudes et gestes précis dénouent les dernières tensions.",
    image: IMG.signature.massage,
    alt: "Couloir en marbre menant aux cabines de massage privées",
  },
];

export default function SignatureExperience() {
  const [active, setActive] = useState(0);

  return (
    <section id="experience" className="section-pad bg-[var(--color-bg-inset)]">
      <div className="container-lux grid gap-16 lg:grid-cols-2 lg:items-center">
        <div className="photo-treated relative aspect-[4/5] overflow-hidden rounded-sm lg:sticky lg:top-32">
          <AnimatePresence mode="sync">
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: EASE_PREMIUM }}
            >
              <Image
                src={STAGES[active].image}
                alt={STAGES[active].alt}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow mb-4">L&apos;expérience signature</p>
            <h2 className="font-display text-4xl text-[var(--color-fg)] md:text-5xl">
              Parcours bien-être
            </h2>
            <p className="mt-4 max-w-md text-[var(--color-fg-muted)]">
              Un enchaînement orchestré au millimètre pour garantir une
              déconnexion totale dès votre arrivée.
            </p>
          </Reveal>

          <StaggerGroup className="mt-12 space-y-10">
            {STAGES.map((stage, i) => (
              <StaggerItem key={stage.number}>
                <motion.div
                  onViewportEnter={() => setActive(i)}
                  viewport={{ margin: "-45% 0px -45% 0px" }}
                  className={`flex gap-6 border-b border-[var(--color-border)] pb-10 transition-opacity duration-500 last:border-0 last:pb-0 ${
                    active === i ? "opacity-100" : "opacity-60"
                  }`}
                >
                  <span className="font-display text-2xl text-[var(--color-gold)]">
                    {stage.number}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-[var(--color-fg)]">
                      {stage.title}
                    </h3>
                    <p className="mt-2 text-[var(--color-fg-muted)]">{stage.text}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
