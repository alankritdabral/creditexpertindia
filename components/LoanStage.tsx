"use client";

import React, { useEffect, useId, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { AnimatedCreditCard } from "./ui/AnimatedCreditCard";
import { AnimatedNumber } from "./ui/AnimatedNumber";

// AnimatedPhoneMockup registers gsap's ScrollTrigger at module scope, which
// previously pulled gsap into the homepage's initial bundle even though
// this one "phone" scene is just one of several LoanSolutionsSection rows
// (plans/01-visibility-and-analytics.md Phase 10). Loaded only when this
// scene is actually the active one.
const AnimatedPhoneMockup = dynamic(
  () => import("./ui/AnimatedPhoneMockup").then((m) => m.AnimatedPhoneMockup),
  { ssr: false }
);

export type StageChip = { amount: number; name: string; icon: LucideIcon };
export type StageRate = { from: number; to: number };
export type StageScene =
  | { kind: "phone"; tint: string }
  | { kind: "card"; tint: string; rate: StageRate }
  | { kind: "merge"; tint: string; chips: StageChip[]; emi: number }
  | { kind: "rate"; tint: string; rate: StageRate };

// The stage is a fixed 440x600 design canvas; the wrapper scales it down on small screens.
const W = 440;
const H = 600;
const CX = W / 2;
const CY = H / 2;
const ROW_H = 52;
const ROW_GAP = 10;
const CHIP_W = 168;
const CHIP_LEFT = 10;
const CHIPS_TOP = (H - (4 * ROW_H + 3 * ROW_GAP)) / 2;
const HUB_W = 116;
const HUB_H = 110;
const HUB_LEFT = CHIP_LEFT + 420 - HUB_W;
const HUB_TOP = CY - HUB_H / 2;
const PHONE_SCALE = 0.9;
const CARD_Y = -90;
const RATE_CARD_Y = 190;
const RATE_W = 380;
const RATE_H = 96;

const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING = { type: "spring", stiffness: 240, damping: 26 } as const;

const FOCAL = {
  phone: { x: CX, y: CY },
  card: { x: CX, y: CY + CARD_Y },
  rate: { x: CX, y: CY },
  merge: { x: CX, y: CY },
} as const;

const SHELL = {
  phone: { width: 300 * PHONE_SCALE, height: 600 * PHONE_SCALE, borderRadius: 43, x: 0, y: 0, rotate: 0, opacity: 1 },
  card: { width: 320, height: 202, borderRadius: 20, x: 0, y: CARD_Y, rotate: -6, opacity: 1 },
  merge: { width: HUB_W, height: HUB_H, borderRadius: 12, x: HUB_LEFT + HUB_W / 2 - CX, y: 0, rotate: 0, opacity: 0 },
  rate: { width: RATE_W, height: RATE_H, borderRadius: 16, x: 0, y: 0, rotate: 0, opacity: 0 },
} as const;

const fmtMoney = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

function StageChipCard({ chip, index, active, focal, instant }: { chip: StageChip; index: number; active: boolean; focal: { x: number; y: number }; instant: boolean }) {
  const top = CHIPS_TOP + index * (ROW_H + ROW_GAP);
  const Icon = chip.icon;
  const hidden = { opacity: 0, x: focal.x - (CHIP_LEFT + CHIP_W / 2), y: focal.y - (top + ROW_H / 2), scale: 0.35 };
  return (
    <motion.div
      initial={false}
      animate={active ? { opacity: 1, x: 0, y: 0, scale: 1 } : hidden}
      transition={
        instant
          ? { duration: 0 }
          : active
            ? { ...SPRING, delay: 0.1 + index * 0.06 }
            : { duration: 0.35, ease: [0.5, 0, 0.75, 0], delay: index * 0.03 }
      }
      className="absolute rounded-xl bg-white border border-[#0066FF]/15 shadow-sm flex items-center px-3"
      style={{ left: CHIP_LEFT, top, width: CHIP_W, height: ROW_H }}
    >
      <div className="relative w-8 h-8 shrink-0 rounded-lg bg-[#F3F9FF] border border-[#0066FF]/20 text-[#0052CC]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={chip.name}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: instant ? 0 : 0.25 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Icon className="w-4 h-4" />
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="ml-2.5">
        <p className="text-sm leading-tight font-bold text-[#0A2540] tabular-nums">
          <AnimatedNumber value={chip.amount} format={fmtMoney} instant={instant} />
        </p>
        <div className="relative h-[14px] w-[100px] mt-0.5">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={chip.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: instant ? 0 : 0.25 }}
              className="text-[11px] leading-[14px] text-[#0A2540] opacity-70 whitespace-nowrap"
            >
              {chip.name}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function RateCard({ rate, active, y, instant }: { rate: StageRate; active: boolean; y: number; instant: boolean }) {
  const fmtFor = (target: number) => {
    const decimals = Number.isInteger(target) ? 0 : 2;
    return (n: number) => n.toFixed(decimals) + "%";
  };
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        initial={false}
        animate={active ? { opacity: 1, y, scale: 1 } : { opacity: 0, y: y + 30, scale: 0.94 }}
        transition={instant ? { duration: 0 } : active ? { ...SPRING, delay: 0.3 } : { duration: 0.25 }}
        className="rounded-2xl p-5 flex items-center justify-between bg-white shadow-[0_12px_35px_rgba(7,27,79,0.08)] border border-[#E2E8F0]"
        style={{ width: RATE_W, height: RATE_H }}
      >
        <div>
          <p className="text-[32px] font-bold text-[#0A2540] leading-none mb-1 tabular-nums">
            <AnimatedNumber value={rate.from} format={fmtFor(rate.from)} instant={instant} />
          </p>
          <p className="text-sm text-[#0A2540] opacity-70 font-medium">Current rate</p>
        </div>
        <ArrowRight className="w-6 h-6 text-[#0052CC]" strokeWidth={1.5} />
        <div className="text-right">
          <p className="text-[32px] font-bold text-[#15803D] leading-none mb-1 tabular-nums">
            <AnimatedNumber value={rate.to} format={fmtFor(rate.to)} instant={instant} />
          </p>
          <p className="text-sm text-[#0A2540] opacity-70 font-medium">Potential rate*</p>
        </div>
      </motion.div>
    </div>
  );
}

// True once a layer has been inactive long enough for its exit to finish, so hidden heavy layers stop painting.
function useSettledHidden(active: boolean) {
  const [settled, setSettled] = useState(false);
  if (active && settled) setSettled(false);
  useEffect(() => {
    if (active) return;
    const t = setTimeout(() => setSettled(true), 600);
    return () => clearTimeout(t);
  }, [active]);
  return settled && !active;
}

type StageMemory = { chips: StageChip[]; emi: number; rate: StageRate; seen: ReadonlySet<string> };

function useStageMemory(scene: StageScene): StageMemory {
  const [mem, setMem] = useState<StageMemory>({ chips: [], emi: 0, rate: { from: 45, to: 11 }, seen: new Set([scene.kind]) });
  let next = mem;
  if (!mem.seen.has(scene.kind)) next = { ...next, seen: new Set(mem.seen).add(scene.kind) };
  if (scene.kind === "merge" && (scene.chips !== mem.chips || scene.emi !== mem.emi)) next = { ...next, chips: scene.chips, emi: scene.emi };
  if ((scene.kind === "card" || scene.kind === "rate") && scene.rate !== mem.rate) next = { ...next, rate: scene.rate };
  if (next !== mem) setMem(next); // derived state, adjusted during render
  return next;
}

export function LoanStage({ scene, className, style, still }: { scene: StageScene; className?: string; style?: React.CSSProperties; still?: boolean }) {
  const instant = useReducedMotion() === true || still === true;
  const uid = useId().replace(/:/g, "");
  const kind = scene.kind;
  const focal = FOCAL[kind];

  // Heavy layers mount the first time they are needed, then stay mounted so the stage never resets.
  // Persistent elements keep their last content while hidden, so they only fly out and back in.
  const { chips, emi, rate, seen } = useStageMemory(scene);

  const mergeActive = kind === "merge";
  const hubPulse = useAnimationControls();
  useEffect(() => {
    if (!mergeActive || instant) return;
    const t = setTimeout(() => hubPulse.start({ scale: [1, 1.06, 1], transition: { duration: 0.5, ease: EASE } }), 750);
    return () => {
      clearTimeout(t);
      hubPulse.stop();
    };
  }, [mergeActive, emi, instant, hubPulse]);

  const shell = SHELL[kind];
  const rateY = kind === "card" ? RATE_CARD_Y : 0;
  const cardHidden = useSettledHidden(kind === "card");
  const phoneHidden = useSettledHidden(kind === "phone");

  return (
    <div
      aria-hidden="true"
      style={style}
      className={`relative rounded-md bg-[linear-gradient(160deg,#eaf3ff,#f7fbff_55%,#dcebff)] border border-[#E2E8F0] overflow-hidden flex items-center justify-center h-[340px] sm:h-[420px] ${className ?? ""}`}
    >
      <motion.div
        initial={false}
        animate={{ backgroundColor: scene.tint }}
        transition={{ duration: instant ? 0 : 0.8 }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Phone needs the full canvas height; the other scenes are shorter, so on mobile they scale up to fill the box. */}
      <div
        className={`relative shrink-0 w-[440px] h-[600px] ${kind === "phone" ? "scale-[0.55] lg:scale-[0.74]" : kind === "card" ? "scale-[0.62] lg:scale-[0.85]" : "scale-[0.74] lg:scale-[0.95]"} sm:scale-[0.68] motion-safe:transition-transform motion-safe:duration-500`}
      >
        {/* Connectors: dashed lines revealed through a pathLength-driven mask */}
        <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" viewBox={`0 0 ${W} ${H}`} aria-hidden>
          <defs>
            {[0, 1, 2, 3].map((i) => {
              const y = CHIPS_TOP + i * (ROW_H + ROW_GAP) + ROW_H / 2;
              return (
                <mask key={i} id={`${uid}-m${i}`} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
                  <motion.path
                    d={`M ${CHIP_LEFT + CHIP_W} ${y} C 240 ${y}, 270 ${CY}, ${HUB_LEFT - 6} ${CY}`}
                    stroke="white"
                    strokeWidth="6"
                    fill="none"
                    initial={false}
                    animate={{ pathLength: mergeActive ? 1 : 0 }}
                    transition={instant ? { duration: 0 } : mergeActive ? { duration: 0.6, ease: EASE, delay: 0.4 + i * 0.07 } : { duration: 0.2 }}
                  />
                </mask>
              );
            })}
          </defs>
          {[0, 1, 2, 3].map((i) => {
            const y = CHIPS_TOP + i * (ROW_H + ROW_GAP) + ROW_H / 2;
            return (
              <path
                key={i}
                d={`M ${CHIP_LEFT + CHIP_W} ${y} C 240 ${y}, 270 ${CY}, ${HUB_LEFT - 6} ${CY}`}
                stroke="#0066FF"
                strokeWidth="1.5"
                strokeDasharray="3 5"
                fill="none"
                mask={`url(#${uid}-m${i})`}
              />
            );
          })}
        </svg>

        {/* Shell: the one shape that morphs between phone, card, hub and rate card */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={false}
            animate={kind === "phone" || kind === "card" ? { ...shell, opacity: instant ? 0 : [1, 1, 0] } : shell}
            transition={instant ? { duration: 0 } : { duration: 0.55, ease: EASE, opacity: { duration: 0.3, ...(kind === "phone" || kind === "card" ? { duration: 1, times: [0, 0.6, 1] } : {}) } }}
            className="bg-[#0A2540]"
          />
        </div>

        <RateCard rate={rate} active={kind === "card" || kind === "rate"} y={rateY} instant={instant} />

        {chips.map((chip, i) => (
          <StageChipCard key={i} chip={chip} index={i} active={mergeActive} focal={focal} instant={instant} />
        ))}

        <motion.div
          initial={false}
          animate={mergeActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
          transition={instant ? { duration: 0 } : mergeActive ? { duration: 0.4, delay: 0.3 } : { duration: 0.2 }}
          className="absolute"
          style={{ left: HUB_LEFT, top: HUB_TOP, width: HUB_W, height: HUB_H }}
        >
          <motion.div
            animate={hubPulse}
            className="w-full h-full rounded-xl flex flex-col items-center justify-center text-white shadow-lg"
            style={{ background: "linear-gradient(135deg, #0A2540 0%, #0052CC 100%)" }}
          >
            <p className="text-xs font-medium text-[#BFDBFE] mb-2">ONE EMI</p>
            <p className="text-[21px] font-bold mb-1.5 tabular-nums">
              <AnimatedNumber value={emi} format={fmtMoney} instant={instant} />
            </p>
            <p className="text-xs text-[#BFDBFE]">per month</p>
          </motion.div>
        </motion.div>

        {seen.has("card") && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ visibility: cardHidden ? "hidden" : "visible" }}>
            <motion.div
              initial={false}
              animate={
                kind === "card"
                  ? { opacity: 1, scale: 1, y: CARD_Y, rotate: -6 }
                  : { opacity: 0, scale: 0.85, y: CARD_Y + 20, rotate: -6 }
              }
              transition={instant ? { duration: 0 } : kind === "card" ? { ...SPRING, delay: 0.3 } : { duration: 0.2 }}
              className="w-[320px]"
              style={{ pointerEvents: kind === "card" ? "auto" : "none" }}
            >
              <AnimatedCreditCard />
            </motion.div>
          </div>
        )}

        {seen.has("phone") && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ visibility: phoneHidden ? "hidden" : "visible" }}>
            <motion.div
              initial={false}
              animate={
                kind === "phone"
                  ? { opacity: 1, scale: PHONE_SCALE, y: 0 }
                  : { opacity: 0, scale: PHONE_SCALE * 0.88, y: 24 }
              }
              transition={instant ? { duration: 0 } : kind === "phone" ? { ...SPRING, delay: 0.3 } : { duration: 0.2 }}
              style={{ pointerEvents: kind === "phone" ? "auto" : "none" }}
            >
              <AnimatedPhoneMockup className="h-[600px] md:h-[600px]" />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
