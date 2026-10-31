// Pure EMI calculations - illustrative only
export function calculateEMI(principal: number, annualRatePercent: number, tenureMonths: number): number {
  if (principal <= 0 || tenureMonths <= 0) return 0;
  if (annualRatePercent <= 0) return principal / tenureMonths;
  const r = annualRatePercent / 12 / 100;
  const pow = Math.pow(1 + r, tenureMonths);
  if (pow === 1) return principal / tenureMonths;
  return (principal * r * pow) / (pow - 1);
}

export function calculateTotalRepayment(emi: number, tenureMonths: number): number {
  return emi * tenureMonths;
}

export type CalculatorInput = {
  existingLoanAmount: number;
  ccOutstanding: number;
  currentMonthlyEMI: number;
  currentRate: number;
  tenureMonths: number;
  illustrativeRate: number;
};

export type CalculatorOutput = {
  totalPrincipal: number;
  currentEMI: number;
  illustrativeEMI: number;
  monthlyDifference: number;
  currentTotalRepayment: number;
  illustrativeTotalRepayment: number;
};

export function getCalculatorOutput(input: CalculatorInput): CalculatorOutput {
  const totalPrincipal = input.existingLoanAmount + input.ccOutstanding;
  const illustrativeEMI = calculateEMI(totalPrincipal, input.illustrativeRate, input.tenureMonths);
  const currentTotalRepayment = input.currentMonthlyEMI * input.tenureMonths;
  const illustrativeTotalRepayment = calculateTotalRepayment(illustrativeEMI, input.tenureMonths);
  return {
    totalPrincipal,
    currentEMI: input.currentMonthlyEMI,
    illustrativeEMI,
    monthlyDifference: input.currentMonthlyEMI - illustrativeEMI,
    currentTotalRepayment,
    illustrativeTotalRepayment,
  };
}

export type DebtType = 'personal_loan' | 'credit_card' | 'app_loan' | 'overdraft' | 'other';

export type DebtItem = {
  id: string;
  name: string;
  type: DebtType;
  balance: number;
  interestRate: number;
  monthlyPayment: number;
  remainingMonths?: number;
};

export type MultiDebtConsolidationInput = {
  debts: DebtItem[];
  proposedRatePercent: number;
  proposedTenureMonths: number;
  processingFeePercent?: number;
};

export type MultiDebtConsolidationResult = {
  totalPrincipal: number;
  existingMonthlyOutflow: number;
  weightedAverageRate: number;
  proposedEMI: number;
  monthlyCashflowSavings: number;
  processingFeeAmount: number;
  existingTotalRepayment: number;
  proposedTotalRepayment: number;
  existingTotalInterest: number;
  proposedTotalInterest: number;
  lifetimeSavings: number;
  isExtendingTenureWithHigherInterest: boolean;
};

export function calculateWeightedAverageRate(debts: DebtItem[]): number {
  const totalBalance = debts.reduce((sum, d) => sum + Math.max(0, d.balance), 0);
  if (totalBalance <= 0) return 0;
  const weightedSum = debts.reduce((sum, d) => sum + (Math.max(0, d.balance) * Math.max(0, d.interestRate)), 0);
  return Number((weightedSum / totalBalance).toFixed(2));
}

