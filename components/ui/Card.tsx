import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-card border border-ink-white/[0.08] bg-bg-deep p-6 transition-colors duration-250",
        className,
      )}
      {...props}
    />
  );
}
