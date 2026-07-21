import type { ReactNode } from "react";

export function AdminTable({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-sm border border-[var(--color-border)]">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  );
}

export function AdminTh({ children }: { children?: ReactNode }) {
  return (
    <th className="border-b border-[var(--color-border)] bg-[var(--color-bg-raised)] px-4 py-3 text-left text-xs uppercase tracking-wider text-[var(--color-fg-muted)]">
      {children}
    </th>
  );
}

export function AdminTd({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <td className={`border-b border-[var(--color-border)] px-4 py-3 text-[var(--color-fg)] ${className || ""}`}>
      {children}
    </td>
  );
}

const STATUS_STYLES: Record<string, string> = {
  PENDING: "text-[var(--color-gold)] border-[var(--color-gold)]/40",
  CONFIRMED: "text-emerald-400 border-emerald-400/30",
  CANCELLED: "text-[var(--color-fg-faint)] border-[var(--color-border)]",
  COMPLETED: "text-[var(--color-fg-muted)] border-[var(--color-border)]",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs ${
        STATUS_STYLES[status] || "text-[var(--color-fg-muted)] border-[var(--color-border)]"
      }`}
    >
      {status}
    </span>
  );
}

export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-6">
      <p className="text-sm text-[var(--color-fg-muted)]">{label}</p>
      <p className="font-display mt-2 text-4xl text-[var(--color-fg)]">{value}</p>
    </div>
  );
}
