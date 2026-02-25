import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
    Sparkles, ArrowRight, BookOpen, Brain, Layers,
    BarChart3, Users, Zap, GraduationCap, MessageSquare,
    ChevronRight, Github, Linkedin, Twitter, Send,
    AlertTriangle, Library, Lightbulb, Globe, Cpu, Clock,
    BookMarked, Rocket, Shield
} from 'lucide-react'
import { useAuthStore } from '@/mcps/auth/store/useAuthStore'
import ParticleBackground from '@/shared/components/ParticleBackground'
import AnimatedCounter from '@/shared/components/AnimatedCounter'
import TabletScrollSection from '@/shared/components/TabletScrollSection'

// ─── Fade-in wrapper ───
function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// ─── Rotating words ───
const ROTATING_PHRASES = [
    'Understanding Concepts.',
    'Thinking Clearly.',
    'Writing Confidently.',
    'Solving Systematically.',
    'Scoring Strategically.',
]

function RotateWords() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((prev) => (prev + 1) % ROTATING_PHRASES.length)
        }, 3000)
        return () => clearInterval(id)
    }, [])

    return (
        <span className="inline-block relative pb-3" style={{ minWidth: '9.5em', lineHeight: 1.4 }}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={ROTATING_PHRASES[index]}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: { type: 'spring', stiffness: 300, damping: 15 },
                    }}
                    exit={{
                        opacity: 0,
                        y: -18,
                        transition: { duration: 0.25, ease: 'easeIn' },
                    }}
                    className="inline-block text-white"
                >
                    {ROTATING_PHRASES[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    )
}

