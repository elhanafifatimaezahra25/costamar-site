"use client";

import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Loader2, Search, X } from "lucide-react";
import {
  cancelBooking,
  extractErrorMessage,
  lookupBookingsByEmail,
  type Booking,
} from "@/lib/api";

const STATUS_LABELS: Record<Booking["status"], string> = {
  PENDING: "En attente",
  CONFIRMED: "Confirmée",
  CANCELLED: "Annulée",
  COMPLETED: "Terminée",
};

const STATUS_COLORS: Record<Booking["status"], string> = {
  PENDING: "text-[var(--color-gold)] border-[var(--color-gold)]/40",
  CONFIRMED: "text-emerald-400 border-emerald-400/30",
  CANCELLED: "text-[var(--color-fg-faint)] border-[var(--color-border)]",
  COMPLETED: "text-[var(--color-fg-muted)] border-[var(--color-border)]",
};

export default function MyBookingsLookup() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError(null);
    try {
      const results = await lookupBookingsByEmail(email);
      setBookings(results);
    } catch (err) {
      setError(extractErrorMessage(err, "Impossible de récupérer vos réservations."));
      setBookings(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel(id: number) {
    if (!window.confirm("Annuler cette réservation ?")) return;
    await cancelBooking(id);
    setBookings((prev) =>
      prev ? prev.map((b) => (b.id === id ? { ...b, status: "CANCELLED" } : b)) : prev
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={handleSearch} className="flex gap-3">
        <input
          type="email"
          required
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-4 py-3 text-[var(--color-fg)] outline-none focus:border-[var(--color-gold)]"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-6 py-3 text-sm font-medium text-[var(--color-bg-inset)] transition-all hover:brightness-110 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <Search size={16} />}
          Rechercher
        </button>
      </form>

      {error && (
        <p className="mt-6 rounded-sm border border-red-900/40 bg-red-950/30 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {bookings && bookings.length === 0 && (
        <p className="mt-10 text-center text-sm text-[var(--color-fg-muted)]">
          Aucune réservation trouvée pour cette adresse email.
        </p>
      )}

      {bookings && bookings.length > 0 && (
        <div className="mt-10 space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="flex items-center justify-between rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-6"
            >
              <div>
                <p className="font-display text-xl text-[var(--color-fg)]">{b.serviceName}</p>
                <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
                  {format(new Date(b.startTime), "EEEE d MMMM yyyy 'à' HH:mm", { locale: fr })}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`rounded-full border px-3 py-1 text-xs ${STATUS_COLORS[b.status]}`}
                >
                  {STATUS_LABELS[b.status]}
                </span>
                {b.status !== "CANCELLED" && b.status !== "COMPLETED" && (
                  <button
                    onClick={() => handleCancel(b.id)}
                    aria-label="Annuler"
                    className="text-[var(--color-fg-faint)] hover:text-red-400"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
