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
    _abortController: AbortController | null
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
    activeMode: 'planner',
    currentTopicId: null,
    response: null,
    responseCache: {},
    isLoading: false,
    loadingMode: null,
    error: null,
    _abortController: null,

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
        const cacheKey = `${payload.topicId}:${payload.mode}:${payload.personaId}`
        const cached = get().getCachedResponse(cacheKey)
        if (cached) {
            set({ response: cached, isLoading: false, loadingMode: null, error: null })
            return
        }

        // Abort any in-flight request to prevent duplicate calls on rapid tab switching
        const prevController = get()._abortController
        if (prevController) {
            prevController.abort()
        }
        const controller = new AbortController()

        set({ isLoading: true, loadingMode: payload.mode, error: null, response: null, _abortController: controller })
        try {
            const result = await aiService.fetchExplanation(payload, controller.signal)
            // Only update if this request wasn't aborted
            if (!controller.signal.aborted) {
                get().cacheResponse(cacheKey, result)
                set({ response: result, isLoading: false, loadingMode: null, error: null, _abortController: null })
            }
        } catch (err) {
            if (err instanceof DOMException && err.name === 'AbortError') {
                // Request was aborted — don't update state
                return
            }
            const message = err instanceof Error ? err.message : 'Failed to generate explanation'
            set({ error: message, isLoading: false, loadingMode: null, _abortController: null })
        }
    },
}))
