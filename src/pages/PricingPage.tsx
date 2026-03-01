import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
    Sparkles, CheckCircle2, Zap, Brain, MessageSquare,
    ChevronLeft, ShieldCheck, Crown, X
} from 'lucide-react'
import { useAuthStore } from '@/mcps/auth/store/useAuthStore'
import ParticleBackground from '@/shared/components/ParticleBackground'

import goatBgImage from '@/assets/images/goat-pricing-bg.png'

// ─── Fade-in wrapper ───
function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-40px' })
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

export default function PricingPage() {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuthStore()
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'semester'>('monthly')

    const goatPriceText = billingCycle === 'monthly' ? '₹199' : '₹899'
    const goatPeriodText = billingCycle === 'monthly' ? '/ month' : '/ 6 months'
    const goatBillingNote = billingCycle === 'monthly'
        ? "Billed monthly. Cancel anytime."
        : "Billed once per semester. Save ₹295!"

    return (
        <div className="min-h-screen bg-hils-bg text-hils-text overflow-x-hidden relative flex flex-col">

            {/* ═══════════════════════════════════════════ */}
            {/* 1 NAVBAR (Minimal for checkout focus)       */}
            {/* ═══════════════════════════════════════════ */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-hils-bg/60 backdrop-blur-xl border-b border-hils-border/50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-hils-text-muted hover:text-white transition-colors group"
                    >
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Back to Home</span>
                    </button>

                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-black" />
                        </div>
                        <span className="text-lg font-bold tracking-tight">HILS</span>
                    </div>

                    <div className="w-24 flex justify-end">
                        {/* Empty right div to perfectly center the logo */}
                        {!isAuthenticated && (
                            <Link to="/login" className="text-sm text-hils-text-muted hover:text-white font-medium">
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            <ParticleBackground />

            {/* ═══════════════════════════════════════════ */}
            {/* 2 HERO & HEADER                             */}
            {/* ═══════════════════════════════════════════ */}
            <main className="flex-grow pt-32 pb-24 relative z-10 w-full max-w-7xl mx-auto px-6">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] mb-6">
                            <Crown className="w-3.5 h-3.5 text-yellow-400" />
                            <span className="text-xs font-medium text-yellow-400 uppercase tracking-widest">Upgrade Your Brain</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
                            Why study like a sheep when you can{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                                score like the GOAT?
                            </span>
                        </h1>
                        <p className="text-lg text-hils-text-muted leading-relaxed mx-auto">
                            Stop cramming. Start understanding. Choose the plan that gives you the AI edge.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.1} className="mt-10 flex flex-col items-center">
                        {/* Billing Toggle */}
                        <div className="bg-hils-surface/50 border border-hils-border/50 p-1.5 rounded-full inline-flex relative backdrop-blur-sm">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${billingCycle === 'monthly' ? 'text-white' : 'text-hils-text-muted hover:text-white'
                                    }`}
                            >
                                Pay Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle('semester')}
                                className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${billingCycle === 'semester' ? 'text-white' : 'text-hils-text-muted hover:text-white'
                                    }`}
                            >
                                Semester Pass
                                <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest font-bold ${billingCycle === 'semester' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-white/50'
                                    }`}>Save 20%</span>
                            </button>

                            {/* Animated Background Pill */}
                            <div
                                className={`absolute top-1.5 bottom-1.5 w-[140px] bg-hils-border/60 rounded-full transition-transform duration-300 ease-out z-0 blur-[2px]`}
                                style={{ transform: billingCycle === 'semester' ? 'translateX(100%)' : 'translateX(0)' }}
                            />
                            <div
                                className={`absolute top-1.5 bottom-1.5 w-[130px] bg-white/10 border border-white/20 rounded-full transition-transform duration-300 ease-out z-0`}
                                style={{ transform: billingCycle === 'semester' ? 'translateX(120px)' : 'translateX(0)', width: billingCycle === 'semester' ? '170px' : '130px' }}
                            />
                        </div>
                    </FadeIn>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* 3 PRICING CARDS                           */}
                {/* ═══════════════════════════════════════════ */}
                <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

                    {/* FREE TIER CARD */}
                    <FadeIn delay={0.2}>
                        <div className="glass-card h-full p-8 relative overflow-hidden flex flex-col group border-white/[0.05]">
                            {/* Accent line top */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-hils-border/40 to-white/10" />

                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-2">Free Starter</h2>
                                <p className="text-hils-text-muted text-sm">Perfect for seeing how HILS works.</p>
                            </div>

                            <div className="mb-8 flex items-baseline gap-1">
                                <span className="text-5xl font-black">₹0</span>
                                <span className="text-hils-text-muted font-medium">/ forever</span>
                            </div>

                            <div className="space-y-4 mb-10 flex-grow">
                                {[
                                    { text: '10 Free AI Yaps (Queries) / Day', included: true },
                                    { text: 'Access to standard subject notes', included: true },
                                    { text: 'All 5 Academic Personas Unlocked', included: true },
                                    { text: 'Basic Progress Tracking', included: true },
                                    { text: 'Voice Teacher Mode', included: false },
                                    { text: 'Create Custom Personas', included: false },
                                    { text: 'Model Exam Answer Generation', included: false },
                                ].map((feature, i) => (
                                    <div key={i} className={`flex items-start gap-3 ${!feature.included ? 'opacity-40' : ''}`}>
                                        {feature.included ? (
                                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                        ) : (
                                            <X className="w-5 h-5 text-hils-text-dim shrink-0 mt-0.5" />
                                        )}
                                        <span className="text-sm font-medium">{feature.text}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                to={isAuthenticated ? '/dashboard' : '/signup'}
                                className="w-full py-4 rounded-xl border border-hils-border/60 hover:bg-white/[0.05] transition-colors font-semibold flex items-center justify-center gap-2"
                            >
                                {isAuthenticated ? 'Go to Dashboard' : 'Get Started for Free'}
                            </Link>
                        </div>
                    </FadeIn>

                    {/* THE GOAT TIER CARD */}
                    <FadeIn delay={0.3}>
                        <div className="glass-card h-full relative overflow-hidden flex flex-col border border-emerald-500/30 shadow-2xl shadow-emerald-500/10 group">

                            {/* Graphic Background injected behind the content */}
                            <div className="absolute inset-0 z-0">
                                <div className="absolute inset-0 bg-gradient-to-t from-hils-bg via-hils-bg/95 to-hils-bg/20 z-10" />
                                <img
                                    src={goatBgImage}
                                    alt="Lions and Goats jumping toward the GOAT sign"
                                    className="w-full h-full object-cover object-top opacity-50 transition-opacity duration-700 group-hover:opacity-75"
                                />
                            </div>

                            {/* Glow effects */}
                            <div className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none z-10" />
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-500 z-10" />

                            <div className="p-8 relative z-20 flex flex-col h-full">
                                <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                                    <span className="text-xs font-bold text-emerald-400 tracking-wider">RECOMMENDED</span>
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h2 className="text-2xl font-bold">The GOAT Plan</h2>
                                        <Sparkles className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <p className="text-emerald-100/70 text-sm">Everything you need to guarantee your grades don't tank.</p>
                                </div>

                                <div className="mb-2 flex items-baseline gap-1">
                                    <span className="text-5xl font-black text-white">{goatPriceText}</span>
                                    <span className="text-emerald-100/60 font-medium">{goatPeriodText}</span>
                                </div>
                                <p className="text-xs text-emerald-400/80 mb-8 font-medium h-4">{goatBillingNote}</p>

                                <div className="space-y-4 mb-10 flex-grow">
                                    {[
                                        { text: 'Unlimited Yapping (AI Queries)', icon: MessageSquare },
                                        { text: 'Create Your Own Custom Persona', icon: Zap },
                                        { text: 'AI Voice Teacher Enabled', icon: Brain },
                                        { text: 'Auto-generated Deep Dives', icon: Sparkles },
                                        { text: 'Exam Answers & Rapid Revision', icon: CheckCircle2 },
                                        { text: 'Smart Semester Tracking', icon: CheckCircle2 },
                                    ].map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <feature.icon className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                            <span className="text-sm font-semibold text-white">{feature.text}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    to={isAuthenticated ? '/checkout/goat' : '/signup?plan=goat'}
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-extrabold shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                                >
                                    <Crown className="w-5 h-5" />
                                    Become the GOAT
                                </Link>
                                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-emerald-100/40 uppercase font-bold tracking-widest">
                                    <ShieldCheck className="w-3.5 h-3.5" /> secure checkout via stripe
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </main>
        </div>
    )
}
