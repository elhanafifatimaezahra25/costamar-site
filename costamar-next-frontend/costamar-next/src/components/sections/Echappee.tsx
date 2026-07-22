import Image from "next/image";
import { Reveal, SplitTextReveal } from "@/components/ui/Reveal";
import { IMG } from "@/lib/images";

export default function Echappee() {
  return (
    <section id="echappee" className="section-pad bg-[var(--color-bg)]">
      <div className="container-lux grid items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="eyebrow-numbered mb-8">01 / L&apos;Échappée</p>
          </Reveal>
          <SplitTextReveal
            as="h2"
            text="Ralentir. Laisser la vapeur envelopper le corps, le soin libérer l'esprit."
            goldWords={["vapeur", "soin"]}
            className="font-headline text-4xl text-[var(--color-fg)] sm:text-5xl lg:text-6xl"
          />
          <Reveal delay={0.2} className="mt-8">
            <p className="max-w-md text-lg leading-relaxed text-[var(--color-fg-muted)]">
              Chez Costamar, chaque rituel puise dans la tradition marocaine du
              hammam — vapeur, savon noir, gant kessa — et la réinterprète avec
              la précision d&apos;un spa contemporain. Ici, le temps n&apos;est
              plus compté : il se savoure.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="photo-treated relative aspect-[4/5] w-full overflow-hidden rounded-sm">
            <Image
              src={IMG.treatmentCards[4]}
              alt="Rituel capillaire au bac de lavage, salon Costamar"
              fill
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
