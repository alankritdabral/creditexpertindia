import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
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
    primary: "bg-[#0B1D3A] text-white hover:bg-[#162d52] shadow-sm hover:shadow-md rounded-full",
    secondary: "bg-white text-[#0B1D3A] border border-[#e2e8f0] hover:bg-slate-50 rounded-full",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100 rounded-full",
    outline: "bg-transparent border border-slate-300 text-[#0B1D3A] hover:bg-slate-50 rounded-full",
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
    primary: "bg-[#0B1D3A] text-white hover:bg-[#162d52] shadow-sm hover:shadow-md rounded-full",
    secondary: "bg-white text-[#0B1D3A] border border-[#e2e8f0] hover:bg-slate-50 rounded-full",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100 rounded-full",
    outline: "bg-transparent border border-slate-300 text-[#0B1D3A] hover:bg-slate-50 rounded-full",
  };
  const sizes: Record<Size, string> = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-[48px] px-8 text-[15px]",
  };
  return <a className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
