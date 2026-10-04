"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/img/logo.png";
import { ArrowRight, X, Home, Layers3, IndianRupee, Workflow, FileCheck, Mail, User, ShieldCheck, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Debt Consolidation", href: "/debt-consolidation", icon: Layers3 },
  { label: "Personal Loan", href: "/personal-loan", icon: IndianRupee },
  { label: "How It Works", href: "/how-it-works", icon: Workflow },
  { label: "Eligibility", href: "/eligibility", icon: FileCheck },
];

const DRAWER_ANIMATION = {
  initial: { x: "100%" },
  enter: { x: "0%", transition: { type: "spring" as const, bounce: 0, duration: 0.4 } },
  exit: { x: "100%", transition: { type: "spring" as const, bounce: 0, duration: 0.3 } },
};

const OVERLAY_ANIMATION = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};


export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const hasCookie = document.cookie.includes('team_branch=');
      setIsLoggedIn(!!user || hasCookie);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      document.cookie = 'team_branch=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      setIsLoggedIn(false);
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/team')) return null;

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent h-[60px] sm:h-auto sm:py-5 px-4 md:px-6 lg:px-8 flex items-center">
        <div className="w-full mx-auto max-w-[1220px] flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group relative z-10 shrink-0">
            <Image 
              src={logo}
              alt="Credit Expert"
              width={160}
              height={40}
              className="h-[34px] sm:h-10 w-auto object-contain group-hover:opacity-80 transition-opacity"
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
                    className={`relative px-4 py-2 text-[15px] font-medium transition-colors rounded-full flex items-center ${
                      pathname === l.href
                        ? 'text-slate-900'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                    }`}
                  >
                    {pathname === l.href && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-slate-100/80 rounded-full"
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
          <div className="hidden lg:flex items-center justify-end gap-5 relative z-10 shrink-0">
            <a
              href="/contact"
              className="text-[15px] font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Contact
            </a>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-[15px] font-medium text-slate-600 hover:text-red-600 transition-colors"
              >
                Log out
              </button>
            ) : (
              <a
                href="/admin/login"
                className="text-[15px] font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Sign in <span className="ml-0.5 opacity-50">&rarr;</span>
              </a>
            )}
            <a
              href="#lead-form"
              className="group flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-[15px] font-medium text-white transition-all duration-200 hover:bg-slate-800 hover:shadow-md active:scale-95"
            >
              Get Assessment
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div
            onClick={() => setOpen(!open)}
            className="relative w-[40px] h-[40px] rounded-md bg-[#1769D1] hover:bg-[#071B4F] flex items-center justify-center cursor-pointer lg:hidden z-50 transition-colors shadow-sm"
          >
            <div className="relative w-5 h-[14px] flex flex-col justify-between items-center">
              <span className={`block h-[2px] w-5 bg-white transition-transform duration-300 ${open ? "rotate-45 translate-y-[6px]" : ""}`}></span>
              <span className={`block h-[2px] w-5 bg-white transition-opacity duration-300 ${open ? "opacity-0" : ""}`}></span>
              <span className={`block h-[2px] w-5 bg-white transition-transform duration-300 ${open ? "-rotate-45 -translate-y-[6px]" : ""}`}></span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop & Menu */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              variants={OVERLAY_ANIMATION}
              initial="initial"
              animate="enter"
              exit="exit"
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              variants={DRAWER_ANIMATION}
              initial="initial"
              animate="enter"
              exit="exit"
              className="absolute top-0 right-0 h-[100dvh] w-screen max-w-none bg-white shadow-2xl overflow-y-auto flex flex-col"
            >
              {/* Header */}
              <div className="h-[60px] sm:h-auto sm:py-5 px-4 md:px-6 lg:px-8 flex items-center justify-between">
                <Image src={logo} alt="Credit Expert" className="h-[34px] sm:h-10 w-auto object-contain" priority />
                <div
                  onClick={() => setOpen(false)}
                  className="relative w-[40px] h-[40px] rounded-md bg-[#1769D1] hover:bg-[#071B4F] flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                >
                  <X className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Primary Navigation */}
              <div className="px-4 mt-2 flex-1">
                <div className="flex flex-col space-y-1">
                  {navLinks.map((l) => {
                    const Icon = l.icon;
                    const isActive = pathname === l.href;
                    return (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className={`group flex items-center p-2 rounded-[16px] transition-colors ${isActive ? 'bg-[#EFF6FF]' : 'hover:bg-slate-50'}`}
                      >
                        <div className="w-10 h-10 bg-slate-100 rounded-[12px] flex items-center justify-center mr-3 group-hover:bg-blue-50 transition-colors">
                          <Icon className="w-4 h-4 text-[#0B2945]" />
                        </div>
                        <span className="text-[17px] font-semibold text-[#0B2945] flex-1 tracking-tight">
                          {l.label}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0B2945] group-hover:translate-x-1 transition-all" />
                      </Link>
                    );
                  })}
                </div>

                <div className="my-4 border-t border-[#E8EEF5]" />

                {/* Primary CTA */}
                <Link
                  href="#lead-form"
                  onClick={() => setOpen(false)}
                  className="mx-2 mb-4 group flex items-center justify-between p-3 rounded-full text-white active:scale-[0.98] transition-transform shadow-lg shadow-blue-900/20"
                  style={{ background: 'linear-gradient(135deg, #0B5ED7, #0751C9)' }}
                >
                  <span className="text-[16px] font-semibold pl-2">Get Free Assessment</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                {/* Secondary Actions */}
                <div className="flex flex-col space-y-1 px-2 pb-6">
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="group flex items-center p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-[10px] bg-slate-50 flex items-center justify-center mr-3 group-hover:bg-slate-100 transition-colors">
                      <Mail className="w-[16px] h-[16px] text-[#0B2945]" />
                    </div>
                    <span className="text-[16px] font-medium text-[#0B2945] flex-1 tracking-tight">Contact Us</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
                  </Link>

                  {isLoggedIn ? (
                    <button
                      onClick={() => { setOpen(false); handleLogout(); }}
                      className="group flex items-center p-2 rounded-xl hover:bg-red-50 transition-colors text-left"
                    >
                      <div className="w-9 h-9 rounded-[10px] bg-red-50 flex items-center justify-center mr-3 group-hover:bg-red-100 transition-colors">
                        <LogOut className="w-[16px] h-[16px] text-red-600" />
                      </div>
                      <span className="text-[16px] font-medium text-red-600 flex-1 tracking-tight">Log out</span>
                      <ArrowRight className="w-3.5 h-3.5 text-red-200 group-hover:text-red-300 group-hover:translate-x-1 transition-all" />
                    </button>
                  ) : (
                    <Link
                      href="/admin/login"
                      onClick={() => setOpen(false)}
                      className="group flex items-center p-2 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-[10px] bg-slate-50 flex items-center justify-center mr-3 group-hover:bg-slate-100 transition-colors">
                        <User className="w-[16px] h-[16px] text-[#0B2945]" />
                      </div>
                      <span className="text-[16px] font-medium text-[#0B2945] flex-1 tracking-tight">Staff Login</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Decorative Wave & Trust */}
              <div className="relative mt-auto pt-2 pb-4 px-6 overflow-hidden">
                <div className="relative z-10 flex items-center justify-center space-x-2 text-[#7A8A9A]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="text-[12px] font-medium tracking-wide">Secure • Private • Transparent</span>
                </div>
                
                {/* Subtle Wave SVG */}
                <svg className="absolute bottom-0 left-0 w-full text-[#E8EEF5]/40 pointer-events-none" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
                  <path d="M0,0 C240,100 480,100 720,50 C960,0 1200,0 1440,50 L1440,120 L0,120 Z" fill="currentColor" />
                </svg>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
