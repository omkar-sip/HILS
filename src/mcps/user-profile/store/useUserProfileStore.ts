import { create } from 'zustand'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/shared/config/firebase'
import type { UserProfile } from '../types/userProfile.types'

interface UserProfileStore {
    userProfile: UserProfile | null
    isLoading: boolean
    error: string | null
    fetchUserProfile: (uid: string) => Promise<void>
    saveUserProfile: (uid: string, data: Omit<UserProfile, 'uid' | 'updatedAt'>) => Promise<void>
    clearUserProfile: () => void
}

export const useUserProfileStore = create<UserProfileStore>((set) => ({
    userProfile: null,
    isLoading: false,
    error: null,

    fetchUserProfile: async (uid) => {
        set({ isLoading: true, error: null })
        try {
            // Read from root user document — same doc as academicProfile
            const snap = await getDoc(doc(db, 'users', uid))
            const data = snap.data()
            set({ userProfile: (data?.userProfile as UserProfile) ?? null, isLoading: false })
        } catch (err) {
            set({ error: err instanceof Error ? err.message : 'Failed to load profile', isLoading: false })
        }
    },

    saveUserProfile: async (uid, data) => {
        set({ isLoading: true, error: null })
        try {
            const profile: UserProfile = { ...data, uid, updatedAt: Date.now() }
            // Merge into the root user document — no subcollections
            await setDoc(doc(db, 'users', uid), { userProfile: profile }, { merge: true })
            set({ userProfile: profile, isLoading: false })
        } catch (err) {
            set({ error: err instanceof Error ? err.message : 'Failed to save profile', isLoading: false })
        }
    },

    clearUserProfile: () => set({ userProfile: null, error: null }),
}))
