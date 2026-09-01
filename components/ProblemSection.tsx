"use client";
import { CreditCard, Smartphone, TrendingUp, Layers, Wallet, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { problemCards } from "@/content/site";

const icons = {
  "credit-card": CreditCard,
  smartphone: Smartphone,
  "trending-up": TrendingUp,
  layers: Layers,
  wallet: Wallet,
};

export function ProblemSection() {
  return (
    <section className="bg-white py-16 sm:py-20 border-b border-slate-200">
      <div className="container-narrow">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            FINANCIAL ADVISORY INSIGHTS
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            Are High Loan EMIs Draining Your Monthly Cash Flow?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-6 max-w-2xl mx-auto">
            High credit card interest, scattered repayment dates, and fintech loan obligations can significantly strain monthly savings. Explore structured consolidation options.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {problemCards.map((c) => {
            const Icon = icons[c.icon as keyof typeof icons] ?? Wallet;
            return (
              <div
                key={c.title}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-2xs hover:border-slate-400 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#091328] text-emerald-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {c.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-600 leading-5">{c.text}</p>
                </div>
                <a
                  href="#lead-form"
                  className="mt-5 inline-flex items-center gap-1 text-[11px] font-bold text-slate-900 group-hover:text-emerald-600 transition-colors"
                >
                  <span>Check Eligibility</span>
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-xl bg-[#091328] p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold sm:text-xl">
              Understand your debt consolidation options today.
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              Speak directly with an experienced credit specialist — clear advice, transparent terms, zero upfront fees.
            </p>
          </div>
          <a
            href="#lead-form"
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg bg-emerald-500 px-6 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow"
          >
            <span>Speak to a Specialist</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
