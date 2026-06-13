/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Plus, Edit, Trash, Settings, BarChart2, BookOpen, AlertCircle, Save, CheckCircle2, ChevronRight } from "lucide-react";
import { Question, AssessmentCategory } from "../types";
import { quickQuestions } from "../data/questions";

interface AdminPanelProps {
  onBack: () => void;
}

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const [questions, setQuestions] = useState<Question[]>(quickQuestions);
  const [activeTab, setActiveTab] = useState<"questions" | "analytics" | "scoring">("questions");

  // Form states for adding/editing questions
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [questionText, setQuestionText] = useState("");
  const [questionCategory, setQuestionCategory] = useState<AssessmentCategory>(AssessmentCategory.COGNITIVE);
  const [questionContext, setQuestionContext] = useState("Workplace");
  const [questionSubsection, setQuestionSubsection] = useState("");
  
  // Option weights
  const [optA, setOptA] = useState("");
  const [optB, setOptB] = useState("");
  const [optC, setOptC] = useState("");
  const [optD, setOptD] = useState("");

  const [scoreA, setScoreA] = useState(5);
  const [scoreB, setScoreB] = useState(3);
  const [scoreC, setScoreC] = useState(4);
  const [scoreD, setScoreD] = useState(1);

  const [successMsg, setSuccessMsg] = useState("");

  const triggerSuccessMsg = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleCreateOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedOptions = [
      { label: optA || "Highly effective action", value: "A", score: Number(scoreA) },
      { label: optB || "Moderately acceptable action", value: "B", score: Number(scoreB) },
      { label: optC || "Alternative lateral response", value: "C", score: Number(scoreC) },
      { label: optD || "Ineffective action", value: "D", score: Number(scoreD) }
    ];

    if (isEditing) {
      // Update
      setQuestions(prev => prev.map(q => q.id === isEditing ? {
        ...q,
        text: questionText,
        category: questionCategory,
        subsection: questionSubsection,
        context: questionContext,
        options: formattedOptions
      } : q));
      setIsEditing(null);
      triggerSuccessMsg("Question updated successfully inside working session memory.");
    } else {
      // Create
      const newQ: Question = {
        id: "q_admin_" + Math.random().toString(36).substr(2, 9),
        category: questionCategory,
        text: questionText,
        subsection: questionSubsection || undefined,
        context: questionContext,
        options: formattedOptions
      };
      setQuestions(prev => [newQ, ...prev]);
      triggerSuccessMsg("New custom question injected successfully.");
    }

    // Reset Form
    setQuestionText("");
    setQuestionSubsection("");
    setOptA(""); setOptB(""); setOptC(""); setOptD("");
    setScoreA(5); setScoreB(3); setScoreC(4); setScoreD(1);
  };

  const handleEdit = (q: Question) => {
    setIsEditing(q.id);
    setQuestionText(q.text);
    setQuestionCategory(q.category);
    setQuestionSubsection(q.subsection || "");
    setQuestionContext(q.context || "Workplace");

    setOptA(q.options[0]?.label || "");
    setOptB(q.options[1]?.label || "");
    setOptC(q.options[2]?.label || "");
    setOptD(q.options[3]?.label || "");

    setScoreA(q.options[0]?.score || 5);
    setScoreB(q.options[1]?.score || 3);
    setScoreC(q.options[2]?.score || 4);
    setScoreD(q.options[3]?.score || 1);
  };

  const handleDelete = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
    triggerSuccessMsg("Question deleted successfully.");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 font-sans text-slate-800">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-indigo-600 font-bold uppercase block">
            Avenir Admin Portal
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
            Profiling & Content Governance Dashboard
          </h1>
        </div>

        <button
          onClick={onBack}
          className="px-4 py-2 border border-slate-200 hover:border-slate-350 text-slate-600 bg-white font-semibold rounded-xl text-xs transition cursor-pointer font-display shadow-sm"
        >
          Return to Application
        </button>
      </div>

      {/* Tabs list */}
      <div className="flex gap-2 border-b border-slate-200 mb-8 pb-px text-sm">
        <button
          onClick={() => { setActiveTab("questions"); setIsEditing(null); }}
          className={`flex items-center gap-2 pb-3.5 px-4 font-semibold border-b-2 transition cursor-pointer ${
            activeTab === "questions"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Question Management</span>
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex items-center gap-2 pb-3.5 px-4 font-semibold border-b-2 transition cursor-pointer ${
            activeTab === "analytics"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>System Analytics Log</span>
        </button>

        <button
          onClick={() => setActiveTab("scoring")}
          className={`flex items-center gap-2 pb-3.5 px-4 font-semibold border-b-2 transition cursor-pointer ${
            activeTab === "scoring"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Scoring Metrics & Scale Coefficients</span>
        </button>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl flex items-center gap-2 text-xs font-display font-medium shadow-sm">
          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* QUESTION MANAGEMENT TAB */}
      {activeTab === "questions" && (
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left panel form */}
          <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm self-start">
            <h2 className="text-base font-bold text-slate-900 font-display mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-500" />
              <span>{isEditing ? "Edit Assessment Question" : "Incorporate Scenario"}</span>
            </h2>

            <form onSubmit={handleCreateOrUpdate} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-mono">
                  Question Category
                </label>
                <select
                  value={questionCategory}
                  onChange={(e) => setQuestionCategory(e.target.value as AssessmentCategory)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                >
                  <option value={AssessmentCategory.COGNITIVE}>COGNITIVE INTELLIGENCE</option>
                  <option value={AssessmentCategory.EQ}>EMOTIONAL INTELLIGENCE (EQ)</option>
                  <option value={AssessmentCategory.CQ}>COMMUNICATION QUOTIENT (CQ)</option>
                  <option value={AssessmentCategory.PERSONALITY}>BIG FIVE PERSONALITY</option>
                  <option value={AssessmentCategory.LEADERSHIP}>STRATEGIC LEADERSHIP</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-mono">
                    Scenario Context
                  </label>
                  <select
                    value={questionContext}
                    onChange={(e) => setQuestionContext(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  >
                    <option value="Workplace">Workplace</option>
                    <option value="Business">Business</option>
                    <option value="Family">Family</option>
                    <option value="Social">Social</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-mono">
                    Subsection (Optional)
                  </label>
                  <input
                    type="text"
                    value={questionSubsection}
                    onChange={(e) => setQuestionSubsection(e.target.value)}
                    placeholder="e.g. Self-Awareness"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-mono">
                  Scenario / Question Text
                </label>
                <textarea
                  required
                  rows={4}
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Ask a situational, highly engaging scenario question..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>

              {/* Options fields */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Multiple Choice Options & Weights
                </span>

                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={optA}
                    onChange={(e) => setOptA(e.target.value)}
                    placeholder="Option A Option Text"
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800"
                  />
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={scoreA}
                    onChange={(e) => setScoreA(Number(e.target.value))}
                    className="w-12 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-center font-bold text-slate-800"
                    title="Score Weight (1-5)"
                  />
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={optB}
                    onChange={(e) => setOptB(e.target.value)}
                    placeholder="Option B Option Text"
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800"
                  />
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={scoreB}
                    onChange={(e) => setScoreB(Number(e.target.value))}
                    className="w-12 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-center font-bold text-slate-800"
                    title="Score Weight (1-5)"
                  />
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={optC}
                    onChange={(e) => setOptC(e.target.value)}
                    placeholder="Option C Option Text"
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800"
                  />
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={scoreC}
                    onChange={(e) => setScoreC(Number(e.target.value))}
                    className="w-12 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-center font-bold text-slate-800"
                    title="Score Weight (1-5)"
                  />
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={optD}
                    onChange={(e) => setOptD(e.target.value)}
                    placeholder="Option D Option Text"
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800"
                  />
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={scoreD}
                    onChange={(e) => setScoreD(Number(e.target.value))}
                    className="w-12 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-center font-bold text-slate-800"
                    title="Score Weight (1-5)"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs tracking-wider transition cursor-pointer font-display"
                >
                  {isEditing ? "Apply Changes" : "Create Question"}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(null);
                      setQuestionText("");
                      setQuestionSubsection("");
                      setOptA(""); setOptB(""); setOptC(""); setOptD("");
                    }}
                    className="px-3 py-2 border border-slate-200 text-slate-500 hover:bg-slate-50 rounded-lg text-xs font-semibold"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right questions tree list */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-250 mb-6">
              <h2 className="text-base font-bold text-slate-900 font-display">
                Active Question Banks ({questions.length} Items)
              </h2>
              <span className="text-[10px] text-slate-400 font-bold font-mono uppercase">
                Avenir V1.2.0 Stable
              </span>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50/40 transition duration-150"
                >
                  <div className="flex items-start justify-between gap-4 mb-2.5">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[9px] font-bold font-mono tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded uppercase">
                          {q.category}
                        </span>
                        {q.context && (
                          <span className="text-[9px] font-bold font-mono tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded uppercase">
                            Context: {q.context}
                          </span>
                        )}
                        {q.subsection && (
                          <span className="text-[10px] font-bold text-slate-400 font-display">
                            ({q.subsection})
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 font-display mt-2 leading-tight">
                        {q.text}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(q)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                        title="Edit question text and score mapping"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(q.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete question from dataset"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Options lists display */}
                  <div className="mt-3 grid sm:grid-cols-2 gap-2 text-[11px] text-slate-400 pt-3 border-t border-slate-100 bg-slate-50/50 p-2.5 rounded-lg font-mono">
                    {q.options.map((opt) => (
                      <div key={opt.value} className="flex gap-2">
                        <span className="font-bold text-slate-700">{opt.value}:</span>
                        <span className="text-slate-500 truncate max-w-[200px]" title={opt.label}>
                          {opt.label}
                        </span>
                        <span className="text-emerald-700 font-bold ml-auto font-bold">[w: {opt.score}]</span>
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* SYSTEM ANALYTICS TAB */}
      {activeTab === "analytics" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 font-display mb-6">
            Real-time Evaluation Metrics & Demographic Analytics
          </h2>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
              <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider block uppercase">TOTAL EVALUATIONS LAUNCHED</span>
              <span className="text-3xl font-black font-mono tracking-tight text-slate-900 block mt-1">
                4,982
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
              <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider block uppercase font-mono">COMPLETION CONVERSION RATE</span>
              <span className="text-3xl font-black font-mono tracking-tight text-slate-900 block mt-1">
                82.4%
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
              <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider block uppercase font-mono">MEDIAN COGNITIVE INDEX</span>
              <span className="text-3xl font-black font-mono tracking-tight text-slate-900 block mt-1">
                71 / 100
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
              <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider block uppercase font-mono">REGIONAL LEADER</span>
              <span className="text-3xl font-black font-mono tracking-tight text-indigo-600 block mt-1 font-display uppercase text-base font-extrabold">
                Nigeria (Lagos)
              </span>
            </div>
          </div>

          <div className="p-5 border border-amber-100 bg-amber-50/50 rounded-2xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-display">Simulated Sandbox Memory</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Platform analytics run securely in internal memory. To integrate with a durable enterprise warehouse, run database migrations on GCP BigQuery via administrative infrastructure config.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SCORING METRICS TAB */}
      {activeTab === "scoring" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 font-display mb-4">
            Dynamic Scoring Scaling Coefficients
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed mb-6">
            Tune baseline metrics weights mapped across categories to adjust aggregate indices calculations dynamically.
          </p>

          <div className="space-y-4 max-w-xl">
            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
              <div>
                <span className="text-xs font-bold text-slate-900 block font-display">Cognitive Logic Coefficient</span>
                <span className="text-[11px] text-slate-400 block font-mono">Weighted multiple for pattern evaluation speed.</span>
              </div>
              <input
                type="number"
                step="0.1"
                defaultValue="1.2"
                className="w-16 p-2 bg-slate-50 border border-slate-200 rounded text-center text-xs font-mono font-bold"
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
              <div>
                <span className="text-xs font-bold text-slate-900 block font-display">Situational EQ Safety Margin</span>
                <span className="text-[11px] text-slate-400 block font-mono">Baseline constant for self-awareness scaling.</span>
              </div>
              <input
                type="number"
                step="0.1"
                defaultValue="2.0"
                className="w-16 p-2 bg-slate-50 border border-slate-200 rounded text-center text-xs font-mono font-bold"
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
              <div>
                <span className="text-xs font-bold text-slate-900 block font-display">Career Suitability Pivot Index</span>
                <span className="text-[11px] text-slate-400 block font-mono">Cut-off score separating high vs medium alignment.</span>
              </div>
              <input
                type="number"
                defaultValue="75"
                className="w-16 p-2 bg-slate-50 border border-slate-200 rounded text-center text-xs font-mono font-bold"
              />
            </div>
          </div>

          <button
            onClick={() => triggerSuccessMsg("Coefficients saved safely to workspace sandbox variables.")}
            className="mt-8 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm font-display tracking-wider uppercase"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Apply Coefficients Scales</span>
          </button>
        </div>
      )}

    </div>
  );
}
