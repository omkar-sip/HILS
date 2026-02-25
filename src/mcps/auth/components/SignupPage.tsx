import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { UserPlus, Mail, Lock, User, Sparkles } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

export default function SignupPage() {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, loginWithGoogle, isLoading, error, clearError, isAuthenticated, user } = useAuthStore()
    const navigate = useNavigate()

    // Redirect if already authenticated — using useEffect to avoid crash
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
        await signup(email, password, displayName)
    }

    const handleGoogleSignIn = async () => {
        clearError()
        await loginWithGoogle()
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-hils-bg relative overflow-hidden">
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md px-6"
            >
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="inline-flex items-center gap-2 mb-4"
                    >
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-black" />
                        </div>
                        <h1 className="text-2xl font-bold text-hils-text tracking-tight">HILS</h1>
                    </motion.div>
                    <p className="text-hils-text-muted text-sm">Start your learning journey</p>
                </div>

                <div className="glass-card p-8">
                    <h2 className="text-xl font-semibold text-hils-text mb-6">Create account</h2>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mb-4 p-3 rounded-lg bg-hils-danger/10 border border-hils-danger/20 text-hils-danger text-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Google Sign-In */}
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-3 px-6 py-2.5 bg-white text-gray-800
                       font-medium rounded-lg transition-all duration-200
                       hover:bg-gray-100 hover:shadow-md active:scale-[0.98]
                       disabled:opacity-50 disabled:cursor-not-allowed mb-6"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-hils-border" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-3 bg-hils-card text-hils-text-dim">or register with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-hils-text-muted mb-1.5">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hils-text-dim" />
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="input-field pl-10"
                                    placeholder="Your full name"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-hils-text-muted mb-1.5">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hils-text-dim" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field pl-10"
                                    placeholder="you@university.edu"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-hils-text-muted mb-1.5">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hils-text-dim" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field pl-10"
                                    placeholder="Min 6 characters"
                                    minLength={6}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <UserPlus className="w-4 h-4" />
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <span className="text-hils-text-dim text-sm">Already have an account? </span>
                        <Link to="/login" className="text-white text-sm font-medium hover:underline">
                            Sign in
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
