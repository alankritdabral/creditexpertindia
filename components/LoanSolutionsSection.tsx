"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Smartphone, CreditCard, Banknote, Landmark, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedPhoneMockup } from "./ui/AnimatedPhoneMockup";
import { AnimatedCreditCard } from "./ui/AnimatedCreditCard";

const AnimatedCard = ({ children, className, bgStyle, bgImage, bgPosition = 'center', delay = 0 }: { children: React.ReactNode; className?: string, bgStyle?: string, bgImage?: string, bgPosition?: string, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      whileHover={{ scale: 0.99, y: -2, transition: { duration: 0.2 } }}
      className={`group relative rounded-[20px] overflow-hidden flex flex-col p-6 lg:p-8 cursor-pointer ${className || ""}`}
      style={{
        background: bgStyle || 'rgba(255,255,255,0.68)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(55,130,220,0.18)',
        boxShadow: '0 20px 50px rgba(25,90,160,0.08), inset 0 1px 0 rgba(255,255,255,0.8)'
      }}
    >
      {bgImage && (
        <div
          className="absolute inset-0 z-0 opacity-[0.35]"
          style={{ background: `url(${bgImage}) ${bgPosition}/cover no-repeat` }}
        />
      )}
      <div className="relative z-10 flex flex-col h-full">
        {children}
      </div>
    </motion.div>
  );
};

