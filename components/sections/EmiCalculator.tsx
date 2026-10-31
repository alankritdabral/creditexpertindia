"use client";

import { useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { calculateEMI } from "@/lib/calculator";
import { claims } from "@/lib/config";
import { formatINR } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { ctas } from "@/content/site";

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, Number.isFinite(n) ? n : min));

/** Plain EMI calculator for new-loan visitors: amount, rate and tenure in, EMI and total interest out. */
export function EmiCalculator() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(12);
  const [months, setMonths] = useState(36);
  const used = useRef(false);
  const touch = () => {
    if (!used.current) {
      used.current = true;
      track("calculator_used", { calculator: "emi" });
    }
  };

  const emi = calculateEMI(amount, rate, months);
  const total = emi * months;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <Card className="space-y-6 p-6 sm:p-8">
        <Field label="Loan amount">
          {(a) => <div className="flex items-center gap-2"><span aria-hidden="true" className="text-ink-muted">₹</span><Input {...a} type="number" inputMode="numeric" min={50000} max={5000000} step={10000} value={amount} onChange={(e) => { touch(); setAmount(clamp(Number(e.target.value), 50000, 5000000)); }} className="max-w-[10rem]" /></div>}
        </Field>
        <Field label="Interest rate (% a year)" hint="An example only. Your rate depends on the lender and your profile.">
          {(a) => <div className="flex items-center gap-2"><Input {...a} type="number" inputMode="decimal" min={6} max={36} step={0.25} value={rate} onChange={(e) => { touch(); setRate(clamp(Number(e.target.value), 6, 36)); }} className="max-w-[10rem]" /><span aria-hidden="true" className="text-ink-muted">%</span></div>}
        </Field>
        <Field label="Tenure (months)">
          {(a) => <div className="flex items-center gap-2"><Input {...a} type="number" inputMode="numeric" min={6} max={84} step={1} value={months} onChange={(e) => { touch(); setMonths(clamp(Number(e.target.value), 6, 84)); }} className="max-w-[10rem]" /><span aria-hidden="true" className="text-ink-muted">months</span></div>}
        </Field>
      </Card>
      <Card tone="dark" className="flex flex-col justify-between p-6 sm:p-8" aria-live="polite">
        <div>
          <Badge className="bg-white/15 text-white">Illustrative estimate</Badge>
          <dl className="mt-6 space-y-5">
            <div><dt className="text-sm text-white/80">Monthly EMI</dt><dd className="num text-4xl font-bold">{formatINR(Math.round(emi))}</dd></div>
            <div><dt className="text-sm text-white/80">Total interest over {months} months</dt><dd className="num text-2xl font-bold">{formatINR(Math.round(total - amount))}</dd></div>
            <div><dt className="text-sm text-white/80">Total you would repay</dt><dd className="num text-2xl font-bold">{formatINR(Math.round(total))}</dd></div>
          </dl>
        </div>
        <div className="mt-6 space-y-4">
          <ButtonLink href="#get-started" variant="secondary" size="lg" className="w-full">{ctas.primary}</ButtonLink>
          <p className="text-sm leading-[22px] text-white/80">{claims.calculatorDisclaimer} Processing fees and taxes are not included.</p>
        </div>
      </Card>
    </div>
  );
}
