"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { AdminTable, AdminTh, AdminTd } from "@/components/admin/ui";
import {
  adminCreateService,
  adminDeleteService,
  adminListServices,
  adminUpdateService,
  extractErrorMessage,
  type ServiceCategory,
  type SpaService,
} from "@/lib/api";

const CATEGORIES: ServiceCategory[] = ["HAMMAM_PRIVE", "SPA_MASSAGE", "SOINS", "BEAUTE"];

type FormState = {
  name: string;
  description: string;
  category: ServiceCategory;
  durationMinutes: number;
  price: number;
  imageUrl: string;
  active: boolean;
  displayOrder: number;
};

const EMPTY_FORM: FormState = {
  name: "",
  description: "",
  category: "HAMMAM_PRIVE",
  durationMinutes: 60,
  price: 0,
  imageUrl: "",
  active: true,
  displayOrder: 0,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<SpaService[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [error, setError] = useState("");

  function load() {
    setLoading(true);
    adminListServices()
      .then(setServices)
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  function startEdit(s: SpaService) {
    setEditingId(s.id);
    setForm({
      name: s.name,
      description: s.description || "",
      category: s.category,
      durationMinutes: s.durationMinutes,
      price: s.price,
      imageUrl: s.imageUrl || "",
      active: s.active,
      displayOrder: s.displayOrder || 0,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      if (editingId) {
        const updated = await adminUpdateService(editingId, form);
        setServices((prev) => prev.map((s) => (s.id === editingId ? updated : s)));
      } else {
        const created = await adminCreateService(form);
        setServices((prev) => [...prev, created]);
      }
      resetForm();
    } catch (err) {
      setError(extractErrorMessage(err));
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Supprimer ce soin ?")) return;
    await adminDeleteService(id);
    setServices((prev) => prev.filter((s) => s.id !== id));
    if (editingId === id) resetForm();
  }

  return (
    <AdminShell title="Soins" subtitle="Gérez la carte de soins proposée sur le site.">
      <form
        onSubmit={handleSubmit}
        className="mb-10 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-6"
      >
        <h3 className="font-display mb-4 text-xl text-[var(--color-fg)]">
          {editingId ? "Modifier le soin" : "Ajouter un soin"}
        </h3>
        {error && (
          <p className="mb-4 rounded-sm border border-red-900/40 bg-red-950/30 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Nom">
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input"
            />
          </Field>
          <Field label="Catégorie">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as ServiceCategory })}
              className="input"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Ordre d'affichage">
            <input
              type="number"
              value={form.displayOrder}
              onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
              className="input"
            />
          </Field>

          <Field label="Durée (minutes)">
            <input
              type="number"
              required
              min={5}
              value={form.durationMinutes}
              onChange={(e) => setForm({ ...form, durationMinutes: Number(e.target.value) })}
              className="input"
            />
          </Field>
          <Field label="Prix (MAD)">
            <input
              type="number"
              required
              min={0}
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              className="input"
            />
          </Field>
          <Field label="URL image (optionnel)">
            <input
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="input"
            />
          </Field>
        </div>

        <Field label="Description" className="mt-4">
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="input resize-none"
          />
        </Field>

        <label className="mt-4 flex items-center gap-2 text-sm text-[var(--color-fg-muted)]">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
          Visible sur le site
        </label>

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            className="rounded-full bg-[var(--color-gold)] px-6 py-2.5 text-sm font-medium text-[var(--color-bg-inset)] hover:brightness-110"
          >
            {editingId ? "Enregistrer" : "Créer le soin"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-full border border-[var(--color-border)] px-6 py-2.5 text-sm text-[var(--color-fg)] hover:border-[var(--color-gold)]"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-[var(--color-fg-muted)]">Chargement…</p>
      ) : (
        <AdminTable>
          <thead>
            <tr>
              <AdminTh>Nom</AdminTh>
              <AdminTh>Catégorie</AdminTh>
              <AdminTh>Durée</AdminTh>
              <AdminTh>Prix</AdminTh>
              <AdminTh>Visible</AdminTh>
              <AdminTh></AdminTh>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id}>
                <AdminTd>{s.name}</AdminTd>
                <AdminTd>{s.category}</AdminTd>
                <AdminTd>{s.durationMinutes} min</AdminTd>
                <AdminTd>{Number(s.price).toFixed(0)} MAD</AdminTd>
                <AdminTd>{s.active ? "Oui" : "Non"}</AdminTd>
                <AdminTd>
                  <div className="flex gap-3">
                    <button
                      onClick={() => startEdit(s)}
                      className="text-[var(--color-gold)] hover:opacity-70"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="text-red-400 hover:opacity-70"
                    >
                      Supprimer
                    </button>
                  </div>
                </AdminTd>
              </tr>
            ))}
          </tbody>
        </AdminTable>
      )}

      <style jsx global>{`
        .input {
          width: 100%;
          border: 1px solid var(--color-border);
          background: var(--color-bg);
          color: var(--color-fg);
          padding: 0.65rem 0.9rem;
          border-radius: 2px;
          outline: none;
        }
        .input:focus {
          border-color: var(--color-gold);
        }
      `}</style>
    </AdminShell>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs text-[var(--color-fg-muted)]">{label}</label>
      {children}
    </div>
  );
}
