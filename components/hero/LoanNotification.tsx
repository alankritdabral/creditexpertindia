import React from 'react';
import { motion } from 'framer-motion';

export interface Transaction {
  city: string;
  amount: string;
  time: string;
}

interface LoanNotificationProps {
  transaction: Transaction | null;
}

export function LoanNotification({ transaction }: LoanNotificationProps) {
  if (!transaction) return null;

  return (
    <motion.div
      key={transaction.city} // Re-animate when city changes
      initial={{ opacity: 0, scale: 0.92, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -10 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="pointer-events-none hidden md:block"
      style={{
        width: '240px',
        background: 'rgba(250, 252, 255, 0.75)', // subtle blue tint, ~75% opacity
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.65)',
        boxShadow: 'inset 1px 1px 1px rgba(255, 255, 255, 0.6), 0 20px 40px rgba(10, 30, 70, 0.08)',
        borderRadius: '18px',
        padding: '16px',
        transform: 'translate(-50%, -100%)',
        marginTop: '-10px',
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-[#0A2540] text-sm flex items-center gap-2">
          {transaction.city}
        </span>
        <span className="text-[#0A2540]/60 text-xs font-medium">{transaction.time}</span>
      </div>
      <div className="text-2xl font-bold text-[#0A2540] mb-3 tracking-tight">
        {transaction.amount}
      </div>
      <div className="flex items-center gap-2 text-sm font-medium text-[#0A2540]/80">
        <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
        Loan Disbursed
      </div>
    </motion.div>
  );
}

export function MobileLoanNotification({ transaction }: LoanNotificationProps) {
  if (!transaction) return null;

  return (
    <motion.div
      key={transaction.city}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none md:hidden w-[90%] max-w-[320px]"
      style={{
        background: 'rgba(250, 252, 255, 0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.65)',
        boxShadow: 'inset 1px 1px 1px rgba(255, 255, 255, 0.6), 0 15px 35px rgba(10, 30, 70, 0.08)',
        borderRadius: '18px',
        padding: '12px 16px',
      }}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="font-semibold text-[#0A2540] text-sm">
          {transaction.city}
        </span>
        <span className="text-2xl font-bold text-[#0A2540] tracking-tight">
          {transaction.amount}
        </span>
      </div>
      <div className="flex items-center gap-1.5 text-xs font-medium text-[#0A2540]/80 mt-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
        Loan Disbursed
      </div>
    </motion.div>
  );
}
