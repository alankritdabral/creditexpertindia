import React from 'react';
import { motion } from 'framer-motion';
import { Building, Home, GitMerge, TrendingDown, CreditCard, Percent, ArrowRightLeft, Landmark, PiggyBank, Smartphone, ChevronRight } from 'lucide-react';

const typeConfig = {
  home: { icon: Home, color: "from-blue-800 to-blue-500", shadow: "rgba(59,130,246,0.4)" },
  merge: { icon: GitMerge, color: "from-purple-800 to-purple-500", shadow: "rgba(168,85,247,0.4)" },
  reduce: { icon: TrendingDown, color: "from-green-800 to-green-500", shadow: "rgba(34,197,94,0.4)" },
  card: { icon: CreditCard, color: "from-orange-800 to-orange-500", shadow: "rgba(249,115,22,0.4)" },
  percent: { icon: Percent, color: "from-teal-800 to-teal-500", shadow: "rgba(20,184,166,0.4)" },
  transfer: { icon: ArrowRightLeft, color: "from-indigo-800 to-indigo-500", shadow: "rgba(99,102,241,0.4)" },
  bank: { icon: Landmark, color: "from-rose-800 to-rose-500", shadow: "rgba(244,63,94,0.4)" },
  save: { icon: PiggyBank, color: "from-emerald-800 to-emerald-500", shadow: "rgba(16,185,129,0.4)" },
  app: { icon: Smartphone, color: "from-cyan-800 to-cyan-500", shadow: "rgba(6,182,212,0.4)" },
  default: { icon: Building, color: "from-[#1E3A8A] to-[#3B82F6]", shadow: "rgba(59,130,246,0.4)" }
};

export interface Transaction {
  city: string;
  title?: string;
  amount: string;
  time: string;
  status?: string;
  type?: keyof typeof typeConfig;
}

interface LoanNotificationProps {
  transaction: Transaction | null;
  align?: 'left' | 'right';
  vAlign?: 'top' | 'bottom';
}

export function LoanNotification({ transaction, align = 'right', vAlign = 'top' }: LoanNotificationProps) {
  if (!transaction) return null;

  const isLeft = align === 'left';
  const isTop = vAlign === 'top';
  
  // Scale down Uttar Pradesh specifically to prevent clipping on the edge
  const isUP = transaction.city === "Uttar Pradesh";
  const scaleTarget = isUP ? 0.85 : 1;
  const scaleInitial = isUP ? 0.80 : 0.95;

  const config = transaction.type ? typeConfig[transaction.type] : typeConfig.default;
  const Icon = config.icon;

  let d = "";
  if (isTop) {
    d = isLeft ? "M 40 40 L 0 0" : "M 0 40 L 40 0";
  } else {
    d = isLeft ? "M 40 0 L 0 40" : "M 0 0 L 40 40";
  }

  const gradientCoords = {
    x1: isLeft ? "100%" : "0%",
    y1: isTop ? "100%" : "0%",
    x2: isLeft ? "0%" : "100%",
    y2: isTop ? "0%" : "100%"
  };

  return (
    <motion.div 
      key={`container-${transaction.city}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pointer-events-none relative z-50"
    >
      
      {/* Marker - Animated */}
      <motion.div
        key={`marker-${transaction.city}`}
        initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
        exit={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute flex items-center justify-center"
        style={{ left: 0, top: 0 }}
      >
        <div className="absolute w-[22px] h-[22px] rounded-full border border-blue-400/60 animate-[ping_2s_ease-out_infinite]"></div>
        <div className="absolute w-[14px] h-[14px] rounded-full bg-blue-500/40"></div>
        <div className="relative w-[6px] h-[6px] rounded-full bg-white shadow-[0_0_8px_2px_rgba(59,130,246,0.8)]"></div>
      </motion.div>

      {/* Connector Line - Animated */}
      <motion.svg
        key={`line-${transaction.city}`}
        className="absolute overflow-visible"
        style={{ 
          left: isLeft ? '-40px' : '0', 
          top: isTop ? '-40px' : '0', 
          width: '40px', 
          height: '40px' 
        }}
      >
        <motion.path
          d={d}
          stroke="url(#connectorGradient)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="drop-shadow-[0_0_3px_rgba(59,130,246,0.6)]"
        />
        <defs>
          <linearGradient id="connectorGradient" {...gradientCoords}>
            <stop offset="0%" stopColor="rgba(59,130,246,0)" />
            <stop offset="100%" stopColor="rgba(59,130,246,1)" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Notification Card */}
      <motion.div
        key={`card-${transaction.city}`}
        initial={{ opacity: 0, scale: scaleInitial }}
        animate={{ opacity: 1, scale: scaleTarget }}
        exit={{ opacity: 0, scale: scaleInitial }}
        transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute flex items-center p-2.5 sm:p-3 md:p-3.5 gap-2.5 sm:gap-3 md:gap-3.5"
        style={{
          left: isLeft ? 'auto' : '40px',
          right: isLeft ? '40px' : 'auto',
          top: isTop ? 'auto' : '40px',
          bottom: isTop ? '40px' : 'auto',
          width: 'max-content',
          minWidth: '180px',
          height: 'auto',
          background: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(255,255,255,0.5)',
          boxShadow: '0 8px 32px rgba(36, 63, 145, 0.15), 0 0 15px rgba(59, 130, 246, 0.1), inset 0 0 0 1px rgba(255,255,255,0.5)',
          borderRadius: '16px',
          transformOrigin: `${isTop ? 'bottom' : 'top'} ${isLeft ? 'right' : 'left'}`
        }}
      >
        {/* Left Icon */}
        <div className={`shrink-0 flex items-center justify-center w-[36px] h-[36px] md:w-[42px] md:h-[42px] rounded-full bg-gradient-to-br ${config.color}`} style={{ boxShadow: `0 0 15px ${config.shadow}` }}>
          <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center min-w-[100px]">
          <div className="flex justify-between items-center mb-0.5">
            <span className="font-semibold text-[#0A2540] text-[13px] sm:text-[14px] md:text-[15px] truncate max-w-[130px]">{transaction.title || transaction.city}</span>
          </div>
          <div className="text-[15px] sm:text-[17px] md:text-[19px] font-bold text-[#0A2540] leading-none mb-1 md:mb-1.5 tracking-tight">
            {transaction.amount}
          </div>
          <div className="flex items-center gap-1.5 text-[12px] md:text-[13px] text-[#506480] font-medium whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_6px_rgba(16,185,129,0.5)]"></span>
            {transaction.status || 'Loan Disbursed'}
          </div>
        </div>

        {/* Right Arrow */}
        <div className="shrink-0 pl-1">
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#0A2540]/40" />
        </div>
      </motion.div>
    </motion.div>
  );
}
