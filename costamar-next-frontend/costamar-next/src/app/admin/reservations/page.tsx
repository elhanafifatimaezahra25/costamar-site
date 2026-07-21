"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import AdminShell from "@/components/admin/AdminShell";
import { AdminTable, AdminTh, AdminTd } from "@/components/admin/ui";
import { adminListBookings, adminUpdateBookingStatus, type Booking, type BookingStatus } from "@/lib/api";

const STATUSES: BookingStatus[] = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<BookingStatus | "">("");

  function load() {
    setLoading(true);
    adminListBookings()
      .then(setBookings)
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleStatusChange(id: number, status: BookingStatus) {
    const updated = await adminUpdateBookingStatus(id, status);
    setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
  }

  const visible = filter ? bookings.filter((b) => b.status === filter) : bookings;
  const sorted = [...visible].sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );

  return (
    <AdminShell title="Réservations" subtitle="Confirmez, annulez ou clôturez les demandes.">
      <div className="mb-6 flex flex-wrap gap-2">
        {(["", ...STATUSES] as const).map((s) => (
          <button
            key={s || "all"}
            onClick={() => setFilter(s)}
            className={`rounded-full border px-4 py-1.5 text-xs transition-colors ${
              filter === s
                ? "border-[var(--color-gold)] bg-[var(--color-gold-soft)] text-[var(--color-gold)]"
                : "border-[var(--color-border)] text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
            }`}
          >
            {s || "Toutes"}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-[var(--color-fg-muted)]">Chargement…</p>
      ) : (
        <AdminTable>
          <thead>
            <tr>
              <AdminTh>Client</AdminTh>
              <AdminTh>Contact</AdminTh>
              <AdminTh>Soin</AdminTh>
              <AdminTh>Date</AdminTh>
              <AdminTh>Statut</AdminTh>
            </tr>
          </thead>
          <tbody>
            {sorted.map((b) => (
              <tr key={b.id}>
                <AdminTd>{b.clientName}</AdminTd>
                <AdminTd>
                  <div>{b.clientEmail}</div>
                  <div className="text-[var(--color-fg-faint)]">{b.clientPhone}</div>
                </AdminTd>
                <AdminTd>{b.serviceName}</AdminTd>
                <AdminTd>
                  {format(new Date(b.startTime), "d MMM yyyy 'à' HH:mm", { locale: fr })}
                </AdminTd>
                <AdminTd>
                  <select
                    value={b.status}
                    onChange={(e) => handleStatusChange(b.id, e.target.value as BookingStatus)}
                    className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-2 py-1.5 text-sm text-[var(--color-fg)] outline-none focus:border-[var(--color-gold)]"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </AdminTd>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <AdminTd className="text-[var(--color-fg-faint)]">Aucune réservation.</AdminTd>
                <AdminTd>—</AdminTd>
                <AdminTd>—</AdminTd>
                <AdminTd>—</AdminTd>
                <AdminTd>—</AdminTd>
              </tr>
            )}
          </tbody>
        </AdminTable>
      )}
    </AdminShell>
  );
}
