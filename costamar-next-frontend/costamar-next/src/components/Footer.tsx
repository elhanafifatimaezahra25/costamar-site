"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="container-lux flex flex-col gap-6 border-b border-[var(--color-border)] py-16 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo markClassName="h-11 w-auto shrink-0" tagline />
          <p className="font-headline mt-8 max-w-md text-2xl text-[var(--color-fg)] sm:text-3xl">
            Recevez nos rituels saisonniers en avant-première.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="flex w-full max-w-sm items-center gap-3 border-b border-[var(--color-border)] pb-3 md:max-w-xs"
        >
          <input
            type="email"
            required
            placeholder="Votre adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent text-sm text-[var(--color-fg)] outline-none placeholder:text-[var(--color-fg-faint)]"
          />
          <button
            type="submit"
            className="shrink-0 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-gold)] hover:opacity-70"
          >
            {sent ? "Envoyé ✓" : "Envoyer →"}
          </button>
        </form>
      </div>

      <div className="container-lux grid gap-10 py-16 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="eyebrow mb-4">Le Sanctuaire</p>
          <p className="text-sm text-[var(--color-fg-muted)]">Tétouan, Maroc</p>
          <p className="text-sm text-[var(--color-fg-muted)]">Avenue de la Corniche</p>
        </div>

        <div>
          <p className="eyebrow mb-4">Réservations privées</p>
          <p className="text-sm text-[var(--color-fg-muted)]">contact@costamarspa.ma</p>
          <p className="text-sm text-[var(--color-fg-muted)]">+212 (0) 639 XX XX XX</p>
        </div>

        <div>
          <p className="eyebrow mb-4">Suivez le rituel</p>
          <a
            href="https://instagram.com/costamar.spa"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-[var(--color-fg-muted)] hover:text-[var(--color-gold)]"
          >
            @costamar.spa
          </a>
        </div>

        <div>
          <p className="eyebrow mb-4">Navigation</p>
          <ul className="space-y-2 text-sm text-[var(--color-fg-muted)]">
            <li><Link href="/soins" className="hover:text-[var(--color-gold)]">Nos soins</Link></li>
            <li><Link href="/reservation" className="hover:text-[var(--color-gold)]">Réserver</Link></li>
            <li><Link href="/mes-reservations" className="hover:text-[var(--color-gold)]">Mon suivi</Link></li>
            <li><Link href="/contact" className="hover:text-[var(--color-gold)]">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)] py-6">
        <div className="container-lux flex flex-col items-center justify-between gap-2 text-xs text-[var(--color-fg-faint)] md:flex-row">
          <p>© {new Date().getFullYear()} Costamar. Tous droits réservés.</p>
          <p>Tétouan, Maroc</p>
        </div>
      </div>
    </footer>
  );
}
