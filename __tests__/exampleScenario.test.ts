import { getExampleScenario } from '@/lib/exampleScenario';

describe('getExampleScenario', () => {
  const s = getExampleScenario();

  it('matches independently computed figures', () => {
    expect(s.balance).toBe(500000);
    expect(Math.round(s.currentEmi)).toBe(19839);
    expect(Math.round(s.newEmi)).toBe(16607);
    expect(Math.round(s.monthlyDifference)).toBe(3232);
    expect(Math.round(s.interestSaved)).toBe(116342);
  });

  it('shows three debts that add up to the headline numbers', () => {
    expect(s.debts).toHaveLength(3);
    expect(s.debts.reduce((a, d) => a + d.emi, 0)).toBeCloseTo(s.currentEmi, 8);
    expect(s.debts.reduce((a, d) => a + d.balance, 0)).toBe(s.balance);
  });
});
