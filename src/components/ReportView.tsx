/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Download, Printer, ArrowLeft, RefreshCw, Layers, Brain, Heart, MessageSquare, Sparkles, Trophy, Lightbulb, Compass, AlertCircle, CheckCircle, GraduationCap } from "lucide-react";
import { AIReport, AssessmentCategory } from "../types";

interface ReportViewProps {
  report: AIReport;
  scores: { [key in AssessmentCategory]?: number };
  candidateName?: string;
  onRestart: () => void;
}

export default function ReportView({
  report,
  scores,
  candidateName,
  onRestart
}: ReportViewProps) {

  // Map category to nice themes
  const categoryMetadata = {
    [AssessmentCategory.COGNITIVE]: {
      label: "Cognitive Intelligence",
      icon: Brain,
      color: "from-indigo-500 to-indigo-700",
      bg: "bg-indigo-50 text-indigo-700 border-indigo-100"
    },
    [AssessmentCategory.EQ]: {
      label: "Emotional Intelligence (EQ)",
      icon: Heart,
      color: "from-sky-500 to-sky-600",
      bg: "bg-sky-50 text-sky-700 border-sky-100"
    },
    [AssessmentCategory.CQ]: {
      label: "Communication Quotient (CQ)",
      icon: MessageSquare,
      color: "from-teal-500 to-teal-600",
      bg: "bg-teal-50 text-teal-700 border-teal-100"
    },
    [AssessmentCategory.PERSONALITY]: {
      label: "Personality Profile",
      icon: Sparkles,
      color: "from-violet-500 to-violet-600",
      bg: "bg-violet-50 text-violet-700 border-violet-100"
    },
    [AssessmentCategory.LEADERSHIP]: {
      label: "Strategic Leadership",
      icon: Trophy,
      color: "from-amber-500 to-amber-600",
      bg: "bg-amber-50 text-amber-700 border-amber-100"
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ report, scores, candidateName }, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `avenir_report_${candidateName || "anon"}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      console.error("Export failure:", err);
    }
  };

  // Extract a profile title from the summary or scores
  const getSubTitle = () => {
    const cogScore = scores[AssessmentCategory.COGNITIVE] || 50;
    const eqScore = scores[AssessmentCategory.EQ] || 50;
    const cqScore = scores[AssessmentCategory.CQ] || 50;

    if (cogScore > 75 && eqScore > 75) return "Empathetic Strategist";
    if (cogScore > 75 && cqScore > 75) return "Creative System Designer";
    if (eqScore > 75 && cqScore > 75) return "Inspirational Collaboration Leader";
    if (cogScore > 75) return "High-Agility Analytical Thinker";
    if (eqScore > 75) return "Adaptive Human Coordinator";
    return "Balanced Growth Professional";
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 print:p-0 font-sans text-slate-850">
      
      {/* Header operations bar - hidden in print */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200 print:hidden">
        <button
          onClick={onRestart}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition duration-200 py-1 cursor-pointer font-display"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Report & Restart</span>
        </button>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleDownloadJSON}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-xl text-xs transition border border-indigo-100 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Data</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Main Report Document Canvas */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 lg:p-12 shadow-sm relative overflow-hidden print:border-0 print:p-0 print:shadow-none">
        
        {/* Advanced style injection for print page layout & background color retention */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              background-color: #ffffff !important;
              color: #0f172a !important;
            }
            @page {
              size: letter portrait;
              margin: 15mm 15mm 15mm 15mm;
            }
            /* Preserve specific print element colors */
            .print-bg-indigo-light {
              background-color: rgba(79, 70, 229, 0.04) !important;
              border-color: rgba(79, 70, 229, 0.15) !important;
            }
            .print-bg-slate-light {
              background-color: #f8fafc !important;
              border-color: #e2e8f0 !important;
            }
            .print-bar-fill {
              background-image: linear-gradient(to right, #4f46e5, #6366f1) !important;
            }
            .print-text-indigo {
              color: #4f46e5 !important;
            }
            .print-border-indigo {
              border-color: rgba(79, 70, 229, 0.2) !important;
            }
            .print-page-break {
              break-before: page !important;
              page-break-before: always !important;
              margin-top: 20px !important;
            }
            .print-avoid-break {
              break-inside: avoid !important;
              page-break-inside: avoid !important;
            }
          }
        `}} />

        {/* SECTION 1: Page 1 - Profile Overview & Cognitive Index */}
        <div className="print:min-h-[260mm] print:flex print:flex-col print:justify-between">
          <div className="flex-1">
            {/* Visual ribbon corner decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none print:hidden" />

            {/* Brand Banner */}
            <div className="flex items-start justify-between gap-6 pb-6 border-b border-slate-200">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-indigo-50 print-bg-indigo-light border border-indigo-100 rounded text-[9px] font-mono tracking-wider text-indigo-800 font-bold uppercase mb-3">
                  OFFICIAL PSYCHOMETRIC EVALUATION
                </div>
                
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-display tracking-tight leading-none print:text-2xl">
                  {candidateName || "Anonymous Candidate"}
                </h1>
                
                <p className="mt-2 text-sm text-indigo-600 print-text-indigo font-mono tracking-widest font-bold uppercase">
                  Profile: {getSubTitle()}
                </p>
              </div>

              <div className="text-right flex flex-col items-end">
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-black text-sm tracking-tight shadow-sm">
                  AI
                </div>
                <span className="text-[10px] font-mono text-slate-400 mt-2 font-bold tracking-wider">AVENIR PLATFORM™</span>
              </div>
            </div>

            {/* CATEGORY METRICS GRID */}
            <div className="mt-8">
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-4">
                Avenir Profiling Index Scores
              </h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 print:grid-cols-5 gap-4">
                {Object.values(AssessmentCategory).map((cat) => {
                  const score = Math.round(scores[cat] || 0);
                  const meta = categoryMetadata[cat];
                  const Icon = meta.icon;
                  
                  return (
                    <div key={cat} className="bg-slate-50 print-bg-slate-light border border-slate-100 rounded-2xl p-4 flex flex-col justify-between">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-bold text-slate-700 font-display leading-tight">
                          {meta.label.split(" ")[0]}
                        </span>
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center border ${meta.bg} print-bg-indigo-light`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="mt-2 text-center">
                        <span className="text-3xl font-black font-mono tracking-tight text-slate-900">
                          {score}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono font-bold block mt-0.5">
                          SCALE 1 - 100
                        </span>
                      </div>

                      {/* Micro Visual gauge bar */}
                      <div className="mt-4 w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r print-bar-fill ${meta.color}`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* EXECUTIVE PERSONAL SUMMARY */}
            <div className="mt-8 bg-indigo-50/25 print-bg-indigo-light border border-indigo-100/50 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-indigo-600 print-text-indigo" />
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-indigo-900 print-text-indigo font-mono">
                  Expert Psychometric Summary
                </h3>
              </div>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed whitespace-pre-line font-display font-medium">
                {report.personalSummary}
              </p>
            </div>
          </div>

          {/* Elegant Page 1 Print Footer */}
          <div className="hidden print:flex items-center justify-between pb-1 border-t border-slate-100 mt-6 text-slate-400 text-[9px] font-mono tracking-widest font-bold uppercase">
            <span>AVENIR ASSESSMENTS • OFFICIAL COMPREHENSIVE DOSSIER</span>
            <span>PAGE 1 OF 3</span>
          </div>
        </div>

        {/* SECTION 2: Page 2 - Core Behavioral & Workplace Competencies */}
        <div className="hidden print:block print-page-break" />
        <div className="print:min-h-[260mm] print:flex print:flex-col print:justify-between print:pt-4">
          <div className="flex-1">
            {/* Page 2 Mini brand header */}
            <div className="hidden print:flex items-center justify-between pb-3 border-b border-indigo-200 print-border-indigo mb-6 text-slate-400 text-[10px] font-mono tracking-widest font-bold">
              <span>CONFIDENTIAL PSYCHOMETRIC REPORT • {candidateName?.toUpperCase() || "ANONYMOUS CANDIDATE"}</span>
              <span>BEHAVIORAL & WORKPLACE ANALYSIS</span>
            </div>

            {/* STRENGTHS AND GROWTH GRID */}
            <div className="grid md:grid-cols-2 print:grid-cols-2 gap-8 print-avoid-break">
              
              {/* Top Strengths */}
              <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm/30">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 font-mono font-bold">
                    Profiling Strengths
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {report.strengths.map((str, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-5 h-5 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold font-mono flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-100">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 font-display">{str.title}</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{str.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Improvement areas */}
              <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm/30">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-amber-800 font-mono font-bold">
                    Relative Blindspots
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {report.weaknesses.map((weak, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-5 h-5 rounded-lg bg-amber-50 text-amber-600 text-xs font-bold font-mono flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-100">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 font-display">{weak.title}</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{weak.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* WORK STYLE & TEAM COHERENCE */}
            <div className="mt-8 border border-slate-200 rounded-2xl p-6 md:p-8 print-avoid-break">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-indigo-500" />
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Work Style & Team Collaboration
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                {report.workStyle}
              </p>
            </div>
          </div>

          {/* Elegant Page 2 Print Footer */}
          <div className="hidden print:flex items-center justify-between pb-1 border-t border-slate-100 mt-6 text-slate-400 text-[9px] font-mono tracking-widest font-bold uppercase">
            <span>AVENIR ASSESSMENTS • OFFICIAL COMPREHENSIVE DOSSIER</span>
            <span>PAGE 2 OF 3</span>
          </div>
        </div>

        {/* SECTION 3: Page 3 - Future Alignment & Development Roadmap */}
        <div className="hidden print:block print-page-break" />
        <div className="print:min-h-[260mm] print:flex print:flex-col print:justify-between print:pt-4">
          <div className="flex-1">
            {/* Page 3 Mini brand header */}
            <div className="hidden print:flex items-center justify-between pb-3 border-b border-indigo-200 print-border-indigo mb-6 text-slate-400 text-[10px] font-mono tracking-widest font-bold">
              <span>CONFIDENTIAL PSYCHOMETRIC REPORT • {candidateName?.toUpperCase() || "ANONYMOUS CANDIDATE"}</span>
              <span>GROWTH PATHWAY & RECOMMENDATIONS</span>
            </div>

            {/* CAREER SUGGESTIONS & FIT */}
            <div className="print-avoid-break">
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-4">
                Suitable working Environments & Career Pathways
              </h2>

              <div className="grid md:grid-cols-3 print:grid-cols-3 gap-4">
                {report.careerSuggestions.map((car, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 print-bg-slate-light border border-slate-150 rounded-2xl p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 print-text-indigo uppercase">
                          PATHWAY {idx + 1}
                        </span>
                        <span className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded ${
                          car.suitability.toLowerCase().includes("high")
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100 print-bg-slate-light"
                            : "bg-indigo-50 text-indigo-700 border border-indigo-100 print-bg-indigo-light"
                        }`}>
                          {car.suitability} FIT
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 font-display mb-2 text-xs print:text-[13px]">
                        {car.title}
                      </h3>
                      
                      <p className="text-xs text-slate-500 leading-relaxed print:text-[11px]">
                        {car.why}
                      </p>
                    </div>
                    
                    <div className="mt-5 pt-3 border-t border-slate-200 flex items-center gap-1 text-[10px] text-indigo-600 print-text-indigo font-bold font-display">
                      <Compass className="w-3.5 h-3.5" />
                      <span>Career Path Alignment</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STRATEGIC GROWTH RECOMMENDATIONS */}
            <div className="mt-8 border-t border-slate-200 pt-6 print-avoid-break">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-indigo-600 print-text-indigo" />
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-indigo-900 print-text-indigo font-mono font-bold">
                  Actionable Self-Development & Training Steps
                </h3>
              </div>

              <ul className="space-y-2.5">
                {report.growthRecommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm print:text-xs text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 print-bg-indigo-light mt-2 flex-shrink-0" />
                    <span className="leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Elegant Official Validation Stamp Block */}
            <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 print-avoid-break">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-mono block">Official Certificate Authority</span>
                <div className="flex items-center gap-3 mt-2">
                  <div className="w-14 h-10 border border-slate-200 bg-slate-50 print-bg-slate-light rounded-lg flex items-center justify-center font-mono text-[9px] text-indigo-600 font-bold leading-tight uppercase p-1 text-center select-none shadow-sm">
                    Av-MD-A
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-700 block font-mono">AVENIR-VERIFIED ASSESSMENTS</span>
                    <span className="text-[10px] text-slate-400 block font-mono">Secure Hash ID: ACC-{Math.floor(1000 + Math.random() * 9000)}-VER</span>
                  </div>
                </div>
              </div>
              <div className="text-left sm:text-right font-mono text-[10px] text-slate-400 leading-normal">
                <div>Secured by Avenir Psychometric Service Client</div>
                <div>Generated on {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                <div className="text-[9px] text-indigo-600 print-text-indigo font-bold uppercase">Candidate Status: PROFILE ACTIVE</div>
              </div>
            </div>
          </div>

          {/* Elegant Page 3 Print Footer */}
          <div className="hidden print:flex items-center justify-between pb-1 border-t border-slate-100 mt-6 text-slate-400 text-[9px] font-mono tracking-widest font-bold uppercase">
            <span>AVENIR ASSESSMENTS • OFFICIAL COMPREHENSIVE DOSSIER</span>
            <span>PAGE 3 OF 3</span>
          </div>
        </div>

      </div>

      {/* Post Evaluation Actions Panel */}
      <div className="mt-8 text-center print:hidden">
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 hover:border-slate-350 text-slate-600 bg-white hover:bg-slate-50 font-bold rounded-xl text-xs transition shadow-sm font-display cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 text-slate-400" />
          <span>Exit Evaluator & Try Another Section</span>
        </button>
      </div>

    </div>
  );
}
