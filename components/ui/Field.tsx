import { useId } from "react";
import { cn } from "@/lib/utils";

const control =
  "block w-full rounded-lg border bg-surface px-3.5 h-11 text-base text-ink placeholder:text-ink-muted/70 transition-colors disabled:bg-page disabled:text-ink-muted";

type FieldProps = {
  label: string;
  hint?: string;
  error?: string | null;
  required?: boolean;
  className?: string;
  children: (a11y: { id: string; "aria-describedby"?: string; "aria-invalid"?: boolean; "aria-required"?: boolean }) => React.ReactNode;
};

/** Label, hint and error wired to the control with aria-describedby. Errors are announced politely. */
export function Field({ label, hint, error, required, className, children }: FieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {required ? <span className="text-danger" aria-hidden="true"> *</span> : null}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
      {children({ id, "aria-describedby": describedBy, "aria-invalid": error ? true : undefined, "aria-required": required || undefined })}
      {hint && !error ? (
        <p id={hintId} className="mt-1.5 text-sm text-ink-muted">{hint}</p>
      ) : null}
      <p id={errorId} role={error ? "alert" : undefined} className={cn("mt-1.5 text-sm font-medium text-danger", !error && "hidden")}>
        {error}
      </p>
    </div>
  );
}

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> & {
  invalid?: boolean;
  className?: string;
};

export function Input({ invalid, className, ...props }: InputProps) {
  return <input className={cn(control, invalid ? "border-danger" : "border-field", className)} {...props} />;
}

type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className"> & {
  invalid?: boolean;
  className?: string;
};

export function Select({ invalid, className, ...props }: SelectProps) {
  return <select className={cn(control, "pr-9", invalid ? "border-danger" : "border-field", className)} {...props} />;
}

export function Checkbox({
  label,
  className,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "className"> & { label: React.ReactNode; className?: string }) {
  return (
    <label className={cn("flex cursor-pointer items-start gap-3 text-sm leading-6 text-ink", className)}>
      <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 rounded border-field accent-primary" {...props} />
      <span>{label}</span>
    </label>
  );
}
