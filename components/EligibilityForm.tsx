"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Plus, Trash2 } from "lucide-react";

type Loan = {
  id: string;
  type: string;
  lender: string;
  outstanding: number;
  emi: number;
  rate: number;
  tenure: number;
};

export function EligibilityForm() {
  const [step, setStep] = useState(1);
  const [loans, setLoans] = useState<Loan[]>([{ id: '1', type: 'Personal Loan', lender: '', outstanding: 0, emi: 0, rate: 0, tenure: 0 }]);
  const [formData, setFormData] = useState({
    name: "", mobile: "", email: "", city: "", employmentType: "Salaried",
    monthlyIncome: "", employer: "", salaryMode: "Bank Transfer",
    requirement: ""
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 5));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const addLoan = () => {
    setLoans([...loans, { id: Math.random().toString(), type: 'Personal Loan', lender: '', outstanding: 0, emi: 0, rate: 0, tenure: 0 }]);
  };

  const removeLoan = (id: string) => {
    if (loans.length > 1) {
      setLoans(loans.filter(l => l.id !== id));
    }
  };

  const totalOutstanding = loans.reduce((acc, curr) => acc + (Number(curr.outstanding) || 0), 0);
  const totalEmi = loans.reduce((acc, curr) => acc + (Number(curr.emi) || 0), 0);
  
  // Very rough estimate for demo
  const estConsolidatedEmi = Math.round(totalOutstanding * 0.021); // Assuming roughly 2.1% of principal for 60m @ 11.5%

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="text-2xl font-bold text-text-main mb-6">Basic Information</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-blue outline-none" />
              <input type="tel" placeholder="Mobile Number" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-blue outline-none" />
              <input type="email" placeholder="Email Address" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-blue outline-none" />
              <input type="text" placeholder="City" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-blue outline-none" />
              <select className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-blue outline-none text-text-main">
                <option>Salaried Professional</option>
                <option>Self Employed</option>
                <option>Business Owner</option>
              </select>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="text-2xl font-bold text-text-main mb-6">Income Details</h3>
            <div className="space-y-4">
              <input type="number" placeholder="Net Monthly Income (₹)" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-blue outline-none" />
              <input type="text" placeholder="Employer Name" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-blue outline-none" />
              <select className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-blue outline-none text-text-main">
                <option>Salary Credit Mode: Bank Transfer</option>
                <option>Salary Credit Mode: Cheque</option>
                <option>Salary Credit Mode: Cash</option>
              </select>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="text-2xl font-bold text-text-main mb-6">Existing Loans</h3>
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
              {loans.map((loan, idx) => (
                <div key={loan.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                  {loans.length > 1 && (
                    <button onClick={() => removeLoan(loan.id)} className="absolute top-4 right-4 text-slate-400 hover:text-warning-red">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <p className="text-sm font-medium text-text-muted mb-3">Loan #{idx + 1}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <select 
                      className="col-span-2 bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none"
                      value={loan.type}
                      onChange={(e) => {
                        const newLoans = [...loans];
                        newLoans[idx].type = e.target.value;
                        setLoans(newLoans);
                      }}
                    >
                      <option>Personal Loan</option>
                      <option>Credit Card</option>
                      <option>App Loan</option>
                      <option>Consumer Loan</option>
                    </select>
                    <input 
                      type="number" placeholder="Outstanding (₹)" 
                      className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none"
                      onChange={(e) => {
                        const newLoans = [...loans];
                        newLoans[idx].outstanding = Number(e.target.value);
                        setLoans(newLoans);
                      }}
                    />
                    <input 
                      type="number" placeholder="EMI (₹)" 
                      className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none"
                      onChange={(e) => {
                        const newLoans = [...loans];
                        newLoans[idx].emi = Number(e.target.value);
                        setLoans(newLoans);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button onClick={addLoan} className="mt-4 flex items-center gap-2 text-brand-blue font-medium text-sm hover:underline">
              <Plus className="w-4 h-4" /> Add Another Loan
            </button>
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="text-2xl font-bold text-text-main mb-6">What are you looking for?</h3>
            <div className="space-y-3">
              {['Consolidate my loans', 'Reduce my EMI', 'Balance transfer', 'Top-up loan', 'Fresh personal loan', "I'm not sure"].map((opt) => (
                <label key={opt} className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input type="radio" name="requirement" value={opt} className="w-4 h-4 text-brand-blue accent-brand-blue" />
                  <span className="text-text-main font-medium">{opt}</span>
                </label>
              ))}
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold text-text-main mb-2">Here's What We Found</h3>
            <p className="text-text-muted mb-8">You currently have {loans.length} loan(s) with ₹{totalOutstanding.toLocaleString('en-IN')} outstanding.</p>
            
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mb-8 text-left">
              <h4 className="font-semibold text-emerald-800 mb-4 text-center">You may be able to simplify your repayments.</h4>
              <div className="flex justify-between items-center py-3 border-b border-emerald-200/50">
                <span className="text-text-muted">Current EMI</span>
                <span className="font-semibold line-through text-slate-400">₹{totalEmi.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-emerald-700 font-medium">Potential New EMI</span>
                <span className="font-bold text-emerald-600 text-xl">₹{estConsolidatedEmi.toLocaleString('en-IN')}</span>
              </div>
              {totalEmi > estConsolidatedEmi && (
                <div className="mt-4 bg-white rounded-xl p-4 text-center border border-emerald-100">
                  <span className="block text-sm text-text-muted mb-1">Potential monthly difference</span>
                  <span className="text-2xl font-bold text-emerald-500">₹{(totalEmi - estConsolidatedEmi).toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            <button className="w-full py-4 bg-brand-blue text-white rounded-xl font-medium hover:bg-blue-800 transition-colors">
              Explore My Options with an Expert
            </button>
            <p className="text-[10px] text-slate-400 text-center mt-4 leading-tight">
              *These figures are indicative estimates. Final eligibility, rate, amount, tenure and approval are determined by the lender.
            </p>
          </motion.div>
        );
    }
  };

  return (
    <div id="check-eligibility" className="w-full max-w-4xl mx-auto flex flex-col justify-center h-full">
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-main mb-4">See your options</h2>
        <p className="text-lg text-text-muted">Take a minute to tell us about your situation.</p>
      </div>

      <div className="w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 overflow-hidden">
        {/* Progress Bar */}
        <div className="flex h-2 w-full bg-slate-100">
          <motion.div 
            className="bg-brand-blue h-full"
            initial={{ width: "20%" }}
            animate={{ width: `${(step / 5) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          {step < 5 && (
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-100">
              <button 
                onClick={prevStep}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${step === 1 ? 'invisible' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                Back
              </button>
              <button 
                onClick={nextStep}
                className="px-8 py-3 bg-brand-blue text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                {step === 4 ? 'Analyze Options' : 'Next Step'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
