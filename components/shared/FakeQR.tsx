interface FakeQRProps {
  size?: number;
  color?: string;
}

// QR decorativo (no escaneable). Para producción, sustituir por un generador real
// que apunte a NEXT_PUBLIC_SITE_URL con UTMs de evento.
export function FakeQR({ size = 100, color = "#ffffff" }: FakeQRProps) {
  const dim = 21;
  const grid: boolean[][] = [];
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < dim; i++) {
    grid[i] = [];
    for (let j = 0; j < dim; j++) {
      grid[i][j] = rand() > 0.5;
    }
  }
  // Tres marcadores de posición en las esquinas, como en un QR real.
  const setMarker = (r: number, c: number) => {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        const onEdge = i === 0 || i === 6 || j === 0 || j === 6;
        const inner = i >= 2 && i <= 4 && j >= 2 && j <= 4;
        grid[r + i][c + j] = onEdge || inner;
      }
    }
  };
  setMarker(0, 0);
  setMarker(0, 14);
  setMarker(14, 0);
  const cell = size / dim;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: "block" }}
      aria-hidden
    >
      {grid.flatMap((row, i) =>
        row.map((on, j) =>
          on ? (
            <rect
              key={`${i}-${j}`}
              x={j * cell}
              y={i * cell}
              width={cell}
              height={cell}
              fill={color}
            />
          ) : null,
        ),
      )}
    </svg>
  );
}
