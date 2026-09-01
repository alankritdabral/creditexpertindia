"use client";
import { useEffect, useState } from "react";
import { Menu, X, Phone, ShieldCheck, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/content/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "border-b border-transparent bg-transparent py-4"
      }`}
    >
      <div className="container-narrow flex items-center justify-between">
        {/* Brand Logo */}
        <a href="/" className="group flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-extrabold text-white shadow-md">
            <span className="text-sm tracking-tight font-black">CE</span>
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="text-[17px] font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Credit Expert
              </span>
              <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[9px] font-extrabold text-blue-600 border border-blue-200">
                INDIA
              </span>
            </div>
            <div className="text-[9px] font-semibold tracking-widest text-slate-500 uppercase">
              Salaried Debt Advisory
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center gap-1 lg:flex bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden items-center gap-2.5 lg:flex">
          <a
            href="#lead-form"
            className="group inline-flex h-10 items-center justify-center gap-2 rounded-full bg-blue-600 px-5 text-xs font-extrabold tracking-wide text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20"
          >
            <span>Check Eligibility</span>
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-blue-600">
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </div>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-slate-200 bg-white lg:hidden"
          >
            <div className="container-narrow flex flex-col gap-1 py-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                <a
                  href="#lead-form"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-700"
                >
                  <Phone className="h-3.5 w-3.5 text-blue-600" />
                  Call Expert
                </a>
                <a
                  href="#lead-form"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md bg-blue-600 px-3 text-xs font-bold text-white shadow-sm"
                >
                  <span>Check Eligibility</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
