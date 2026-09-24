"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/img/logo.png";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Debt Consolidation", href: "/debt-consolidation" },
  { label: "Personal Loan", href: "/personal-loan" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Eligibility", href: "/eligibility" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/team')) return null;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-white py-5'} border-b border-icy-blue px-4 md:px-6 lg:px-8`}>
        <div className="mx-auto max-w-[1220px] flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group relative z-10 shrink-0">
            <Image 
              src={logo}
              alt="Credit Expert"
              width={160}
              height={40}
              className="h-9 md:h-10 w-auto object-contain group-hover:opacity-80 transition-opacity"
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex flex-1 items-center justify-center">
            <ul className="flex items-center gap-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`relative px-4 py-2 text-[14px] font-bold transition-colors rounded-full flex items-center ${
                      pathname === l.href
                        ? 'text-blue-energy'
                        : 'text-brand-black/80 hover:text-brand-black hover:bg-slate-50'
                    }`}
                  >
                    {pathname === l.href && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-blue-energy/10 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center justify-end gap-6 relative z-10 shrink-0">
            <a
              href="/admin/login"
              className="text-[14px] font-bold text-brand-black/80 hover:text-brand-black transition-colors"
            >
              Staff Login
            </a>
            <a
              href="/contact"
              className="text-[14px] font-bold text-brand-black/80 hover:text-brand-black transition-colors"
            >
              Contact Us
            </a>
            <a
              href="#lead-form"
              className="group flex items-center justify-center rounded-full bg-[#0A2540] px-4 py-2 text-[14px] font-bold text-white transition-all duration-300 hover:bg-[#113355] hover:shadow-[0_0_15px_rgba(10,37,64,0.3)] active:scale-95"
            >
              Get Free Assessment
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="inline-flex items-center justify-center text-brand-black lg:hidden relative z-10"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
              className="fixed inset-0 z-40 bg-white lg:hidden pt-24 px-6"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-2xl font-bold text-brand-black"
                  >
                    {l.label}
                  </a>
                ))}
                <div className="mt-8 flex flex-col gap-4 border-t border-slate-100 pt-8">
                  <a
                    href="#lead-form"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-4 text-lg font-medium text-white"
                  >
                    Get Free Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                  <a
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center px-6 py-4 text-lg font-medium text-brand-black"
                  >
                    Contact Us
                  </a>
                  <a
                    href="/admin/login"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center px-6 py-4 text-lg font-medium text-brand-black"
                  >
                    Staff Login
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
