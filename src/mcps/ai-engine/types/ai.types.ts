// ─── AI Engine Types ───

export type LearningMode = 'explain' | 'quiz' | 'summary' | 'deep-dive'

export interface AIResponseSection {
    title: string
    content: string
    type: 'explanation' | 'analogy' | 'example' | 'exam-question' | 'summary'
}

export interface AIResponse {
    explanation: string
    analogy: string
    example: string
    examQuestion: string
    summary: string
    sections: AIResponseSection[]
    generatedAt: number
}

export interface AIRequestPayload {
    topicId: string
    topicName: string
    subjectName: string
    moduleName: string
    personaId: string
    mode: LearningMode
    syllabusContext?: string
}

export interface AIState {
    activeMode: LearningMode
    currentTopicId: string | null
    response: AIResponse | null
    responseCache: Record<string, AIResponse>
    isLoading: boolean
    error: string | null
}
