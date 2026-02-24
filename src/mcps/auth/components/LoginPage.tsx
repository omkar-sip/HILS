import { useState, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogIn, Mail, Lock, Sparkles, ArrowLeft } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import EyeTrackingCharacters from './EyeTrackingCharacters'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [focusedField, setFocusedField] = useState<string | null>(null)
    const { login, loginWithGoogle, isLoading, error, clearError, isAuthenticated, user } = useAuthStore()
    const navigate = useNavigate()

    // Redirect if already authenticated — using useEffect to avoid crash
    // during synchronous Zustand state updates from onAuthStateChanged
    useEffect(() => {
        if (isAuthenticated && user) {
            if (user.provider === 'email' && !user.emailVerified) {
                navigate('/verify-email', { replace: true })
            } else {
                navigate('/dashboard', { replace: true })
            }
        }
    }, [isAuthenticated, user, navigate])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        clearError()
        await login(email, password)
    }

    const handleGoogleSignIn = async () => {
        clearError()
        await loginWithGoogle()
    }

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY })
    }, [])

    return (
        <div
            className="min-h-screen flex bg-black relative overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* ═══════════════════════════════════════════ */}
            {/* LEFT — Character illustration area         */}
            {/* ═══════════════════════════════════════════ */}
            <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">
                {/* Subtle radial glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[500px] h-[500px] bg-hils-accent/[0.06] rounded-full blur-[120px]" />
                </div>

                {/* HILS branding top-left */}
                <Link
                    to="/"
                    className="absolute top-6 left-6 flex items-center gap-2 group z-10"
                >
                    <div className="w-8 h-8 bg-hils-accent rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-hils-accent/20 transition-all">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-base font-bold tracking-tight text-white">
                        HILS
                    </span>
                </Link>

                {/* Characters */}
                <div className="relative w-full max-w-lg px-8">
                    <EyeTrackingCharacters
                        mousePos={mousePos}
                        focusedField={focusedField}
                    />
                </div>
            </div>

            {/* ═══════════════════════════════════════════ */}
            {/* RIGHT — Login form panel                   */}
            {/* ═══════════════════════════════════════════ */}
            <div className="w-full lg:w-1/2 flex flex-col bg-hils-surface min-h-screen">
                {/* Back to home (visible on mobile too) */}
                <div className="p-6">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1.5 text-sm text-hils-text-dim hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>

                {/* Centered form container */}
                <div className="flex-1 flex items-center justify-center px-6 pb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-sm"
                    >
                        {/* Heading */}
                        <div className="mb-8">
                            {/* Mobile-only branding */}
                            <div className="lg:hidden flex items-center gap-2 mb-6">
                                <div className="w-9 h-9 bg-hils-accent rounded-lg flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-lg font-bold tracking-tight text-white">HILS</span>
                            </div>

                            <h1 className="text-2xl font-bold text-white mb-1.5">
                                Welcome back!
                            </h1>
                            <p className="text-sm text-hils-text-muted">
                                Please enter your details
                            </p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mb-4 p-3 rounded-lg bg-hils-danger/10 border border-hils-danger/20 text-hils-danger text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email field */}
                            <div>
                                <label className="block text-sm font-medium text-hils-text-muted mb-1.5">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hils-text-dim" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        className="input-field pl-10"
                                        placeholder="you@university.edu"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password field */}
                            <div>
                                <label className="block text-sm font-medium text-hils-text-muted mb-1.5">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hils-text-dim" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onFocus={() => setFocusedField('password')}
                                        onBlur={() => setFocusedField(null)}
                                        className="input-field pl-10"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Remember + Forgot */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-hils-border bg-hils-surface accent-hils-accent"
                                    />
                                    <span className="text-hils-text-muted">Remember for 30 days</span>
                                </label>
                                <Link
                                    to="/forgot-password"
                                    className="text-hils-accent-light hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Sign In button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg transition-all duration-200 hover:bg-gray-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <LogIn className="w-4 h-4" />
                                        Log In
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Google sign-in */}
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            className="mt-3 w-full flex items-center justify-center gap-3 px-6 py-3 bg-transparent border border-hils-border text-white font-medium rounded-lg transition-all duration-200 hover:bg-hils-card hover:border-white/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Log in with Google
                        </button>

                        {/* Sign up link */}
                        <div className="mt-6 text-center">
                            <span className="text-hils-text-dim text-sm">Don't have an account? </span>
                            <Link
                                to="/signup"
                                className="text-white text-sm font-semibold hover:underline"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
