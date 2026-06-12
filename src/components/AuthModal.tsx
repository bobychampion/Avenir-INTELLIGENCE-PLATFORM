/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, Mail, User as UserIcon, Briefcase, Globe, Calendar, Key } from "lucide-react";
import { User, AdultProfile } from "../types";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User, profile: AdultProfile, isLogin: boolean) => void;
  initialMode?: "login" | "register";
}

export default function AuthModal({ isOpen, onClose, onSuccess, initialMode = "register" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  // Profile elements
  const [ageRange, setAgeRange] = useState("25-34");
  const [profession, setProfession] = useState("Entrepreneur");
  const [country, setCountry] = useState("Nigeria");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate simulated user
    const simulatedUser: User = {
      id: "u_" + Math.random().toString(36).substr(2, 9),
      name: mode === "register" ? name : email.split("@")[0] || "User",
      email: email || "user@avenir.com",
      role: email.toLowerCase().includes("admin") ? "admin" : "member",
      created_at: new Date().toISOString()
    };

    const simulatedProfile: AdultProfile = {
      id: "p_" + Math.random().toString(36).substr(2, 9),
      user_id: simulatedUser.id,
      age_range: ageRange,
      profession: profession,
      country: country
    };

    onSuccess(simulatedUser, simulatedProfile, mode === "login");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm font-sans">
      <div className="relative w-full max-w-md overflow-hidden bg-white rounded-2xl shadow-xl border border-slate-200">
        
        {/* Header decoration banner */}
        <div className="h-1.5 bg-indigo-600" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-display">
            {mode === "register" ? "Create Assessment Account" : "Access Personal Profile"}
          </h2>
          <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
            {mode === "register"
              ? "Gain secure cloud-style persistence, deep analytical histories, and tailored report modules."
              : "Access previous evaluations and sync progress markers."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            
            {mode === "register" && (
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-mono">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Chinedu Okafor"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition duration-150 text-slate-800"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-mono">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. chinedu@avenir.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition duration-150 text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-mono">
                Secure Password
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition duration-150 text-slate-800"
                />
              </div>
            </div>

            {mode === "register" && (
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-mono">
                    Age Group
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-3.5 w-3.5 h-3.5 text-slate-400" />
                    <select
                      value={ageRange}
                      onChange={(e) => setAgeRange(e.target.value)}
                      className="w-full pl-8 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white text-slate-800"
                    >
                      <option value="18-24">18 - 24 years</option>
                      <option value="25-34">25 - 34 years</option>
                      <option value="35-44">35 - 44 years</option>
                      <option value="45-54">45 - 54 years</option>
                      <option value="55+">55+ years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-mono">
                    Location Country
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-2.5 top-3.5 w-3.5 h-3.5 text-slate-400" />
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full pl-8 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white text-slate-800"
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Ghana">Ghana</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Rwanda">Rwanda</option>
                      <option value="Uganda">Uganda</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-mono">
                    Current Profession
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <select
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white text-slate-800"
                    >
                      <option value="Entrepreneur">Entrepreneur / Business Owner</option>
                      <option value="Software Developer">Software Engineer / Tech Analyst</option>
                      <option value="Creative Specialist">Creative Specialist / UX Designer</option>
                      <option value="Finance & Accounting">Finance Analyst / Accountant</option>
                      <option value="Manager & Director">Operations Manager / Project Director</option>
                      <option value="Consultant">Consultant / Business Coach</option>
                      <option value="Outside Student">Student / Academic Analyst</option>
                      <option value="General Professional">General Professional / Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 mt-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl text-xs transition shadow-md font-display tracking-widest uppercase cursor-pointer"
            >
              {mode === "register" ? "Establish Profile & Register" : "Secure Log In"}
            </button>

          </form>

          <div className="mt-6 flex flex-col items-center">
            <div className="relative w-full flex items-center justify-center mb-4">
              <div className="absolute inset-0 w-full border-t border-slate-150" />
              <span className="relative bg-white px-3 text-[9px] text-slate-400 uppercase tracking-widest font-mono font-bold">
                System Swapper
              </span>
            </div>

            <button
              onClick={() => setMode(mode === "register" ? "login" : "register")}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition py-1"
            >
              {mode === "register"
                ? "Already have an adult assessment account? Log In"
                : "Need an independent profile? Apply for registration"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
