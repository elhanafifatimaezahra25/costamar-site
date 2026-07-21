"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { SpaService } from "@/lib/api";
import { pickServiceImage } from "@/lib/images";
import { ArrowUpRight } from "lucide-react";

export default function FeaturedTreatmentsClient({
  services,
}: {
  services: SpaService[];
}) {
  const categoryCounts: Record<string, number> = {};
  const images = services.map((s) => pickServiceImage(s, categoryCounts));

  return (
    <div className="relative">
      {services.map((service, i) => (
        <div
          key={service.id}
          className="sticky"
          style={{ top: `${96 + i * 16}px`, zIndex: i + 1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 grid overflow-hidden rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] md:grid-cols-2"
          >
            <div className="photo-treated relative h-64 md:h-full">
              <Image
                src={images[i]}
                alt={service.name}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="flex flex-col justify-center p-8 md:p-14">
              <p className="eyebrow mb-4">
                {service.durationMinutes} min · {service.price} MAD
              </p>
              <h3 className="font-display text-3xl text-[var(--color-fg)] md:text-4xl">
                {service.name}
              </h3>
              <p className="mt-4 max-w-md text-[var(--color-fg-muted)]">
                {service.description}
              </p>
              <Link
                href={`/reservation?service=${service.id}`}
                className="mt-8 inline-flex w-fit items-center gap-2 border-b border-[var(--color-gold)] pb-1 text-sm font-medium text-[var(--color-gold)] transition-opacity hover:opacity-70"
              >
                Réserver ce soin <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
