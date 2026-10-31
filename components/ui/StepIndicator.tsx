import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function StepIndicator({ steps, current, className }: { steps: string[]; current: number; className?: string }) {
  return (
    <ol className={cn("flex items-center gap-2", className)} aria-label="Progress">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex flex-1 items-center gap-2" aria-current={active ? "step" : undefined}>
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                done && "bg-success text-white",
                active && "bg-primary text-white",
                !done && !active && "border border-field text-ink-muted"
              )}
            >
              {done ? <Check className="h-4 w-4" aria-hidden="true" /> : i + 1}
            </span>
            <span className={cn("hidden text-sm sm:inline", active ? "font-semibold text-ink" : "text-ink-muted")}>{label}</span>
            <span className="sr-only">{done ? " (completed)" : active ? " (current step)" : ""}</span>
            {i < steps.length - 1 ? <span className={cn("h-px flex-1", done ? "bg-success" : "bg-line")} aria-hidden="true" /> : null}
          </li>
        );
      })}
    </ol>
  );
}
