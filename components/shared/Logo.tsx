import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <span
      className={cn(
        "font-display text-lg leading-none tracking-tight text-ink-white",
        className,
      )}
    >
      <span className="text-green-mid">Filmm</span>Aiker
      <span className="ml-1 align-top text-[0.55em] uppercase tracking-[0.25em] text-ink-soft">
        Studio
      </span>
    </span>
  );
}
