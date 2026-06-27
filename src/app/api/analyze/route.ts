import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export async function POST(req: Request) {
  try {
    const { text, mood } = await req.json();

    if (!text) {
      return new Response("Missing journal text", { status: 400 });
    }

    const { object } = await generateObject({
      model: google("gemini-1.5-pro-latest"),
      system: `You are an empathetic, expert psychological assistant analyzing a student's journal entry. 
Your goal is to extract key emotional insights and identify any specific stress triggers mentioned.
The user has also provided a self-reported mood: ${mood || "Not specified"}.
Be supportive, analytical, and concise.`,
      prompt: `Please analyze this journal entry: "${text}"`,
      schema: z.object({
        dominantEmotion: z.string().describe("The primary emotion expressed in the text."),
        stressTriggers: z.array(z.string()).describe("Specific things causing stress or anxiety, if any."),
        copingSuggestion: z.string().describe("A brief, actionable, and empathetic suggestion to help them cope."),
        positivityScore: z.number().min(1).max(10).describe("A score from 1 (very negative) to 10 (very positive) reflecting the tone."),
      }),
    });

    return Response.json(object);
  } catch (error) {
    console.error("Error analyzing journal:", error);
    return new Response("Failed to analyze journal", { status: 500 });
  }
}
