import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-2xl border border-slate-200 bg-white", "shadow-[0_4px_24px_rgba(11,29,58,0.06)]", className)}
      {...props}
    />
  );
}

export function CardHover({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-[0_4px_24px_rgba(11,29,58,0.06)] transition-all hover:shadow-[0_12px_40px_rgba(11,29,58,0.12)] hover:-translate-y-0.5",
        className
      )}
      {...props}
    />
  );
}
