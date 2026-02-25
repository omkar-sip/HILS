import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    User, Mail, Phone, Building2, CheckCircle2, Edit3,
    GraduationCap, BookOpen, Trophy, Settings,
    Loader2, Save, AlertCircle
} from 'lucide-react'
import { useAuthStore } from '@/mcps/auth/store/useAuthStore'
import { useUserProfileStore } from '@/mcps/user-profile/store/useUserProfileStore'
import { useAcademicProfileStore } from '@/mcps/academic-profile/store/useAcademicProfileStore'
import { useProgressStore } from '@/mcps/progress/store/useProgressStore'
import { resolveAcademicNames, resolveSemesterData } from '@/shared/utils/resolveAcademicNames'

// ─── Sub-component: Stat Card ─────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub }: { icon: typeof User; label: string; value: string | number; sub?: string }) {
    return (
        <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-hils-text-dim" />
                <span className="text-xs text-hils-text-muted">{label}</span>
            </div>
            <p className="text-2xl font-bold text-hils-text">{value}</p>
            {sub && <p className="text-xs text-hils-text-dim mt-0.5">{sub}</p>}
        </div>
    )
}

// ─── Sub-component: Section Progress Bar ─────────────────────────────────────
function ProgressBar({ label, done, total }: { label: string; done: number; total: number }) {
    const pct = total > 0 ? Math.round((done / total) * 100) : 0
    return (
        <div className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-hils-text-muted truncate mr-2">{label}</span>
                <span className="text-hils-text-dim flex-shrink-0">{done}/{total}</span>
            </div>
            <div className="h-1.5 bg-hils-border rounded-full overflow-hidden">
                <div className="h-full bg-hils-success rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
            </div>
        </div>
    )
}

