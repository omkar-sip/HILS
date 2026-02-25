// ─── Auth Types ───

import type { AcademicProfile } from '@/shared/types/syllabus.types'

export type AuthProvider = 'email' | 'google'

export interface AuthUser {
    uid: string
    email: string | null
    displayName: string | null
    photoURL: string | null
    emailVerified: boolean
    provider: AuthProvider
    academicProfile?: AcademicProfile | null
}

export interface AuthState {
    user: AuthUser | null
    isLoading: boolean
    isAuthenticated: boolean
    error: string | null
}
