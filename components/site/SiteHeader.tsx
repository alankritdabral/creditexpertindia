"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/public/img/logo.webp";
import { navLinks, solutionLinks, ctas } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const StaffSession = dynamic(() => import("@/components/site/StaffSession"), { ssr: false });

const linkClass = (active: boolean) =>
  cn(
    "inline-flex h-11 items-center rounded-lg px-3 text-[15px] font-medium transition-colors",
    active ? "text-primary" : "text-ink hover:bg-primary-soft"
  );

function SolutionsMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const active = solutionLinks.some((l) => l.href === pathname);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const onOutside = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("focusin", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("focusin", onOutside);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls="solutions-menu"
        onClick={() => setOpen((o) => !o)}
        className={cn(linkClass(active), "gap-1")}
      >
        Debt Solutions
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>
      {open ? (
        <ul id="solutions-menu" className="absolute left-0 top-full z-50 mt-2 w-80 rounded-xl border border-line bg-surface p-2 shadow-lg">
          {solutionLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className="block rounded-lg px-3 py-2.5 hover:bg-primary-soft"
              >
                <span className="block text-[15px] font-semibold text-ink">{l.label}</span>
                <span className="block text-sm text-ink-muted">{l.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const cta = (
    <ButtonLink href="/#get-started" size="md" onClick={() => track("cta_click", { location: "header", label: ctas.primary })}>
      {ctas.primary}
    </ButtonLink>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center gap-2 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="mr-2 flex shrink-0 items-center" aria-label="Credit Expert India home">
          <Image src={logo} alt="Credit Expert India" width={160} height={40} priority className="h-8 w-auto sm:h-9" />
        </Link>

        <nav aria-label="Main" className="hidden flex-1 items-center gap-1 lg:flex">
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined} className={linkClass(pathname === "/")}>Home</Link>
          <SolutionsMenu pathname={pathname} />
          {navLinks.filter((l) => l.href !== "/").map((l) => (
            <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined} className={linkClass(pathname === l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <StaffSession />
          <div className="hidden lg:block">
            <WhatsAppButton location="header" variant="secondary" label={ctas.secondary} />
          </div>
          <div className="hidden sm:block">{cta}</div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink hover:bg-primary-soft lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav id="mobile-nav" aria-label="Mobile" className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line bg-surface px-4 pb-6 pt-2 lg:hidden">
          <ul>
            <li>
              <Link href="/" className="flex h-12 items-center text-base font-medium">Home</Link>
            </li>
            <li className="border-t border-line py-2">
              <p className="px-0 py-2 text-sm font-semibold text-ink-muted">Debt solutions</p>
              <ul>
                {solutionLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} aria-current={pathname === l.href ? "page" : undefined} className="flex h-11 items-center text-base">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </li>
            {navLinks.filter((l) => l.href !== "/").map((l) => (
              <li key={l.href} className="border-t border-line">
                <Link href={l.href} aria-current={pathname === l.href ? "page" : undefined} className="flex h-12 items-center text-base font-medium">{l.label}</Link>
              </li>
            ))}
            <li className="border-t border-line">
              <Link href="/contact" className="flex h-12 items-center text-base font-medium">Contact</Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
