import { cn } from "@/lib/utils";

export function PageHero({ title, lead, children, className }: { title: string; lead?: string; children?: React.ReactNode; className?: string }) {
  return (
    <section className={cn("bg-surface", className)}>
      <div className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h1 className="max-w-3xl text-[36px] font-bold leading-[42px] tracking-tight sm:text-5xl sm:leading-[56px]">{title}</h1>
        {lead ? <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-muted">{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}
