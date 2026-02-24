import { create } from 'zustand'
import type { LearningMode, AIResponse } from '../types/ai.types'

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
}))
