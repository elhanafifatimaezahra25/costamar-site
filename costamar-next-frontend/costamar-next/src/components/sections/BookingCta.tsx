import { Reveal, SplitTextReveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Particles } from "@/components/ui/Particles";

export default function BookingCta() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg)] py-28 md:py-36">
      <Particles />

      <div className="container-lux relative z-10">
        <SplitTextReveal
          as="h2"
          text="Réservez votre instant suspendu."
          className="font-headline max-w-3xl text-4xl text-[var(--color-fg)] sm:text-6xl lg:text-7xl"
        />
        <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-6">
          <Button href="/reservation">Réserver maintenant</Button>
          <p className="max-w-xs text-sm text-[var(--color-fg-muted)]">
            Choisissez votre soin, votre date et votre créneau — sans compte,
            sans attente.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
