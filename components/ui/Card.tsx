import { cn } from "@/lib/utils";

type Tone = "plain" | "tint" | "highlight" | "dark";

const tones: Record<Tone, string> = {
  plain: "border border-line bg-surface",
  tint: "border border-line bg-primary-soft",
  highlight: "border-2 border-primary bg-surface",
  dark: "bg-surface-dark text-white",
};

export function Card({
  tone = "plain",
  interactive,
  className,
  as = "div",
  ...props
}: React.HTMLAttributes<HTMLElement> & { tone?: Tone; interactive?: boolean; as?: "div" | "section" | "article" | "li" }) {
  const Tag = as as React.ElementType<React.HTMLAttributes<HTMLElement>>;
  return (
    <Tag
      className={cn(
        "rounded-xl p-6 shadow-sm",
        tones[tone],
        interactive && "transition-shadow hover:shadow-md",
        className
      )}
      {...props}
    />
  );
}
