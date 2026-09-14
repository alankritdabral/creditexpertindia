"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Plus, Trash2, User, Phone, Mail, MapPin, Briefcase, Building2, Shield, CreditCard, Loader2, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

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
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<'full' | 'cibil' | null>(null);
  const [loans, setLoans] = useState<Loan[]>([{ id: '1', type: 'Personal Loan', lender: '', outstanding: 0, emi: 0, rate: 0, tenure: 0 }]);
  const [formData, setFormData] = useState({
    name: "", mobile: "", email: "", city: "", employmentType: "Salaried",
    monthlyIncome: "", employer: "", salaryMode: "Bank Transfer",
    requirement: "",
    pan: "", gender: "male", consent: false, bureau: "v1_json"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cibilData, setCibilData] = useState<any>(null);
  const [expandedAccount, setExpandedAccount] = useState<string | null>(null);

  const nextStep = () => {
    if (mode === 'cibil' && step === 5) setStep(6);
    else setStep(s => Math.min(s + 1, 6));
  };
  const prevStep = () => {
    if (mode === 'cibil' && step === 5) { setStep(0); setMode(null); }
    else if (step === 1) { setStep(0); setMode(null); }
    else setStep(s => Math.max(s - 1, 1));
  };

  const addLoan = () => {
    setLoans([...loans, { id: Math.random().toString(), type: 'Personal Loan', lender: '', outstanding: 0, emi: 0, rate: 0, tenure: 0 }]);
  };

  const removeLoan = (id: string) => {
    if (loans.length > 1) {
      setLoans(loans.filter(l => l.id !== id));
    }
  };

  const handleFetchReport = async () => {
    if (!formData.consent) {
      setError("Please provide consent to fetch your credit report.");
      return;
    }
    if (!formData.pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(formData.pan)) {
      setError("Please enter a valid PAN.");
      return;
    }
    if (!formData.mobile || !/^[6-9]\d{9}$/.test(formData.mobile)) {
      setError("Please enter a valid mobile number in step 1.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const isV2 = formData.bureau.startsWith("v2");
      const isPdf = formData.bureau.endsWith("_pdf");
      
      let endpoint = "";
      if (isV2) {
        endpoint = isPdf 
          ? "https://kyc-api.surepass.app/api/v1/credit-report-v2/fetch-pdf-report"
          : "https://kyc-api.surepass.app/api/v1/credit-report-v2/fetch-report";
      } else {
        endpoint = isPdf
          ? "https://kyc-api.surepass.app/api/v1/credit-report-cibil/fetch-report-pdf"
          : "https://kyc-api.surepass.app/api/v1/credit-report-cibil/fetch-report";
      }

      const apiKey = process.env.NEXT_PUBLIC_SUREPASS_API_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc4OTIyMzQ5NywianRpIjoiNmY0OWQ5ZDYtNGVhNy00ZjJmLWJlZmUtODExNjg2MGE0ZjQzIiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LmNyZWRpdGV4cGVydGluZGlhQHN1cmVwYXNzLmlvIiwibmJmIjoxNzg5MjIzNDk3LCJleHAiOjIxMDQ1ODM0OTcsImVtYWlsIjoiY3JlZGl0ZXhwZXJ0aW5kaWFAc3VyZXBhc3MuaW8iLCJ0ZW5hbnRfaWQiOiJtYWluIiwidXNlcl9jbGFpbXMiOnsic2NvcGVzIjpbInVzZXIiXX19.zOfjOTG1XrixzmUowCWgSADg281qLkI_asb-t7M_0dg";
      if (!apiKey) {
        setError("API key is not configured.");
        setLoading(false);
        return;
      }

      const bodyPayload = isV2
        ? {
          name: formData.name || "Customer",
          id_number: formData.pan,
          id_type: "pan",
          mobile: formData.mobile,
          consent: "Y",
          gender: formData.gender
        }
        : {
          mobile: formData.mobile,
          pan: formData.pan,
          name: formData.name || "Customer",
          gender: formData.gender,
          consent: "Y"
        };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(bodyPayload)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || data.error || "Failed to fetch credit report. Please check your details.");
      } else {
        setCibilData(data.data);
        
        // Automatically open/download the PDF if it exists
        if (data.data?.credit_report_link) {
          // Using window.open is the most reliable way to handle cross-origin S3 PDF links
          window.open(data.data.credit_report_link, "_blank");
        }
        
        // Save to Firestore (non-blocking)
        try {
          await addDoc(collection(db, "credit_reports"), {
            name: formData.name || "Customer",
            mobile: formData.mobile,
            pan: formData.pan,
            gender: formData.gender,
            bureau: formData.bureau,
            credit_score: data.data?.credit_score || null,
            credit_report_link: data.data?.credit_report_link || null,
            timestamp: serverTimestamp(),
          });
        } catch (dbError) {
          console.error("Failed to save to database:", dbError);
        }

        nextStep();
      }
    } catch (e) {
      setError("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalOutstanding = loans.reduce((acc, curr) => acc + (Number(curr.outstanding) || 0), 0);
  const totalEmi = loans.reduce((acc, curr) => acc + (Number(curr.emi) || 0), 0);

  // Very rough estimate for demo
  const estConsolidatedEmi = Math.round(totalOutstanding * 0.021); // Assuming roughly 2.1% of principal for 60m @ 11.5%

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center">
            <h3 className="text-2xl font-bold text-text-main mb-6">How can we help you?</h3>
            <div className="grid gap-4 sm:grid-cols-2 text-left">
              <button
                onClick={() => { setMode('full'); setStep(1); }}
                className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-brand-blue hover:shadow-md transition-all flex flex-col gap-3 group"
              >
                <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Full Assessment</h4>
                  <p className="text-sm text-slate-500 leading-relaxed mt-1">Check your eligibility for personal loans and consolidation options.</p>
                </div>
              </button>

              <button
                onClick={() => { setMode('cibil'); setStep(5); }}
                className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-emerald-500 hover:shadow-md transition-all flex flex-col gap-3 group"
              >
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Quick CIBIL Check</h4>
                  <p className="text-sm text-slate-500 leading-relaxed mt-1">Fetch my credit report and score securely without full assessment.</p>
                </div>
              </button>
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="text-2xl font-bold text-text-main mb-6">Basic Information</h3>
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all" />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="tel" placeholder="Mobile Number" value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all" />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all" />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="City" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all" />
              </div>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select value={formData.employmentType} onChange={e => setFormData({ ...formData, employmentType: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none text-text-main transition-all">
                  <option>Salaried Professional</option>
                  <option>Self Employed</option>
                  <option>Business Owner</option>
                </select>
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="text-2xl font-bold text-text-main mb-6">Income Details</h3>
            <div className="space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">₹</span>
                <input type="number" placeholder="Net Monthly Income" value={formData.monthlyIncome} onChange={e => setFormData({ ...formData, monthlyIncome: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-3.5 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all" />
              </div>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Employer Name" value={formData.employer} onChange={e => setFormData({ ...formData, employer: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all" />
              </div>
              <select value={formData.salaryMode} onChange={e => setFormData({ ...formData, salaryMode: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none text-text-main transition-all">
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
                      value={loan.outstanding || ''}
                      className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none"
                      onChange={(e) => {
                        const newLoans = [...loans];
                        newLoans[idx].outstanding = Number(e.target.value);
                        setLoans(newLoans);
                      }}
                    />
                    <input
                      type="number" placeholder="EMI (₹)"
                      value={loan.emi || ''}
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
                  <input type="radio" name="requirement" value={opt} checked={formData.requirement === opt} onChange={e => setFormData({ ...formData, requirement: e.target.value })} className="w-4 h-4 text-brand-blue accent-brand-blue" />
                  <span className="text-text-main font-medium">{opt}</span>
                </label>
              ))}
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="text-2xl font-bold text-text-main mb-2">Credit Profile Assessment</h3>
            <p className="text-text-muted mb-6 text-sm">We need to review your credit profile to show you precise offers.</p>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              {mode === 'cibil' && (
                <>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all" />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="tel" placeholder="Mobile Number" value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all" />
                  </div>
                </>
              )}
              <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="PAN Number"
                  value={formData.pan}
                  onChange={e => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all uppercase"
                  maxLength={10}
                />
              </div>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  value={formData.gender}
                  onChange={e => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none text-text-main transition-all"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Bureau Selection */}
              <div className="pt-2">
                <p className="text-sm font-semibold text-text-main mb-3">Select Credit Bureau & Format</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer transition-all ${formData.bureau === 'v1_json' ? 'border-brand-blue bg-blue-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                    <input type="radio" name="bureau" value="v1_json" checked={formData.bureau === 'v1_json'} onChange={e => setFormData({ ...formData, bureau: e.target.value })} className="w-4 h-4 text-brand-blue accent-brand-blue" />
                    <span className="text-sm font-medium text-slate-700">CIBIL (Dashboard)</span>
                  </label>
                  <label className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer transition-all ${formData.bureau === 'v1_pdf' ? 'border-brand-blue bg-blue-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                    <input type="radio" name="bureau" value="v1_pdf" checked={formData.bureau === 'v1_pdf'} onChange={e => setFormData({ ...formData, bureau: e.target.value })} className="w-4 h-4 text-brand-blue accent-brand-blue" />
                    <span className="text-sm font-medium text-slate-700">CIBIL (PDF Only)</span>
                  </label>
                  <label className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer transition-all ${formData.bureau === 'v2_json' ? 'border-brand-blue bg-blue-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                    <input type="radio" name="bureau" value="v2_json" checked={formData.bureau === 'v2_json'} onChange={e => setFormData({ ...formData, bureau: e.target.value })} className="w-4 h-4 text-brand-blue accent-brand-blue" />
                    <span className="text-sm font-medium text-slate-700">Equifax (Dashboard)</span>
                  </label>
                  <label className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer transition-all ${formData.bureau === 'v2_pdf' ? 'border-brand-blue bg-blue-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                    <input type="radio" name="bureau" value="v2_pdf" checked={formData.bureau === 'v2_pdf'} onChange={e => setFormData({ ...formData, bureau: e.target.value })} className="w-4 h-4 text-brand-blue accent-brand-blue" />
                    <span className="text-sm font-medium text-slate-700">Equifax (PDF Only)</span>
                  </label>
                </div>
              </div>

              <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors mt-4">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={e => setFormData({ ...formData, consent: e.target.checked })}
                  className="w-5 h-5 mt-0.5 text-brand-blue accent-brand-blue shrink-0 rounded"
                />
                <span className="text-xs text-text-muted leading-relaxed">
                  <strong>Credit Report Consent</strong><br />
                  By continuing, you consent to us retrieving your credit report from the credit bureau for eligibility assessment. I agree to the above and authorize Credit Expert India to retrieve my credit report.
                </span>
              </label>
            </div>
          </motion.div>
        );
      case 6:
        const isEquifax = formData.bureau.startsWith("v2");
        
        let accountSummary = null;
        let inquirySummary = null;
        let accounts = null;
        let equifaxPersonalInfo = null;

        if (!isEquifax) {
          const report = cibilData?.credit_report?.[0];
          const consumerSummary = report?.response?.consumerSummaryresp;
          accountSummary = consumerSummary?.accountSummary;
          inquirySummary = consumerSummary?.inquirySummary;
          accounts = report?.accounts;
        } else {
          // Equifax JSON parsing
          const cirReportData = cibilData?.credit_report?.CCRResponse?.CIRReportDataLst?.[0]?.CIRReportData;
          equifaxPersonalInfo = cirReportData?.IDAndContactInfo?.PersonalInfo;
        }

        const score = cibilData?.credit_score;

        let scoreLabel = "Not Available";
        let scoreColor = "text-slate-500";
        let ringColor = "text-slate-200";
        const scoreNum = Number(score);
        if (scoreNum) {
          if (scoreNum >= 800) { scoreLabel = "Excellent"; scoreColor = "text-emerald-600"; ringColor = "text-emerald-500"; }
          else if (scoreNum >= 750) { scoreLabel = "Very Good"; scoreColor = "text-teal-500"; ringColor = "text-teal-400"; }
          else if (scoreNum >= 650) { scoreLabel = "Good"; scoreColor = "text-blue-500"; ringColor = "text-blue-400"; }
          else if (scoreNum >= 550) { scoreLabel = "Fair"; scoreColor = "text-amber-500"; ringColor = "text-amber-400"; }
          else { scoreLabel = "Poor"; scoreColor = "text-red-500"; ringColor = "text-red-400"; }
        }

        const scorePercent = scoreNum ? Math.max(0, Math.min(100, ((scoreNum - 300) / 600) * 100)) : 0;
        const dashArray = `${scorePercent} 100`;

        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-2">

            {/* CIBIL Dashboard */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-text-main">Credit Report</h3>
                <div className="flex items-center gap-3">
                  {cibilData?.credit_report_link && (
                    <a href={cibilData.credit_report_link} target="_blank" rel="noopener noreferrer" className="text-xs font-bold px-4 py-1.5 bg-brand-blue text-white rounded-full hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-1">
                      Download PDF
                    </a>
                  )}
                  <span className="text-xs font-semibold px-3 py-1.5 bg-[#F1EFE7] text-[#4A3D36] rounded-full">Updated: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Score Hero Card */}
              <div className="bg-gradient-to-br from-[#FAF8F5] to-[#F1EFE7] rounded-3xl p-6 border border-[#EBE6DD] mb-6 shadow-sm flex flex-col items-center justify-center text-center">
                <h4 className="text-xs font-extrabold tracking-widest uppercase text-[#8B7C73] mb-4">Your Credit Score</h4>

                <div className="relative w-40 h-40 flex flex-col items-center justify-center">
                  <svg viewBox="0 0 36 36" className="absolute top-0 left-0 w-full h-full transform -rotate-90">
                    <path
                      className="text-slate-200"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {scoreNum > 0 && (
                      <path
                        className={`${ringColor} transition-all duration-1000 ease-out`}
                        strokeWidth="3"
                        strokeDasharray={dashArray}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    )}
                  </svg>
                  <span className="text-4xl font-extrabold text-[#382F2A] relative z-10">{score || "N/A"}</span>
                  {score && <span className={`text-sm font-bold mt-1 ${scoreColor} relative z-10`}>{scoreLabel}</span>}
                </div>
              </div>

              {/* Credit Overview */}
              {accountSummary && (
                <>
                  <h4 className="text-lg font-bold text-[#382F2A] mb-4">Credit Overview</h4>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      { label: "Total Accounts", value: accountSummary?.totalAccounts || 0 },
                      { label: "Current Balance", value: accountSummary?.currentBalance ? `₹${Number(accountSummary.currentBalance).toLocaleString('en-IN')}` : '₹0' },
                      { label: "High Credit", value: accountSummary?.highCreditAmount ? `₹${Number(accountSummary.highCreditAmount).toLocaleString('en-IN')}` : '₹0' },
                      { label: "Overdue", value: accountSummary?.overdueBalance ? `₹${Number(accountSummary.overdueBalance).toLocaleString('en-IN')}` : '₹0' },
                      { label: "Overdue Accounts", value: accountSummary?.overdueAccounts || 0 },
                      { label: "Zero Balance", value: accountSummary?.zeroBalanceAccounts || 0 }
                    ].map((stat, i) => (
                      <div key={i} className="bg-[#FAF8F5] border border-[#EBE6DD] rounded-2xl p-4">
                        <p className="text-[#8B7C73] text-xs font-semibold mb-1">{stat.label}</p>
                        <p className="text-[#382F2A] font-extrabold text-sm">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Enquiries Summary */}
              {inquirySummary && (
                <div className="bg-[#FAF8F5] border border-[#EBE6DD] rounded-3xl p-5 mb-6">
                  <h4 className="text-sm font-extrabold text-[#382F2A] mb-4">Credit Enquiries</h4>
                  <div className="flex items-center justify-between gap-2 text-center border-b border-[#EBE6DD] pb-4 mb-4">
                    <div>
                      <p className="text-xl font-bold text-[#382F2A]">{inquirySummary?.totalInquiry || 0}</p>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-[#8B7C73]">Total</p>
                    </div>
                    <div className="w-px h-8 bg-[#EBE6DD]"></div>
                    <div>
                      <p className="text-xl font-bold text-[#382F2A]">{inquirySummary?.inquiryPast30Days || 0}</p>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-[#8B7C73]">30 Days</p>
                    </div>
                    <div className="w-px h-8 bg-[#EBE6DD]"></div>
                    <div>
                      <p className="text-xl font-bold text-[#382F2A]">{inquirySummary?.inquiryPast12Months || 0}</p>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-[#8B7C73]">12 Mos</p>
                    </div>
                    <div className="w-px h-8 bg-[#EBE6DD]"></div>
                    <div>
                      <p className="text-xl font-bold text-[#382F2A]">{inquirySummary?.inquiryPast24Months || 0}</p>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-[#8B7C73]">24 Mos</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#8B7C73] leading-relaxed">
                    <span className="font-bold text-[#382F2A]">Note:</span> Frequent credit enquiries can be one factor considered in credit assessment. The impact depends on the overall credit profile.
                  </p>
                </div>
              )}

              {/* Equifax Personal Info (Fallback) */}
              {isEquifax && (
                 <div className="bg-[#FAF8F5] border border-[#EBE6DD] rounded-3xl p-5 mb-6">
                  <h4 className="text-sm font-extrabold text-[#382F2A] mb-4">Equifax Profile Data</h4>
                  {equifaxPersonalInfo && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                       <div>
                         <p className="text-[10px] uppercase tracking-wider font-bold text-[#8B7C73]">Name</p>
                         <p className="text-sm font-bold text-[#382F2A]">{equifaxPersonalInfo.Name?.FullName || 'N/A'}</p>
                       </div>
                       <div>
                         <p className="text-[10px] uppercase tracking-wider font-bold text-[#8B7C73]">Date of Birth</p>
                         <p className="text-sm font-bold text-[#382F2A]">{equifaxPersonalInfo.DateOfBirth || 'N/A'}</p>
                       </div>
                    </div>
                  )}
                  <div className="p-3 bg-white border border-[#EBE6DD] rounded-xl text-center">
                    <p className="text-xs text-[#8B7C73] leading-relaxed">
                      Equifax does not return detailed credit accounts in their JSON response. 
                      <br/>Please use the <strong>Equifax (PDF Only)</strong> option to view full account details.
                    </p>
                  </div>
                 </div>
              )}

              {/* Accounts List */}
              {accounts && accounts.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-[#382F2A] mb-4">Credit Accounts</h4>
                  <div className="space-y-3">
                    {accounts.map((acc: any, i: number) => {
                      const isExpanded = expandedAccount === acc.accountNumber;
                      return (
                        <div key={i} className="bg-white border border-[#EBE6DD] rounded-2xl overflow-hidden transition-all shadow-sm">
                          <button
                            onClick={() => setExpandedAccount(isExpanded ? null : acc.accountNumber)}
                            className="w-full flex items-center justify-between p-4 hover:bg-[#FAF8F5] transition-colors"
                          >
                            <div className="text-left">
                              <p className="text-sm font-bold text-[#382F2A]">{acc.memberShortName || 'Unknown Lender'}</p>
                              <p className="text-xs font-semibold text-[#8B7C73] mt-0.5">{acc.accountType || 'Unknown Type'}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <p className="text-sm font-bold text-[#382F2A]">₹{Number(acc.currentBalance || 0).toLocaleString('en-IN')}</p>
                                <p className="text-[10px] font-semibold text-[#8B7C73] uppercase tracking-wider mt-0.5">Balance</p>
                              </div>
                              {isExpanded ? <ChevronUp className="w-4 h-4 text-[#8B7C73]" /> : <ChevronDown className="w-4 h-4 text-[#8B7C73]" />}
                            </div>
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-[#EBE6DD]"
                              >
                                <div className="p-4 grid grid-cols-2 gap-y-4 gap-x-2 bg-[#FAF8F5]">
                                  <div>
                                    <p className="text-[10px] font-bold text-[#8B7C73] uppercase">Account Number</p>
                                    <p className="text-sm font-semibold text-[#382F2A]">{acc.accountNumber || 'N/A'}</p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-bold text-[#8B7C73] uppercase">High Credit</p>
                                    <p className="text-sm font-semibold text-[#382F2A]">₹{Number(acc.highCreditAmount || 0).toLocaleString('en-IN')}</p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-bold text-[#8B7C73] uppercase">EMI</p>
                                    <p className="text-sm font-semibold text-[#382F2A]">{acc.emiAmount ? `₹${Number(acc.emiAmount).toLocaleString('en-IN')}` : 'N/A'}</p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-bold text-[#8B7C73] uppercase">Interest Rate</p>
                                    <p className="text-sm font-semibold text-[#382F2A]">{acc.interest_rate ? `${acc.interest_rate}%` : 'N/A'}</p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-bold text-[#8B7C73] uppercase">Date Opened</p>
                                    <p className="text-sm font-semibold text-[#382F2A]">{acc.dateOpened || 'N/A'}</p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-bold text-[#8B7C73] uppercase">Date Reported</p>
                                    <p className="text-sm font-semibold text-[#382F2A]">{acc.dateReported || 'N/A'}</p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Original Consolidation Estimates */}
            {mode === 'full' && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mb-8 text-left">
                <h4 className="font-semibold text-emerald-800 mb-4 text-center">You may be able to simplify your repayments.</h4>
                <div className="flex justify-between items-center py-3 border-b border-emerald-200/50">
                  <span className="text-text-muted text-sm">Self-Reported Current EMI</span>
                  <span className="font-semibold line-through text-slate-400">₹{totalEmi.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-emerald-200/50">
                  <span className="text-text-muted text-sm">Self-Reported Outstanding</span>
                  <span className="font-semibold text-slate-700">₹{totalOutstanding.toLocaleString('en-IN')}</span>
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
            )}

            <button className="w-full py-4 bg-brand-blue text-white rounded-xl font-medium hover:bg-blue-800 transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md">
              Speak with a Consolidation Expert
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
        {step > 0 && (
          <div className="flex h-2 w-full bg-slate-100">
            <motion.div
              className="bg-brand-blue h-full"
              initial={{ width: mode === 'cibil' ? "50%" : "16.6%" }}
              animate={{ width: mode === 'cibil' ? (step === 5 ? "50%" : "100%") : `${(step / 6) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
        {step > 0 && step < 6 && (
          <div className="px-8 md:px-12 pt-4 pb-0">
            <p className="text-xs font-semibold text-text-muted tracking-wide">
              {mode === 'cibil' ? `Step 1 of 1` : `Step ${step} of 5`}
            </p>
          </div>
        )}

        <div className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          {step > 0 && step < 6 && (
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-100">
              <button
                onClick={prevStep}
                disabled={loading}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 active:scale-95 ${step === 0 ? 'hidden' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50'}`}
              >
                Back
              </button>

              {step === 5 ? (
                <button
                  onClick={handleFetchReport}
                  disabled={loading}
                  className="px-8 py-3 bg-brand-blue text-white rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md flex items-center gap-2 group disabled:opacity-70 disabled:hover:bg-brand-blue disabled:active:scale-100"
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Fetching...</>
                  ) : (
                    <><Shield className="w-4 h-4" /> Fetch Credit Report</>
                  )}
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  disabled={loading}
                  className="px-8 py-3 bg-brand-blue text-white rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md flex items-center gap-2 group"
                >
                  Next Step <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              )}
            </div>
          )}
          {step > 0 && step < 6 && (
            <div className="flex items-center justify-center gap-2 pt-4 text-xs text-slate-400">
              <Shield className="w-3.5 h-3.5" />
              <span>Your information is secure and never shared without consent.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
