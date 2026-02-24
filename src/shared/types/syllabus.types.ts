// ─── Syllabus Hierarchy Types ───

export interface Topic {
    id: string
    name: string
    description?: string
    order: number
}

export interface Module {
    id: string
    name: string
    topics: Topic[]
    order: number
}

export interface Subject {
    id: string
    name: string
    code: string
    modules: Module[]
    credits?: number
}

export interface Semester {
    id: string
    number: number
    subjects: Subject[]
}

export interface University {
    id: string
    name: string
    shortName: string
    semesters: Semester[]
}

// ─── Navigation State ───

export interface SyllabusPath {
    universityId: string
    semesterId: string
    subjectId: string
    moduleId: string
    topicId: string
}
