// ─── Auth Types ───

export type AuthProvider = 'email' | 'google'

export interface AuthUser {
    uid: string
    email: string | null
    displayName: string | null
    photoURL: string | null
    emailVerified: boolean
    provider: AuthProvider
}

export interface AuthState {
    user: AuthUser | null
    isLoading: boolean
    isAuthenticated: boolean
    error: string | null
}
