import { AlertCircle, CheckCircle2, Info, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "info" | "success" | "error";

const tones: Record<Tone, { box: string; icon: LucideIcon }> = {
  info: { box: "border-primary/30 bg-primary-soft text-ink", icon: Info },
  success: { box: "border-success/30 bg-success-soft text-ink", icon: CheckCircle2 },
  error: { box: "border-danger/30 bg-danger-soft text-ink", icon: AlertCircle },
};

export function Alert({
  tone = "info",
  title,
  className,
  children,
}: {
  tone?: Tone;
  title?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const { box, icon: Icon } = tones[tone];
  return (
    <div role={tone === "error" ? "alert" : "status"} className={cn("flex gap-3 rounded-lg border p-4", box, className)}>
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", tone === "error" && "text-danger", tone === "success" && "text-success", tone === "info" && "text-primary")} aria-hidden="true" />
      <div className="text-sm leading-6">
        {title ? <p className="font-semibold">{title}</p> : null}
        {children}
      </div>
    </div>
  );
}
