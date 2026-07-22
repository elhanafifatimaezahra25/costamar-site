const COUNT = 14;

/** Deterministic pseudo-random spread (no Math.random) to avoid SSR/client
 * hydration mismatches while still looking organic. */
function pseudo(i: number, seed: number) {
  const v = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return v - Math.floor(v);
}

export function Particles({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      {Array.from({ length: COUNT }).map((_, i) => {
        const left = pseudo(i, 1) * 100;
        const size = 6 + pseudo(i, 2) * 10;
        const duration = 10 + pseudo(i, 3) * 10;
        const delay = pseudo(i, 4) * 12;
        return (
          <span
            key={i}
            className="particle"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
