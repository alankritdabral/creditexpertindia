"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { AnimatedNumber } from "./ui/AnimatedNumber";

type Stat = { id: string; value: number; format: (n: number) => string; description: string };

// Figures come from the partner-lender data in lib/lenderEngine.ts (13 lenders, max amount and tenure).
const STATS: Stat[] = [
  { id: "lenders", value: 13, format: (n) => String(Math.round(n)), description: "partner banks and NBFCs compared in one place" },
  { id: "debts", value: 5, format: (n) => String(Math.round(n)), description: "kinds of debt you can bring into one EMI" },
  { id: "amount", value: 1, format: (n) => "₹" + Math.round(n) + " Cr", description: "maximum loan amount from select partner lenders*" },
  { id: "tenure", value: 84, format: (n) => String(Math.round(n)), description: "months of maximum repayment tenure*" },
];

/* ---------- Particle formations ---------- */

const TRANSITION_S = 1.1;
const STAGGER = 0.35;
const POINTER_RADIUS = 280; // px around the cursor where lines lean toward it
const POINTER_PULL = 72; // max tip displacement in px

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Each particle is a line from (x, y) to (x2, y2) with a dot on the tip, plus an alpha. Writes into `out`.
type Formation = (i: number, n: number, t: number, w: number, h: number, r: Float32Array, out: Float32Array) => void;

const FORMATIONS: Formation[] = [
  // 0: fan of rays rising from the bottom centre
  (i, n, t, w, h, r, out) => {
    const k = i * 3;
    const th = -Math.PI / 2 + (r[k] - 0.5) * Math.PI * 0.86 + Math.sin(t * 0.5 + r[k] * 6) * 0.012;
    const len = h * (0.28 + 0.62 * Math.pow(r[k + 1], 0.8));
    const base = 30 + r[k + 2] * 70;
    const cx = w / 2;
    out[0] = cx + Math.cos(th) * base;
    out[1] = h + 14 + Math.sin(th) * base;
    out[2] = cx + Math.cos(th) * (base + len);
    out[3] = h + 14 + Math.sin(th) * (base + len);
    out[4] = (0.35 + 0.65 * r[k + 2]) * (0.82 + 0.18 * Math.sin(t * 1.2 + r[k + 1] * 9));
  },
  // 1: streams from both sides funnelling into one point
  (i, n, t, w, h, r, out) => {
    const k = i * 3;
    const stream = i % 6;
    const side = stream < 3 ? -1 : 1;
    const lane = stream % 3;
    const cx = w / 2;
    const oy = (r[k + 1] - 0.5) * h * 0.11;
    const x0 = cx + side * w * 0.47;
    const y0 = h * (0.08 + 0.2 * lane) + oy;
    const p1x = cx + side * w * 0.26;
    const p2x = cx + side * w * 0.1;
    const p2y = h * 0.96;
    const x3 = cx + side * 4;
    const y3 = h + 10;
    const u = (r[k] + t * 0.05) % 1;
    const m = 1 - u;
    const bx = m * m * m * x0 + 3 * m * m * u * p1x + 3 * m * u * u * p2x + u * u * u * x3;
    const by = m * m * m * y0 + 3 * m * m * u * y0 + 3 * m * u * u * p2y + u * u * u * y3;
    const dx = 3 * m * m * (p1x - x0) + 6 * m * u * (p2x - p1x) + 3 * u * u * (x3 - p2x);
    const dy = 3 * m * m * 0 + 6 * m * u * (p2y - y0) + 3 * u * u * (y3 - p2y);
    const dl = Math.hypot(dx, dy) || 1;
    const seg = 18 + 34 * r[k + 2];
    out[0] = bx - (dx / dl) * seg;
    out[1] = by - (dy / dl) * seg;
    out[2] = bx;
    out[3] = by;
    out[4] = Math.pow(Math.sin(Math.PI * u), 0.6) * (0.4 + 0.6 * r[k + 2]);
  },
  // 2: columns that climb from left to right, like a growing loan amount
  (i, n, t, w, h, r, out) => {
    const k = i * 3;
    const s = i / (n - 1);
    const x = w / 2 + (s - 0.5) * w * 0.82;
    const height = (h * 0.06 + Math.pow(s, 1.6) * h * 0.8) * (0.93 + 0.07 * Math.sin(t * 1.5 + i * 0.3)) + r[k + 1] * h * 0.05;
    out[0] = x;
    out[1] = h + 4;
    out[2] = x;
    out[3] = h - height;
    out[4] = 0.45 + 0.55 * r[k + 2];
  },
  // 3: a slowly turning spiral of ticks, like a repayment timeline
  (i, n, t, w, h, r, out) => {
    const k = i * 3;
    const s = i / n;
    const phi = s * 2.2 * Math.PI * 2 + t * 0.25;
    const rx = Math.min(w * 0.34, 480);
    const ry = h * 0.13;
    const depth = 0.5 + 0.5 * Math.sin(phi);
    const x = w / 2 + Math.cos(phi) * rx;
    const y = h * 0.5 + Math.sin(phi) * ry + (s - 0.5) * h * 0.28;
    out[0] = x;
    out[1] = y + h * 0.34 * (0.35 + 0.65 * depth);
    out[2] = x;
    out[3] = y;
    out[4] = (0.22 + 0.78 * depth) * (0.8 + 0.2 * r[k + 2]);
  },
];

