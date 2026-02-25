import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, BookOpen, Layers, FileText, X } from 'lucide-react'
import { vtuSyllabus } from '@/shared/data/vtuSyllabus'
import { useAcademicProfileStore } from '@/mcps/academic-profile/store/useAcademicProfileStore'

// ─── Types ────────────────────────────────────────────────────────────────────

type ResultKind = 'subject' | 'module' | 'topic'

interface SearchResult {
    kind: ResultKind
    id: string
    label: string
    sublabel: string
    topicId?: string  // present on module/topic so we can navigate
    subjectId?: string
}

// ─── Build search index from local VTU data ───────────────────────────────────

function buildIndex(semesterNumber: number): SearchResult[] {
    const results: SearchResult[] = []
    for (const branch of vtuSyllabus.branches) {
        for (const semester of branch.semesters) {
            if (semester.number !== semesterNumber) continue
            for (const subject of semester.subjects) {
                results.push({
                    kind: 'subject',
                    id: subject.id,
                    label: subject.name,
                    sublabel: `${subject.code} · ${subject.credits} credits`,
                })
                for (const mod of subject.modules) {
                    results.push({
                        kind: 'module',
                        id: mod.id,
                        label: `Module ${mod.moduleNumber}: ${mod.name}`,
                        sublabel: subject.name,
                        topicId: mod.topics[0]?.id,
                        subjectId: subject.id,
                    })
                    for (const topic of mod.topics) {
                        results.push({
                            kind: 'topic',
                            id: topic.id,
                            label: topic.name,
                            sublabel: `${subject.code} · ${mod.name}`,
                            topicId: topic.id,
                        })
                    }
                }
            }
        }
    }
    return results
}

// ─── Highlight matched text ───────────────────────────────────────────────────

function highlight(text: string, query: string) {
    if (!query.trim()) return <>{text}</>
    const idx = text.toLowerCase().indexOf(query.toLowerCase())
    if (idx === -1) return <>{text}</>
    return (
        <>
            {text.slice(0, idx)}
            <mark className="bg-white/20 text-white rounded px-0.5 not-italic">{text.slice(idx, idx + query.length)}</mark>
            {text.slice(idx + query.length)}
        </>
    )
}

const KIND_ICON = {
    subject: BookOpen,
    module: Layers,
    topic: FileText,
} as const

const KIND_LABEL = { subject: 'Subjects', module: 'Modules', topic: 'Topics' } as const

// ─── Component ───────────────────────────────────────────────────────────────

export default function GlobalSearch() {
    const navigate = useNavigate()
    const { profile } = useAcademicProfileStore()
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])
    const [open, setOpen] = useState(false)
    const [activeIdx, setActiveIdx] = useState(-1)
    const inputRef = useRef<HTMLInputElement>(null)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const currentSem = profile?.semester ?? 3

    const runSearch = useCallback((q: string) => {
        if (!q.trim()) { setResults([]); return }
        const index = buildIndex(currentSem)
        const lower = q.toLowerCase()
        const filtered = index.filter(r => r.label.toLowerCase().includes(lower) || r.sublabel.toLowerCase().includes(lower))
        setResults(filtered.slice(0, 20))
    }, [currentSem])

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => runSearch(query), 300)
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
    }, [query, runSearch])

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleSelect = (result: SearchResult) => {
        setOpen(false)
        setQuery('')
        if (result.topicId) {
            navigate(`/topic/${result.topicId}`)
        } else {
            navigate('/dashboard')
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!open || results.length === 0) return
        if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, results.length - 1)) }
        else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)) }
        else if (e.key === 'Enter' && activeIdx >= 0) { handleSelect(results[activeIdx]!) }
        else if (e.key === 'Escape') { setOpen(false); inputRef.current?.blur() }
    }

    // Group results by kind
    const grouped: { kind: ResultKind; items: SearchResult[] }[] = (
        ['subject', 'module', 'topic'] as ResultKind[]
    )
        .map(kind => ({ kind, items: results.filter(r => r.kind === kind) }))
        .filter(g => g.items.length > 0)

    let globalIdx = 0

    return (
        <div ref={containerRef} className="relative w-full max-w-sm">
            {/* Input */}
            <div className="relative flex items-center">
                <Search className="absolute left-3 w-4 h-4 text-hils-text-dim pointer-events-none" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={e => { setQuery(e.target.value); setOpen(true); setActiveIdx(-1) }}
                    onFocus={() => setOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search subjects, modules, topics..."
                    className="w-full bg-hils-card border border-hils-border rounded-xl pl-9 pr-8 py-2 text-sm text-hils-text placeholder:text-hils-text-dim focus:outline-none focus:border-white/30 transition-colors"
                />
                {query && (
                    <button onClick={() => { setQuery(''); setResults([]); inputRef.current?.focus() }} className="absolute right-2.5 p-0.5 rounded hover:bg-hils-card transition-colors">
                        <X className="w-3.5 h-3.5 text-hils-text-dim" />
                    </button>
                )}
            </div>

            {/* Dropdown */}
            <AnimatePresence>
                {open && results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full mt-2 w-full z-50 glass-card border border-hils-border rounded-xl overflow-hidden max-h-[380px] overflow-y-auto"
                        style={{ backdropFilter: 'blur(24px)' }}
                    >
                        {grouped.map(group => {
                            const Icon = KIND_ICON[group.kind]
                            return (
                                <div key={group.kind}>
                                    <div className="flex items-center gap-2 px-3 pt-3 pb-1">
                                        <Icon className="w-3 h-3 text-hils-text-dim" />
                                        <span className="text-[10px] font-semibold text-hils-text-dim uppercase tracking-wider">
                                            {KIND_LABEL[group.kind]}
                                        </span>
                                    </div>
                                    {group.items.map(result => {
                                        const idx = globalIdx++
                                        return (
                                            <button
                                                key={result.id}
                                                onMouseEnter={() => setActiveIdx(idx)}
                                                onClick={() => handleSelect(result)}
                                                className={`w-full text-left px-3 py-2.5 flex flex-col gap-0.5 transition-colors
                                                    ${activeIdx === idx ? 'bg-white/[0.06]' : 'hover:bg-white/[0.04]'}`}
                                            >
                                                <span className="text-sm text-hils-text font-medium">
                                                    {highlight(result.label, query)}
                                                </span>
                                                <span className="text-xs text-hils-text-muted">
                                                    {highlight(result.sublabel, query)}
                                                </span>
                                            </button>
                                        )
                                    })}
                                </div>
                            )
                        })}
                        <div className="px-3 py-2 border-t border-hils-border mt-1">
                            <p className="text-[10px] text-hils-text-dim">↑↓ navigate · Enter to open · Esc close</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
