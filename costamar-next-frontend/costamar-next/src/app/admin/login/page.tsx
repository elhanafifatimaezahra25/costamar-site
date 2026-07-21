"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { extractErrorMessage } from "@/lib/api";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.push("/admin");
    } catch (err) {
      setError(extractErrorMessage(err, "Email ou mot de passe incorrect"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-inset)] p-8"
      >
        <h1 className="font-display text-2xl text-[var(--color-fg)]">Espace admin</h1>
        <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
          Connectez-vous pour accéder au tableau de bord.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm text-[var(--color-fg-muted)]">Email</label>
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-4 py-3 text-[var(--color-fg)] outline-none focus:border-[var(--color-gold)]"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-[var(--color-fg-muted)]">
              Mot de passe
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-4 py-3 text-[var(--color-fg)] outline-none focus:border-[var(--color-gold)]"
            />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        <Button type="submit" disabled={loading} className="mt-6 w-full">
          {loading ? "Connexion…" : "Se connecter"}
        </Button>
      </form>
    </div>
  );
}
