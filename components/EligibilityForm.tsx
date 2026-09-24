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
    pan: "", dob: "", gender: "male", consent: false, bureau: "crif_json"
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
      }
    });
  }, []);

  const [cibilData, setCibilData] = useState<any>(null);
  const [manualLoans, setManualLoans] = useState<any[]>([]);





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
      const res = await fetch("/api/idspay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bureau: formData.bureau, bodyPayload })
      });

      const data = await res.json();

      if (!res.ok || (data.status && data.status.type !== "success")) {
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

          const fullName = `${formData.firstName} ${formData.lastName}`.trim();
          await setDoc(doc(db, "credit_reports", docId), {
            name: fullName,
            mobile: formData.mobile,
            pan: safePan,
            gender: formData.gender,
            bureau: formData.bureau,
            credit_score: extractedScore || null,
            pdf_link: data.data?.web_token_url || data.data?.credit_report_link || null,
            raw_api_data: data.data, // Save the full response to rebuild dashboard later
            created_at: serverTimestamp(),
            branch: teamBranch || "customer",
            search_tokens: generateSearchTokens(fullName, formData.mobile, safePan)
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
        if (!teamBranch) {
          return (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-6">
                <AlertCircle className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-brand-black mb-4">Temporarily Unavailable</h3>
              <p className="text-brand-black/70 max-w-sm mx-auto leading-relaxed mb-6">
                The Credit Profile check is currently undergoing maintenance and is only accessible to authorized team members.
              </p>
              <Link
                href="/team/login"
                className="inline-flex items-center gap-2 bg-blue-energy/10 text-blue-energy hover:bg-blue-energy hover:text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300"
              >
                <span>Team Login</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          );
        }

        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="text-2xl font-bold text-brand-black mb-6">Credit Profile & Identity</h3>
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
              <div className="pt-2">
                <p className="text-sm font-semibold text-brand-black mb-3">Select Credit Bureau</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="flex items-center gap-2 p-3 border rounded-xl transition-all opacity-50 cursor-not-allowed bg-slate-50 border-icy-blue">
                    <input type="radio" name="bureau" value="v1_json" disabled className="w-4 h-4 text-slate-400 cursor-not-allowed" />
                    <span className="text-sm font-medium text-slate-500">CIBIL</span>
                  </label>
                  <label className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer transition-all ${formData.bureau === 'crif_json' ? 'border-blue-energy bg-blue-50/50' : 'border-icy-blue hover:bg-slate-50'}`}>
                    <input type="radio" name="bureau" value="crif_json" checked={formData.bureau === 'crif_json'} onChange={e => setFormData({ ...formData, bureau: e.target.value })} className="w-4 h-4 text-blue-energy accent-blue-energy" />
                    <span className="text-sm font-medium text-brand-black/90">CRIF</span>
                  </label>
                  <label className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer transition-all ${formData.bureau === 'experian' ? 'border-blue-energy bg-blue-50/50' : 'border-icy-blue hover:bg-slate-50'}`}>
                    <input type="radio" name="bureau" value="experian" checked={formData.bureau === 'experian'} onChange={e => setFormData({ ...formData, bureau: e.target.value })} className="w-4 h-4 text-blue-energy accent-blue-energy" />
                    <span className="text-sm font-medium text-brand-black/90">Experian</span>
                  </label>
                </div>
              </div>

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
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-black mb-4">See your options</h2>
        <p className="text-lg text-brand-black/70">Take a minute to tell us about your situation.</p>
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
    </div>
  );
}
