const DEFAULT_WORDS = [
  "Rituel",
  "Vapeur",
  "Eau de Rose",
  "Tadelakt",
  "Or & Soie",
  "Sérénité",
];

export function Marquee({
  words = DEFAULT_WORDS,
  className,
}: {
  words?: string[];
  className?: string;
}) {
  const loop = [...words, ...words];

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className ?? ""}`}>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {loop.map((word, i) => (
              <span key={i} className="flex items-center">
                <span className="px-4 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-fg-muted)] sm:px-6 sm:text-sm">
                  {word}
                </span>
                <span className="text-[var(--color-gold)]">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
