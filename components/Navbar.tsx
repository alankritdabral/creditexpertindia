"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Solutions", href: "/#solutions" },
  { label: "About Us", href: "/#about-us" },
  { label: "FAQ", href: "/#faq" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
        <div className="pointer-events-auto relative flex w-full max-w-[1000px] items-center justify-between rounded-full bg-white px-3 py-2 shadow-[0_0_0_4px_rgba(221,229,237,0.7),0_8px_30px_rgba(0,0,0,0.04)]">
          
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-2 ml-3 relative z-10">
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Credit Expert India
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 pointer-events-auto">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="px-4 py-2 rounded-full text-[15px] font-semibold text-[#4d585f] transition-all duration-200 hover:bg-[#edf1f4] hover:text-[#1d1d1d]"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center relative z-10 pointer-events-auto mr-1">
            <a
              href="#lead-form"
              className="group flex h-11 items-center justify-center gap-3 rounded-full bg-gradient-to-b from-[#323232] to-[#000000] pl-5 pr-1.5 text-sm font-semibold tracking-tight text-white shadow-[inset_1px_1px_1px_rgba(255,255,255,0.2),0_4px_16px_rgba(29,29,29,0.3)] transition-transform hover:scale-[1.02]"
            >
              <span>Get My Free Assessment</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#1d1d1d] shadow-sm">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1d1d1d] text-white shadow-sm lg:hidden relative z-10 transition-transform active:scale-95 pointer-events-auto mr-1"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Backdrop & Menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed left-4 right-4 top-24 z-50 overflow-hidden rounded-[24px] bg-white p-4 shadow-2xl lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-4 text-base font-semibold text-[#4d585f] transition-colors hover:bg-[#edf1f4] hover:text-[#1d1d1d]"
                  >
                    {l.label}
                  </a>
                ))}
                <div className="mt-2 pt-4 border-t border-slate-100">
                  <a
                    href="#lead-form"
                    onClick={() => setOpen(false)}
                    className="flex h-14 items-center justify-between rounded-xl bg-gradient-to-b from-[#323232] to-[#000000] px-4 text-sm font-semibold text-white shadow-[inset_1px_1px_1px_rgba(255,255,255,0.2),0_4px_16px_rgba(29,29,29,0.3)]"
                  >
                    <span className="ml-2">Get My Free Assessment</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1d1d1d]">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
