import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { getServicesSafe } from "@/lib/getServices";
import { pickServiceImage } from "@/lib/images";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Nos soins — Costamar Hammam & Spa",
};

const CATEGORY_LABELS: Record<string, string> = {
  SPA_MASSAGE: "Spa & Massage",
  SOINS: "Soins",
  BEAUTE: "Beauté",
  HAMMAM_PRIVE: "Hammam",
};

export default async function SoinsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const { services: allServices } = await getServicesSafe();
  const services = category
    ? allServices.filter((s) => s.category === category)
    : allServices;
  const categoryCounts: Record<string, number> = {};

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--color-bg)] pt-32 pb-24">
        <div className="container-lux">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-4">Nos rituels</p>
            <h1 className="font-display text-4xl text-[var(--color-fg)] md:text-5xl">
              {category ? CATEGORY_LABELS[category] ?? "La carte des soins" : "La carte des soins"}
            </h1>
          </Reveal>

          <Reveal className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/soins"
              className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                !category
                  ? "border-[var(--color-gold)] text-[var(--color-gold)]"
                  : "border-[var(--color-border)] text-[var(--color-fg-muted)] hover:border-[var(--color-gold)]"
              }`}
            >
              Tous les soins
            </Link>
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <Link
                key={key}
                href={`/soins?category=${key}`}
                className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                  category === key
                    ? "border-[var(--color-gold)] text-[var(--color-gold)]"
                    : "border-[var(--color-border)] text-[var(--color-fg-muted)] hover:border-[var(--color-gold)]"
                }`}
              >
                {label}
              </Link>
            ))}
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 0.1}>
                <div className="group overflow-hidden rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)]">
                  <div className="photo-treated relative aspect-[4/3]">
                    <Image
                      src={s.imageUrl || pickServiceImage(s, categoryCounts)}
                      alt={s.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="eyebrow mb-2">
                      {s.durationMinutes} min · {s.price} MAD
                    </p>
                    <h3 className="font-display text-2xl text-[var(--color-fg)]">{s.name}</h3>
                    <p className="mt-2 text-sm text-[var(--color-fg-muted)] line-clamp-3">
                      {s.description}
                    </p>
                    <Link
                      href={`/reservation?service=${s.id}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-gold)] hover:opacity-70"
                    >
                      Réserver <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
