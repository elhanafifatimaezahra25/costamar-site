"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import AdminShell from "@/components/admin/AdminShell";
import { AdminTable, AdminTh, AdminTd, StatusBadge, StatCard } from "@/components/admin/ui";
import { adminGetStats, adminListBookings, type AdminStats, type Booking } from "@/lib/api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([adminGetStats(), adminListBookings()])
      .then(([s, b]) => {
        setStats(s);
        setBookings(b);
      })
      .finally(() => setLoading(false));
  }, []);

  const upcoming = [...bookings]
    .filter((b) => new Date(b.startTime) >= new Date() && b.status !== "CANCELLED")
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 8);

  return (
    <AdminShell title="Vue d'ensemble" subtitle="Un aperçu rapide de l'activité du salon.">
      {loading ? (
        <p className="text-[var(--color-fg-muted)]">Chargement…</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Réservations totales" value={stats?.totalBookings ?? 0} />
            <StatCard label="Aujourd'hui" value={stats?.todayBookings ?? 0} />
            <StatCard label="Créneau le plus demandé" value={stats?.busiestSlot ?? "—"} />
            <StatCard label="Soin le plus réservé" value={stats?.topService ?? "—"} />
          </div>

          <h2 className="font-display mt-12 mb-4 text-2xl text-[var(--color-fg)]">
            Prochains rendez-vous
          </h2>
          <AdminTable>
            <thead>
              <tr>
                <AdminTh>Client</AdminTh>
                <AdminTh>Soin</AdminTh>
                <AdminTh>Date</AdminTh>
                <AdminTh>Statut</AdminTh>
              </tr>
            </thead>
            <tbody>
              {upcoming.map((b) => (
                <tr key={b.id}>
                  <AdminTd>{b.clientName}</AdminTd>
                  <AdminTd>{b.serviceName}</AdminTd>
                  <AdminTd>
                    {format(new Date(b.startTime), "d MMM yyyy 'à' HH:mm", { locale: fr })}
                  </AdminTd>
                  <AdminTd>
                    <StatusBadge status={b.status} />
                  </AdminTd>
                </tr>
              ))}
              {upcoming.length === 0 && (
                <tr>
                  <AdminTd className="text-[var(--color-fg-faint)]">
                    Aucun rendez-vous à venir.
                  </AdminTd>
                  <AdminTd>—</AdminTd>
                  <AdminTd>—</AdminTd>
                  <AdminTd>—</AdminTd>
                </tr>
              )}
            </tbody>
          </AdminTable>

          <Link
            href="/admin/reservations"
            className="mt-6 inline-block text-sm text-[var(--color-gold)] hover:opacity-70"
          >
            Voir toutes les réservations →
          </Link>
        </>
      )}
    </AdminShell>
  );
}
