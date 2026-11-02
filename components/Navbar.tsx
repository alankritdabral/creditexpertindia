"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/img/logo.webp";
import { ArrowRight, X, Mail, User, ShieldCheck, LogOut, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { cities } from "@/lib/cities";

type MenuLink = { label: string; desc?: string; href: string };
type Column = { title: string; links: MenuLink[]; gradient?: string };
type Menu = {
  key: string;
  label: string;
  columns: Column[];
  sidebar?: { title: string; links: MenuLink[]; promo?: { img: string; title: string; text: string; cta: string; href: string } };
  footer?: MenuLink;
  narrow?: boolean;
};

const G1 = "linear-gradient(90deg,#0052CC,#BFDBFE 55%,#ff9a3c)";
const G2 = "linear-gradient(90deg,#0052CC,#BFDBFE 55%,#ffd24d)";
const G3 = "linear-gradient(90deg,#0052CC,#a98bff 60%,#ff6fb5)";

const promoAssessment = {
  img: "/img/multipleloans.webp",
  title: "Not sure where to start?",
  text: "Get a free assessment. We'll look at your loans and tell you honestly what could help.",
  cta: "Start now",
  href: "/eligibility#credit-profile",
};

const menus: Menu[] = [
  {
    key: "loans",
    label: "Loans",
    columns: [
      {
        title: "Personal loans",
        gradient: G1,
        links: [
          { label: "Personal loan", desc: "From 9.95% p.a.* for salaried", href: "/personal-loan" },
          { label: "Balance transfer", desc: "Move a loan to a lower rate", href: "/loan-balance-transfer" },
          { label: "High-interest loans", desc: "Refinance expensive EMIs", href: "/high-interest-loan" },
          { label: "Overdraft options", desc: "Flexible credit for salaried", href: "/personal-loan-overdraft" },
        ],
      },
      {
        title: "Debt help",
        gradient: G2,
        links: [
          { label: "Debt consolidation", desc: "Many EMIs, one payment", href: "/debt-consolidation" },
          { label: "Credit-card debt", desc: "Clear card dues faster", href: "/credit-card-debt" },
          { label: "App loans", desc: "Combine app loans into one", href: "/app-loan" },
        ],
      },
      {
        title: "Check first",
        gradient: G3,
        links: [
          { label: "Eligibility", desc: "See what you may qualify for", href: "/eligibility" },
          { label: "Free assessment", desc: "Talk to a credit expert", href: "/eligibility#credit-profile" },
        ],
      },
    ],
    sidebar: {
      title: "More",
      links: [
        { label: "How it works", desc: "Four simple steps", href: "/how-it-works" },
        { label: "FAQ", desc: "Straight answers", href: "/faq" },
        { label: "Contact", desc: "Talk to a real person", href: "/contact" },
      ],
      promo: promoAssessment,
    },
    footer: { label: "See all personal loans", href: "/personal-loan" },
  },
  {
    key: "calculators",
    label: "Calculators",
    narrow: true,
    columns: [
      {
        title: "Calculators",
        gradient: G1,
        links: [
          { label: "Personal loan EMI calculator", desc: "Your EMI, interest and total", href: "/personal-loan-emi-calculator" },
          { label: "EMI savings calculator", desc: "What one loan could save you", href: "/emi-savings-calculator" },
          { label: "Debt consolidation calculator", desc: "Merge several debts into one", href: "/calculators/debt-consolidation-calculator" },
        ],
      },
    ],
    sidebar: { title: "Next step", links: [{ label: "Check eligibility", desc: "Free and quick", href: "/eligibility" }], promo: promoAssessment },
  },
  {
    key: "cities",
    label: "Cities",
    columns: [
      { title: "Personal loans by city", gradient: G2, links: cities.slice(0, 5).map((c) => ({ label: c.name, href: `/personal-loan-in-${c.slug}` })) },
      { title: "More cities", gradient: G3, links: cities.slice(5, 10).map((c) => ({ label: c.name, href: `/personal-loan-in-${c.slug}` })) },
      { title: "And also", gradient: G1, links: cities.slice(10).map((c) => ({ label: c.name, href: `/personal-loan-in-${c.slug}` })) },
    ],
    footer: { label: "Our offices: Dehradun, Delhi, Rudrapur", href: "/contact" },
  },
  {
    key: "resources",
    label: "Resources",
    columns: [
      {
        title: "Learn",
        gradient: G1,
        links: [
          { label: "Learning center", desc: "Loans and EMIs, explained", href: "/learning-center" },
          { label: "How it works", desc: "What happens after you reach out", href: "/how-it-works" },
          { label: "FAQ", desc: "Questions people ask first", href: "/faq" },
        ],
      },
      {
        title: "Company",
        gradient: G2,
        links: [
          { label: "About us", desc: "Who we are", href: "/about" },
          { label: "Contact", desc: "Offices, phone and email", href: "/contact" },
          { label: "Partner disclosures", desc: "How we work with lenders", href: "/partner-disclosures" },
        ],
      },
      {
        title: "Popular guides",
        gradient: G3,
        links: [
          { label: "What is an EMI?", href: "/learning-center/what-is-emi-and-how-is-it-calculated" },
          { label: "Debt consolidation explained", href: "/learning-center/debt-consolidation-explained-for-salaried-borrowers" },
          { label: "Overdraft vs personal loan", href: "/learning-center/overdraft-vs-personal-loan" },
        ],
      },
    ],
  },
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
  const [active, setActive] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [hoverKey, setHoverKey] = useState<string | null>(null);
  const [barHover, setBarHover] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unmountTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useRef(false);
  const [renderKey, setRenderKey] = useState<string | null>(null);
  const [phase, setPhase] = useState<"initial" | "open" | "close">("close");
  const [panelH, setPanelH] = useState<number | null>(null);
  const panelInner = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const hasCookie = document.cookie.includes('team_branch=');
      setIsLoggedIn(!!user || hasCookie);
    });
    return () => unsubscribe();
  }, []);

  const showPanel = useCallback((key: string) => {
    if (unmountTimer.current) clearTimeout(unmountTimer.current);
    setRenderKey(key);
    setActive(key);
    if (!mounted.current) {
      mounted.current = true;
      setPhase("initial");
      requestAnimationFrame(() => requestAnimationFrame(() => setPhase("open")));
    } else {
      setPhase("open");
    }
  }, []);

  const hidePanel = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current);
    setActive(null);
    setHoverKey(null);
    if (!mounted.current) return;
    setPhase("close");
    if (unmountTimer.current) clearTimeout(unmountTimer.current);
    unmountTimer.current = setTimeout(() => {
      mounted.current = false;
      setRenderKey(null);
      setPanelH(null);
    }, 280);
  }, []);

  // hover intent (~150ms) like Stripe; click opens immediately
  const openMenu = useCallback(
    (key: string, immediate = false) => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      if (openTimer.current) clearTimeout(openTimer.current);
      if (immediate) return showPanel(key);
      openTimer.current = setTimeout(() => showPanel(key), mounted.current ? 110 : 150);
    },
    [showPanel]
  );
  const scheduleClose = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => hidePanel(), 130);
  }, [hidePanel]);
  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  // follow the content height so the panel morphs between menus
  useEffect(() => {
    const el = panelInner.current;
    if (!el || !renderKey) return;
    const ro = new ResizeObserver(() => setPanelH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [renderKey]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hidePanel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hidePanel]);

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

  const activeMenu = active ? menus.find((m) => m.key === active) || null : null;
  const renderMenu = menus.find((m) => m.key === renderKey) || null;
  const assessmentHref = pathname === "/" ? "#lead-form" : pathname === "/eligibility" ? "#credit-profile" : "/eligibility#credit-profile";

  return (
    <>
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="hidden lg:block fixed inset-0 z-40 bg-[#0a2540]/10 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <header
        className={`absolute top-0 left-0 right-0 z-50 h-[60px] lg:h-[76px] px-4 md:px-6 lg:px-8 flex items-start lg:items-center`}
      >
        <div
          className="relative w-full mx-auto max-w-[1220px] h-full"
          onMouseEnter={() => {
            setBarHover(true);
            cancelClose();
          }}
          onMouseLeave={() => {
            setBarHover(false);
            scheduleClose();
          }}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) hidePanel();
          }}
        >
          {/* Bar highlight: spans logo to CTA, lights up when the bar is hovered */}
          <div
            aria-hidden
            className={`hidden lg:block absolute -inset-x-5 inset-y-[8px] rounded-xl border transition-[background-color,box-shadow,border-color] duration-200 ${
              barHover || active
                ? "bg-white border-[#E2E8F0] shadow-[0_8px_24px_-12px_rgba(10,37,64,0.25)]"
                : "bg-transparent border-transparent"
            }`}
          />

          {/* Mega panel: Stripe-style. Hover intent, clip-path reveal, height morph between menus */}
          {renderMenu && (
            <nav
              id="mega-panel"
              aria-label={`${renderMenu.label} menu`}
              data-status={phase}
              onClick={() => hidePanel()}
              style={{
                height: panelH ?? "auto",
                width: renderMenu.narrow ? 820 : "calc(100% + 56px)",
                clipPath:
                  phase === "open"
                    ? "inset(0px -60px -60px round 0px 0px 6px 6px)"
                    : "inset(0px -60px calc(100% - 82px) round 0px 0px 6px 6px)",
                transition:
                  "clip-path 0.2s cubic-bezier(0.45,0.05,0.55,0.95), height 0.28s cubic-bezier(0.45,0.05,0.55,0.95), width 0.28s cubic-bezier(0.45,0.05,0.55,0.95)",
              }}
              className="hidden lg:block absolute left-[-28px] top-[6px] z-0 bg-white rounded-md border border-[#E2E8F0] overflow-hidden shadow-[0_18px_36px_-18px_rgba(0,0,0,0.1),0_30px_45px_-30px_rgba(50,50,93,0.25)]"
            >
              <div ref={panelInner}>
                <motion.div key={renderMenu.key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.16 }}>
                  <div className={`grid ${renderMenu.sidebar ? "grid-cols-[1fr_300px]" : "grid-cols-1"}`}>
                    <div className="pt-[84px] px-12">
                      <div className={`grid gap-10 pb-10 ${renderMenu.columns.length === 1 ? "grid-cols-1 max-w-sm" : renderMenu.columns.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                        {renderMenu.columns.map((col) => (
                          <div key={col.title}>
                            <p className="text-base font-medium text-[#0A2540] pb-3 mb-4 relative">
                              {col.title}
                              <span className="absolute left-0 right-0 bottom-0 h-px" style={{ background: col.gradient || G1 }} />
                            </p>
                            <ul className="space-y-4">
                              {col.links.map((l) => (
                                <li key={l.href + l.label}>
                                  <Link href={l.href} className="group block">
                                    <span className="block text-base font-medium text-[#0052CC] group-hover:text-[#0A2540] transition-colors">{l.label}</span>
                                    {l.desc && <span className="block text-sm leading-snug text-[#3C4F69] mt-0.5">{l.desc}</span>}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {renderMenu.footer && (
                        <div className="-mx-12 px-12 py-5 border-t border-[#E2E8F0]">
                          <Link href={renderMenu.footer.href} className="text-base font-medium text-[#0052CC] hover:text-[#0A2540] inline-flex items-center gap-1">
                            {renderMenu.footer.label} <ChevronRight className="h-4 w-4" />
                          </Link>
                        </div>
                      )}
                    </div>
  
                    {renderMenu.sidebar && (
                      <div className="bg-[#F8FAFC] border-l border-[#E2E8F0] pt-[84px] px-8 pb-8">
                        <p className="text-base font-medium text-[#0A2540] mb-4">{renderMenu.sidebar.title}</p>
                        <ul className="space-y-4">
                          {renderMenu.sidebar.links.map((l) => (
                            <li key={l.href}>
                              <Link href={l.href} className="group block">
                                <span className="block text-base font-medium text-[#0052CC] group-hover:text-[#0A2540] transition-colors">{l.label}</span>
                                {l.desc && <span className="block text-sm text-[#3C4F69] mt-0.5">{l.desc}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        {renderMenu.sidebar.promo && (
                          <Link href={renderMenu.sidebar.promo.href} className="group mt-6 block bg-white border border-[#E2E8F0] rounded overflow-hidden">
                            <div className="relative h-[80px]">
                              <Image src={renderMenu.sidebar.promo.img} alt="" fill sizes="320px" className="object-cover" />
                            </div>
                            <div className="p-4">
                              <p className="text-base font-medium text-[#0A2540]">{renderMenu.sidebar.promo.title}</p>
                              <p className="mt-1 text-sm leading-snug text-[#3C4F69]">{renderMenu.sidebar.promo.text}</p>
                              <p className="mt-3 text-base font-medium text-[#0052CC] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                {renderMenu.sidebar.promo.cta} <ChevronRight className="h-4 w-4" />
                              </p>
                            </div>
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </nav>
          )}

          {/* The bar */}
          <div className="relative z-10 flex items-center justify-between h-full">
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <Image
                src={logo}
                alt="Credit Expert"
                width={160}
                height={40}
                className="h-[34px] sm:h-10 w-auto object-contain group-hover:opacity-80 transition-opacity"
                priority
              />
            </Link>

            <nav className="hidden lg:flex flex-1 items-center ml-10" aria-label="Main">
              <ul className="flex items-center gap-1">
                {menus.map((m) => {
                  const isOpen = active === m.key;
                  const focusKey = active || hoverKey;
                  const dim = !!focusKey && focusKey !== m.key;
                  return (
                    <li key={m.key}>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        aria-controls="mega-panel"
                        data-active={isOpen ? "" : undefined}
                        onMouseEnter={() => {
                          setHoverKey(m.key);
                          openMenu(m.key);
                        }}
                        onFocus={() => openMenu(m.key, true)}
                        onClick={() => (isOpen ? hidePanel() : openMenu(m.key, true))}
                        className={`h-10 px-3 text-base flex items-center gap-1 rounded transition-colors duration-200 cursor-pointer ${
                          dim ? "text-[#64748B]" : "text-[#0A2540]"
                        }`}
                      >
                        {m.label}
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                    </li>
                  );
                })}
                <li>
                  <Link
                    href="/eligibility"
                    onMouseEnter={() => {
                      hidePanel();
                      setHoverKey("eligibility");
                    }}
                    onMouseLeave={() => setHoverKey(null)}
                    onFocus={() => hidePanel()}
                    className={`h-10 px-3 text-base flex items-center rounded transition-colors duration-200 ${
                      (active || hoverKey) && (active || hoverKey) !== "eligibility" ? "text-[#64748B]" : "text-[#0A2540]"
                    }`}
                  >
                    Eligibility
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="hidden lg:flex items-center justify-end gap-2 shrink-0" onMouseEnter={() => hidePanel()}>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="h-10 px-5 text-base font-medium text-[#0052CC] bg-white border border-[#E2E8F0] rounded hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                >
                  Log out
                </button>
              ) : (
                <a
                  href="/admin/login"
                  className="h-10 px-5 inline-flex items-center text-base font-medium text-[#0052CC] bg-white border border-[#E2E8F0] rounded hover:bg-[#F8FAFC] transition-colors"
                >
                  Sign in
                </a>
              )}
              <Link
                href={assessmentHref}
                className="h-10 px-5 inline-flex items-center gap-1 text-base font-medium text-white bg-[#0052CC] hover:bg-[#1741b3] rounded transition-colors"
              >
                Get assessment <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(!open)}
              className="relative w-[40px] h-[40px] rounded-md bg-[#0052CC] hover:bg-[#0A2540] flex items-center justify-center cursor-pointer lg:hidden z-50 transition-colors shadow-sm"
            >
              <div className="relative w-5 h-[14px] flex flex-col justify-between items-center">
                <span className={`block h-[2px] w-5 bg-white transition-transform duration-300 ${open ? "rotate-45 translate-y-[6px]" : ""}`}></span>
                <span className={`block h-[2px] w-5 bg-white transition-opacity duration-300 ${open ? "opacity-0" : ""}`}></span>
                <span className={`block h-[2px] w-5 bg-white transition-transform duration-300 ${open ? "-rotate-45 -translate-y-[6px]" : ""}`}></span>
              </div>
            </button>
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
                  className="relative w-[40px] h-[40px] rounded-md bg-[#0052CC] hover:bg-[#0A2540] flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                >
                  <X className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Primary Navigation */}
              <div className="px-4 mt-2 flex-1">
                <div className="flex flex-col">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-3.5 px-2 text-lg font-semibold text-[#0A2540] tracking-tight"
                  >
                    Home
                  </Link>

                  {menus.map((m) => {
                    const isOpen = mobileGroup === m.key;
                    const groups = [...m.columns, ...(m.sidebar ? [{ title: m.sidebar.title, links: m.sidebar.links }] : [])];
                    return (
                      <div key={m.key} className="border-t border-[#E2E8F0]">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setMobileGroup(isOpen ? null : m.key)}
                          className="w-full flex items-center justify-between py-3.5 px-2 text-lg font-semibold text-[#0A2540] tracking-tight cursor-pointer"
                        >
                          {m.label}
                          <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <div className="px-2 pb-4 space-y-5">
                                {groups.map((g) => (
                                  <div key={g.title}>
                                    <p className="text-sm font-semibold text-[#64748B] mb-2">{g.title}</p>
                                    <ul className="space-y-3">
                                      {g.links.map((l) => (
                                        <li key={l.href + l.label}>
                                          <Link href={l.href} onClick={() => setOpen(false)} className="block">
                                            <span className="block text-base font-medium text-[#0052CC]">{l.label}</span>
                                            {l.desc && <span className="block text-sm text-[#3C4F69]">{l.desc}</span>}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}

                  <Link
                    href="/eligibility"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-3.5 px-2 text-lg font-semibold text-[#0A2540] tracking-tight border-t border-[#E2E8F0]"
                  >
                    Eligibility
                  </Link>
                </div>

                <div className="my-4 border-t border-[#E2E8F0]" />

                {/* Primary CTA */}
                <Link
                  href={pathname === "/" ? "#lead-form" : pathname === "/eligibility" ? "#credit-profile" : "/eligibility#credit-profile"}
                  onClick={() => setOpen(false)}
                  className="mx-2 mb-4 group flex items-center justify-between p-3 rounded text-white active:scale-[0.98] transition-transform shadow-lg shadow-blue-900/20"
                  style={{ background: 'linear-gradient(135deg, #0B5ED7, #0751C9)' }}
                >
                  <span className="text-base font-semibold pl-2">Get Free Assessment</span>
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
                      <Mail className="w-[16px] h-[16px] text-[#0A2540]" />
                    </div>
                    <span className="text-base font-medium text-[#0A2540] flex-1 tracking-tight">Contact Us</span>
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
                      <span className="text-base font-medium text-red-600 flex-1 tracking-tight">Log out</span>
                      <ArrowRight className="w-3.5 h-3.5 text-red-200 group-hover:text-red-300 group-hover:translate-x-1 transition-all" />
                    </button>
                  ) : (
                    <Link
                      href="/admin/login"
                      onClick={() => setOpen(false)}
                      className="group flex items-center p-2 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-[10px] bg-slate-50 flex items-center justify-center mr-3 group-hover:bg-slate-100 transition-colors">
                        <User className="w-[16px] h-[16px] text-[#0A2540]" />
                      </div>
                      <span className="text-base font-medium text-[#0A2540] flex-1 tracking-tight">Staff Login</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Decorative Wave & Trust */}
              <div className="relative mt-auto pt-2 pb-4 px-6 overflow-hidden">
                <div className="relative z-10 flex items-center justify-center space-x-2 text-[#64748B]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium tracking-wide">Secure • Private • Transparent</span>
                </div>
                
                {/* Subtle Wave SVG */}
                <svg className="absolute bottom-0 left-0 w-full text-[#E2E8F0]/40 pointer-events-none" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
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
