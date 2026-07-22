"use client";

import { motion } from "framer-motion";
import { Reveal, SplitTextReveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";

const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];
const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const FIGURES = [
  {
    value: 100,
    label: "Produits organiques & naturels",
    text: "Une sélection rigoureuse d'ingrédients purs, sans compromis.",
  },
  {
    value: 98,
    label: "Praticiennes & thérapeutes certifiées",
    text: "Un savoir-faire formé aux techniques les plus exigeantes.",
  },
  {
    value: 99,
    label: "Satisfaction clientèle",
    text: "Une expérience pensée pour dépasser chaque attente.",
  },
];

function Ring({ value }: { value: number }) {
  const offset = CIRCUMFERENCE * (1 - value / 100);

  return (
    <div className="relative h-36 w-36 shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="2"
        />
        <motion.circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          initial={{ strokeDashoffset: CIRCUMFERENCE }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 1.4, ease: EASE_PREMIUM }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-3xl text-[var(--color-fg)]">
          {value}
          <span className="text-lg text-[var(--color-fg-muted)]">%</span>
        </span>
      </div>
    </div>
  );
}

export default function KeyFigures() {
  return (
    <section className="section-pad bg-[var(--color-bg-inset)]">
      <div className="container-lux">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-6">Rigueur opérationnelle</p>
        </Reveal>
        <SplitTextReveal
          as="h2"
          text="Une exigence portée jusque dans le détail."
          goldWords={["jusque", "dans", "le", "détail."]}
          className="font-headline mx-auto max-w-3xl text-center text-4xl text-[var(--color-fg)] sm:text-5xl"
        />

        <StaggerGroup className="mt-16 grid gap-10 sm:grid-cols-3">
          {FIGURES.map((f) => (
            <StaggerItem
              key={f.label}
              className="flex flex-col items-center text-center"
            >
              <Ring value={f.value} />
              <h3 className="font-display mt-6 text-lg text-[var(--color-fg)]">
                {f.label}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-fg-muted)]">{f.text}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
