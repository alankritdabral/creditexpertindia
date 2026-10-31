import {
  calculateEMI,
  calculateTotalRepayment,
  calculateWeightedAverageRate,
  calculateMultiDebtConsolidation,
  compareRefinance,
  getCalculatorOutput,
  DebtItem,
} from '@/lib/calculator';

// Reference values were computed independently with the standard amortisation formula
// EMI = P * i * (1+i)^n / ((1+i)^n - 1), where i = annual rate / 12 / 100.

describe('calculateEMI', () => {
  it.each([
    [500000, 10.5, 60, 10746.95],
    [650000, 18, 60, 16505.73],
    [650000, 10.5, 60, 13971.04],
    [100000, 12, 12, 8884.88],
    [1200000, 9.95, 84, 19890.43],
  ])('EMI for %d at %d%% over %d months is about %d', (p, r, n, expected) => {
    expect(calculateEMI(p, r, n)).toBeCloseTo(expected, 1);
  });

  it('divides evenly when the rate is zero', () => {
    expect(calculateEMI(300000, 0, 36)).toBeCloseTo(8333.33, 2);
  });

  it('returns 0 for a non-positive principal or tenure', () => {
    expect(calculateEMI(0, 10, 12)).toBe(0);
    expect(calculateEMI(-5, 10, 12)).toBe(0);
    expect(calculateEMI(100000, 10, 0)).toBe(0);
  });

  it('total repayment is EMI times tenure and exceeds principal when rate > 0', () => {
    const emi = calculateEMI(500000, 10.5, 60);
    expect(calculateTotalRepayment(emi, 60)).toBeCloseTo(644817.01, 0);
    expect(calculateTotalRepayment(emi, 60)).toBeGreaterThan(500000);
  });

  it('a higher rate or longer tenure never lowers total cost', () => {
    const base = calculateEMI(500000, 10, 48) * 48;
    expect(calculateEMI(500000, 12, 48) * 48).toBeGreaterThan(base);
    expect(calculateEMI(500000, 10, 60) * 60).toBeGreaterThan(base);
  });
});

describe('compareRefinance', () => {
  it('derives the current EMI from balance, rate and tenure (the old calculator typed it in)', () => {
    const r = compareRefinance({ balance: 650000, currentRatePercent: 18, remainingMonths: 60, newRatePercent: 10.5 });
    expect(r.currentEMI).toBeCloseTo(16505.73, 1);
    expect(r.newEMI).toBeCloseTo(13971.04, 1);
    // Honest saving is about 2,535 a month; the old UI showed 21,029 for this scenario.
    expect(r.monthlyDifference).toBeCloseTo(2534.69, 1);
    expect(r.lifetimeSavings).toBeCloseTo(152081.56, 0);
    expect(r.lowerEmiButCostsMore).toBe(false);
  });

  it('subtracts the processing fee from lifetime savings but not from the EMI', () => {
    const base = compareRefinance({ balance: 650000, currentRatePercent: 18, remainingMonths: 60, newRatePercent: 10.5 });
    const withFee = compareRefinance({ balance: 650000, currentRatePercent: 18, remainingMonths: 60, newRatePercent: 10.5, processingFeePercent: 1 });
    expect(withFee.processingFee).toBeCloseTo(6500, 5);
    expect(withFee.newEMI).toBeCloseTo(base.newEMI, 8);
    expect(base.lifetimeSavings - withFee.lifetimeSavings).toBeCloseTo(6500, 5);
  });

  it('shows no saving when nothing changes', () => {
    const r = compareRefinance({ balance: 400000, currentRatePercent: 12, remainingMonths: 36, newRatePercent: 12 });
    expect(r.monthlyDifference).toBeCloseTo(0, 8);
    expect(r.lifetimeSavings).toBeCloseTo(0, 6);
  });

  it('flags a lower EMI that costs more overall when the tenure is stretched', () => {
    const r = compareRefinance({ balance: 500000, currentRatePercent: 12, remainingMonths: 24, newRatePercent: 11, newTenureMonths: 72 });
    expect(r.monthlyDifference).toBeGreaterThan(0);
    expect(r.lifetimeSavings).toBeLessThan(0);
    expect(r.lowerEmiButCostsMore).toBe(true);
  });

  it('returns zeros for unusable input instead of NaN or Infinity', () => {
    for (const bad of [
      { balance: 0, currentRatePercent: 12, remainingMonths: 12, newRatePercent: 10 },
      { balance: 100000, currentRatePercent: 12, remainingMonths: 0, newRatePercent: 10 },
      { balance: -1, currentRatePercent: 12, remainingMonths: 12, newRatePercent: 10 },
    ]) {
      const r = compareRefinance(bad);
      expect(Object.values(r).every((v) => v === 0 || v === false)).toBe(true);
    }
  });
});

