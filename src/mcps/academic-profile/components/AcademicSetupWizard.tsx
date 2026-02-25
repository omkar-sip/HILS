import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, GitBranch, Calendar, ChevronRight, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react'
import { useAuthStore } from '@/mcps/auth/store/useAuthStore'
import { useAcademicProfileStore } from '../store/useAcademicProfileStore'
import type { AcademicProfile, SchemeYear } from '@/shared/types/syllabus.types'

// ─── Config ───────────────────────────────────────────────────────────────────

const UNIVERSITIES = [
    { id: 'vtu', name: 'Visvesvaraya Technological University', shortName: 'VTU' },
]

const BRANCHES = [
    { id: 'cse', name: 'Computer Science & Engineering', shortName: 'CSE' },
    { id: 'ise', name: 'Information Science & Engineering', shortName: 'ISE' },
    { id: 'ece', name: 'Electronics & Communication Engg.', shortName: 'ECE' },
    { id: 'me', name: 'Mechanical Engineering', shortName: 'ME' },
    { id: 'cv', name: 'Civil Engineering', shortName: 'CV' },
    { id: 'eee', name: 'Electrical & Electronics Engg.', shortName: 'EEE' },
]

const SCHEMES: { value: SchemeYear; label: string; description: string }[] = [
    { value: '2022', label: '2022 Scheme', description: 'Current scheme for students admitted 2022 onwards' },
    { value: '2025', label: '2025 Scheme', description: 'Latest scheme for students admitted 2025 onwards' },
]

const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8]

// ─── Wizard Steps ────────────────────────────────────────────────────────────

