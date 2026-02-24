import { httpsCallable } from 'firebase/functions'
import { functions } from '@/shared/config/firebase'
import type { AIRequestPayload, AIResponse } from '../types/ai.types'

const generateExplanationFn = httpsCallable<AIRequestPayload, AIResponse>(
    functions,
    'generateExplanation'
)

export const aiService = {
    async fetchExplanation(payload: AIRequestPayload): Promise<AIResponse> {
        try {
            const result = await generateExplanationFn(payload)
            return result.data
        } catch (error) {
            console.error('AI Service Error:', error)
            throw new Error('Failed to generate explanation. Please try again.')
        }
    },
}
