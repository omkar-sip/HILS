import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    BookOpen, ChevronRight, Layers, CheckCircle2, Circle,
    ArrowRight, Zap, GraduationCap, Bell, X, Sparkles, Search
} from 'lucide-react'
import { vtuSyllabus } from '@/shared/data/vtuSyllabus'
import { useProgressStore } from '@/mcps/progress/store/useProgressStore'
import { useAcademicProfileStore } from '@/mcps/academic-profile/store/useAcademicProfileStore'
import { useAuthStore } from '@/mcps/auth/store/useAuthStore'
import { resolveAcademicNames, resolveSemesterData } from '@/shared/utils/resolveAcademicNames'

type ViewLevel = 'subjects' | 'modules' | 'topics'

// ─── Setup Notification Popup ─────────────────────────────────────────────────
function SetupNotification({ onDismiss, onSetup }: { onDismiss: () => void; onSetup: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-80 glass-card border border-white/10 p-4 shadow-2xl"
        >
            <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bell className="w-4 h-4 text-hils-accent-light" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-hils-text mb-0.5">Create your academic profile</p>
                    <p className="text-xs text-hils-text-muted leading-relaxed mb-3">
                        Set up your University, Branch & Scheme to unlock your personalised syllabus.
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onSetup}
                            className="flex-1 py-1.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors"
                        >
                            Set Up Now
                        </button>
                        <button
                            onClick={onDismiss}
                            className="py-1.5 px-3 rounded-lg border border-hils-border text-hils-text-muted text-xs hover:text-hils-text transition-colors"
                        >
                            Later
                        </button>
                    </div>
                </div>
                <button onClick={onDismiss} className="p-0.5 hover:bg-white/[0.06] rounded transition-colors flex-shrink-0">
                    <X className="w-3.5 h-3.5 text-hils-text-dim" />
                </button>
            </div>
        </motion.div>
    )
}

