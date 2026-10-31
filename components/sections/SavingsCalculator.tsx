"use client";

import { useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { Field, Input } from "@/components/ui/Field";
import { compareRefinance } from "@/lib/calculator";
import { claims } from "@/lib/config";
import { formatINR } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { ctas } from "@/content/site";

type Control = { key: "balance" | "rate" | "months" | "newRate"; label: string; min: number; max: number; step: number; unit: "₹" | "%" | "months"; hint?: string };

const CONTROLS: Control[] = [
  { key: "balance", label: "Total amount you owe", min: 50000, max: 5000000, step: 10000, unit: "₹", hint: "All the loans and card dues you want to compare." },
  { key: "rate", label: "Interest rate you pay now (% a year)", min: 6, max: 48, step: 0.5, unit: "%", hint: "Use your average rate if you have several debts." },
  { key: "months", label: "Months left to repay", min: 6, max: 120, step: 1, unit: "months" },
  { key: "newRate", label: "Rate you want to compare with (% a year)", min: 8, max: 30, step: 0.25, unit: "%", hint: "An example only. Your rate depends on the lender and your profile." },
];

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/** The one savings calculator. The current EMI is derived from the inputs, never typed in separately. */
export function SavingsCalculator() {
  const [v, setV] = useState({ balance: 500000, rate: 18, months: 36, newRate: 12 });
  const used = useRef(false);

  const r = compareRefinance({ balance: v.balance, currentRatePercent: v.rate, remainingMonths: v.months, newRatePercent: v.newRate, processingFeePercent: 1 });
  const saves = r.lifetimeSavings > 0;

  const update = (c: Control, raw: number) => {
    if (!used.current) {
      used.current = true;
      track("calculator_used", { calculator: "savings" });
    }
    setV((s) => ({ ...s, [c.key]: clamp(Number.isFinite(raw) ? raw : c.min, c.min, c.max) }));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <Card className="space-y-6 p-6 sm:p-8">
        {CONTROLS.map((c) => (
          <div key={c.key}>
            <Field label={c.label} hint={c.hint}>
              {(a11y) => (
                <div className="flex items-center gap-2">
                  {c.unit === "₹" ? <span className="text-ink-muted" aria-hidden="true">₹</span> : null}
                  <Input {...a11y} type="number" inputMode="decimal" min={c.min} max={c.max} step={c.step} value={v[c.key]} onChange={(e) => update(c, Number(e.target.value))} className="max-w-[10rem]" />
                  {c.unit !== "₹" ? <span className="text-ink-muted" aria-hidden="true">{c.unit}</span> : null}
                </div>
              )}
            </Field>
            <input
              type="range"
              aria-hidden="true"
              tabIndex={-1}
              min={c.min}
              max={c.max}
              step={c.step}
              value={v[c.key]}
              onChange={(e) => update(c, Number(e.target.value))}
              className="mt-3"
            />
          </div>
        ))}
      </Card>

      <Card tone="dark" className="flex flex-col justify-between p-6 sm:p-8" aria-live="polite">
        <div>
          <Badge className="bg-white/15 text-white">Illustrative estimate</Badge>
          <dl className="mt-6 space-y-5">
            <div>
              <dt className="text-sm text-white/80">Your EMI now</dt>
              <dd className="num text-2xl font-bold">{formatINR(Math.round(r.currentEMI))}</dd>
            </div>
            <div>
              <dt className="text-sm text-white/80">EMI at {v.newRate}% a year</dt>
              <dd className="num text-2xl font-bold">{formatINR(Math.round(r.newEMI))}</dd>
            </div>
            <div className="border-t border-white/20 pt-5">
              <dt className="text-sm text-white/80">Possible difference each month</dt>
              <dd className="num text-4xl font-bold">{r.monthlyDifference >= 0 ? "" : "−"}{formatINR(Math.abs(Math.round(r.monthlyDifference)))}</dd>
            </div>
            <div>
              <dt className="text-sm text-white/80">Total cost difference over the loan, after a 1% processing fee</dt>
              <dd className="num text-xl font-bold">{r.lifetimeSavings >= 0 ? "" : "−"}{formatINR(Math.abs(Math.round(r.lifetimeSavings)))}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 space-y-4">
          {r.lowerEmiButCostsMore ? (
            <Alert tone="info">At these numbers the EMI is lower but the total cost is higher, because the loan runs longer. Ask a specialist before choosing.</Alert>
          ) : !saves ? (
            <Alert tone="info">At these numbers a new loan would not save money. A specialist can check other options.</Alert>
          ) : null}
          <ButtonLink href="#get-started" variant="secondary" size="lg" className="w-full" onClick={() => track("cta_click", { location: "calculator", label: ctas.primary })}>
            {ctas.primary}
          </ButtonLink>
          <p className="text-sm leading-[22px] text-white/80">
            {claims.calculatorDisclaimer} The 1% processing fee and the comparison rate are assumptions; the lender sets the real terms.
          </p>
        </div>
      </Card>
      <Disclaimer className="lg:col-span-2">Same loan amount, compared at today’s rate and at the rate you choose, over the months left. It shows the formula, not an offer.</Disclaimer>
    </div>
  );
}
