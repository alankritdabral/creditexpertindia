"use client";

import React from "react";
import { ArrowRight, Banknote, ChevronRight, CreditCard, Landmark, Layers, Smartphone, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { LoanStage, type StageScene } from "./LoanStage";

type Stat = { lead: string; text: string };
type Solution = {
  id: string;
  label: string;
  icon: LucideIcon;
  headline: string;
  stats: [Stat, Stat, Stat];
  cta: { label: string; href: string };
  scene: StageScene;
};

const SOLUTIONS: Solution[] = [
  {
    id: "personal-loan",
    label: "Personal Loan",
    icon: Smartphone,
    headline: "Make your monthly repayments more manageable.",
    stats: [
      { lead: "Compare options", text: "from partner lenders in one place" },
      { lead: "Choose a tenure", text: "that fits your monthly budget" },
      { lead: "No obligation", text: "to proceed after you see your options" },
    ],
    cta: { label: "Check your EMI options", href: "#calculator" },
    scene: { kind: "phone", tint: "rgba(0,102,255,0.08)" },
  },
  {
    id: "credit-card",
    label: "Credit Card",
    icon: CreditCard,
    headline: "Reduce the burden of expensive credit-card debt.",
    stats: [
      { lead: "40% p.a. or more", text: "can be charged on card dues" },
      { lead: "A personal loan", text: "may bring that rate down" },
      { lead: "One fixed EMI", text: "instead of a revolving balance" },
    ],
    cta: { label: "Explore card debt options", href: "/credit-card-debt" },
    scene: { kind: "card", tint: "rgba(0,102,255,0.06)", rate: { from: 45, to: 11 } },
  },
  {
    id: "app-loans",
    label: "App Loans",
    icon: Smartphone,
    headline: "Bring scattered app loans into a clearer plan.",
    stats: [
      { lead: "Steep rates", text: "are common on short-term app loans" },
      { lead: "Combine eligible ones", text: "into a single EMI" },
      { lead: "One due date", text: "to remember instead of several" },
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
    stats: [
      { lead: "Mix loan types", text: "personal loans, cards, overdrafts and app loans" },
      { lead: "One EMI", text: "and one due date each month" },
      { lead: "Illustrative figures;", text: "actual terms depend on your profile" },
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
    stats: [
      { lead: "Interest adds up", text: "when overdraft balances linger" },
      { lead: "A fixed-tenure loan", text: "can make repayment predictable" },
      { lead: "See what you may qualify for", text: "before you decide" },
    ],
    cta: { label: "Check overdraft options", href: "/personal-loan-overdraft" },
    scene: { kind: "rate", tint: "rgba(15,118,110,0.07)", rate: { from: 14, to: 11.75 } },
  },
];

// As on stripe.com/in: every card stays open and sticks STACK_STEP below the previous one;
// later cards slide over earlier ones, leaving only each earlier card's header strip showing.
const STACK_TOP = 16;
const STACK_STEP = 44;

export const LoanSolutionsSection = () => {
  // Clicking a strip brings that card forward: scroll until its natural top sits on its pinned slot.
  const bringForward = (idx: number) => {
    const rows = document.querySelectorAll<HTMLElement>("[data-row]");
    const row = rows[idx];
    if (!row) return;
    // Pinned rows report their pinned position, so derive the natural one from the container and the rows above.
    let naturalTop = (row.parentElement as HTMLElement).getBoundingClientRect().top;
    for (let i = 0; i < idx; i++) naturalTop += rows[i].offsetHeight;
    window.scrollBy({ top: naturalTop - (STACK_TOP + idx * STACK_STEP), behavior: "smooth" });
  };

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
        {/* Header: title + action on the left, description on the right (Stripe's section-header) */}
        <header className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 lg:items-start">
          <div className="lg:col-span-5">
            <h2 className="text-[32px] sm:text-[44px] leading-[1.08] tracking-[-0.03em] font-semibold text-[#0A2540]">
              Bring your eligible loans <span className="text-[#0052CC]">together</span>
            </h2>
            <Link
              href="/eligibility"
              className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[#0052CC] px-5 py-2.5 text-base font-semibold text-white transition-colors hover:bg-[#0A2540]"
            >
              Check your eligibility <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="lg:col-span-6 lg:col-start-7 text-lg md:text-xl text-[#3C4F69] lg:pt-2">
            One simpler way to manage multiple debts. Different debts. Different stories. One smarter way forward.
          </p>
        </header>

        <div className="mt-12 md:mt-16">
          {SOLUTIONS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                data-row
                // Later cards sit above earlier ones, so each slides over the one before it.
                style={{ ["--slot" as string]: `${STACK_TOP + idx * STACK_STEP}px`, zIndex: idx + 1 }}
                className="sticky top-[var(--slot)] bg-white border-t border-dashed border-[#E2E8F0] first:border-t-0 shadow-[0_-6px_10px_-8px_rgba(10,37,64,0.22)]"
              >
                <div onClick={() => bringForward(idx)} className="flex items-center gap-0 py-2 cursor-pointer group">
                  <span aria-hidden className="w-10 h-10 shrink-0 rounded-md flex items-center justify-center bg-[#0052CC] text-white">
                    <Icon className="w-5 h-5" />
                  </span>

                  <button
                    type="button"
                    id={`sol-btn-${s.id}`}
                    className="flex-1 min-w-0 px-4 text-left bg-transparent border-0 appearance-none cursor-pointer focus-visible:outline-none"
                  >
                    <h3 className="text-base sm:text-lg leading-10 font-semibold text-[#0052CC] transition-colors group-hover:text-[#0A2540]">{s.label}</h3>
                  </button>

                  <Link
                    href={s.cta.href}
                    aria-label={s.cta.label}
                    onClick={(e) => e.stopPropagation()}
                    className="ml-auto shrink-0 inline-flex h-10 items-center gap-1 rounded-md border border-[#BFDBFE] bg-white px-3 sm:px-4 text-sm sm:text-base font-semibold text-[#0052CC] transition-colors hover:border-[#0052CC]"
                  >
                    <span className="sm:hidden">Explore</span>
                    <span className="hidden sm:inline">Learn more</span>
                    <ArrowRight className="w-4 h-4 sm:hidden" />
                    <ChevronRight className="w-4 h-4 hidden sm:block" />
                  </Link>
                </div>

                <div
                  id={`sol-panel-${s.id}`}
                  className="grid grid-cols-1 min-w-0 pt-1 pb-8 lg:grid-cols-[5fr_7fr] lg:gap-x-12 lg:grid-rows-[auto_auto_1fr] lg:pb-12"
                >
                  <p className="pb-3 text-[18px] lg:text-[32px] leading-[1.3] lg:leading-[1.15] tracking-[-0.01em] lg:tracking-[-0.02em] lg:font-semibold text-[#0A2540] lg:col-start-1 lg:row-start-1 lg:pt-4">
                    {s.headline}
                  </p>

                  <div className="min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-3">
                    <LoanStage scene={s.scene} still className="max-sm:h-[300px] lg:!h-[440px]" />
                  </div>

                  <div className="grid gap-4 pt-4 pb-2 lg:col-start-1 lg:row-start-2 lg:pt-6">
                    {s.stats.map((st) => (
                      <p key={st.lead} className="text-base text-[#3C4F69] [text-wrap:pretty]">
                        <strong className="font-semibold text-[#0A2540]">{st.lead}</strong> {st.text}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-sm text-[#3C4F69]">*Illustrative figures only. Final rates and terms are set by partner lenders after checking your profile.</p>
      </div>
    </section>
  );
};
