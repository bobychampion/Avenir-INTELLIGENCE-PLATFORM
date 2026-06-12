/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Brain, Sparkles, AlertCircle, RefreshCw, Layers, ShieldAlert, Settings } from "lucide-react";
import { User, AdultProfile, Assessment, AIReport, AssessmentCategory, AssessmentResponse } from "./types";
import LandingPage from "./components/LandingPage";
import { useToast } from "./components/Toast";
import AuthModal from "./components/AuthModal";
import AssessmentRunner from "./components/AssessmentRunner";
import ReportView from "./components/ReportView";
import Dashboard from "./components/Dashboard";
import AdminPanel from "./components/AdminPanel";
import AdminGateway from "./components/AdminGateway";
import { generateReportClientSide } from "./lib/geminiFallback";

export default function App() {
  const { addToast } = useToast();
  // Routes State - sync with URL pathname
  const [currentRoute, setCurrentRoute] = useState<"landing" | "test" | "results" | "profile" | "admin">("landing");
  
  // Auth & Profile states
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AdultProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTriggerMode, setAuthTriggerMode] = useState<"login" | "register">("register");

  // Admin Authorization State
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const hasAdminPrivileges = (user?.role === "admin") || isAdminUnlocked;

  // Active Assessment running
  const [activeTestType, setActiveTestType] = useState<"quick" | "full">("quick");
  
  // Scoring / View states
  const [activeScores, setActiveScores] = useState<{ [key in AssessmentCategory]?: number }>({});
  const [activeReport, setActiveReport] = useState<AIReport | null>(null);

  // Users Histories Log
  const [historyList, setHistoryList] = useState<{ assessment: Assessment; report: AIReport }[]>([]);

  // AI Generation Loading states
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilingStep, setCompilingStep] = useState(0);

  // Synchronize on mount with pathname routing
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path === "/adult/test") {
        setCurrentRoute("test");
        setActiveTestType("quick");
      } else if (path === "/adult/results") {
        setCurrentRoute("results");
      } else if (path === "/adult/profile") {
        setCurrentRoute("profile");
      } else if (path === "/adult/admin" || path === "/adult/admin/") {
        setCurrentRoute("admin");
      } else {
        setCurrentRoute("landing");
      }
    };

    window.addEventListener("popstate", handleLocationChange);
    handleLocationChange(); // run on initial mount

    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // load user from localStorage if authenticated
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("avenir_auth_user");
      const savedProfile = localStorage.getItem("avenir_auth_profile");
      if (savedUser && savedProfile) {
        const parsedUser = JSON.parse(savedUser);
        const parsedProfile = JSON.parse(savedProfile);
        setUser(parsedUser);
        setProfile(parsedProfile);
        
        // Load history logs for this specific user
        const savedHistory = localStorage.getItem(`avenir_history_${parsedUser.id}`);
        if (savedHistory) {
          setHistoryList(JSON.parse(savedHistory));
        }
      }
    } catch (err) {
      console.error("Failed to load user session from localStorage:", err);
    }
  }, []);

  // Sync route utility
  const navigateTo = (route: "landing" | "test" | "results" | "profile" | "admin") => {
    let path = "/adult";
    if (route === "test") path = "/adult/test";
    if (route === "results") path = "/adult/results";
    if (route === "profile") path = "/adult/profile";
    if (route === "admin") path = "/adult/admin";

    window.history.pushState(null, "", path);
    setCurrentRoute(route);
  };

  // Auth successful callback
  const handleAuthSuccess = (simulatedUser: User, simulatedProfile: AdultProfile, isLogin: boolean) => {
    setUser(simulatedUser);
    setProfile(simulatedProfile);
    localStorage.setItem("avenir_auth_user", JSON.stringify(simulatedUser));
    localStorage.setItem("avenir_auth_profile", JSON.stringify(simulatedProfile));

    // Load any existing histories for this unique client
    const savedHistory = localStorage.getItem(`avenir_history_${simulatedUser.id}`);
    if (savedHistory) {
      setHistoryList(JSON.parse(savedHistory));
    } else {
      setHistoryList([]);
    }

    if (isLogin) {
      addToast(
        `Welcome back, ${simulatedUser.name}! Your workspace profile and diagnostics have been loaded successfully.`,
        "welcome",
        "Profile Authorized"
      );
    } else {
      addToast(
        `Congratulations, ${simulatedUser.name}! Your new candidate intelligence account has been created.`,
        "success",
        "Profile Registered"
      );
    }

    // Redirect to profile dashboard
    navigateTo("profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("avenir_auth_user");
    localStorage.removeItem("avenir_auth_profile");
    setUser(null);
    setProfile(null);
    setHistoryList([]);
    setIsAdminUnlocked(false);
    navigateTo("landing");
  };

  // Launch assessments
  const handleStartQuick = () => {
    setActiveTestType("quick");
    navigateTo("test");
  };

  const handleStartFull = () => {
    if (!user) {
      // User must register first for full evaluation history
      setAuthTriggerMode("register");
      setIsAuthModalOpen(true);
    } else {
      setActiveTestType("full");
      navigateTo("test");
    }
  };

  // Calculate scores and compile report via server-side Gemini
  const handleAssessmentComplete = async (responses: AssessmentResponse[]) => {
    setIsCompiling(true);
    setCompilingStep(0);

    // Dynamic loading screen steps
    const steps = [
      "Securing situational choices context vectors...",
      "Calculating Cognitive analytical thresholds...",
      "Resolving Emotional balance regulatory constants...",
      "Fusing native communications (CQ) nuance patterns...",
      "Mapping Big Five personality trait coordinates...",
      "Summoning Gemini Industrial Psychologist modeling agency..."
    ];

    const timer = setInterval(() => {
      setCompilingStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1500);

    // 1. Calculate numerical index scores per category (scale 0-100)
    // Formula: ((sumOfScoresForCategory / count) - 1) / 4 * 100
    const calculatedScores: { [key in AssessmentCategory]?: number } = {};
    
    Object.values(AssessmentCategory).forEach((cat) => {
      const catResponses = responses.filter(r => r.category === cat);
      if (catResponses.length > 0) {
        const total = catResponses.reduce((sum, r) => sum + r.score, 0);
        const avg = total / catResponses.length;
        // Project a 1-5 average rating onto a 0-100 percentage scale
        const scaled = ((avg - 1) / 4) * 100;
        calculatedScores[cat] = Math.round(scaled);
      } else {
        // Fallback or unprovided
        calculatedScores[cat] = 50;
      }
    });

    // 2. Invoke local Express server-side endpoint proxying the Gemini API, with client-side fallback
    try {
      let reportData: any;
      
      try {
        const response = await fetch("/api/generate-report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user?.name || "Anonymous Friend",
            ageRange: profile?.age_range || "Not specified",
            country: profile?.country || "Not specified",
            profession: profile?.profession || "Not specified",
            type: activeTestType,
            responses: responses,
            scores: calculatedScores
          })
        });

        const text = await response.text();
        if (!response.ok || text.trim().startsWith("<")) {
          throw new Error("Local server reported 404 or page fallback (Netlify redirection).");
        }
        reportData = JSON.parse(text);
      } catch (innerErr) {
        console.log("Using browser-side dynamic Gemini client fallback for static hosting/Netlify environments...", innerErr);
        reportData = await generateReportClientSide({
          name: user?.name || "Anonymous Friend",
          ageRange: profile?.age_range || "Not specified",
          country: profile?.country || "Not specified",
          profession: profile?.profession || "Not specified",
          type: activeTestType,
          responses: responses,
          scores: calculatedScores
        });
      }

      clearInterval(timer);

      // Create history record
      const simulatedAssessment: Assessment = {
        id: "a_" + Math.random().toString(36).substr(2, 9),
        userId: user?.id || "anon",
        type: activeTestType,
        status: "completed",
        responses: responses,
        scores: calculatedScores,
        completed_date: new Date().toISOString()
      };

      const finalReport: AIReport = {
        ...reportData,
        id: "report_" + Math.random().toString(36).substr(2, 9),
        assessment_id: simulatedAssessment.id,
        created_date: new Date().toISOString()
      };

      setActiveScores(calculatedScores);
      setActiveReport(finalReport);

      // Save to user history if authenticated
      if (user) {
        const updatedHistory = [{ assessment: simulatedAssessment, report: finalReport }, ...historyList];
        setHistoryList(updatedHistory);
        localStorage.setItem(`avenir_history_${user.id}`, JSON.stringify(updatedHistory));
      }

      setIsCompiling(false);
      
      addToast(
        "Diagnostic compiling complete! Your executive report has been synthesized successfully.",
        "success",
        "Evaluation Synthesized"
      );

      navigateTo("results");

    } catch (err) {
      console.error("Endpoint compilation error, resolving static safety models:", err);
      clearInterval(timer);
      setIsCompiling(false);
      navigateTo("landing");
    }
  };

  const handleDeleteRecord = (assessmentId: string) => {
    if (!user) return;
    const filtered = historyList.filter(item => item.assessment.id !== assessmentId);
    setHistoryList(filtered);
    localStorage.setItem(`avenir_history_${user.id}`, JSON.stringify(filtered));
  };

  const handleRetrievePastReport = (assessment: Assessment, report: AIReport) => {
    setActiveScores(assessment.scores);
    setActiveReport(report);
    navigateTo("results");
  };

  // Navigation callbacks for report restart
  const handleRestart = () => {
    if (user) {
      navigateTo("profile");
    } else {
      navigateTo("landing");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 selection:bg-teal-100 selection:text-teal-900 font-sans">
      
      {/* Dynamic Compiling Process Modal overlay */}
      {isCompiling && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-gray-100 shadow-2xl text-center">
            <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-teal-50 border border-teal-100 text-teal-600 rounded-2xl animate-pulse">
              <RefreshCw className="w-8 h-8 animate-spin" />
            </div>

            <h3 className="text-xl font-extrabold text-gray-900 font-display">
              Compiling Personal Potentials Report
            </h3>
            
            <p className="mt-2 text-xs text-gray-400 font-mono tracking-widest uppercase">
              DEEP PSYCHOMETRIC SYNTHESIZER
            </p>

            <div className="mt-8 p-4 bg-gray-50 border border-gray-100 rounded-xl">
              <span className="text-xs text-indigo-600 font-mono font-bold block animate-bounce">
                Step Map: {compilingStep + 1} of 6
              </span>
              <span className="text-sm font-semibold text-gray-700 font-display mt-1 block">
                {compilingStep === 0 && "Securing situational choices context vectors..."}
                {compilingStep === 1 && "Calculating Cognitive analytical thresholds..."}
                {compilingStep === 2 && "Resolving Emotional balance regulatory constants..."}
                {compilingStep === 3 && "Fusing native communications (CQ) nuance patterns..."}
                {compilingStep === 4 && "Mapping Big Five personality trait coordinates..."}
                {compilingStep === 5 && "Summoning Gemini Industrial Psychologist modeling agency..."}
              </span>
            </div>

            <p className="mt-6 text-[11px] text-gray-400 leading-normal">
              Avenir Standalone Engine utilizes safe, generative modeling server-side to fuse analytical statistics into self-development recommendations.
            </p>
          </div>
        </div>
      )}

      {/* Main Pages router */}
      <main>
        {currentRoute === "landing" && (
          <LandingPage
            onStartQuick={handleStartQuick}
            onStartFull={handleStartFull}
            onAuthTrigger={() => { setAuthTriggerMode("register"); setIsAuthModalOpen(true); }}
            isAuthenticated={!!user}
            username={user?.name}
            onLogout={handleLogout}
          />
        )}

        {currentRoute === "test" && (
          <AssessmentRunner
            type={activeTestType}
            userId={user?.id || "anon"}
            onComplete={handleAssessmentComplete}
            onCancel={handleRestart}
          />
        )}

        {currentRoute === "results" && activeReport && (
          <ReportView
            report={activeReport}
            scores={activeScores}
            candidateName={user?.name || "Anonymous Candidate"}
            onRestart={handleRestart}
          />
        )}

        {currentRoute === "profile" && user && profile && (
          <Dashboard
            user={user}
            profile={profile}
            history={historyList}
            onViewReport={handleRetrievePastReport}
            onDeleteRecord={handleDeleteRecord}
            onStartNewQuick={handleStartQuick}
            onStartNewFull={handleStartFull}
          />
        )}

        {currentRoute === "admin" && (
          hasAdminPrivileges ? (
            <AdminPanel onBack={handleRestart} />
          ) : (
            <AdminGateway 
              onUnlockSuccess={() => setIsAdminUnlocked(true)} 
              onBack={handleRestart} 
            />
          )
        )}
      </main>

      {/* Persistent global routing shortcuts toolbar - hidden in full test engine to prevent exit by mistake */}
      {currentRoute !== "test" && (
        <div className="max-w-6xl mx-auto px-6 pb-12 pt-6 flex flex-wrap items-center justify-between border-t border-gray-100 gap-4 mt-12 text-xs text-gray-400">
          <div className="flex gap-4">
            <button
              onClick={() => navigateTo("landing")}
              className="hover:text-indigo-600 transition"
            >
              Assessment Home
            </button>
            {user && (
              <button
                onClick={() => navigateTo("profile")}
                className="hover:text-indigo-600 transition"
              >
                My Profile Dashboard
              </button>
            )}
            {hasAdminPrivileges && (
              <button
                onClick={() => navigateTo("admin")}
                className="hover:text-indigo-600 transition flex items-center gap-1 font-bold text-gray-500 font-mono text-[10px]"
              >
                <Settings className="w-3 h-3 text-gray-400" />
                <span>Admin Center</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-gray-300" />
            <span>Operational Standalone Mode</span>
          </div>
        </div>
      )}

      {/* Auth modal triggers */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authTriggerMode}
      />

    </div>
  );
}
