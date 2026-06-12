/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Brain, Heart, MessageSquare, ShieldAlert, Sparkles, Trophy, ArrowRight, UserPlus, Zap } from "lucide-react";

interface LandingPageProps {
  onStartQuick: () => void;
  onStartFull: () => void;
  onAuthTrigger: () => void;
  isAuthenticated: boolean;
  username?: string;
  onLogout: () => void;
}

export default function LandingPage({
  onStartQuick,
  onStartFull,
  onAuthTrigger,
  isAuthenticated,
  username,
  onLogout
}: LandingPageProps) {
  
  const categories = [
    {
      icon: Brain,
      title: "Cognitive Intelligence",
      description: "Measures analytical reasoning, critical decision-making, logical operations, and context pattern recognition.",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      accent: "text-emerald-700"
    },
    {
      icon: Heart,
      title: "Emotional Intelligence (EQ)",
      description: "Maps emotional regulation, situational empathy, internal self-awareness, and relational synchronization.",
      color: "bg-teal-50 text-teal-600 border-teal-100",
      accent: "text-teal-700"
    },
    {
      icon: MessageSquare,
      title: "Communication Quotient (CQ)",
      description: "Measures articulation clarity, active listening, adaptive persuasion, and conversational confidence.",
      color: "bg-sky-50 text-sky-600 border-sky-100",
      accent: "text-sky-700"
    },
    {
      icon: Sparkles,
      title: "Big Five Personality",
      description: "Examines psychological traits: Openness, Conscientiousness, Extraversion, Agreeableness, and Emotional Stability.",
      color: "bg-purple-50 text-purple-600 border-purple-100",
      accent: "text-purple-700"
    },
    {
      icon: Trophy,
      title: "Strategic Leadership",
      description: "Scores executive initiative, delegation wisdom, team empowerment, and values-driven persuasion styles.",
      color: "bg-amber-50 text-amber-600 border-amber-100",
      accent: "text-amber-700"
    },
    {
      icon: ShieldAlert,
      title: "Work Style & Career Alignment",
      description: "Pins suitable operational environments, blindspots, and directions (e.g. Entrepreneur, Analyst, Consultant).",
      color: "bg-indigo-50 text-indigo-600 border-indigo-100",
      accent: "text-indigo-700"
    }
  ];

  return (
    <div className="relative overflow-hidden bg-slate-50 min-h-screen font-sans text-slate-800">
      
      {/* Background radial soft light blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-slate-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-indigo-50/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Header section with glassmorphism */}
      <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-40 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-indigo-650 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-sm shadow-indigo-200">
            AI
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 font-display">AVENIR</span>
          <div className="h-4 w-px bg-slate-200 mx-2 hidden sm:block"></div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest hidden sm:block font-mono text-[9px]">
            HUMAN INTELLIGENCE PLATFORM
          </span>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <span className="text-[9px] text-slate-400 block font-mono font-bold tracking-wider">AUTHORIZED ACCOUNT</span>
                <span className="text-sm font-semibold text-slate-800 font-display">{username}</span>
              </div>
              <div className="w-9 h-9 bg-indigo-50 border border-indigo-150 rounded-full shadow-xs flex items-center justify-center font-bold text-indigo-700 font-display">
                {username?.slice(0, 2).toUpperCase() || "AO"}
              </div>
              <button
                onClick={onLogout}
                className="text-xs font-bold text-slate-500 hover:text-red-650 py-1.5 px-3 rounded-lg hover:bg-slate-100 transition duration-150 cursor-pointer uppercase tracking-wider text-[10px]"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={onAuthTrigger}
              className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-800 bg-indigo-50 border border-indigo-100 hover:border-indigo-150 px-4 py-2 rounded-xl hover:bg-indigo-100/60 transition duration-150 cursor-pointer uppercase tracking-widest text-[9px] font-mono shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Profile</span>
            </button>
          )}
        </div>
      </header>

      {/* Hero Display Section */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full mb-6">
          <Zap className="w-3.5 h-3.5 text-indigo-600" />
          <span className="text-[10px] font-mono tracking-widest text-indigo-700 font-semibold uppercase">
            Standalone Potential Evaluator
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
          Discover your intelligence, personality and <span className="text-indigo-600">hidden strengths</span>.
        </h1>
        
        <p className="mt-6 text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Unlock an independent behavioral, cognitive, and relational analysis meticulously designed to score capability parameters, emotional intelligence models, and career alignment vectors.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartQuick}
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold rounded-xl shadow-md text-sm hover:-translate-y-0.5 transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Take Free Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onStartFull}
            className="w-full sm:w-auto px-8 py-4 border border-slate-200 bg-white text-slate-800 font-bold rounded-xl shadow-sm text-sm hover:border-indigo-600 hover:bg-slate-50 hover:-translate-y-0.5 transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Complete Full Evaluation</span>
            <Sparkles className="w-4 h-4 text-indigo-600" />
          </button>
        </div>

        <div className="mt-4 text-[11px] text-slate-400 font-mono font-bold uppercase tracking-wide">
          Quick test takes 5-7 mins (~30 questions)  •  Full profiling section series is ~100 scenario queries
        </div>
      </section>

      {/* Grid of categories evaluated */}
      <section className="bg-white border-y border-slate-200 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 font-display">
              Scientific Profiling Domains
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Our assessment algorithm decomposes psychometric intelligence variables tailored with high cultural and professional resonance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md hover:border-slate-300 transition duration-350 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${c.color} mb-4 shadow-xs`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 font-display mb-2">{c.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{c.description}</p>
                  </div>
                  <div className="mt-4 border-t border-slate-150 pt-3">
                    <span className={`text-[10px] font-mono tracking-widest ${c.accent} uppercase font-bold`}>
                      DEEP EVALUATION READY
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Testimonials or feature benefits */}
      <section className="max-w-5xl mx-auto py-20 px-6">
        <div className="bg-indigo-900 rounded-2xl p-8 lg:p-12 text-white shadow-lg relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-xl">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
              RESONANCE REQUIREMENT
            </span>
            <h3 className="text-2xl lg:text-3xl font-bold font-display mt-3 tracking-tight leading-snug">
              Contextualized scenarios mapping authentic real-life and business dynamics.
            </h3>
            <p className="mt-4 text-xs leading-relaxed opacity-90 text-indigo-100">
              No generic Western psychometric models here. Our profiles evaluate high-stakes decisions, family career expectations, cross-cultural pricing negotiations, and grid infrastructure challenges reflecting realistic African operational ecosystems.
            </p>
            <div className="mt-8 flex gap-4">
              <div className="border-l border-indigo-400 pl-4">
                <div className="text-xl font-bold font-display">100%</div>
                <div className="text-[11px] text-indigo-300 uppercase tracking-widest font-mono mt-1 font-bold">
                  Private Profiles
                </div>
              </div>
              <div className="border-l border-indigo-400 pl-4">
                <div className="text-xl font-bold font-display">Gemini AI</div>
                <div className="text-[11px] text-indigo-300 uppercase tracking-widest font-mono mt-1 font-bold">
                  Powered Reports
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="h-12 border-t border-slate-200 bg-white flex items-center px-8 justify-between shrink-0">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© 2026 Avenir Assessment Group • Confidential Intelligence Profile</div>
        <div className="flex gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <a href="#" className="hover:text-indigo-600 transition">Privacy Policy</a>
          <a href="#" className="hover:text-indigo-600 transition">Scientific Methodology</a>
          <a href="#" className="hover:text-indigo-600 transition">Support</a>
        </div>
      </footer>

    </div>
  );
}
