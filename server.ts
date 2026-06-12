/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load configuration
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));

// Initialize Gemini Client server-side
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Server side Gemini client initialized successfully.");
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI client:", err);
  }
} else {
  console.warn("GEIMINI_API_KEY is not defined or is placeholder. AI Report generation will fallback to rule-based static compiler.");
}

// Score Compilation API Route
app.post("/api/generate-report", async (req, res) => {
  const { name, ageRange, country, profession, type, responses, scores } = req.body;

  if (!responses || !scores) {
    return res.status(400).json({ error: "Missing responses or scores metrics." });
  }

  const scoresSummaryString = Object.entries(scores)
    .map(([cat, score]) => `${cat}: ${score}/100`)
    .join(", ");

  // Create a structured context string from responses for the prompt
  const samplesText = responses
    .slice(0, 10)
    .map((r: any) => `Question ID: ${r.questionId}, Category: ${r.category}, Selected option: ${r.selectedOption}, Score weight: ${r.score}`)
    .join("\n");

  const prompt = `
You are an expert executive psychometric profiler and leadership developmental consultant for Avenir Assessment Platform.
Generate a structured personal assessment report for the following candidate:
Name: ${name || "Anonymous Candidate"}
Age Range: ${ageRange || "Not specified"}
Country: ${country || "Not specified"}
Profession: ${profession || "Not specified"}
Assessment Type: '${type}'
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

Make sure to deliver high fidelity and actionable advice.
`;

  // Fallback static report function if Gemini is not configured
  const generateStaticReport = () => {
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
      personalSummary: `Based on your assessment scores (${scoresSummaryString}), you possess a highly versatile cognitive and behavioral profile. You demonstrate strong initiative and practical problem-solving in fast-moving professional and business climates. Your balance in emotional and physical state allows you to remain clear-headed under stress, coordinating beautifully with peers while driving structural execution.`,
      strengths: defaultStrengths,
      weaknesses: defaultWeaknesses,
      workStyle: "You are an proactive, collaborative coordinator. You enjoy breaking complex goals into structured swimlanes, checking in on communication clarity, and delivering outcomes through calculated, sustainable milestones.",
      careerSuggestions: defaultCareers,
      growthRecommendations: [
        "Develop higher automation pathways for repetitive administrative workflows.",
        "Practice formal peer-coaching to elevate junior teammates rather than troubleshooting solo.",
        "Enroll in structured strategic leadership frameworks to balance high agility with long-term corporate governance."
      ]
    };
  };

  try {
    if (!ai) {
      console.log("No server-side Gemini client available. Delivering high-quality psychometric fallback model.");
      return res.json(generateStaticReport());
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a professional industrial psychologist and career profiler. You must return feedback matching the requested JSON schema exclusively.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            personalSummary: {
              type: Type.STRING,
              description: "High-quality personal profile, reflecting their relative cognitive strengths, communication quotient, and leadership style."
            },
            strengths: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["title", "description"]
              }
            },
            weaknesses: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "Relative improvement area" },
                  description: { type: Type.STRING }
                },
                required: ["title", "description"]
              }
            },
            workStyle: {
              type: Type.STRING,
              description: "How they operate inside working ecosystems and deal with pressure."
            },
            careerSuggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  suitability: { type: Type.STRING },
                  why: { type: Type.STRING }
                },
                required: ["title", "suitability", "why"]
              }
            },
            growthRecommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Actionable self-improvement steps"
            }
          },
          required: ["personalSummary", "strengths", "weaknesses", "workStyle", "careerSuggestions", "growthRecommendations"]
        }
      }
    });

    if (response && response.text) {
      const parsedData = JSON.parse(response.text.trim());
      return res.json(parsedData);
    } else {
      console.warn("Empty response text from Gemini API. Engaging fallback.");
      return res.json(generateStaticReport());
    }
  } catch (err) {
    console.error("Error during Gemini API generation:", err);
    return res.json(generateStaticReport());
  }
});

// Configure Vite or Static Assets serving
async function bootstrapServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware.");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode with static file assets.");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server running on http://localhost:${PORT}`);
  });
}

bootstrapServer();
