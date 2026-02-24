// ─── Progress Types ───

export interface TopicProgress {
    topicId: string
    completedAt: number
    mode: string
    personaUsed: string
}

export interface ProgressState {
    completedTopics: Record<string, TopicProgress>
    totalTopics: number
    isLoading: boolean
}
