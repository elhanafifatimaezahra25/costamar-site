import Image from "next/image";
import { Reveal, SplitTextReveal } from "@/components/ui/Reveal";
import { IMG } from "@/lib/images";

export default function Intro() {
  return (
    <section className="section-pad bg-[var(--color-bg)]">
      <div className="container-lux grid items-center gap-16 md:grid-cols-2">
        <div>
          <Reveal>
            <p className="eyebrow mb-6">Notre philosophie</p>
          </Reveal>
          <SplitTextReveal
            as="h2"
            text="Un art du soin, transmis depuis des générations."
            className="font-display text-4xl leading-tight text-[var(--color-fg)] md:text-5xl"
          />
          <Reveal delay={0.15} className="mt-8">
            <p className="max-w-md text-lg leading-relaxed text-[var(--color-fg-muted)]">
              Chez Costamar, chaque rituel puise dans la tradition marocaine du
              hammam — vapeur, savon noir, gant kessa — et la réinterprète avec
              la précision d&apos;un spa contemporain. Ici, le temps n&apos;est
              plus compté : il se savoure.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10 flex gap-12">
            <div>
              <p className="font-display text-4xl text-[var(--color-gold)]">15+</p>
              <p className="mt-1 text-sm text-[var(--color-fg-muted)]">années d&apos;expérience</p>
            </div>
            <div>
              <p className="font-display text-4xl text-[var(--color-gold)]">6</p>
              <p className="mt-1 text-sm text-[var(--color-fg-muted)]">rituels signature</p>
            </div>
            <div>
              <p className="font-display text-4xl text-[var(--color-gold)]">100%</p>
              <p className="mt-1 text-sm text-[var(--color-fg-muted)]">sur-mesure</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="photo-treated relative aspect-[4/5] w-full overflow-hidden rounded-sm">
            <Image
              src={IMG.introWelcome}
              alt="Salon d'accueil Costamar, thé à la fleur d'oranger sur plateau en laiton"
              fill
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
