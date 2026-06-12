/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum AssessmentCategory {
  COGNITIVE = "COGNITIVE",
  EQ = "EQ",
  CQ = "CQ",
  PERSONALITY = "PERSONALITY",
  LEADERSHIP = "LEADERSHIP"
}

export interface Question {
  id: string;
  category: AssessmentCategory;
  subsection?: string; // e.g. "Self-Awareness", "Openness", etc.
  text: string;
  options: {
    label: string;
    value: string; // "A", "B", "C", "D"
    score: number; // 1 to 5 numerical weight for calculations
  }[];
  context?: string; // e.g. "Workplace", "Business", "Family", "Social"
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export interface AdultProfile {
  id: string;
  user_id: string;
  age_range: string;
  profession: string;
  country: string;
}

export interface AssessmentResponse {
  questionId: string;
  category: AssessmentCategory;
  selectedOption: string;
  score: number;
}

export interface Assessment {
  id: string;
  userId: string;
  type: "quick" | "full";
  status: "in-progress" | "completed";
  responses: AssessmentResponse[];
  scores: {
    [key in AssessmentCategory]?: number; // average scale of 1-100 or 1-10
  };
  completed_date?: string;
}

export interface AIReport {
  id: string;
  assessment_id: string;
  created_date: string;
  personalSummary: string;
  strengths: {
    title: string;
    description: string;
  }[];
  weaknesses: {
    title: string;
    description: string;
  }[];
  workStyle: string;
  careerSuggestions: {
    title: string;
    suitability: string; // High, Medium
    why: string;
  }[];
  growthRecommendations: string[];
}