describe('calculateMultiDebtConsolidation', () => {
  const debts: DebtItem[] = [
    { id: 'a', name: 'Personal loan', type: 'personal_loan', balance: 400000, interestRate: 18, monthlyPayment: 14000, remainingMonths: 36 },
    { id: 'b', name: 'Credit card', type: 'credit_card', balance: 150000, interestRate: 36, monthlyPayment: 9000, remainingMonths: 24 },
  ];

  it('matches hand-computed totals', () => {
    const r = calculateMultiDebtConsolidation({ debts, proposedRatePercent: 12, proposedTenureMonths: 48, processingFeePercent: 1 });
    expect(r.totalPrincipal).toBe(550000);
    expect(r.weightedAverageRate).toBe(22.91);
    expect(r.existingMonthlyOutflow).toBe(23000);
    expect(r.proposedEMI).toBe(14484);
    expect(r.processingFeeAmount).toBe(5500);
    expect(r.monthlyCashflowSavings).toBe(8516);
    expect(r.existingTotalRepayment).toBe(720000);
    expect(r.proposedTotalRepayment).toBe(700732);
    expect(r.lifetimeSavings).toBe(19268);
  });

  it('warns when cash flow improves only because interest rises', () => {
    const r = calculateMultiDebtConsolidation({
      debts: [{ id: 'x', name: 'Loan', type: 'personal_loan', balance: 200000, interestRate: 12, monthlyPayment: 9000, remainingMonths: 24 }],
      proposedRatePercent: 12,
      proposedTenureMonths: 84,
      processingFeePercent: 0,
    });
    expect(r.monthlyCashflowSavings).toBeGreaterThan(0);
    expect(r.isExtendingTenureWithHigherInterest).toBe(true);
  });

  it('handles an empty debt list without NaN', () => {
    const r = calculateMultiDebtConsolidation({ debts: [], proposedRatePercent: 10, proposedTenureMonths: 36 });
    expect(r.totalPrincipal).toBe(0);
    expect(r.proposedEMI).toBe(0);
    expect(Number.isNaN(r.weightedAverageRate)).toBe(false);
  });

  it('weighted average rate ignores negative balances and rates', () => {
    expect(calculateWeightedAverageRate([
      { id: '1', name: 'a', type: 'other', balance: -100, interestRate: 50, monthlyPayment: 0 },
      { id: '2', name: 'b', type: 'other', balance: 100000, interestRate: 10, monthlyPayment: 0 },
    ])).toBe(10);
  });
});

describe('getCalculatorOutput (legacy)', () => {
  it('sums principal and uses the supplied EMI as given', () => {
    const o = getCalculatorOutput({ existingLoanAmount: 500000, ccOutstanding: 150000, currentMonthlyEMI: 35000, currentRate: 18, tenureMonths: 60, illustrativeRate: 10.5 });
    expect(o.totalPrincipal).toBe(650000);
    expect(o.illustrativeEMI).toBeCloseTo(13971.04, 1);
    // Documents the flaw that compareRefinance fixes: a typed-in EMI inflates the "saving".
    expect(o.monthlyDifference).toBeCloseTo(21028.96, 1);
  });
});
