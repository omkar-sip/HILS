import { create } from 'zustand'
import type { TopicProgress } from '../types/progress.types'

interface ProgressStore {
    completedTopics: Record<string, TopicProgress>
    isLoading: boolean
    markComplete: (topicId: string, mode: string, personaUsed: string) => void
    isTopicCompleted: (topicId: string) => boolean
    getCompletedCount: () => number
    loadProgress: () => void
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
    completedTopics: {},
    isLoading: false,

    markComplete: (topicId, mode, personaUsed) =>
        set((state) => ({
            completedTopics: {
                ...state.completedTopics,
                [topicId]: {
                    topicId,
                    completedAt: Date.now(),
                    mode,
                    personaUsed,
                },
            },
        })),

    isTopicCompleted: (topicId) => !!get().completedTopics[topicId],

    getCompletedCount: () => Object.keys(get().completedTopics).length,

    loadProgress: () => {
        // TODO: Load from Firestore in future
        set({ isLoading: false })
    },
}))
