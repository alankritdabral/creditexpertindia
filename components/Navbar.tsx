"use client";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/content/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <div
        className={`pointer-events-auto flex w-full max-w-5xl items-center justify-between rounded-full border transition-all duration-500 ${
          scrolled
            ? "border-slate-200/60 bg-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl py-2 px-4"
            : "border-transparent bg-transparent py-4 px-2"
        }`}
      >
        {/* Brand Logo */}
        <a href="/" className="group flex items-center gap-2 ml-1">
          <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-white shadow-sm">
            <span className="text-[10px] font-black">CE</span>
          </div>
          <span className="text-base font-bold tracking-tight text-slate-900">
            Credit Expert
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-4">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden lg:flex items-center mr-1">
          <a
            href="#lead-form"
            className="group flex h-9 items-center justify-center gap-1.5 rounded-full bg-slate-900 px-4 text-xs font-bold tracking-tight text-white transition-all hover:bg-black"
          >
            <span>Get started</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm border border-slate-200 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute left-4 right-4 top-20 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-2 pt-4 border-t border-slate-100">
                <a
                  href="#login"
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center justify-center rounded-xl bg-slate-50 text-sm font-bold text-slate-900 border border-slate-200"
                >
                  Log in
                </a>
                <a
                  href="#lead-form"
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white shadow-lg shadow-slate-900/20"
                >
                  Get started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