// ─── Main Profile Page ────────────────────────────────────────────────────────
export default function ProfilePage() {
    const navigate = useNavigate()
    const { user } = useAuthStore()
    const { userProfile, isLoading: profileLoading, error: profileError, fetchUserProfile, saveUserProfile } = useUserProfileStore()
    const { profile: academicProfile } = useAcademicProfileStore()
    const { isTopicCompleted, completedTopics } = useProgressStore()

    const [editing, setEditing] = useState(false)
    const [form, setForm] = useState({ fullName: '', email: '', mobileNumber: '', collegeName: '' })
    const [saved, setSaved] = useState(false)

    // Load profile
    useEffect(() => {
        if (user && !userProfile) fetchUserProfile(user.uid)
    }, [user, userProfile, fetchUserProfile])

    // Sync form when profile loads
    useEffect(() => {
        if (userProfile) {
            setForm({
                fullName: userProfile.fullName ?? '',
                email: userProfile.email ?? user?.email ?? '',
                mobileNumber: userProfile.mobileNumber ?? '',
                collegeName: userProfile.collegeName ?? '',
            })
        } else if (user) {
            setForm(f => ({ ...f, fullName: user.displayName ?? '', email: user.email ?? '' }))
        }
    }, [userProfile, user])

    // ── Progress calculations ──────────────────────────────────────────────────
    const names = useMemo(() => resolveAcademicNames(academicProfile), [academicProfile])

    const semData = useMemo(() => resolveSemesterData(academicProfile), [academicProfile])

    const semStats = useMemo(() => {
        if (!semData) return { totalTopics: 0, completedTopics: 0, pct: 0 }
        const totalTopics = semData.subjects.reduce((a, s) => a + s.modules.reduce((b, m) => b + m.topics.length, 0), 0)
        const done = semData.subjects.reduce((a, s) => a + s.modules.reduce((b, m) => b + m.topics.filter(t => isTopicCompleted(t.id)).length, 0), 0)
        return { totalTopics, completedTopics: done, pct: totalTopics > 0 ? Math.round((done / totalTopics) * 100) : 0 }
    }, [semData, isTopicCompleted])

    const allCompletedCount = Object.keys(completedTopics).length

    const handleSave = async () => {
        if (!user || !form.fullName.trim() || !form.email.trim()) return
        await saveUserProfile(user.uid, {
            fullName: form.fullName.trim(),
            email: form.email.trim(),
            mobileNumber: form.mobileNumber.trim(),
            collegeName: form.collegeName.trim(),
        })
        setEditing(false)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
    }

    const displayName = userProfile?.fullName || user?.displayName || 'Student'
    const displayEmail = userProfile?.email || user?.email || '—'
    const initials = displayName.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-hils-text">Profile</h1>
                <p className="text-sm text-hils-text-muted mt-0.5">Your account and academic progress</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ── Left Column: User info + form ─────────────────────────── */}
                <div className="lg:col-span-1 space-y-4">
                    {/* Avatar + Name */}
                    <div className="glass-card p-5 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-white/[0.08] border border-hils-border flex items-center justify-center mx-auto mb-3">
                            <span className="text-xl font-bold text-hils-text">{initials}</span>
                        </div>
                        <p className="font-semibold text-hils-text">{displayName}</p>
                        <p className="text-xs text-hils-text-muted mt-0.5 truncate">{displayEmail}</p>
                        {!editing && (
                            <button onClick={() => setEditing(true)} className="mt-3 flex items-center gap-1.5 text-xs text-hils-text-muted hover:text-hils-text transition-colors mx-auto">
                                <Edit3 className="w-3 h-3" /> Edit Profile
                            </button>
                        )}
                    </div>

                    {/* User Profile Form */}
                    <div className="glass-card p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-hils-text">Personal Details</h3>
                            {!editing && (
                                <button onClick={() => setEditing(true)} className="p-1.5 rounded-lg hover:bg-hils-card transition-colors">
                                    <Edit3 className="w-3.5 h-3.5 text-hils-text-dim" />
                                </button>
                            )}
                        </div>

                        {!editing ? (
                            <div className="space-y-3">
                                {[
                                    { icon: User, label: 'Full Name', value: userProfile?.fullName || '—' },
                                    { icon: Mail, label: 'Email', value: userProfile?.email || user?.email || '—' },
                                    { icon: Phone, label: 'Mobile', value: userProfile?.mobileNumber || '—' },
                                    { icon: Building2, label: 'College', value: userProfile?.collegeName || '—' },
                                ].map(f => (
                                    <div key={f.label} className="flex items-start gap-2.5">
                                        <f.icon className="w-3.5 h-3.5 text-hils-text-dim mt-0.5 flex-shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-[10px] text-hils-text-dim uppercase tracking-wider">{f.label}</p>
                                            <p className="text-sm text-hils-text truncate">{f.value}</p>
                                        </div>
                                    </div>
                                ))}
                                {saved && (
                                    <div className="flex items-center gap-1.5 text-hils-success text-xs mt-2">
                                        <CheckCircle2 className="w-3.5 h-3.5" /> Saved successfully
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {[
                                    { key: 'fullName', label: 'Full Name *', placeholder: 'Your full name', type: 'text', required: true },
                                    { key: 'email', label: 'Email ID *', placeholder: 'your@email.com', type: 'email', required: true },
                                    { key: 'mobileNumber', label: 'Mobile Number', placeholder: '+91 XXXXX XXXXX', type: 'tel', required: false },
                                    { key: 'collegeName', label: 'College Name (Optional)', placeholder: 'e.g. RV College of Engineering', type: 'text', required: false },
                                ].map(field => (
                                    <div key={field.key}>
                                        <label className="block text-[10px] text-hils-text-dim uppercase tracking-wider mb-1">{field.label}</label>
                                        <input
                                            type={field.type}
                                            value={form[field.key as keyof typeof form]}
                                            onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                                            placeholder={field.placeholder}
                                            className="w-full bg-hils-card border border-hils-border rounded-lg px-3 py-2 text-sm text-hils-text placeholder:text-hils-text-dim focus:outline-none focus:border-white/30 transition-colors"
                                        />
                                    </div>
                                ))}
                                {profileError && (
                                    <div className="flex items-center gap-1.5 text-hils-danger text-xs">
                                        <AlertCircle className="w-3.5 h-3.5" /> {profileError}
                                    </div>
                                )}
                                <div className="flex items-center gap-2 pt-1">
                                    <button onClick={handleSave} disabled={profileLoading || !form.fullName.trim()}
                                        className="flex-1 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors disabled:opacity-40 flex items-center justify-center gap-1.5">
                                        {profileLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                                        {profileLoading ? 'Saving...' : 'Save'}
                                    </button>
                                    <button onClick={() => setEditing(false)} className="py-2 px-3 rounded-lg border border-hils-border text-hils-text-muted text-sm hover:text-hils-text transition-colors">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Academic Setup Link */}
                    <div className="glass-card p-4">
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="w-4 h-4 text-hils-text-dim" />
                                <span className="text-sm font-medium text-hils-text">Academic Profile</span>
                            </div>
                            {academicProfile && <CheckCircle2 className="w-4 h-4 text-hils-success" />}
                        </div>
                        <p className="text-xs text-hils-text-muted mb-3">
                            {academicProfile
                                ? `${names.universityName} · ${names.branchName} · ${names.schemeName} · Sem ${academicProfile.semester}`
                                : 'Not configured yet'}
                        </p>
                        <button onClick={() => navigate('/setup')}
                            className="w-full py-2 rounded-lg border border-hils-border text-hils-text-muted text-xs hover:text-hils-text hover:border-white/20 transition-colors flex items-center justify-center gap-1.5">
                            <Settings className="w-3.5 h-3.5" />
                            {academicProfile ? 'Update Academic Setup' : 'Configure Academic Profile'}
                        </button>
                    </div>
                </div>

                {/* ── Right Column: Stats + Progress ───────────────────────── */}
                <div className="lg:col-span-2 space-y-5">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <StatCard icon={BookOpen} label="Topics Completed" value={allCompletedCount} sub="all time" />
                        <StatCard icon={CheckCircle2} label="This Semester" value={semStats.completedTopics} sub={`of ${semStats.totalTopics} topics`} />
                        <StatCard icon={Trophy} label="Completion" value={`${semStats.pct}%`} sub={`Semester ${academicProfile?.semester ?? '—'}`} />
                    </div>

                    {/* Semester Progress */}
                    {academicProfile && semData && (
                        <div className="glass-card p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold text-hils-text">Semester {academicProfile.semester} Progress</h3>
                                <span className="text-xs text-hils-text-dim">{semStats.pct}% overall</span>
                            </div>

                            {/* Overall bar */}
                            <div className="mb-5">
                                <div className="h-2 bg-hils-border rounded-full overflow-hidden mb-1">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${semStats.pct}%` }}
                                        transition={{ duration: 1, ease: 'easeOut' }}
                                        className="h-full bg-hils-success rounded-full"
                                    />
                                </div>
                                <p className="text-xs text-hils-text-dim">{semStats.completedTopics} of {semStats.totalTopics} topics completed</p>
                            </div>

                            {/* Per-subject breakdown */}
                            <div className="space-y-1">
                                {semData.subjects.filter(s => !s.isElective && !s.isLab).map(subject => {
                                    const total = subject.modules.reduce((a, m) => a + m.topics.length, 0)
                                    const done = subject.modules.reduce((a, m) => a + m.topics.filter(t => isTopicCompleted(t.id)).length, 0)
                                    return <ProgressBar key={subject.id} label={`${subject.code} · ${subject.name}`} done={done} total={total} />
                                })}
                            </div>
                        </div>
                    )}

                    {/* No academic profile placeholder */}
                    {!academicProfile && (
                        <div className="glass-card p-8 text-center">
                            <GraduationCap className="w-10 h-10 text-hils-text-dim mx-auto mb-3" />
                            <p className="text-sm font-medium text-hils-text mb-1">Academic profile not set up</p>
                            <p className="text-xs text-hils-text-muted mb-4">Set up your university, branch and scheme to see your progress dashboard.</p>
                            <button onClick={() => navigate('/setup')} className="btn-primary text-sm">
                                Configure Academic Profile
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
