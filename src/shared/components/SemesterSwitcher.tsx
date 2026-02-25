import { useAuthStore } from '@/mcps/auth/store/useAuthStore'
import { useAcademicProfileStore } from '@/mcps/academic-profile/store/useAcademicProfileStore'
import { ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const SEMESTER_LABELS: Record<number, string> = {
    1: '1st Sem', 2: '2nd Sem', 3: '3rd Sem', 4: '4th Sem',
    5: '5th Sem', 6: '6th Sem', 7: '7th Sem', 8: '8th Sem',
}
const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8]

export default function SemesterSwitcher() {
    const { user } = useAuthStore()
    const { profile, updateSemester } = useAcademicProfileStore()
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    const current = profile?.semester ?? 3

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleSelect = (sem: number) => {
        if (!user) return
        updateSemester(user.uid, sem)
        setOpen(false)
    }

    if (!profile) return null

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(o => !o)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-hils-card border border-hils-border text-sm text-hils-text hover:border-white/20 transition-colors"
            >
                <span className="text-hils-text-muted text-xs">Semester:</span>
                <span className="font-medium">{SEMESTER_LABELS[current]}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-hils-text-dim transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div className="absolute top-full mt-1.5 right-0 z-50 glass-card border border-hils-border rounded-xl overflow-hidden w-36 py-1"
                    style={{ backdropFilter: 'blur(20px)' }}>
                    {SEMESTERS.map(sem => (
                        <button
                            key={sem}
                            onClick={() => handleSelect(sem)}
                            className={`w-full text-left px-3 py-2 text-sm transition-colors
                                ${sem === current
                                    ? 'text-hils-text font-semibold bg-white/[0.06]'
                                    : 'text-hils-text-muted hover:text-hils-text hover:bg-white/[0.04]'}`}
                        >
                            {SEMESTER_LABELS[sem]}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
