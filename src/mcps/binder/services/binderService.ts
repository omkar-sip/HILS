import { httpsCallable } from 'firebase/functions';
import { functions } from '@/shared/config/firebase';



export const parseDocumentFile = async (file: File): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
            try {
                const base64String = reader.result as string;
                // Remove the standard data:image/png;base64, prefix
                const base64Data = base64String.split(',')[1];

                if (!base64Data) {
                    throw new Error("Failed to read file data");
                }

                const proxyGemini = httpsCallable<any, { text: string }>(
                    functions,
                    'proxyGeminiCall'
                );

                const prompt = `You are an expert academic assistant designed to extract handwritten or printed exam questions from professor notes and past papers. 
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
]`;

                const imageParts = [{
                    inlineData: {
                        data: base64Data,
                        mimeType: file.type
                    }
                }];

                const result = await proxyGemini({
                    prompt: [prompt, ...imageParts],
                    isRawTextMode: true
                });

                const responseText = result.data.text;

                // Clean up possible markdown before extracting JSON
                const cleanText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

                // Extract JSON array
                const jsonMatch = cleanText.match(/\[[\s\S]*\]/);
                if (!jsonMatch) {
                    console.error("Raw response:", responseText);
                    throw new Error("No JSON array found in response");
                }
                const parsed = JSON.parse(jsonMatch[0]);
                if (!Array.isArray(parsed)) {
                    throw new Error("Response is not a valid JSON array");
                }

                resolve(parsed);
            } catch (error) {
                console.error("Error parsing document:", error);
                reject(error);
            }
        };

        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
    });
};