function createEngine(canvas: HTMLCanvasElement, count: number, animated: boolean, dprCap: number) {
  const ctx = canvas.getContext("2d");
  const rnd = mulberry32(7);
  const rand = new Float32Array(count * 3).map(() => rnd());
  const delay = new Float32Array(count).map(() => rnd() * STAGGER);
  const from = new Float32Array(count * 5);
  const shown = new Float32Array(count * 5);
  const tgt = new Float32Array(5);
  let w = 0;
  let h = 0;
  let scene = 0;
  let sceneStart = -10;
  let raf = 0;
  let running = false;
  let lastNow = 0;
  // Pointer influence: position and strength are eased so lines glide toward the cursor and relax back.
  let px = 0;
  let py = 0;
  let ps = 0;
  let tx = 0;
  let ty = 0;
  let ts = 0;

  const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

  const render = (now: number) => {
    if (!ctx || !w) return;
    const dt = Math.min(0.05, Math.max(0, (now - lastNow) / 1000));
    lastNow = now;
    px += (tx - px) * (1 - Math.exp(-dt * 12));
    py += (ty - py) * (1 - Math.exp(-dt * 12));
    ps += (ts - ps) * (1 - Math.exp(-dt * 5));
    const pull = animated ? ps : 0;
    const t = animated ? now / 1000 : 0;
    const p = animated ? (now / 1000 - sceneStart) / TRANSITION_S : 10;
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#0066FF";
    ctx.fillStyle = "#0052CC";
    for (let i = 0; i < count; i++) {
      FORMATIONS[scene](i, count, t, w, h, rand, tgt);
      const j = i * 5;
      const e = p >= 1 + STAGGER ? 1 : ease(Math.min(1, Math.max(0, (p - delay[i]) / (1 - STAGGER))));
      for (let c = 0; c < 5; c++) shown[j + c] = e >= 1 ? tgt[c] : from[j + c] + (tgt[c] - from[j + c]) * e;
      let a = shown[j + 4];
      if (a < 0.02) continue;
      let x1 = shown[j];
      let y1 = shown[j + 1];
      let x2 = shown[j + 2];
      let y2 = shown[j + 3];
      if (pull > 0.001) {
        const dx = px - x2;
        const dy = py - y2;
        const d = Math.hypot(dx, dy);
        if (d < POINTER_RADIUS && d > 0.5) {
          const f = Math.pow(1 - d / POINTER_RADIUS, 2) * POINTER_PULL * pull;
          x2 += (dx / d) * f;
          y2 += (dy / d) * f;
          x1 += (dx / d) * f * 0.2;
          y1 += (dy / d) * f * 0.2;
          a = Math.min(1, a + (f / POINTER_PULL) * 0.5); // lines near the cursor glow brighter
        }
      }
      ctx.globalAlpha = a * 0.6;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.globalAlpha = Math.min(1, a * 1.25);
      ctx.beginPath();
      ctx.arc(x2, y2, 1.2 + 1.4 * rand[i * 3 + 2], 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  const loop = (now: number) => {
    render(now);
    raf = requestAnimationFrame(loop);
  };

  return {
    resize(width: number, height: number) {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      w = width;
      h = height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      render(performance.now());
    },
    setScene(next: number, first = false) {
      if (next === scene && !first) return;
      from.set(shown); // continue from wherever the particles are right now, so switching mid-morph stays smooth
      scene = next;
      sceneStart = first ? -10 : performance.now() / 1000;
      if (!running) render(performance.now());
    },
    pointer(x: number, y: number) {
      if (ts === 0) {
        px = x;
        py = y;
      }
      tx = x;
      ty = y;
      ts = 1;
    },
    pointerLeave() {
      ts = 0;
    },
    start() {
      if (!animated || running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
  };
}

type Engine = ReturnType<typeof createEngine>;

function isConstrained() {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  return nav.connection?.saveData === true || (nav.deviceMemory !== undefined && nav.deviceMemory < 4) || (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency < 4);
}

/* ---------- Section ---------- */

export function NetworkStats() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null); // the indicator follows the pointer, then returns to the active stat
  const [interacted, setInteracted] = useState(false); // count-up only after a click, so SSR and first paint match
  const reduceMotion = useReducedMotion() === true;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const activeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const lean = isConstrained();
    const engine = createEngine(canvas, lean ? 90 : 170, !reduceMotion, lean ? 1 : 2);
    engineRef.current = engine;
    engine.setScene(activeRef.current, true);
    const ro = new ResizeObserver(([entry]) => engine.resize(entry.contentRect.width, entry.contentRect.height));
    ro.observe(wrap);
    // Only run the frame loop while the section is on screen.
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = canvas.getBoundingClientRect();
      engine.pointer(e.clientX - r.left, e.clientY - r.top);
    };
    const onLeave = () => engine.pointerLeave();
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? engine.start() : engine.stop()), { threshold: 0.05 });
    io.observe(wrap);
    return () => {
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      engine.stop();
      engineRef.current = null;
    };
  }, [reduceMotion]);

  const select = (i: number) => {
    activeRef.current = i;
    setActive(i);
    setInteracted(true);
    engineRef.current?.setScene(i);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#F8FAFC]">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(1500px_1000px_at_50%_calc(100%+60px),#0066FF_1%,#60A5FA_16%,#BFDBFE_34%,#EAF3FF_47%,#F8FAFC_62%)] opacity-90"
      />

      <div className="relative max-w-[1220px] mx-auto ">
        <h2 className="mx-auto max-w-[20ch] text-center text-[36px] sm:text-[52px] leading-[1.05] tracking-[-0.03em] font-semibold text-[#0A2540] px-4 pt-16 pb-12 md:pt-24 md:pb-16">
          The backbone of smarter debt repayment
        </h2>

        <div onMouseLeave={() => setHovered(null)} className="relative grid grid-cols-2 lg:grid-cols-4 border-y border-[#C9D8F2] bg-[#F8FAFC]/60 backdrop-blur-[2px]">
          {/* Active indicator: a glowing hairline that slides to the selected column (desktop) */}
          {[0, 1].map((edge) => (
            <span
              key={edge}
              aria-hidden
              className={`hidden lg:block absolute left-0 w-1/4 h-px bg-[linear-gradient(90deg,transparent,#0052CC_50%,transparent)] transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none ${edge === 0 ? "-top-px" : "-bottom-px"}`}
              style={{ transform: `translateX(${(hovered ?? active) * 100}%)` }}
            />
          ))}

          {STATS.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => select(i)}
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                className={`group flex flex-col items-center gap-2 px-4 py-8 md:py-10 text-center cursor-pointer transition-colors duration-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#0052CC] max-lg:border-[#C9D8F2] ${i % 2 === 0 ? "max-lg:border-r" : ""} ${i < 2 ? "max-lg:border-b" : ""} ${isActive ? "text-[#0A2540] max-lg:bg-[#0052CC]/[0.06]" : "text-[#7A8BA6] hover:text-[#4A5C78]"}`}
              >
                <span className="text-[34px] md:text-[48px] leading-none tracking-[-0.03em] font-medium tabular-nums">
                  <AnimatedNumber
                    key={isActive ? "on" : "off"}
                    value={s.value}
                    from={isActive && interacted && !reduceMotion ? 0 : undefined}
                    format={s.format}
                    instant={reduceMotion}
                  />
                </span>
                <span className="max-w-[220px] text-sm md:text-base leading-snug text-balance">{s.description}</span>
              </button>
            );
          })}
        </div>

        <div ref={wrapRef} className="relative h-[300px] sm:h-[400px] lg:h-[520px]">
          <canvas ref={canvasRef} aria-hidden className="absolute inset-0 w-full h-full" />
        </div>
      </div>

      <p className="relative max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 pt-3 pb-6 text-sm text-[#0A2540]/80">
        *Subject to lender policy, your credit profile and eligibility. Figures are maximums, not guaranteed offers.
      </p>
    </section>
  );
}
