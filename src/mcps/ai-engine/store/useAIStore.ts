import { create } from 'zustand'
import type { LearningMode, AIResponse, AIRequestPayload } from '../types/ai.types'
import { aiService } from '../services/aiService'

interface AIStore {
    activeMode: LearningMode
    currentTopicId: string | null
    response: AIResponse | null
    responseCache: Record<string, AIResponse>
    isLoading: boolean
    error: string | null
    setMode: (mode: LearningMode) => void
    setTopic: (topicId: string) => void
    setResponse: (response: AIResponse) => void
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    getCachedResponse: (key: string) => AIResponse | undefined
    cacheResponse: (key: string, response: AIResponse) => void
    clearCache: () => void
    generateExplanation: (payload: AIRequestPayload) => Promise<void>
}

export const useAIStore = create<AIStore>((set, get) => ({
    activeMode: 'explain',
    currentTopicId: null,
    response: null,
    responseCache: {},
    isLoading: false,
    error: null,

    setMode: (mode) => set({ activeMode: mode }),

    setTopic: (topicId) => set({ currentTopicId: topicId, response: null }),

    setResponse: (response) => set({ response, isLoading: false, error: null }),

    setLoading: (loading) => set({ isLoading: loading }),

    setError: (error) => set({ error, isLoading: false }),

    getCachedResponse: (key) => get().responseCache[key],

    cacheResponse: (key, response) =>
        set((state) => ({
            responseCache: { ...state.responseCache, [key]: response },
        })),

    clearCache: () => set({ responseCache: {} }),

    generateExplanation: async (payload) => {
        const cacheKey = `${payload.topicId}:${payload.mode}:${payload.personaId}`
        const cached = get().getCachedResponse(cacheKey)
        if (cached) {
            set({ response: cached, isLoading: false, error: null })
            return
        }

        set({ isLoading: true, error: null, response: null })
        try {
            const result = await aiService.fetchExplanation(payload)
            get().cacheResponse(cacheKey, result)
            set({ response: result, isLoading: false, error: null })
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to generate explanation'
            set({ error: message, isLoading: false })
        }
    },
}))
