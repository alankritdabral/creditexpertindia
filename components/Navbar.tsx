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
          ? "border-b border-slate-800 bg-[#091328]/95 backdrop-blur-md shadow-lg py-3"
          : "border-b border-slate-800/80 bg-[#091328] py-4"
      }`}
    >
      <div className="container-narrow flex items-center justify-between">
        {/* Brand Logo */}
        <a href="/" className="group flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 font-extrabold text-slate-950 shadow-md">
            <span className="text-sm tracking-tight font-black">CE</span>
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="text-[17px] font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                Credit Expert
              </span>
              <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-extrabold text-emerald-400 border border-emerald-500/20">
                INDIA
              </span>
            </div>
            <div className="text-[9px] font-semibold tracking-widest text-slate-400 uppercase">
              Salaried Debt Advisory
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center gap-1 lg:flex bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden items-center gap-2.5 lg:flex">
          <a
            href="https://wa.me/919876543210?text=Hi%2C%20I%20would%20like%20help%20with%20my%20loans%2FEMIs%20and%20want%20to%20understand%20my%20options."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10"
          >
            <span>💬 Talk to Expert</span>
          </a>

          <a
            href="#lead-form"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-emerald-500 px-4 text-xs font-extrabold text-slate-950 hover:bg-emerald-400 transition-all shadow-sm"
          >
            <span>Check Eligibility</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-white lg:hidden"
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
            className="overflow-hidden border-t border-slate-800 bg-[#091328] lg:hidden"
          >
            <div className="container-narrow flex flex-col gap-1 py-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2 pt-3 border-t border-slate-800">
                <a
                  href="#lead-form"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-700 bg-slate-800 px-3 text-xs font-semibold text-white"
                >
                  <Phone className="h-3.5 w-3.5 text-emerald-400" />
                  Call Expert
                </a>
                <a
                  href="#lead-form"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md bg-emerald-500 px-3 text-xs font-bold text-slate-950"
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
