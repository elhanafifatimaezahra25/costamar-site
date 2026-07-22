import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "outline" | "ghost" | "goldOutline";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button({
  children,
  href,
  variant = "solid",
  className,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-[15px] font-medium tracking-wide transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:opacity-40 disabled:pointer-events-none";

  const variants: Record<string, string> = {
    solid:
      "bg-[var(--color-gold)] text-[var(--color-bg-inset)] hover:brightness-110 hover:-translate-y-0.5 shadow-[0_8px_30px_-8px_rgba(201,169,106,0.5)]",
    outline:
      "border border-[var(--color-border)] text-[var(--color-fg)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]",
    goldOutline:
      "border border-[var(--color-gold)]/70 text-[var(--color-gold)] text-xs uppercase tracking-[0.18em] px-6 py-2.5 hover:bg-[var(--color-gold)] hover:text-[var(--color-bg-inset)]",
    ghost: "text-[var(--color-fg)] hover:text-[var(--color-gold)]",
  };

  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
