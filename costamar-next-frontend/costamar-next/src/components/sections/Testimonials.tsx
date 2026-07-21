import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sofia M.",
    text: "Un moment suspendu dans le temps. Le rituel Impérial est d'une justesse rare — jamais je n'avais ressenti une telle détente.",
  },
  {
    name: "Karim B.",
    text: "L'attention portée aux détails, du thé d'accueil au massage final, place Costamar largement au-dessus des spas que j'ai connus.",
  },
  {
    name: "Yasmine R.",
    text: "La privatisation signature a transformé mon anniversaire en souvenir inoubliable. Un vrai sanctuaire au cœur de Casablanca.",
  },
];

export default function Testimonials() {
  return (
    <section className="section-pad bg-[var(--color-bg-inset)]">
      <div className="container-lux">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-6">Paroles de clients</p>
          <h2 className="font-display text-4xl text-[var(--color-fg)] md:text-5xl">
            Une expérience qui marque
          </h2>
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <StaggerItem
              key={t.name}
              className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg)] p-10"
            >
              <Quote className="text-[var(--color-gold)]" size={28} strokeWidth={1.5} />
              <p className="mt-6 text-[var(--color-fg-muted)] leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="font-display mt-8 text-xl text-[var(--color-fg)]">
                {t.name}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
