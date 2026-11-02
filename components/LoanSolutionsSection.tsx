"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Banknote, CreditCard, Landmark, Layers, Plus, Smartphone, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { LoanStage, type StageScene } from "./LoanStage";

type Solution = {
  id: string;
  label: string;
  icon: LucideIcon;
  headline: string;
  quote: string;
  points: string[];
  cta: { label: string; href: string };
  scene: StageScene;
};

const AUTOPLAY_MS = 6000;

const SOLUTIONS: Solution[] = [
  {
    id: "personal-loan",
    label: "Personal Loan",
    icon: Smartphone,
    headline: "Make your monthly repayments more manageable.",
    quote: "Get a better rate and a more manageable EMI, without the complexity.",
    points: [
      "Compare options from partner lenders in one place",
      "Choose a tenure that fits your monthly budget",
      "No obligation to proceed after you see your options",
    ],
    cta: { label: "Check your EMI options", href: "#calculator" },
    scene: { kind: "phone", tint: "rgba(0,102,255,0.08)" },
  },
  {
    id: "credit-card",
    label: "Credit Card",
    icon: CreditCard,
    headline: "Reduce the burden of expensive credit-card debt.",
    quote: "Take control of high-interest credit-card debt.",
    points: [
      "Card dues can carry rates of 40% p.a. or more",
      "A personal loan may bring that rate down",
      "One fixed EMI instead of a revolving balance",
    ],
    cta: { label: "Explore card debt options", href: "/credit-card-debt" },
    scene: { kind: "card", tint: "rgba(0,102,255,0.06)", rate: { from: 45, to: 11 } },
  },
  {
    id: "app-loans",
    label: "App Loans",
    icon: Smartphone,
    headline: "Bring scattered app loans into a clearer plan.",
    quote: "Simplify multiple app loans into one manageable payment.",
    points: [
      "Short-term app loans often come with steep rates",
      "Combine eligible ones into a single EMI",
      "One due date to remember instead of several",
    ],
    cta: { label: "See app loan options", href: "/app-loan" },
    scene: {
      kind: "merge",
      tint: "rgba(0,102,255,0.12)",
      emi: 15999,
      chips: [
        { amount: 8000, name: "App loan A", icon: Smartphone },
        { amount: 5500, name: "App loan B", icon: Smartphone },
        { amount: 3200, name: "App loan C", icon: Smartphone },
        { amount: 2800, name: "Other app loan", icon: Banknote },
      ],
    },
  },
  {
    id: "multiple-loans",
    label: "Multiple Loans",
    icon: Layers,
    headline: "Replace multiple payments with one simpler repayment.",
    quote: "I had four different payments to keep track of every month…",
    points: [
      "Mix personal loans, cards, overdrafts and app loans",
      "Track one EMI and one due date each month",
      "Illustrative figures; actual terms depend on your profile",
    ],
    cta: { label: "Explore debt consolidation", href: "/debt-consolidation" },
    scene: {
      kind: "merge",
      tint: "rgba(0,82,204,0.14)",
      emi: 24999,
      chips: [
        { amount: 12500, name: "Personal Loan", icon: Banknote },
        { amount: 8300, name: "Credit Card", icon: CreditCard },
        { amount: 4200, name: "Overdraft", icon: Landmark },
        { amount: 3800, name: "App Loan", icon: Smartphone },
      ],
    },
  },
  {
    id: "overdraft",
    label: "Overdraft",
    icon: Landmark,
    headline: "Explore options for expensive overdraft debt.",
    quote: "Take control of high-cost overdraft debt.",
    points: [
      "Overdraft interest adds up when balances linger",
      "A fixed-tenure loan can make repayment predictable",
      "See what you may qualify for before you decide",
    ],
    cta: { label: "Check overdraft options", href: "/personal-loan-overdraft" },
    scene: { kind: "rate", tint: "rgba(15,118,110,0.07)", rate: { from: 14, to: 11.75 } },
  },
];

const subscribeNoop = () => () => {};

function canAutoplay() {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;
  if (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency < 4) return false;
  return true;
}

