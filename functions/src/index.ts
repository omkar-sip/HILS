import { onCall, HttpsError } from "firebase-functions/v2/https";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildPrompt } from "./services/promptBuilder";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface ExplanationRequest {
    topicId: string;
    topicName: string;
    subjectName: string;
    moduleName: string;
    personaId: string;
    personaModifier?: string;
    mode: string;
    syllabusContext?: string;
}

interface AIResponse {
    explanation: string;
    analogy: string;
    example: string;
    examQuestion: string;
    summary: string;
    sections: Array<{
        title: string;
        content: string;
        type: string;
    }>;
    generatedAt: number;
}

export const generateExplanation = onCall<ExplanationRequest>(
    {
        maxInstances: 10,
        timeoutSeconds: 60,
        cors: true,
        invoker: "public",
    },
    async (request) => {
        // 1. Validate auth
        if (!request.auth) {
            throw new HttpsError("unauthenticated", "User must be authenticated.");
        }

        const { topicName, subjectName, moduleName, personaModifier, mode, syllabusContext } =
            request.data;

        // 2. Validate input
        if (!topicName || !subjectName || !moduleName) {
            throw new HttpsError("invalid-argument", "Missing required fields.");
        }

        // 3. Build prompt
        const prompt = buildPrompt({
            topicName,
            subjectName,
            moduleName,
            personaModifier: personaModifier || "Explain clearly and thoroughly.",
            mode: mode || "explain",
            syllabusContext,
        });

        try {
            // 4. Call Gemini API
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const result = await model.generateContent(prompt);
            const responseText = result.response.text();

            // 5. Parse structured JSON response
            let parsed: Omit<AIResponse, "sections" | "generatedAt">;
            try {
                // Extract JSON from response (handle markdown code blocks)
                const jsonMatch = responseText.match(/\{[\s\S]*\}/);
                if (!jsonMatch) {
                    throw new Error("No JSON found in response");
                }
                parsed = JSON.parse(jsonMatch[0]);
            } catch {
                // Fallback: use raw text
                parsed = {
                    explanation: responseText,
                    analogy: "",
                    example: "",
                    examQuestion: "",
                    summary: "",
                };
            }

            // 6. Return structured response
            const response: AIResponse = {
                ...parsed,
                sections: [
                    { title: "Explanation", content: parsed.explanation, type: "explanation" },
                    { title: "Analogy", content: parsed.analogy, type: "analogy" },
                    { title: "Example", content: parsed.example, type: "example" },
                    { title: "Exam Question", content: parsed.examQuestion, type: "exam-question" },
                    { title: "Summary", content: parsed.summary, type: "summary" },
                ],
                generatedAt: Date.now(),
            };

            return response;
        } catch (error) {
            console.error("Gemini API Error:", error);
            throw new HttpsError("internal", "Failed to generate explanation.");
        }
    }
);

interface ProxyGeminiRequest {
    prompt: any; // Can be string or array for multimodal
    maxOutputTokens?: number;
    isRawTextMode?: boolean;
}

export const proxyGeminiCall = onCall<ProxyGeminiRequest>(
    {
        maxInstances: 10,
        timeoutSeconds: 60,
        cors: true,
        invoker: "public",
    },
    async (request) => {
        // 1. Validate auth to prevent abuse
        if (!request.auth) {
            throw new HttpsError("unauthenticated", "User must be authenticated to use AI services.");
        }

        const { prompt, maxOutputTokens, isRawTextMode } = request.data;

        if (!prompt) {
            throw new HttpsError("invalid-argument", "Prompt is required.");
        }

        try {
            const model = genAI.getGenerativeModel({
                model: "gemini-2.5-flash",
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: maxOutputTokens || 4096,
                    responseMimeType: isRawTextMode ? 'text/plain' : 'application/json',
                }
            });
            const result = await model.generateContent(prompt);
            return { text: result.response.text() };
        } catch (error) {
            console.error("Gemini Proxy API Error:", error);
            throw new HttpsError("internal", "Failed to generate AI response via proxy.");
        }
    }
);

// Study Binder Feature
export { parseDocument } from "./api/parseDocument";
