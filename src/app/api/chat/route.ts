import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `You are Aura, an empathetic, supportive digital companion for students who are feeling stressed or overwhelmed by academics.
Your tone should be warm, non-judgmental, and constructive. Keep your answers relatively short and conversational.
Offer small actionable advice when appropriate, but mostly listen and validate their feelings.`;

    const result = streamText({
      model: google("gemini-1.5-pro-latest"),
      system: systemPrompt,
      messages: messages as any,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response("Failed to generate response", { status: 500 });
  }
}
