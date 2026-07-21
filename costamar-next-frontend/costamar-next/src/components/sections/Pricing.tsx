"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Check } from "lucide-react";

const PACKAGES = [
  {
    name: "Découverte",
    price: "220",
    duration: "45 min",
    features: ["Gommage au savon noir", "Gant kessa", "Thé à la fleur d'oranger"],
    featured: false,
  },
  {
    name: "Signature",
    price: "450",
    duration: "90 min",
    features: [
      "Rituel Impérial complet",
      "Gommage + massage aux huiles chaudes",
      "Soin du visage express",
      "Salon de thé privatif",
    ],
    featured: true,
  },
  {
    name: "Privatisation",
    price: "650",
    duration: "120 min",
    features: [
      "Espace hammam privatisé",
      "Protocole entièrement sur-mesure",
      "Massage duo possible",
      "Collation gastronomique",
    ],
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section className="section-pad bg-[var(--color-bg)]">
      <div className="container-lux">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-6">Formules</p>
          <h2 className="font-display text-4xl text-[var(--color-fg)] md:text-5xl">
            Choisissez votre parenthèse
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col rounded-sm p-10 ${
                pkg.featured
                  ? "border border-[var(--color-gold)] bg-[var(--color-bg-raised)] shadow-[0_30px_60px_-30px_rgba(201,169,106,0.25)]"
                  : "border border-[var(--color-border)] bg-[var(--color-bg-raised)]"
              }`}
            >
              {pkg.featured && (
                <p className="eyebrow mb-4">Le plus choisi</p>
              )}
              <h3 className="font-display text-3xl text-[var(--color-fg)]">{pkg.name}</h3>
              <p className="mt-2 text-sm text-[var(--color-fg-muted)]">{pkg.duration}</p>
              <p className="mt-6 font-display text-5xl text-[var(--color-fg)]">
                {pkg.price} <span className="text-lg text-[var(--color-fg-muted)]">MAD</span>
              </p>

              <ul className="mt-8 flex-1 space-y-4">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-[var(--color-fg-muted)]">
                    <Check size={16} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/reservation"
                className={`mt-10 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all ${
                  pkg.featured
                    ? "bg-[var(--color-gold)] text-[var(--color-bg-inset)] hover:brightness-110"
                    : "border border-[var(--color-border)] text-[var(--color-fg)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                }`}
              >
                Réserver
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