export function calculateMultiDebtConsolidation(input: MultiDebtConsolidationInput): MultiDebtConsolidationResult {
  const { debts, proposedRatePercent, proposedTenureMonths, processingFeePercent = 1.0 } = input;
  
  const totalPrincipal = debts.reduce((acc, d) => acc + Math.max(0, d.balance), 0);
  const existingMonthlyOutflow = debts.reduce((acc, d) => acc + Math.max(0, d.monthlyPayment), 0);
  const weightedAverageRate = calculateWeightedAverageRate(debts);

  const proposedEMI = Math.round(calculateEMI(totalPrincipal, proposedRatePercent, proposedTenureMonths));
  const processingFeeAmount = Math.round((totalPrincipal * processingFeePercent) / 100);

  // Existing scenarios: either using specific remaining months per debt or proposed tenure as comparison baseline
  const existingTotalRepayment = debts.reduce((acc, d) => {
    const tenure = d.remainingMonths && d.remainingMonths > 0 ? d.remainingMonths : proposedTenureMonths;
    return acc + (d.monthlyPayment * tenure);
  }, 0);

  const existingTotalInterest = Math.max(0, existingTotalRepayment - totalPrincipal);

  const proposedTotalRepayment = (proposedEMI * proposedTenureMonths) + processingFeeAmount;
  const proposedTotalInterest = Math.max(0, (proposedEMI * proposedTenureMonths) - totalPrincipal);

  const monthlyCashflowSavings = existingMonthlyOutflow - proposedEMI;
  const lifetimeSavings = existingTotalRepayment - proposedTotalRepayment;

  const isExtendingTenureWithHigherInterest = 
    monthlyCashflowSavings > 0 && proposedTotalInterest > existingTotalInterest;

  return {
    totalPrincipal,
    existingMonthlyOutflow,
    weightedAverageRate,
    proposedEMI,
    monthlyCashflowSavings,
    processingFeeAmount,
    existingTotalRepayment,
    proposedTotalRepayment,
    existingTotalInterest,
    proposedTotalInterest,
    lifetimeSavings,
    isExtendingTenureWithHigherInterest,
  };
}


export type RefinanceInput = {
  /** Outstanding balance being refinanced. */
  balance: number;
  /** Annual rate on the existing debt, in percent. */
  currentRatePercent: number;
  /** Months left on the existing debt. */
  remainingMonths: number;
  /** Illustrative annual rate on the new loan, in percent. */
  newRatePercent: number;
  /** Tenure of the new loan; defaults to the remaining months. */
  newTenureMonths?: number;
  processingFeePercent?: number;
};

export type RefinanceResult = {
  currentEMI: number;
  newEMI: number;
  monthlyDifference: number;
  currentTotalRepayment: number;
  newTotalRepayment: number;
  processingFee: number;
  currentInterest: number;
  newInterest: number;
  /** Positive = cheaper overall after the fee; negative = costs more overall. */
  lifetimeSavings: number;
  /** True when a longer tenure lowers the EMI but the total cost goes up. */
  lowerEmiButCostsMore: boolean;
};

const ZERO_REFINANCE: RefinanceResult = {
  currentEMI: 0, newEMI: 0, monthlyDifference: 0, currentTotalRepayment: 0, newTotalRepayment: 0,
  processingFee: 0, currentInterest: 0, newInterest: 0, lifetimeSavings: 0, lowerEmiButCostsMore: false,
};

/**
 * Compares the same balance at the current rate and at a new rate, on consistent terms.
 * The current EMI is derived from the balance, rate and remaining tenure, never typed in
 * separately, so the result cannot claim more than the inputs support. Illustrative only.
 */
export function compareRefinance(input: RefinanceInput): RefinanceResult {
  const { balance, currentRatePercent, remainingMonths, newRatePercent, processingFeePercent = 0 } = input;
  const newTenure = input.newTenureMonths ?? remainingMonths;
  if (!(balance > 0) || !(remainingMonths > 0) || !(newTenure > 0)) return { ...ZERO_REFINANCE };

  const currentEMI = calculateEMI(balance, currentRatePercent, remainingMonths);
  const newEMI = calculateEMI(balance, newRatePercent, newTenure);
  const processingFee = (balance * Math.max(0, processingFeePercent)) / 100;
  const currentTotalRepayment = currentEMI * remainingMonths;
  const newTotalRepayment = newEMI * newTenure + processingFee;
  const monthlyDifference = currentEMI - newEMI;
  const lifetimeSavings = currentTotalRepayment - newTotalRepayment;

  return {
    currentEMI,
    newEMI,
    monthlyDifference,
    currentTotalRepayment,
    newTotalRepayment,
    processingFee,
    currentInterest: currentTotalRepayment - balance,
    newInterest: newEMI * newTenure - balance,
    lifetimeSavings,
    lowerEmiButCostsMore: monthlyDifference > 0 && lifetimeSavings < 0,
  };
}
