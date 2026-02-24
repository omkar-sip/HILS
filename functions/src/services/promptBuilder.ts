interface PromptConfig {
    topicName: string
    subjectName: string
    moduleName: string
    personaModifier: string
    mode: string
    syllabusContext?: string
}

export function buildPrompt(config: PromptConfig): string {
    const { topicName, subjectName, moduleName, personaModifier, mode, syllabusContext } = config

    const baseContext = `
You are an AI tutor for a university-level Computer Science course.

Subject: ${subjectName}
Module: ${moduleName}
Topic: ${topicName}
${syllabusContext ? `Syllabus Context: ${syllabusContext}` : ''}

Persona Instructions: ${personaModifier}
`

    const modeInstructions: Record<string, string> = {
        explain: `
Provide a comprehensive explanation of the topic. Cover all key concepts clearly.
`,
        'deep-dive': `
Provide an in-depth, advanced explanation. Include technical details, edge cases, 
and connections to related concepts. Assume the student wants thorough understanding.
`,
        quiz: `
Create a quiz-style learning experience. Include thought-provoking questions 
that test understanding of the topic rather than just memorization.
`,
        summary: `
Provide a concise, exam-ready summary of the topic. Focus on key definitions, 
important points, and commonly tested concepts.
`,
    }

    const outputFormat = `
You MUST respond in the following JSON format only. Do not include any text outside the JSON:

{
  "explanation": "A clear, detailed explanation of the topic",
  "analogy": "A relatable real-world analogy to make the concept intuitive",
  "example": "A concrete example demonstrating the concept (use code if applicable)",
  "examQuestion": "A university-level exam question with a model answer",
  "summary": "A concise 3-5 sentence summary of the key takeaways"
}

Every field must be a non-empty string. Be thorough but clear.
`

    return `${baseContext}\n${modeInstructions[mode] || modeInstructions['explain']}\n${outputFormat}`
}
