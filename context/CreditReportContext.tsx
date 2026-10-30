"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

interface CreditReportContextType {
  userOverrides: any;
  setUserOverrides: React.Dispatch<React.SetStateAction<any>>;
  loanOverrides: any;
  setLoanOverrides: React.Dispatch<React.SetStateAction<any>>;
  updateUserOverride: (key: string, value: any) => void;
  updateLoanOverride: (accountNum: string, key: string, value: any) => void;
  saveOverridesToDB: () => Promise<boolean>;
  isDirty: boolean;
  isSaving: boolean;
  sessionKey: string;
  docId: string;
}

const CreditReportContext = createContext<CreditReportContextType | null>(null);

interface CreditReportProviderProps {
  children: ReactNode;
  docId: string;
  sessionKey: string;
  initialOverrides?: {
    userOverrides?: any;
    loanOverrides?: any;
  };
}

export function CreditReportProvider({
  children,
  docId,
  sessionKey,
  initialOverrides,
}: CreditReportProviderProps) {
  // Initialize state from sessionStorage first (fastest, 0 DB calls), then fallback to initialOverrides
  const [userOverrides, setUserOverrides] = useState<any>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem(sessionKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.userOverrides) return parsed.userOverrides;
        }
      } catch (e) {
        console.error("Failed to load userOverrides from session", e);
      }
    }
    return initialOverrides?.userOverrides || {};
  });

  const [loanOverrides, setLoanOverrides] = useState<any>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem(sessionKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.loanOverrides) return parsed.loanOverrides;
        }
      } catch (e) {
        console.error("Failed to load loanOverrides from session", e);
      }
    }
    return initialOverrides?.loanOverrides || {};
  });

  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Synchronize overrides to sessionStorage immediately (0 DB reads/writes)
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(sessionKey, JSON.stringify({ userOverrides, loanOverrides }));
      } catch (e) {
        console.error("Failed to save session overrides", e);
      }
    }
  }, [userOverrides, loanOverrides, sessionKey]);

  const updateUserOverride = useCallback((key: string, value: any) => {
    setUserOverrides((prev: any) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  }, []);

  const updateLoanOverride = useCallback((accountNum: string, key: string, value: any) => {
    setLoanOverrides((prev: any) => ({
      ...prev,
      [accountNum]: { ...(prev[accountNum] || {}), [key]: value },
    }));
    setIsDirty(true);
  }, []);

  // Event-driven save: Only persists to Firestore on explicit request (Apply, Download, Save button)
  const saveOverridesToDB = useCallback(async (): Promise<boolean> => {
    if (!docId) return false;
    const hasKeys = Object.keys(userOverrides).length > 0 || Object.keys(loanOverrides).length > 0;
    if (!hasKeys) return true;

    setIsSaving(true);
    try {
      await updateDoc(doc(db, "credit_reports", docId), {
        overrides: { userOverrides, loanOverrides },
      });
      setIsDirty(false);
      return true;
    } catch (e) {
      console.error("Failed to save overrides to DB", e);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [docId, userOverrides, loanOverrides]);

  return (
    <CreditReportContext.Provider
      value={{
        userOverrides,
        setUserOverrides,
        loanOverrides,
        setLoanOverrides,
        updateUserOverride,
        updateLoanOverride,
        saveOverridesToDB,
        isDirty,
        isSaving,
        sessionKey,
        docId,
      }}
    >
      {children}
    </CreditReportContext.Provider>
  );
}

export function useCreditReport() {
  const context = useContext(CreditReportContext);
  return context;
}
