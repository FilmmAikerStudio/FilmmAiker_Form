interface ProgressBarProps {
  // Valor entre 0 y 1.
  value: number;
}

export function ProgressBar({ value }: ProgressBarProps) {
  const clamped = Math.min(1, Math.max(0, value));
  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${clamped * 100}%` }} />
    </div>
  );
}
