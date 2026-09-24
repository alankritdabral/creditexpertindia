"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, doc, getDoc, getDocs, updateDoc, query, orderBy, limit, startAfter, getCountFromServer, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";
import { Loader2, LogOut, ShieldCheck, Activity, Users, Database, Search, Filter, ArrowUpDown, Eye, X, RefreshCw, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditReportDashboard } from "@/components/CreditReportDashboard";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("reports");

  // Codes State
  const [codes, setCodes] = useState({ rudrapur: "", delhi: "", dehradun: "" });
  const [savingCodes, setSavingCodes] = useState(false);

  // Activity State
  const [activity, setActivity] = useState<any>({ 
    rudrapur: {count: 0, cost: 0, reports: []}, delhi: {count: 0, cost: 0, reports: []}, dehradun: {count: 0, cost: 0, reports: []}, customer: {count: 0, cost: 0, reports: []} 
  });
  const [activityLoading, setActivityLoading] = useState(false);
  const [activityDateFilter, setActivityDateFilter] = useState("today");
  const [activityCustomDate, setActivityCustomDate] = useState("");
  const [selectedActivityBranch, setSelectedActivityBranch] = useState<string | null>(null);

  // Timer State
  const [resetTimeLeft, setResetTimeLeft] = useState("");

  // Reports State
  const [reports, setReports] = useState<any[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [loadingReports, setLoadingReports] = useState(false);

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const [branchFilter, setBranchFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  // View Details State
  const [viewingReport, setViewingReport] = useState<any>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/admin/login");
      } else {
        setLoading(false);
        fetchCodes();
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchCodes = async () => {
    try {
      const rudrapur = await getDoc(doc(db, "access_code_creditexpert", "rudrapur"));
      const delhi = await getDoc(doc(db, "access_code_creditexpert", "delhi"));
      const dehradun = await getDoc(doc(db, "access_code_creditexpert", "dehradun"));
      
      setCodes({
        rudrapur: rudrapur.exists() ? rudrapur.data().code : "",
        delhi: delhi.exists() ? delhi.data().code : "",
        dehradun: dehradun.exists() ? dehradun.data().code : "",
      });
    } catch (e) {
      console.error("Error fetching codes:", e);
    }
  };

  const handleUpdateCode = async (branch: string) => {
    setSavingCodes(true);
    try {
      await updateDoc(doc(db, "access_code_creditexpert", branch), {
        code: codes[branch as keyof typeof codes],
        updatedAt: new Date()
      });
      alert(`${branch.toUpperCase()} code updated successfully!`);
    } catch (e) {
      console.error("Error updating code:", e);
      alert("Failed to update code.");
    }
    setSavingCodes(false);
  };

  const fetchActivity = async () => {
    setActivityLoading(true);
    try {
      let start: Date;
      let end: Date;
      
      const now = new Date();
      if (activityDateFilter === "today") {
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        end = new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1);
      } else if (activityDateFilter === "yesterday") {
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        end = new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1);
      } else {
        if (!activityCustomDate) {
          setActivityLoading(false);
          return;
        }
        start = new Date(activityCustomDate);
        end = new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1);
      }

      const q = query(collection(db, "credit_reports"), where("created_at", ">=", start), where("created_at", "<=", end));
      const snapshot = await getDocs(q);
      
      const stats: any = {
        rudrapur: { count: 0, cost: 0, reports: [] },
        delhi: { count: 0, cost: 0, reports: [] },
        dehradun: { count: 0, cost: 0, reports: [] },
        customer: { count: 0, cost: 0, reports: [] }
      };

      snapshot.docs.forEach(docSnap => {
        const data = docSnap.data();
        const branch = data.branch || "customer";
        const bureau = data.bureau || "";
        
        if (stats[branch]) {
          stats[branch].count += 1;
          const cost = bureau.startsWith("experian") ? 10.62 : bureau.startsWith("crif") ? 14.16 : 59;
          stats[branch].cost += cost;
          stats[branch].reports.push({ id: docSnap.id, ...data });
        }
      });
      
      // Sort reports locally (newest first)
      for (const key in stats) {
        stats[key].reports.sort((a: any, b: any) => {
          const timeA = a.created_at?.seconds || 0;
          const timeB = b.created_at?.seconds || 0;
          return timeB - timeA;
        });
      }
      
      setActivity(stats);
    } catch (e) {
      console.error("Error fetching activity:", e);
    }
    setActivityLoading(false);
  };

  const fetchReports = async () => {
    setLoadingReports(true);
    try {
      // Fetch a large chunk of latest reports once, handle search and pagination locally
      const q = query(collection(db, "credit_reports"), orderBy("created_at", "desc"), limit(1000));
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReports(docs);
    } catch (e) {
      console.error("Error fetching reports:", e);
    }
    setLoadingReports(false);
  };

    useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Re-fetch reports initially or when activeTab changes
  useEffect(() => {
    if (activeTab === "reports" && reports.length === 0) {
      setCurrentPage(1);
      fetchReports();
    }
  }, [activeTab]);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [branchFilter, debouncedSearchQuery, sortOrder]);

  useEffect(() => {
    if (activeTab === "activity") {
      fetchActivity();
    }
  }, [activeTab, activityDateFilter, activityCustomDate]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // Calculate IST time (UTC + 5:30)
      const istTime = new Date(now.getTime() + (330 * 60000));
      const nextMidnightIST = new Date(istTime);
      nextMidnightIST.setUTCHours(24, 0, 0, 0); // Next midnight
      
      const diff = nextMidnightIST.getTime() - istTime.getTime();
      
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      
      setResetTimeLeft(`${h}h ${m}m ${s}s`);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const generateRandomCode = (branch: string) => {
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCodes(prev => ({ ...prev, [branch]: randomCode }));
  };

  // Derived filtered reports
  const filteredReports = useMemo(() => {
    let filtered = reports.filter((r) => branchFilter === "all" || r.branch === branchFilter);
    
    // Local substring search for PAN and Mobile
    if (debouncedSearchQuery.trim().length > 0) {
      const q = debouncedSearchQuery.toUpperCase().trim();
      filtered = filtered.filter(r => 
        (r.pan && r.pan.toUpperCase().includes(q)) || 
        (r.mobile && r.mobile.includes(q))
      );
    }
    
    // Sort locally
    filtered = filtered.sort((a, b) => {
      const timeA = a.created_at?.seconds || 0;
      const timeB = b.created_at?.seconds || 0;
      return sortOrder === "desc" ? timeB - timeA : timeA - timeB;
    });
    
    return filtered;
  }, [reports, debouncedSearchQuery, branchFilter, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredReports.length / pageSize));
  const paginatedReports = useMemo(() => {
    return filteredReports.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [filteredReports, currentPage, pageSize]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;
  }

  return (
    <div className="h-[100dvh] bg-slate-50 flex flex-col md:flex-row overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0A2540] text-white shrink-0">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-blue-500 drop-shadow-md" />
          <span className="text-lg font-bold tracking-tight">Admin</span>
        </div>
        <button onClick={() => signOut(auth)} className="text-red-400 p-2 hover:bg-white/10 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="w-64 bg-[#0A2540] text-slate-300 p-6 flex-col hidden md:flex h-screen sticky top-0 border-r border-[#113355] shrink-0">
        <div className="flex items-center gap-3 text-white mb-10">
          <ShieldCheck className="w-8 h-8 text-blue-500 drop-shadow-md" />
          <span className="text-xl font-bold tracking-tight">Admin Panel</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <button onClick={() => setActiveTab("reports")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === "reports" ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20 font-semibold" : "hover:bg-white/10 text-slate-400 hover:text-slate-200"}`}>
            <Database className={`w-5 h-5 ${activeTab === "reports" ? "text-white" : "text-slate-400"}`} /> All Reports
          </button>
          <button onClick={() => setActiveTab("activity")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === "activity" ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20 font-semibold" : "hover:bg-white/10 text-slate-400 hover:text-slate-200"}`}>
            <Activity className={`w-5 h-5 ${activeTab === "activity" ? "text-white" : "text-slate-400"}`} /> Branch Activity
          </button>
          <button onClick={() => setActiveTab("codes")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === "codes" ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20 font-semibold" : "hover:bg-white/10 text-slate-400 hover:text-slate-200"}`}>
            <Users className={`w-5 h-5 ${activeTab === "codes" ? "text-white" : "text-slate-400"}`} /> Access Codes
          </button>
        </nav>

        <button onClick={() => signOut(auth)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors mt-auto text-red-400">
          <LogOut className="w-5 h-5" /> Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 flex flex-col min-h-0 pb-20 md:pb-8">
        {activeTab === "codes" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="overflow-y-auto flex-1 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Daily Access Codes</h2>
              <div className="flex items-center gap-2 bg-slate-800 text-slate-200 px-4 py-2 rounded-xl text-sm font-semibold mt-4 md:mt-0">
                <Clock className="w-4 h-4 text-emerald-400" /> Auto-reset in: <span className="text-emerald-400 font-bold">{resetTimeLeft}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["rudrapur", "delhi", "dehradun"].map((branch) => (
                <div key={branch} className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300">
                  <h3 className="text-lg font-bold text-slate-700 capitalize mb-4">{branch} Team</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={codes[branch as keyof typeof codes]}
                        onChange={(e) => setCodes({ ...codes, [branch]: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/30 outline-none font-mono"
                      />
                      <button 
                        onClick={() => generateRandomCode(branch)}
                        title="Generate Random Code"
                        className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors shrink-0"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleUpdateCode(branch)}
                      disabled={savingCodes}
                      className="w-full bg-blue-500 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                    >
                      Update Code
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "activity" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="overflow-y-auto flex-1 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold text-slate-800">Branch Activity</h2>
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <select 
                  value={activityDateFilter}
                  onChange={(e) => setActivityDateFilter(e.target.value)}
                  className="flex-1 md:flex-none pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/30 outline-none"
                >
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="custom">Custom Date</option>
                </select>
                {activityDateFilter === "custom" && (
                  <input 
                    type="date"
                    value={activityCustomDate}
                    onChange={(e) => setActivityCustomDate(e.target.value)}
                    className="flex-1 md:flex-none px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/30 outline-none"
                  />
                )}
                <button onClick={fetchActivity} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors flex-shrink-0">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {activityLoading ? (
              <div className="flex justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>
            ) : (
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 shrink-0">
                  {[
                    { id: "rudrapur", name: "Rudrapur", data: activity.rudrapur, color: "text-emerald-500", bg: "bg-emerald-200" },
                    { id: "delhi", name: "Delhi", data: activity.delhi, color: "text-blue-500", bg: "bg-blue-200" },
                    { id: "dehradun", name: "Dehradun", data: activity.dehradun, color: "text-purple-500", bg: "bg-purple-200" },
                    { id: "customer", name: "Customer (Web)", data: activity.customer, color: "text-amber-500", bg: "bg-amber-200" }
                  ].map(item => (
                    <div 
                      key={item.name} 
                      onClick={() => setSelectedActivityBranch(selectedActivityBranch === item.id ? null : item.id)}
                      className={`bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border ${selectedActivityBranch === item.id ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-100 hover:border-blue-300'} hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group flex flex-col cursor-pointer`}
                    >
                      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500 ${item.bg}`}></div>
                      <div className="relative z-10 flex-1">
                        <h3 className="text-sm font-bold text-slate-500 mb-2">{item.name}</h3>
                        <div className={`text-4xl font-extrabold ${item.color}`}>{item.data?.count || 0}</div>
                        <p className="text-xs text-slate-400 mt-1">Reports Generated</p>
                      </div>
                      <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 flex justify-between items-center w-full">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Spent</span>
                        <span className="text-lg font-extrabold text-slate-700">₹{(item.data?.cost || 0).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedActivityBranch && activity[selectedActivityBranch] && (
                  <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 overflow-hidden flex flex-col min-h-0 shrink-0">
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
                       <h3 className="font-bold text-slate-800 capitalize">{selectedActivityBranch === 'customer' ? 'Customer (Web)' : selectedActivityBranch} Reports</h3>
                       <button onClick={() => setSelectedActivityBranch(null)} className="p-1 hover:bg-slate-200 rounded-md text-slate-500 transition-colors"><X className="w-5 h-5" /></button>
                    </div>
                    
                    {activity[selectedActivityBranch].reports.length > 0 ? (
                      <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                          <thead className="sticky top-0 bg-slate-50 z-10 shadow-sm">
                            <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-bold">
                              <th className="p-4 bg-slate-50 w-16">S.No.</th>
                              <th className="p-4 bg-slate-50">Applicant</th>
                              <th className="p-4 bg-slate-50">Bureau</th>
                              <th className="p-4 bg-slate-50">Score</th>
                              <th className="p-4 bg-slate-50">Date</th>
                              <th className="p-4 text-right bg-slate-50">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
                            {activity[selectedActivityBranch].reports.map((r: any, i: number) => (
                              <tr key={i} className="hover:bg-slate-50 transition-colors group">
                                <td className="p-4 font-semibold text-slate-400">{i + 1}</td>
                                <td className="p-4">
                                  <div className="font-bold text-slate-900">{r.name}</div>
                                  <div className="text-xs text-slate-500 mt-1">{r.mobile} • {r.pan || "No PAN"}</div>
                                </td>
                                <td className="p-4"><span className="px-2 py-1 bg-slate-100 rounded font-medium text-xs border border-slate-200">{r.bureau}</span></td>
                                <td className="p-4 font-bold text-lg">{r.credit_score || "-"}</td>
                                <td className="p-4 text-slate-500">{r.created_at ? new Date(r.created_at.seconds * 1000).toLocaleString() : "-"}</td>
                                <td className="p-4 text-right">
                                  <button 
                                    onClick={() => setViewingReport(r)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors"
                                  >
                                    <Eye className="w-3.5 h-3.5" /> View Details
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="p-12 text-center text-slate-500 flex flex-col items-center">
                        <Database className="w-12 h-12 text-slate-200 mb-3" />
                        <p className="font-medium">No reports generated for this branch on the selected date.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "reports" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col flex-1 overflow-hidden pb-4">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
               <h2 className="text-2xl font-bold text-slate-800">All Reports</h2>
               
               <div className="flex flex-wrap items-center gap-3">
                 <div className="relative w-full md:w-auto">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                   <input 
                     type="text" 
                     placeholder="Search PAN or Mobile..." 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
                     className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/30 outline-none w-full md:w-64 uppercase placeholder:normal-case"
                   />
                 </div>
                 
                 <div className="relative flex-1 md:flex-none">
                   <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                   <select 
                     value={branchFilter}
                     onChange={(e) => setBranchFilter(e.target.value)}
                     className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-blue-500/30 outline-none"
                   >
                     <option value="all">All Branches</option>
                     <option value="customer">Customer (Web)</option>
                     <option value="rudrapur">Rudrapur</option>
                     <option value="delhi">Delhi</option>
                     <option value="dehradun">Dehradun</option>
                   </select>
                 </div>
                 
                 <button 
                   onClick={() => setSortOrder(prev => prev === "desc" ? "asc" : "desc")}
                   className="flex-1 md:flex-none justify-center flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                 >
                   <ArrowUpDown className="w-4 h-4" /> 
                   {sortOrder === "desc" ? "Newest First" : "Oldest First"}
                 </button>
               </div>
             </div>
             
             <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 overflow-hidden flex-1 flex flex-col min-h-0">
               <div className="overflow-x-auto overflow-y-auto flex-1">
                 <table className="w-full text-left border-collapse min-w-[800px]">
                   <thead className="sticky top-0 bg-slate-50 z-10 shadow-sm">
                     <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-bold">
                       <th className="p-4 bg-slate-50">Applicant</th>
                       <th className="p-4 bg-slate-50">Bureau</th>
                       <th className="p-4 bg-slate-50">Score</th>
                       <th className="p-4 bg-slate-50">Source</th>
                       <th className="p-4 bg-slate-50">Date</th>
                       <th className="p-4 text-right bg-slate-50">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
                     {paginatedReports.map((r, i) => (
                       <tr key={i} className="hover:bg-slate-50 transition-colors group">
                         <td className="p-4">
                           <div className="font-bold text-slate-900">{r.name}</div>
                           <div className="text-xs text-slate-500 mt-1">{r.mobile} • {r.pan || "No PAN"}</div>
                         </td>
                         <td className="p-4"><span className="px-2 py-1 bg-slate-100 rounded font-medium text-xs border border-slate-200">{r.bureau}</span></td>
                         <td className="p-4 font-bold text-lg">{r.credit_score || "-"}</td>
                         <td className="p-4">
                           <span className={`px-2 py-1 rounded-full font-medium text-xs capitalize ${r.branch === 'customer' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                             {r.branch || "customer"}
                           </span>
                         </td>
                         <td className="p-4 text-slate-500">{r.created_at ? new Date(r.created_at.seconds * 1000).toLocaleString() : "-"}</td>
                         <td className="p-4 text-right">
                           <button 
                             onClick={() => setViewingReport(r)}
                             className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors"
                           >
                             <Eye className="w-3.5 h-3.5" /> View Details
                           </button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
               
               {filteredReports.length === 0 && !loadingReports && (
                 <div className="p-12 text-center text-slate-500 flex flex-col items-center">
                   <Database className="w-12 h-12 text-slate-200 mb-3" />
                   <p className="font-medium">No reports found matching your criteria.</p>
                 </div>
               )}
               
               {filteredReports.length > 0 && (
                 <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 shrink-0">
                   <p className="text-sm text-slate-500 font-medium text-center sm:text-left">
                     Showing <span className="font-bold text-slate-700">{(currentPage - 1) * pageSize + 1}</span> to <span className="font-bold text-slate-700">{Math.min(currentPage * pageSize, filteredReports.length)}</span> of <span className="font-bold text-slate-700">{filteredReports.length}</span> entries
                   </p>
                   <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                     <button 
                       onClick={handlePrevPage}
                       disabled={currentPage === 1 || loadingReports}
                       className="px-4 py-2 bg-white border border-slate-200 shadow-sm text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                       Previous
                     </button>
                     <div className="flex items-center justify-center min-w-[40px] h-9 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold border border-blue-100">
                       {currentPage}
                     </div>
                     <button 
                       onClick={handleNextPage}
                       disabled={currentPage === totalPages || loadingReports}
                       className="px-4 py-2 bg-white border border-slate-200 shadow-sm text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                     >
                       {loadingReports ? <Loader2 className="w-4 h-4 animate-spin" /> : "Next"}
                     </button>
                   </div>
                 </div>
               )}
             </div>
          </motion.div>
        )}
      </div>

      {/* View Details Modal */}
      <AnimatePresence>
        {viewingReport && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-6xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Applicant Details: {viewingReport.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">Generated on {viewingReport.created_at ? new Date(viewingReport.created_at.seconds * 1000).toLocaleString() : "-"}</p>
                </div>
                <button 
                  onClick={() => setViewingReport(null)}
                  className="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 p-6 overflow-y-auto bg-slate-50">
                <CreditReportDashboard 
                  bureau={viewingReport.bureau}
                  cibilData={viewingReport.raw_api_data}
                  formData={{
                    firstName: viewingReport.name?.split(' ')[0] || '',
                    lastName: viewingReport.name?.split(' ').slice(1).join(' ') || '',
                    mobile: viewingReport.mobile,
                    pan: viewingReport.pan,
                    bureau: viewingReport.bureau
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex items-center justify-around p-2 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button onClick={() => setActiveTab("reports")} className={`flex flex-col items-center p-2 rounded-xl ${activeTab === "reports" ? "text-blue-600 font-bold" : "text-slate-500"}`}>
          <Database className={`w-5 h-5 mb-1 ${activeTab === "reports" ? "text-blue-600" : "text-slate-500"}`} />
          <span className="text-[10px]">Reports</span>
        </button>
        <button onClick={() => setActiveTab("activity")} className={`flex flex-col items-center p-2 rounded-xl ${activeTab === "activity" ? "text-blue-600 font-bold" : "text-slate-500"}`}>
          <Activity className={`w-5 h-5 mb-1 ${activeTab === "activity" ? "text-blue-600" : "text-slate-500"}`} />
          <span className="text-[10px]">Activity</span>
        </button>
        <button onClick={() => setActiveTab("codes")} className={`flex flex-col items-center p-2 rounded-xl ${activeTab === "codes" ? "text-blue-600 font-bold" : "text-slate-500"}`}>
          <Users className={`w-5 h-5 mb-1 ${activeTab === "codes" ? "text-blue-600" : "text-slate-500"}`} />
          <span className="text-[10px]">Codes</span>
        </button>
      </div>
    </div>
  );
}
