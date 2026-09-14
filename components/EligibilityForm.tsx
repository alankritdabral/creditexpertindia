"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Plus, Trash2, User, Phone, Mail, MapPin, Briefcase, Building2, Shield, CreditCard, Loader2, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { collection, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { analyzeLenderEligibility } from "@/lib/lenderEngine";
export function EligibilityForm() {
  const [step, setStep] = useState(1);
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
  const [dashboardTab, setDashboardTab] = useState<"enquiries" | "ongoing" | "closed" | "eligibility">("enquiries");
  const [userOverrides, setUserOverrides] = useState<any>({});
  const [loanOverrides, setLoanOverrides] = useState<any>({});

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
        
        let accountSummary = null;
        let inquirySummary = null;
        let accounts = null;
        let enquiries = null;
        let equifaxPersonalInfo = null;

        if (!isEquifax) {
          const report = cibilData?.credit_report?.[0];
          const consumerSummary = report?.response?.consumerSummaryresp;
          accountSummary = consumerSummary?.accountSummary;
          inquirySummary = consumerSummary?.inquirySummary;
          accounts = report?.accounts;
          enquiries = report?.enquiries;
        } else {
          // Equifax JSON parsing
          const cirDataList = cibilData?.credit_report?.CCRResponse?.CIRReportDataLst || [];
          const firstCirData = cirDataList[0]?.CIRReportData;
          equifaxPersonalInfo = firstCirData?.IDAndContactInfo?.PersonalInfo;
          
          if (cirDataList.length > 0) {
            enquiries = cirDataList.map((item: any) => ({
              memberShortName: item.InquiryResponseHeader?.CustomerName || "Unknown Lender",
              enquiryDate: item.InquiryResponseHeader?.Date || "N/A",
              enquiryAmount: 0 // Equifax JSON doesn't provide an amount here
            }));
            inquirySummary = { totalInquiry: cirDataList.length };
          }
        }

        const safeAccounts = accounts || [];
        // Assuming dateClosed indicates closed, or balance 0
        const closedAccounts = safeAccounts.filter((a: any) => a.dateClosed || (Number(a.currentBalance) === 0));
        const activeAccounts = safeAccounts.filter((a: any) => !closedAccounts.includes(a));

        // Call Eligibility Engine
        const engineProfile = {
          netSalary: Number(userOverrides.netSalary) || Number(formData.monthlyIncome) || 50000,
          employer: userOverrides.employer || formData.employer || "Unknown",
          hasBounce: userOverrides.hasBounce || "no",
          hasLatePayment: userOverrides.hasLatePayment || "no",
          hasActiveOverdue: userOverrides.hasActiveOverdue || ((accountSummary?.overdueAccounts || 0) > 0 ? "yes" : "no"),
          wantsTopUp: userOverrides.wantsTopUp || "no"
        };
        
        const catBLoans = activeAccounts.map((acc: any) => {
          const overrides = loanOverrides[acc.accountNumber] || {};
          return {
            id: acc.accountNumber,
            type: overrides.type || (
              (acc.accountType || "").includes("Personal") ? "Personal Loan" :
              (acc.accountType || "").includes("Credit") ? "Credit Card" :
              (acc.accountType || "").includes("Overdraft") ? "Overdraft" : "Unknown"
            ),
            wantsBT: overrides.wantsBT || "yes",
            originalAmount: overrides.originalAmount || acc.highCreditAmount || 0,
            currentOutstanding: overrides.currentOutstanding || acc.currentBalance || 0,
            rate: overrides.rate || acc.interest_rate || 0,
            emi: overrides.emi || acc.emiAmount || 0
          };
        }).filter((l: any) => l.wantsBT === 'yes');
        
        const { eligibleLenders, ineligibleLenders } = analyzeLenderEligibility({ profile: engineProfile, catBLoans });


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

              
                  
                  {/* Profile Edit & Open Loans Form */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-[#382F2A] mb-4">Complete Profile for Accurate Eligibility</h4>
                    
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-slate-600 mb-1 block">Net Monthly Salary</label>
                          <input 
                            type="number" 
                            value={userOverrides.netSalary || formData.monthlyIncome || ""} 
                            onChange={e => setUserOverrides({...userOverrides, netSalary: e.target.value})} 
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:border-brand-blue outline-none"
                            placeholder="e.g. 50000"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-600 mb-1 block">Employer</label>
                          <input 
                            type="text" 
                            value={userOverrides.employer || formData.employer || ""} 
                            onChange={e => setUserOverrides({...userOverrides, employer: e.target.value})} 
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:border-brand-blue outline-none"
                            placeholder="e.g. TCS"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-600 mb-1 block">Any EMI Bounce (6M)?</label>
                          <select 
                            value={userOverrides.hasBounce || "no"} 
                            onChange={e => setUserOverrides({...userOverrides, hasBounce: e.target.value})}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:border-brand-blue outline-none"
                          >
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-600 mb-1 block">Want Top-Up Loan?</label>
                          <select 
                            value={userOverrides.wantsTopUp || "no"} 
                            onChange={e => setUserOverrides({...userOverrides, wantsTopUp: e.target.value})}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:border-brand-blue outline-none"
                          >
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-[#382F2A] mb-4">Review Open Loans</h4>
                    <div className="space-y-4 mb-8">
                      {catBLoans.length === 0 && <p className="text-sm text-slate-500">No active loans found to evaluate.</p>}
                      {catBLoans.map((loan: any, idx: number) => {
                        const l = loanOverrides[loan.id] || {};
                        return (
                          <div key={loan.id} className="bg-white border border-[#EBE6DD] rounded-2xl p-4 shadow-sm">
                            <div className="flex justify-between items-center mb-3 border-b border-slate-100 pb-2">
                              <p className="font-bold text-sm text-[#382F2A]">Loan #{idx + 1} ({loan.type})</p>
                              <label className="text-xs font-semibold flex items-center gap-1.5 cursor-pointer text-slate-600">
                                <input 
                                  type="checkbox" 
                                  checked={loan.wantsBT === 'yes'}
                                  onChange={e => setLoanOverrides({...loanOverrides, [loan.id]: {...l, wantsBT: e.target.checked ? 'yes' : 'no'}})}
                                  className="w-4 h-4 text-brand-blue accent-brand-blue rounded border-slate-300"
                                />
                                Consolidate This?
                              </label>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                               <div>
                                 <label className="text-[10px] uppercase font-bold text-[#8B7C73]">EMI</label>
                                 <input 
                                   type="number" 
                                   value={loan.emi || ""} 
                                   onChange={e => setLoanOverrides({...loanOverrides, [loan.id]: {...l, emi: e.target.value}})}
                                   className="w-full bg-[#FAF8F5] border border-[#EBE6DD] rounded-lg px-2 py-1.5 text-xs outline-none focus:border-brand-blue"
                                 />
                               </div>
                               <div>
                                 <label className="text-[10px] uppercase font-bold text-[#8B7C73]">Interest Rate %</label>
                                 <input 
                                   type="number" 
                                   value={loan.rate || ""} 
                                   onChange={e => setLoanOverrides({...loanOverrides, [loan.id]: {...l, rate: e.target.value}})}
                                   className="w-full bg-[#FAF8F5] border border-[#EBE6DD] rounded-lg px-2 py-1.5 text-xs outline-none focus:border-brand-blue"
                                 />
                               </div>
                               <div>
                                 <label className="text-[10px] uppercase font-bold text-[#8B7C73]">Type</label>
                                 <select 
                                   value={loan.type || "Personal Loan"} 
                                   onChange={e => setLoanOverrides({...loanOverrides, [loan.id]: {...l, type: e.target.value}})}
                                   className="w-full bg-[#FAF8F5] border border-[#EBE6DD] rounded-lg px-2 py-1.5 text-xs outline-none focus:border-brand-blue"
                                 >
                                   <option value="Personal Loan">Personal Loan</option>
                                   <option value="Credit Card">Credit Card</option>
                                   <option value="App Loan">App Loan</option>
                                   <option value="Overdraft">Overdraft</option>
                                   <option value="Unknown">Unknown</option>
                                 </select>
                               </div>
                               <div>
                                 <label className="text-[10px] uppercase font-bold text-[#8B7C73]">Current Bal.</label>
                                 <input 
                                   type="number" 
                                   value={loan.currentOutstanding || ""} 
                                   onChange={e => setLoanOverrides({...loanOverrides, [loan.id]: {...l, currentOutstanding: e.target.value}})}
                                   className="w-full bg-[#FAF8F5] border border-[#EBE6DD] rounded-lg px-2 py-1.5 text-xs outline-none focus:border-brand-blue"
                                 />
                               </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Eligibility Engine Results */}

              <div className="mb-6">
                <h4 className="text-lg font-bold text-[#382F2A] mb-4">Eligible Consolidation Options</h4>
                {eligibleLenders.length > 0 ? (
                  <div className="space-y-3">
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
