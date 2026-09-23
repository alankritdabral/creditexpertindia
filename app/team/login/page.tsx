"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyTeamCode } from "../actions";
import { Loader2, Shield, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function TeamLogin() {
  const router = useRouter();
  const [branch, setBranch] = useState("rudrapur");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
      setError("Please enter the daily access code.");
      return;
    }

    setLoading(true);
    setError(null);

    const result = await verifyTeamCode(branch, code);
    
    if (result.success) {
      // Redirect to eligibility form
      router.push("/eligibility");
    } else {
      setError(result.error || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-50 text-blue-energy rounded-2xl flex items-center justify-center mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Team Login</h1>
          <p className="text-slate-500 text-sm mt-1 text-center">
            Enter your branch and today's access code to bypass OTP.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
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

          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-xl text-sm font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-energy text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-energy/20 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify Code"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
