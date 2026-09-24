"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Plus, Trash2, User, Phone, Mail, MapPin, Briefcase, Building2, Shield, CreditCard, Loader2, AlertCircle, ChevronDown, ChevronUp, Download } from "lucide-react";
import { collection, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { analyzeLenderEligibility } from "@/lib/lenderEngine";
import { searchEmployers, EmployerResult } from "@/lib/employerLookup";
import { parseBureauData } from "@/lib/bureauParsers";
import { CreditReportDashboard } from "./CreditReportDashboard";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { getTeamSession } from "@/app/team/actions";

const getPrefixes = (str: string) => {
  const arr = [];
  for (let i = 1; i <= str.length; i++) arr.push(str.substring(0, i));
  return arr;
};

const generateSearchTokens = (name: string, mobile: string, pan: string) => {
  const tokens = new Set<string>();
  const nameParts = name.toLowerCase().split(' ').filter(Boolean);
  nameParts.forEach(part => getPrefixes(part).forEach(p => tokens.add(p)));
  getPrefixes(name.toLowerCase()).forEach(p => tokens.add(p));
  getPrefixes(mobile).forEach(p => tokens.add(p));
  if (pan) {
    getPrefixes(pan.toLowerCase()).forEach(p => tokens.add(p));
  }
  return Array.from(tokens);
};

export function EligibilityForm() {



  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", mobile: "", email: "", city: "", employmentType: "Salaried",
    monthlyIncome: "", employer: "", salaryMode: "Bank Transfer",
    requirement: "",
    pan: "", dob: "", gender: "male", consent: false, bureau: "experian"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [teamBranch, setTeamBranch] = useState<string | null>(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  useEffect(() => {
    getTeamSession().then(session => {
      if (session) {
        setTeamBranch(session);
        setFormData(prev => ({ ...prev, bureau: "experian" }));
      }
    });

    // Load MSG91 OTP scripts
    const urls = [
      'https://verify.msg91.com/otp-provider.js',
      'https://verify.phone91.com/otp-provider.js'
    ];
    let i = 0;
    function attempt() {
      if (typeof document === 'undefined') return;
      const s = document.createElement('script');
      s.src = urls[i];
      s.async = true;
      s.onerror = () => {
        i++;
        if (i < urls.length) {
          attempt();
        }
      };
      document.head.appendChild(s);
    }
    attempt();
  }, []);

  const [cibilData, setCibilData] = useState<any>(null);
  const [manualLoans, setManualLoans] = useState<any[]>([]);

  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyReports, setHistoryReports] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const fetchBranchHistory = async () => {
    setShowHistoryModal(true);
    setLoadingHistory(true);
    try {
      const res = await fetch(`/api/admin/reports?branch=${teamBranch}`);
      const data = await res.json();
      if (data.success) {
        setHistoryReports(data.reports);
      }
    } catch (e) {
      console.error(e);
    }
    setLoadingHistory(false);
  };





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
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("Please enter both First Name and Last Name.");
      return;
    }
    const isCrifSelected = formData.bureau.startsWith("crif");
    const isExperianSelected = formData.bureau === "experian";

    if (isExperianSelected) {
      if (!formData.dob) {
        setError("Please enter your Date of Birth.");
        return;
      }
    }

    if (!isCrifSelected) {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
      if (!panRegex.test(formData.pan)) {
        setError("Please enter a valid 10-character PAN number.");
        return;
      }
    }
    if (formData.mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setError(null);
    setLoading(true);

    if (!teamBranch) {
      launchOTPWidget();
    } else {
      proceedToFetchReport();
    }
  };

  const launchOTPWidget = () => {
    if (typeof window !== 'undefined' && (window as any).initSendOTP) {
      const configuration = {
        widgetId: "366978693362303433303636",
        tokenAuth: "519332T5zz4zfdtq6ab50388P1",
        identifier: formData.mobile,
        exposeMethods: false,
        success: async (data: any) => {
          console.log("MSG91 Success callback triggered:", data);
          if (data?.type === 'error' || String(data).includes('error') || String(data?.message).includes('error')) {
            setError("OTP Service encountered an error. Please check your mobile number and try again.");
            setLoading(false);
            return;
          }
          const token = data.message || data;
          try {
            const res = await fetch("/api/verify-msg91-otp", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token })
            });
            const vData = await res.json();
            if (vData.success) {
              proceedToFetchReport();
            } else {
              setError("OTP Verification failed. " + (vData.error || ""));
              setLoading(false);
            }
          } catch (e: any) {
            console.error(e);
            setError("OTP Verification error.");
            setLoading(false);
          }
        },
        failure: (error: any) => {
          console.error('OTP failure:', error);
          setError("OTP could not be sent or verified. " + (error?.message || error || ""));
          setLoading(false);
        }
      };
      (window as any).initSendOTP(configuration);
    } else {
      setError("OTP Service is loading or unavailable. Please try again in a few seconds.");
      setLoading(false);
    }
  };

  const proceedToFetchReport = async () => {
    try {
      // 1. Check Database First
      const safePan = formData.pan ? formData.pan.toUpperCase() : "NOPAN";
      const docId = `${safePan}_${formData.mobile}_${formData.bureau}`;
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
                const isExperianCache = formData.bureau.startsWith("experian") || data.bureau?.startsWith("experian");
                const isExperianFailureCache = isExperianCache && !data.raw_api_data.result_json;

                if (isExperianFailureCache) {
                  console.warn("Cached Experian report is corrupted/failed. Attempting CRIF fallback.");
                  // Try to find a CRIF report in cache
                  const crifDocId = `${safePan}_${formData.mobile}_crif_v1`;
                  const crifSnap = await getDoc(doc(db, "credit_reports", crifDocId));
                  if (crifSnap.exists() && crifSnap.data().raw_api_data) {
                    const crifData = crifSnap.data();
                    setFormData((prev: any) => ({ 
                      ...prev, 
                      bureau: "crif_v1", 
                      fallbackWarning: "Notice: Loaded cached CRIF report because Experian had previously failed."
                    }));
                    processFetchedReport(crifData.raw_api_data);
                    setLoading(false);
                    return;
                  }
                  // If CRIF not in cache, skip Experian live call and jump directly to CRIF live call!
                  console.warn("CRIF not in cache. Bypassing live Experian call and directly fetching live CRIF report.");
                  formData.bureau = "crif_v1";
                } else {
                  if (data.bureau && data.bureau !== formData.bureau) {
                    setFormData((prev: any) => ({ ...prev, bureau: data.bureau }));
                  }
                  if (data.fallbackData) {
                    setFormData((prev: any) => ({ ...prev, fallbackWarning: `Notice: Loaded cached CRIF report (Experian fallback: ${data.fallbackData.fallback_reason})` }));
                  }
                  processFetchedReport(data.raw_api_data);
                  setLoading(false);
                  return;
                }
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

      let bodyPayload: any = {};
      if (isCrif) {
        bodyPayload = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          mobile_no: formData.mobile,
          name_lookup: 0
        };
      } else if (isExperian) {
        bodyPayload = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          mobile_no: formData.mobile,
          pan: formData.pan,
          dob: formData.dob
        };
      } else {
        bodyPayload = {
          forename: formData.firstName,
          surname: formData.lastName,
          phone_number: formData.mobile,
          gender: formData.gender === "male" ? "Male" : formData.gender === "female" ? "Female" : "Other",
          pan_id: formData.pan
        };
      }

      // Send the request through our new Next.js API Route which talks to IDSPay
      const initialRes = await fetch("/api/idspay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bureau: formData.bureau, bodyPayload })
      });

      let res = initialRes;
      let data = await res.json();
      let usedBureau = formData.bureau;
      let fallbackData: any = null;

      const isExperianFailure = isExperian && (
        !res.ok || 
        data.status_code === 422 || 
        data.message_code === "mobile_not_match" ||
        (data.status?.type === "success" && !data.data?.result_json)
      );

      if (isExperianFailure) {
        const fallbackReason = data.message || "Experian returned incomplete data or a mismatch.";
        console.warn("Experian failed, falling back to CRIF", fallbackReason);
        
        const crifPayload = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          mobile_no: formData.mobile,
          name_lookup: 0
        };
        
        res = await fetch("/api/idspay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bureau: "crif_v1", bodyPayload: crifPayload })
        });
        
        data = await res.json();
        usedBureau = "crif_v1";
        fallbackData = {
          fallback_from_experian: true,
          fallback_reason: fallbackReason
        };
        
        setFormData((prev: any) => ({ 
          ...prev, 
          bureau: usedBureau,
          fallbackWarning: `Notice: We automatically fetched your CRIF report because Experian encountered an issue (${fallbackReason})`
        }));
      }

      if (!res.ok || (data.status && data.status.type !== "success" && !data.success)) {
        setError(data.message || data.error || "Failed to fetch credit report. Please check your details.");
      } else {
        // Save to Firebase
        try {
          const safePan = formData.pan ? formData.pan.toUpperCase() : "NOPAN";
          const docId = `${safePan}_${formData.mobile}_${formData.bureau}`;

          let extractedScore = data.data?.credit_score;
          if (!extractedScore) {
            const newCrifScore = data.data?.result_json?.parsed_data?.["B2C-REPORT"]?.["REPORT-DATA"]?.["STANDARD-DATA"]?.SCORE?.[0]?.VALUE;
            if (newCrifScore) {
              extractedScore = newCrifScore;
            }
          }
          if (!extractedScore) {
            let rJson = data.data?.result_json;
            console.log("[DEBUG ELIGIBILITY] Raw rJson before DB save:", rJson);
            if (typeof rJson === 'string') {
              try { 
                rJson = JSON.parse(rJson); 
                console.log("[DEBUG ELIGIBILITY] Parsed rJson before DB save:", rJson);
              } catch(e) {}
            }
            const expScore = rJson?.INProfileResponse?.SCORE?.BureauScore || rJson?.INProfileResponse?.Score?.BureauScore;
            console.log("[DEBUG ELIGIBILITY] Extracted expScore:", expScore);
            if (expScore) {
              extractedScore = expScore;
            }
          }

          const fullName = `${formData.firstName} ${formData.lastName}`.trim();
          await setDoc(doc(db, "credit_reports", docId), {
            name: fullName,
            mobile: formData.mobile,
            pan: safePan,
            gender: formData.gender,
            bureau: usedBureau,
            credit_score: extractedScore || null,
            pdf_link: data.data?.web_token_url || data.data?.credit_report_link || null,
            raw_api_data: data.data, // Save the full response to rebuild dashboard later
            created_at: serverTimestamp(),
            branch: teamBranch || "customer",
            search_tokens: generateSearchTokens(fullName, formData.mobile, safePan),
            ...(fallbackData && { fallbackData })
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
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-brand-black">Credit Profile & Identity</h3>
              {teamBranch && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-600 shadow-sm" title="Logged in as">
                  <User className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">{teamBranch}</span>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="First Name" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} className="w-full bg-white border border-icy-blue rounded-xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-blue-energy/30 focus:border-blue-energy outline-none transition-all" />
                </div>
                <div className="relative flex-1">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="Last Name" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} className="w-full bg-white border border-icy-blue rounded-xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-blue-energy/30 focus:border-blue-energy outline-none transition-all" />
                </div>
              </div>
              {!formData.bureau.startsWith('crif') && (
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="PAN Number"
                    value={formData.pan}
                    onChange={e => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                    className="w-full bg-white border border-icy-blue rounded-xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-blue-energy/30 focus:border-blue-energy outline-none transition-all uppercase"
                    maxLength={10}
                  />
                </div>
              )}
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="tel" placeholder="Mobile Number" value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })} className="w-full bg-white border border-icy-blue rounded-xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-blue-energy/30 focus:border-blue-energy outline-none transition-all" />
              </div>
              {formData.bureau === 'experian' && (
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">DOB</span>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={e => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full bg-white border border-icy-blue rounded-xl pl-12 pr-4 py-3.5 focus:ring-2 focus:ring-blue-energy/30 focus:border-blue-energy outline-none transition-all text-sm"
                  />
                </div>
              )}
              {!formData.bureau.startsWith('crif') && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={formData.gender}
                    onChange={e => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full bg-white border border-icy-blue rounded-xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-blue-energy/30 focus:border-blue-energy outline-none text-brand-black transition-all"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              )}

              {/* Bureau Selection */}
              {teamBranch && (
                <div className="pt-2">
                  <p className="text-sm font-semibold text-brand-black mb-3">Select Credit Bureau</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label className="flex items-center gap-2 p-3 border rounded-xl transition-all opacity-50 cursor-not-allowed bg-slate-50 border-icy-blue">
                      <input type="radio" name="bureau" value="v1_json" disabled className="w-4 h-4 text-slate-400 cursor-not-allowed" />
                      <span className="text-sm font-medium text-slate-500">CIBIL</span>
                    </label>
                    <label className={`flex items-center gap-2 p-3 border rounded-xl transition-all ${teamBranch ? 'opacity-50 cursor-not-allowed bg-slate-50 border-icy-blue' : formData.bureau === 'crif_json' ? 'border-blue-energy bg-blue-50/50 cursor-pointer' : 'border-icy-blue hover:bg-slate-50 cursor-pointer'}`}>
                      <input type="radio" name="bureau" value="crif_json" disabled={!!teamBranch} checked={formData.bureau === 'crif_json'} onChange={e => setFormData({ ...formData, bureau: e.target.value })} className="w-4 h-4 text-blue-energy accent-blue-energy disabled:opacity-50" />
                      <span className={`text-sm font-medium ${teamBranch ? 'text-slate-500' : 'text-brand-black/90'}`}>CRIF</span>
                    </label>
                    <label className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer transition-all ${formData.bureau === 'experian' ? 'border-blue-energy bg-blue-50/50' : 'border-icy-blue hover:bg-slate-50'}`}>
                      <input type="radio" name="bureau" value="experian" checked={formData.bureau === 'experian'} onChange={e => setFormData({ ...formData, bureau: e.target.value })} className="w-4 h-4 text-blue-energy accent-blue-energy" />
                      <span className="text-sm font-medium text-brand-black/90">Experian</span>
                    </label>
                  </div>
                </div>
              )}

              <label className="flex items-start gap-3 p-4 border border-icy-blue rounded-xl cursor-pointer hover:bg-slate-50 transition-colors mt-4">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={e => setFormData({ ...formData, consent: e.target.checked })}
                  className="w-5 h-5 mt-0.5 text-blue-energy accent-blue-energy shrink-0 rounded"
                />
                <span className="text-xs text-brand-black/70 leading-relaxed">
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
                className="w-full mt-6 bg-blue-energy text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-energy/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Fetch Credit Report</span>}
                {!loading && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        );

      case 6:
        return <CreditReportDashboard bureau={formData.bureau} cibilData={cibilData} formData={formData} />;
    }
  };

  return (
    <div id="check-eligibility" className="w-full max-w-4xl mx-auto flex flex-col justify-center h-full">
      <div className="mb-10 text-center relative">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-black mb-4">See your options</h2>
        <p className="text-lg text-brand-black/70">Take a minute to tell us about your situation.</p>
        {teamBranch && step === 1 && (
          <button
            onClick={fetchBranchHistory}
            className="md:absolute right-0 top-0 mt-4 md:mt-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors"
          >
            {loadingHistory ? <Loader2 className="w-4 h-4 animate-spin inline mr-2" /> : null}
            Customer History
          </button>
        )}
      </div>

      <div className="w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-icy-blue/60 overflow-hidden">
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

      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[85vh] flex flex-col">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-2xl">
              <h3 className="font-bold text-lg text-slate-800">Recently Accessed Reports ({teamBranch})</h3>
              <button onClick={() => setShowHistoryModal(false)} className="p-1 hover:bg-slate-200 rounded-md text-slate-500 transition-colors">
                <span className="text-xl leading-none">&times;</span>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              {loadingHistory ? (
                <div className="flex items-center justify-center p-12">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                </div>
              ) : historyReports.length === 0 ? (
                <div className="p-12 text-center text-slate-500">No reports found for this branch.</div>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-xs">
                      <th className="pb-3">Name</th>
                      <th className="pb-3">Mobile / PAN</th>
                      <th className="pb-3">Score</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {historyReports.map((r, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 font-bold text-slate-800">{r.name}</td>
                        <td className="py-4 text-slate-600">
                          <div>{r.mobile}</div>
                          <div className="text-xs text-slate-400">{r.pan || "No PAN"}</div>
                        </td>
                        <td className="py-4 font-bold text-lg">{r.credit_score || "-"}</td>
                        <td className="py-4 text-slate-500">
                          {r.created_at ? new Date(r.created_at.seconds * 1000).toLocaleDateString() : "-"}
                        </td>
                        <td className="py-4 text-right">
                          <button
                            onClick={async () => {
                              setShowHistoryModal(false);
                              try {
                                const res = await fetch(`/api/admin/reports/${r.id}`);
                                const apiData = await res.json();
                                if (apiData.success) {
                                  setFormData({ ...formData, bureau: apiData.report.bureau, pan: apiData.report.pan, mobile: apiData.report.mobile });
                                  processFetchedReport(apiData.report.raw_api_data);
                                }
                              } catch (e) {
                                console.error(e);
                              }
                            }}
                            className="text-xs font-bold px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            Open Report
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
