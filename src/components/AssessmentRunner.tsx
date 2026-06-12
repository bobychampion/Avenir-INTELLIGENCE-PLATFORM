/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Brain, Heart, MessageSquare, Sparkles, Trophy, ChevronRight, ChevronLeft, Save, LogOut, Info } from "lucide-react";
import { Question, AssessmentResponse, AssessmentCategory } from "../types";
import { quickQuestions, fullQuestions } from "../data/questions";

interface AssessmentRunnerProps {
  type: "quick" | "full";
  userId: string;
  onComplete: (responses: AssessmentResponse[]) => void;
  onCancel: () => void;
}

export default function AssessmentRunner({
  type,
  userId,
  onComplete,
  onCancel
}: AssessmentRunnerProps) {
  const activeQuestionsList: Question[] = type === "quick" ? quickQuestions : fullQuestions;
  const storageKey = `avenir_progress_${userId || "anon"}_${type}`;

  // State management
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: { value: string; score: number } }>({});
  const [isPaused, setIsPaused] = useState(false);

  // Load progress from localStorage if it exists
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(storageKey);
      if (savedProgress) {
        const { currentIdx, answers } = JSON.parse(savedProgress);
        if (answers && currentIdx !== undefined) {
          setCurrentIndex(currentIdx);
          setSelectedAnswers(answers);
        }
      }
    } catch (err) {
      console.error("Failed to restore saved progress:", err);
    }
  }, [storageKey]);

  const currentQuestion = activeQuestionsList[currentIndex];

  const handleSelectOption = (optionValue: string, scoreValue: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: { value: optionValue, score: scoreValue }
    }));
  };

  const handleNext = () => {
    if (currentIndex < activeQuestionsList.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed! Convert answers to structured AssessmentResponse
      const formattedResponses: AssessmentResponse[] = activeQuestionsList.map(q => {
        const ans = selectedAnswers[q.id];
        return {
          questionId: q.id,
          category: q.category,
          selectedOption: ans ? ans.value : "A", // Default if blank
          score: ans ? ans.score : 3 // Mid-tier if unselected
        };
      });

      // Clear the saved progress upon full completion
      localStorage.removeItem(storageKey);
      onComplete(formattedResponses);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Save current progress to continue later
  const handleSaveAndPause = () => {
    try {
      const stateObject = {
        currentIdx: currentIndex,
        answers: selectedAnswers
      };
      localStorage.setItem(storageKey, JSON.stringify(stateObject));
      setIsPaused(true);
    } catch (err) {
      console.error("Failed to save progress:", err);
    }
  };

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

  const CategoryIcon = getCategoryIcon(currentQuestion?.category || AssessmentCategory.COGNITIVE);

  const getCategoryTheme = (cat: AssessmentCategory) => {
    switch (cat) {
      case AssessmentCategory.COGNITIVE: return "text-indigo-600 bg-indigo-50 border-indigo-100";
      case AssessmentCategory.EQ: return "text-sky-600 bg-sky-50 border-sky-100";
      case AssessmentCategory.CQ: return "text-teal-600 bg-teal-50 border-teal-100";
      case AssessmentCategory.PERSONALITY: return "text-violet-600 bg-violet-50 border-violet-100";
      case AssessmentCategory.LEADERSHIP: return "text-amber-600 bg-amber-50 border-amber-100";
      default: return "text-slate-500 bg-slate-50 border-slate-100";
    }
  };

  const progressPct = ((currentIndex + 1) / activeQuestionsList.length) * 100;

  if (isPaused) {
    return (
      <div className="max-w-xl mx-auto px-6 py-16 text-center bg-white border border-slate-200 rounded-3xl mt-12 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-6">
          <Save className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 font-display">Evaluation Saved</h2>
        <p className="mt-3 text-sm text-slate-500 leading-relaxed">
          Your current state has been securely persisted in local storage. You are free to close this session and return whenever you want; the engine will resume right at question {currentIndex + 1} of {activeQuestionsList.length}.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setIsPaused(false)}
            className="w-full sm:w-auto px-6 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl text-sm transition cursor-pointer"
          >
            Resume Evaluation
          </button>
          <button
            onClick={onCancel}
            className="w-full sm:w-auto px-6 py-3 font-semibold text-slate-650 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm transition cursor-pointer"
          >
            Return to Landing Page
          </button>
        </div>
      </div>
    );
  }

  const selection = selectedAnswers[currentQuestion?.id]?.value;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 font-sans text-slate-800">
      
      {/* Assessment Header Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold block">
            EVALUATOR SESSION ACTIVE ({type === "quick" ? "QUICK TEST" : "FULL ASSESSMENT"})
          </span>
          <span className="text-xs text-slate-500">
            Progress Saved Automatically
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveAndPause}
            className="flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 transition px-3 py-1.5 rounded-lg cursor-pointer"
            title="Save your spot and complete this assessment later"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save Progress</span>
          </button>

          <button
            onClick={onCancel}
            className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-red-600 bg-slate-50 hover:bg-red-50 transition px-3 py-1.5 rounded-lg cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit Session</span>
          </button>
        </div>
      </div>

      {/* Progress metrics */}
      <div className="mb-6 flex items-center justify-between text-xs font-mono text-slate-400">
        <span className="font-semibold text-slate-700">QUESTION {currentIndex + 1} OF {activeQuestionsList.length}</span>
        <span>{Math.round(progressPct)}% COMPLETE</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Primary Question Statement Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
        
        {/* Category Header tag */}
        <div className="flex items-center gap-2 mb-6">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${getCategoryTheme(currentQuestion?.category)}`}>
            <CategoryIcon className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-indigo-600 uppercase block font-bold leading-none">
              {currentQuestion?.category}
            </span>
            {currentQuestion?.subsection && (
              <span className="text-xs text-slate-400 block leading-tight mt-0.5 font-display">
                {currentQuestion.subsection}
              </span>
            )}
          </div>

          {currentQuestion?.context && (
            <span className="ml-auto text-[9px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
              {currentQuestion.context} Scenario
            </span>
          )}
        </div>

        {/* Question sentence */}
        <h3 className="text-lg md:text-xl font-bold font-display text-slate-900 leading-snug">
          {currentQuestion?.text}
        </h3>

        {/* Context Information flag */}
        {currentQuestion?.context === "Workplace" && (
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
            <Info className="w-3 h-3 text-indigo-500" />
            <span>African Workplace scenario examining organizational empathy & logic.</span>
          </div>
        )}

        {/* Multiple choice Options list */}
        <div className="mt-8 space-y-3.5">
          {currentQuestion?.options.map((opt) => {
            const isSelected = selection === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => handleSelectOption(opt.value, opt.score)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50/20 shadow-sm"
                    : "border-slate-200 hover:border-slate-350 hover:bg-slate-50/30"
                }`}
              >
                <div className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center border flex-shrink-0 mt-0.5 ${
                  isSelected
                    ? "bg-indigo-600 border-indigo-600 text-white"
                    : "bg-slate-100 border-slate-200 text-slate-500"
                }`}>
                  {opt.value}
                </div>
                <span className={`text-xs md:text-sm leading-relaxed ${isSelected ? "font-semibold text-slate-900" : "text-slate-650"}`}>
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Navigation action buttons */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold font-display border transition cursor-pointer ${
            currentIndex === 0
              ? "text-slate-300 bg-slate-50 border-slate-100 cursor-not-allowed"
              : "text-slate-600 bg-white border-slate-200 hover:bg-slate-50"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={handleNext}
          disabled={!selection}
          className={`flex items-center gap-1.5 px-6 py-3 rounded-xl text-xs font-semibold font-display transition shadow-md cursor-pointer ${
            selection
              ? "text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
              : "text-slate-400 bg-slate-100 border border-slate-200 cursor-not-allowed"
          }`}
        >
          <span>{currentIndex === activeQuestionsList.length - 1 ? "Compile & Generate Report" : "Save & Continue"}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
