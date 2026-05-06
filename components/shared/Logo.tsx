import { cn } from "@/lib/cn";

interface LogoProps {
  size?: number;
  className?: string;
  hideWordmark?: boolean;
}

// Logo FilmmAiker: cuadrado blanco con F serif + wordmark FILMMAIKER tracking ancho.
// Adaptado de Cloud Design (chrome.jsx).
export function Logo({ size = 28, className, hideWordmark = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span
        className="grid place-items-center bg-white text-bg-black font-display font-black"
        style={{
          width: size,
          height: size,
          fontSize: size * 0.62,
          letterSpacing: "-0.04em",
          borderRadius: 2,
          lineHeight: 1,
        }}
      >
        F
      </span>
      {hideWordmark ? null : (
        <span
          className="font-sans font-black text-ink-soft/60"
          style={{ fontSize: 9, letterSpacing: "0.4em" }}
        >
          FILMMAIKER
        </span>
      )}
    </div>
  );
}