export const LoanSolutionsSection = () => {
  return (
    <section className="relative w-full border-b border-slate-300 overflow-hidden" style={{
      background: `
        radial-gradient(circle at 15% 20%, rgba(255,255,255,.95), transparent 35%),
        radial-gradient(circle at 80% 10%, rgba(120,190,255,.25), transparent 35%),
        linear-gradient(180deg, #eaf5ff 0%, #f7fbff 48%, #e4f1ff 100%)
      `
    }}>
      {/* Background depth layers */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-[10%] left-[5%] w-full h-[1px] bg-gradient-to-r from-transparent via-[#2D8CFF] to-transparent opacity-20 transform -rotate-12" />
        <div className="absolute top-[40%] right-[10%] w-full h-[1px] bg-gradient-to-r from-transparent via-[#2D8CFF] to-transparent opacity-20 transform rotate-6" />
        <div className="absolute bottom-[20%] left-[-10%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-[#2D8CFF] to-transparent opacity-20 transform -rotate-3" />
        <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-[#2D8CFF] rounded-full shadow-[0_0_8px_rgba(45,140,255,0.8)]" />
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-[#2D8CFF] rounded-full shadow-[0_0_8px_rgba(45,140,255,0.8)]" />
        <div className="absolute bottom-1/3 left-2/3 w-1 h-1 bg-[#12B878] rounded-full shadow-[0_0_6px_rgba(18,184,120,0.8)]" />
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .quote-line {
          position: relative;
        }
        .quote-line::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background-color: #2D8CFF;
          border-radius: 2px;
          opacity: 0.5;
        }
        .grid-bg-pattern {
          background-image: 
            linear-gradient(to right, rgba(55,130,220,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(55,130,220,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}} />

      <div className="absolute inset-0 z-0 pointer-events-none grid-bg-pattern mask-image:linear-gradient(to bottom,black,transparent)" />

      <div className="relative z-10 max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="flex flex-col items-center text-center pt-12 pb-6 md:py-16">
          <h2 className="text-[22px] font-bold tracking-wider text-[#1769D1] uppercase mb-0 md:mb-4">
            Bring Your Eligible Loans Together
          </h2>
          <h2 className="hidden md:block section-title mx-auto text-[#071B4F] mb-4 max-w-2xl font-semibold">
            One simpler way to manage multiple<br />
            <span className="text-[#1769D1]">debts.</span>
          </h2>
          <p className="hidden md:block text-lg md:text-xl text-[#09244D] max-w-2xl opacity-80">
            Different debts. Different stories. One smarter way forward.
          </p>
        </div>

        {/* Bento Grid: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">

          {/* 1. Personal Loan (Spans 2 rows) */}
          <AnimatedCard
            className="lg:row-span-2 min-h-[500px] md:min-h-[600px] lg:min-h-[700px]"
            bgImage="'/personal_loann.png'"
            bgStyle="rgba(255,255,255,0.68)"
          >
            {/* Header */}
            <div className="relative z-10 flex justify-between items-center mb-10">
              <div className="flex items-center space-x-2 text-[#071B4F] font-semibold">
                <Smartphone className="w-5 h-5 text-[#2D8CFF]" />
                <span>Personal Loan</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#DDEEFF] flex items-center justify-center text-[#1769D1] group-hover:bg-[#1769D1] group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4 -rotate-45" />
              </div>
            </div>

            <h2 className="relative z-10 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#071B4F] mb-6 leading-[1.2] lg:leading-[1.1] tracking-tight">
              Make your monthly <br className="hidden sm:block" /> repayments more <br className="hidden sm:block" />
              <span className="text-[#1769D1]">manageable.</span>
            </h2>

            <div className="relative z-10 pl-5 mb-10 quote-line">
              <p className="text-[#09244D] opacity-80 italic text-lg">
                Get a better rate and a more manageable EMI, without the complexity.
              </p>
            </div>

            {/* Phone Mockup Area */}
            <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center mt-4 mb-4">
              <AnimatedPhoneMockup />
            </div>

            {/* Bottom Section (CTA + Avatars) */}
            <div className="relative z-10 mt-12 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
              <Link href="#calculator" className="bg-[#1769D1] hover:bg-[#071B4F] text-white rounded-full py-4 px-8 font-semibold flex items-center justify-center space-x-2 transition-colors w-full xl:w-auto shadow-md">
                <span>Check your EMI options</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-[#2D8CFF] to-[#1769D1]" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-[#12B878] to-[#071B4F]" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-[#DDEEFF] to-[#2D8CFF]" />
                  </div>
                </div>
                <div className="text-xs text-[#09244D]">
                  <span className="font-semibold text-[#071B4F] block">Join 10,000+ Indians</span>
                  who simplified their loans
                </div>
              </div>
            </div>

          </AnimatedCard>

          {/* 2. Credit Card */}
          <AnimatedCard
            className="min-h-[510px] lg:min-h-[640px]"
            bgImage="'/Credit_card.png'"
            bgStyle="radial-gradient(circle at 70% 75%, rgba(70,150,255,.25), transparent 45%), linear-gradient(145deg, rgba(255,255,255,.9), rgba(220,238,255,.72))"
            delay={0.1}
          >
            {/* Header */}
            <div className="relative z-[5] flex justify-between items-center mb-7 mt-1">
              <div className="flex items-center space-x-3">
                <div className="w-[36px] md:w-[40px] h-[36px] md:h-[40px] bg-[rgba(255,255,255,0.6)] backdrop-blur-sm rounded-[10px] md:rounded-[12px] flex items-center justify-center border border-white/50">
                  <CreditCard className="w-5 h-5 text-[#1769D1]" strokeWidth={1.5} />
                </div>
                <span className="text-[16px] md:text-[18px] font-semibold text-[#071B4F]">Credit Card</span>
              </div>
              <div className="w-[36px] md:w-[40px] h-[36px] md:h-[40px] rounded-[10px] md:rounded-[12px] bg-[#DDEEFF] flex items-center justify-center text-[#1769D1] transition-colors hover:bg-[#2D8CFF] hover:text-white">
                <ArrowRight className="w-4 h-4 -rotate-45" strokeWidth={2} />
              </div>
            </div>

            {/* Headline */}
            <h3 className="relative z-[5] text-[24px] sm:text-[28px] md:text-[34px] font-semibold text-[#071B4F] leading-[1.2] md:leading-[1.08] tracking-[-0.03em] mb-5">
              Reduce the burden of<br className="hidden sm:block" /> expensive credit-card<br className="hidden sm:block" /> debt.
            </h3>

            {/* Quote */}
            <div className="relative z-[5] border-l-[2px] border-[#2D8CFF] pl-4 mt-1 md:mt-6 mb-[120px] max-w-[280px]">
              <p className="text-[16px] md:text-[18px] text-[#09244D] opacity-80 italic leading-[1.5]">
                Take control of high-interest credit-card debt.
              </p>
            </div>

            {/* Three.js credit card */}
            <div className="absolute z-[3] -right-[8%] md:-right-[5%] bottom-[20px] md:bottom-[20px] w-[85%] md:w-[78%] pointer-events-auto origin-bottom-right rotate-[-15deg]">
              <AnimatedCreditCard />
            </div>

            {/* Rate comparison panel */}
            <div className="relative z-[4] mt-auto self-center w-[calc(100%-28px)] md:w-[88%] lg:w-[92%] h-[80px] rounded-[14px] md:rounded-[16px] px-5 flex items-center justify-between shadow-[0_12px_35px_rgba(7,27,79,0.08)] bg-white/80 backdrop-blur-[16px] border border-white/70">
              <div className="text-left">
                <p className="text-[28px] md:text-[32px] font-bold text-[#071B4F] leading-none mb-1">45%</p>
                <p className="text-[13px] text-[#09244D] opacity-70 font-medium leading-tight">Current rate</p>
              </div>
              <div className="px-1 flex-shrink-0">
                <ArrowRight className="w-6 h-6 text-[#1769D1]" strokeWidth={1.5} />
              </div>
              <div className="text-right flex flex-col items-end">
                <p className="text-[28px] md:text-[32px] font-bold text-[#12B878] leading-none mb-1">11%</p>
                <p className="text-[13px] text-[#09244D] opacity-70 font-medium leading-tight">Potential rate*</p>
              </div>
            </div>
          </AnimatedCard>

          {/* 3. App Loans */}
          <AnimatedCard
            className="min-h-[520px] lg:min-h-[592px]"
            bgImage="'/app_loans.png'"
            bgStyle="radial-gradient(circle at 80% 80%, rgba(18,184,120,.12), transparent 35%), linear-gradient(145deg, #ffffff, #e9f5ff)"
            delay={0.2}
          >
            {/* Header */}
            <div className="relative z-[5] flex justify-between items-center mb-7">
              <div className="flex items-center space-x-[10px]">
                <div className="w-[36px] h-[36px] rounded-[10px] bg-[rgba(255,255,255,0.6)] backdrop-blur-sm flex items-center justify-center border border-white/50">
                  <Smartphone className="w-[20px] h-[20px] text-[#1769D1]" strokeWidth={2} />
                </div>
                <span className="text-[16px] md:text-[18px] leading-[20px] font-semibold text-[#071B4F]">App Loans</span>
              </div>
              <div className="w-[36px] md:w-[40px] h-[36px] md:h-[40px] rounded-[10px] md:rounded-[12px] bg-[#DDEEFF] flex items-center justify-center text-[#1769D1] hover:bg-[#2D8CFF] hover:text-white transition-colors">
                <ArrowRight className="w-[20px] h-[20px] -rotate-45" strokeWidth={2} />
              </div>
            </div>

            {/* Heading */}
            <h3 className="relative z-[5] max-w-[325px] text-[24px] sm:text-[28px] md:text-[32px] leading-[1.2] md:leading-[1.1] font-semibold tracking-[-0.03em] text-[#071B4F]">
              Bring scattered app <br className="hidden sm:block" />loans into a clearer plan.
            </h3>

            {/* Quote */}
            <div className="relative z-[5] mt-6 pl-4 border-l-[2px] border-[#2D8CFF] max-w-[315px]">
              <p className="text-[#09244D] opacity-80 text-[16px] md:text-[18px] leading-[1.5] italic">
                Simplify multiple app loans into one manageable payment
              </p>
            </div>

            {/* Visualization */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[394px] h-[270px] z-[4] pointer-events-none scale-[0.9] sm:scale-[0.95] md:scale-100 origin-bottom">

              {/* Connectors */}
              <svg
                className="absolute inset-0 w-full h-full z-[3] opacity-60"
                viewBox="0 0 394 270"
                preserveAspectRatio="none"
              >
                <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }} d="M 170 29 C 215 29, 215 100, 270 100" stroke="#2D8CFF" strokeWidth="1.5" strokeDasharray="3 6" strokeLinecap="round" fill="none" />
                <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }} d="M 170 94 C 215 94, 215 115, 270 115" stroke="#2D8CFF" strokeWidth="1.5" strokeDasharray="3 6" strokeLinecap="round" fill="none" />
                <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} d="M 170 159 C 215 159, 215 130, 270 130" stroke="#2D8CFF" strokeWidth="1.5" strokeDasharray="3 6" strokeLinecap="round" fill="none" />
                <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} d="M 170 224 C 215 224, 215 145, 270 145" stroke="#2D8CFF" strokeWidth="1.5" strokeDasharray="3 6" strokeLinecap="round" fill="none" />
              </svg>

              {/* Loans List */}
              <div className="absolute left-6 top-0 flex flex-col gap-2 z-[5]">
                {[
                  { amount: '₹8,000', name: 'KreditBee', img: '/kreditbee.webp' },
                  { amount: '₹5,500', name: 'LazyPay', img: '/lazypay.webp' },
                  { amount: '₹3,200', name: 'MoneyView', img: '/moneyview.webp' },
                  { amount: '₹2,800', name: 'Other app loan', icon: Banknote }
                ].map((loan, i) => {
                  const Icon = loan.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="w-[168px] h-[57px] rounded-xl bg-white/90 border border-[#2D8CFF]/10 shadow-sm flex items-center px-3 backdrop-blur-sm"
                    >
                      <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-[#F3F9FF] border border-[#2D8CFF]/20 flex items-center justify-center relative overflow-hidden text-[#1769D1]">
                        {loan.img ? <Image src={loan.img} alt={loan.name} fill className="object-contain p-1" sizes="36px" /> : Icon ? <Icon className="w-4 h-4" strokeWidth={2} /> : null}
                      </div>
                      <div className="ml-3">
                        <p className="text-[13px] leading-tight font-bold text-[#071B4F]">{loan.amount}</p>
                        <p className="text-[11px] leading-tight text-[#09244D] opacity-70 mt-0.5">{loan.name}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* EMI Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute right-6 top-[79px] w-[120px] h-[118px] rounded-xl flex flex-col items-center justify-center text-white shadow-lg z-[6]"
                style={{
                  background: 'linear-gradient(135deg, #123E8A 0%, #1769D1 100%)'
                }}
              >
                <p className="text-[13px] leading-tight font-medium opacity-90 text-[#DDEEFF]">ONE EMI</p>
                <p className="mt-1 text-[22px] font-semibold tracking-tight text-white">₹15,999</p>
                <p className="mt-1 text-[12px] opacity-80 text-[#DDEEFF]">per month</p>
              </motion.div>
            </div>
          </AnimatedCard>

          {/* 4. Multiple Loans */}
          <AnimatedCard
            className="min-h-[480px] lg:min-h-[512px]"
            bgImage="'/multiple_loans.png'"
            bgStyle="radial-gradient(circle at 100% 100%, rgba(45,140,255,0.08), transparent 38%), linear-gradient(145deg, rgba(255,255,255,0.7) 0%, rgba(220,238,255,0.4) 100%)"
            delay={0.1}
          >
            {/* Header */}
            <div className="relative z-[5] flex justify-between items-center mb-7">
              <div className="flex items-center space-x-[10px]">
                <div className="w-[36px] h-[36px] rounded-[10px] bg-[rgba(255,255,255,0.6)] backdrop-blur-sm flex items-center justify-center border border-white/50">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#1769D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[20px]">
                    <rect x="3" y="7" width="14" height="14" rx="2" />
                    <path d="M7 3h12a2 2 0 0 1 2 2v12" />
                  </svg>
                </div>
                <span className="text-[16px] md:text-[18px] leading-[20px] font-semibold text-[#071B4F]">Multiple Loans</span>
              </div>
              <div className="w-[36px] md:w-[40px] h-[36px] md:h-[40px] rounded-[10px] md:rounded-[12px] bg-[#DDEEFF] flex items-center justify-center text-[#1769D1] hover:bg-[#2D8CFF] hover:text-white transition-colors">
                <ArrowRight className="w-[20px] h-[20px] -rotate-45" strokeWidth={2} />
              </div>
            </div>

            {/* Headline */}
            <h3 className="relative z-[5] w-full text-[20px] min-[400px]:text-[24px] sm:text-[28px] md:text-[32px] leading-[1.2] md:leading-[1.1] font-semibold tracking-[-0.04em] text-[#071B4F]">
              Replace multiple payments<br />with one simpler repayment.
            </h3>

            {/* Quote */}
            <div className="relative z-[5] mt-6 pl-4 border-l-[2px] border-[#2D8CFF] max-w-[280px]">
              <p className="text-[#09244D] opacity-80 text-[16px] md:text-[18px] leading-[1.35] italic">
                "I had four different payments<br />to keep track of every month..."
              </p>
            </div>

            {/* Visualization */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-20px] md:bottom-0 w-[364px] h-[250px] z-[4] pointer-events-none scale-[0.9] sm:scale-[0.95] md:scale-100 origin-bottom">

              {/* Connectors */}
              <svg
                className="absolute inset-0 w-full h-full z-[3] opacity-60"
                viewBox="0 0 364 250"
                preserveAspectRatio="none"
              >
                <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }} d="M 175 24 C 230 24, 230 85, 240 85" stroke="#2D8CFF" strokeWidth="1.5" strokeDasharray="3 5" fill="none" />
                <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }} d="M 175 78 C 230 78, 230 100, 240 100" stroke="#2D8CFF" strokeWidth="1.5" strokeDasharray="3 5" fill="none" />
                <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} d="M 175 132 C 230 132, 230 115, 240 115" stroke="#2D8CFF" strokeWidth="1.5" strokeDasharray="3 5" fill="none" />
                <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} d="M 175 186 C 230 186, 230 130, 240 130" stroke="#2D8CFF" strokeWidth="1.5" strokeDasharray="3 5" fill="none" />
              </svg>

              {/* Loans List */}
              <div className="absolute left-6 top-0 flex flex-col gap-1.5 z-[5]">
                {[
                  { amount: '₹12,500', name: 'Personal Loan', icon: Banknote },
                  { amount: '₹8,300', name: 'Credit Card', icon: CreditCard },
                  { amount: '₹4,200', name: 'Overdraft', icon: Banknote },
                  { amount: '₹3,800', name: 'App Loan', icon: Smartphone }
                ].map((loan, i) => {
                  const Icon = loan.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="w-[160px] h-[48px] rounded-xl bg-white/90 border border-[#2D8CFF]/10 shadow-sm flex items-center px-2.5 backdrop-blur-sm"
                    >
                      <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-[#F3F9FF] border border-[#2D8CFF]/20 flex items-center justify-center text-[#1769D1]">
                        <Icon className="w-4 h-4" strokeWidth={2} />
                      </div>
                      <div className="ml-2.5 flex flex-col justify-center">
                        <p className="text-[14px] leading-tight font-bold text-[#071B4F]">{loan.amount}</p>
                        <p className="text-[11px] leading-tight font-medium text-[#09244D] opacity-70 mt-0.5">{loan.name}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* EMI Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute right-6 top-[50px] w-[116px] h-[110px] rounded-xl flex flex-col items-center justify-center text-white shadow-lg z-[6]"
                style={{
                  background: 'linear-gradient(135deg, #123E8A 0%, #1769D1 100%)'
                }}
              >
                <p className="text-[12px] leading-tight font-medium text-[#DDEEFF] mb-2">ONE EMI</p>
                <p className="text-[21px] font-bold mb-1.5 text-white">₹24,999</p>
                <p className="text-[12px] leading-tight text-[#DDEEFF]">per month</p>
              </motion.div>
            </div>
          </AnimatedCard>

          {/* 5. Overdraft */}
          <AnimatedCard
            className="min-h-[520px] lg:min-h-[440px]"
            bgImage="'/overdraft.png'"
            bgPosition="100% center"
            bgStyle="radial-gradient(circle at bottom right, rgba(23,105,209,0.1) 0%, transparent 60%), rgba(255,255,255,0.68)"
            delay={0.2}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2 text-[#071B4F] font-semibold">
                <Landmark className="w-5 h-5 text-[#2D8CFF]" />
                <span>Overdraft</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#DDEEFF] flex items-center justify-center text-[#1769D1] group-hover:bg-[#1769D1] group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4 -rotate-45" />
              </div>
            </div>

            <h3 className="text-[24px] sm:text-[28px] md:text-[32px] leading-[1.2] md:leading-[1.1] font-semibold tracking-[-0.03em] text-[#071B4F] mb-6">
              Explore options for expensive overdraft debt.
            </h3>

            <div className="pl-4 mb-8 quote-line">
              <p className="text-[#09244D] opacity-80 text-[16px] md:text-[18px] leading-[1.5] italic">
                Take control of high-cost overdraft debt.
              </p>
            </div>

            <div className="mt-auto relative flex flex-col items-center">
              {/* Graphic removed as requested */}

              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between w-full shadow-sm border border-white/70">
                <div className="text-center w-full">
                  <p className="text-2xl font-bold text-[#071B4F]">14%</p>
                  <p className="text-[10px] text-[#09244D] opacity-70">Current rate</p>
                </div>
                <ArrowRight className="w-6 h-6 text-[#1769D1] mx-2" />
                <div className="text-center w-full">
                  <p className="text-2xl font-bold text-[#12B878]">11.75%</p>
                  <p className="text-[10px] text-[#09244D] opacity-70">Potential rate*</p>
                </div>
              </div>
            </div>
          </AnimatedCard>

        </div>
      </div>
    </section>
  );
};
