"use client";

import React, { useState, useMemo } from "react";
import { Plus, Trash2, CheckCircle2, AlertTriangle, ArrowRight, TrendingDown, ShieldCheck, Sparkles, RefreshCw, Calculator, HelpCircle, Phone, Lock } from "lucide-react";
import { DebtItem, DebtType, calculateMultiDebtConsolidation } from "@/lib/calculator";
import { formatINR } from "@/lib/utils";
import { claims } from "@/lib/config";

const DEBT_TYPE_LABELS: Record<DebtType, string> = {
  personal_loan: "Personal Loan",
  credit_card: "Credit Card Dues",
  app_loan: "Instant App / Fintech Loan",
  overdraft: "Bank Overdraft / OD",
  other: "Other Loan / BNPL",
};

const PRESET_SCENARIOS: { name: string; description: string; debts: DebtItem[] }[] = [
  {
    name: "Credit Cards + Personal Loan",
    description: "High-rate revolving credit card dues combined with a standard bank loan",
    debts: [
      { id: "1", name: "HDFC Regalia Credit Card", type: "credit_card", balance: 180000, interestRate: 42, monthlyPayment: 16000, remainingMonths: 24 },
      { id: "2", name: "ICICI Bank Personal Loan", type: "personal_loan", balance: 350000, interestRate: 16.5, monthlyPayment: 12500, remainingMonths: 36 },
      { id: "3", name: "SBI SimplyClick Card", type: "credit_card", balance: 95000, interestRate: 40, monthlyPayment: 8500, remainingMonths: 18 },
    ],
  },
  {
    name: "Instant App Loans + Short Term",
    description: "Multiple fintech apps with high daily/monthly charges",
    debts: [
      { id: "1", name: "Fintech App Loan A", type: "app_loan", balance: 85000, interestRate: 36, monthlyPayment: 9200, remainingMonths: 12 },
      { id: "2", name: "Salary Advance App B", type: "app_loan", balance: 65000, interestRate: 45, monthlyPayment: 8100, remainingMonths: 10 },
      { id: "3", name: "Consumer Durable EMI", type: "other", balance: 50000, interestRate: 24, monthlyPayment: 5300, remainingMonths: 12 },
    ],
  },
  {
    name: "3 High-Rate Personal Loans",
    description: "Scattered due dates and stacked monthly installments",
    debts: [
      { id: "1", name: "Personal Loan 1", type: "personal_loan", balance: 400000, interestRate: 18, monthlyPayment: 14500, remainingMonths: 36 },
      { id: "2", name: "Personal Loan 2", type: "personal_loan", balance: 250000, interestRate: 17.5, monthlyPayment: 9200, remainingMonths: 36 },
      { id: "3", name: "Credit Line Balance", type: "overdraft", balance: 150000, interestRate: 22, monthlyPayment: 7800, remainingMonths: 24 },
    ],
  },
];

