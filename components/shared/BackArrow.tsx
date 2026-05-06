"use client";

interface BackArrowProps {
  onClick: () => void;
  label?: string;
}

export function BackArrow({ onClick, label = "Atrás" }: BackArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-soft transition-colors duration-200 hover:border-green-mid hover:text-green-light"
    >
      <svg
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
}
