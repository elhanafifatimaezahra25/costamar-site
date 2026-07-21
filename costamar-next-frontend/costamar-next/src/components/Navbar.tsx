"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/Button";
import { Logo } from "./Logo";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/soins", label: "Nos soins" },
  { href: "/#experience", label: "L'expérience" },
  { href: "/#galerie", label: "Galerie" },
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/70 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`container-lux flex items-center justify-between transition-all duration-500 ${
          scrolled ? "h-[72px]" : "h-20"
        }`}
      >
        <Link
          href="/"
          className="text-[var(--color-fg)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
        >
          <Logo markClassName="h-9 w-auto shrink-0" />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-gold)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/reservation" className="!px-6 !py-2.5 text-sm">
            Réserver
          </Button>
        </div>

        <button
          className="text-[var(--color-fg)] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Ouvrir le menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-8 md:hidden">
          <nav className="flex flex-col gap-6">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-lg text-[var(--color-fg)]"
              >
                {l.label}
              </Link>
            ))}
            <Button href="/reservation" className="mt-2 w-full">
              Réserver
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
