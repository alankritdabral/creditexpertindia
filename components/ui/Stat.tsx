import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

/** A figure with its label. Anything shown as a Stat needs a source line, or an "Example" tag. */
export function Stat({
  value,
  label,
  source,
  example,
  tone = "default",
  className,
}: {
  value: string;
  label: string;
  source?: string;
  example?: boolean;
  tone?: "default" | "success" | "danger";
  className?: string;
}) {
  return (
    <div className={className}>
      <p className={cn("num text-3xl font-bold", tone === "success" && "text-success", tone === "danger" && "text-danger", tone === "default" && "text-ink")}>
        {value}
      </p>
      <p className="mt-1 text-sm text-ink-muted">{label}</p>
      {example ? <Badge className="mt-2">Example</Badge> : null}
      {source ? <p className="mt-1 text-xs text-ink-muted">{source}</p> : null}
    </div>
  );
}