export default function LandingPage() {
    const { isAuthenticated, user } = useAuthStore()
    const featuresRef = useRef<HTMLDivElement>(null)
    const howItWorksRef = useRef<HTMLDivElement>(null)

    const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="min-h-screen bg-hils-bg text-hils-text overflow-x-hidden">

            {/* ═══════════════════════════════════════════ */}
            {/* 1 NAVBAR                                    */}
            {/* ═══════════════════════════════════════════ */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-hils-bg/60 backdrop-blur-xl border-b border-hils-border/50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-white/10 transition-all">
                            <Sparkles className="w-4 h-4 text-black" />
                        </div>
                        <span className="text-lg font-bold tracking-tight">HILS</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-1">
                        {[
                            { label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
                            { label: 'Features', action: () => scrollTo(featuresRef) },
                            { label: 'How It Works', action: () => scrollTo(howItWorksRef) },
                            { label: 'Pricing', action: () => { } },
                            ...(isAuthenticated && user?.emailVerified !== false
                                ? [{ label: 'Dashboard', action: null, to: '/dashboard' }]
                                : []),
                        ].map((item) =>
                            item.to ? (
                                <Link
                                    key={item.label}
                                    to={item.to}
                                    className="px-3 py-1.5 text-sm text-hils-text-muted hover:text-hils-text transition-colors rounded-md hover:bg-hils-card/50"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <button
                                    key={item.label}
                                    onClick={item.action ?? undefined}
                                    className="px-3 py-1.5 text-sm text-hils-text-muted hover:text-hils-text transition-colors rounded-md hover:bg-hils-card/50"
                                >
                                    {item.label}
                                </button>
                            )
                        )}
                    </div>

                    <div>
                        {isAuthenticated ? (
                            <Link to="/dashboard" className="btn-primary text-sm flex items-center gap-1.5">
                                Dashboard <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        ) : (
                            <Link to="/login" className="btn-primary text-sm flex items-center gap-1.5">
                                Login <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* ═══════════════════════════════════════════ */}
            {/* 2 HERO SECTION                              */}
            {/* ═══════════════════════════════════════════ */}
            <section className="relative min-h-screen flex items-center pt-16">
                <ParticleBackground />
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-hils-bg pointer-events-none" />
                <div className="absolute top-32 left-1/4 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-32 right-1/4 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] mb-6">
                                <Zap className="w-3.5 h-3.5 text-[#CFCFCF]" />
                                <span className="text-xs font-medium text-[#CFCFCF]">AI-Powered Learning</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
                                Master Your University{' '}
                                <span className="text-white">
                                    Concepts with AI
                                </span>
                            </h1>

                            <p className="text-lg text-hils-text-muted leading-relaxed mb-8 max-w-lg">
                                Persona-driven learning. VTU-focused structure. Real-world explanations
                                that actually stick.
                            </p>

                            <div className="flex flex-wrap gap-3">
                                <Link to="/login" className="btn-primary text-base px-8 py-3 flex items-center gap-2">
                                    Start Learning Now <ArrowRight className="w-4 h-4" />
                                </Link>
                                <button
                                    onClick={() => scrollTo(howItWorksRef)}
                                    className="btn-secondary text-base px-8 py-3"
                                >
                                    See How It Works
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Mock UI Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="hidden lg:block"
                    >
                        <div className="glass-card p-6 max-w-md ml-auto animate-glow-pulse">
                            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-hils-border/50">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400/60" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                                    <div className="w-3 h-3 rounded-full bg-green-400/60" />
                                </div>
                                <span className="text-xs text-hils-text-dim font-mono">topic/binary-search-trees</span>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-lg">🎓</span>
                                <span className="text-sm font-medium text-[#CFCFCF]">Prof. Clarity</span>
                                <span className="badge ml-auto">Explain Mode</span>
                            </div>
                            <h3 className="text-sm font-semibold mb-2">Binary Search Trees</h3>
                            <div className="space-y-2">
                                <div className="h-2 bg-hils-border/40 rounded-full w-full" />
                                <div className="h-2 bg-hils-border/40 rounded-full w-11/12" />
                                <div className="h-2 bg-hils-border/40 rounded-full w-9/12" />
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                {['Explanation', 'Analogy', 'Example', 'Summary'].map((s) => (
                                    <div key={s} className="px-3 py-2 rounded-lg bg-hils-surface/60 border border-hils-border/30">
                                        <p className="text-[10px] text-[#CFCFCF] font-semibold uppercase tracking-wider">{s}</p>
                                        <div className="h-1.5 bg-hils-border/30 rounded mt-1.5 w-3/4" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════ */}
            {/* 3 PROBLEM SECTION                           */}
            {/* ═══════════════════════════════════════════ */}
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Engineering Education Is{' '}
                            <span className="text-hils-danger">Broken.</span>
                        </h2>
                        <p className="text-hils-text-muted max-w-xl mx-auto">
                            Students are stuck in a system that does not adapt to how they learn.
                        </p>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Clock,
                                title: 'Outdated Teaching',
                                description: 'Lectures have not evolved in decades. Slides from 2005, explanations from the textbook, zero engagement.',
                                color: 'text-red-400',
                                bg: 'bg-red-400/10',
                                border: 'border-red-400/20',
                            },
                            {
                                icon: AlertTriangle,
                                title: 'Memorization Without Understanding',
                                description: 'Students cram before exams and forget everything after. No real comprehension, no retention.',
                                color: 'text-orange-400',
                                bg: 'bg-orange-400/10',
                                border: 'border-orange-400/20',
                            },
                            {
                                icon: Globe,
                                title: 'No Real-World Connection',
                                description: 'Theory stays in textbooks. Students graduate without knowing how concepts apply to real engineering.',
                                color: 'text-yellow-400',
                                bg: 'bg-yellow-400/10',
                                border: 'border-yellow-400/20',
                            },
                        ].map((card, i) => (
                            <FadeIn key={card.title} delay={i * 0.1}>
                                <div className={`glass-card-hover p-6 h-full border ${card.border}`}>
                                    <div className={`p-2.5 rounded-xl ${card.bg} w-fit mb-4`}>
                                        <card.icon className={`w-5 h-5 ${card.color}`} />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                                    <p className="text-sm text-hils-text-muted leading-relaxed">{card.description}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════ */}
            {/* 3.5 EXAM BUDDY — 3D TABLET SCROLL           */}
            {/* ═══════════════════════════════════════════ */}
            <TabletScrollSection />

            {/* ═══════════════════════════════════════════ */}
            {/* 4 SOLUTION - WHAT IS HILS?                  */}
            {/* ═══════════════════════════════════════════ */}
            <section ref={featuresRef} className="py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 relative">
                    <FadeIn className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] mb-4">
                            <Cpu className="w-3.5 h-3.5 text-[#CFCFCF]" />
                            <span className="text-xs font-medium text-[#CFCFCF]">The Solution</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            An AI Academic{' '}
                            <span className="text-white">
                                Operating System.
                            </span>
                        </h2>
                        <p className="text-hils-text-muted max-w-xl mx-auto">
                            HILS reimagines how engineering students learn — structured, persona-driven, and powered by AI.
                        </p>
                    </FadeIn>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[
                            { icon: Users, title: 'Persona-Based Teaching', desc: '5 unique AI teaching styles — from academic professor to exam strategist.', color: 'text-white', bg: 'bg-white/[0.06]' },
                            { icon: Layers, title: 'Mode Switching', desc: 'Switch between Concept, Exam Prep, Deep Dive, and Summary modes instantly.', color: 'text-blue-400', bg: 'bg-blue-400/10' },
                            { icon: BookMarked, title: 'Syllabus Navigation', desc: 'Organized by University, Semester, Subject, Module, and Topic.', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
                            { icon: Lightbulb, title: 'Real-world Analogies', desc: 'Every concept comes with relatable analogies that make it click.', color: 'text-amber-400', bg: 'bg-amber-400/10' },
                            { icon: BarChart3, title: 'Progress Tracking', desc: 'Track every topic you have completed. Stay on top of your learning.', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
                            { icon: Shield, title: 'Exam-Ready Content', desc: 'AI generates model exam questions and answers tailored to your syllabus.', color: 'text-rose-400', bg: 'bg-rose-400/10' },
                        ].map((f, i) => (
                            <FadeIn key={f.title} delay={i * 0.08}>
                                <div className="glass-card-hover p-5 h-full group">
                                    <div className={`p-2 rounded-lg ${f.bg} w-fit mb-3 group-hover:scale-110 transition-transform duration-200`}>
                                        <f.icon className={`w-5 h-5 ${f.color}`} />
                                    </div>
                                    <h3 className="text-sm font-semibold mb-1.5">{f.title}</h3>
                                    <p className="text-xs text-hils-text-muted leading-relaxed">{f.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════ */}
            {/* 5 HOW IT WORKS (3 Steps)                    */}
            {/* ═══════════════════════════════════════════ */}
            <section ref={howItWorksRef} className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
                        <p className="text-hils-text-muted max-w-lg mx-auto">Three steps to better learning.</p>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-white/0 via-white/[0.12] to-white/0" />

                        {[
                            { step: '01', icon: Library, title: 'Select Your Subject', desc: 'Browse your university syllabus. Pick a semester, subject, and topic.' },
                            { step: '02', icon: MessageSquare, title: 'Choose Your Persona', desc: 'Learn from Prof. Clarity, Buddy Dev, Story Sage — whoever clicks for you.' },
                            { step: '03', icon: Brain, title: 'Learn with AI', desc: 'Get structured explanations, analogies, examples, and exam questions.' },
                        ].map((s, i) => (
                            <FadeIn key={s.step} delay={i * 0.15} className="relative">
                                <div className="text-center">
                                    <div className="mx-auto w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center mb-5 relative z-10">
                                        <s.icon className="w-7 h-7 text-[#CFCFCF]" />
                                    </div>
                                    <div className="text-xs font-bold text-[#CFCFCF] tracking-widest mb-2">STEP {s.step}</div>
                                    <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                                    <p className="text-sm text-hils-text-muted leading-relaxed max-w-xs mx-auto">{s.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════ */}
            {/* 6 DEEP FEATURE HIGHLIGHT                    */}
            {/* ═══════════════════════════════════════════ */}
            <section className="py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <FadeIn>
                            <div className="glass-card p-6">
                                <p className="text-xs font-semibold text-hils-text-dim uppercase tracking-wider mb-4">Active Persona</p>
                                <div className="space-y-3">
                                    {[
                                        { emoji: '🎓', name: 'Prof. Clarity', active: false, style: 'Academic & Precise' },
                                        { emoji: '💻', name: 'Buddy Dev', active: true, style: 'Casual & Practical' },
                                        { emoji: '📖', name: 'Story Sage', active: false, style: 'Narrative & Memorable' },
                                        { emoji: '🤔', name: 'Socra-Tech', active: false, style: 'Socratic Method' },
                                        { emoji: '🏆', name: 'Exam Ace', active: false, style: 'Exam Strategist' },
                                    ].map((p) => (
                                        <div
                                            key={p.name}
                                            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${p.active
                                                ? 'bg-white/[0.06] border border-white/[0.12] shadow-sm shadow-white/[0.04]'
                                                : 'border border-transparent hover:bg-hils-surface/50'
                                                }`}
                                        >
                                            <span className="text-2xl">{p.emoji}</span>
                                            <div>
                                                <p className="text-sm font-medium">{p.name}</p>
                                                <p className="text-xs text-hils-text-dim">{p.style}</p>
                                            </div>
                                            {p.active && <span className="ml-auto badge">Active</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] mb-4">
                                <Users className="w-3.5 h-3.5 text-[#CFCFCF]" />
                                <span className="text-xs font-medium text-[#CFCFCF]">Persona-Driven AI</span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
                                Same Topic.{' '}
                                <span className="text-white">
                                    Different Voice.
                                </span>
                            </h2>

                            <div className="space-y-4 mb-8">
                                {[
                                    { quote: 'Teach me like a startup founder.', persona: 'Buddy Dev' },
                                    { quote: 'Explain it like I am 10.', persona: 'Story Sage' },
                                    { quote: 'Make it exam-ready.', persona: 'Exam Ace' },
                                ].map((q) => (
                                    <div key={q.persona} className="flex items-start gap-3">
                                        <ChevronRight className="w-4 h-4 text-[#CFCFCF] mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="text-base font-medium italic text-hils-text">&ldquo;{q.quote}&rdquo;</p>
                                            <p className="text-xs text-hils-text-dim mt-0.5">&mdash; {q.persona}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className="text-sm text-hils-text-muted leading-relaxed">
                                HILS adapts its teaching style to match how you learn best. Every persona brings a
                                unique approach to the same concept — making learning personal.
                            </p>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════ */}
            {/* 7 SOCIAL PROOF / STATS                      */}
            {/* ═══════════════════════════════════════════ */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built for Serious Students</h2>
                        <p className="text-hils-text-muted">Platform metrics that speak for themselves.</p>
                    </FadeIn>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { end: 150, suffix: '+', label: 'Topics Covered', icon: BookOpen },
                            { end: 5, suffix: '', label: 'AI Personas', icon: Users },
                            { end: 10, suffix: '+', label: 'Universities (Roadmap)', icon: GraduationCap },
                            { end: 5000, suffix: '+', label: 'AI Explanations Ready', icon: Brain },
                        ].map((stat) => (
                            <div key={stat.label} className="glass-card p-6">
                                <div className="mx-auto w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center mb-3">
                                    <stat.icon className="w-5 h-5 text-[#CFCFCF]" />
                                </div>
                                <AnimatedCounter end={stat.end} suffix={stat.suffix} label={stat.label} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════ */}
            {/* 8 FINAL CTA                                 */}
            {/* ═══════════════════════════════════════════ */}
            <section className="py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.04] rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-3xl mx-auto px-6 text-center relative">
                    <FadeIn>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-snug mb-6">
                            Stop Memorizing. Start
                            <br />
                            <span className="mt-3 inline-block"><RotateWords /></span>
                        </h2>
                        <p className="text-lg text-hils-text-muted mb-8 max-w-lg mx-auto">
                            Join the next generation of engineering students who learn with structure, clarity, and AI.
                        </p>
                        <Link to="/login" className="btn-primary text-base px-10 py-3.5 inline-flex items-center gap-2">
                            <Rocket className="w-5 h-5" />
                            Login &amp; Start Learning
                        </Link>
                    </FadeIn>
                </div>
            </section>

            {/* ═══════════════════════════════════════════ */}
            {/* BRAND WATERMARK                             */}
            {/* ═══════════════════════════════════════════ */}
            <section className="relative py-20 overflow-hidden">
                {/* Radial glow behind text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[800px] h-[300px] bg-white/[0.03] rounded-full blur-[120px]" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 flex flex-col items-center">
                    {/* Social icons */}
                    <div className="flex items-center gap-4 mb-8">
                        <a
                            href="#"
                            className="w-9 h-9 rounded-lg bg-hils-surface/60 border border-hils-border/40 flex items-center justify-center text-hils-text-dim hover:text-white hover:border-white/[0.15] transition-all"
                            aria-label="GitHub"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                        <a
                            href="#"
                            className="w-9 h-9 rounded-lg bg-hils-surface/60 border border-hils-border/40 flex items-center justify-center text-hils-text-dim hover:text-hils-accent-light hover:border-hils-accent/30 transition-all"
                            aria-label="Contact"
                        >
                            <Send className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Giant HILS text */}
                    <h2
                        className="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] font-black leading-none tracking-tighter select-none"
                        style={{
                            background: 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 50%, rgba(0,0,0,0) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                        aria-hidden="true"
                    >
                        HILS
                    </h2>

                    {/* Logo icon overlaying the text */}
                    <div className="-mt-24 sm:-mt-32 md:-mt-40 lg:-mt-48 relative z-10">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-hils-bg border border-hils-border/60 flex items-center justify-center shadow-xl shadow-black/40">
                            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-hils-text-dim" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════ */}
            {/* 9 FOOTER                                    */}
            {/* ═══════════════════════════════════════════ */}
            <footer className="border-t border-hils-border/50 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
                                    <Sparkles className="w-3.5 h-3.5 text-black" />
                                </div>
                                <span className="text-sm font-bold tracking-tight">HILS</span>
                            </div>
                            <p className="text-xs text-hils-text-dim leading-relaxed mb-4">
                                Hybrid Integrated Learning System.<br />
                                Built by engineers, for engineers.
                            </p>
                            <div className="flex gap-3">
                                {[
                                    { icon: Twitter, href: '#' },
                                    { icon: Linkedin, href: '#' },
                                    { icon: Github, href: '#' },
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.href}
                                        className="w-8 h-8 rounded-lg bg-hils-surface border border-hils-border flex items-center justify-center text-hils-text-dim hover:text-white hover:border-white/[0.15] transition-all"
                                    >
                                        <social.icon className="w-3.5 h-3.5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-hils-text uppercase tracking-wider mb-4">Product</p>
                            <ul className="space-y-2.5">
                                {['Features', 'Roadmap', 'Pricing', 'Changelog'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-hils-text-muted hover:text-hils-text transition-colors">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-hils-text uppercase tracking-wider mb-4">Resources</p>
                            <ul className="space-y-2.5">
                                {['Documentation', 'VTU Syllabus', 'Support', 'API Reference'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-hils-text-muted hover:text-hils-text transition-colors">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-hils-text uppercase tracking-wider mb-4">Company</p>
                            <ul className="space-y-2.5">
                                {['About', 'Contact', 'Privacy Policy', 'Terms of Service'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-hils-text-muted hover:text-hils-text transition-colors">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-hils-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-xs text-hils-text-dim">&copy; 2026 HILS. All rights reserved.</p>
                        <p className="text-xs text-hils-text-dim flex items-center gap-1">
                            Built with <Send className="w-3 h-3 text-[#CFCFCF]" /> by the HILS team
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
