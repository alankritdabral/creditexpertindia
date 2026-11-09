"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, CheckCircle2, Plus, Trash2, User, Phone, Mail, MapPin, Briefcase, Building2, Shield, CreditCard, Loader2, AlertCircle, ChevronDown, ChevronUp, Download, RotateCw, X, KeyRound } from "lucide-react";
import dynamic from "next/dynamic";
import { collection, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { searchEmployers, EmployerResult } from "@/lib/employerLookup";
import { parseBureauData } from "@/lib/bureauParsers";
import { NOTICE_VERSION } from "@/lib/consent";
import { track, setJourneyStage } from "@/lib/analytics/track";
import { bandDuration } from "@/lib/analytics/events";
import type { Bureau } from "@/lib/analytics/events";
import { getAttribution } from "@/lib/analytics/attribution";
import { getGaIds } from "@/lib/analytics/ids";
import { GA_ID } from "@/lib/analytics/gaId";
import { setClarityTag } from "@/lib/analytics/clarityTags";

const CreditReportDashboard = dynamic(
  () => import("./CreditReportDashboard").then((mod) => mod.CreditReportDashboard),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-slate-200">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-3" />
        <p className="text-sm font-medium text-slate-700">Loading your report...</p>
      </div>
    ),
  }
);
import { logSystemEvent } from "@/lib/logger";

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
    pan: "", dob: "", gender: "male", consent: false, consentContact: false, consentShareWithLenders: false, bureau: "experian"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", ""]);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [otpChannel, setOtpChannel] = useState<"sms" | "whatsapp">("sms");
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Cooldown countdown timer for OTP resend
  useEffect(() => {
    if (otpCooldown <= 0) return;
    const timer = setInterval(() => {
      setOtpCooldown(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [otpCooldown]);

  // Focus first digit when OTP modal opens
  useEffect(() => {
    if (showOtpModal) {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    }
  }, [showOtpModal]);

  const [cibilData, setCibilData] = useState<any>(null);
  const [manualLoans, setManualLoans] = useState<any[]>([]);
  const hasStartedRef = useRef(false);

  // See the matching comment in ContactForm.tsx: this mount-time fire
  // approximates the plan's "50% visible" lead_form_view.
  useEffect(() => {
    track({ name: "lead_form_view", params: { form_id: "eligibility", form_location: "eligibility_form" } });
  }, []);

  const trackFormStart = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    track({ name: "lead_form_start", params: { form_id: "eligibility" } });
  };

  const processFetchedReport = (reportData: any) => {
    setCibilData(reportData);
    if (reportData?.credit_report_link) {
      window.open(reportData.credit_report_link, "_blank");
    }
    track({ name: "credit_report_view", params: { bureau: formData.bureau as Bureau } });
    setJourneyStage("report_viewed");
    setStep(6);
  };

  const handleFetchReport = async () => {
    track({ name: "lead_form_submit", params: { form_id: "eligibility" } });

    if (!formData.consent || !formData.consentContact) {
      setError("Please accept the consent checkbox to continue.");
      track({ name: "lead_form_error", params: { form_id: "eligibility", error_code: "consent_missing", error_field: "consent" } });
      return;
    }
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("Please enter both First Name and Last Name.");
      track({ name: "lead_form_error", params: { form_id: "eligibility", error_code: "name_missing" } });
      return;
    }
    const isCrifSelected = formData.bureau.startsWith("crif");
    const isExperianSelected = formData.bureau === "experian";

    if (isExperianSelected) {
      if (!formData.dob) {
        setError("Please enter your Date of Birth.");
        track({ name: "lead_form_error", params: { form_id: "eligibility", error_code: "dob_missing" } });
        return;
      }
    }

    if (!isCrifSelected) {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
      if (!panRegex.test(formData.pan)) {
        setError("Please enter a valid 10-character PAN number.");
        track({ name: "lead_form_error", params: { form_id: "eligibility", error_code: "pan_invalid" } });
        return;
      }
    }
    if (formData.mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      track({ name: "lead_form_error", params: { form_id: "eligibility", error_code: "mobile_invalid" } });
      return;
    }

    setError(null);
    setLoading(true);

    handleRequestOtp(false);
  };

  const handleRequestOtp = async (isResend = false) => {
    track({ name: "otp_request", params: { is_resend: isResend } });
    if (!isResend) {
      setLoading(true);
      setError(null);
    } else {
      setOtpError(null);
    }
    setOtpLoading(true);

    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: formData.mobile }),
      });
      const data = await res.json();

      if (data.success) {
        track({ name: "otp_sent", params: { otp_channel: data.channel === "whatsapp" ? "whatsapp" : "sms" } });
        setOtpChannel(data.channel === "whatsapp" ? "whatsapp" : "sms");
        setShowOtpModal(true);
        setOtpCooldown(30);
        setOtpDigits(["", "", "", ""]);
        setOtpError(null);
        setTimeout(() => {
          otpInputRefs.current[0]?.focus();
        }, 150);
      } else {
        const errorCode = res.status === 429 ? "rate_limited" : "dispatch_failed";
        track({ name: "otp_failed", params: { otp_stage: "send", error_code: errorCode } });
        if (isResend) {
          setOtpError(data.error || "Failed to resend verification code.");
        } else {
          setError(data.error || "Failed to send verification SMS. Please check your mobile number.");
        }
      }
    } catch (err: any) {
      console.error("[OTP Request]", err);
      track({ name: "otp_failed", params: { otp_stage: "send", error_code: "network" } });
      if (isResend) {
        setOtpError("Network error while resending verification code.");
      } else {
        setError("Network error while sending verification code. Please try again.");
      }
    } finally {
      setLoading(false);
      setOtpLoading(false);
    }
  };

  const handleOtpDigitChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned) {
      const newDigits = [...otpDigits];
      newDigits[index] = "";
      setOtpDigits(newDigits);
      return;
    }

    // Support pasting 4 digits
    if (cleaned.length > 1) {
      const pasted = cleaned.slice(0, 4).split("");
      const newDigits = [...otpDigits];
      pasted.forEach((char, i) => {
        if (index + i < 4) {
          newDigits[index + i] = char;
        }
      });
      setOtpDigits(newDigits);
      const nextIndex = Math.min(3, index + pasted.length);
      otpInputRefs.current[nextIndex]?.focus();

      if (newDigits.every((d) => d !== "")) {
        handleVerifyOtp(newDigits.join(""));
      }
      return;
    }

    const newDigits = [...otpDigits];
    newDigits[index] = cleaned[0];
    setOtpDigits(newDigits);

    if (index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }

    if (index === 3 || newDigits.every((d) => d !== "")) {
      const fullOtp = newDigits.join("");
      if (fullOtp.length === 4) {
        handleVerifyOtp(fullOtp);
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (codeToVerify?: string) => {
    const code = codeToVerify || otpDigits.join("");
    if (code.length < 4) {
      setOtpError("Please enter all 4 digits of your verification code.");
      return;
    }

    setOtpLoading(true);
    setOtpError(null);

    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile: formData.mobile,
          otp: code,
        }),
      });
      const data = await res.json();

      if (data.success) {
        track({ name: "otp_verified", params: {} });
        track({ name: "generate_lead", params: { lead_source: "eligibility", currency: "INR" } });
        // A PII-free analytics copy, written server-side (contact and
        // calculator-lead already get theirs from their own API routes —
        // this flow writes its credit_reports doc straight from the client,
        // so it has no other server step to piggyback this on).
        Promise.all([Promise.resolve(getAttribution()), getGaIds(GA_ID)])
          .then(async ([attribution, ga]) => {
            setJourneyStage("lead");
            if (ga.clientId) setClarityTag("ga_client_id", ga.clientId);
            const res = await fetch("/api/lead-event", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                attribution,
                ga,
                consent: {
                  contact: formData.consentContact,
                  shareWithLenders: formData.consentShareWithLenders,
                  noticeVersion: NOTICE_VERSION,
                },
              }),
            });
            const data = await res.json().catch(() => ({}));
            if (data.leadAnalyticsRef) setClarityTag("lead_ref", data.leadAnalyticsRef);
          })
          .catch((e) => console.warn("[lead-event] failed", e));
        setShowOtpModal(false);
        proceedToFetchReport();
      } else {
        const lowerError = String(data.error || "").toLowerCase();
        const errorCode = lowerError.includes("too many")
          ? "too_many"
          : lowerError.includes("expired") || lowerError.includes("not requested")
            ? "expired"
            : "incorrect";
        track({ name: "otp_failed", params: { otp_stage: "verify", error_code: errorCode } });
        setOtpError(data.error || "Invalid verification code. Please check and try again.");
      }
    } catch (err: any) {
      console.error("[OTP Verify]", err);
      track({ name: "otp_failed", params: { otp_stage: "verify", error_code: "network" } });
      setOtpError("Verification network error. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const proceedToFetchReport = async () => {
    let activeBureau: string | undefined;
    const requestId = "req_" + Math.random().toString(36).substring(2, 10);
    let startTime = 0;
    let fallbackStartTime = 0;
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
                    track({ name: "credit_report_fetch", params: { bureau: "crif", report_outcome: "cache", duration_band: bandDuration(0) } });
                    processFetchedReport(crifData.raw_api_data);
                    setLoading(false);
                    return;
                  }
                  // If CRIF not in cache, skip Experian live call and jump directly to CRIF live call!
                  console.warn("CRIF not in cache. Bypassing live Experian call and directly fetching live CRIF report.");
                  setFormData((prev: any) => ({ ...prev, bureau: "crif_v1" }));
                  // Instead of mutating formData, we'll update the active bureau for the rest of the function
                  activeBureau = "crif_v1";
                } else {
                  if (data.bureau && data.bureau !== formData.bureau) {
                    setFormData((prev: any) => ({ ...prev, bureau: data.bureau }));
                  }
                  if (data.fallbackData) {
                    setFormData((prev: any) => ({ ...prev, fallbackWarning: `Notice: Loaded cached CRIF report (Experian fallback: ${data.fallbackData.fallback_reason})` }));
                  }
                  track({
                    name: "credit_report_fetch",
                    params: {
                      bureau: ((data.bureau || formData.bureau).replace(/_v\d+$/, "").replace(/_pdf$/, "") as Bureau) || "experian",
                      report_outcome: "cache",
                      duration_band: bandDuration(0),
                    },
                  });
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
      const currentBureau = typeof activeBureau !== "undefined" ? activeBureau : formData.bureau;
      const isV2 = currentBureau.startsWith("v2");
      const isExperian = currentBureau.startsWith("experian");
      const isCrif = currentBureau.startsWith("crif");
      const isPdf = currentBureau.endsWith("_pdf");

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
          pan_id: formData.pan,
          date_of_birth: formData.dob || undefined
        };
      }

      // Send the request through our new Next.js API Route which talks to IDSPay
      startTime = Date.now();
      await logSystemEvent({
        level: "info",
        event: "BUREAU_REQUEST_STARTED",
        module: "credit-profile",
        request_id: requestId,
        application_id: `app_${formData.mobile}`,
        provider: { requested: typeof activeBureau !== "undefined" ? activeBureau : formData.bureau },
        message: "Initiating bureau request",
        identifiers: { pan: formData.pan, mobile: formData.mobile },
      });

      const initialRes = await fetch("/api/idspay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bureau: typeof activeBureau !== "undefined" ? activeBureau : formData.bureau, bodyPayload })
      });

      let res = initialRes;
      let data = await res.json();
      let usedBureau = typeof activeBureau !== "undefined" ? activeBureau : formData.bureau;
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
        
        await logSystemEvent({
          level: "warning",
          event: "BUREAU_FALLBACK_TRIGGERED",
          module: "credit-profile",
          request_id: requestId,
          application_id: `app_${formData.mobile}`,
          provider: {
            requested: "experian",
            fallback: "crif_v1",
            http_status: res.status,
            error_code: data.message_code || "UNKNOWN",
          },
          message: fallbackReason,
          identifiers: { pan: formData.pan, mobile: formData.mobile },
          duration_ms: Date.now() - startTime
        });
        
        const crifPayload = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          mobile_no: formData.mobile,
          name_lookup: 0
        };
        
        fallbackStartTime = Date.now();
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

      // Computed once and reused below (for the log call and the tracking
      // call), rather than calling Date.now() again at each use — the
      // existing logSystemEvent calls already did this inline; duplicating
      // that expression a third time would add new instances of this
      // file's pre-existing react-hooks/purity lint finding for no reason.
      const bureauDurationMs = fallbackData ? Date.now() - fallbackStartTime : Date.now() - startTime;
      const bureauForTracking = (usedBureau.replace(/_v\d+$/, "").replace(/_pdf$/, "") as Bureau) || "experian";

      if (!res.ok || (data.status && data.status.type !== "success" && !data.success)) {
        const errMsg = data.message || data.error || "Failed to fetch credit report. Please check your details.";
        setError(errMsg);
        track({
          name: "credit_report_fetch",
          params: { bureau: bureauForTracking, report_outcome: "failed", duration_band: bandDuration(bureauDurationMs) },
        });

        await logSystemEvent({
          level: "error",
          event: fallbackData ? "ALL_BUREAUS_FAILED" : "BUREAU_REQUEST_FAILED",
          module: "credit-profile",
          request_id: requestId,
          application_id: `app_${formData.mobile}`,
          provider: {
            requested: usedBureau,
            http_status: res.status,
            error_code: data.message_code || data.error_code || "UNKNOWN",
          },
          message: errMsg,
          identifiers: { pan: formData.pan, mobile: formData.mobile },
          duration_ms: bureauDurationMs
        });
      } else {
        await logSystemEvent({
          level: "info",
          event: fallbackData ? "BUREAU_FALLBACK_SUCCESS" : "BUREAU_REQUEST_SUCCESS",
          module: "credit-profile",
          request_id: requestId,
          application_id: `app_${formData.mobile}`,
          provider: {
            requested: usedBureau,
            http_status: res.status,
          },
          message: "Bureau request completed successfully",
          identifiers: { pan: formData.pan, mobile: formData.mobile },
          duration_ms: bureauDurationMs
        });
        track({
          name: "credit_report_fetch",
          params: { bureau: bureauForTracking, report_outcome: fallbackData ? "fallback" : "live", duration_band: bandDuration(bureauDurationMs) },
        });

        // Save to Firebase
        try {
          const safePan = formData.pan ? formData.pan.toUpperCase() : "NOPAN";
          const docId = `${safePan}_${formData.mobile}_${typeof activeBureau !== "undefined" ? activeBureau : formData.bureau}`;

          let extractedScore = data.data?.credit_score;
          let extractedEmail = "";
          try {
            const parsed = parseBureauData(usedBureau, data.data);
            if (!extractedScore && parsed?.personalInfo?.score) {
              extractedScore = parsed.personalInfo.score;
            }
            if (parsed?.personalInfo?.email) {
              extractedEmail = parsed.personalInfo.email;
            }
          } catch (e) {
            console.warn("Failed to extract score/email during save", e);
          }

          const fullName = `${formData.firstName} ${formData.lastName}`.trim();
          await setDoc(doc(db, "credit_reports", docId), {
            name: fullName,
            mobile: formData.mobile,
            pan: safePan,
            gender: formData.gender,
            bureau: usedBureau,
            credit_score: extractedScore || null,
            email: extractedEmail || null,
            pdf_link: data.data?.web_token_url || data.data?.credit_report_link || null,
            raw_api_data: data.data, // Save the full response to rebuild dashboard later
            created_at: serverTimestamp(),
            branch: "customer",
            search_tokens: generateSearchTokens(fullName, formData.mobile, safePan),
            consent: {
              bureauFetch: formData.consent,
              contact: formData.consentContact,
              shareWithLenders: formData.consentShareWithLenders,
              noticeVersion: NOTICE_VERSION,
              recordedAt: serverTimestamp(),
            },
            attribution: getAttribution(),
            ...(fallbackData && { fallbackData })
          });
        } catch (e) {
          console.error("Error saving to Firebase", e);
        }

        processFetchedReport(data.data);
      }
    } catch (e: any) {
      setError("A network error occurred. Please try again.");
      
      await logSystemEvent({
        level: "critical",
        event: "BUREAU_NETWORK_ERROR",
        module: "credit-profile",
        request_id: requestId,
        application_id: `app_${formData.mobile}`,
        message: e?.message || "A network error occurred",
        identifiers: { pan: formData.pan, mobile: formData.mobile },
        duration_ms: startTime > 0 ? Date.now() - startTime : undefined
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onChangeCapture={trackFormStart}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 id="credit-profile-identity" className="text-2xl font-bold text-brand-black scroll-mt-28">Credit Profile & Identity</h3>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-4">
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
              {(formData.bureau === 'experian' || formData.bureau === 'v1_json') && (
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

              <label className="flex items-start gap-3 p-4 border border-icy-blue rounded-xl cursor-pointer hover:bg-slate-50 transition-colors mt-4">
                <input
                  type="checkbox"
                  checked={formData.consent && formData.consentContact}
                  onChange={e => setFormData({ ...formData, consent: e.target.checked, consentContact: e.target.checked })}
                  className="w-5 h-5 mt-0.5 text-blue-energy accent-blue-energy shrink-0 rounded"
                />
                <span className="text-xs text-brand-black/70 leading-relaxed">
                  <strong>Consent</strong><br />
                  I confirm I am 21 or older and I consent and authorize Credit Expert India to securely retrieve my credit report from the credit bureau, and to contact me about this enquiry.
                </span>
              </label>

              <label className="flex items-start gap-3 p-4 border border-icy-blue rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.consentShareWithLenders}
                  onChange={e => setFormData({ ...formData, consentShareWithLenders: e.target.checked })}
                  className="w-5 h-5 mt-0.5 text-blue-energy accent-blue-energy shrink-0 rounded"
                />
                <span className="text-xs text-brand-black/70 leading-relaxed">
                  I'm also open to being contacted by partner lenders (see{" "}
                  <Link href="/partner-disclosures" className="underline">partner disclosures</Link>). Optional.
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
    <div id="check-eligibility" className="w-full max-w-[1220px] mx-auto flex flex-col justify-center h-full">
      <div className={step === 1 ? "grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-start" : ""}>
        {step === 1 ? (
          <div className="bg-primary-hover text-white p-8 md:p-12 lg:sticky lg:top-28">
            <h2 className="text-3xl sm:text-4xl leading-[1.15] tracking-tight font-semibold">
              See what you could save, in about two minutes.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/85">
              Tell us a little about yourself. We look at your credit profile the way a lender would,
              so what we tell you is realistic, not a sales pitch.
            </p>
            <ul className="mt-8 space-y-3 text-base leading-6 text-white">
              {[
                "We never ask you to pay anything.",
                "Your details stay with us unless you say otherwise.",
                "You decide what happens next.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white/70" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-black mb-2">See your options</h2>
            <p className="text-lg text-brand-black/70">Here&apos;s what we found.</p>
          </div>
        )}

        <div className={`w-full bg-white overflow-hidden card-elevated ${step === 1 ? "" : "max-w-4xl mx-auto"}`}>
          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>

            {step === 1 && (
              <div className="flex items-center gap-2 pt-8 text-sm text-slate-500">
                <Shield className="w-4 h-4" />
                <span>Your information is secure and never shared without consent.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MessageBot SMS OTP Verification Modal */}
      <AnimatePresence>
        {showOtpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full p-6 sm:p-8 relative overflow-hidden text-center"
              data-clarity-mask="true"
            >
              {/* Background ambient accents */}
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-blue-100/60 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-sky-100/60 rounded-full blur-2xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => {
                  track({ name: "otp_abandon", params: {} });
                  setShowOtpModal(false);
                  setOtpError(null);
                }}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-blue-energy to-sky-500 text-white flex items-center justify-center shadow-lg shadow-blue-energy/25">
                <Shield className="w-8 h-8" />
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                Verify Your Mobile
              </h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                We sent a 4-digit verification code via {otpChannel === "whatsapp" ? "WhatsApp" : "SMS"} to{" "}
                <span className="font-bold text-slate-800">+91 {formData.mobile}</span>
              </p>

              {/* 4 Digit Inputs */}
              <div className="my-6">
                <div className="flex justify-center gap-3 sm:gap-4">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        otpInputRefs.current[idx] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className={`w-14 h-16 sm:w-16 sm:h-18 text-center text-2xl font-black text-slate-900 bg-slate-50 border-2 rounded-2xl outline-none transition-all shadow-inner ${
                        digit
                          ? "border-blue-energy bg-white ring-2 ring-blue-energy/20"
                          : "border-slate-200 focus:border-blue-energy focus:bg-white"
                      }`}
                    />
                  ))}
                </div>

                {otpError && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{otpError}</span>
                  </motion.div>
                )}
              </div>

              {/* Primary Verify Button */}
              <button
                onClick={() => handleVerifyOtp()}
                disabled={otpLoading || otpDigits.some((d) => !d)}
                className="w-full bg-blue-energy text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-energy/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {otpLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <span>Verify & Continue</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Resend / Change Mobile Row */}
              <div className="mt-5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    track({ name: "otp_abandon", params: {} });
                    setShowOtpModal(false);
                    setOtpError(null);
                  }}
                  className="text-slate-500 hover:text-slate-800 font-medium underline transition-colors"
                >
                  Change mobile number
                </button>

                {otpCooldown > 0 ? (
                  <span className="text-slate-400 font-medium">
                    Resend code in <strong className="text-slate-700">{otpCooldown}s</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleRequestOtp(true)}
                    disabled={otpLoading}
                    className="text-blue-energy hover:text-blue-700 font-bold transition-colors flex items-center gap-1"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Resend Code</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

