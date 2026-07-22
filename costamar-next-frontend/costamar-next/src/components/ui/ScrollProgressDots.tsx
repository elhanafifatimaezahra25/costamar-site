"use client";

import { useEffect, useState } from "react";

export function ScrollProgressDots({ sectionIds }: { sectionIds: string[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = elements.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActive(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
      {sectionIds.map((id, i) => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
          aria-label={`Aller à la section ${id}`}
          className="group flex h-3 w-3 items-center justify-center"
        >
          <span
            className={`rounded-full transition-all duration-300 ${
              active === i
                ? "h-2.5 w-2.5 bg-[var(--color-gold)]"
                : "h-1.5 w-1.5 bg-[var(--color-fg-faint)] group-hover:bg-[var(--color-gold)]/60"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
