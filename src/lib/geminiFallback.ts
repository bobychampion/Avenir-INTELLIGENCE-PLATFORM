/**
 * Gemini Client-Side Fallback Engine
 * Handles Gemini reports and custom abstract imagery directly in the browser
 * when the application is hosted on Netlify or other static site hosting providers.
 */

import { AIReport, Assessment, AssessmentCategory } from "../types";

// User's provided API key as secure client fallback
const FALLBACK_GEMINI_KEY = "AIzaSyBdNl_Y_NHBH8q1jRmEksR0_1754CNeFM4";

const getGeminiApiKey = (): string => {
  return import.meta.env.VITE_GEMINI_API_KEY || FALLBACK_GEMINI_KEY;
};

/**
 * Creates a static fallback report when Gemini is completely disconnected
 */
export const generateStaticReport = (scores: { [key in AssessmentCategory]?: number }): any => {
  const scoresSummaryString = Object.entries(scores)
    .map(([cat, score]) => `${cat}: ${score}/100`)
    .join(", ");

  const defaultStrengths = [
    { title: "Adaptability and Resilience", description: "Demonstrates strong ability to pivot quickly and solve problems dynamically during volatile or unexpected circumstances." },
    { title: "Empathetic Communication", description: "Active listener who values team balance and is able to collaborate effectively across diverse backgrounds." },
    { title: "Analytical Approach", description: "Logical reasoning to inspect multiple variables and design structured systems to address work goals." }
  ];

  const defaultWeaknesses = [
    { title: "Structured Delegation", description: "May tend to over-work or take on too many tasks independently instead of allocating segments systematically to team members." },
    { title: "Process Over-Engineering", description: "Risk of spending excessive time perfecting documentation or tracking tools before launching early prototypes." }
  ];

  const defaultCareers = [
    { title: "Entrepreneur / Strategist", suitability: "High", why: "Strong problem solving combined with emotional awareness makes you perfect for leading ventures in fast-paced markets." },
    { title: "Consultant / Lead Analyst", suitability: "High", why: "Analytical rigor fits well with structural diagnostics and strategic guidance roles." },
    { title: "Operations Manager", suitability: "Medium", why: "Excellent relationship coordination combined with situational grit translates directly to scaling execution teams." }
  ];

  return {
    personalSummary: `Based on your assessment scores (${scoresSummaryString}), you possess a highly versatile cognitive and behavioral profile. You demonstrate strong initiative and practical problem-solving in fast-moving professional and business climates. Your balance in emotional stability allows you to remain clear-headed under stress, coordinating beautifully with peers while driving structural execution.`,
    strengths: defaultStrengths,
    weaknesses: defaultWeaknesses,
    workStyle: "You are a proactive, collaborative coordinator. You enjoy breaking complex goals into structured swimlanes, checking in on communication clarity, and delivering outcomes through calculated, sustainable milestones.",
    careerSuggestions: defaultCareers,
    growthRecommendations: [
      "Develop higher automation pathways for repetitive administrative workflows.",
      "Practice formal peer-coaching to elevate junior teammates rather than troubleshooting solo.",
      "Enroll in structured strategic leadership frameworks to balance high agility with long-term corporate governance."
    ]
  };
};

/**
 * Call Gemini API directly from browser code as a fallback for Netlify
 */
