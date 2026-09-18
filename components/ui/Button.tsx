import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline";
type Size = "sm" | "md" | "lg";

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold tracking-tight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 disabled:opacity-50 disabled:pointer-events-none";
  const variants: Record<Variant, string> = {
    primary: "bg-blue-energy text-white hover:bg-navy-electric shadow-sm hover:shadow-md rounded-full",
    secondary: "bg-icy-blue text-navy-electric border border-icy-blue hover:bg-baby-blue-ice rounded-full",
    outline: "bg-transparent border border-navy-electric text-navy-electric hover:bg-icy-blue rounded-full",
  };
  const sizes: Record<Size, string> = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-[48px] px-8 text-[15px]",
  };
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; size?: Size }) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold tracking-tight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600";
  const variants: Record<Variant, string> = {
    primary: "bg-blue-energy text-white hover:bg-navy-electric shadow-sm hover:shadow-md rounded-full",
    secondary: "bg-icy-blue text-navy-electric border border-icy-blue hover:bg-baby-blue-ice rounded-full",
    outline: "bg-transparent border border-navy-electric text-navy-electric hover:bg-icy-blue rounded-full",
  };
  const sizes: Record<Size, string> = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-[48px] px-8 text-[15px]",
  };
  return <a className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
