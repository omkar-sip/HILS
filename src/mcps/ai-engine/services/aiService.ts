/**
 * AI Service — calls Gemini 2.0 Flash directly via REST API.
 * No Cloud Functions needed.
 */
import type { AIRequestPayload, AIResponse } from '../types/ai.types'

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent'

function getApiKey(): string {
    const key = import.meta.env.VITE_GEMINI_API_KEY
    if (!key) throw new Error('VITE_GEMINI_API_KEY is not set in .env')
    return key
}

/**
 * Build a mode-specific system prompt tailored to the learning mode.
 */
function buildPrompt(payload: AIRequestPayload): string {
    const { topicName, subjectName, moduleName, mode, syllabusContext, personaModifier } = payload

    const contextLine = `Subject: ${subjectName}\nModule: ${moduleName}\nTopic: ${topicName}`
    const extraContext = syllabusContext ? `\nSyllabus context: ${syllabusContext}` : ''

    const personaLine = personaModifier
        ? `\n\nPersona instructions: ${personaModifier}`
        : ''

    switch (mode) {
        case 'explain':
            return `You are an expert VTU engineering professor.${personaLine}

${contextLine}${extraContext}

Provide a thorough explanation of this topic. Structure your response as JSON with these fields:
- "explanation": A detailed, clear explanation (2-4 paragraphs, use markdown formatting)
- "analogy": A memorable real-world analogy that makes this concept click
- "example": A practical example with code/diagram if applicable (use markdown code blocks)
- "examQuestion": A likely VTU exam question with a model answer
- "summary": A 2-3 sentence summary of the key takeaway

Respond ONLY with valid JSON, no markdown fences.`

        case 'deep-dive':
            return `You are an expert VTU engineering professor giving an in-depth lecture.${personaLine}

${contextLine}${extraContext}

Provide an exhaustive deep dive into this topic. Structure your response as JSON:
- "explanation": A comprehensive, detailed explanation covering all subtleties, edge cases, and advanced aspects (4-6 paragraphs, use markdown)
- "analogy": An extended analogy that covers multiple aspects of the concept
- "example": Multiple examples ranging from basic to advanced (use markdown code blocks)
- "examQuestion": 2-3 exam-style questions with detailed model answers
- "summary": Key points and relationships to other topics

Respond ONLY with valid JSON, no markdown fences.`

        case 'quiz':
            return `You are an expert VTU exam preparation coach.${personaLine}

${contextLine}${extraContext}

Generate a quiz to test understanding. Structure as JSON:
- "explanation": 5-6 quiz questions in this format: "Q1: [question]\\nA) option\\nB) option\\nC) option\\nD) option\\n\\nQ2: ..." — mix MCQ, true/false, and short answer
- "analogy": Tips and tricks for remembering key concepts for exams
- "example": Worked-out solutions for each quiz question
- "examQuestion": A challenging VTU-style question that combines multiple concepts
- "summary": Key formulas/definitions to memorize

Respond ONLY with valid JSON, no markdown fences.`

        case 'summary':
            return `You are an expert academic summarizer.${personaLine}

${contextLine}${extraContext}

Create a concise, exam-ready summary. Structure as JSON:
- "explanation": A crisp summary covering all key points in bullet form (use markdown lists)
- "analogy": One-line memory hooks for each key concept
- "example": Quick reference table or comparison if applicable (markdown table)
- "examQuestion": Most important definitions and formulas to remember
- "summary": The absolute minimum someone needs to know (2-3 sentences)

Respond ONLY with valid JSON, no markdown fences.`

        default:
            return `Explain the topic: ${topicName}. Respond as JSON with fields: explanation, analogy, example, examQuestion, summary.`
    }
}

export const aiService = {
    async fetchExplanation(payload: AIRequestPayload): Promise<AIResponse> {
        const apiKey = getApiKey()
        const prompt = buildPrompt(payload)

        const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 4096,
                    responseMimeType: 'application/json',
                },
            }),
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            const msg = (errorData as { error?: { message?: string } })?.error?.message || response.statusText
            throw new Error(`Gemini API error: ${msg}`)
        }

        const data = await response.json()
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text

        if (!text) throw new Error('Empty response from Gemini API')

        try {
            // Parse the JSON response
            const parsed = JSON.parse(text) as Record<string, string>
            return {
                explanation: parsed.explanation || '',
                analogy: parsed.analogy || '',
                example: parsed.example || '',
                examQuestion: parsed.examQuestion || '',
                summary: parsed.summary || '',
                sections: [],
                generatedAt: Date.now(),
            }
        } catch {
            // If JSON parsing fails, treat entire text as explanation
            return {
                explanation: text,
                analogy: '',
                example: '',
                examQuestion: '',
                summary: '',
                sections: [],
                generatedAt: Date.now(),
            }
        }
    },
}
