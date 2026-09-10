"use client";

import React from "react";
import { CreditCard, Smartphone, ShoppingBag, Landmark, Files } from "lucide-react";
import { motion } from "framer-motion";

const debtTypes = [
  {
    title: "Personal Loans",
    description: "Consolidate eligible personal-loan obligations into one manageable EMI.",
    icon: Landmark,
    color: "bg-blue-50 text-brand-blue border-blue-100",
  },
  {
    title: "Credit Cards",
    description: "Explore refinancing and consolidation of eligible credit-card outstanding amounts.",
    icon: CreditCard,
    color: "bg-red-50 text-warning-red border-red-100",
  },
  {
    title: "App Loans",
    description: "Explore consolidation of eligible digital and app-based short-term loans.",
    icon: Smartphone,
    color: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    title: "Consumer Loans",
    description: "Manage eligible consumer-financing obligations under a unified plan.",
    icon: ShoppingBag,
    color: "bg-orange-50 text-orange-500 border-orange-100",
  },
  {
    title: "Multiple Personal Loans",
    description: "Combine multiple eligible unsecured obligations into a simplified repayment structure.",
    icon: Files,
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function DebtTypes() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="max-w-3xl mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-text-main mb-4 tracking-tight">
          Bring Your Eligible Loans Together
        </h2>
        <p className="text-lg text-text-muted">
          Whether it's a high-interest credit card or multiple small app loans, 
          we help you evaluate which debts can be consolidated into a single, smarter payment.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {debtTypes.map((type, index) => {
          const Icon = type.icon;
          return (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-warm-bg rounded-2xl p-6 border border-slate-200/60 hover:shadow-md transition-shadow group flex flex-col"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border mb-5 ${type.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-text-main mb-2 group-hover:text-brand-blue transition-colors tracking-tight">
                {type.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {type.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
