"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Plus, Trash2, User, Phone, Mail, MapPin, Briefcase, Building2, Shield, CreditCard, Loader2, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { collection, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { analyzeLenderEligibility } from "@/lib/lenderEngine";
import { EMPLOYERS } from "@/lib/employers";
import { parseBureauData } from "@/lib/bureauParsers";
export function EligibilityForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", mobile: "", email: "", city: "", employmentType: "Salaried",
    monthlyIncome: "", employer: "", salaryMode: "Bank Transfer",
    requirement: "",
    pan: "", gender: "male", consent: false, bureau: "v2_json"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cibilData, setCibilData] = useState<any>(null);
  const [expandedAccount, setExpandedAccount] = useState<string | null>(null);
  const [dashboardTab, setDashboardTab] = useState<"enquiries" | "ongoing" | "closed" | "eligibility">("enquiries");
  const [userOverrides, setUserOverrides] = useState<any>({});
  const [loanOverrides, setLoanOverrides] = useState<any>({});
  const [manualLoans, setManualLoans] = useState<any[]>([]);

  const [showEmployerDropdown, setShowEmployerDropdown] = useState(false);
  const [employerSearch, setEmployerSearch] = useState("");
  const employerDropdownRef = useRef<HTMLDivElement>(null);

  const [debouncedEmployerSearch, setDebouncedEmployerSearch] = useState(employerSearch);
  const [asyncEmployers, setAsyncEmployers] = useState(EMPLOYERS);
  const [isSearchingEmployer, setIsSearchingEmployer] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedEmployerSearch(employerSearch);
    }, 300);
    return () => clearTimeout(handler);
  }, [employerSearch]);

  useEffect(() => {
    const fetchEmployersFromDB = async () => {
      setIsSearchingEmployer(true);
      await new Promise(resolve => setTimeout(resolve, 400));
      const results = EMPLOYERS.filter(e =>
        e.toLowerCase().includes(debouncedEmployerSearch.toLowerCase()) || e.includes("Other")
      );
      setAsyncEmployers(results);
      setIsSearchingEmployer(false);
    };
    fetchEmployersFromDB();
  }, [debouncedEmployerSearch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (employerDropdownRef.current && !employerDropdownRef.current.contains(event.target as Node)) {
        setShowEmployerDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const processFetchedReport = (reportData: any) => {
    setCibilData(reportData);
    if (reportData?.credit_report_link) {
      window.open(reportData.credit_report_link, "_blank");
    }
    setStep(6);
  };

  const handleFetchReport = async () => {
    if (!formData.consent) {
      setError("Please accept the credit report consent.");
      return;
    }
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
    if (!panRegex.test(formData.pan)) {
      setError("Please enter a valid 10-character PAN number.");
      return;
    }
    if (formData.mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // 1. Check Database First
      const docId = `${formData.pan.toUpperCase()}_${formData.mobile}_${formData.bureau}`;
      const docRef = doc(db, "credit_reports", docId);

      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          let createdAt = new Date();
          if (data.created_at) {
            createdAt = typeof data.created_at.toDate === 'function' ? data.created_at.toDate() : new Date(data.created_at);
          }
          const daysOld = (new Date().getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);

          if (daysOld > 30) {
            setError("Your report in our system has expired (older than 30 days). Please contact support for a new assessment.");
            setLoading(false);
            return;
          } else {
            // Less than 30 days old
            const isPdf = formData.bureau.endsWith("_pdf");
            if (isPdf) {
              setError("You recently generated a PDF report. For security, PDF links expire quickly. Please contact support to retrieve it.");
              setLoading(false);
              return;
            } else {
              // Dashboard cache hit!
              if (data.raw_api_data) {
                processFetchedReport(data.raw_api_data);
                setLoading(false);
                return;
              }
            }
          }
        }
      } catch (e) {
        console.error("Error checking cache:", e);
        // Continue to fetch if DB read fails (e.g. missing permissions)
      }

      // 2. Not in DB or no cache -> Fetch from Surepass
      const isV2 = formData.bureau.startsWith("v2");
      const isExperian = formData.bureau.startsWith("experian");
      const isCrif = formData.bureau.startsWith("crif");
      const isPdf = formData.bureau.endsWith("_pdf");

      let endpoint = "";
      if (isV2) {
        endpoint = isPdf
          ? "https://kyc-api.surepass.app/api/v1/credit-report-v2/fetch-pdf-report"
          : "https://kyc-api.surepass.app/api/v1/credit-report-v2/fetch-report";
      } else if (isExperian) {
        endpoint = isPdf
          ? "https://kyc-api.surepass.app/api/v1/credit-report-experian/fetch-report-pdf"
          : "https://kyc-api.surepass.app/api/v1/credit-report-experian/fetch-report";
      } else if (isCrif) {
        endpoint = isPdf
          ? "https://kyc-api.surepass.app/api/v1/credit-report-crif/fetch-report-pdf"
          : "https://kyc-api.surepass.app/api/v1/credit-report-crif/fetch-report";
      } else {
        endpoint = isPdf
          ? "https://kyc-api.surepass.app/api/v1/credit-report-cibil/fetch-report-pdf"
          : "https://kyc-api.surepass.app/api/v1/credit-report-cibil/fetch-report";
      }

      let bodyPayload: any = {};
      if (isV2) {
        bodyPayload = {
          name: formData.name || "Customer",
          id_number: formData.pan,
          id_type: "pan",
          mobile: formData.mobile,
          consent: "Y",
          gender: formData.gender
        };
      } else if (isCrif) {
        const nameParts = (formData.name || "Customer").trim().split(" ");
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(" ") || firstName;
        bodyPayload = {
          first_name: firstName,
          last_name: lastName,
          mobile: formData.mobile,
          pan: formData.pan,
          consent: "Y"
        };
      } else {
        bodyPayload = {
          mobile: formData.mobile,
          pan: formData.pan,
          name: formData.name || "Customer",
          gender: formData.gender,
          consent: "Y"
        };
      }

      // Send the request through our new Next.js API Route which talks to the VPS proxy
      const res = await fetch("/api/surepass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ endpoint, bodyPayload })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || data.error || "Failed to fetch credit report. Please check your details.");
      } else {
        // Save to Firebase
        try {
          const docId = `${formData.pan.toUpperCase()}_${formData.mobile}_${formData.bureau}`;
          await setDoc(doc(db, "credit_reports", docId), {
            name: formData.name,
            mobile: formData.mobile,
            pan: formData.pan.toUpperCase(),
            gender: formData.gender,
            bureau: formData.bureau,
            credit_score: data.data?.credit_score || null,
            pdf_link: data.data?.credit_report_link || null,
            raw_api_data: data.data, // Save the full response to rebuild dashboard later
            created_at: serverTimestamp()
          });
        } catch (e) {
          console.error("Error saving to Firebase", e);
        }

        processFetchedReport(data.data);
      }
    } catch (e) {
      setError("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="text-2xl font-bold text-text-main mb-6">Credit Profile & Identity</h3>
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Full Name (As per PAN)" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all" />
              </div>
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
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="tel" placeholder="Mobile Number" value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all" />
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
                  <label className="flex items-center gap-2 p-3 border rounded-xl cursor-not-allowed transition-all border-slate-200 bg-slate-50 opacity-50">
                    <input type="radio" name="bureau" value="v1_json" checked={formData.bureau === 'v1_json'} disabled onChange={e => setFormData({ ...formData, bureau: e.target.value })} className="w-4 h-4 text-brand-blue accent-brand-blue cursor-not-allowed" />
                    <span className="text-sm font-medium text-slate-700">CIBIL (Dashboard)</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border rounded-xl cursor-not-allowed transition-all border-slate-200 bg-slate-50 opacity-50">
                    <input type="radio" name="bureau" value="v1_pdf" checked={formData.bureau === 'v1_pdf'} disabled onChange={e => setFormData({ ...formData, bureau: e.target.value })} className="w-4 h-4 text-brand-blue accent-brand-blue cursor-not-allowed" />
                    <span className="text-sm font-medium text-slate-700">CIBIL (PDF)</span>
                  </label>
                  <label className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer transition-all ${formData.bureau === 'v2_json' ? 'border-brand-blue bg-blue-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                    <input type="radio" name="bureau" value="v2_json" checked={formData.bureau === 'v2_json'} onChange={e => setFormData({ ...formData, bureau: e.target.value })} className="w-4 h-4 text-brand-blue accent-brand-blue" />
                    <span className="text-sm font-medium text-slate-700">Equifax (Dashboard)</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border rounded-xl cursor-not-allowed transition-all border-slate-200 bg-slate-50 opacity-50">
                    <input type="radio" name="bureau" value="v2_pdf" disabled checked={formData.bureau === 'v2_pdf'} onChange={e => setFormData({ ...formData, bureau: e.target.value })} className="w-4 h-4 text-brand-blue accent-brand-blue cursor-not-allowed" />
                    <span className="text-sm font-medium text-slate-700">Equifax (PDF)</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border rounded-xl cursor-not-allowed transition-all border-slate-200 bg-slate-50 opacity-50">
                    <input type="radio" name="bureau" value="experian_json" disabled checked={formData.bureau === 'experian_json'} onChange={e => setFormData({ ...formData, bureau: e.target.value })} className="w-4 h-4 text-brand-blue accent-brand-blue cursor-not-allowed" />
                    <span className="text-sm font-medium text-slate-700">Experian (Dashboard)</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border rounded-xl cursor-not-allowed transition-all border-slate-200 bg-slate-50 opacity-50">
                    <input type="radio" name="bureau" value="experian_pdf" disabled checked={formData.bureau === 'experian_pdf'} onChange={e => setFormData({ ...formData, bureau: e.target.value })} className="w-4 h-4 text-brand-blue accent-brand-blue cursor-not-allowed" />
                    <span className="text-sm font-medium text-slate-700">Experian (PDF)</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border rounded-xl cursor-not-allowed transition-all border-slate-200 bg-slate-50 opacity-50">
                    <input type="radio" name="bureau" value="crif_json" disabled checked={formData.bureau === 'crif_json'} onChange={e => setFormData({ ...formData, bureau: e.target.value })} className="w-4 h-4 text-brand-blue accent-brand-blue cursor-not-allowed" />
                    <span className="text-sm font-medium text-slate-700">CRIF (Dashboard)</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border rounded-xl cursor-not-allowed transition-all border-slate-200 bg-slate-50 opacity-50">
                    <input type="radio" name="bureau" value="crif_pdf" disabled checked={formData.bureau === 'crif_pdf'} onChange={e => setFormData({ ...formData, bureau: e.target.value })} className="w-4 h-4 text-brand-blue accent-brand-blue cursor-not-allowed" />
                    <span className="text-sm font-medium text-slate-700">CRIF (PDF)</span>
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
                  By continuing, I consent and authorize Credit Expert India to securely retrieve my credit report from the credit bureau.
                </span>
              </label>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <button
                onClick={handleFetchReport}
                disabled={loading}
                className="w-full mt-6 bg-brand-blue text-white py-4 rounded-xl font-bold shadow-lg shadow-brand-blue/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Fetch Credit Report</span>}
                {!loading && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        );

      case 6:
        const isEquifax = formData.bureau.startsWith("v2");
        const isCrif = formData.bureau.startsWith("crif");
        const isExperian = formData.bureau.startsWith("experian");

        const parsed = parseBureauData(formData.bureau, cibilData);
        let { accountSummary, inquirySummary, accounts, enquiries, personalInfo: equifaxPersonalInfo } = parsed;

        const safeAccounts = accounts || [];
        // A closed loan is exactly one that has 0 or less balance left
        const closedAccounts = safeAccounts.filter((a: any) => Number(a.currentBalance) <= 0);
        const activeAccounts = [...safeAccounts.filter((a: any) => !closedAccounts.includes(a)), ...manualLoans];

        // Call Eligibility Engine
        const baseMonthly = Number(userOverrides.netSalary) || Number(formData.monthlyIncome) || 50000;
        const avgYearlyBonus = Number(userOverrides.yearlyBonus) || 0;
        const effectiveNetSalary = baseMonthly + (avgYearlyBonus / 12);

        const engineProfile = {
          netSalary: effectiveNetSalary,
          employer: userOverrides.employer || formData.employer || "Unknown",
          employerTier: userOverrides.companyCategory || null,
          hasBounce: userOverrides.hasBounce || "no",
          hasLatePayment: userOverrides.hasLatePayment || "no",
          hasActiveOverdue: userOverrides.hasActiveOverdue || ((accountSummary?.overdueAccounts || 0) > 0 ? "yes" : "no"),
          wantsTopUp: userOverrides.wantsTopUp || "no"
        };

        const mappedAccounts = activeAccounts.map((acc: any) => {
          const overrides = loanOverrides[acc.accountNumber] || {};
          return {
            id: acc.accountNumber,
            originalType: acc.accountType || "Unknown",
            type: overrides.type !== undefined ? overrides.type : (
              (acc.accountType || "").includes("Personal") ? "Personal Loan" :
                (acc.accountType || "").includes("Credit") ? "Credit Card" :
                  (acc.accountType || "").includes("Overdraft") ? "Overdraft" : "Unknown"
            ),
            wantsBT: overrides.wantsBT !== undefined ? overrides.wantsBT : "no",
            userPaysEmi: overrides.userPaysEmi !== undefined ? overrides.userPaysEmi : true,
            originalAmount: overrides.originalAmount !== undefined ? overrides.originalAmount : (acc.highCreditAmount || 0),
            currentOutstanding: overrides.currentOutstanding !== undefined ? overrides.currentOutstanding : (acc.currentBalance || 0),
            rate: overrides.rate !== undefined ? overrides.rate : (acc.interest_rate || 0),
            emi: overrides.emi !== undefined ? overrides.emi : (acc.emiAmount || 0),
            bankName: overrides.bankName !== undefined ? overrides.bankName : (acc.memberShortName || "Unknown Lender"),
            dateOpened: overrides.dateOpened !== undefined ? overrides.dateOpened : (acc.dateOpened || "N/A"),
            tenure: overrides.tenure !== undefined ? overrides.tenure : (acc.repaymentTenure || "N/A"),
            odPlan: overrides.odPlan !== undefined ? overrides.odPlan : "2yr"
          };
        });

        const catBLoans = mappedAccounts.filter((l: any) => l.wantsBT === 'yes' && Number(l.currentOutstanding) > 0);

        const { eligibleLenders, ineligibleLenders } = analyzeLenderEligibility({ profile: engineProfile, catBLoans });

        const totalActiveEMI = activeAccounts.reduce((sum: number, acc: any) => {
          const overrides = loanOverrides[acc.accountNumber] || {};
          const wantsBT = overrides.wantsBT !== undefined ? overrides.wantsBT : "no";
          const userPaysEmi = overrides.userPaysEmi !== undefined ? overrides.userPaysEmi : true;
          const currentOutstanding = overrides.currentOutstanding !== undefined ? overrides.currentOutstanding : (acc.currentBalance || 0);

          // If balance is 0 or less, assume not used/completed, don't count EMI
          if (Number(currentOutstanding) <= 0 || !userPaysEmi || wantsBT === 'yes') {
            return sum;
          }

          const emi = overrides.emi !== undefined ? Number(overrides.emi) : (Number(acc.emiAmount) || 0);
          return sum + emi;
        }, 0);

        const netSalary = (Number(userOverrides.netSalary) || Number(formData.monthlyIncome) || 0) + ((Number(userOverrides.yearlyBonus) || 0) / 12);
        const maxEmiCapacity = netSalary * 0.7;
        const unusedEmiCapacity = Math.max(0, maxEmiCapacity - totalActiveEMI);
        const topUpTenure = Number(userOverrides.topUpTenure) || 5;
        const topUpRoi = Number(userOverrides.topUpRoi) || 12;

        let maxFreshLoanAmount = 0;
        if (topUpTenure > 0 && unusedEmiCapacity > 0) {
          const r = topUpRoi / 12 / 100;
          const n = topUpTenure * 12;
          maxFreshLoanAmount = r > 0 ? unusedEmiCapacity * ((1 - Math.pow(1 + r, -n)) / r) : unusedEmiCapacity * n;
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
                      { label: "Outstanding Balance", value: accountSummary?.currentBalance ? `₹${Number(accountSummary.currentBalance).toLocaleString('en-IN')}` : '₹0' },
                      { label: "Total Loans Taken Till Date", value: accountSummary?.highCreditAmount ? `₹${Number(accountSummary.highCreditAmount).toLocaleString('en-IN')}` : '₹0' },
                      { label: "Overdue", value: accountSummary?.overdueBalance ? `₹${Number(accountSummary.overdueBalance).toLocaleString('en-IN')}` : '₹0' },
                      { label: "Overdue Accounts", value: accountSummary?.overdueAccounts || 0 },
                      { label: "Closed Accounts", value: accountSummary?.zeroBalanceAccounts || 0 }
                    ].map((stat, i) => (
                      <div key={i} className="bg-[#FAF8F5] border border-[#EBE6DD] rounded-2xl p-4">
                        <p className="text-[#8B7C73] text-xs font-semibold mb-1">{stat.label}</p>
                        <p className="text-[#382F2A] font-extrabold text-sm">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}


              {/* Dashboard Tabs */}
              <div className="flex bg-slate-100 p-1 rounded-xl mb-6 overflow-x-auto no-scrollbar">
                {[
                  { id: 'enquiries', label: 'Recent Enquiries' },
                  { id: 'ongoing', label: 'Ongoing Loans' },
                  { id: 'closed', label: 'Closed Loans' },
                  { id: 'eligibility', label: 'Eligibility Check' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setDashboardTab(tab.id as any)}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg whitespace-nowrap transition-all ${dashboardTab === tab.id ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {dashboardTab === 'enquiries' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {/* Enquiries Summary */}
                  {inquirySummary && (
                    <div className="bg-[#FAF8F5] border border-[#EBE6DD] rounded-3xl p-5 mb-6">
                      <h4 className="text-sm font-extrabold text-[#382F2A] mb-4">Credit Enquiries</h4>
                      <div className="flex items-center justify-between gap-2 text-center border-b border-[#EBE6DD] pb-4 mb-4">
                        <div>
                          <p className="text-xl font-bold text-[#382F2A]">{inquirySummary?.totalInquiry || 0}</p>
                          <p className="text-[10px] uppercase tracking-wider font-semibold text-[#8B7C73]">Total</p>
                        </div>
                        {inquirySummary?.inquiryPast30Days !== undefined && (
                          <>
                            <div className="w-px h-8 bg-[#EBE6DD]"></div>
                            <div>
                              <p className="text-xl font-bold text-[#382F2A]">{inquirySummary?.inquiryPast30Days || 0}</p>
                              <p className="text-[10px] uppercase tracking-wider font-semibold text-[#8B7C73]">30 Days</p>
                            </div>
                          </>
                        )}
                        {inquirySummary?.inquiryPast12Months !== undefined && (
                          <>
                            <div className="w-px h-8 bg-[#EBE6DD]"></div>
                            <div>
                              <p className="text-xl font-bold text-[#382F2A]">{inquirySummary?.inquiryPast12Months || 0}</p>
                              <p className="text-[10px] uppercase tracking-wider font-semibold text-[#8B7C73]">12 Mos</p>
                            </div>
                          </>
                        )}
                        {inquirySummary?.inquiryPast24Months !== undefined && (
                          <>
                            <div className="w-px h-8 bg-[#EBE6DD]"></div>
                            <div>
                              <p className="text-xl font-bold text-[#382F2A]">{inquirySummary?.inquiryPast24Months || 0}</p>
                              <p className="text-[10px] uppercase tracking-wider font-semibold text-[#8B7C73]">24 Mos</p>
                            </div>
                          </>
                        )}
                      </div>
                      <p className="text-[11px] text-[#8B7C73] leading-relaxed">
                        <span className="font-bold text-[#382F2A]">Note:</span> Frequent credit enquiries can be one factor considered in credit assessment. The impact depends on the overall credit profile.
                      </p>
                    </div>
                  )}


                  {/* Enquiries List */}
                  {enquiries && enquiries.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-[#382F2A] mb-4">Recent Enquiries</h4>
                      <div className="space-y-3">
                        {enquiries.map((enq: any, i: number) => (
                          <div key={i} className="bg-white border border-[#EBE6DD] rounded-2xl p-4 shadow-sm flex items-center justify-between">
                            <div className="text-left">
                              <p className="text-sm font-bold text-[#382F2A]">{enq.memberShortName || 'Unknown Lender'}</p>
                              <p className="text-xs font-semibold text-[#8B7C73] mt-0.5">Date: {enq.enquiryDate || 'N/A'}</p>
                            </div>
                            <div className="text-right">
                              {Number(enq.enquiryAmount) > 0 && (
                                <>
                                  <p className="text-sm font-bold text-[#382F2A]">₹{Number(enq.enquiryAmount).toLocaleString('en-IN')}</p>
                                  <p className="text-[10px] font-semibold text-[#8B7C73] uppercase tracking-wider mt-0.5">Amount</p>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}


                </motion.div>
              )}

              {dashboardTab === 'ongoing' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {/* Accounts List */}
                  {activeAccounts && activeAccounts.length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold text-[#382F2A] mb-4">Ongoing Loans</h4>
                      <div className="space-y-3">
                        {activeAccounts.map((acc: any, i: number) => {
                          const isExpanded = expandedAccount === acc.accountNumber;
                          return (
                            <div key={i} className="bg-white border border-[#EBE6DD] rounded-2xl overflow-hidden transition-all shadow-sm">
                              <div className="w-full flex items-center justify-between p-4 bg-[#FAF8F5] border-b border-[#EBE6DD]">
                                <div className="text-left">
                                  <p className="text-sm font-bold text-[#382F2A]">{acc.memberShortName || 'Unknown Lender'}</p>
                                  <p className="text-xs font-semibold text-[#8B7C73] mt-0.5">{acc.accountType || 'Unknown Type'}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="text-right">
                                    <p className="text-sm font-bold text-[#382F2A]">₹{Number(acc.currentBalance || 0).toLocaleString('en-IN')}</p>
                                    <p className="text-[10px] font-semibold text-[#8B7C73] uppercase tracking-wider mt-0.5">Balance</p>
                                  </div>
                                </div>
                              </div>

                              <div className="p-4 grid grid-cols-2 gap-y-4 gap-x-2 bg-white">
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
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}


                  {(!activeAccounts || activeAccounts.length === 0) && (
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
                      <p className="text-sm font-medium text-slate-500">No ongoing loans found.</p>
                    </div>
                  )}
                </motion.div>
              )}

              {dashboardTab === 'closed' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {/* Accounts List */}
                  {closedAccounts && closedAccounts.length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold text-[#382F2A] mb-4">Closed Loans</h4>
                      <div className="space-y-3">
                        {closedAccounts.map((acc: any, i: number) => {
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


                  {(!closedAccounts || closedAccounts.length === 0) && (
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
                      <p className="text-sm font-medium text-slate-500">No closed loans found.</p>
                    </div>
                  )}
                </motion.div>
              )}

              {dashboardTab === 'eligibility' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {/* Equifax Personal Info (Fallback) */}
                  {(isEquifax || isCrif) && (
                    <div className="bg-[#FAF8F5] border border-[#EBE6DD] rounded-3xl p-5 mb-6">
                      <h4 className="text-sm font-extrabold text-[#382F2A] mb-4">{isEquifax ? 'Equifax' : 'CRIF'} Profile Data</h4>
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
                          {isEquifax ? 'Equifax' : 'CRIF'} does not return detailed credit accounts in their JSON response.
                          <br />Please use the <strong>{isEquifax ? 'Equifax' : 'CRIF'} (PDF)</strong> option to view full account details.
                        </p>
                      </div>
                    </div>
                  )}



                  {/* Profile Edit & Open Loans Form */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-[#382F2A] mb-4">Complete Profile for Accurate Eligibility</h4>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-slate-600 mb-1 flex justify-between items-center">
                            <span>Net Monthly Salary</span>
                            <div className="flex items-center gap-2 text-[10px] font-bold">
                              <span className={`px-2 py-0.5 rounded-full ${totalActiveEMI > maxEmiCapacity ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
                                Used EMI: ₹{totalActiveEMI.toLocaleString('en-IN')}
                              </span>
                              <span className="bg-blue-50 text-brand-blue px-2 py-0.5 rounded-full">
                                Max EMI: ₹{maxEmiCapacity.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                              </span>
                            </div>
                          </label>
                          <input
                            type="number"
                            value={userOverrides.netSalary || formData.monthlyIncome || ""}
                            onChange={e => setUserOverrides({ ...userOverrides, netSalary: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:border-brand-blue outline-none"
                            placeholder="e.g. 50000"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-600 mb-1 block">
                            Average Yearly Bonus
                          </label>
                          <input
                            type="number"
                            value={userOverrides.yearlyBonus || ""}
                            onChange={e => setUserOverrides({ ...userOverrides, yearlyBonus: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:border-brand-blue outline-none"
                            placeholder="e.g. 100000"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-600 mb-1 block">Company Category</label>
                          <select
                            value={userOverrides.companyCategory || ""}
                            onChange={e => setUserOverrides({ ...userOverrides, companyCategory: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:border-brand-blue outline-none"
                          >
                            <option value="">Auto-detect from Name</option>
                            <option value="A+">Super Cat A (A+)</option>
                            <option value="A">Cat A (A)</option>
                            <option value="B">Cat B (B)</option>
                            <option value="C">Cat C (C)</option>
                            <option value="D">Cat D (D)</option>
                            <option value="E">Cat E (E)</option>
                          </select>
                        </div>
                        <div ref={employerDropdownRef} className="relative z-10">
                          <label className="text-xs font-semibold text-slate-600 mb-1 block">Employer</label>
                          <div className="relative">
                            <input
                              type="text"
                              value={employerSearch || userOverrides.employer || formData.employer || ""}
                              onChange={e => {
                                setEmployerSearch(e.target.value);
                                setShowEmployerDropdown(true);
                                setUserOverrides({ ...userOverrides, employer: e.target.value });
                              }}
                              onFocus={() => setShowEmployerDropdown(true)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:border-brand-blue outline-none"
                              placeholder="Search your company..."
                              autoComplete="off"
                            />
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          </div>

                          <AnimatePresence>
                            {showEmployerDropdown && (
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                transition={{ duration: 0.1 }}
                                className="absolute top-full left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-1"
                              >
                                {isSearchingEmployer ? (
                                  <div className="px-4 py-3 text-sm text-slate-500">Searching database...</div>
                                ) : asyncEmployers.length > 0 ? (
                                  asyncEmployers.map(e => (
                                    <div
                                      key={e}
                                      onClick={() => {
                                        setEmployerSearch(e);
                                        setUserOverrides({ ...userOverrides, employer: e });
                                        setShowEmployerDropdown(false);
                                      }}
                                      className="px-4 py-2 text-sm text-slate-700 cursor-pointer hover:bg-slate-50 border-b border-slate-50 last:border-0"
                                    >
                                      {e}
                                    </div>
                                  ))
                                ) : (
                                  <div className="px-4 py-3 text-sm text-slate-500">Type to specify company</div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-600 mb-1 block">Any EMI Bounce (6M)?</label>
                          <select
                            value={userOverrides.hasBounce || "no"}
                            onChange={e => setUserOverrides({ ...userOverrides, hasBounce: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:border-brand-blue outline-none"
                          >
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Fresh Loan / Top-Up Requirement */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-bold text-slate-700">Do you want a Fresh Loan / Top-Up?</label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-1 text-sm cursor-pointer">
                            <input
                              type="radio"
                              name="wantsTopUp"
                              value="yes"
                              checked={userOverrides.wantsTopUp === 'yes'}
                              onChange={e => setUserOverrides({ ...userOverrides, wantsTopUp: e.target.value })}
                              className="accent-brand-blue"
                            /> Yes
                          </label>
                          <label className="flex items-center gap-1 text-sm cursor-pointer">
                            <input
                              type="radio"
                              name="wantsTopUp"
                              value="no"
                              checked={(userOverrides.wantsTopUp || 'no') === 'no'}
                              onChange={e => setUserOverrides({ ...userOverrides, wantsTopUp: e.target.value })}
                              className="accent-brand-blue"
                            /> No
                          </label>
                        </div>
                      </div>

                      {userOverrides.wantsTopUp === 'yes' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 pt-4 border-t border-slate-200">
                          <div className="space-y-4">
                            <div>
                              <label className="text-xs font-semibold text-slate-600 mb-1 block">Expected Tenure (Years)</label>
                              <input
                                type="number"
                                value={userOverrides.topUpTenure ?? 5}
                                onChange={e => setUserOverrides({ ...userOverrides, topUpTenure: e.target.value })}
                                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:border-brand-blue outline-none"
                                min={1}
                                max={30}
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-slate-600 mb-1 block">Expected ROI (% p.a.)</label>
                              <input
                                type="number"
                                value={userOverrides.topUpRoi ?? 12}
                                onChange={e => setUserOverrides({ ...userOverrides, topUpRoi: e.target.value })}
                                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:border-brand-blue outline-none"
                                step="0.1"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-slate-600 mb-1 block">Required Loan Amount (₹)</label>
                              <input
                                type="number"
                                value={userOverrides.topUpAmount ?? ""}
                                onChange={e => setUserOverrides({ ...userOverrides, topUpAmount: e.target.value })}
                                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:border-brand-blue outline-none"
                                placeholder={`Max: ₹${Math.floor(maxFreshLoanAmount).toLocaleString('en-IN')}`}
                              />
                            </div>
                          </div>

                          <div className="bg-white border border-brand-blue p-4 rounded-xl flex flex-col justify-center">
                            <p className="text-xs text-slate-500 mb-1">Maximum Eligible Fresh Loan Amount:</p>
                            <p className="text-2xl font-bold text-brand-blue mb-2">₹{Math.floor(maxFreshLoanAmount).toLocaleString('en-IN')}</p>
                            <p className="text-xs text-slate-600">
                              Based on your unused EMI capacity of <strong>₹{Math.floor(unusedEmiCapacity).toLocaleString('en-IN')} / mo</strong>.
                            </p>
                            {Number(userOverrides.topUpAmount) > maxFreshLoanAmount && (
                              <p className="text-xs text-red-500 mt-2 font-semibold">
                                Error: Required amount exceeds maximum eligible limit.
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <h4 className="text-lg font-bold text-[#382F2A] mb-4">Review Open Loans</h4>
                    <div className="space-y-4 mb-8">
                      {mappedAccounts.length === 0 && <p className="text-sm text-slate-500">No active loans found to evaluate.</p>}
                      {mappedAccounts.map((loan: any, idx: number) => {
                        const l = loanOverrides[loan.id] || {};
                        return (
                          <div key={loan.id} className="bg-white border border-[#EBE6DD] rounded-2xl p-4 shadow-sm">
                            <div className="flex justify-between items-center mb-3 border-b border-slate-100 pb-2">
                              <div className="flex items-center gap-2">
                                <p className="font-bold text-sm text-[#382F2A]">Loan #{idx + 1} - {loan.originalType}</p>
                              </div>
                              <div className="flex items-center gap-4">
                                <label className="text-xs font-semibold flex items-center gap-1.5 cursor-pointer text-slate-600">
                                  <input
                                    type="checkbox"
                                    checked={loan.wantsBT === 'yes'}
                                    onChange={e => setLoanOverrides((prev: any) => ({ ...prev, [loan.id]: { ...(prev[loan.id] || {}), wantsBT: e.target.checked ? 'yes' : 'no' } }))}
                                    className="w-4 h-4 text-brand-blue accent-brand-blue rounded border-slate-300"
                                  />
                                  Consolidate?
                                </label>
                                <label className="text-xs font-semibold flex items-center gap-1.5 cursor-pointer text-slate-600">
                                  <input
                                    type="checkbox"
                                    checked={loan.userPaysEmi !== false}
                                    onChange={e => setLoanOverrides((prev: any) => ({ ...prev, [loan.id]: { ...(prev[loan.id] || {}), userPaysEmi: e.target.checked } }))}
                                    className="w-4 h-4 text-brand-blue accent-brand-blue rounded border-slate-300"
                                  />
                                  I pay this EMI
                                </label>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              <div>
                                <label className="text-[10px] uppercase font-bold text-[#8B7C73]">Bank / NBFC</label>
                                <input
                                  type="text"
                                  value={loan.bankName ?? ""}
                                  onChange={e => setLoanOverrides((prev: any) => ({ ...prev, [loan.id]: { ...(prev[loan.id] || {}), bankName: e.target.value } }))}
                                  className="w-full bg-[#FAF8F5] border border-[#EBE6DD] rounded-lg px-2 py-1.5 text-xs outline-none focus:border-brand-blue"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] uppercase font-bold text-[#8B7C73]">Type</label>
                                <select
                                  value={loan.type ?? "Personal Loan"}
                                  onChange={e => setLoanOverrides((prev: any) => ({ ...prev, [loan.id]: { ...(prev[loan.id] || {}), type: e.target.value } }))}
                                  className="w-full bg-[#FAF8F5] border border-[#EBE6DD] rounded-lg px-2 py-1.5 text-xs outline-none focus:border-brand-blue"
                                >
                                  <optgroup label="Generally Non-Transferable (Category A)">
                                    {['Car Loan', 'Home Loan', 'LAP', 'Gold Loan', 'Consumer Loan'].map(t => <option key={t} value={t}>{t}</option>)}
                                  </optgroup>
                                  <optgroup label="Potentially Transferable (Category B)">
                                    {['Personal Loan', 'Overdraft', 'App Loan', 'Credit Card'].map(t => <option key={t} value={t}>{t}</option>)}
                                  </optgroup>
                                  <option value="Unknown">Unknown</option>
                                </select>
                              </div>
                              <div>
                                <label className="text-[10px] uppercase font-bold text-[#8B7C73]">{loan.type === 'Overdraft' ? 'Amount Drawn' : 'Orig. Amount'}</label>
                                <input
                                  type="number"
                                  value={loan.originalAmount ?? ""}
                                  onChange={e => setLoanOverrides((prev: any) => ({ ...prev, [loan.id]: { ...(prev[loan.id] || {}), originalAmount: e.target.value } }))}
                                  disabled={loan.type === 'Credit Card' || loan.type === 'Gold Loan'}
                                  className="w-full bg-[#FAF8F5] border border-[#EBE6DD] rounded-lg px-2 py-1.5 text-xs outline-none focus:border-brand-blue disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] uppercase font-bold text-[#8B7C73]">Current Bal.</label>
                                <input
                                  type="number"
                                  value={loan.currentOutstanding ?? ""}
                                  onChange={e => setLoanOverrides((prev: any) => ({ ...prev, [loan.id]: { ...(prev[loan.id] || {}), currentOutstanding: e.target.value } }))}
                                  className="w-full bg-[#FAF8F5] border border-[#EBE6DD] rounded-lg px-2 py-1.5 text-xs outline-none focus:border-brand-blue"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] uppercase font-bold text-[#8B7C73]">Date Issue</label>
                                <input
                                  type="text"
                                  value={loan.dateOpened ?? ""}
                                  onChange={e => setLoanOverrides((prev: any) => ({ ...prev, [loan.id]: { ...(prev[loan.id] || {}), dateOpened: e.target.value } }))}
                                  disabled={loan.type === 'Credit Card' || loan.type === 'Gold Loan'}
                                  className="w-full bg-[#FAF8F5] border border-[#EBE6DD] rounded-lg px-2 py-1.5 text-xs outline-none focus:border-brand-blue disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] uppercase font-bold text-[#8B7C73]">{loan.type === 'Overdraft' ? 'OD Plan' : 'Tenure (Mos)'}</label>
                                {loan.type === 'Overdraft' ? (
                                  <select
                                    value={loan.odPlan ?? "2yr"}
                                    onChange={e => setLoanOverrides((prev: any) => ({ ...prev, [loan.id]: { ...(prev[loan.id] || {}), odPlan: e.target.value } }))}
                                    className="w-full bg-[#FAF8F5] border border-[#EBE6DD] rounded-lg px-2 py-1.5 text-xs outline-none focus:border-brand-blue"
                                  >
                                    <option value="2yr">2 Years</option>
                                    <option value="3yr">3 Years</option>
                                  </select>
                                ) : (
                                  <input
                                    type="number"
                                    value={loan.tenure ?? ""}
                                    onChange={e => setLoanOverrides((prev: any) => ({ ...prev, [loan.id]: { ...(prev[loan.id] || {}), tenure: e.target.value } }))}
                                    disabled={loan.type === 'Credit Card' || loan.type === 'Gold Loan'}
                                    className="w-full bg-[#FAF8F5] border border-[#EBE6DD] rounded-lg px-2 py-1.5 text-xs outline-none focus:border-brand-blue disabled:opacity-50 disabled:cursor-not-allowed"
                                  />
                                )}
                              </div>
                              <div>
                                <label className="text-[10px] uppercase font-bold text-[#8B7C73]">EMI</label>
                                <input
                                  type="number"
                                  value={loan.emi ?? ""}
                                  onChange={e => setLoanOverrides((prev: any) => ({ ...prev, [loan.id]: { ...(prev[loan.id] || {}), emi: e.target.value } }))}
                                  className="w-full bg-[#FAF8F5] border border-[#EBE6DD] rounded-lg px-2 py-1.5 text-xs outline-none focus:border-brand-blue"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] uppercase font-bold text-[#8B7C73]">Rate %</label>
                                <input
                                  type="number"
                                  value={loan.rate ?? ""}
                                  onChange={e => setLoanOverrides((prev: any) => ({ ...prev, [loan.id]: { ...(prev[loan.id] || {}), rate: e.target.value } }))}
                                  disabled={loan.type === 'Credit Card' || loan.type === 'Gold Loan'}
                                  className="w-full bg-[#FAF8F5] border border-[#EBE6DD] rounded-lg px-2 py-1.5 text-xs outline-none focus:border-brand-blue disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                              </div>
                            </div>
                          </div>
                        )
                      })}
                      
                      <button 
                        onClick={() => setManualLoans([...manualLoans, { accountNumber: 'manual_' + Date.now(), accountType: 'Personal Loan', currentBalance: 0, highCreditAmount: 0, memberShortName: '', interest_rate: 0, emiAmount: 0 }])}
                        className="mt-4 flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-semibold hover:border-brand-blue hover:text-brand-blue transition-colors"
                      >
                        <Plus className="w-4 h-4" /> Add Missing Loan
                      </button>
                    </div>
                  </div>

                  {/* Eligibility Engine Results */}

                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-[#382F2A] mb-4">Eligible Consolidation Options</h4>
                    {eligibleLenders.length > 0 ? (
                      <div className="space-y-4">
                        {(() => {
                          const bestLender = eligibleLenders[0];
                          const consolidationAmount = catBLoans.reduce((sum: number, l: any) => sum + Number(l.currentOutstanding || 0), 0);
                          const currentEmiToConsolidate = catBLoans.reduce((sum: number, l: any) => sum + Number(l.emi || 0), 0);
                          const totalNewLoan = consolidationAmount + (userOverrides.wantsTopUp === 'yes' ? Number(userOverrides.topUpAmount || 0) : 0);

                          const ratePerMonth = (bestLender.headlineRate || 12) / 12 / 100;
                          const tenureMonths = bestLender.maxTenure || 60;
                          const newEmi = Math.round(
                            (totalNewLoan * ratePerMonth * Math.pow(1 + ratePerMonth, tenureMonths)) /
                            (Math.pow(1 + ratePerMonth, tenureMonths) - 1)
                          ) || 0;

                          const emiSavings = currentEmiToConsolidate - newEmi;

                          if (totalNewLoan === 0) {
                            return (
                              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-2 shadow-sm text-center">
                                <p className="text-sm font-medium text-slate-600">
                                  Select at least one loan to consolidate from the &quot;Review Open Loans&quot; section above, or request a fresh loan, to see your estimated savings.
                                </p>
                              </div>
                            );
                          }
                          return (
                            <div className="bg-[#FAF8F5] border border-[#EBE6DD] rounded-2xl p-5 mb-2 shadow-sm">
                              <h4 className="text-sm font-extrabold text-[#382F2A] mb-4 flex items-center justify-between">
                                <span>Consolidation Estimate (Best Option: {bestLender.name})</span>
                                <span className="text-xs font-semibold text-brand-blue bg-blue-50 px-2 py-1 rounded-md">{bestLender.headlineRate}% p.a.</span>
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white border border-slate-100 p-3 rounded-xl">
                                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Total New Loan</p>
                                  <p className="text-xl font-black text-[#382F2A] mt-1">₹{totalNewLoan.toLocaleString('en-IN')}</p>
                                  {userOverrides.wantsTopUp === 'yes' && Number(userOverrides.topUpAmount || 0) > 0 && (
                                    <p className="text-[10px] text-slate-500 mt-1">Includes ₹{Number(userOverrides.topUpAmount).toLocaleString('en-IN')} Top-up</p>
                                  )}
                                </div>
                                <div className="bg-white border border-slate-100 p-3 rounded-xl">
                                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Est. New EMI</p>
                                  <p className="text-xl font-black text-[#382F2A] mt-1">₹{newEmi.toLocaleString('en-IN')}</p>
                                  <p className="text-[10px] text-slate-500 mt-1">For {tenureMonths} months</p>
                                </div>
                                <div className={`border p-3 rounded-xl ${emiSavings >= 0 ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                                  <p className={`text-[10px] uppercase tracking-wider font-bold ${emiSavings >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                                    {emiSavings >= 0 ? 'EMI Savings' : 'Extra EMI'}
                                  </p>
                                  <p className={`text-xl font-black mt-1 ${emiSavings >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {emiSavings >= 0 ? '↓' : '↑'} ₹{Math.abs(emiSavings).toLocaleString('en-IN')}
                                  </p>
                                  <p className={`text-[10px] mt-1 ${emiSavings >= 0 ? 'text-emerald-600/80' : 'text-red-600/80'}`}>
                                    vs current consolidated EMI
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })()}

                        {eligibleLenders.map((lender: any, i: number) => (
                          <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
                            <div>
                              <p className="text-sm font-bold text-emerald-900">{lender.name}</p>
                              <p className="text-xs font-semibold text-emerald-700 mt-0.5">Est. Rate: {lender.headlineRate}%</p>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] font-bold px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full uppercase">
                                {lender.outcome === 'ELIGIBLE' ? 'High Match' : 'Conditional'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
                        <p className="text-sm font-medium text-amber-800">
                          Based on this initial data, standard consolidation options require deeper review.
                        </p>
                      </div>
                    )}

                    {ineligibleLenders.length > 0 && (
                      <div className="mt-8">
                        <h4 className="text-sm font-bold text-[#382F2A] mb-3">Lenders Not Currently Eligible</h4>
                        <div className="space-y-3">
                          {ineligibleLenders.map((lender: any, i: number) => (
                            <div key={i} className="bg-red-50/50 border border-red-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div>
                                <p className="text-sm font-bold text-red-900">{lender.name}</p>
                                <p className="text-xs font-semibold text-red-700 mt-0.5">Est. Rate: {lender.headlineRate}%</p>
                              </div>
                              <div className="text-left sm:text-right flex-1 sm:max-w-[60%]">
                                {lender.reasons && lender.reasons.length > 0 ? (
                                  <ul className="text-[11px] text-red-800 list-disc list-inside sm:text-right space-y-0.5">
                                    {lender.reasons.map((reason: string, rIdx: number) => (
                                      <li key={rIdx} className="leading-tight">{reason}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  <span className="text-[11px] text-red-800">Does not meet policy requirements</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>


                </motion.div>
              )}

            </div>
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
        <div className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          {step === 1 && (
            <div className="flex items-center justify-center gap-2 pt-8 text-xs text-slate-400">
              <Shield className="w-3.5 h-3.5" />
              <span>Your information is secure and never shared without consent.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
