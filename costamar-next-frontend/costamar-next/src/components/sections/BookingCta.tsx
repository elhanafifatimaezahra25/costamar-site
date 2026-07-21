import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { IMG } from "@/lib/images";

export default function BookingCta() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="photo-treated absolute inset-0">
        <Image
          src={IMG.heroCtaBookend}
          alt="Plafond étoilé du hammam Costamar"
          fill
          className="object-cover"
        />
      </div>

      <div className="container-lux relative z-10 flex justify-center">
        <Reveal className="w-full max-w-2xl">
          <div className="rounded-sm border border-[var(--color-gold)]/30 bg-[var(--color-bg)]/60 p-12 text-center backdrop-blur-md md:p-16">
            <p className="eyebrow mb-6">Réservation instantanée</p>
            <h2 className="font-display text-4xl text-[var(--color-fg)] md:text-5xl">
              Offrez-vous cette parenthèse
            </h2>
            <p className="mt-6 text-[var(--color-fg-muted)]">
              Choisissez votre soin, votre date et votre créneau — sans compte,
              sans attente. Votre place vous est réservée instantanément.
            </p>
            <div className="mt-10 flex justify-center">
              <Button href="/reservation">Réserver maintenant</Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
