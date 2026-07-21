import { getServicesSafe } from "@/lib/getServices";
import FeaturedTreatmentsClient from "./FeaturedTreatmentsClient";
import { Reveal } from "@/components/ui/Reveal";

export default async function FeaturedTreatments() {
  const { services } = await getServicesSafe();

  return (
    <section id="soins" className="section-pad bg-[var(--color-bg-inset)]">
      <div className="container-lux">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-6">Nos rituels</p>
          <h2 className="font-display text-4xl text-[var(--color-fg)] md:text-5xl">
            Des soins pensés comme des voyages
          </h2>
        </Reveal>

        <div className="mt-20">
          <FeaturedTreatmentsClient services={services.slice(0, 6)} />
        </div>
      </div>
    </section>
  );
}
