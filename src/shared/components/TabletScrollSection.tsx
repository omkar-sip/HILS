import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Rocket, CheckCircle2, Circle, Clock, TrendingUp } from 'lucide-react'

// ── smooth spring config ──
const SPRING = { stiffness: 80, damping: 24, mass: 0.6 }

// ── Dashboard Mock ──
function TabletDashboard() {
    return (
        <div className="w-full h-full bg-[#0a0a0a] rounded-lg p-3 sm:p-4 flex flex-col text-white overflow-hidden select-none">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div>
                    <p className="text-[9px] text-gray-500 uppercase tracking-wider">Subject</p>
                    <h3 className="text-xs sm:text-sm font-bold">Basic Electrical Engineering</h3>
                </div>
                <div className="px-2 py-0.5 rounded-full bg-violet-600/20 border border-violet-500/30">
                    <span className="text-[9px] font-semibold text-violet-400">Exam Mode</span>
                </div>
            </div>

            {/* Modules + Progress */}
            <div className="flex-1 grid grid-cols-5 gap-2 min-h-0">
                {/* Left: Module checklist */}
                <div className="col-span-3 space-y-1.5 overflow-hidden">
                    <p className="text-[9px] text-gray-500 uppercase tracking-wider">Modules</p>
                    {[
                        { name: "Ohm's Law", status: 'done' },
                        { name: "Kirchhoff's Law", status: 'done' },
                        { name: 'AC Circuits', status: 'progress' },
                        { name: 'Power Factor', status: 'pending' },
                    ].map((mod) => (
                        <div
                            key={mod.name}
                            className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] ${mod.status === 'done'
                                ? 'bg-emerald-500/10 border border-emerald-500/20'
                                : mod.status === 'progress'
                                    ? 'bg-violet-500/10 border border-violet-500/20'
                                    : 'bg-white/[0.03] border border-white/[0.06]'
                                }`}
                        >
                            {mod.status === 'done' ? (
                                <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                            ) : mod.status === 'progress' ? (
                                <Clock className="w-3 h-3 text-violet-400 flex-shrink-0" />
                            ) : (
                                <Circle className="w-3 h-3 text-gray-600 flex-shrink-0" />
                            )}
                            <span className={mod.status === 'done' ? 'text-emerald-300' : mod.status === 'progress' ? 'text-violet-300' : 'text-gray-500'}>
                                {mod.name}
                            </span>
                            {mod.status === 'done' && <span className="ml-auto text-[8px] text-emerald-500">✓</span>}
                        </div>
                    ))}
                </div>

                {/* Right: Progress panel */}
                <div className="col-span-2 space-y-2 overflow-hidden">
                    <p className="text-[9px] text-gray-500 uppercase tracking-wider">Readiness</p>
                    <div className="flex flex-col items-center">
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16">
                            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1e1e1e" strokeWidth="2.5" />
                                <circle
                                    cx="18" cy="18" r="15.9" fill="none"
                                    stroke="url(#prog-g)"
                                    strokeWidth="2.5"
                                    strokeDasharray="100"
                                    strokeDashoffset="22"
                                    strokeLinecap="round"
                                />
                                <defs>
                                    <linearGradient id="prog-g" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#7c3aed" />
                                        <stop offset="100%" stopColor="#22c55e" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs sm:text-sm font-black text-white">78%</span>
                            </div>
                        </div>
                        <span className="text-[8px] text-gray-500 mt-0.5">Exam Ready</span>
                    </div>

                    <div className="px-1.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06]">
                        <div className="flex items-center gap-1 mb-0.5">
                            <TrendingUp className="w-2.5 h-2.5 text-violet-400" />
                            <span className="text-[8px] text-gray-400">Confidence</span>
                        </div>
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className={`h-1 flex-1 rounded-full ${i <= 3 ? 'bg-violet-500' : i === 4 ? 'bg-violet-500/40' : 'bg-white/10'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-[8px] text-violet-400 block">Medium → High</span>
                    </div>
                </div>
            </div>

            {/* Bottom persona bar */}
            <div className="mt-2 pt-2 border-t border-white/[0.06] flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-violet-600/30 flex items-center justify-center text-[8px]">🎯</div>
                <div>
                    <p className="text-[8px] text-gray-500">Active Persona</p>
                    <p className="text-[9px] font-semibold text-violet-300">Strict IIT Mentor — Exam Mode</p>
                </div>
            </div>
        </div>
    )
}

// ── Main section ──
export default function TabletScrollSection() {
    const sectionRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })

    const progress = useSpring(scrollYProgress, SPRING)

    // Tablet 3D transforms — subtle, premium
    const tabletRotateX = useTransform(progress, [0.1, 0.4, 0.7], [6, 0, -2])
    const tabletRotateY = useTransform(progress, [0.1, 0.5, 0.7], [-2, 0, 1.5])
    const tabletScale = useTransform(progress, [0.1, 0.4, 0.7], [0.94, 1, 1.01])
    const tabletY = useTransform(progress, [0.1, 0.4, 0.7], [40, 0, -10])

    return (
        <section ref={sectionRef} className="relative py-16 sm:py-20 overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-violet-600/[0.05] rounded-full blur-[120px]" />
            </div>

            <div className="max-w-5xl mx-auto px-6 relative">
                {/* ─── Text Above Tablet ─── */}
                <div className="text-center mb-14 sm:mb-16">
                    {/* Eyebrow */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5 }}
                        className="text-violet-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4"
                    >
                        Your Exam Buddy When Panic Hits
                    </motion.p>

                    {/* Main headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5, delay: 0.08 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4"
                    >
                        Studying One Night<br />
                        <span className="bg-gradient-to-r from-violet-400 to-violet-300 bg-clip-text text-transparent">
                            Before the Exam?
                        </span>
                    </motion.h2>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5, delay: 0.16 }}
                        className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed"
                    >
                        Modules everywhere. Notes scattered. Zero clarity.<br className="hidden sm:inline" />
                        You don't know which AI tool to trust or if you've covered enough.
                    </motion.p>
                </div>

                {/* ─── 3D Tablet ─── */}
                <motion.div
                    style={{
                        rotateX: tabletRotateX,
                        rotateY: tabletRotateY,
                        scale: tabletScale,
                        y: tabletY,
                    }}
                    className="relative mx-auto max-w-[680px]"
                >
                    {/* Perspective wrapper */}
                    <div style={{ perspective: 1200 }}>
                        {/* Tablet frame */}
                        <div
                            className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.08]"
                            style={{
                                background: 'linear-gradient(145deg, #111111 0%, #0a0a0a 100%)',
                                boxShadow: `
                                    0 0 0 1px rgba(255,255,255,0.04),
                                    0 20px 40px -10px rgba(0,0,0,0.7),
                                    0 0 60px rgba(124,58,237,0.07),
                                    inset 0 1px 0 rgba(255,255,255,0.05)
                                `,
                            }}
                        >
                            {/* Bezel top — camera dot */}
                            <div className="flex items-center justify-center py-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                            </div>

                            {/* Screen */}
                            <div className="mx-2 sm:mx-3 mb-2 sm:mb-3 rounded-lg sm:rounded-xl overflow-hidden aspect-[16/10]">
                                <TabletDashboard />
                            </div>
                        </div>
                    </div>

                    {/* Shadow underneath */}
                    <div
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-6 rounded-full blur-xl"
                        style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.12), transparent)' }}
                    />
                </motion.div>

                {/* ─── Bottom text + CTA ─── */}
                <div className="text-center mt-14 sm:mt-16">
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5 }}
                        className="text-gray-500 text-xs sm:text-sm mb-3"
                    >
                        HILS gives you a structured checklist. Complete modules. Track concepts. Enter exams with confidence.
                    </motion.p>

                    <motion.h3
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5, delay: 0.08 }}
                        className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-5"
                    >
                        Stop Guessing.{' '}
                        <span className="bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
                            Start Checking.
                        </span>
                    </motion.h3>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5, delay: 0.16 }}
                    >
                        <Link
                            to="/login"
                            className="group inline-flex items-center gap-2 px-7 py-3 bg-white text-black font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Rocket className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            Login & Start Preparing
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
