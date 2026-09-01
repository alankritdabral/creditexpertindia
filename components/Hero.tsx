"use client";
import { useState } from "react";
import { Check, ArrowRight, ShieldCheck, TrendingDown, Lock, Building2, BadgeCheck, CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { hero } from "@/content/site";
import { claims } from "@/lib/config";
import { formatINR } from "@/lib/utils";

function HDFCLogo() {
  return (
    <svg viewBox="0 0 160 40" className="h-6 w-auto" aria-label="HDFC Bank">
      <rect x="2" y="6" width="28" height="28" fill="#004C8F" rx="3" />
      <rect x="9" y="13" width="14" height="14" fill="#ED232A" />
      <rect x="13" y="9" width="6" height="22" fill="#004C8F" />
      <rect x="9" y="17" width="14" height="6" fill="#004C8F" />
      <text x="38" y="25" fill="#004C8F" fontSize="15" fontWeight="800" fontFamily="sans-serif" letterSpacing="-0.5">
        HDFC BANK
      </text>
    </svg>
  );
}

function ICICILogo() {
  return (
    <svg viewBox="0 0 160 40" className="h-6 w-auto" aria-label="ICICI Bank">
      <path d="M6 10 C18 6, 26 14, 20 28 C16 36, 6 32, 6 32 C14 30, 18 24, 14 18 C11 14, 6 15, 6 10 Z" fill="#F37023" />
      <circle cx="20" cy="11" r="3.5" fill="#052F6B" />
      <text x="34" y="25" fill="#052F6B" fontSize="16" fontWeight="800" fontFamily="sans-serif" letterSpacing="-0.5">
        ICICI Bank
      </text>
    </svg>
  );
}

function AxisLogo() {
  return (
    <svg viewBox="0 0 150 40" className="h-6 w-auto" aria-label="Axis Bank">
      <polygon points="6,32 18,8 30,32" fill="#97124B" />
      <polygon points="18,17 24,32 12,32" fill="#FFFFFF" />
      <text x="36" y="25" fill="#97124B" fontSize="15" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.5">
        AXIS BANK
      </text>
    </svg>
  );
}

function KotakLogo() {
  return (
    <svg viewBox="0 0 160 40" className="h-6 w-auto" aria-label="Kotak Mahindra Bank">
      <path d="M8 12 Q 16 6, 24 18 Q 16 30, 8 24 Q 16 18, 8 12 Z" fill="#EE1C25" />
      <path d="M24 18 Q 32 6, 24 30 Q 16 24, 24 18 Z" fill="#003366" />
      <text x="34" y="25" fill="#003366" fontSize="15" fontWeight="800" fontFamily="sans-serif" letterSpacing="-0.3">
        kotak
      </text>
    </svg>
  );
}

function IndusIndLogo() {
  return (
    <svg viewBox="0 0 170 40" className="h-6 w-auto" aria-label="IndusInd Bank">
      <rect x="4" y="8" width="24" height="24" rx="4" fill="#800000" />
      <path d="M10 24 L16 12 L22 24 Z" fill="#FFFFFF" />
      <text x="34" y="25" fill="#800000" fontSize="15" fontWeight="800" fontFamily="sans-serif" letterSpacing="-0.3">
        IndusInd Bank
      </text>
    </svg>
  );
}

function IDFCLogo() {
  return (
    <svg viewBox="0 0 170 40" className="h-6 w-auto" aria-label="IDFC FIRST Bank">
      <rect x="4" y="8" width="24" height="24" rx="3" fill="#9F1B32" />
      <text x="6.5" y="23" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="sans-serif">
        IDFC
      </text>
      <text x="34" y="25" fill="#9F1B32" fontSize="14" fontWeight="800" fontFamily="sans-serif" letterSpacing="-0.3">
        IDFC FIRST Bank
      </text>
    </svg>
  );
}

const bankLogos = [
  { id: "hdfc", name: "HDFC Bank", Component: HDFCLogo },
  { id: "icici", name: "ICICI Bank", Component: ICICILogo },
  { id: "axis", name: "Axis Bank", Component: AxisLogo },
  { id: "kotak", name: "Kotak Mahindra Bank", Component: KotakLogo },
  { id: "indusind", name: "IndusInd Bank", Component: IndusIndLogo },
  { id: "idfc", name: "IDFC FIRST Bank", Component: IDFCLogo },
];

export function Hero() {
  const [heroDebtAmount, setHeroDebtAmount] = useState(500000);
  const [selectedGoal, setSelectedGoal] = useState<"consolidate" | "reduce" | "personal">("consolidate");

  // Realistic financial calculations
  const currentEstEMI = Math.round((heroDebtAmount * 0.038)); // ~3.8% monthly outgo with high card/app rates
  const newEstEMI = Math.round((heroDebtAmount * 0.022)); // ~2.2% monthly outgo with consolidated 11% loan
  const monthlySavings = Math.max(0, currentEstEMI - newEstEMI);

  return (
    <section id="home" className="relative bg-[#091328] pt-6 pb-12 sm:pt-10 sm:pb-16 text-white">
      {/* Background Texture & Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

      <div className="container-narrow pt-4">
        {/* Main 2-Column Hero */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left Column: Premium Editorial Content */}
          <div className="flex flex-col gap-6">
            {/* Tag Badge */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-md bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="h-3.5 w-3.5" />
                DEBT CONSOLIDATION & CREDIT ADVISORY FOR SALARIED
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.12]">
              Too Many EMIs? <br className="hidden sm:inline" />
              <span className="text-emerald-400">Let's Make Them Simpler.</span>
            </h1>

            {/* Supporting copy */}
            <p className="text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 max-w-[580px]">
              Consolidate eligible high-interest loans, credit card dues and scattered EMIs into a simpler repayment plan — or explore personal-loan options based on your profile.
            </p>

            {/* Key Value Cards */}
            <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-4 backdrop-blur-md">
              <div className="grid grid-cols-3 gap-3 divide-x divide-slate-700/60 text-center sm:text-left">
                <div className="pr-2">
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Interest Rate</span>
                  <span className="text-base sm:text-lg font-bold text-emerald-400">From 9.95% p.a.*</span>
                </div>
                <div className="px-2">
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Eligibility Check</span>
                  <span className="text-base sm:text-lg font-bold text-white">Soft Enquiry</span>
                </div>
                <div className="pl-2">
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Target Profile</span>
                  <span className="text-base sm:text-lg font-bold text-white">Salaried Staff</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <a
                href="#lead-form"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-7 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
              >
                <span>Check My Options</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#calculator"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-6 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <TrendingDown className="h-4 w-4 text-emerald-400" />
                <span>Calculate My Savings</span>
              </a>

              <a
                href="https://wa.me/919876543210?text=Hi%2C%20I%20would%20like%20help%20with%20my%20loans%2FEMIs%20and%20want%20to%20understand%20my%20options."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-emerald-600/20 border border-emerald-500/40 px-5 text-sm font-semibold text-emerald-300 hover:bg-emerald-600/30 transition-colors"
              >
                <span>💬 Talk to Expert</span>
              </a>
            </div>

            {/* Trust Microcopy */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300 font-medium pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Free initial consultation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Confidential assistance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Salaried profiles supported</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>No obligation to apply</span>
              </div>
            </div>
          </div>

          {/* Right Column: Institutional Financial Assessment Card */}
          <div className="rounded-2xl border border-slate-700/80 bg-[#0d1b3a] p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-slate-700/70 pb-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  EMI SAVINGS ESTIMATOR
                </h3>
                <p className="text-xs text-slate-400">Indicative debt consolidation breakdown</p>
              </div>
              <span className="rounded bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
                SALARIED TOOL
              </span>
            </div>

            {/* Purpose Selector */}
            <div className="mt-5 grid grid-cols-3 gap-1.5 rounded-lg bg-slate-900/80 p-1 border border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedGoal("consolidate")}
                className={`rounded py-2 text-center text-xs font-semibold transition-all ${
                  selectedGoal === "consolidate"
                    ? "bg-slate-700 text-white shadow-xs"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Consolidate Debt
              </button>
              <button
                type="button"
                onClick={() => setSelectedGoal("reduce")}
                className={`rounded py-2 text-center text-xs font-semibold transition-all ${
                  selectedGoal === "reduce"
                    ? "bg-slate-700 text-white shadow-xs"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Transfer Balance
              </button>
              <button
                type="button"
                onClick={() => setSelectedGoal("personal")}
                className={`rounded py-2 text-center text-xs font-semibold transition-all ${
                  selectedGoal === "personal"
                    ? "bg-slate-700 text-white shadow-xs"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Fresh Loan
              </button>
            </div>

            {/* Debt Amount Slider */}
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-300">Estimated Total Outstanding Debt</span>
                <span className="font-extrabold text-white text-sm bg-slate-800 px-3 py-1 rounded border border-slate-700">
                  {formatINR(heroDebtAmount)}
                </span>
              </div>
              <input
                type="range"
                min={100000}
                max={2000000}
                step={25000}
                value={heroDebtAmount}
                onChange={(e) => setHeroDebtAmount(Number(e.target.value))}
                className="h-2 w-full appearance-none rounded bg-slate-800 accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>₹1,00,000</span>
                <span>₹10,00,000</span>
                <span>₹20,00,000</span>
              </div>
            </div>

            {/* Savings Display */}
            <div className="mt-5 rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-slate-900/60 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                    ESTIMATED MONTHLY SAVINGS
                  </span>
                  <div className="mt-0.5 text-2xl font-extrabold text-emerald-400">
                    ~{formatINR(monthlySavings)} <span className="text-xs font-normal text-slate-400">/ month*</span>
                  </div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <TrendingDown className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-800 pt-3 text-xs">
                <div className="rounded bg-slate-900/80 p-2 text-center border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Current Outflow</span>
                  <span className="font-semibold text-slate-300 line-through decoration-red-500/80">
                    {formatINR(currentEstEMI)}/mo
                  </span>
                </div>
                <div className="rounded bg-slate-900/80 p-2 text-center border border-emerald-500/30">
                  <span className="text-[10px] text-emerald-400 block font-semibold">New Consolidated Outflow</span>
                  <span className="font-bold text-white">{formatINR(newEstEMI)}/mo*</span>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <a
              href="#lead-form"
              className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-white text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-slate-100 transition-all shadow"
            >
              <span>EXPLORE MY ELIGIBILITY</span>
              <ChevronRight className="h-4 w-4 text-emerald-600" />
            </a>

            <p className="mt-3 text-center text-[10px] text-slate-400 leading-4">
              *Indicative output only. Final approval, rates and terms are subject to partner bank eligibility guidelines.
            </p>
          </div>
        </div>

        {/* Affiliated Banking Network Infinite Slider */}
        <div className="mt-12 rounded-xl border border-slate-800 bg-slate-900/80 p-4 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                AFFILIATED BANKING NETWORK & LENDING PARTNERS
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
              <BadgeCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Verified Indian Private Banks & NBFCs</span>
            </div>
          </div>

          <div className="relative mt-3 overflow-hidden py-1">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-r from-slate-900 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-l from-slate-900 to-transparent" />

            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
              className="flex items-center gap-4 w-max"
            >
              {[...bankLogos, ...bankLogos, ...bankLogos].map((bank, index) => (
                <div
                  key={`${bank.id}-${index}`}
                  className="flex h-11 min-w-[160px] shrink-0 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-800 px-4 shadow-sm hover:border-slate-500 transition-all"
                >
                  <bank.Component />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
