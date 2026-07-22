import { Reveal } from "@/components/ui/Reveal";
import { MapPin, Phone, Mail } from "lucide-react";

const HOURS = [
  { day: "Lundi – Vendredi", time: "9h30 – 19h30" },
  { day: "Samedi", time: "9h30 – 19h30" },
  { day: "Dimanche", time: "Fermé" },
];

export default function ContactSection() {
  return (
    <section id="contact" className="section-pad bg-[var(--color-bg)]">
      <div className="container-lux grid gap-16 md:grid-cols-2">
        <Reveal>
          <p className="eyebrow mb-6">Contact &amp; Accès</p>
          <h2 className="font-display text-4xl text-[var(--color-fg)] md:text-5xl">
            Venez respirer chez nous
          </h2>

          <div className="mt-10 space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 text-[var(--color-gold)]" size={20} />
              <div>
                <p className="text-[var(--color-fg)]">Avenue de la Corniche, Tétouan, Maroc</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-[var(--color-gold)]" size={20} />
              <p className="text-[var(--color-fg)]">+212 (0) 639 XX XX XX</p>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-[var(--color-gold)]" size={20} />
              <p className="text-[var(--color-fg)]">contact@costamarspa.ma</p>
            </div>
          </div>

          <div className="mt-10 border-t border-[var(--color-border)] pt-8">
            <p className="eyebrow mb-4">Horaires</p>
            <ul className="space-y-2">
              {HOURS.map((h) => (
                <li key={h.day} className="flex justify-between text-sm text-[var(--color-fg-muted)]">
                  <span>{h.day}</span>
                  <span className="text-[var(--color-fg)]">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="h-full min-h-[420px] overflow-hidden rounded-sm border border-[var(--color-border)] grayscale invert-[0.92] contrast-125">
            <iframe
              title="Localisation Costamar Hammam & Spa"
              className="h-full w-full min-h-[420px] border-0"
              loading="lazy"
              src="https://www.google.com/maps?q=Avenue%20de%20la%20Corniche%2C%20T%C3%A9touan%2C%20Maroc&output=embed"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
