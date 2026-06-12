/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BarChart3, Clock, Trash2, ArrowRight, Brain, Heart, MessageSquare, Sparkles, Trophy, Plus, FileText } from "lucide-react";
import { User, AdultProfile, Assessment, AIReport, AssessmentCategory } from "../types";

interface DashboardProps {
  user: User;
  profile: AdultProfile;
  history: {
    assessment: Assessment;
    report: AIReport;
  }[];
  onViewReport: (assessment: Assessment, report: AIReport) => void;
  onDeleteRecord: (assessmentId: string) => void;
  onStartNewQuick: () => void;
  onStartNewFull: () => void;
}

export default function Dashboard({
  user,
  profile,
  history,
  onViewReport,
  onDeleteRecord,
  onStartNewQuick,
  onStartNewFull
}: DashboardProps) {

  // Calculate composite aggregate index if they have testing history
  const getAverageIndex = () => {
    if (history.length === 0) return 0;
    
    let totalScore = 0;
    let counts = 0;
    
    history.forEach(item => {
      Object.values(item.assessment.scores).forEach(score => {
        if (score !== undefined) {
          totalScore += score;
          counts++;
        }
      });
    });

    return counts > 0 ? Math.round(totalScore / counts) : 0;
  };

  const aggregateScore = getAverageIndex();

  const getCategoryIcon = (cat: AssessmentCategory) => {
    switch (cat) {
      case AssessmentCategory.COGNITIVE: return Brain;
      case AssessmentCategory.EQ: return Heart;
      case AssessmentCategory.CQ: return MessageSquare;
      case AssessmentCategory.PERSONALITY: return Sparkles;
      case AssessmentCategory.LEADERSHIP: return Trophy;
      default: return Brain;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 font-sans text-slate-800">
      
      {/* Profile summary banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl font-display uppercase shadow-sm">
            {user.name.slice(0, 2)}
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-indigo-500 font-bold uppercase block">
              SECURE INDEPENDENT PROFILE
            </span>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 font-display mt-0.5">
              Welcome, {user.name}
            </h1>
            <p className="text-xs text-slate-500 font-display mt-1">
              Registered via: <span className="font-mono text-slate-700">{user.email}</span> • Location: <span className="font-mono text-indigo-600 font-bold">{profile.country}</span>
            </p>
          </div>
        </div>

        {/* Profile demographic chips */}
        <div className="flex flex-wrap gap-2 md:text-right">
          <div className="bg-slate-50 border border-slate-150 px-3.5 py-1.5 rounded-xl text-xs">
            <span className="text-slate-400 font-mono block text-[9px] uppercase leading-none mb-1 font-bold">
              Demographic Group
            </span>
            <span className="font-semibold text-slate-700 font-display">
              {profile.age_range} Years
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-150 px-3.5 py-1.5 rounded-xl text-xs">
            <span className="text-slate-400 font-mono block text-[9px] uppercase leading-none mb-1 font-bold">
              Core Profession
            </span>
            <span className="font-semibold text-slate-700 font-display">
              {profile.profession}
            </span>
          </div>
        </div>
      </div>

      {/* Aggregate index cards & quick launch actions */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        
        {/* Composite Score Card */}
        <div className="bg-indigo-900 text-white rounded-3xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/15 rounded-full blur-xl pointer-events-none" />
          
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-300 uppercase block">
              COMPOSITE GROWTH INDEX
            </span>
            <h2 className="text-2xl font-bold font-display mt-1.5 tracking-tight">
              Platform Quotient
            </h2>
          </div>

          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-5xl font-black font-mono tracking-tight text-white">
              {aggregateScore || "--"}
            </span>
            <span className="text-xs text-indigo-300 font-mono">
              / 100 WEIGHTED
            </span>
          </div>

          <p className="mt-4 text-xs text-indigo-100 leading-relaxed font-display">
            {history.length > 0 
              ? "Your quotient tracks across all evaluated cognitive, relational, and leadership metrics combined."
              : "No indices recorded yet. Initiate any assessment below to establish your performance index."}
          </p>
        </div>

        {/* Launch Free Quick Assessment */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition duration-300">
          <div>
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-indigo-600 flex items-center justify-center mb-4 shadow-sm">
              <Plus className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">Quick Assessment</h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Run a rapid psychometric review. Perfect for identifying immediate strengths & relative blind spots in 5-7 minutes.
            </p>
          </div>

          <button
            onClick={onStartNewQuick}
            className="mt-6 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer font-display shadow-sm"
          >
            <span>Activate Quick Test</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Launch Full Assessment */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition duration-300">
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-4 shadow-sm">
              <Plus className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">Full Demographics Assessment</h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Complete psychological profiling sections. Scans Cognitive, EQ, CQ, Leadership, and Work Alignment comprehensively.
            </p>
          </div>

          <button
            onClick={onStartNewFull}
            className="mt-6 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer font-display shadow-sm"
          >
            <span>Activate Full Evaluation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* REPORT HISTORIES LOG */}
      <div className="mt-10 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 pb-5 mb-5">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900 font-display">
              Psychometric Report Log History
            </h2>
          </div>
          <span className="text-[10px] font-mono text-slate-400 font-bold bg-slate-50 border border-slate-150 px-2 py-1 rounded">
            {history.length} EVALUATIONS RECORDED
          </span>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-14">
            <FileText className="w-10 h-10 text-slate-350 mx-auto mb-3" />
            <p className="text-sm text-slate-500 font-display font-medium">
              No previous psychometric assessment history exists on this device yet.
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Select one of the assessment generators above to calculate your profile.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((record) => {
              const dateObj = new Date(record.assessment.completed_date || record.report.created_date);
              const formattedDate = dateObj.toLocaleDateString(undefined, {
                year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
              });

              return (
                <div
                  key={record.assessment.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-slate-200 rounded-2xl hover:bg-slate-50/50 transition duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0 mt-0.5">
                      <BarChart3 className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 font-display">
                        {record.assessment.type === "quick" 
                          ? "Quick Potential Evaluation" 
                          : "Full Comprehensive Psychometric Index"}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-[11px] text-slate-400 font-mono">
                        <span>COMPLETED: {formattedDate}</span>
                        <span>•</span>
                        <span className="text-indigo-600 font-bold uppercase">
                          Report ID: {record.assessment.id.slice(0, 8)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions log */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => onViewReport(record.assessment, record.report)}
                      className="px-3.5 py-1.5 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-lg text-xs transition cursor-pointer"
                    >
                      Retrieve Report
                    </button>

                    <button
                      onClick={() => onDeleteRecord(record.assessment.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
                      title="Delete this assessment log"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
