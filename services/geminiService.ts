
import { GoogleGenAI, Type } from "@google/genai";
import { RiskLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeMoodEntry = async (notes: string, historySummary: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following student mental health check-in notes and 7-day trend summary.
      Notes: "${notes}"
      Context: "${historySummary}"
      
      Determine:
      1. Risk Level (STABLE, LOW, MODERATE, HIGH, CRITICAL)
      2. Detected Patterns (e.g., Burnout, Sleep Deprivation, Social Isolation)
      3. A supportive summary recommendation.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: { type: Type.STRING },
            patterns: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            recommendation: { type: Type.STRING }
          },
          required: ["riskLevel", "patterns", "recommendation"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return {
      riskLevel: RiskLevel.STABLE,
      patterns: ["Unable to analyze"],
      recommendation: "Please monitor your mood closely and reach out if you feel overwhelmed."
    };
  }
};

export const getSmartCaseAssignment = async (problemDescription: string, ambassadors: any[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Match this student's concern with the best available peer ambassador.
      Problem: "${problemDescription}"
      Ambassadors: ${JSON.stringify(ambassadors)}
      
      Output the ID of the best match and the reasoning.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            assignedAmbassadorId: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            category: { type: Type.STRING }
          },
          required: ["assignedAmbassadorId", "reasoning", "category"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return { assignedAmbassadorId: ambassadors[0]?.id, reasoning: "Default assignment due to error.", category: 'general' };
  }
};
