// ─── User Profile Types (separate from AcademicProfile) ───

export interface UserProfile {
    uid: string
    fullName: string
    email: string
    mobileNumber?: string
    collegeName?: string   // optional
    updatedAt?: number
}
