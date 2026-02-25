// ─── Syllabus Hierarchy Types ───

export type SchemeYear = '2022' | '2025'

export interface Topic {
    id: string
    name: string
    description?: string
    order: number
}

export interface Module {
    id: string
    name: string           // Official module name as per VTU
    moduleNumber: number   // 1–5 (VTU standard)
    topics: Topic[]
    order: number
}

export interface Subject {
    id: string
    name: string
    code: string           // Official VTU subject code (e.g. BCS301)
    credits: number
    isElective?: boolean   // true for ESC/AEC electives
    isLab?: boolean        // true for lab subjects
    modules: Module[]
}

export interface Semester {
    id: string
    number: number
    schemeYear: SchemeYear
    subjects: Subject[]
}

export interface Branch {
    id: string
    name: string           // "Computer Science & Engineering"
    shortName: string      // "CSE"
    semesters: Semester[]
}

export interface University {
    id: string
    name: string
    shortName: string
    branches: Branch[]
}

// ─── Academic Profile (ID-based — no display names stored) ───

export interface AcademicProfile {
    universityId: string   // e.g. 'vtu'
    branchId: string       // e.g. 'cse'
    schemeId: SchemeYear   // '2022'
    semester: number       // 3, 4, 5, ...
    createdAt: number
    updatedAt: number
}

// ─── Navigation State ───

export interface SyllabusPath {
    universityId: string
    semesterId: string
    subjectId: string
    moduleId: string
    topicId: string
}