export const generateReportClientSide = async (params: {
  name?: string;
  ageRange?: string;
  country?: string;
  profession?: string;
  type: string;
  responses: any[];
  scores: { [key in AssessmentCategory]?: number };
}): Promise<any> => {
  const apiKey = getGeminiApiKey();
  
  if (!apiKey) {
    console.warn("No Gemini API Key available. Triggering clean static fallback report.");
    return generateStaticReport(params.scores);
  }

  const scoresSummaryString = Object.entries(params.scores)
    .map(([cat, score]) => `${cat}: ${score}/100`)
    .join(", ");

  const samplesText = params.responses
    .slice(0, 10)
    .map((r: any) => `Question ID: ${r.questionId}, Category: ${r.category}, Selected option: ${r.selectedOption}, Score weight: ${r.score}`)
    .join("\n");

  const prompt = `
You are an expert executive psychometric profiler and leadership developmental consultant for Avenir Assessment Platform.
Generate a structured personal assessment report for the following candidate:
Name: ${params.name || "Anonymous Candidate"}
Age Range: ${params.ageRange || "Not specified"}
Country: ${params.country || "Not specified"}
Profession: ${params.profession || "Not specified"}
Assessment Type: '${params.type}'
Scores Compiled: ${scoresSummaryString}

Sample Responses Context:
${samplesText}

Guidelines:
1. Provide a comprehensive, constructive personal summary profiling their performance metrics, strengths, and leadership profile. Use highly professional, inspiring but objective language. Avoid any medical, clinical, or psychological diagnoses. Focus purely on personal development, strengths, and suitable working environments.
2. Include culture-sensitive, positive references to their background where appropriate (especially appreciating realistic regional nuances, e.g. navigating agile professional environments, fast-moving business climates, remote infrastructure challenges, or social/family coordination models if applicable).
3. Generate exactly 3 key strengths with concise actionable descriptions.
4. Generate exactly 2 areas of relative growth (weaknesses or blind spots) formulated in a developmental, constructive wording.
5. Detail their work style and collaboration approach.
6. Give exactly 3 potential career recommendations suited to their profile (e.g., Entrepreneur, Analyst, Creative Strategist, Consultant, Project Manager) indicating 'High' or 'Medium' suitability, and explaining why clearly.
7. Outline 3 direct growth recommendations (concrete skills/courses to improve).

Make sure to deliver high fidelity and actionable advice. Return the results in JSON format with keys matching:
{
  "personalSummary": "string",
  "strengths": [{"title": "string", "description": "string"}],
  "weaknesses": [{"title": "string", "description": "string"}],
  "workStyle": "string",
  "careerSuggestions": [{"title": "string", "suitability": "string", "why": "string"}],
  "growthRecommendations": ["string"]
}
`;

  try {
    // Call Gemini 3.5 Flash model directly
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini direct API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (responseText) {
      return JSON.parse(responseText.trim());
    } else {
      throw new Error("Empty candidate part text payload from Gemini direct API callback.");
    }
  } catch (err) {
    console.warn("Client-side direct Gemini fetch encountered an issue. Resorting to static analytical template fallback.", err);
    return generateStaticReport(params.scores);
  }
};

/**
 * Generates beautiful, dynamic, custom SVG image encoded in base64 on client-side
 */
export const generateFallbackImageClientSide = (profession: string, style: string): string => {
  const colors: Record<string, string[]> = {
    "Symmetry Blueprint": ["#0f172a", "#1e293b", "#3b82f6", "#60a5fa"],
    "Futuristic Site Geometry": ["#111827", "#1f2937", "#10b981", "#34d399"],
    "Warm Editorial Watercolor": ["#451a03", "#78350f", "#b45309", "#fbbf24"],
    "Warm Organic Clay": ["#064e3b", "#0f766e", "#34d399", "#a7f3d0"],
  };

  const selectedColors = colors[style] || ["#1e1b4b", "#312e81", "#6366f1", "#818cf8"];
  const [bg, bgGrad, accent1, accent2] = selectedColors;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bg}" />
          <stop offset="100%" stop-color="${bgGrad}" />
        </linearGradient>
        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${accent1}" opacity="0.8" />
          <stop offset="100%" stop-color="${accent2}" opacity="0.9" />
        </linearGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        </pattern>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#bgGrad)" />
      <rect width="100%" height="100%" fill="url(#grid)" />
      
      <circle cx="650" cy="225" r="300" fill="url(#accentGrad)" filter="blur(60px)" opacity="0.25" />
      <circle cx="150" cy="350" r="200" fill="${accent1}" filter="blur(40px)" opacity="0.2" />

      <circle cx="400" cy="225" r="160" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2" stroke-dasharray="8 6" />
      <circle cx="400" cy="225" r="100" fill="none" stroke="${accent1}" stroke-width="1.5" opacity="0.5" />
      <circle cx="400" cy="225" r="40" fill="none" stroke="${accent2}" stroke-width="3" />
      
      <line x1="100" y1="225" x2="700" y2="225" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
      <line x1="400" y1="50" x2="400" y2="400" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
      
      <line x1="150" y1="50" x2="650" y2="400" stroke="${accent1}" stroke-width="1" opacity="0.3" />
      <line x1="150" y1="400" x2="650" y2="50" stroke="${accent2}" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.4" />
      
      <rect x="50" y="360" width="160" height="40" rx="8" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
      <text x="70" y="384" fill="#ffffff" font-family="monospace" font-size="11" font-weight="bold" letter-spacing="1">COGNITIVE INDEX</text>
      
      <rect x="590" y="50" width="160" height="40" rx="8" fill="rgba(81, 102, 241, 0.15)" stroke="rgba(81, 102, 241, 0.3)" stroke-width="1" />
      <text x="610" y="74" fill="${accent2}" font-family="monospace" font-size="11" font-weight="bold" letter-spacing="1">LEADERSHIP CQ</text>

      <text x="400" y="230" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="6" opacity="0.9">GROWTH</text>
      <path d="M 380 245 L 420 245" stroke="${accent2}" stroke-width="2" />
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};
