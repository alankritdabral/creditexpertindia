'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const banks = [
  { id: "hdfc", name: "HDFC Bank" },
  { id: "icici", name: "ICICI Bank" },
  { id: "axis", name: "Axis Bank" },
  { id: "kotak", name: "Kotak Mahindra" },
  { id: "idfc", name: "IDFC First" }
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
    <section className="bg-white py-24 border-y border-gray-100 overflow-hidden w-full">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full flex flex-col items-center">

        <h2 className="text-3xl font-medium tracking-tight text-text-main sm:text-4xl text-center mb-16">
          Our Impact & Banking Partners
        </h2>

        {/* Impact Stats */}
        <div className="w-full max-w-5xl mb-20">
          <div className="grid grid-cols-2 gap-y-12 sm:grid-cols-4 gap-x-8">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="text-3xl sm:text-4xl lg:text-[40px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-blue-400 mb-3">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-text-muted font-medium uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Banking Partners Slider */}
        <div className="relative flex overflow-hidden w-full max-w-5xl transition-all duration-500">
          <motion.div 
            className="flex items-center gap-24 whitespace-nowrap w-max py-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          >
            {duplicatedBanks.map((bank, i) => (
              <div key={i} className="flex items-center gap-4">
                <Image
                  src={`/logos/${bank.id}.png`}
                  alt={bank.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain rounded-md"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="text-2xl font-bold text-text-muted tracking-tight">{bank.name}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mx-auto max-w-2xl text-center mt-16 space-y-4">
          <p className="text-lg text-text-main font-medium">
            We help you explore suitable options across our lending network.
          </p>
          <p className="text-[13px] leading-relaxed text-text-muted font-normal max-w-3xl mx-auto">
            Credit Expert India is not itself a bank or NBFC. Final loan approval, interest rate and loan terms are determined by the respective lender based on their policies and your credit profile. Only displaying lenders with whom we have authorized relationships.
          </p>
        </div>
      </div>
    </section>
  );
}
