import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

import { z } from "zod";

export const runtime = "edge";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

const ChatRequestSchema = z.object({
  messages: z.array(z.any()).min(1, "Messages are required"),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = ChatRequestSchema.safeParse(json);

    if (!parsed.success) {
      return new Response("Invalid request format", { status: 400 });
    }

    const { messages } = parsed.data;

    const systemPrompt = `You are Aura, an empathetic, supportive digital companion for students who are feeling stressed or overwhelmed by academics.
Your tone should be warm, non-judgmental, and constructive. Keep your answers relatively short and conversational.
Offer small actionable advice when appropriate, but mostly listen and validate their feelings.`;

    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: systemPrompt,
      messages: messages as any,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response("Failed to generate response", { status: 500 });
  }
}
