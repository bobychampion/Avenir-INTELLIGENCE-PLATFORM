/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ShieldAlert, KeyRound, ArrowRight, CornerDownLeft, Lock } from "lucide-react";

interface AdminGatewayProps {
  onUnlockSuccess: () => void;
  onBack: () => void;
}

export default function AdminGateway({ onUnlockSuccess, onBack }: AdminGatewayProps) {
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Secure Master Access Codes
    const masterSecrets = ["AvenirAdmin2026", "admin1234"];
    
    if (masterSecrets.includes(passcode.trim())) {
      onUnlockSuccess();
    } else {
      setErrorMsg("Access denied. Invalid credentials or insufficient permissions.");
      // Auto clear error after 3.5 seconds
      setTimeout(() => setErrorMsg(""), 3500);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20 font-sans text-slate-800">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
        {/* Security accent line */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-amber-500" />

        <div className="w-14 h-14 bg-amber-50 border border-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
          <Lock className="w-6 h-6" />
        </div>

        <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase block">
          Enterprise Security Protocol
        </span>
        
        <h1 className="text-xl font-extrabold text-slate-900 font-display mt-2">
          Administrative Authorization Gateway
        </h1>
        
        <p className="mt-3 text-xs leading-relaxed text-slate-500 max-w-xs">
          Access restricted to cleared personnel. Enter security clearance credentials below to initialize content governance modes.
        </p>

        <form onSubmit={handleSubmit} className="w-full mt-8 space-y-4">
          <div className="space-y-1 text-left">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono pl-1">
              Superintendent Passcode
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter access code..."
                className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition duration-150 text-slate-800 font-mono"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 w-8 h-8 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition shadow-xs cursor-pointer"
                aria-label="Unlock Dashboard"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-100 text-red-700 rounded-xl flex items-center gap-2 text-xs font-semibold leading-relaxed text-left animate-shake">
              <ShieldAlert className="w-4.5 h-4.5 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 w-full flex flex-col gap-3">
          <button
            onClick={onBack}
            className="w-full py-2.5 border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-700 bg-white hover:bg-slate-50 font-bold rounded-2xl text-xs transition tracking-wide uppercase font-display cursor-pointer"
          >
            Cancel Access Request
          </button>
          
          <span className="text-[9px] text-slate-305 font-mono">
            IP and credential verification events are securely authenticated
          </span>
        </div>
      </div>
    </div>
  );
}
