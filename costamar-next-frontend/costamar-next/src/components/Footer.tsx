import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-inset)]">
      <div className="container-lux grid gap-12 py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo
            className="text-[var(--color-fg)]"
            markClassName="h-11 w-auto shrink-0"
            tagline
          />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--color-fg-muted)]">
            Un sanctuaire de bien-être au cœur de Casablanca. Rituels de hammam,
            soins signature et massages sur-mesure, dans une atmosphère intemporelle.
          </p>
          <div className="mt-6 flex gap-4 text-sm text-[var(--color-fg-muted)]">
            <a href="#" className="hover:text-[var(--color-gold)]">Instagram</a>
            <a href="#" className="hover:text-[var(--color-gold)]">Facebook</a>
          </div>
        </div>

        <div>
          <p className="eyebrow">Navigation</p>
          <ul className="mt-4 space-y-3 text-sm text-[var(--color-fg-muted)]">
            <li><Link href="/soins" className="hover:text-[var(--color-gold)]">Nos soins</Link></li>
            <li><Link href="/reservation" className="hover:text-[var(--color-gold)]">Réserver</Link></li>
            <li><Link href="/mes-reservations" className="hover:text-[var(--color-gold)]">Mon suivi</Link></li>
            <li><Link href="/contact" className="hover:text-[var(--color-gold)]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-[var(--color-fg-muted)]">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
              Boulevard Anfa, Casablanca
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-[var(--color-gold)]" />
              +212 5 22 00 00 00
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-[var(--color-gold)]" />
              contact@costamar-hammam.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)] py-6">
        <div className="container-lux flex flex-col items-center justify-between gap-2 text-xs text-[var(--color-fg-faint)] md:flex-row">
          <p>© {new Date().getFullYear()} Costamar Hammam &amp; Spa. Tous droits réservés.</p>
          <p>Casablanca, Maroc</p>
        </div>
      </div>
    </footer>
  );
}
