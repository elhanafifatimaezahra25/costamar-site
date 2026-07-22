import Image from "next/image";
import { Reveal, SplitTextReveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/Logo";
import { IMG } from "@/lib/images";

export default function Sanctuaire() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg)]">
      <div className="grid lg:grid-cols-2">
        <div className="section-pad flex flex-col justify-center">
          <div className="container-lux lg:pr-0">
            <Reveal>
              <p className="eyebrow mb-6">Hammam &amp; Spa</p>
            </Reveal>
            <SplitTextReveal
              as="h2"
              text="Un lieu pensé pour disparaître."
              className="font-headline text-4xl text-[var(--color-fg)] sm:text-5xl lg:text-6xl"
            />
            <Reveal delay={0.2} className="mt-8 max-w-md">
              <p className="text-lg leading-relaxed text-[var(--color-fg-muted)]">
                Lumière tamisée, tadelakt et or, le silence enveloppant de la
                vapeur — chaque détail de Costamar est pensé pour vous faire
                oublier le monde extérieur.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-10">
              <Button href="/soins" variant="goldOutline" className="!px-8 !py-3.5 !text-sm">
                Découvrir nos rituels
              </Button>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1} className="photo-treated relative min-h-[420px]">
          <Image
            src={IMG.signature.massage}
            alt="Couloir en marbre du sanctuaire Costamar"
            fill
            className="object-cover"
          />
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <LogoMark className="h-24 w-auto text-[var(--color-fg)] opacity-95 drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] sm:h-32" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
