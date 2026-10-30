"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode, useRef } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

interface AdminDataContextType {
  reports: any[];
  setReports: React.Dispatch<React.SetStateAction<any[]>>;
  loadingReports: boolean;
  activity: any;
  setActivity: React.Dispatch<React.SetStateAction<any>>;
  activityLoading: boolean;
  codes: { rudrapur: string; delhi: string; dehradun: string };
  setCodes: React.Dispatch<React.SetStateAction<{ rudrapur: string; delhi: string; dehradun: string }>>;
  savingCodes: boolean;
  fetchReports: (force?: boolean) => Promise<void>;
  fetchActivity: (
    filter: string,
    startDate?: string,
    endDate?: string,
    force?: boolean
  ) => Promise<void>;
  fetchCodes: (force?: boolean) => Promise<void>;
  handleUpdateCode: (branch: string) => Promise<boolean>;
  refreshAll: () => Promise<void>;
}

const AdminDataContext = createContext<AdminDataContextType | null>(null);

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<any[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const reportsFetchedAt = useRef<number>(0);

  const [activity, setActivity] = useState<any>({
    rudrapur: { count: 0, cost: 0, reports: [] },
    delhi: { count: 0, cost: 0, reports: [] },
    dehradun: { count: 0, cost: 0, reports: [] },
    customer: { count: 0, cost: 0, reports: [] },
  });
  const [activityLoading, setActivityLoading] = useState(false);
  const activityCache = useRef<Record<string, { data: any; time: number }>>({});

  const [codes, setCodes] = useState({ rudrapur: "", delhi: "", dehradun: "" });
  const [savingCodes, setSavingCodes] = useState(false);
  const codesFetchedAt = useRef<number>(0);

  // Cached Reports Fetch
  const fetchReports = useCallback(async (force = false) => {
    const now = Date.now();
    if (!force && reports.length > 0 && now - reportsFetchedAt.current < CACHE_TTL_MS) {
      // Return cached reports without any DB reads
      return;
    }

    setLoadingReports(true);
    try {
      // Limit to 200 by default (cuts reads by 80% compared to 1000)
      const res = await fetch(`/api/admin/reports?limit=200&_t=${now}`);
      const apiData = await res.json();
      if (apiData.success) {
        setReports(apiData.reports);
        reportsFetchedAt.current = now;
      }
    } catch (e) {
      console.error("Error fetching reports:", e);
    } finally {
      setLoadingReports(false);
    }
  }, [reports.length]);

  // Cached Branch Activity Fetch
  const fetchActivity = useCallback(
    async (filter: string, startDate?: string, endDate?: string, force = false) => {
      const now = Date.now();
      let start: Date;
      let end: Date;

      const nowDate = new Date();
      if (filter === "today") {
        start = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
        end = new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1);
      } else if (filter === "yesterday") {
        start = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() - 1);
        end = new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1);
      } else if (filter === "range") {
        if (!startDate || !endDate) return;
        start = new Date(startDate);
        const endDay = new Date(endDate);
        end = new Date(endDay.getTime() + 24 * 60 * 60 * 1000 - 1);
      } else {
        if (!startDate) return;
        start = new Date(startDate);
        end = new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1);
      }

      const cacheKey = `${filter}_${start.toISOString()}_${end.toISOString()}`;
      if (!force && activityCache.current[cacheKey] && now - activityCache.current[cacheKey].time < CACHE_TTL_MS) {
        setActivity(activityCache.current[cacheKey].data);
        return;
      }

      setActivityLoading(true);
      try {
        const res = await fetch(
          `/api/admin/reports?startDate=${start.toISOString()}&endDate=${end.toISOString()}&_t=${now}`
        );
        const apiData = await res.json();

        const stats: any = {
          rudrapur: { count: 0, cost: 0, reports: [] },
          delhi: { count: 0, cost: 0, reports: [] },
          dehradun: { count: 0, cost: 0, reports: [] },
          customer: { count: 0, cost: 0, reports: [] },
        };

        if (apiData.success) {
          apiData.reports.forEach((data: any) => {
            const branch = data.branch || "customer";
            const bureau = data.bureau || "";

            if (stats[branch]) {
              stats[branch].count += 1;
              let cost = bureau.startsWith("experian") ? 10.62 : bureau.startsWith("crif") ? 14.16 : 59;
              if (data.fallbackData?.fallback_from_experian) {
                cost += 10.62;
              }
              stats[branch].cost += cost;
              stats[branch].reports.push(data);
            }
          });
        }

        for (const key in stats) {
          stats[key].reports.sort((a: any, b: any) => {
            const timeA = a.created_at?.seconds || 0;
            const timeB = b.created_at?.seconds || 0;
            return timeB - timeA;
          });
        }

        activityCache.current[cacheKey] = { data: stats, time: now };
        setActivity(stats);
      } catch (e) {
        console.error("Error fetching activity:", e);
      } finally {
        setActivityLoading(false);
      }
    },
    []
  );

  // Cached Branch Codes Fetch
  const fetchCodes = useCallback(async (force = false) => {
    const now = Date.now();
    if (!force && codesFetchedAt.current > 0 && now - codesFetchedAt.current < CACHE_TTL_MS) {
      return;
    }

    try {
      const [rudrapur, delhi, dehradun] = await Promise.all([
        getDoc(doc(db, "access_code_creditexpert", "rudrapur")),
        getDoc(doc(db, "access_code_creditexpert", "delhi")),
        getDoc(doc(db, "access_code_creditexpert", "dehradun")),
      ]);

      setCodes({
        rudrapur: rudrapur.exists() ? rudrapur.data().code : "",
        delhi: delhi.exists() ? delhi.data().code : "",
        dehradun: dehradun.exists() ? dehradun.data().code : "",
      });
      codesFetchedAt.current = now;
    } catch (e) {
      console.error("Error fetching codes:", e);
    }
  }, []);

  const handleUpdateCode = useCallback(
    async (branch: string): Promise<boolean> => {
      setSavingCodes(true);
      try {
        await updateDoc(doc(db, "access_code_creditexpert", branch), {
          code: codes[branch as keyof typeof codes],
          updatedAt: new Date(),
        });
        return true;
      } catch (e) {
        console.error("Error updating code:", e);
        return false;
      } finally {
        setSavingCodes(false);
      }
    },
    [codes]
  );

  const refreshAll = useCallback(async () => {
    reportsFetchedAt.current = 0;
    codesFetchedAt.current = 0;
    activityCache.current = {};
    await Promise.all([fetchReports(true), fetchCodes(true)]);
  }, [fetchReports, fetchCodes]);

  return (
    <AdminDataContext.Provider
      value={{
        reports,
        setReports,
        loadingReports,
        activity,
        setActivity,
        activityLoading,
        codes,
        setCodes,
        savingCodes,
        fetchReports,
        fetchActivity,
        fetchCodes,
        handleUpdateCode,
        refreshAll,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
}
