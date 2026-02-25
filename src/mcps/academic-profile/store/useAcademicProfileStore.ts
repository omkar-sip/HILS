import { create } from 'zustand'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/shared/config/firebase'
import type { AcademicProfile } from '@/shared/types/syllabus.types'

interface AcademicProfileStore {
    profile: AcademicProfile | null
    isLoading: boolean
    error: string | null
    fetchProfile: (uid: string) => Promise<void>
    saveProfile: (uid: string, profile: AcademicProfile) => Promise<void>
    updateSemester: (uid: string, semester: number) => Promise<void>
    clearProfile: () => void
}

/**
 * Auto-migrate legacy fields → ID-based structure.
 * Returns clean AcademicProfile or null.
 */
function migrateIfNeeded(raw: Record<string, unknown> | undefined): AcademicProfile | null {
    if (!raw) return null

    // Already migrated — has universityId
    if (raw.universityId) {
        return {
            universityId: raw.universityId as string,
            branchId: raw.branchId as string,
            schemeId: (raw.schemeId as string) as AcademicProfile['schemeId'],
            semester: (raw.semester as number) ?? 3,
            createdAt: (raw.createdAt as number) ?? Date.now(),
            updatedAt: (raw.updatedAt as number) ?? Date.now(),
        }
    }

    // Legacy format — has university/universityName/branch/branchName/scheme/currentSemester
    if (raw.university || raw.branch || raw.scheme) {
        return {
            universityId: (raw.university as string) ?? 'vtu',
            branchId: (raw.branch as string) ?? 'cse',
            schemeId: (raw.scheme as string ?? '2022') as AcademicProfile['schemeId'],
            semester: (raw.currentSemester as number) ?? 3,
            createdAt: (raw.updatedAt as number) ?? Date.now(),
            updatedAt: Date.now(),
        }
    }

    return null
}

export const useAcademicProfileStore = create<AcademicProfileStore>((set, get) => ({
    profile: null,
    isLoading: false,
    error: null,

    fetchProfile: async (uid) => {
        set({ isLoading: true, error: null })
        try {
            const ref = doc(db, 'users', uid)
            const snap = await getDoc(ref)
            const raw = snap.data()?.academicProfile as Record<string, unknown> | undefined
            const profile = migrateIfNeeded(raw)

            // If we migrated from legacy format, persist the clean version
            if (profile && raw && !raw.universityId) {
                await setDoc(ref, { academicProfile: profile }, { merge: true })
            }

            set({ profile, isLoading: false })
        } catch (err) {
            set({ error: err instanceof Error ? err.message : 'Failed to load profile', isLoading: false })
        }
    },

    saveProfile: async (uid, profile) => {
        set({ isLoading: true, error: null })
        try {
            const now = Date.now()
            const withTs: AcademicProfile = {
                ...profile,
                createdAt: profile.createdAt || now,
                updatedAt: now,
            }
            await setDoc(doc(db, 'users', uid), { academicProfile: withTs }, { merge: true })
            set({ profile: withTs, isLoading: false })
        } catch (err) {
            set({ error: err instanceof Error ? err.message : 'Failed to save profile', isLoading: false })
        }
    },

    updateSemester: async (uid, semester) => {
        const current = get().profile
        if (!current) return
        const updated: AcademicProfile = { ...current, semester, updatedAt: Date.now() }
        set({ profile: updated })           // optimistic
        try {
            await updateDoc(doc(db, 'users', uid), {
                'academicProfile.semester': semester,
                'academicProfile.updatedAt': Date.now(),
            })
        } catch (err) {
            set({ profile: current })       // revert on failure
            set({ error: err instanceof Error ? err.message : 'Update failed' })
        }
    },

    clearProfile: () => set({ profile: null, error: null }),
}))
