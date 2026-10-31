import { calculateEMI } from "@/lib/calculator";

// One worked example, computed with the same formula as the calculators so its figures always agree.
// It is an illustration, not an offer: the new rate is an assumption and no processing fee is included.

export const EXAMPLE_DEBTS = [
  { name: "Credit card", balance: 150000, ratePercent: 36, months: 36 },
  { name: "Personal loan", balance: 300000, ratePercent: 18, months: 36 },
  { name: "App loan", balance: 50000, ratePercent: 30, months: 36 },
] as const;

export const EXAMPLE_NEW_RATE_PERCENT = 12;
export const EXAMPLE_NEW_MONTHS = 36;

export function getExampleScenario() {
  const debts = EXAMPLE_DEBTS.map((d) => ({ ...d, emi: calculateEMI(d.balance, d.ratePercent, d.months) }));
  const balance = debts.reduce((s, d) => s + d.balance, 0);
  const currentEmi = debts.reduce((s, d) => s + d.emi, 0);
  const currentPaid = debts.reduce((s, d) => s + d.emi * d.months, 0);
  const newEmi = calculateEMI(balance, EXAMPLE_NEW_RATE_PERCENT, EXAMPLE_NEW_MONTHS);
  const newPaid = newEmi * EXAMPLE_NEW_MONTHS;
  return {
    debts,
    balance,
    currentEmi,
    newEmi,
    monthlyDifference: currentEmi - newEmi,
    interestSaved: currentPaid - newPaid,
    newRatePercent: EXAMPLE_NEW_RATE_PERCENT,
    newMonths: EXAMPLE_NEW_MONTHS,
  };
}
