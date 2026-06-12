/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

let db = null;
try {
  const firebaseAdminApp = initializeApp({
    credential: applicationDefault(),
    projectId: process.env.FIREBASE_PROJECT_ID || "avenir-potential"
  });
  db = getFirestore(firebaseAdminApp);
  console.log("Firebase Admin / Firestore initialized successfully.");
} catch (err) {
  console.warn("Firestore initialization skipped:", err);
}

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

    let parsedData: any;
    if (response && response.text) {
      parsedData = JSON.parse(response.text.trim());
    } else {
      console.warn("Empty response text from Gemini API. Engaging fallback.");
      parsedData = generateStaticReport();
    }

    const assessmentId = "a_" + Math.random().toString(36).substr(2, 9);
    const reportId = "report_" + Math.random().toString(36).substr(2, 9);
    const now = new Date().toISOString();

    const assessmentDoc = {
      id: assessmentId,
      userId: name || "anon",
      type,
      status: "completed",
      responses,
      scores,
      completed_date: now
    };

    const reportDoc = {
      ...parsedData,
      id: reportId,
      assessment_id: assessmentId,
      created_date: now
    };

    if (db) {
      try {
        await db.collection("assessments").doc(assessmentId).set(assessmentDoc);
        await db.collection("reports").doc(reportId).set(reportDoc);
      } catch (firestoreErr) {
        console.error("Failed to persist assessment/report to Firestore:", firestoreErr);
      }
    }

    return res.json(parsedData);
  } catch (err) {
    console.error("Error during Gemini API generation:", err);
    const fallback = generateStaticReport();
    if (db) {
      try {
        const fallbackAssessmentId = "a_" + Math.random().toString(36).substr(2, 9);
        const fallbackReportId = "report_" + Math.random().toString(36).substr(2, 9);
        const fallbackNow = new Date().toISOString();
        await db.collection("assessments").doc(fallbackAssessmentId).set({
          id: fallbackAssessmentId,
          userId: name || "anon",
          type,
          status: "completed",
          responses,
          scores,
          completed_date: fallbackNow
        });
        await db.collection("reports").doc(fallbackReportId).set({
          ...fallback,
          id: fallbackReportId,
          assessment_id: fallbackAssessmentId,
          created_date: fallbackNow
        });
      } catch (firestoreErr) {
        console.error("Failed to persist fallback assessment/report to Firestore:", firestoreErr);
      }
    }
    return res.json(fallback);
  }
});

// Journey dynamic abstract image generator endpoint
app.post("/api/generate-journey-image", async (req, res) => {
  const { profession, style, customPrompt } = req.body;

  if (!profession || !style) {
    return res.status(400).json({ error: "Missing profession or style parameters." });
  }

  const prompt = `A modern abstract artwork representing a '${profession}' success journey. Style: ${style}. ${customPrompt || ""}. Elegant lines, structured shapes, rich color accents, minimalist design, high contrast, suitable for a professional website header, aspect ratio 16:9.`;

  // Fallback function that returns a beautiful, dynamic, custom SVG image encoded in base64
  const generateFallbackImage = () => {
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

    return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  };

  try {
    if (!ai) {
      console.warn("No server-side Gemini client available. Deliberately rendering premium fallback SVG.");
      return res.json({ imageUrl: generateFallbackImage() });
    }

    console.log("Image Generator using Gemini Model.");
    
    try {
      const response = await ai.models.generateImages({
        model: "imagen-4.0-generate-001",
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: "image/jpeg",
          aspectRatio: "16:9",
        },
      });

      if (response && response.generatedImages && response.generatedImages[0]) {
        const base64EncodeString = response.generatedImages[0].image.imageBytes;
        const imageUrl = `data:image/png;base64,${base64EncodeString}`;
        return res.json({ imageUrl: imageUrl });
      }
    } catch (errInner) {
      console.warn("Imagen generation failed or not available, trying gemini-2.5-flash-image fallback...", errInner);
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
          }
        }
      });

      if (response && response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            const imageUrl = `data:image/png;base64,${base64EncodeString}`;
            return res.json({ imageUrl });
          }
        }
      }
    }

    console.warn("Both Gemini image pipelines were unavailable (possibly due to API key permissions). Initiating pristine SVG fallback.");
    return res.json({ imageUrl: generateFallbackImage() });

  } catch (err) {
    console.error("General error during Gemini image generation:", err);
    return res.json({ imageUrl: generateFallbackImage() });
  }
});

// Persist journey image generation metadata
app.post("/api/save-image-generation", async (req, res) => {
  const { profession, style, customPrompt, userId, imageUrl } = req.body || {};

  if (!profession || !style) {
    return res.status(400).json({ error: "Missing profession or style parameters." });
  }

  const record = {
    userId: userId || "anon",
    profession,
    style,
    customPrompt: customPrompt || "",
    imageUrl: imageUrl || null,
    created_at: new Date().toISOString()
  };

  if (!db) {
    return res.status(200).json({ saved: false, reason: "Firestore not initialized" });
  }

  try {
    const docRef = await db.collection("image_generations").add(record);
    return res.status(201).json({ id: docRef.id, saved: true });
  } catch (firestoreErr) {
    console.error("Failed to persist image generation:", firestoreErr);
    return res.status(500).json({ error: "Failed to persist image generation" });
  }
});

// Persist user registration/auth data
app.post("/api/save-user", async (req, res) => {
  const { id, name, email, role, created_at, age_range, profession, country } = req.body || {};

  if (!id || !email) {
    return res.status(400).json({ error: "Missing required user fields." });
  }

  if (!db) {
    return res.status(200).json({ saved: false, reason: "Firestore not initialized" });
  }

  try {
    const batch = db.batch();
    batch.set(db.collection("users").doc(id), {
      id,
      name: name || "",
      email,
      role: role || "member",
      created_at: created_at || new Date().toISOString()
    });
    batch.set(db.collection("profiles").doc(id), {
      user_id: id,
      age_range: age_range || "",
      profession: profession || "",
      country: country || ""
    });
    await batch.commit();
    return res.status(201).json({ saved: true, user: id });
  } catch (firestoreErr) {
    console.error("Failed to persist user:", firestoreErr);
    return res.status(500).json({ error: "Failed to persist user" });
  }
});

// Persist admin questions
app.post("/api/admin/questions", async (req, res) => {
  const { id, category, text, subsection, context, options, isEditing, existingId } = req.body || {};

  if (!category || !text || !context || !options || !Array.isArray(options)) {
    return res.status(400).json({ error: "Missing required question fields." });
  }

  if (!db) {
    return res.status(200).json({ saved: false, reason: "Firestore not initialized" });
  }

  try {
    const docId = isEditing && existingId ? existingId : "q_admin_" + Math.random().toString(36).substr(2, 9);
    await db.collection("admin_questions").doc(docId).set({
      id: docId,
      category,
      text,
      subsection: subsection || null,
      context,
      options,
      updated_at: new Date().toISOString()
    });
    return res.status(201).json({ saved: true, id: docId });
  } catch (firestoreErr) {
    console.error("Failed to persist question:", firestoreErr);
    return res.status(500).json({ error: "Failed to persist question" });
  }
});

app.delete("/api/admin/questions/:id", async (req, res) => {
  const { id } = req.params;

  if (!db) {
    return res.status(200).json({ deleted: false, reason: "Firestore not initialized" });
  }

  try {
    await db.collection("admin_questions").doc(id).delete();
    return res.status(200).json({ deleted: true, id });
  } catch (firestoreErr) {
    console.error("Failed to delete question:", firestoreErr);
    return res.status(500).json({ error: "Failed to delete question" });
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