export function DebtConsolidationCalculator() {
  const [debts, setDebts] = useState<DebtItem[]>(PRESET_SCENARIOS[0].debts);
  const [proposedRate, setProposedRate] = useState<number>(10.5);
  const [proposedTenure, setProposedTenure] = useState<number>(48);
  const [processingFeePercent, setProcessingFeePercent] = useState<number>(1.0);

  // Lead modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    netSalary: "",
    city: "",
    consent: true,
  });
  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [leadError, setLeadError] = useState("");

  // Live calculations
  const result = useMemo(() => {
    return calculateMultiDebtConsolidation({
      debts,
      proposedRatePercent: proposedRate,
      proposedTenureMonths: proposedTenure,
      processingFeePercent,
    });
  }, [debts, proposedRate, proposedTenure, processingFeePercent]);

  // Debt list mutations
  const handleAddDebt = () => {
    const newDebt: DebtItem = {
      id: Date.now().toString(),
      name: `Loan / Card #${debts.length + 1}`,
      type: "personal_loan",
      balance: 100000,
      interestRate: 18,
      monthlyPayment: 3600,
      remainingMonths: 36,
    };
    setDebts([...debts, newDebt]);
  };

  const handleUpdateDebt = (id: string, field: keyof DebtItem, value: any) => {
    setDebts(debts.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const handleRemoveDebt = (id: string) => {
    if (debts.length <= 1) return;
    setDebts(debts.filter(d => d.id !== id));
  };

  const handleApplyPreset = (presetDebts: DebtItem[]) => {
    setDebts(presetDebts);
  };

  // Lead submission
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone || !leadForm.netSalary) {
      setLeadError("Please complete all required fields.");
      setLeadStatus("error");
      return;
    }

    const salary = Number(leadForm.netSalary);
    if (isNaN(salary) || salary <= 25000) {
      setLeadError("Monthly take-home salary must be greater than ₹25,000 for eligibility.");
      setLeadStatus("error");
      return;
    }

    setLeadStatus("loading");
    setLeadError("");

    try {
      const payload = {
        name: leadForm.name,
        phone: leadForm.phone,
        city: leadForm.city,
        netSalary: salary,
        totalDebt: result.totalPrincipal,
        currentMonthlyEMI: result.existingMonthlyOutflow,
        estimatedNewEMI: result.proposedEMI,
        estimatedMonthlySavings: result.monthlyCashflowSavings,
        debtsCount: debts.length,
        debtsSummary: debts.map(d => `${d.name} (${DEBT_TYPE_LABELS[d.type]}): ${formatINR(d.balance)} @ ${d.interestRate}%`).join("; "),
        consent: leadForm.consent,
      };

      const res = await fetch("/api/calculator-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to submit assessment request.");
      }

      setLeadStatus("success");
    } catch (err: any) {
      setLeadError(err.message || "Something went wrong. Please try again.");
      setLeadStatus("error");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-10">
      
      {/* Preset Scenario Selector */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
            Quick Start Scenarios
          </span>
          <p className="text-sm text-slate-600">
            Select a sample debt profile or customize the numbers below to match your loans:
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {PRESET_SCENARIOS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(preset.debts)}
              className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
            >
              {preset.name}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setDebts([
              { id: "1", name: "Credit Card Dues", type: "credit_card", balance: 200000, interestRate: 40, monthlyPayment: 15000, remainingMonths: 24 }
            ])}
            className="text-xs font-semibold px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-500 border border-dashed border-slate-300 transition-colors cursor-pointer"
          >
            Clear / Start Fresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Input Debt Obligations (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Step 1: Your Active Debts & EMIs</h2>
                <p className="text-xs text-slate-500 mt-0.5">Add all your current personal loans, credit card balances, and app loans</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                {debts.length} {debts.length === 1 ? "Obligation" : "Obligations"}
              </span>
            </div>

            {/* Debt Cards List */}
            <div className="space-y-4">
              {debts.map((debt, index) => (
                <div 
                  key={debt.id} 
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-3 relative group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold shrink-0">
                        {index + 1}
                      </span>
                      <input
                        type="text"
                        value={debt.name}
                        onChange={(e) => handleUpdateDebt(debt.id, "name", e.target.value)}
                        placeholder="e.g. HDFC Personal Loan, SBI Card"
                        className="text-sm font-semibold bg-transparent border-b border-dashed border-slate-300 focus:border-blue-600 outline-none px-1 py-0.5 w-full max-w-[220px] text-slate-900"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <select
                        value={debt.type}
                        onChange={(e) => handleUpdateDebt(debt.id, "type", e.target.value as DebtType)}
                        className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 outline-none"
                      >
                        {Object.entries(DEBT_TYPE_LABELS).map(([val, label]) => (
                          <option key={val} value={val}>{label}</option>
                        ))}
                      </select>

                      {debts.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveDebt(debt.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Remove obligation"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Inputs for this debt */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                        Outstanding Balance
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">₹</span>
                        <input
                          type="number"
                          value={debt.balance || ""}
                          onChange={(e) => handleUpdateDebt(debt.id, "balance", Math.max(0, Number(e.target.value)))}
                          className="w-full text-xs font-bold bg-white border border-slate-200 rounded-xl pl-7 pr-3 py-2 text-slate-900 focus:border-blue-600 outline-none"
                          placeholder="150000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                        Interest Rate (p.a.)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.5"
                          value={debt.interestRate || ""}
                          onChange={(e) => handleUpdateDebt(debt.id, "interestRate", Math.max(0, Number(e.target.value)))}
                          className="w-full text-xs font-bold bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:border-blue-600 outline-none"
                          placeholder="18"
                        />
                        <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                        Current Monthly EMI
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">₹</span>
                        <input
                          type="number"
                          value={debt.monthlyPayment || ""}
                          onChange={(e) => handleUpdateDebt(debt.id, "monthlyPayment", Math.max(0, Number(e.target.value)))}
                          className="w-full text-xs font-bold bg-white border border-slate-200 rounded-xl pl-7 pr-3 py-2 text-slate-900 focus:border-blue-600 outline-none"
                          placeholder="7500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add another debt button */}
            <button
              type="button"
              onClick={handleAddDebt}
              className="w-full py-3 border-2 border-dashed border-blue-200 hover:border-blue-500 rounded-2xl flex items-center justify-center gap-2 text-sm font-semibold text-blue-700 hover:bg-blue-50/50 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Another Loan or Credit Card</span>
            </button>
          </div>

          {/* Step 2: Proposed Consolidation Loan Parameters */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900">Step 2: Proposed Consolidation Loan Terms</h2>
              <p className="text-xs text-slate-500 mt-0.5">Adjust tenure and estimated interest rate to view your new single EMI</p>
            </div>

            <div className="space-y-6">
              {/* Proposed Tenure Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Consolidated Loan Tenure
                  </label>
                  <span className="text-sm font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                    {proposedTenure} Months ({Number(proposedTenure / 12).toFixed(1)} Years)
                  </span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={84}
                  step={6}
                  value={proposedTenure}
                  onChange={(e) => setProposedTenure(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                  <span>12 Mos (1 Yr)</span>
                  <span>36 Mos (3 Yrs)</span>
                  <span>60 Mos (5 Yrs)</span>
                  <span>84 Mos (7 Yrs)</span>
                </div>
              </div>

              {/* Proposed Interest Rate */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Consolidated Interest Rate (p.a.)
                    </label>
                    <p className="text-[11px] text-slate-500">Starting from 9.95% p.a.* for eligible salaried profiles</p>
                  </div>
                  <span className="text-sm font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                    {proposedRate}% p.a.
                  </span>
                </div>
                <input
                  type="range"
                  min={9.5}
                  max={24}
                  step={0.25}
                  value={proposedRate}
                  onChange={(e) => setProposedRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                  <span>9.5%</span>
                  <span>10.5% (Prime)</span>
                  <span>14.0%</span>
                  <span>24.0%</span>
                </div>
              </div>

              {/* Processing Fee Input */}
              <div className="flex items-center justify-between pt-2 text-xs">
                <span className="text-slate-600 font-medium">Estimated Lender Processing Fee:</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    max="3"
                    value={processingFeePercent}
                    onChange={(e) => setProcessingFeePercent(Math.max(0, Number(e.target.value)))}
                    className="w-16 text-right px-2 py-1 bg-slate-100 border border-slate-200 rounded-lg font-bold text-slate-800 outline-none"
                  />
                  <span className="text-slate-500 font-bold">% ({formatINR(result.processingFeeAmount)})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Output Summary & Lead Trigger (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          {/* Main Comparison Card */}
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
            {/* Background glowing gradient */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-bold tracking-widest uppercase text-blue-400">
                  Consolidation Impact
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  Single EMI
                </span>
              </div>

              {/* Monthly EMI Comparison Hero */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Current Total EMI
                    </span>
                    <p className="text-xl sm:text-2xl font-black text-rose-400 mt-1 line-through decoration-rose-500/50">
                      {formatINR(result.existingMonthlyOutflow)}
                    </p>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Across {debts.length} separate dues</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40">
                    <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
                      New Single EMI
                    </span>
                    <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
                      {formatINR(result.proposedEMI)}
                    </p>
                    <span className="text-[10px] text-emerald-300 block mt-0.5">1 Payment Date</span>
                  </div>
                </div>

                {/* Monthly Savings Banner */}
                {result.monthlyCashflowSavings > 0 ? (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-emerald-600/10 to-transparent border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-slate-300 block">Monthly Cash-flow Relief</span>
                      <p className="text-lg font-black text-emerald-400">
                        + {formatINR(result.monthlyCashflowSavings)} / month
                      </p>
                    </div>
                    <span className="text-xs font-bold bg-emerald-500 text-slate-950 px-3 py-1.5 rounded-xl">
                      Save {Math.round((result.monthlyCashflowSavings / (result.existingMonthlyOutflow || 1)) * 100)}%
                    </span>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
                    Monthly EMI would be slightly higher due to shorter tenure. Try adjusting the tenure slider to 48 or 60 months.
                  </div>
                )}
              </div>

              {/* Detailed Metrics List */}
              <div className="space-y-3 pt-2 text-xs border-t border-slate-800">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Total Debt Balance:</span>
                  <span className="font-bold text-white text-sm">{formatINR(result.totalPrincipal)}</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Current Weighted Interest:</span>
                  <span className="font-bold text-rose-400">{result.weightedAverageRate}% p.a.</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">New Consolidated Rate:</span>
                  <span className="font-bold text-emerald-400">{proposedRate}% p.a.*</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Estimated Total Repayment:</span>
                  <span className="font-bold text-white">{formatINR(result.proposedTotalRepayment)}</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Net Estimated Lifetime Savings:</span>
                  <span className={`font-bold ${result.lifetimeSavings >= 0 ? "text-emerald-400" : "text-amber-400"}`}>
                    {result.lifetimeSavings >= 0 ? `+ ${formatINR(result.lifetimeSavings)}` : formatINR(result.lifetimeSavings)}
                  </span>
                </div>
              </div>

              {/* Safeguard / Warning Banner */}
              {result.isExtendingTenureWithHigherInterest && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-[11px] leading-relaxed flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Tenure Note:</strong> While your monthly EMI drops by {formatINR(result.monthlyCashflowSavings)}, extending the tenure increases total interest paid over the life of the loan. Choose a shorter tenure if your priority is lowest overall interest.
                  </span>
                </div>
              )}

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer group"
                >
                  <span>Explore Pre-Approved Lender Options</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  100% Free Consultation • No Spam • No Bureau Score Impact
                </p>
              </div>

            </div>
          </div>

          {/* Trust Highlights */}
          <div className="rounded-2xl bg-white p-5 border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Why Consolidate With Credit Expert India?
            </h3>
            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>50+ RBI-Regulated Lenders:</strong> Compare partner private banks and NBFC networks.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Replace 36%-42% Credit Card Dues:</strong> Move high revolving debt to loans from 9.95% p.a.*</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Dedicated Case Manager:</strong> Physical branch assistance in Delhi, Dehradun & Rudrapur.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Pre-Qualify Intake Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
            
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
            >
              ✕
            </button>

            {leadStatus === "success" ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Assessment Request Received!</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Our senior debt advisor will review your calculation ({formatINR(result.totalPrincipal)} across {debts.length} debts) and contact you shortly with suitable bank options.
                </p>
                <button
                  type="button"
                  onClick={() => { setIsModalOpen(false); setLeadStatus("idle"); }}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs"
                >
                  Close Calculator
                </button>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
                    Path B — Confidential Pre-Qualification
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    Explore Your Consolidation Options
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Estimated monthly savings: <strong className="text-emerald-600">+{formatINR(result.monthlyCashflowSavings)}/mo</strong> on <strong className="text-slate-900">{formatINR(result.totalPrincipal)}</strong> debt.
                  </p>
                </div>

                {leadError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                    {leadError}
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full text-xs font-medium px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">10-Digit Mobile Number *</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-400">+91</span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value.replace(/[^0-9]/g, '') })}
                      placeholder="9876543210"
                      className="w-full text-xs font-bold pl-11 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Net Monthly Salary *</label>
                    <input
                      type="number"
                      required
                      value={leadForm.netSalary}
                      onChange={(e) => setLeadForm({ ...leadForm, netSalary: e.target.value })}
                      placeholder="e.g. 65000"
                      className="w-full text-xs font-medium px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Your City</label>
                    <input
                      type="text"
                      value={leadForm.city}
                      onChange={(e) => setLeadForm({ ...leadForm, city: e.target.value })}
                      placeholder="e.g. Delhi, Dehradun"
                      className="w-full text-xs font-medium px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2 cursor-pointer text-[11px] text-slate-500 leading-snug">
                    <input
                      type="checkbox"
                      checked={leadForm.consent}
                      onChange={(e) => setLeadForm({ ...leadForm, consent: e.target.checked })}
                      className="mt-0.5 rounded text-blue-600 accent-blue-600"
                    />
                    <span>
                      I authorize Credit Expert India to contact me via phone, WhatsApp or email to provide loan and debt consolidation options.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={leadStatus === "loading"}
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {leadStatus === "loading" ? "Submitting..." : "Get My Free Pre-Approval Options"}
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
