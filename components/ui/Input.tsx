import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, id, className, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-2">
        {label ? (
          <label
            htmlFor={inputId}
            className="text-xs uppercase tracking-[0.18em] text-ink-soft"
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-14 w-full rounded-btn border bg-bg-deep px-4 text-base text-ink-white placeholder:text-ink-mid",
            "transition-colors duration-250 focus:outline-none focus:ring-2 focus:ring-green-mid",
            error
              ? "border-alert-red focus:ring-alert-red"
              : "border-ink-white/10 focus:border-green-mid",
            className,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={hint || error ? `${inputId}-hint` : undefined}
          {...props}
        />
        {error ? (
          <p id={`${inputId}-hint`} className="text-sm text-alert-red">
            {error}
          </p>
        ) : hint ? (
          <p id={`${inputId}-hint`} className="text-sm text-ink-mid">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);
Input.displayName = "Input";
