import { onCall, HttpsError } from "firebase-functions/v2/https";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface ParseDocumentRequest {
    base64Data: string;
    mimeType: string;
}

export const parseDocument = onCall<ParseDocumentRequest>(
    {
        maxInstances: 5,
        timeoutSeconds: 120, // Vision tasks can take longer
        cors: true,
        invoker: "public",
    },
    async (request) => {
        // 1. Validate auth
        if (!request.auth) {
            throw new HttpsError("unauthenticated", "User must be authenticated to use the Study Binder.");
        }

        const { base64Data, mimeType } = request.data;

        if (!base64Data || !mimeType) {
            throw new HttpsError("invalid-argument", "Missing document data.");
        }

        try {
            // Use standard flash model, it supports multimodal
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const prompt = `
You are an expert academic assistant designed to extract handwritten or printed exam questions from professor notes and past papers. 
Your task is to analyze the provided image/document.

Extract EVERY SINGLE exam question visible in the document.
If a question has sub-parts (e.g., 1a, 1b), extract them as separate individual questions so they can be answered independently.
Do NOT include structural text like "Answer any 5 questions" or "Total Marks: 100".
Only extract the actual academic questions/problems.

You MUST respond strictly with a valid JSON array of strings. Do not include markdown blocks or any other text.
Example format:
[
  "Explain the working of a Full Adder with a neat logic diagram.",
  "State and prove De Morgan's theorems."
]
            `;

            const imageParts = [
                {
                    inlineData: {
                        data: base64Data,
                        mimeType
                    }
                }
            ];

            const result = await model.generateContent([prompt, ...imageParts]);
            const responseText = result.response.text();

            // Extract JSON array
            try {
                const jsonMatch = responseText.match(/\[[\s\S]*\]/);
                if (!jsonMatch) {
                    throw new Error("No JSON array found in response");
                }
                const parsed = JSON.parse(jsonMatch[0]);
                if (!Array.isArray(parsed)) {
                    throw new Error("Response is not a valid JSON array");
                }
                return { questions: parsed };
            } catch (err) {
                console.error("Parse Error on Vision Output:", responseText, err);
                throw new HttpsError("internal", "Failed to parse questions from the document.");
            }

        } catch (error) {
            console.error("Gemini Vision API Error:", error);
            throw new HttpsError("internal", "Failed to process the document.");
        }
    }
);
