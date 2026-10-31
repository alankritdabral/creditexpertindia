import { cn } from "@/lib/utils";

/** Qualifying text for rates, savings and approvals. Never go below 14px. */
export function Disclaimer({
  variant = "inline",
  className,
  children,
}: {
  variant?: "inline" | "footnote" | "block";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "text-sm leading-[22px] text-ink-muted",
        variant === "block" && "rounded-lg border border-line bg-surface p-4",
        variant === "footnote" && "border-t border-line pt-4",
        className
      )}
    >
      {children}
    </p>
  );
}
