"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/Button";
import { Logo } from "./Logo";
import { Menu, X } from "lucide-react";

const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

const LINKS = [
  { href: "/#univers", label: "Nos univers de soins" },
  { href: "/#rituels", label: "Rituels signature" },
  { href: "/#experience", label: "L'expérience" },
  { href: "/soins", label: "La carte des soins" },
  { href: "/mes-reservations", label: "Mon suivi" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/70 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`container-lux flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <Link
            href="/"
            className="text-[var(--color-fg)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
          >
            <Logo markClassName="h-9 w-auto shrink-0" />
          </Link>

          <p className="hidden text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-fg-muted)] lg:block">
            Hammam &amp; Spa Privé — Tétouan
          </p>

          <div className="flex items-center gap-4">
            <Button href="/reservation" variant="goldOutline" className="hidden sm:inline-flex">
              Réserver
            </Button>
            <button
              className="flex h-10 w-10 items-center justify-center text-[var(--color-fg)]"
              onClick={() => setOpen((v) => !v)}
              aria-label="Ouvrir le menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_PREMIUM }}
            className="fixed inset-0 z-[60] flex flex-col bg-[var(--color-bg-inset)]"
          >
            <div className="container-lux flex h-20 items-center justify-between">
              <Logo markClassName="h-9 w-auto shrink-0 text-[var(--color-fg)]" />
              <button
                className="flex h-10 w-10 items-center justify-center text-[var(--color-fg)]"
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="container-lux flex flex-1 flex-col justify-center gap-2 pb-20">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: EASE_PREMIUM }}
                >
                  <Link
                    href={l.href}
                    className="font-display block py-3 text-4xl text-[var(--color-fg)] transition-colors hover:text-[var(--color-gold)] md:text-6xl"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + LINKS.length * 0.06, duration: 0.6, ease: EASE_PREMIUM }}
                className="mt-8"
              >
                <Button href="/reservation">Réserver votre rituel</Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
