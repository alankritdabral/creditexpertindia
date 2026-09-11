"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { CheckCircle2, IndianRupee, Landmark, Smartphone, CreditCard } from "lucide-react";

/* ─────────────────────────────────────────────
   Notification card data
   ───────────────────────────────────────────── */
const NOTIFICATIONS = [
  {
    icon: Landmark,
    color: "bg-blue-500",
    label: "HDFC Bank",
    title: "EMI Reminder",
    body: "₹8,450 is due this month",
  },
  {
    icon: CreditCard,
    color: "bg-purple-500",
    label: "ICICI Card",
    title: "EMI Reminder",
    body: "₹5,200 is due this month",
  },
  {
    icon: IndianRupee,
    color: "bg-emerald-500",
    label: "Personal Loan",
    title: "EMI Reminder",
    body: "₹7,850 is due this month",
  },
  {
    icon: Smartphone,
    color: "bg-orange-500",
    label: "App Loan",
    title: "EMI Reminder",
    body: "₹3,500 is due this month",
  },
];

/* ─────────────────────────────────────────────
   Notification card component (iOS style)
   ───────────────────────────────────────────── */
function NotificationCard({
  icon: Icon,
  color,
  label,
  title,
  body,
}: (typeof NOTIFICATIONS)[0]) {
  return (
    <div className="w-[230px] p-2.5 rounded-[16px] bg-white/95 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.08),inset_0_0_0_0.2px_rgba(255,255,255,0.4)] text-left select-none">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-1.5">
          <div
            className={`w-[18px] h-[18px] rounded-[5px] flex items-center justify-center ${color} text-white`}
          >
            <Icon className="w-2.5 h-2.5" strokeWidth={2.5} />
          </div>
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide leading-none">
            {label}
          </span>
        </div>
        <span className="text-[9px] text-slate-400 font-medium">now</span>
      </div>
      <p className="text-[12px] font-semibold text-slate-800 leading-snug">
        {title}
      </p>
      <p className="text-[11px] text-slate-500 leading-snug">{body}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Live Clock Hook
   ───────────────────────────────────────────── */
function useLiveClock() {
  const [time, setTime] = useState<{ hours: string; date: string } | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const h12 = hours % 12 || 12;

      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      setTime({
        hours: `${h12}:${minutes}`,
        date: `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`,
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

/* ─────────────────────────────────────────────
   iOS Status Bar with live time
   ───────────────────────────────────────────── */
function StatusBar({ timeStr }: { timeStr: string }) {
  return (
    <div className="flex justify-between items-center px-6 pt-3 pb-1 text-[10px] font-semibold text-white drop-shadow-sm">
      <span>{timeStr}</span>
      <div className="flex items-center gap-1">
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <rect x="0" y="6" width="2.5" height="4" rx="0.5" fill="#fff" />
          <rect x="3.5" y="4" width="2.5" height="6" rx="0.5" fill="#fff" />
          <rect x="7" y="2" width="2.5" height="8" rx="0.5" fill="#fff" />
          <rect x="10.5" y="0" width="2.5" height="10" rx="0.5" fill="#fff" />
        </svg>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M7 2C9.21 2 11.17 3.07 12.38 4.72L13.45 3.65C11.94 1.65 9.63 0.5 7 0.5C4.37 0.5 2.06 1.65 0.55 3.65L1.62 4.72C2.83 3.07 4.79 2 7 2Z" fill="#fff" />
          <path d="M7 5C8.3 5 9.47 5.56 10.28 6.44L11.35 5.37C10.24 4.19 8.7 3.5 7 3.5C5.3 3.5 3.76 4.19 2.65 5.37L3.72 6.44C4.53 5.56 5.7 5 7 5Z" fill="#fff" />
          <circle cx="7" cy="8.5" r="1.5" fill="#fff" />
        </svg>
        <div className="flex items-center">
          <div className="w-[18px] h-[9px] rounded-[2px] border border-white flex items-center p-[1px]">
            <div className="w-[12px] h-[5px] rounded-[1px] bg-white" />
          </div>
          <div className="w-[1.5px] h-[4px] rounded-r-sm bg-white ml-[0.5px]" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Animation constants
   ───────────────────────────────────────────── */
const CARD_HEIGHT = 60; // Deliberately smaller than actual height to force overlap
const CARD_GAP = 0; // Tighter stacking
const CARD_STEP = CARD_HEIGHT + CARD_GAP; // total step per card
const BOTTOM_ANCHOR = 200;
const OFFSCREEN_BOTTOM = 350;

const SLIDE_SPRING = { type: "spring" as const, stiffness: 280, damping: 24, mass: 0.8 };
const GENTLE_SPRING = { type: "spring" as const, stiffness: 180, damping: 26, mass: 1 };

// Fan-out: vertical spread, centered horizontally
const FAN_POSITIONS = [
  { x: 0, y: -150 },
  { x: 0, y: -50 },
  { x: 0, y: 50 },
  { x: 0, y: 150 },
];

/* ─────────────────────────────────────────────
   Animated Counter Hook
   ───────────────────────────────────────────── */
function useAnimatedCounter(from: number, to: number, isActive: boolean, duration = 1500) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!isActive) {
      setValue(from);
      return;
    }

    const startTime = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (to - from) * eased);
      setValue(current);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isActive, from, to, duration]);

  return value;
}

/* ─────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────── */
export function HeroVisualBlock() {
  const clock = useLiveClock();

  const [phase, setPhase] = useState<
    | "phone-in"
    | "stacking"
    | "stacked"
    | "fan-out"
    | "vanish"
    | "counting"
    | "single-emi"
    | "details"
    | "hold"
  >("phone-in");
  const [visibleCards, setVisibleCards] = useState(0);
  const [loopKey, setLoopKey] = useState(0);

  const phoneControls = useAnimationControls();
  const mergedControls = useAnimationControls();

  const emiValue = useAnimatedCounter(25000, 18499, phase === "counting", 1800);

  useEffect(() => {
    let isActive = true;

    const runTimeline = async () => {
      // Small delay to ensure framer-motion controls are fully attached
      await new Promise((r) => setTimeout(r, 50));
      if (!isActive) return;

      // Phone appears
      setPhase("phone-in");
      setVisibleCards(0);
      
      // Give React a tick to commit the state change before starting
      await new Promise((r) => requestAnimationFrame(r));
      if (!isActive) return;

      await phoneControls.start({
        opacity: 1, scale: 1, y: 0,
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
      });
      if (!isActive) return;

      // Notifications slide in from bottom one by one
      setPhase("stacking");
      for (let i = 0; i < 4; i++) {
        await new Promise((r) => setTimeout(r, 250));
        if (!isActive) return;
        setVisibleCards(i + 1);
        await new Promise((r) => setTimeout(r, 750));
        if (!isActive) return;
      }

      // Hold stacked view
      setPhase("stacked");
      await new Promise((r) => setTimeout(r, 600));
      if (!isActive) return;

      // Pop out vertically
      setPhase("fan-out");
      await phoneControls.start({
        opacity: 0, scale: 0.92,
        transition: { duration: 0.5, ease: "easeIn" },
      });
      if (!isActive) return;
      await new Promise((r) => setTimeout(r, 600));
      if (!isActive) return;

      // All cards vanish → show current EMI ₹25,000
      setPhase("vanish");
      await new Promise((r) => setTimeout(r, 800));
      if (!isActive) return;

      // Count down ₹25,000 → ₹18,499
      setPhase("counting");
      await new Promise((r) => setTimeout(r, 2200));
      if (!isActive) return;

      // Single consolidated EMI card appears
      setPhase("single-emi");
      await mergedControls.start({
        opacity: 1, scale: 1,
        transition: { ...GENTLE_SPRING },
      });
      if (!isActive) return;
      await new Promise((r) => setTimeout(r, 400));
      if (!isActive) return;

      // Expand details
      setPhase("details");
      await mergedControls.start({
        height: 290,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
      });
      if (!isActive) return;
      await new Promise((r) => setTimeout(r, 2000));
      if (!isActive) return;

      // Hold
      setPhase("hold");
    };

    runTimeline();

    return () => {
      isActive = false;
      phoneControls.stop();
      mergedControls.stop();
    };
  }, [loopKey, phoneControls, mergedControls]);

  /* ── Compute notification positions ── */
  const getCardStyle = (index: number) => {
    const isVisible = index < visibleCards;

    if (!isVisible) {
      return { opacity: 0, y: OFFSCREEN_BOTTOM, x: 0, scale: 0.92 };
    }

    // Fan out vertically
    if (phase === "fan-out") {
      return { opacity: 1, ...FAN_POSITIONS[index], scale: 0.95 };
    }

    // After fan-out: vanish all cards
    if (phase === "vanish" || phase === "counting" || phase === "single-emi" || phase === "details" || phase === "hold") {
      return { opacity: 0, y: 0, x: 0, scale: 0.5 };
    }

    // Stacking from bottom
    const positionFromBottom = visibleCards - 1 - index;
    const yPos = BOTTOM_ANCHOR - positionFromBottom * CARD_STEP;
    return {
      opacity: 1, y: yPos, x: 0,
      scale: 1 - positionFromBottom * 0.015,
    };
  };

  const displayTime = clock?.hours ?? "9:41";
  const displayDate = clock?.date ?? "Wednesday, September 10";
  const formattedEmi = new Intl.NumberFormat("en-IN").format(emiValue);
  const showEmiCounter = phase === "vanish" || phase === "counting";

  return (
    <div className="relative w-full h-full min-h-[600px] bg-white overflow-hidden flex flex-col justify-center items-center">

      {/* ── iPhone Frame ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={phoneControls}
        className="absolute w-[270px] h-[560px] rounded-[44px] bg-brand-blue border-[8px] border-slate-900 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.04)] flex flex-col overflow-hidden"
      >
        <div className="relative flex justify-center pt-2">
          <div className="w-[90px] h-[26px] bg-black rounded-full" />
        </div>
        <StatusBar timeStr={displayTime} />
        <div className="flex-1 px-4 pt-4">
          <div className="text-center mb-6">
            <p className="text-[10px] text-white/80 font-medium tracking-wide uppercase">{displayDate}</p>
            <p className="text-[52px] font-light text-white leading-none tracking-tight drop-shadow-sm" style={{ fontFamily: "var(--font-sans)" }}>
              {displayTime}
            </p>
          </div>
        </div>
        <div className="pb-2 flex justify-center">
          <div className="w-[100px] h-[4px] rounded-full bg-white/50" />
        </div>
      </motion.div>

      {/* ── Notification Cards ── */}
      {NOTIFICATIONS.map((notif, i) => {
        const style = getCardStyle(i);
        const isVisible = i < visibleCards;
        return (
          <motion.div
            key={`${loopKey}-${i}`}
            initial={{ opacity: 0, y: OFFSCREEN_BOTTOM, x: 0, scale: 0.92 }}
            animate={style}
            transition={
              phase === "fan-out"
                ? { ...GENTLE_SPRING, delay: i * 0.06 }
                : phase === "vanish"
                ? { duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: i * 0.04 }
                : isVisible
                ? SLIDE_SPRING
                : { duration: 0.3 }
            }
            className="absolute z-10"
            style={{ zIndex: 10 + i }}
          >
            <NotificationCard {...notif} />
          </motion.div>
        );
      })}

      {/* ── EMI Counter: ₹25,000 → ₹18,499 ── */}
      <motion.div
        animate={{
          opacity: showEmiCounter ? 1 : 0,
          scale: showEmiCounter ? 1 : 0.8,
          y: showEmiCounter ? 0 : 20,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute z-20 text-center"
      >
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          {phase === "counting" ? "Your New EMI" : "Your Current EMI"}
        </p>
        <p className="text-[42px] font-extrabold text-slate-800 leading-none tracking-tight">
          ₹{formattedEmi}
          <span className="text-lg font-medium text-slate-400">/mo</span>
        </p>
        <motion.div
          animate={{
            opacity: phase === "counting" ? 1 : 0,
            y: phase === "counting" ? 0 : 10,
          }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-3 flex items-center justify-center gap-3"
        >
          <span className="text-sm font-semibold text-brand-blue bg-blue-50 px-3 py-1 rounded-full">
            9.99% rate
          </span>
          <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Save ₹6,501/mo
          </span>
        </motion.div>
        <motion.p
          animate={{ opacity: phase === "vanish" ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-xs font-medium text-slate-400 mt-2"
        >
          4 EMIs combined
        </motion.p>
      </motion.div>

      {/* ── Consolidated EMI Card ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, height: 100 }}
        animate={mergedControls}
        className="absolute z-30 w-[300px] bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col shadow-[0_20px_50px_-12px_rgba(29,78,216,0.15)]"
      >
        <div className="p-5 bg-gradient-to-br from-white via-white to-blue-50/40 border-b border-slate-100">
          <p className="text-[10px] font-bold text-brand-blue uppercase tracking-widest mb-1.5">
            Your Consolidated EMI
          </p>
          <h3 className="text-[26px] font-extrabold text-slate-900 tracking-tight leading-none">
            ₹18,499{" "}
            <span className="text-sm font-medium text-slate-400">/ month</span>
          </h3>
        </div>

        <motion.div
          animate={{ opacity: phase === "details" || phase === "hold" ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-5 flex flex-col gap-3"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={phase === "details" || phase === "hold" ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex justify-between items-center"
          >
            <span className="text-[13px] text-slate-500">Interest Rate</span>
            <span className="text-[13px] font-bold text-slate-800">9.99%</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={phase === "details" || phase === "hold" ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex justify-between items-center"
          >
            <span className="text-[13px] text-slate-500">Tenure</span>
            <span className="text-[13px] font-bold text-slate-800">60 months</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={phase === "details" || phase === "hold" ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="flex justify-between items-center pt-2.5 border-t border-slate-100"
          >
            <span className="text-[13px] text-slate-500">Total Saved</span>
            <span className="text-[13px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">₹6,501/mo</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={phase === "details" || phase === "hold" ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: 0.9 }}
            className="mt-1 flex items-center justify-center gap-2 text-[13px] font-semibold text-emerald-600 bg-emerald-50/50 py-2.5 rounded-xl border border-emerald-100"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            4 loans → 1 EMI
          </motion.div>
        </motion.div>

        {/* Success glow */}
        <motion.div
          animate={{ opacity: phase === "hold" ? 0.15 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-emerald-400 to-transparent pointer-events-none rounded-2xl"
        />
      </motion.div>
    </div>
  );
}
