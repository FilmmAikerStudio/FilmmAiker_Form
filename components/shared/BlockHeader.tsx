import type { ReactNode } from "react";
import { Logo } from "@/components/shared/Logo";

interface BlockHeaderProps {
  left: ReactNode;
  right: ReactNode;
}

// Header sticky tipo deck AltafuIA: logo · separador · tag de bloque · contador.
export function BlockHeader({ left, right }: BlockHeaderProps) {
  return (
    <div className="block-header">
      <div className="block-left">
        <Logo size={18} hideWordmark />
        <span className="text-ink-faint">·</span>
        <span>{left}</span>
      </div>
      <div className="block-right">{right}</div>
    </div>
  );
}
