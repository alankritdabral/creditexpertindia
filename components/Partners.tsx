'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import hdfcLogo from '@/public/logos/hdfc.png';
import iciciLogo from '@/public/logos/icici.png';
import axisLogo from '@/public/logos/axis.png';
import kotakLogo from '@/public/logos/kotak.png';
import idfcLogo from '@/public/logos/idfc.png';

const banks = [
  { id: "hdfc", name: "HDFC Bank", logo: hdfcLogo },
  { id: "icici", name: "ICICI Bank", logo: iciciLogo },
  { id: "axis", name: "Axis Bank", logo: axisLogo },
  { id: "kotak", name: "Kotak Mahindra", logo: kotakLogo },
  { id: "idfc", name: "IDFC First", logo: idfcLogo }
];

const duplicatedBanks = [...banks, ...banks, ...banks, ...banks];

export function Partners() {
  const stats = [
    { value: "10 Lac+", label: "Customers Served" },
    { value: "2000 Cr+", label: "Loans Disbursed" },
    { value: "10,000+", label: "Pincodes Serving" },
    { value: "50+", label: "Banking Partners" },
  ];

  return (
    <section className="bg-white py-16 overflow-hidden w-full relative z-10 border-b border-slate-100">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 w-full flex flex-col">
        
        {/* Banking Partners Slider (Stripe style top logo cloud) */}
        <div className="mb-20">
          <div className="relative flex overflow-hidden w-full transition-all duration-500 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div 
              className="flex items-center gap-16 md:gap-24 whitespace-nowrap w-max py-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 40, repeat: Infinity }}
            >
              {duplicatedBanks.map((bank, i) => (
                <div key={i} className="flex items-center gap-3 transition-all duration-300">
                  <Image
                    src={bank.logo}
                    alt={bank.name}
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain rounded-md"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <span className="text-xl font-bold text-slate-800 tracking-tight">{bank.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col border-l border-slate-200 pl-6">
                <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[15px] text-slate-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 space-y-4 max-w-3xl border-t border-slate-100 pt-8">
          <p className="text-[15px] text-slate-800 font-medium">
            We help you explore suitable options across our lending network.
          </p>
          <p className="text-[13px] leading-relaxed text-slate-500">
            Credit Expert India is not itself a bank or NBFC. Final loan approval, interest rate and loan terms are determined by the respective lender based on their policies and your credit profile. Only displaying lenders with whom we have authorized relationships.
          </p>
        </div>

      </div>
    </section>
  );
}
