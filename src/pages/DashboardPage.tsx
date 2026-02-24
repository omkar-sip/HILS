import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    BookOpen, ChevronRight, GraduationCap, Layers,
    CheckCircle2, Circle, Folder
} from 'lucide-react'
import { cseSyllabus } from '@/shared/data/cseSyllabus'
import { useProgressStore } from '@/mcps/progress/store/useProgressStore'

type ViewLevel = 'semesters' | 'subjects' | 'modules' | 'topics'

export default function DashboardPage() {
    const navigate = useNavigate()
    const { isTopicCompleted } = useProgressStore()

    const [currentSemester, setCurrentSemester] = useState<string | null>(null)
    const [currentSubject, setCurrentSubject] = useState<string | null>(null)
    const [currentModule, setCurrentModule] = useState<string | null>(null)

    const viewLevel: ViewLevel = currentModule
        ? 'topics'
        : currentSubject
            ? 'modules'
            : currentSemester
                ? 'subjects'
                : 'semesters'

    const breadcrumb = useMemo(() => {
        const items: { label: string; onClick: () => void }[] = [
            { label: cseSyllabus.shortName, onClick: () => { setCurrentSemester(null); setCurrentSubject(null); setCurrentModule(null) } },
        ]
        if (currentSemester) {
            const sem = cseSyllabus.semesters.find((s) => s.id === currentSemester)
            items.push({ label: `Semester ${sem?.number}`, onClick: () => { setCurrentSubject(null); setCurrentModule(null) } })
        }
        if (currentSubject) {
            const sem = cseSyllabus.semesters.find((s) => s.id === currentSemester)
            const sub = sem?.subjects.find((s) => s.id === currentSubject)
            items.push({ label: sub?.code ?? '', onClick: () => setCurrentModule(null) })
        }
        if (currentModule) {
            const sem = cseSyllabus.semesters.find((s) => s.id === currentSemester)
            const sub = sem?.subjects.find((s) => s.id === currentSubject)
            const mod = sub?.modules.find((m) => m.id === currentModule)
            items.push({ label: mod?.name ?? '', onClick: () => { } })
        }
        return items
    }, [currentSemester, currentSubject, currentModule])

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-hils-text mb-1">Dashboard</h1>
                <p className="text-hils-text-muted text-sm">Navigate your syllabus</p>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 mb-6 text-sm">
                {breadcrumb.map((item, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                        {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-hils-text-dim" />}
                        <button
                            onClick={item.onClick}
                            className={`hover:text-hils-accent-light transition-colors ${i === breadcrumb.length - 1 ? 'text-hils-text font-medium' : 'text-hils-text-muted'
                                }`}
                        >
                            {item.label}
                        </button>
                    </span>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Semesters View */}
                {viewLevel === 'semesters' &&
                    cseSyllabus.semesters.map((semester, i) => (
                        <motion.button
                            key={semester.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => setCurrentSemester(semester.id)}
                            className="glass-card-hover p-6 text-left group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2.5 rounded-xl bg-hils-accent/10">
                                    <GraduationCap className="w-5 h-5 text-hils-accent-light" />
                                </div>
                                <ChevronRight className="w-4 h-4 text-hils-text-dim group-hover:text-hils-accent-light transition-colors" />
                            </div>
                            <h3 className="text-lg font-semibold text-hils-text mb-1">Semester {semester.number}</h3>
                            <p className="text-sm text-hils-text-muted">{semester.subjects.length} subjects</p>
                        </motion.button>
                    ))}

                {/* Subjects View */}
                {viewLevel === 'subjects' &&
                    cseSyllabus.semesters
                        .find((s) => s.id === currentSemester)
                        ?.subjects.map((subject, i) => {
                            const totalTopics = subject.modules.reduce((acc, m) => acc + m.topics.length, 0)
                            const completedTopics = subject.modules.reduce(
                                (acc, m) => acc + m.topics.filter((t) => isTopicCompleted(t.id)).length,
                                0
                            )
                            const progress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0

                            return (
                                <motion.button
                                    key={subject.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => setCurrentSubject(subject.id)}
                                    className="glass-card-hover p-6 text-left group"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-2.5 rounded-xl bg-hils-accent/10">
                                            <BookOpen className="w-5 h-5 text-hils-accent-light" />
                                        </div>
                                        <span className="badge">{subject.code}</span>
                                    </div>
                                    <h3 className="text-base font-semibold text-hils-text mb-1">{subject.name}</h3>
                                    <p className="text-sm text-hils-text-muted mb-3">{subject.modules.length} modules · {totalTopics} topics</p>
                                    {/* Progress bar */}
                                    <div className="w-full h-1.5 bg-hils-border rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-hils-success rounded-full transition-all duration-500"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-hils-text-dim mt-1.5">{progress}% complete</p>
                                </motion.button>
                            )
                        })}

                {/* Modules View */}
                {viewLevel === 'modules' &&
                    cseSyllabus.semesters
                        .find((s) => s.id === currentSemester)
                        ?.subjects.find((s) => s.id === currentSubject)
                        ?.modules.map((mod, i) => {
                            const completed = mod.topics.filter((t) => isTopicCompleted(t.id)).length

                            return (
                                <motion.button
                                    key={mod.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => setCurrentModule(mod.id)}
                                    className="glass-card-hover p-6 text-left group"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-2.5 rounded-xl bg-hils-accent/10">
                                            <Layers className="w-5 h-5 text-hils-accent-light" />
                                        </div>
                                        <span className="text-xs text-hils-text-dim">
                                            {completed}/{mod.topics.length}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-semibold text-hils-text mb-1">Module {mod.order}: {mod.name}</h3>
                                    <p className="text-sm text-hils-text-muted">{mod.topics.length} topics</p>
                                </motion.button>
                            )
                        })}

                {/* Topics View */}
                {viewLevel === 'topics' &&
                    cseSyllabus.semesters
                        .find((s) => s.id === currentSemester)
                        ?.subjects.find((s) => s.id === currentSubject)
                        ?.modules.find((m) => m.id === currentModule)
                        ?.topics.map((topic, i) => {
                            const completed = isTopicCompleted(topic.id)

                            return (
                                <motion.button
                                    key={topic.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => navigate(`/topic/${topic.id}`)}
                                    className="glass-card-hover p-5 text-left group"
                                >
                                    <div className="flex items-start gap-3">
                                        {completed ? (
                                            <CheckCircle2 className="w-5 h-5 text-hils-success mt-0.5 flex-shrink-0" />
                                        ) : (
                                            <Circle className="w-5 h-5 text-hils-text-dim mt-0.5 flex-shrink-0" />
                                        )}
                                        <div>
                                            <h3 className="text-sm font-semibold text-hils-text mb-1">{topic.name}</h3>
                                            {topic.description && (
                                                <p className="text-xs text-hils-text-muted">{topic.description}</p>
                                            )}
                                        </div>
                                    </div>
                                </motion.button>
                            )
                        })}
            </div>

            {/* Empty state */}
            {viewLevel === 'semesters' && cseSyllabus.semesters.length === 0 && (
                <div className="text-center py-20">
                    <Folder className="w-12 h-12 text-hils-text-dim mx-auto mb-4" />
                    <p className="text-hils-text-muted">No semesters available</p>
                </div>
            )}
        </div>
    )
}
