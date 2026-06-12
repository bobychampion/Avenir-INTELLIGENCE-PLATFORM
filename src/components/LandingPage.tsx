/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Brain, 
  Heart, 
  MessageSquare, 
  ShieldAlert, 
  Sparkles, 
  Trophy, 
  ArrowRight, 
  UserPlus, 
  Zap,
  Loader2,
  Image as ImageIcon,
  Download,
  RefreshCw,
  Layers,
  HelpCircle
} from "lucide-react";

import realEstateImg from "../assets/images/real_estate_developer_abstract_1781284387487.jpg";
import agritechImg from "../assets/images/agritech_logistics_abstract_1781284404163.jpg";
import architectImg from "../assets/images/architect_surveyor_abstract_1781284419659.jpg";

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

  // Success Journeys & AI Image Generator States
  const [activeJourney, setActiveJourney] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedImgUrl, setGeneratedImgUrl] = useState<string | null>(null);
  const [genProfession, setGenProfession] = useState<string>("Bespoke Residential Architecture");
  const [genStyle, setGenStyle] = useState<string>("Symmetry Blueprint");
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [generationLog, setGenerationLog] = useState<Array<{prompt: string, style: string, timestamp: string}>>([]);

  const journeys = [
    {
      id: 0,
      role: "Real Estate Developer",
      tagline: "Structuring multi-stakeholder building proposals",
      desc: "Combines high cognitive analytical reasoning for site weighted parameters, with high situational empathy to settle subcontractor delivery delays on-site and clear administrative hurdles.",
      metrics: ["Cognitive Intelligence", "Conscientiousness", "Strategic Leadership"],
      image: realEstateImg,
      accent: "from-blue-600 to-indigo-700"
    },
    {
      id: 1,
      role: "Agricultural Logistics Lead",
      tagline: "Synchronizing multi-modal product transit runs",
      desc: "Troubleshoots major crop transit bottlenecks under weather or regional constraints. Couples emotional self-awareness with active listening parameters to adapt field workers'SMS logs.",
      metrics: ["Stress Stability", "Active Persuasion", "Decision Making"],
      image: agritechImg,
      accent: "from-emerald-600 to-teal-700"
    },
    {
      id: 2,
      role: "Lead Architect Surveyor",
      tagline: "Verifying intricate structural compliance outlines",
      desc: "Demands meticulous conscientiousness to catalog blueprints. Leverages dynamic co-design frameworks to map user flow and resolve site-access ramp problems cleanly before concrete pouring.",
      metrics: ["Conscientiousness", "Co-design Thinking", "Relationship CQ"],
      image: architectImg,
      accent: "from-slate-750 to-slate-900"
    }
  ];

  const handleGenerateArt = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setGenerationError(null);
    try {
      const response = await fetch("/api/generate-journey-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profession: genProfession,
          style: genStyle,
          customPrompt: customPrompt
        })
      });
      if (!response.ok) {
        throw new Error("Dynamic imagery server-side handler reported an unexpected status.");
      }
      const data = await response.json();
      if (data && data.imageUrl) {
        setGeneratedImgUrl(data.imageUrl);
        setGenerationLog(prev => [
          {
            prompt: customPrompt || `A professional dynamic artwork showcasing ${genProfession}`,
            style: genStyle,
            timestamp: new Date().toLocaleTimeString()
          },
          ...prev
        ]);
      } else {
        throw new Error("No abstract image payload decoded from service response.");
      }
    } catch (err: any) {
      console.error(err);
      setGenerationError(err.message || "Failed to generate dynamic artwork.");
    } finally {
      setIsGenerating(false);
    }
  };
  
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

      {/* SUCCESS JOURNEYS SECTION */}
      <section className="bg-slate-100/50 border-b border-slate-200 py-20 px-6" id="success_journeys_section">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-100 rounded-full mb-3">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-[10px] font-mono tracking-widest text-amber-700 font-semibold uppercase">
                Metrics Applied In-Field
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 font-display">
              Success Journeys
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              See how different professionals translate analytical, relational, and emotional psychometrics into real-world operational mastery.
            </p>
          </div>

          {/* Interactive tabs */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar selection tabs */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-1 block">
                Select Domain Specialty
              </span>
              {journeys.map((j) => (
                <button
                  key={j.id}
                  onClick={() => {
                    setActiveJourney(j.id);
                    setGeneratedImgUrl(null);
                  }}
                  className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    activeJourney === j.id
                      ? "bg-white border-indigo-600 shadow-sm ring-1 ring-indigo-600/10"
                      : "bg-slate-50 hover:bg-slate-105 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 font-mono">0{j.id + 1}</span>
                    <div className="flex gap-1">
                      {j.metrics.slice(0, 1).map((m, idx) => (
                        <span key={idx} className="text-[8px] font-bold font-mono px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded uppercase">
                          {m.split(" ")[0]}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 font-display mt-2">{j.role}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-1 font-display">{j.tagline}</p>
                </button>
              ))}

              {/* Dynamic generator indicator card */}
              <div className="mt-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-indigo-800">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-bold font-display uppercase tracking-wider">AI Co-Creator Active</span>
                </div>
                <p className="text-[11px] text-indigo-950 mt-1.5 leading-relaxed font-display">
                  Want a motivational representation tailored strictly to your own unique niche? Use our custom generator style tool below!
                </p>
              </div>
            </div>

            {/* Display panel */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-6 md:items-center min-h-[380px]">
              
              {/* Info columns */}
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <span className="text-[9px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    JOURNEY FOCUS
                  </span>
                  
                  <h3 className="text-xl font-bold text-slate-900 font-display mt-3">
                    {journeys[activeJourney].role}
                  </h3>
                  <p className="text-xs font-semibold text-indigo-600 block mt-1 font-display italic">
                    "{journeys[activeJourney].tagline}"
                  </p>
                  
                  <p className="text-xs text-slate-500 leading-relaxed mt-4 font-display">
                    {journeys[activeJourney].desc}
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-2 font-bold">
                    PREMIER APPLIED METRICS
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {journeys[activeJourney].metrics.map((m, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono bg-slate-50 border border-slate-200 text-slate-600 font-semibold px-2 py-1 rounded-lg"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image Visual Container */}
              <div className="w-full md:w-80 shrink-0 aspect-[16/9] md:aspect-square bg-slate-900 rounded-2xl overflow-hidden relative border border-slate-150 group">
                <img
                  src={journeys[activeJourney].image}
                  alt={journeys[activeJourney].role}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual shadow overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[10px] font-mono text-indigo-300 uppercase tracking-widest font-bold">DEFAULT MOTIVATIONAL METRIC THEME</p>
                  <p className="text-xs font-bold font-display mt-0.5 leading-tight">{journeys[activeJourney].role} Archetype</p>
                </div>
              </div>

            </div>

          </div>

          {/* DYNAMIC CO-CREATION ENGINE SUB-SECTION */}
          <div className="mt-12 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm text-slate-800" id="dynamic_co_creation_engine_form">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display">Success Journey Theme Co-Creator</h3>
                  <p className="text-xs text-slate-400">Synthesize customized abstract motivational blueprints for your niche via Gemini AI.</p>
                </div>
              </div>
              <div className="text-[9px] font-mono font-bold uppercase text-slate-400">
                AI Engine: IMAGEN-4.0 / GEMINI-2.5-IMAGE
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Form elements */}
              <form onSubmit={handleGenerateArt} className="lg:col-span-5 flex flex-col gap-4">
                
                {/* Specialty dropdown */}
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Your Niche Industry / Specialty
                  </label>
                  <select
                    value={genProfession}
                    onChange={(e) => setGenProfession(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold font-display text-slate-800 focus:outline-none focus:border-indigo-650 focus:ring-1 focus:ring-indigo-600/10 cursor-pointer"
                  >
                    <option value="Bespoke Residential Architecture">Bespoke Residential Architecture</option>
                    <option value="Real Estate Capital Funding">Real Estate Capital Funding</option>
                    <option value="Drywall Operations Site Manager">Drywall Operations Site Manager</option>
                    <option value="Concrete Survey Logistics">Concrete Survey Logistics</option>
                    <option value="Civil General Construction">Civil General Construction</option>
                    <option value="Farming Systems drone lead">Farming Systems drone lead</option>
                  </select>
                </div>

                {/* Abstract Style options */}
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Abstract Artistic Style Theme
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: "Symmetry Blueprint", label: "Blueprint Navy", desc: "Detailed technical grid lines" },
                      { name: "Futuristic Site Geometry", label: "Emerald Tech", desc: "Sleek glowing accents" },
                      { name: "Warm Editorial Watercolor", label: "Rustic Bronze", desc: "Watercolor and charcoal textures" },
                      { name: "Warm Organic Clay", label: "Teal Clay contours", desc: "Smooth layered earthy tones" }
                    ].map((s) => (
                      <button
                        key={s.name}
                        type="button"
                        onClick={() => setGenStyle(s.name)}
                        className={`text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                          genStyle === s.name
                            ? "bg-indigo-50/50 border-indigo-600 ring-1 ring-indigo-600/10"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200"
                        }`}
                      >
                        <p className="text-xs font-bold text-slate-800 font-display">{s.label}</p>
                        <p className="text-[9px] text-slate-400 mt-0.5 leading-snug">{s.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional description input */}
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Ad-hoc Creative Prompt Guidance <span className="text-slate-400 lowercase italic">(optional)</span>
                  </label>
                  <textarea
                    placeholder="e.g. golden ratios, sand grain gradients, glowing vector nodes, high-contrast, clean corporate minimalist..."
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl p-3 text-xs focus:outline-none focus:border-indigo-650 focus:ring-1 focus:ring-indigo-650/10 min-h-[70px] leading-relaxed text-slate-700"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-805 text-white py-3 rounded-xl shadow-md text-xs font-bold font-display transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Synthesizing Canvas Artwork...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Generate Dynamic Journey Art</span>
                    </>
                  )}
                </button>

                {generationError && (
                  <p className="text-[10px] text-red-600 font-mono italic leading-snug mt-1 bg-red-50 border border-red-100 rounded-lg p-2">
                    Notice: {generationError}
                  </p>
                )}

              </form>

              {/* Canvas Preview Container */}
              <div className="lg:col-span-7 bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden aspect-[16/9] flex flex-col justify-between p-6 relative select-none">
                
                {/* Custom grid lines inside preview card */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />
                <div className="absolute inset-0 opacity-10" style={{ 
                  backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`, 
                  backgroundSize: '24px 24px' 
                }} />

                {isGenerating ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-white relative z-10 gap-3">
                    <Loader2 className="w-10 h-10 animate-spin text-indigo-400" />
                    <div>
                      <h4 className="text-xs font-bold font-display text-slate-100">Contacting Gemini Image Engine...</h4>
                      <p className="text-[10px] text-slate-400 mt-1 max-w-sm">Generating premium high-contrast mathematical art or compiling SVG vector grid coordinates.</p>
                    </div>
                  </div>
                ) : generatedImgUrl ? (
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={generatedImgUrl}
                      alt="Generated Journey Artwork"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Floating controls */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <a
                        href={generatedImgUrl}
                        download={`avenir-journey-${genProfession.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                        className="p-1.5 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg transition duration-150 decoration-none"
                        title="Download image"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => setGeneratedImgUrl(null)}
                        className="p-1.5 bg-slate-950/80 hover:bg-slate-900 text-white rounded-lg transition duration-150 text-[10px] font-mono tracking-wide uppercase font-bold cursor-pointer"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 relative z-10 p-6">
                    <div className="w-12 h-12 bg-slate-900 border border-slate-850 text-slate-400 flex items-center justify-center rounded-xl mb-3">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-350 font-display">Live Abstract Preview Standby</h3>
                    <p className="text-[10px] text-slate-500 mt-1 max-w-xs leading-relaxed">
                      Select your specialty and design language style on the left, then trigger generation to render immediate high-fidelity visual context.
                    </p>
                  </div>
                )}

                {/* Overlay details */}
                <div className="relative z-10 flex items-end justify-between text-white border-t border-slate-900 pt-3">
                  <div>
                    <span className="text-[8px] font-mono font-bold tracking-widest text-slate-400 uppercase">SUBJECT DESIGN PARADE</span>
                    <p className="text-[11px] font-bold font-display text-indigo-200 mt-0.5">{genProfession}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] font-mono font-bold tracking-widest text-slate-400 uppercase">VISUAL GENRE</span>
                    <p className="text-[11px] font-bold font-display text-emerald-400 mt-0.5">{genStyle}</p>
                  </div>
                </div>

              </div>

            </div>

            {/* Generated Log details */}
            {generationLog.length > 0 && (
              <div className="mt-6 pt-5 border-t border-slate-100">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2 font-bold">GENERATION SESSIONS HISTORY</span>
                <div className="flex flex-col gap-2 max-h-[120px] overflow-y-auto">
                  {generationLog.map((log, index) => (
                    <div key={index} className="flex justify-between items-center bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-slate-600 text-[10px]">
                      <div className="flex items-center gap-2 font-display">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-semibold text-slate-800 font-display">Session #{generationLog.length - index}</span>
                        <span className="text-slate-400 font-mono">"{log.prompt}"</span>
                      </div>
                      <div className="flex gap-4 font-mono font-bold text-[9px] text-slate-400">
                        <span>Style: {log.style}</span>
                        <span>{log.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