const STEPS = [
    { id: 1, label: 'University', icon: GraduationCap },
    { id: 2, label: 'Branch', icon: GitBranch },
    { id: 3, label: 'Scheme & Semester', icon: Calendar },
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function AcademicSetupWizard() {
    const navigate = useNavigate()
    const { user } = useAuthStore()
    const { saveProfile, isLoading } = useAcademicProfileStore()

    const [step, setStep] = useState(1)
    const [selectedUniversity, setSelectedUniversity] = useState<typeof UNIVERSITIES[0]>(UNIVERSITIES[0]!)
    const [selectedBranch, setSelectedBranch] = useState<(typeof BRANCHES)[0] | null>(null)
    const [selectedScheme, setSelectedScheme] = useState<SchemeYear>('2022')
    const [selectedSemester, setSelectedSemester] = useState(3)

    const canProceed =
        step === 1 ? !!selectedUniversity :
            step === 2 ? !!selectedBranch :
                !!selectedScheme && !!selectedSemester

    const handleComplete = async () => {
        if (!user || !selectedBranch) return
        const now = Date.now()
        const profile: AcademicProfile = {
            universityId: selectedUniversity.id,
            branchId: selectedBranch.id,
            schemeId: selectedScheme,
            semester: selectedSemester,
            createdAt: now,
            updatedAt: now,
        }
        await saveProfile(user.uid, profile)
        navigate('/dashboard', { replace: true })
    }

    return (
        <div className="min-h-screen bg-hils-bg flex flex-col items-center justify-center px-4">
            {/* Brand */}
            <div className="mb-10 text-center">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-6 h-6 text-black" />
                </div>
                <h1 className="text-2xl font-bold text-hils-text">Set Up Your Academic Profile</h1>
                <p className="text-hils-text-muted text-sm mt-1">We'll personalize your syllabus. This is done only once.</p>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center gap-3 mb-8">
                {STEPS.map((s, i) => {
                    const Icon = s.icon
                    const done = step > s.id
                    const active = step === s.id
                    return (
                        <div key={s.id} className="flex items-center gap-3">
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300
                                ${done ? 'bg-white/[0.12] text-hils-text' : active ? 'bg-white text-black' : 'bg-hils-card text-hils-text-dim'}`}>
                                {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                                <span>{s.label}</span>
                            </div>
                            {i < STEPS.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-hils-text-dim flex-shrink-0" />}
                        </div>
                    )
                })}
            </div>

            {/* Step Card */}
            <div className="w-full max-w-lg">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -24 }}
                        transition={{ duration: 0.22 }}
                        className="glass-card p-6"
                    >
                        {/* Step 1 – University */}
                        {step === 1 && (
                            <div>
                                <h2 className="text-lg font-semibold text-hils-text mb-1">Select University</h2>
                                <p className="text-sm text-hils-text-muted mb-5">More universities will be added soon.</p>
                                <div className="space-y-2">
                                    {UNIVERSITIES.map(u => (
                                        <button
                                            key={u.id}
                                            onClick={() => setSelectedUniversity(u)}
                                            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left
                                                ${selectedUniversity.id === u.id
                                                    ? 'border-white/40 bg-white/[0.08]'
                                                    : 'border-hils-border hover:border-white/20 hover:bg-hils-card'}`}
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-hils-card border border-hils-border flex items-center justify-center flex-shrink-0">
                                                <span className="text-xs font-bold text-hils-text">{u.shortName}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-hils-text">{u.shortName}</p>
                                                <p className="text-xs text-hils-text-muted">{u.name}</p>
                                            </div>
                                            {selectedUniversity.id === u.id && (
                                                <CheckCircle2 className="w-4 h-4 text-hils-success ml-auto" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 2 – Branch */}
                        {step === 2 && (
                            <div>
                                <h2 className="text-lg font-semibold text-hils-text mb-1">Select Branch</h2>
                                <p className="text-sm text-hils-text-muted mb-5">Choose your engineering branch.</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {BRANCHES.map(b => (
                                        <button
                                            key={b.id}
                                            onClick={() => setSelectedBranch(b)}
                                            className={`flex flex-col items-start p-4 rounded-xl border transition-all text-left
                                                ${selectedBranch?.id === b.id
                                                    ? 'border-white/40 bg-white/[0.08]'
                                                    : 'border-hils-border hover:border-white/20 hover:bg-hils-card'}`}
                                        >
                                            <span className="text-sm font-bold text-hils-text mb-0.5">{b.shortName}</span>
                                            <span className="text-xs text-hils-text-muted leading-snug">{b.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 3 – Scheme & Semester */}
                        {step === 3 && (
                            <div>
                                <h2 className="text-lg font-semibold text-hils-text mb-1">Scheme & Current Semester</h2>
                                <p className="text-sm text-hils-text-muted mb-5">Select the VTU scheme you are studying under.</p>

                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {SCHEMES.map(s => (
                                        <button
                                            key={s.value}
                                            onClick={() => setSelectedScheme(s.value)}
                                            className={`p-4 rounded-xl border transition-all text-left
                                                ${selectedScheme === s.value
                                                    ? 'border-white/40 bg-white/[0.08]'
                                                    : 'border-hils-border hover:border-white/20 hover:bg-hils-card'}`}
                                        >
                                            <p className="text-sm font-bold text-hils-text mb-1">{s.label}</p>
                                            <p className="text-xs text-hils-text-muted leading-snug">{s.description}</p>
                                        </button>
                                    ))}
                                </div>

                                <label className="block text-sm font-medium text-hils-text mb-2">Current Semester</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {SEMESTERS.map(sem => (
                                        <button
                                            key={sem}
                                            onClick={() => setSelectedSemester(sem)}
                                            className={`py-2.5 rounded-xl border text-sm font-semibold transition-all
                                                ${selectedSemester === sem
                                                    ? 'border-white/40 bg-white text-black'
                                                    : 'border-hils-border text-hils-text-muted hover:border-white/20 hover:text-hils-text'}`}
                                        >
                                            Sem {sem}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-5">
                    {step > 1 ? (
                        <button
                            onClick={() => setStep(s => s - 1)}
                            className="btn-secondary text-sm flex items-center gap-1.5"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" /> Back
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate(-1)}
                            className="btn-secondary text-sm flex items-center gap-1.5"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" /> Back
                        </button>
                    )}

                    {step < STEPS.length ? (
                        <button
                            disabled={!canProceed}
                            onClick={() => setStep(s => s + 1)}
                            className="btn-primary text-sm flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Next <ChevronRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            disabled={!canProceed || isLoading}
                            onClick={handleComplete}
                            className="btn-primary text-sm flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                            {isLoading ? 'Saving...' : 'Get Started'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
