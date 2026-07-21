"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { LayoutDashboard, CalendarClock, Sparkles, Clock, ExternalLink } from "lucide-react";

const LINKS = [
  { href: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/admin/reservations", label: "Réservations", icon: CalendarClock },
  { href: "/admin/services", label: "Soins", icon: Sparkles },
  { href: "/admin/horaires", label: "Horaires", icon: Clock },
];

export default function AdminShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[var(--color-bg)]">
      <aside className="hidden w-64 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-bg-inset)] md:block">
        <div className="p-6">
          <Link href="/" className="font-display text-2xl text-[var(--color-fg)]">
            Costamar
          </Link>
          <p className="eyebrow mt-1">Espace admin</p>
        </div>
        <nav className="mt-6 flex flex-col gap-1 px-3">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-[var(--color-gold-soft)] text-[var(--color-gold)]"
                    : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                }`}
              >
                <l.icon size={17} />
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-6 left-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-[var(--color-fg-faint)] hover:text-[var(--color-gold)]"
          >
            <ExternalLink size={13} />
            Retour au site
          </Link>
        </div>
      </aside>

      <div className="flex-1">
        <header className="border-b border-[var(--color-border)] px-6 py-8 md:px-10">
          <h1 className="font-display text-3xl text-[var(--color-fg)]">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-[var(--color-fg-muted)]">{subtitle}</p>}
        </header>
        <main className="px-6 py-8 md:px-10">{children}</main>
      </div>
    </div>
  );
}
