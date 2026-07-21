import Image from "next/image";

const MARK_SRC = "/images/logo-costamar-mark.png";
const MARK_WIDTH = 637;
const MARK_HEIGHT = 671;

const FULL_SRC = "/images/logo-costamar.png";
const FULL_WIDTH = 637;
const FULL_HEIGHT = 883;

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src={MARK_SRC}
      alt=""
      width={MARK_WIDTH}
      height={MARK_HEIGHT}
      className={className ?? "h-10 w-auto shrink-0"}
      priority
    />
  );
}

export function Logo({
  className,
  markClassName,
  tagline = false,
}: {
  className?: string;
  markClassName?: string;
  tagline?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <LogoMark className={markClassName ?? "h-10 w-auto shrink-0"} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-2xl tracking-wide">Costamar</span>
        {tagline && (
          <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.32em] text-current/70">
            Hammam &amp; Spa
          </span>
        )}
      </span>
    </span>
  );
}

export function LogoStacked({ className }: { className?: string }) {
  return (
    <Image
      src={FULL_SRC}
      alt="Costamar Hammam & Spa"
      width={FULL_WIDTH}
      height={FULL_HEIGHT}
      className={className ?? "h-32 w-auto"}
      priority
    />
  );
}
