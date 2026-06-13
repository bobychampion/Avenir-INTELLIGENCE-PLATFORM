/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, Mail, User as UserIcon, Briefcase, Globe, Calendar, Key, Loader2 } from "lucide-react";
import { User, AdultProfile } from "../types";
import { auth, db, handleFirestoreError, OperationType } from "../lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

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

  // Loading and Error States
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorText(null);
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(auth, provider);
      const fbUser = credential.user;

      // Check if user profile already exists
      const userDocRef = doc(db, "users", fbUser.uid);
      let docSnap;
      try {
        docSnap = await getDoc(userDocRef);
      } catch (fsErr) {
        handleFirestoreError(fsErr, OperationType.GET, `users/${fbUser.uid}`);
      }

      let appUser: User;
      let appProfile: AdultProfile;

      if (docSnap && docSnap.exists()) {
        const data = docSnap.data();
        appUser = {
          id: fbUser.uid,
          name: data.username || fbUser.displayName || fbUser.email?.split("@")[0] || "User",
          email: fbUser.email || data.email || "",
          role: data.role || "member",
          created_at: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
        };
        appProfile = {
          id: "profile_" + fbUser.uid,
          user_id: fbUser.uid,
          age_range: data.ageRange || "25-34",
          profession: data.profession || "Entrepreneur",
          country: data.country || "Nigeria"
        };
      } else {
        // If first-time user registers via Google, create their profile with selected form fields
        const userProfileData = {
          id: fbUser.uid,
          username: fbUser.displayName || fbUser.email?.split("@")[0] || "User",
          email: fbUser.email || "",
          role: "member",
          ageRange: ageRange,
          country: country,
          profession: profession,
          createdAt: serverTimestamp()
        };

        try {
          await setDoc(userDocRef, userProfileData);
        } catch (fsErr) {
          handleFirestoreError(fsErr, OperationType.CREATE, `users/${fbUser.uid}`);
        }

        appUser = {
          id: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split("@")[0] || "User",
          email: fbUser.email || "",
          role: "member",
          created_at: new Date().toISOString()
        };

        appProfile = {
          id: "profile_" + fbUser.uid,
          user_id: fbUser.uid,
          age_range: ageRange,
          profession: profession,
          country: country
        };
      }

      onSuccess(appUser, appProfile, true);
      onClose();
    } catch (err: any) {
      console.error("Google sign in error:", err);
      let msg = "Google authentication failed. Please try again.";
      if (err.code === "auth/popup-closed-by-user") {
        msg = "The sign-in popup was closed before completing.";
      } else if (err.message) {
        msg = err.message;
      }
      setErrorText(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorText(null);

    try {
      if (mode === "register") {
        // 1. Create firebase auth user
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        const fbUser = credential.user;

        // 2. Create the user profile inside Firestore
        const userDocRef = doc(db, "users", fbUser.uid);
        const userProfileData = {
          id: fbUser.uid,
          username: name || email.split("@")[0],
          email: email,
          role: "member", // by default
          ageRange: ageRange,
          country: country,
          profession: profession,
          createdAt: serverTimestamp()
        };

        try {
          await setDoc(userDocRef, userProfileData);
        } catch (fsErr) {
          handleFirestoreError(fsErr, OperationType.CREATE, `users/${fbUser.uid}`);
        }

        // 3. Return mapped app user models
        const appUser: User = {
          id: fbUser.uid,
          name: name || fbUser.email?.split("@")[0] || "User",
          email: fbUser.email || email,
          role: "member",
          created_at: new Date().toISOString()
        };

        const appProfile: AdultProfile = {
          id: "profile_" + fbUser.uid,
          user_id: fbUser.uid,
          age_range: ageRange,
          profession: profession,
          country: country
        };

        onSuccess(appUser, appProfile, false);
      } else {
        // Login mode
        const credential = await signInWithEmailAndPassword(auth, email, password);
        const fbUser = credential.user;

        // Fetch their profile from Firestore
        const userDocRef = doc(db, "users", fbUser.uid);
        let docSnap;
        try {
          docSnap = await getDoc(userDocRef);
        } catch (fsErr) {
          handleFirestoreError(fsErr, OperationType.GET, `users/${fbUser.uid}`);
        }

        let appUser: User;
        let appProfile: AdultProfile;

        if (docSnap && docSnap.exists()) {
          const data = docSnap.data();
          appUser = {
            id: fbUser.uid,
            name: data.username || fbUser.displayName || fbUser.email?.split("@")[0] || "User",
            email: fbUser.email || email,
            role: data.role || "member",
            created_at: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
          };
          appProfile = {
            id: "profile_" + fbUser.uid,
            user_id: fbUser.uid,
            age_range: data.ageRange || "25-34",
            profession: data.profession || "Entrepreneur",
            country: data.country || "Nigeria"
          };
        } else {
          // Fallback to defaults if developer manually cleared DB
          appUser = {
            id: fbUser.uid,
            name: fbUser.displayName || fbUser.email?.split("@")[0] || "User",
            email: fbUser.email || email,
            role: "member",
            created_at: new Date().toISOString()
          };
          appProfile = {
            id: "profile_" + fbUser.uid,
            user_id: fbUser.uid,
            age_range: "25-34",
            profession: "General Professional",
            country: "Nigeria"
          };
        }

        onSuccess(appUser, appProfile, true);
      }

      onClose();
    } catch (err: any) {
      console.error("Auth submit error:", err);
      // Construct a clean readable error message
      let msg = "An authentication error occurred. Please try again.";
      if (err.code === "auth/email-already-in-use") {
        msg = "The email address is already connected to another account.";
      } else if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        msg = "Invalid email address or password. Please verify your details.";
      } else if (err.code === "auth/weak-password") {
        msg = "The password is too weak. Please use at least 6 characters.";
      } else if (err.code === "auth/invalid-email") {
        msg = "Please provide a valid email format.";
      } else if (err.message) {
        msg = err.message;
      }
      setErrorText(msg);
    } finally {
      setIsLoading(false);
    }
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

          {errorText && (
            <div className="mt-4 p-3 bg-red-50 border border-red-150 rounded-xl text-xs text-red-650 font-medium leading-relaxed font-sans">
              {errorText}
            </div>
          )}

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
                    disabled={isLoading}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Chinedu Okafor"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition duration-150 text-slate-800 disabled:opacity-60"
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
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. chinedu@avenir.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition duration-150 text-slate-800 disabled:opacity-60"
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
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition duration-150 text-slate-800 disabled:opacity-60"
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
                      disabled={isLoading}
                      onChange={(e) => setAgeRange(e.target.value)}
                      className="w-full pl-8 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white text-slate-800 disabled:opacity-60"
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
                      disabled={isLoading}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full pl-8 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white text-slate-800 disabled:opacity-60"
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
                      disabled={isLoading}
                      onChange={(e) => setProfession(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white text-slate-800 disabled:opacity-60"
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
               disabled={isLoading}
               className="w-full py-3 mt-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl text-xs transition shadow-md font-display tracking-widest uppercase cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
             >
               {isLoading && <Loader2 className="w-4 h-4 animate-spin text-white" />}
               <span>{mode === "register" ? "Establish Profile & Register" : "Secure Log In"}</span>
             </button>

           </form>

           <div className="mt-5 flex flex-col items-center">
             <div className="relative w-full flex items-center justify-center mb-4">
               <div className="absolute inset-0 w-full border-t border-slate-200" />
               <span className="relative bg-white px-3 text-[9px] text-slate-400 uppercase tracking-widest font-mono font-bold">
                 or use cloud single sign-on
               </span>
             </div>

             <button
               type="button"
               disabled={isLoading}
               onClick={handleGoogleSignIn}
               className="w-full py-3 border border-slate-200 hover:bg-slate-55 active:bg-slate-100 rounded-xl text-xs font-semibold font-sans transition flex items-center justify-center gap-2.5 text-slate-700 cursor-pointer disabled:opacity-50"
             >
               <svg className="w-4 h-4" viewBox="0 0 24 24">
                 <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.54 14.98 1 12 1 7.35 1 3.37 3.65 1.39 7.56l3.92 3.04c.91-2.73 3.47-4.56 6.69-4.56z" />
                 <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.76 2.92c2.2-2.03 3.67-5.01 3.67-8.65z" fillRule="evenodd" clipRule="evenodd" />
                 <path fill="#FBBC05" d="M5.31 10.6c-.24-.7-.37-1.46-.37-2.24s.13-1.54.37-2.24L1.39 3.08C.5 4.88 0 6.88 0 9s.5 4.12 1.39 5.92l3.92-3.32z" />
                 <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.76-2.92c-1.05.7-2.39 1.13-4.2 1.13-3.22 0-5.78-1.83-6.69-4.56l-3.92 3.04C3.37 20.35 7.35 23 12 23z" />
               </svg>
               <span>Continue with Google</span>
             </button>
           </div>

           <div className="mt-6 flex flex-col items-center">
             <div className="relative w-full flex items-center justify-center mb-4">
               <div className="absolute inset-0 w-full border-t border-slate-150" />
               <span className="relative bg-white px-3 text-[9px] text-slate-400 uppercase tracking-widest font-mono font-bold">
                 System Swapper
               </span>
             </div>

            <button
              onClick={() => {
                setErrorText(null);
                setMode(mode === "register" ? "login" : "register");
              }}
              disabled={isLoading}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition py-1 disabled:opacity-50 cursor-pointer"
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
