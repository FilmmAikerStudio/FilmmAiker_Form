interface GlowBlobProps {
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  size?: number;
  color?: string;
}

// Blob radial difuminado para crear profundidad detrás del contenido.
export function GlowBlob({
  top,
  left,
  right,
  bottom,
  size = 400,
  color = "var(--green-mid)",
}: GlowBlobProps) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
        borderRadius: "50%",
        pointerEvents: "none",
        filter: "blur(100px)",
        opacity: 0.25,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        zIndex: 0,
      }}
    />
  );
}
