"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Smartphone, CreditCard, Banknote, Landmark, Check } from "lucide-react";
import Image from "next/image";
import { AnimatedPhoneMockup } from "./ui/AnimatedPhoneMockup";
import { AnimatedCreditCard } from "./ui/AnimatedCreditCard";

const AnimatedCard = ({ children, className, bgStyle }: { children: React.ReactNode; className?: string, bgStyle?: string }) => {
  return (
    <motion.div
      whileHover={{ opacity: 0.98, transition: { duration: 0.2 } }}
      className={`group relative bg-white rounded-none border-0 overflow-hidden flex flex-col p-6 lg:p-8 cursor-pointer ${className || ""}`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 ease-out" style={{ background: bgStyle }} />
      <div className="relative z-10 flex flex-col h-full">
        {children}
      </div>
    </motion.div>
  );
};

export const LoanSolutionsSection = () => {
  return (
    <section className="relative w-full bg-white border-b border-slate-300">
      <style dangerouslySetInnerHTML={{__html: `
        .dot-pattern-blue {
          background-image: radial-gradient(#6b9cff 1.5px, transparent 1.5px);
          background-size: 16px 16px;
          opacity: 0.3;
          mask-image: radial-gradient(ellipse at center, black 10%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 10%, transparent 70%);
        }
        .dot-pattern-orange {
          background-image: radial-gradient(#ffb477 1.5px, transparent 1.5px);
          background-size: 16px 16px;
          opacity: 0.4;
          mask-image: radial-gradient(ellipse at top right, black 20%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse at top right, black 20%, transparent 70%);
        }
        .gradient-text-blue {
          background: linear-gradient(90deg, #3b82f6, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
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
          background-color: #cbd5e1; /* slate-300 */
          border-radius: 2px;
        }
      `}} />

      <div className="relative z-10 max-w-[1220px] mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center py-16 px-6 border-x border-b border-slate-300 bg-white">
          <p className="text-sm font-bold tracking-wider text-blue-600 uppercase mb-4">
            Bring Your Eligible Loans Together
          </p>
          <h2 className="section-title mx-auto text-slate-900 mb-4 max-w-2xl">
            One simpler way to manage multiple debts.
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl">
            Different debts. Different stories. One smarter way forward.
          </p>
        </div>

        {/* Bento Grid: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-slate-300 border-x border-slate-300">
          
          {/* 1. Personal Loan (Spans 2 rows) */}
          <AnimatedCard 
            className="lg:row-span-2 min-h-[700px] bg-white"
          >
            {/* Background elements */}
            <div className="absolute top-[20%] left-[-10%] w-[80%] h-[60%] dot-pattern-blue z-0 pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-20%] w-[120%] h-[60%] bg-gradient-to-tr from-blue-100/50 via-purple-100/30 to-transparent blur-3xl z-0 rounded-full" />
            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[40%] bg-blue-50/50 blur-3xl z-0 rounded-full" />

            {/* Header */}
            <div className="relative z-10 flex justify-between items-center mb-10">
              <div className="flex items-center space-x-2 text-slate-900 font-semibold">
                <Smartphone className="w-5 h-5 text-blue-600" />
                <span>Personal Loan</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4 -rotate-45" />
              </div>
            </div>

            <h2 className="relative z-10 text-4xl lg:text-[2.75rem] font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight">
              Make your monthly <br /> repayments more <br />
              <span className="text-blue-600">manageable.</span>
            </h2>

            <div className="relative z-10 pl-5 mb-10 quote-line">
              <p className="text-slate-600 italic text-lg">
                "We wanted to focus on her wedding,<br />not another financial burden."
              </p>
            </div>

            {/* Phone Mockup Area */}
            <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center mt-4 mb-4">
              <AnimatedPhoneMockup />
            </div>

            {/* Bottom Section (CTA + Avatars) */}
            <div className="relative z-10 mt-12 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full py-4 px-8 font-semibold flex items-center justify-center space-x-2 transition-colors w-full xl:w-auto">
                <span>Check your EMI options</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex-shrink-0 overflow-hidden">
                    {/* Placeholder for avatar */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-300 to-blue-400" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-purple-300 to-purple-400" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-pink-300 to-pink-400" />
                  </div>
                </div>
                <div className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-700 block">Join 10,000+ Indians</span>
                  who simplified their loans
                </div>
              </div>
            </div>

          </AnimatedCard>

          {/* 2. Credit Card */}
          {/* 2. Credit Card */}
          <motion.div 
            whileHover={{ opacity: 0.98, transition: { duration: 0.2 } }}
            className="group relative bg-white rounded-none border-0 overflow-hidden flex flex-col p-5 md:p-6 cursor-pointer min-h-[560px]"
          >
            {/* Z-Index 1: Gradient blobs */}
            <div className="absolute inset-0 z-[1] pointer-events-none" style={{
              background: `
                radial-gradient(circle at 0% 100%, rgba(204, 120, 255, 0.35), transparent 50%),
                radial-gradient(circle at 100% 75%, rgba(255, 155, 214, 0.30), transparent 45%),
                radial-gradient(circle at 50% 60%, rgba(76, 76, 255, 0.20), transparent 55%)
              `
            }} />

            {/* Z-Index 2: Curved background shape */}
            <div className="absolute z-[2] pointer-events-none" style={{
              width: '160%',
              height: '55%',
              left: '-35%',
              bottom: '-10%',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(217, 157, 255, 0.35), rgba(255, 207, 239, 0.15))',
              filter: 'blur(2px)'
            }} />

            {/* Z-Index 5: Header */}
            <div className="relative z-[5] flex justify-between items-center mb-7 mt-1">
              <div className="flex items-center space-x-3">
                <div className="w-[36px] md:w-[40px] h-[36px] md:h-[40px] bg-[#f3f1ff] rounded-[10px] md:rounded-[12px] flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-[#6a5cff]" strokeWidth={1.5} />
                </div>
                <span className="text-[16px] md:text-[18px] font-semibold text-[#17203f]">Credit Card</span>
              </div>
              <div className="w-[36px] md:w-[40px] h-[36px] md:h-[40px] rounded-[10px] md:rounded-[12px] bg-[#f3f1ff] flex items-center justify-center text-[#6a5cff] transition-colors hover:bg-[#e6e2ff]">
                <ArrowRight className="w-4 h-4 -rotate-45" strokeWidth={2} />
              </div>
            </div>

            {/* Z-Index 5: Headline */}
            <h3 className="relative z-[5] text-[28px] md:text-[34px] font-semibold text-[#111936] leading-[1.1] md:leading-[1.08] tracking-[-0.03em] mb-5">
              Reduce the burden of<br />expensive credit-card<br />debt.
            </h3>

            {/* Z-Index 5: Quote */}
            <div className="relative z-[5] border-l-[2px] border-[#ff4f87] pl-4 mt-5 md:mt-6 mb-[120px] max-w-[280px]">
              <p className="text-[16px] md:text-[18px] text-[#68709a] italic leading-[1.5]">
                "I was paying nearly 45%<br />interest on my credit..."
              </p>
            </div>

            {/* Z-Index 3: Three.js credit card */}
            <div className="absolute z-[3] -right-[8%] md:-right-[5%] bottom-[70px] md:bottom-[60px] w-[85%] md:w-[78%] pointer-events-auto origin-bottom-right rotate-[-10deg]">
              <AnimatedCreditCard />
            </div>

            {/* Z-Index 4: Rate comparison panel */}
            <div className="relative z-[4] mt-auto self-center w-[calc(100%-28px)] md:w-[88%] lg:w-[92%] h-[80px] rounded-[14px] md:rounded-[16px] px-5 flex items-center justify-between shadow-[0_12px_35px_rgba(30,30,80,0.10)] bg-white/90 backdrop-blur-[16px] border border-white/70">
              <div className="text-left">
                <p className="text-[28px] md:text-[32px] font-bold text-[#ef3268] leading-none mb-1">45%</p>
                <p className="text-[13px] text-[#69708c] font-medium leading-tight">Current rate</p>
              </div>
              <div className="px-1 flex-shrink-0">
                <ArrowRight className="w-6 h-6 text-[#4d5cff]" strokeWidth={1.5} />
              </div>
              <div className="text-right flex flex-col items-end">
                <p className="text-[28px] md:text-[32px] font-bold text-[#20a64a] leading-none mb-1">11%</p>
                <p className="text-[13px] text-[#69708c] font-medium leading-tight">Potential rate*</p>
              </div>
            </div>
          </motion.div>

          {/* 3. App Loans */}
          <motion.div 
            whileHover={{ opacity: 0.98, transition: { duration: 0.2 } }}
            className="group relative overflow-hidden rounded-none border-0 bg-white flex flex-col cursor-pointer min-h-[592px]"
            style={{
              background: `
                radial-gradient(circle at 102% 56%, rgba(255, 190, 105, 0.48) 0%, rgba(255, 174, 125, 0.28) 22%, rgba(255, 205, 180, 0.12) 38%, transparent 58%),
                radial-gradient(circle at 100% 100%, rgba(125, 75, 255, 0.50) 0%, rgba(190, 90, 235, 0.28) 30%, transparent 58%),
                linear-gradient(145deg, #ffffff 0%, #ffffff 55%, #fffaf7 100%)
              `
            }}
          >
            {/* Decorative Gradient */}
            <div 
              className="absolute w-[270px] h-[330px] -right-[115px] -bottom-[90px] blur-[12px] pointer-events-none z-0"
              style={{
                background: 'radial-gradient(circle at 35% 25%, rgba(255, 188, 105, 0.65), rgba(255, 128, 175, 0.38) 42%, rgba(115, 70, 255, 0.60) 75%, transparent 100%)'
              }}
            />

            {/* Halftone */}
            <div 
              className="absolute w-[155px] h-[190px] -right-[5px] bottom-[70px] opacity-[0.65] pointer-events-none z-[1]"
              style={{
                backgroundImage: 'radial-gradient(rgba(255, 135, 160, 0.42) 1px, transparent 1px)',
                backgroundSize: '7px 7px',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 15%, transparent 75%)',
                maskImage: 'radial-gradient(ellipse at center, black 15%, transparent 75%)'
              }}
            />

            {/* Header */}
            <div className="relative z-[5] flex justify-between items-center pt-[31px] px-[32px]">
              <div className="flex items-center space-x-[10px]">
                <div className="w-[31px] h-[31px] rounded-[8px] bg-[#f6f4ff] bg-opacity-90 flex items-center justify-center">
                  <Smartphone className="w-[18px] h-[18px] text-[#4935ff]" strokeWidth={2} />
                </div>
                <span className="text-[16px] leading-[20px] font-[600] text-[#111936]">App Loans</span>
              </div>
              <div className="w-[40px] h-[40px] rounded-[8px] bg-[#f6f4ff] bg-opacity-92 flex items-center justify-center text-[#4636ff] group-hover:bg-[#e6e2ff] transition-colors">
                <ArrowRight className="w-[20px] h-[20px] -rotate-45" strokeWidth={2} />
              </div>
            </div>

            {/* Heading */}
            <h3 className="relative z-[5] mt-[35px] mx-[32px] max-w-[325px] text-[27px] leading-[1.28] font-[600] tracking-[-0.7px] text-[#101936]">
              Bring scattered app<br />loans into a clearer plan.
            </h3>

            {/* Quote */}
            <div className="relative z-[5] mt-[20px] mx-[32px] pl-[18px] border-l-[2px] border-[#6245ff] max-w-[315px]">
              <p className="text-[#60709a] text-[18px] leading-[1.55] italic">
                "One small loan became<br />several. I couldn't keep track..."
              </p>
            </div>

            {/* Visualization */}
            <div className="absolute left-0 right-0 top-[278px] h-[270px] z-[4]">
              
              {/* Connectors */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-[3]"
                viewBox="0 0 394 270"
                preserveAspectRatio="none"
              >
                <path d="M 170 29 C 215 29, 215 100, 270 100" stroke="#5B86FF" strokeWidth="2" strokeDasharray="2.5 6" strokeLinecap="round" fill="none" opacity="0.8" />
                <path d="M 170 94 C 215 94, 215 115, 270 115" stroke="#5B86FF" strokeWidth="2" strokeDasharray="2.5 6" strokeLinecap="round" fill="none" opacity="0.8" />
                <path d="M 170 159 C 215 159, 215 130, 270 130" stroke="#5B86FF" strokeWidth="2" strokeDasharray="2.5 6" strokeLinecap="round" fill="none" opacity="0.8" />
                <path d="M 170 224 C 215 224, 215 145, 270 145" stroke="#5B86FF" strokeWidth="2" strokeDasharray="2.5 6" strokeLinecap="round" fill="none" opacity="0.8" />
              </svg>
              
              {/* Loans List */}
              <div className="absolute left-[24px] top-0 flex flex-col gap-[8px] z-[5]">
                
                {/* Loan 1 */}
                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 }}
                  className="w-[168px] h-[57px] rounded-[11px] bg-white/[0.94] border border-[#5a69aa1a] shadow-[0_5px_16px_rgba(55,70,140,0.07),0_1px_4px_rgba(55,70,140,0.05)] flex items-center px-[12px]"
                >
                  <div className="w-[36px] h-[36px] flex-shrink-0 rounded-[9px] bg-[#f7f8fc] flex items-center justify-center relative overflow-hidden">
                    <Image src="/kreditbee.webp" alt="KreditBee" fill className="object-contain p-[4px]" sizes="36px" />
                  </div>
                  <div className="ml-[10px]">
                    <p className="text-[13px] leading-[16px] font-[700] text-[#18203b]">₹8,000</p>
                    <p className="text-[11px] leading-[14px] text-[#68769b] mt-[2px]">KreditBee</p>
                  </div>
                </motion.div>

                {/* Loan 2 */}
                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.16 }}
                  className="w-[168px] h-[57px] rounded-[11px] bg-white/[0.94] border border-[#5a69aa1a] shadow-[0_5px_16px_rgba(55,70,140,0.07),0_1px_4px_rgba(55,70,140,0.05)] flex items-center px-[12px]"
                >
                  <div className="w-[36px] h-[36px] flex-shrink-0 rounded-[9px] bg-[#f7f8fc] flex items-center justify-center relative overflow-hidden">
                    <Image src="/lazypay.webp" alt="LazyPay" fill className="object-contain p-[4px]" sizes="36px" />
                  </div>
                  <div className="ml-[10px]">
                    <p className="text-[13px] leading-[16px] font-[700] text-[#18203b]">₹5,500</p>
                    <p className="text-[11px] leading-[14px] text-[#68769b] mt-[2px]">LazyPay</p>
                  </div>
                </motion.div>

                {/* Loan 3 */}
                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.24 }}
                  className="w-[168px] h-[57px] rounded-[11px] bg-white/[0.94] border border-[#5a69aa1a] shadow-[0_5px_16px_rgba(55,70,140,0.07),0_1px_4px_rgba(55,70,140,0.05)] flex items-center px-[12px]"
                >
                  <div className="w-[36px] h-[36px] flex-shrink-0 rounded-[9px] bg-[#f7f8fc] flex items-center justify-center relative overflow-hidden">
                    <Image src="/moneyview.webp" alt="MoneyView" fill className="object-contain p-[4px]" sizes="36px" />
                  </div>
                  <div className="ml-[10px]">
                    <p className="text-[13px] leading-[16px] font-[700] text-[#18203b]">₹3,200</p>
                    <p className="text-[11px] leading-[14px] text-[#68769b] mt-[2px]">MoneyView</p>
                  </div>
                </motion.div>

                {/* Loan 4 */}
                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.32 }}
                  className="w-[168px] h-[57px] rounded-[11px] bg-white/[0.94] border border-[#5a69aa1a] shadow-[0_5px_16px_rgba(55,70,140,0.07),0_1px_4px_rgba(55,70,140,0.05)] flex items-center px-[12px]"
                >
                  <div className="w-[36px] h-[36px] flex-shrink-0 rounded-[9px] bg-[#f7f8fc] flex items-center justify-center text-[#5c72ff]">
                    <Banknote className="w-[18px] h-[18px]" strokeWidth={2} />
                  </div>
                  <div className="ml-[10px]">
                    <p className="text-[13px] leading-[16px] font-[700] text-[#18203b]">₹2,800</p>
                    <p className="text-[11px] leading-[14px] text-[#68769b] mt-[2px]">Other app loan</p>
                  </div>
                </motion.div>

              </div>

              {/* EMI Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute right-[22px] top-[79px] w-[120px] h-[118px] rounded-[12px] flex flex-col items-center justify-center text-white shadow-[0_12px_25px_rgba(68,55,230,0.24)] z-[6]"
                style={{
                  background: 'linear-gradient(145deg, #345df5 0%, #4936ff 55%, #6638ee 100%)'
                }}
              >
                <p className="text-[13px] leading-[16px] font-[400] opacity-90">ONE EMI</p>
                <p className="mt-[5px] text-[22px] leading-[27px] font-[600] tracking-[-0.4px]">₹15,999</p>
                <p className="mt-[4px] text-[12px] leading-[15px] opacity-90">per month</p>
              </motion.div>

            </div>

          </motion.div>

          {/* 4. Multiple Loans */}
          <motion.div 
            whileHover={{ opacity: 0.98, transition: { duration: 0.2 } }}
            className="group relative overflow-hidden rounded-none border-0 bg-white flex flex-col cursor-pointer min-h-[512px]"
            style={{
              background: `
                radial-gradient(circle at 100% 100%, rgba(112, 84, 255, 0.18), transparent 38%),
                radial-gradient(circle at 100% 45%, rgba(95, 190, 255, 0.10), transparent 35%),
                linear-gradient(145deg, #f8f9ff 0%, #ffffff 48%, #f4f6ff 100%)
              `
            }}
          >
            {/* Bottom-Right Glow */}
            <div 
              className="absolute w-[180px] h-[180px] -right-[30px] -bottom-[30px] blur-[10px] pointer-events-none z-0"
              style={{
                background: 'radial-gradient(circle, rgba(117, 94, 255, 0.24), rgba(117, 94, 255, 0) 70%)'
              }}
            />

            {/* Right-Side Blue Shape */}
            <div 
              className="absolute top-[30%] -right-[20%] w-[80%] h-[50%] blur-[2px] pointer-events-none z-0 rounded-full"
              style={{
                background: 'rgba(116, 195, 255, 0.08)',
                transform: 'rotate(-20deg)'
              }}
            />

            {/* Header */}
            <div className="relative z-[5] flex justify-between items-center pt-[28px] px-[28px]">
              <div className="flex items-center space-x-[10px]">
                <div className="w-[28px] h-[28px] flex items-center justify-center relative">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#4C3CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
                    <rect x="3" y="7" width="14" height="14" rx="2" />
                    <path d="M7 3h12a2 2 0 0 1 2 2v12" />
                  </svg>
                </div>
                <span className="text-[16px] leading-[1.2] font-[600] text-[#111936]">Multiple Loans</span>
              </div>
              <div className="w-[40px] h-[40px] rounded-[8px] bg-[#f3f4ff] bg-opacity-95 flex items-center justify-center text-[#5140ff] group-hover:bg-[#e6e2ff] transition-colors">
                <ArrowRight className="w-[20px] h-[20px] -rotate-45" strokeWidth={2} />
              </div>
            </div>

            {/* Headline */}
            <h3 className="relative z-[5] mt-[26px] mx-[28px] text-[28px] leading-[1.18] font-[650] tracking-[-0.7px] text-[#101936] max-w-[280px]">
              Replace multiple<br />payments with one<br />simpler repayment.
            </h3>

            {/* Quote */}
            <div className="relative z-[5] mt-[12px] mx-[28px] pl-[16px] flex items-center h-[48px]">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#5A45FF] rounded-full"></div>
              <p className="text-[#68729a] text-[16px] leading-[1.35] italic">
                "I had four different payments<br />to keep track of every month..."
              </p>
            </div>

            {/* Visualization */}
            <div className="absolute left-0 right-0 top-[260px] h-[250px] z-[4]">
              
              {/* Connectors */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-[3]"
                viewBox="0 0 364 250"
                preserveAspectRatio="none"
              >
                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} d="M 175 24 C 230 24, 230 85, 240 85" stroke="#9EB4FF" strokeWidth="1.8" strokeDasharray="3 5" fill="none" />
                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }} d="M 175 78 C 230 78, 230 100, 240 100" stroke="#9EB4FF" strokeWidth="1.8" strokeDasharray="3 5" fill="none" />
                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} d="M 175 132 C 230 132, 230 115, 240 115" stroke="#9EB4FF" strokeWidth="1.8" strokeDasharray="3 5" fill="none" />
                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} d="M 175 186 C 230 186, 230 130, 240 130" stroke="#9EB4FF" strokeWidth="1.8" strokeDasharray="3 5" fill="none" />
              </svg>
              
              {/* Loans List */}
              <div className="absolute left-[26px] top-0 flex flex-col gap-[6px] z-[5]">
                
                {/* Loan 1 */}
                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 }}
                  className="w-[160px] h-[48px] rounded-[11px] bg-white/[0.94] border border-[#e1e5f4bf] shadow-[0_4px_14px_rgba(42,54,100,0.08),0_1px_3px_rgba(42,54,100,0.05)] flex items-center px-[10px]"
                >
                  <div className="w-[32px] h-[32px] flex-shrink-0 rounded-[8px] bg-[#f3f4ff] flex items-center justify-center text-[#5140FF]">
                    <Banknote className="w-[16px] h-[16px]" strokeWidth={2} />
                  </div>
                  <div className="ml-[10px] flex flex-col justify-center">
                    <p className="text-[14px] leading-[1.1] font-[700] text-[#18203d]">₹12,500</p>
                    <p className="text-[11px] leading-[1.2] font-[500] text-[#7a83a3] mt-[3px]">Personal Loan</p>
                  </div>
                </motion.div>

                {/* Loan 2 */}
                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.16 }}
                  className="w-[160px] h-[48px] rounded-[11px] bg-white/[0.94] border border-[#e1e5f4bf] shadow-[0_4px_14px_rgba(42,54,100,0.08),0_1px_3px_rgba(42,54,100,0.05)] flex items-center px-[10px]"
                >
                  <div className="w-[32px] h-[32px] flex-shrink-0 rounded-[8px] bg-[#f3f4ff] flex items-center justify-center text-[#5140FF]">
                    <CreditCard className="w-[16px] h-[16px]" strokeWidth={2} />
                  </div>
                  <div className="ml-[10px] flex flex-col justify-center">
                    <p className="text-[14px] leading-[1.1] font-[700] text-[#18203d]">₹8,300</p>
                    <p className="text-[11px] leading-[1.2] font-[500] text-[#7a83a3] mt-[3px]">Credit Card</p>
                  </div>
                </motion.div>

                {/* Loan 3 */}
                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.24 }}
                  className="w-[160px] h-[48px] rounded-[11px] bg-white/[0.94] border border-[#e1e5f4bf] shadow-[0_4px_14px_rgba(42,54,100,0.08),0_1px_3px_rgba(42,54,100,0.05)] flex items-center px-[10px]"
                >
                  <div className="w-[32px] h-[32px] flex-shrink-0 rounded-[8px] bg-[#f3f4ff] flex items-center justify-center text-[#5140FF]">
                    <Smartphone className="w-[16px] h-[16px]" strokeWidth={2} />
                  </div>
                  <div className="ml-[10px] flex flex-col justify-center">
                    <p className="text-[14px] leading-[1.1] font-[700] text-[#18203d]">₹4,200</p>
                    <p className="text-[11px] leading-[1.2] font-[500] text-[#7a83a3] mt-[3px]">Consumer Loan</p>
                  </div>
                </motion.div>

                {/* Loan 4 */}
                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.32 }}
                  className="w-[160px] h-[48px] rounded-[11px] bg-white/[0.94] border border-[#e1e5f4bf] shadow-[0_4px_14px_rgba(42,54,100,0.08),0_1px_3px_rgba(42,54,100,0.05)] flex items-center px-[10px]"
                >
                  <div className="w-[32px] h-[32px] flex-shrink-0 rounded-[8px] bg-[#f3f4ff] flex items-center justify-center text-[#5140FF]">
                    <Banknote className="w-[16px] h-[16px]" strokeWidth={2} />
                  </div>
                  <div className="ml-[10px] flex flex-col justify-center">
                    <p className="text-[14px] leading-[1.1] font-[700] text-[#18203d]">₹3,800</p>
                    <p className="text-[11px] leading-[1.2] font-[500] text-[#7a83a3] mt-[3px]">Other Loan</p>
                  </div>
                </motion.div>

              </div>

              {/* EMI Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute right-[26px] top-[50px] w-[116px] h-[110px] rounded-[13px] flex flex-col items-center justify-center text-white shadow-[0_12px_28px_rgba(78,58,245,0.22)] z-[6]"
                style={{
                  background: 'linear-gradient(145deg, #5B3FFF 0%, #4330F5 55%, #643DFF 100%)'
                }}
              >
                <p className="text-[12px] leading-[1] font-[500] text-white/75 mb-[8px]">ONE EMI</p>
                <p className="text-[21px] leading-[1] font-[700] mb-[6px]">₹24,999</p>
                <p className="text-[12px] leading-[1] text-white/75">per month</p>
              </motion.div>

            </div>

          </motion.div>

          {/* 5. Overdraft */}
          <AnimatedCard 
            bgStyle="radial-gradient(circle at bottom right, rgba(150, 110, 255, 0.15) 0%, transparent 60%)"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2 text-slate-900 font-semibold">
                <Landmark className="w-5 h-5 text-indigo-600" />
                <span>Overdraft</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                <ArrowRight className="w-4 h-4 -rotate-45" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-6 leading-tight">
              Explore options for expensive overdraft debt.
            </h3>

            <div className="pl-4 mb-8 quote-line">
              <p className="text-slate-500 italic text-sm">
                "₹70 lakh outstanding at<br />14% interest was becoming<br />difficult to manage..."
              </p>
            </div>

            <div className="mt-auto relative flex flex-col items-center">
              {/* Bank Building Graphic Placeholder */}
              <div className="w-[180px] h-[120px] mb-8 relative flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                 <Landmark className="w-32 h-32 text-indigo-200" strokeWidth={1} />
              </div>

              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between w-full shadow-sm border border-indigo-50">
                <div className="text-center w-full">
                  <p className="text-2xl font-bold text-slate-700">14%</p>
                  <p className="text-[10px] text-slate-500">Current rate</p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-300 mx-2" />
                <div className="text-center w-full">
                  <p className="text-2xl font-bold text-blue-600">10.99%</p>
                  <p className="text-[10px] text-slate-500">Potential rate*</p>
                </div>
              </div>
            </div>
          </AnimatedCard>

        </div>
      </div>
    </section>
  );
};
