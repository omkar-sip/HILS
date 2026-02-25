/**
 * Resolves display names from ID-based academic profile fields
 * using the local vtuSyllabus data. No Firestore reads needed.
 */

import { vtuSyllabus } from '@/shared/data/vtuSyllabus'
import type { AcademicProfile, Semester } from '@/shared/types/syllabus.types'

export interface ResolvedAcademicNames {
    universityName: string
    universityShortName: string
    branchName: string
    branchShortName: string
    schemeName: string
}

/**
 * Look up display names from IDs (pure function, no async/Firestore).
 */
export function resolveAcademicNames(profile: AcademicProfile | null): ResolvedAcademicNames {
    if (!profile) {
        return {
            universityName: 'Unknown University',
            universityShortName: '—',
            branchName: 'Unknown Branch',
            branchShortName: '—',
            schemeName: '—',
        }
    }

    // University — currently only VTU
    const uni = profile.universityId === vtuSyllabus.id ? vtuSyllabus : null
    const universityName = uni?.name ?? profile.universityId
    const universityShortName = uni?.shortName ?? profile.universityId.toUpperCase()

    // Branch
    const branch = uni?.branches.find(b => b.id === profile.branchId)
    const branchName = branch?.name ?? profile.branchId
    const branchShortName = branch?.shortName ?? profile.branchId.toUpperCase()

    // Scheme
    const schemeName = `${profile.schemeId} Scheme`

    return { universityName, universityShortName, branchName, branchShortName, schemeName }
}

/**
 * Returns the semester data for the profile's current semester.
 */
export function resolveSemesterData(profile: AcademicProfile | null): Semester | null {
    if (!profile) return null
    const sem = profile.semester
    for (const branch of vtuSyllabus.branches) {
        if (branch.id !== profile.branchId) continue
        const found = branch.semesters.find(s => s.number === sem)
        if (found) return found
    }
    // Fallback: search all branches
    for (const branch of vtuSyllabus.branches) {
        const found = branch.semesters.find(s => s.number === sem)
        if (found) return found
    }
    return null
}
