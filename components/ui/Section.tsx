import { cn } from "@/lib/utils";

type Bg = "page" | "surface" | "tint" | "dark";

const bgs: Record<Bg, string> = {
  page: "bg-page",
  surface: "bg-surface",
  tint: "bg-primary-soft",
  dark: "bg-surface-dark text-white",
};

/** Full-width band with a centred 1200px container. Sections are 64px apart on phones, 96px on desktop. */
export function Section({
  bg = "page",
  className,
  innerClassName,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { bg?: Bg; innerClassName?: string }) {
  return (
    <section className={cn("py-16 lg:py-24", bgs[bg], className)} {...props}>
      <div className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8", innerClassName)}>{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Heading = "h2",
  className,
  dark,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className={cn("mb-3 text-sm font-semibold", dark ? "text-white/80" : "text-primary")}>{eyebrow}</p>
      ) : null}
      <Heading className="text-[28px] font-bold leading-[34px] tracking-tight sm:text-4xl sm:leading-[42px]">{title}</Heading>
      {lead ? (
        <p className={cn("mt-4 text-base leading-7", dark ? "text-white/80" : "text-ink-muted")}>{lead}</p>
      ) : null}
    </div>
  );
}
