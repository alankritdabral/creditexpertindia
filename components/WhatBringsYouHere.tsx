"use client";
import { ArrowRight, CreditCard, Wallet, CheckCircle2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { whatsBringsYouHere } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function WhatBringsYouHere() {
  const { existingDebt, newLoan } = whatsBringsYouHere;

  return (
    <section id="what-brings-you-here" className="bg-slate-50 py-16 sm:py-24 border-b border-slate-200">
      <div className="container-narrow">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
              CHOOSE YOUR INTENT
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {whatsBringsYouHere.heading}
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-7 max-w-2xl mx-auto">
              {whatsBringsYouHere.subheading}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Card 1: Existing Debt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-md hover:border-blue-500/50 hover:shadow-xl transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/20">
                  <CreditCard className="h-6 w-6 stroke-[2]" />
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-extrabold text-amber-800 uppercase tracking-wider">
                  {existingDebt.badge}
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                😰 {existingDebt.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 font-medium">
                {existingDebt.desc}
              </p>

              <ul className="mt-6 space-y-3 border-t border-slate-100 pt-6">
                {existingDebt.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <a
                href={existingDebt.href}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#091328] px-6 text-xs font-extrabold text-white uppercase tracking-wider hover:bg-slate-800 transition-all shadow-md w-full sm:w-auto"
              >
                <span>{existingDebt.cta}</span>
                <ArrowRight className="h-4 w-4 text-blue-400" />
              </a>
            </div>
          </motion.div>

          {/* Card 2: New Loan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50/40 via-white to-white p-7 sm:p-9 shadow-md hover:border-blue-500 hover:shadow-xl transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 border border-blue-500/20">
                  <Wallet className="h-6 w-6 stroke-[2]" />
                </div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-[11px] font-extrabold text-blue-800 uppercase tracking-wider">
                  {newLoan.badge}
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                💰 {newLoan.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 font-medium">
                {newLoan.desc}
              </p>

              <ul className="mt-6 space-y-3 border-t border-slate-100 pt-6">
                {newLoan.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <a
                href="#lead-form"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-xs font-extrabold text-white uppercase tracking-wider hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20 w-full sm:w-auto"
              >
                <span>{newLoan.cta}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
