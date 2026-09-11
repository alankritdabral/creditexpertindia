"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

import marraigeImg from "@/public/img/marraige.png";
import creditCardImg from "@/public/img/creditcard.png";
import teenagerImg from "@/public/img/teenager.png";
import multipleLoansImg from "@/public/img/multipleloans.png";
import odImg from "@/public/img/od.png";

const stories = [
  {
    title: "Personal Loan",
    quote: "“We wanted to focus on her wedding, not another financial burden.”",
    outcome: "We helped make their repayments more manageable.",
    image: marraigeImg,
    colSpan: "col-span-1 lg:col-span-3",
    highlight: null,
  },
  {
    title: "Credit Card Debt",
    quote: "“I was paying nearly 45% interest on my credit card debt.”",
    outcome: "We helped bring the interest rate down to 11%.",
    image: creditCardImg,
    colSpan: "col-span-1 lg:col-span-3",
    highlight: (
      <div className="flex items-center gap-4 mt-2">
        <span className="text-4xl md:text-5xl font-black text-white/50 line-through decoration-white/30 decoration-4">45%</span>
        <ArrowRight className="w-8 h-8 text-white/40" />
        <span className="text-5xl md:text-6xl font-black text-blue-400 drop-shadow-lg">11%</span>
      </div>
    ),
  },
  {
    title: "App Loans",
    quote: "“One small loan became several. I couldn't keep up.”",
    outcome: "We helped reduce the interest burden by nearly 75%.",
    image: teenagerImg,
    colSpan: "col-span-1 lg:col-span-2",
    highlight: (
      <div className="flex items-center gap-3 mt-2">
        <span className="text-sm font-bold text-white/60 uppercase tracking-widest mt-1">Interest</span>
        <span className="text-4xl font-black text-emerald-400 drop-shadow-lg flex items-center">
          <ArrowDown className="w-8 h-8 text-emerald-400 mr-1" strokeWidth={4} /> 75%
        </span>
      </div>
    ),
  },
  {
    title: "Multiple Loans",
    quote: "“I had four different payments to keep track of every month.”",
    outcome: "We helped consolidate eligible debts into one manageable EMI, helping him save lakhs every year.",
    image: multipleLoansImg,
    colSpan: "col-span-1 lg:col-span-2",
    highlight: (
      <div className="flex flex-col gap-2 mt-2">
        <span className="text-2xl font-black text-white/50">Multiple Loans</span>
        <div className="flex items-center gap-3">
          <ArrowRight className="w-6 h-6 text-emerald-400" strokeWidth={3} />
          <span className="text-4xl font-black text-emerald-400 drop-shadow-lg">1 EMI</span>
        </div>
      </div>
    ),
  },
  {
    title: "Overdraft",
    quote: "“₹70 lakh outstanding at 14% interest was becoming expensive.”",
    outcome: "We helped reduce the rate to 10.99%.",
    image: odImg,
    colSpan: "col-span-1 lg:col-span-2",
    highlight: (
      <div className="flex flex-col gap-1 mt-2">
        <span className="text-xl font-black text-white/50 line-through decoration-white/30 decoration-[3px]">₹70L @ 14%</span>
        <div className="flex items-center gap-3">
          <ArrowRight className="w-6 h-6 text-blue-400" strokeWidth={3} />
          <span className="text-3xl font-black text-blue-400 drop-shadow-lg">₹70L @ 10.99%</span>
        </div>
      </div>
    ),
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function StoriesSection() {
  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-text-main mb-4 leading-tight">
          Bring Your Eligible Loans Together
        </h2>
        <p className="text-lg text-text-muted">
          Different debts. Different stories. One smarter way forward.
        </p>
      </div>

      {/* 6-Column CSS Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 max-w-[1220px] mx-auto w-full">
        {stories.map((story, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className={`relative group rounded-[24px] overflow-hidden flex flex-col justify-end min-h-[400px] md:min-h-[480px] shadow-lg hover:-translate-y-1 hover:shadow-xl hover:border hover:border-brand-blue/30 transition-all duration-300 ${story.colSpan}`}
          >
            {/* Background Image */}
            <Image
              src={story.image}
              alt={story.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/70 via-70% to-slate-900/20 opacity-90 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 p-8 md:p-10 flex flex-col justify-end h-full w-full">
              <div className="flex-1" />
              
              <div className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4">
                {story.title}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight tracking-tight drop-shadow-md max-w-[90%]">
                {story.quote}
              </h3>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-md">
                {story.outcome}
              </p>

              {/* Transformation Highlight */}
              {story.highlight && (
                <div className="mt-8 pt-6 border-t border-white/10">
                  {story.highlight}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Compliance / Illustrative Note */}
      <div className="mt-10 text-center max-w-2xl mx-auto px-6">
        <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
          *Illustrative examples based on typical customer profiles. Customer results vary. Outcomes depend on individual circumstances, lender policies, and final approval.
        </p>
      </div>
    </div>
  );
}
