"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { AdminTable, AdminTh, AdminTd } from "@/components/admin/ui";
import {
  adminAddBlockedDate,
  adminGetBlockedDates,
  adminGetBusinessHours,
  adminRemoveBlockedDate,
  adminUpdateBusinessHours,
  type BlockedDate,
  type BusinessHours,
  type DayOfWeekName,
} from "@/lib/api";

const DAY_LABELS: Record<DayOfWeekName, string> = {
  MONDAY: "Lundi",
  TUESDAY: "Mardi",
  WEDNESDAY: "Mercredi",
  THURSDAY: "Jeudi",
  FRIDAY: "Vendredi",
  SATURDAY: "Samedi",
  SUNDAY: "Dimanche",
};

const DAY_ORDER: DayOfWeekName[] = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export default function AdminHoursPage() {
  const [hours, setHours] = useState<BusinessHours[]>([]);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [newBlockedDate, setNewBlockedDate] = useState("");
  const [newBlockedReason, setNewBlockedReason] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([adminGetBusinessHours(), adminGetBlockedDates()])
      .then(([h, b]) => {
        setHours(
          DAY_ORDER.map(
            (day) => h.find((x) => x.dayOfWeek === day) || { dayOfWeek: day, open: false }
          )
        );
        setBlockedDates(b);
      })
      .finally(() => setLoading(false));
  }, []);

  function updateDay(day: DayOfWeekName, patch: Partial<BusinessHours>) {
    setHours((prev) => prev.map((h) => (h.dayOfWeek === day ? { ...h, ...patch } : h)));
  }

  async function saveDay(day: DayOfWeekName) {
    const dayData = hours.find((h) => h.dayOfWeek === day);
    if (!dayData) return;
    const saved = await adminUpdateBusinessHours(day, dayData);
    setHours((prev) => prev.map((h) => (h.dayOfWeek === day ? saved : h)));
  }

  async function addBlockedDate(e: React.FormEvent) {
    e.preventDefault();
    if (!newBlockedDate) return;
    const created = await adminAddBlockedDate({ date: newBlockedDate, reason: newBlockedReason });
    setBlockedDates((prev) => [...prev, created]);
    setNewBlockedDate("");
    setNewBlockedReason("");
  }

  async function removeBlockedDate(id: number) {
    await adminRemoveBlockedDate(id);
    setBlockedDates((prev) => prev.filter((b) => b.id !== id));
  }

  if (loading) {
    return (
      <AdminShell title="Horaires">
        <p className="text-[var(--color-fg-muted)]">Chargement…</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell
      title="Horaires"
      subtitle="Définissez les horaires d'ouverture hebdomadaires et les fermetures exceptionnelles."
    >
      <AdminTable>
        <thead>
          <tr>
            <AdminTh>Jour</AdminTh>
            <AdminTh>Ouvert</AdminTh>
            <AdminTh>Ouverture</AdminTh>
            <AdminTh>Fermeture</AdminTh>
            <AdminTh></AdminTh>
          </tr>
        </thead>
        <tbody>
          {hours.map((h) => (
            <tr key={h.dayOfWeek}>
              <AdminTd>{DAY_LABELS[h.dayOfWeek]}</AdminTd>
              <AdminTd>
                <input
                  type="checkbox"
                  checked={h.open}
                  onChange={(e) => updateDay(h.dayOfWeek, { open: e.target.checked })}
                />
              </AdminTd>
              <AdminTd>
                <input
                  type="time"
                  disabled={!h.open}
                  value={h.openTime || ""}
                  onChange={(e) => updateDay(h.dayOfWeek, { openTime: e.target.value })}
                  className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-2 py-1 text-[var(--color-fg)] disabled:opacity-40"
                />
              </AdminTd>
              <AdminTd>
                <input
                  type="time"
                  disabled={!h.open}
                  value={h.closeTime || ""}
                  onChange={(e) => updateDay(h.dayOfWeek, { closeTime: e.target.value })}
                  className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-2 py-1 text-[var(--color-fg)] disabled:opacity-40"
                />
              </AdminTd>
              <AdminTd>
                <button
                  onClick={() => saveDay(h.dayOfWeek)}
                  className="text-sm text-[var(--color-gold)] hover:opacity-70"
                >
                  Enregistrer
                </button>
              </AdminTd>
            </tr>
          ))}
        </tbody>
      </AdminTable>

      <h3 className="font-display mt-12 mb-4 text-2xl text-[var(--color-fg)]">
        Fermetures exceptionnelles
      </h3>
      <form onSubmit={addBlockedDate} className="mb-6 flex flex-wrap items-end gap-4">
        <div>
          <label className="mb-1.5 block text-xs text-[var(--color-fg-muted)]">Date</label>
          <input
            type="date"
            required
            value={newBlockedDate}
            onChange={(e) => setNewBlockedDate(e.target.value)}
            className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-3 py-2 text-[var(--color-fg)]"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-[var(--color-fg-muted)]">
            Raison (optionnel)
          </label>
          <input
            value={newBlockedReason}
            onChange={(e) => setNewBlockedReason(e.target.value)}
            className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-3 py-2 text-[var(--color-fg)]"
          />
        </div>
        <button className="rounded-full bg-[var(--color-gold)] px-6 py-2.5 text-sm font-medium text-[var(--color-bg-inset)] hover:brightness-110">
          Ajouter
        </button>
      </form>

      <AdminTable>
        <thead>
          <tr>
            <AdminTh>Date</AdminTh>
            <AdminTh>Raison</AdminTh>
            <AdminTh></AdminTh>
          </tr>
        </thead>
        <tbody>
          {blockedDates.map((b) => (
            <tr key={b.id}>
              <AdminTd>{b.date}</AdminTd>
              <AdminTd>{b.reason || "—"}</AdminTd>
              <AdminTd>
                <button
                  onClick={() => removeBlockedDate(b.id)}
                  className="text-sm text-red-400 hover:opacity-70"
                >
                  Retirer
                </button>
              </AdminTd>
            </tr>
          ))}
          {blockedDates.length === 0 && (
            <tr>
              <AdminTd className="text-[var(--color-fg-faint)]">
                Aucune fermeture exceptionnelle programmée.
              </AdminTd>
              <AdminTd>—</AdminTd>
              <AdminTd>—</AdminTd>
            </tr>
          )}
        </tbody>
      </AdminTable>
    </AdminShell>
  );
}