export const LoanSolutionsSection = () => {
  const [openId, setOpenId] = useState(SOLUTIONS[0].id);
  const [stopped, setStopped] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(false);
  const reduceMotion = useReducedMotion() === true;
  const gridRef = useRef<HTMLDivElement>(null);
  const openIndex = Math.max(0, SOLUTIONS.findIndex((s) => s.id === openId));

  // Autoplay is decorative: skip it for reduced motion, data-saver and low-end hardware.
  const capable = useSyncExternalStore(subscribeNoop, canAutoplay, () => false);
  const autoplay = capable && !reduceMotion && !stopped;

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const select = (id: string) => {
    if (id === openId) return;
    setStopped(true); // a manual choice ends autoplay for good
    setOpenId(id);
  };

  const advance = () => setOpenId(SOLUTIONS[(openIndex + 1) % SOLUTIONS.length].id);
  const progressPaused = hovering || !inView;

  return (
    <section className="w-full bg-[#F8FAFC]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="text-base font-semibold tracking-wide text-[#0052CC] uppercase mb-4">Bring your eligible loans together</p>
          <h2 className="text-[32px] sm:text-[48px] leading-[1.05] tracking-[-0.03em] font-semibold text-[#0A2540]">
            One simpler way to manage multiple <span className="text-[#0052CC]">debts.</span>
          </h2>
          <p className="mt-5 text-lg md:text-xl text-[#3C4F69]">Different debts. Different stories. One smarter way forward.</p>
        </div>

        {/* On mobile the single stage is ordered to sit right under the open row, so it never remounts. */}
        <div
          ref={gridRef}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className="mt-12 flex flex-col lg:grid lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:items-start"
        >
          <ul className="contents lg:block lg:divide-y lg:divide-[#E2E8F0] lg:border-y lg:border-[#E2E8F0]">
            {SOLUTIONS.map((s, idx) => {
              const isOpen = s.id === openId;
              const Icon = s.icon;
              return (
                <li key={s.id} style={{ order: idx * 2 }} className="max-lg:border-b max-lg:border-[#E2E8F0] max-lg:first:border-t">
                  <button
                    type="button"
                    id={`sol-btn-${s.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`sol-panel-${s.id}`}
                    onClick={() => select(s.id)}
                    className="relative w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group"
                  >
                    <span className="flex items-center gap-3">
                      <span className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${isOpen ? "bg-[#0052CC] text-white" : "bg-[#BFDBFE] text-[#0052CC] group-hover:bg-[#c9defa]"}`}>
                        <Icon className="w-[18px] h-[18px]" />
                      </span>
                      <span className={`text-[20px] md:text-[22px] font-semibold tracking-[-0.01em] transition-colors ${isOpen ? "text-[#0A2540]" : "text-[#3C4F69] group-hover:text-[#0A2540]"}`}>
                        {s.label}
                      </span>
                    </span>
                    <Plus className={`w-5 h-5 shrink-0 text-[#0052CC] transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`} />
                    {isOpen && autoplay && (
                      <span
                        key={openId}
                        aria-hidden
                        onAnimationEnd={advance}
                        className="absolute left-0 right-0 bottom-0 h-[2px] origin-left bg-[#0052CC]"
                        style={{ animation: `sol-progress ${AUTOPLAY_MS}ms linear forwards`, animationPlayState: progressPaused ? "paused" : "running" }}
                      />
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`sol-panel-${s.id}`}
                        role="region"
                        aria-labelledby={`sol-btn-${s.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.45, 0.05, 0.55, 0.95] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-7 pl-0 md:pl-12">
                          <h3 className="text-[24px] md:text-[32px] leading-[1.15] tracking-[-0.02em] font-semibold text-[#0A2540]">{s.headline}</h3>
                          <p className="mt-3 pl-4 border-l-2 border-[#0066FF] text-lg italic text-[#0A2540] opacity-80">{s.quote}</p>
                          <ul className="mt-5 space-y-2.5">
                            {s.points.map((p) => (
                              <li key={p} className="flex gap-2.5 text-base text-[#3C4F69]">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0052CC]" />
                                {p}
                              </li>
                            ))}
                          </ul>
                          <Link href={s.cta.href} className="mt-6 inline-flex items-center gap-1.5 text-base font-semibold text-[#0052CC] hover:text-[#0A2540] transition-colors">
                            {s.cta.label} <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <LoanStage
            scene={SOLUTIONS[openIndex].scene}
            style={{ order: openIndex * 2 + 1 }}
            className="mb-6 lg:mb-0 lg:sticky lg:top-8"
          />
        </div>

        <p className="mt-8 text-sm text-[#3C4F69]">*Illustrative figures only. Final rates and terms are set by partner lenders after checking your profile.</p>
      </div>
    </section>
  );
};
