import { motion, MotionValue, useTransform } from "framer-motion";

export function InteractiveDebtVisualizer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // PHASES:
  // 0.00 - 0.18: Collapse Cards
  // 0.18 - 0.48: The Calculation (Numbers scrub)
  // 0.48 - 0.73: Final Plan Fades In & Container Shrinks to pull text up
  // 0.73 - 0.79: Bottom Hero text merges into place
  // 0.79 - 1.00: End scroll (reduced by 40% from 0.35 to 0.21)

  // --- Dynamic Container Height (The "Merge" effect) ---
  const containerMaxHeight = useTransform(scrollYProgress, [0.67, 0.73, 1], [500, 0, 0]);

  // --- Phase 1 & 2: Collapse Animations (0.05 -> 0.15) ---
  const collapseY1 = useTransform(scrollYProgress, [0.05, 0.15, 1], [0, 80, 80]);
  const collapseX1 = useTransform(scrollYProgress, [0.05, 0.15, 1], [0, 80, 80]);
  
  const collapseY2 = useTransform(scrollYProgress, [0.05, 0.15, 1], [0, 80, 80]);
  const collapseX2 = useTransform(scrollYProgress, [0.05, 0.15, 1], [0, -80, -80]);

  const collapseY3 = useTransform(scrollYProgress, [0.05, 0.15, 1], [0, -80, -80]);
  const collapseX3 = useTransform(scrollYProgress, [0.05, 0.15, 1], [0, 80, 80]);

  const collapseY4 = useTransform(scrollYProgress, [0.05, 0.15, 1], [0, -80, -80]);
  const collapseX4 = useTransform(scrollYProgress, [0.05, 0.15, 1], [0, -80, -80]);

  const beforeOpacity = useTransform(scrollYProgress, [0.12, 0.18, 1], [1, 0, 0]);
  const beforeScale = useTransform(scrollYProgress, [0.12, 0.18, 1], [1, 0.8, 0.8]);

  // --- Phase 3: Calculation View (0.15 -> 0.48) ---
  const calcOpacity = useTransform(scrollYProgress, [0.15, 0.18, 0.42, 0.48, 1], [0, 1, 1, 0, 0]);
  const calcScale = useTransform(scrollYProgress, [0.15, 0.18, 1], [0.8, 1, 1]);

  // Scrubbing Numbers (0.18 -> 0.42)
  const rawRate = useTransform(scrollYProgress, [0.18, 0.42, 1], [42, 11, 11]);
  const rateStr = useTransform(rawRate, (r) => `${Math.round(r)}% p.a.*`);

  const rawOutflow = useTransform(scrollYProgress, [0.18, 0.42, 1], [38500, 27800, 27800]);
  const outflowStr = useTransform(rawOutflow, (v) => `₹${Math.round(v).toLocaleString()}*`);

  const rawTotal = useTransform(scrollYProgress, [0.18, 0.42, 1], [13.86, 10.0, 10.0]);
  const totalStr = useTransform(rawTotal, (v) => `₹${v.toFixed(2)} Lakhs*`);

  // --- Phase 4: Final Plan (0.48 -> 0.54, fades out 0.67 -> 0.73) ---
  const finalOpacity = useTransform(scrollYProgress, [0.48, 0.54, 0.67, 0.73, 1], [0, 1, 1, 0, 0]);
  const finalScale = useTransform(scrollYProgress, [0.48, 0.54, 1], [0.9, 1, 1]);

  // --- Entire Visualizer Fade Out ---
  const visualizerOpacity = useTransform(scrollYProgress, [0.67, 0.73, 1], [1, 0, 0]);

  return (
    <motion.div 
      style={{ maxHeight: containerMaxHeight, opacity: visualizerOpacity }} 
      className="relative w-full max-w-4xl mx-auto px-2 sm:px-4 flex items-center justify-center shrink-0 overflow-hidden h-[310px] sm:h-[420px]"
    >
      <div className="absolute inset-0 bg-brand-blue/5 rounded-[40px] blur-3xl -z-10" />

      {/* LAYER 1: BEFORE STATE */}
      <motion.div 
        style={{ opacity: beforeOpacity, scale: beforeScale }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="relative w-full max-w-2xl h-[310px] sm:h-[420px]">
          <div className="absolute inset-x-0 top-2 sm:top-4 text-center">
            <h3 className="text-base sm:text-xl font-bold tracking-wider text-warning-red mb-1 sm:mb-2 uppercase">Your Debt Today</h3>
          </div>

          {/* Card 1 */}
          <motion.div 
            style={{ x: collapseX1, y: collapseY1 }}
            className="absolute left-2 sm:left-12 top-10 sm:top-16 w-32 sm:w-48 bg-white p-3 sm:p-4 rounded-2xl shadow-lg border border-red-100 flex flex-col items-center justify-center"
          >
            <p className="text-base sm:text-lg font-bold text-text-main">₹14,500</p>
            <p className="text-[11px] sm:text-xs text-text-muted font-medium">Personal Loan</p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            style={{ x: collapseX2, y: collapseY2 }}
            className="absolute right-2 sm:right-12 top-10 sm:top-16 w-32 sm:w-48 bg-white p-3 sm:p-4 rounded-2xl shadow-lg border border-red-100 flex flex-col items-center justify-center"
          >
            <p className="text-base sm:text-lg font-bold text-text-main">₹8,500</p>
            <p className="text-[11px] sm:text-xs text-text-muted font-medium">Credit Card</p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            style={{ x: collapseX3, y: collapseY3 }}
            className="absolute left-2 sm:left-12 bottom-10 sm:bottom-16 w-32 sm:w-48 bg-white p-3 sm:p-4 rounded-2xl shadow-lg border border-red-100 flex flex-col items-center justify-center"
          >
            <p className="text-base sm:text-lg font-bold text-text-main">₹6,000</p>
            <p className="text-[11px] sm:text-xs text-text-muted font-medium">App Loan</p>
          </motion.div>

          {/* Card 4 */}
          <motion.div 
            style={{ x: collapseX4, y: collapseY4 }}
            className="absolute right-2 sm:right-12 bottom-10 sm:bottom-16 w-32 sm:w-48 bg-white p-3 sm:p-4 rounded-2xl shadow-lg border border-red-100 flex flex-col items-center justify-center"
          >
            <p className="text-base sm:text-lg font-bold text-text-main">₹9,500</p>
            <p className="text-[11px] sm:text-xs text-text-muted font-medium">Personal Loan</p>
          </motion.div>
          
          {/* Center Dot (Visible during collapse) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-slate-900 opacity-20" />
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between px-4 sm:px-24">
            <div className="text-left">
              <p className="text-[11px] sm:text-xs text-text-muted font-medium uppercase">Monthly outflow</p>
              <p className="text-base sm:text-lg font-bold text-warning-red line-through">₹38,500</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] sm:text-xs text-text-muted font-medium uppercase">Highest rate</p>
              <p className="text-base sm:text-lg font-bold text-warning-red">42% p.a.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* LAYER 2: THE CALCULATION */}
      <motion.div
        style={{ opacity: calcOpacity, scale: calcScale }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-slate-100 w-full max-w-md text-center">
          <h3 className="text-sm font-bold tracking-wider text-savings-green mb-6 uppercase">ONE CLEAR PLAN</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-end border-b border-slate-200 pb-2">
              <span className="text-text-muted font-medium text-sm">Interest Rate</span>
              <motion.span className="text-xl font-bold text-text-main">{rateStr}</motion.span>
            </div>
            <div className="flex justify-between items-end border-b border-slate-200 pb-2">
              <span className="text-text-muted font-medium text-sm">Monthly EMI</span>
              <motion.span className="text-xl font-bold text-text-main">{outflowStr}</motion.span>
            </div>
            <div className="flex justify-between items-end border-b border-slate-200 pb-2">
              <span className="text-text-muted font-medium text-sm">Total Payable</span>
              <motion.span className="text-xl font-bold text-text-main">{totalStr}</motion.span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* LAYER 3: THE FINAL PLAN */}
      <motion.div
        style={{ opacity: finalOpacity, scale: finalScale }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="bg-white p-6 sm:p-8 rounded-[32px] shadow-[0_20px_50px_-12px_rgba(24,166,106,0.15)] border border-savings-green/20 w-full max-w-lg text-center relative overflow-hidden pointer-events-auto">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-savings-green/10 rounded-full blur-2xl pointer-events-none" />
          
          <h3 className="text-sm font-bold tracking-wider text-savings-green uppercase mb-4 relative z-10">ONE CLEAR PLAN</h3>
          
          <div className="flex flex-col items-center justify-center gap-1 mb-6 relative z-10">
            <motion.div className="text-4xl sm:text-5xl font-bold tracking-tight text-text-main">
              ₹27,800 <span className="text-xl text-text-muted font-medium">/ month*</span>
            </motion.div>
            <p className="text-text-muted font-medium uppercase tracking-wider text-[10px] mt-1">Potential Monthly EMI</p>
          </div>

          <div className="flex items-center justify-center gap-6 mb-6 relative z-10">
            <div className="text-center px-4 border-r border-slate-100">
              <p className="text-text-main font-bold text-lg mb-1">11% p.a.*</p>
              <p className="text-text-muted text-[10px] font-medium uppercase tracking-wider">Potential Rate</p>
            </div>
            <div className="text-center px-4">
              <p className="text-savings-green font-bold text-lg mb-1">↓ ₹10,700*</p>
              <p className="text-text-muted text-[10px] font-medium uppercase tracking-wider">Monthly Difference</p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-100 relative z-10">
            <ul className="text-left space-y-2">
              <li className="flex items-center text-text-main font-medium text-sm">
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-savings-green/20 text-savings-green mr-3 shrink-0 text-[10px]">✓</span>
                One single lender
              </li>
              <li className="flex items-center text-text-main font-medium text-sm">
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-savings-green/20 text-savings-green mr-3 shrink-0 text-[10px]">✓</span>
                One predictable due date
              </li>
              <li className="flex items-center text-text-main font-medium text-sm">
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-savings-green/20 text-savings-green mr-3 shrink-0 text-[10px]">✓</span>
                Clear repayment structure
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
      
    </motion.div>
  );
}
