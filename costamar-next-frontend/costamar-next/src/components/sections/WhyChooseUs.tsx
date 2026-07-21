import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Sparkles, Leaf, Clock, Heart } from "lucide-react";

const REASONS = [
  {
    icon: Sparkles,
    title: "Savoir-faire ancestral",
    text: "Des rituels transmis de génération en génération, exécutés par des mains expertes.",
  },
  {
    icon: Leaf,
    title: "Ingrédients purs",
    text: "Huiles d'argan, savon noir et eau de rose sélectionnés auprès d'artisans marocains.",
  },
  {
    icon: Clock,
    title: "Un temps qui vous appartient",
    text: "Aucune précipitation : chaque soin est pensé pour respecter votre propre rythme.",
  },
  {
    icon: Heart,
    title: "Attention sur-mesure",
    text: "Chaque protocole est ajusté à votre peau, votre énergie et vos envies du moment.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-pad bg-[var(--color-bg)]">
      <div className="container-lux">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-6">Pourquoi Costamar</p>
          <h2 className="font-display text-4xl text-[var(--color-fg)] md:text-5xl">
            L&apos;excellence dans chaque détail
          </h2>
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r) => (
            <StaggerItem
              key={r.title}
              className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-8 transition-colors hover:border-[var(--color-gold)]/40"
            >
              <r.icon className="text-[var(--color-gold)]" size={28} strokeWidth={1.5} />
              <h3 className="font-display mt-6 text-2xl text-[var(--color-fg)]">
                {r.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                {r.text}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
