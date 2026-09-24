"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { Loader2, Lock, AlertCircle, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { verifyTeamCode } from "../../team/actions";

export default function AdminLogin() {
  const router = useRouter();
  
  // Admin Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState<string | null>(null);

  // Team Login State
  const [branch, setBranch] = useState("rudrapur");
  const [code, setCode] = useState("");
  const [teamLoading, setTeamLoading] = useState(false);
  const [teamError, setTeamError] = useState<string | null>(null);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setAdminError("Please enter both email and password.");
      return;
    }

    setAdminLoading(true);
    setAdminError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 500);
    } catch (err: any) {
      setAdminLoading(false);
      setAdminError(err.message || "Invalid credentials.");
    }
  };

  const handleTeamLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
      setTeamError("Please enter the daily access code.");
      return;
    }

    setTeamLoading(true);
    setTeamError(null);

    const result = await verifyTeamCode(branch, code);
    
    if (result.success) {
      router.push("/#lead-form");
    } else {
      setTeamError(result.error || "Login failed");
      setTeamLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="max-w-md w-full space-y-8">
        
        {/* Admin Login Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Admin Login</h1>
            <p className="text-slate-500 text-sm mt-1 text-center">
              Sign in to access the control panel
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-800/30 focus:border-slate-800 outline-none text-slate-800 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-800/30 focus:border-slate-800 outline-none text-slate-800 transition-all"
              />
            </div>

            {adminError && (
              <div className="p-3 bg-red-50 text-red-700 rounded-xl text-sm font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {adminError}
              </div>
            )}

            <button
              type="submit"
              disabled={adminLoading}
              className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2"
            >
              {adminLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
            </button>
          </form>
        </motion.div>

        {/* Separator */}
        <div className="flex items-center gap-4 py-2">
          <div className="h-px bg-slate-200 flex-1"></div>
          <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">OR</span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        {/* Team Login Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-blue-50 text-blue-energy rounded-2xl flex items-center justify-center mb-4">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Branch Team Login</h1>
            <p className="text-slate-500 text-sm mt-1 text-center">
              Enter your branch and today's access code
            </p>
          </div>

          <form onSubmit={handleTeamLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Branch</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-energy/30 focus:border-blue-energy outline-none text-slate-800 transition-all appearance-none"
              >
                <option value="rudrapur">Rudrapur</option>
                <option value="delhi">Delhi</option>
                <option value="dehradun">Dehradun</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Daily Access Code</label>
              <input
                type="password"
                placeholder="Enter code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-energy/30 focus:border-blue-energy outline-none text-slate-800 transition-all"
              />
            </div>

            {teamError && (
              <div className="p-3 bg-red-50 text-red-700 rounded-xl text-sm font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {teamError}
              </div>
            )}

            <button
              type="submit"
              disabled={teamLoading}
              className="w-full bg-blue-energy text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-energy/20 flex items-center justify-center gap-2"
            >
              {teamLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify Code"}
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  );
}
