import { create } from 'zustand'
import type { LearningMode, AIResponse, AIRequestPayload } from '../types/ai.types'
import { aiService } from '../services/aiService'

interface AIStore {
    activeMode: LearningMode
    currentTopicId: string | null
    response: AIResponse | null
    responseCache: Record<string, AIResponse>
    isLoading: boolean
    loadingMode: LearningMode | null
    error: string | null
    setMode: (mode: LearningMode) => void
    setTopic: (topicId: string) => void
    setResponse: (response: AIResponse) => void
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    getCachedResponse: (key: string) => AIResponse | undefined
    cacheResponse: (key: string, response: AIResponse) => void
    clearCache: () => void
    generateExplanation: (payload: AIRequestPayload & { forceRefresh?: boolean }) => Promise<void>
}

export const useAIStore = create<AIStore>((set, get) => ({
    activeMode: 'planner',
    currentTopicId: null,
    response: null,
    responseCache: {},
    isLoading: false,
    loadingMode: null,
    error: null,

    setMode: (mode) => set({ activeMode: mode }),

    setTopic: (topicId) => set({ currentTopicId: topicId, response: null }),

    setResponse: (response) => set({ response, isLoading: false, loadingMode: null, error: null }),

    setLoading: (loading) => set({ isLoading: loading }),

    setError: (error) => set({ error, isLoading: false, loadingMode: null }),

    getCachedResponse: (key) => get().responseCache[key],

    cacheResponse: (key, response) =>
        set((state) => ({
            responseCache: { ...state.responseCache, [key]: response },
        })),

    clearCache: () => set({ responseCache: {} }),

    generateExplanation: async (payload) => {
        const cacheKey = payload.topicId === 'custom'
            ? `custom:${payload.mode}:${payload.personaId}` // Bypasses cache check below anyway
            : `${payload.topicId}:${payload.mode}:${payload.personaId}`

        if (!payload.forceRefresh && payload.topicId !== 'custom') {
            const cached = get().getCachedResponse(cacheKey)
            if (cached) {
                set({ response: cached, isLoading: false, loadingMode: null, error: null })
                return
            }
        }

        set({ isLoading: true, loadingMode: payload.mode, error: null, response: null })
        try {
            const response = await aiService.fetchExplanation(payload)
            get().cacheResponse(cacheKey, response)
            set({ response: response, isLoading: false, loadingMode: null, error: null })
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to generate explanation'
            set({ error: message, isLoading: false, loadingMode: null })
        }
    },
}))