// ─── Welcome Screen (no academic profile yet) ─────────────────────────────────
function WelcomeScreen({ onSetup }: { onSetup: () => void }) {
    const { user } = useAuthStore()
    const firstName = user?.displayName?.split(' ')[0] ?? 'Student'

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {/* Glow orb */}
                <div className="relative w-20 h-20 mx-auto mb-8">
                    <div className="absolute inset-0 rounded-full bg-white/5 blur-xl scale-150" />
                    <div className="relative w-20 h-20 rounded-2xl bg-hils-surface border border-hils-border flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-hils-text" />
                    </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-hils-text mb-2">
                    Welcome, {firstName} 👋
                </h1>
                <p className="text-hils-text-muted max-w-sm mx-auto mb-2 leading-relaxed text-sm md:text-base">
                    HILS helps you master your VTU syllabus with AI-powered explanations.
                </p>
                <p className="text-hils-text-dim text-sm mb-10">
                    Start by setting up your academic profile — takes less than 30 seconds.
                </p>

                {/* Stats preview cards */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 w-full">
                    {[
                        { label: 'Subjects', value: '8+' },
                        { label: 'Modules', value: '40+' },
                        { label: 'AI Modes', value: '4' },
                    ].map(stat => (
                        <div key={stat.label} className="glass-card px-5 py-3 text-center">
                            <p className="text-xl font-bold text-hils-text">{stat.value}</p>
                            <p className="text-xs text-hils-text-muted mt-0.5">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <button
                    onClick={onSetup}
                    className="btn-primary inline-flex items-center gap-2 text-sm px-6 py-3"
                >
                    <GraduationCap className="w-4 h-4" />
                    Set Up Academic Profile
                    <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-xs text-hils-text-dim mt-4">
                    You can always change this later from your profile settings.
                </p>
            </motion.div>
        </div>
    )
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────
export default function DashboardPage() {
    const navigate = useNavigate()
    const { subjectCode, moduleId } = useParams()
    const { profile, isLoading: profileLoading } = useAcademicProfileStore()
    const { isTopicCompleted, completedTopics } = useProgressStore()

    const [currentSubject, setCurrentSubject] = useState<string | null>(null)
    const [currentModule, setCurrentModule] = useState<string | null>(null)
    const [popupDismissed, setPopupDismissed] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    // ── Resolve display names from IDs ────────────────────────────────────────
    const names = useMemo(() => resolveAcademicNames(profile), [profile])
    const currentSemData = useMemo(() => resolveSemesterData(profile), [profile])

    // Sync route parameters to local state so breadcrumb navigation works
    useEffect(() => {
        if (!currentSemData) return

        if (subjectCode) {
            const subject = currentSemData.subjects.find(s => s.code === subjectCode)
            if (subject) {
                setCurrentSubject(subject.id)
                if (moduleId) {
                    const mod = subject.modules.find(m => m.id === moduleId)
                    if (mod) setCurrentModule(mod.id)
                } else {
                    setCurrentModule(null)
                }
            } else {
                setCurrentSubject(null)
                setCurrentModule(null)
            }
        } else {
            setCurrentSubject(null)
            setCurrentModule(null)
        }
    }, [subjectCode, moduleId, currentSemData])

    const viewLevel: ViewLevel = currentModule ? 'topics' : currentSubject ? 'modules' : 'subjects'
    const hasAcademicProfile = !!profile

    // Show popup on each visit if no profile (not just dismissed once permanently)
    const showPopup = !hasAcademicProfile && !profileLoading && !popupDismissed

    // ── Last completed topic for "Continue" banner ────────────────────────────
    const lastTopic = useMemo(() => {
        const entries = Object.values(completedTopics).sort((a, b) => b.completedAt - a.completedAt)
        const last = entries[0]
        if (!last) return null
        for (const branch of vtuSyllabus.branches) {
            for (const semester of branch.semesters) {
                for (const subject of semester.subjects) {
                    for (const mod of subject.modules) {
                        const tIdx = mod.topics.findIndex(tp => tp.id === last.topicId)
                        if (tIdx !== -1) {
                            const next = mod.topics[tIdx + 1]
                            const target = next ?? mod.topics[tIdx]!
                            return { subjectCode: subject.code, module: mod.name, topicName: target.name, topicId: target.id }
                        }
                    }
                }
            }
        }
        return null
    }, [completedTopics])

    const activeSubject = currentSemData?.subjects.find(s => s.id === currentSubject)
    const activeModule = activeSubject?.modules.find(m => m.id === currentModule)

    const breadcrumb = useMemo(() => {
        const items: { label: string; onClick: () => void }[] = [
            { label: `Sem ${profile?.semester ?? 3}`, onClick: () => { setCurrentSubject(null); setCurrentModule(null) } },
        ]
        if (activeSubject) items.push({ label: activeSubject.code, onClick: () => setCurrentModule(null) })
        if (activeModule) items.push({ label: `Module ${activeModule.moduleNumber}`, onClick: () => { } })
        return items
    }, [profile, activeSubject, activeModule])

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="relative">
            {/* No-profile welcome screen */}
            {!hasAcademicProfile && !profileLoading && (
                <WelcomeScreen onSetup={() => navigate('/setup')} />
            )}

            {/* Academic profile exists — subject/module/topic grid */}
            {hasAcademicProfile && (
                <div className="p-4 md:p-6 max-w-6xl mx-auto">

                    {/* Quick Query Omni-Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 relative"
                    >
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            if (searchQuery.trim()) {
                                navigate(`/topic/custom?q=${encodeURIComponent(searchQuery)}`);
                            }
                        }}>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-hils-accent/20 blur-xl rounded-2xl group-hover:bg-hils-accent/30 transition-all"></div>
                                <div className="relative flex items-center bg-hils-surface border-2 border-hils-border hover:border-hils-accent/50 rounded-2xl p-2 transition-colors shadow-2xl">
                                    <div className="pl-4 pr-3 text-hils-text-dim">
                                        <Search className="w-5 h-5 md:w-6 md:h-6 text-hils-accent-light" />
                                    </div>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Paste your PYQ or rapid query here for instant exam answers..."
                                        className="flex-1 bg-transparent border-none outline-none text-hils-text text-sm md:text-base py-3 focus:ring-0 placeholder:text-hils-text-muted"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!searchQuery.trim()}
                                        className="btn-primary ml-2 py-2 md:py-3 px-4 md:px-6 rounded-xl text-sm font-bold flex items-center gap-2"
                                    >
                                        <Zap className="w-4 h-4" />
                                        <span className="hidden sm:inline">Fast-Track</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </motion.div>

                    {/* Continue banner */}
                    {lastTopic && viewLevel === 'subjects' && (
                        <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 glass-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border border-white/10 group cursor-pointer"
                            onClick={() => navigate(`/topic/${lastTopic.topicId}`)}
                        >
                            <div className="flex items-start sm:items-center gap-3 min-w-0">
                                <div className="p-2 rounded-lg bg-white/[0.06] flex-shrink-0">
                                    <Zap className="w-4 h-4 text-hils-accent-light" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs text-hils-text-muted mb-0.5">Continue where you left off</p>
                                    <p className="text-sm font-semibold text-hils-text truncate">{lastTopic.topicName}</p>
                                    <p className="text-xs text-hils-text-dim truncate">{lastTopic.subjectCode} · {lastTopic.module}</p>
                                </div>
                            </div>
                            <div className="flex justify-end sm:block">
                                <ArrowRight className="w-4 h-4 text-hils-text-dim group-hover:text-hils-accent-light transition-colors flex-shrink-0" />
                            </div>
                        </motion.div>
                    )}

                    {/* Header */}
                    <div className="mb-6">
                        {viewLevel === 'subjects' && (
                            <div className="mb-2">
                                <h1 className="text-2xl font-bold text-hils-text">{names.branchName}</h1>
                                <p className="text-sm text-hils-text-muted mt-0.5">{names.universityShortName} · {names.schemeName} · Semester {profile?.semester}</p>
                            </div>
                        )}
                        <div className="flex items-center gap-1.5 text-sm">
                            {breadcrumb.map((item, i) => (
                                <span key={i} className="flex items-center gap-1.5">
                                    {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-hils-text-dim" />}
                                    <button onClick={item.onClick} className={`hover:text-hils-accent-light transition-colors ${i === breadcrumb.length - 1 ? 'text-hils-text font-medium' : 'text-hils-text-muted'}`}>
                                        {item.label}
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Subjects */}
                        {viewLevel === 'subjects' && currentSemData?.subjects.map((subject, i) => {
                            const totalTopics = subject.modules.reduce((acc, m) => acc + m.topics.length, 0)
                            const done = subject.modules.reduce((acc, m) => acc + m.topics.filter(t => isTopicCompleted(t.id)).length, 0)
                            const pct = totalTopics > 0 ? Math.round((done / totalTopics) * 100) : 0
                            return (
                                <motion.button key={subject.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                                    onClick={() => setCurrentSubject(subject.id)} className="glass-card-hover p-5 text-left group">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="p-2 rounded-lg bg-hils-accent/10"><BookOpen className="w-4 h-4 text-hils-accent-light" /></div>
                                        <div className="flex items-center gap-1.5">
                                            {subject.isElective && <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-hils-text-dim border border-hils-border">Elective</span>}
                                            {subject.isLab && <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-hils-text-dim border border-hils-border">Lab</span>}
                                            <span className="badge">{subject.code}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-sm font-semibold text-hils-text mb-0.5 leading-snug">{subject.name}</h3>
                                    <p className="text-xs text-hils-text-muted mb-3">{subject.credits} credits · {subject.modules.length} modules · {totalTopics} topics</p>
                                    <div className="w-full h-1 bg-hils-border rounded-full overflow-hidden">
                                        <div className="h-full bg-hils-success rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                                    </div>
                                    <p className="text-[10px] text-hils-text-dim mt-1">{pct}% complete</p>
                                </motion.button>
                            )
                        })}

                        {/* Modules */}
                        {viewLevel === 'modules' && activeSubject?.modules.map((mod, i) => {
                            const done = mod.topics.filter(t => isTopicCompleted(t.id)).length
                            return (
                                <motion.button key={mod.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                    onClick={() => setCurrentModule(mod.id)} className="glass-card-hover p-5 text-left group">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="p-2 rounded-lg bg-hils-accent/10"><Layers className="w-4 h-4 text-hils-accent-light" /></div>
                                        <span className="text-xs text-hils-text-dim">{done}/{mod.topics.length}</span>
                                    </div>
                                    <p className="text-[10px] text-hils-text-dim mb-0.5 uppercase tracking-wider font-medium">Module {mod.moduleNumber}</p>
                                    <h3 className="text-sm font-semibold text-hils-text mb-1">{mod.name}</h3>
                                    <p className="text-xs text-hils-text-muted">{mod.topics.length} topics</p>
                                </motion.button>
                            )
                        })}

                        {/* Topics */}
                        {viewLevel === 'topics' && activeModule?.topics.map((topic, i) => {
                            const done = isTopicCompleted(topic.id)
                            return (
                                <motion.button key={topic.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                    onClick={() => navigate(`/topic/${topic.id}`)} className="glass-card-hover p-4 text-left group">
                                    <div className="flex items-start gap-3">
                                        {done ? <CheckCircle2 className="w-4 h-4 text-hils-success mt-0.5 flex-shrink-0" /> : <Circle className="w-4 h-4 text-hils-text-dim mt-0.5 flex-shrink-0" />}
                                        <div>
                                            <h3 className="text-sm font-semibold text-hils-text mb-0.5">{topic.name}</h3>
                                            {topic.description && <p className="text-xs text-hils-text-muted leading-relaxed">{topic.description}</p>}
                                        </div>
                                    </div>
                                </motion.button>
                            )
                        })}
                    </div>

                    {!currentSemData && (
                        <div className="text-center py-20">
                            <GraduationCap className="w-12 h-12 text-hils-text-dim mx-auto mb-4" />
                            <p className="text-hils-text-muted">No subjects found. Use the semester switcher to change semester.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Notification popup */}
            <AnimatePresence>
                {showPopup && (
                    <SetupNotification
                        onDismiss={() => setPopupDismissed(true)}
                        onSetup={() => navigate('/setup')}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
