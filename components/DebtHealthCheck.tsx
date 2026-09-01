'use client';

import { useState } from 'react';

export function DebtHealthCheck() {
  const [step, setStep] = useState(1);
  const [income, setIncome] = useState('');
  const [totalDebt, setTotalDebt] = useState('');
  const [monthlyEmi, setMonthlyEmi] = useState('');
  const [activeLoans, setActiveLoans] = useState('');

  const calculateScore = () => {
    const incomeNum = parseInt(income.replace(/\D/g, '')) || 0;
    const emiNum = parseInt(monthlyEmi.replace(/\D/g, '')) || 0;
    const dti = incomeNum > 0 ? Math.round((emiNum / incomeNum) * 100) : 0;
    
    setStep(2);
  };

  const dti = parseInt(income.replace(/\D/g, '')) > 0 ? Math.round((parseInt(monthlyEmi.replace(/\D/g, '')) / parseInt(income.replace(/\D/g, ''))) * 100) : 0;

  return (
    <section id="debt-health-check" className="py-24 bg-surface text-center">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <h2 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl mb-4">
          How expensive is your debt?
        </h2>
        <p className="text-lg text-ink-mute mb-12 max-w-2xl mx-auto">
          Get a free assessment of your debt pressure in 30 seconds. No PAN or bank details required.
        </p>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-ink/5 max-w-2xl mx-auto text-left">
          {step === 1 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Monthly Income</label>
                  <input
                    type="text"
                    placeholder="₹75,000"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="w-full rounded-lg border-ink/20 px-4 py-3 text-ink focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Total Outstanding Debt</label>
                  <input
                    type="text"
                    placeholder="₹8,20,000"
                    value={totalDebt}
                    onChange={(e) => setTotalDebt(e.target.value)}
                    className="w-full rounded-lg border-ink/20 px-4 py-3 text-ink focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Current Monthly EMI</label>
                  <input
                    type="text"
                    placeholder="₹38,500"
                    value={monthlyEmi}
                    onChange={(e) => setMonthlyEmi(e.target.value)}
                    className="w-full rounded-lg border-ink/20 px-4 py-3 text-ink focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Active Accounts</label>
                  <input
                    type="number"
                    placeholder="5"
                    value={activeLoans}
                    onChange={(e) => setActiveLoans(e.target.value)}
                    className="w-full rounded-lg border-ink/20 px-4 py-3 text-ink focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>
              <button
                onClick={calculateScore}
                className="w-full rounded-lg bg-primary px-4 py-4 text-base font-medium text-white hover:bg-primary-press transition-colors mt-4"
              >
                Calculate My Debt Score
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full mb-4">
                  HIGH PRESSURE
                </span>
                <h3 className="text-xl font-medium">Your Debt-to-Income Ratio is {dti}%</h3>
              </div>
              
              <div className="bg-surface rounded-lg p-6 mb-6">
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div className="text-ink-mute">Monthly income</div>
                  <div className="font-medium text-right">₹{income || '0'}</div>
                  <div className="text-ink-mute">Current EMI</div>
                  <div className="font-medium text-right text-red-600">₹{monthlyEmi || '0'}</div>
                  <div className="text-ink-mute">Total debt</div>
                  <div className="font-medium text-right">₹{totalDebt || '0'}</div>
                  <div className="text-ink-mute">Active accounts</div>
                  <div className="font-medium text-right">{activeLoans || '0'}</div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-sm text-red-800 mb-6">
                <strong>Potential issue:</strong> A large portion of your monthly income is currently going toward debt repayment.
              </div>
              
              <button
                onClick={() => alert("This would open the lead form")}
                className="w-full rounded-lg bg-primary px-4 py-4 text-base font-medium text-white hover:bg-primary-press transition-colors"
              >
                See My Potential Options
              </button>
              <button
                onClick={() => setStep(1)}
                className="w-full text-sm text-ink-mute hover:text-ink mt-2"
              >
                Recalculate
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
