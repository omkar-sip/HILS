import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, RefreshCw, Send, LogOut, CheckCircle2, Sparkles } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

export default function VerifyEmailPage() {
    const { user, sendVerificationEmail, refreshVerificationStatus, logout } = useAuthStore()
    const navigate = useNavigate()
    const [resendCooldown, setResendCooldown] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    const handleResend = async () => {
        if (resendCooldown) return
        setMessage(null)
        await sendVerificationEmail()
        setMessage('Verification email sent! Check your inbox.')
        setResendCooldown(true)
        setTimeout(() => setResendCooldown(false), 60000) // 60s cooldown
    }

    const handleRefresh = async () => {
        setIsRefreshing(true)
        setMessage(null)
        await refreshVerificationStatus()
        setIsRefreshing(false)

        // Check updated state
        const updated = useAuthStore.getState().user
        if (updated?.emailVerified) {
            setMessage('Email verified! Redirecting...')
            setTimeout(() => navigate('/dashboard'), 1000)
        } else {
            setMessage('Email not yet verified. Please check your inbox.')
        }
    }

    const handleLogout = async () => {
        await logout()
        navigate('/login')
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
                {/* Brand */}
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
                </div>

                {/* Verification Card */}
                <div className="glass-card p-8 text-center">
                    {/* Icon */}
                    <div className="mx-auto w-16 h-16 bg-white/[0.06] rounded-2xl flex items-center justify-center mb-6">
                        <Mail className="w-8 h-8 text-[#CFCFCF]" />
                    </div>

                    <h2 className="text-xl font-semibold text-hils-text mb-2">Verify your email</h2>
                    <p className="text-sm text-hils-text-muted mb-1">
                        We've sent a verification link to
                    </p>
                    <p className="text-sm font-medium text-white mb-6">
                        {user?.email ?? 'your email'}
                    </p>

                    <p className="text-xs text-hils-text-dim mb-6 leading-relaxed">
                        Click the link in the email to verify your account. Once verified, click the button below to continue.
                    </p>

                    {/* Message */}
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mb-4 p-3 rounded-lg text-sm ${message.includes('verified!')
                                ? 'bg-hils-success/10 border border-hils-success/20 text-hils-success'
                                : message.includes('not yet')
                                    ? 'bg-hils-warning/10 border border-hils-warning/20 text-hils-warning'
                                    : 'bg-white/[0.06] border border-white/[0.1] text-[#CFCFCF]'
                                }`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                {message.includes('verified!') && <CheckCircle2 className="w-4 h-4" />}
                                {message}
                            </div>
                        </motion.div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                            className="btn-primary w-full flex items-center justify-center gap-2"
                        >
                            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                            {isRefreshing ? 'Checking...' : 'I\'ve verified my email'}
                        </button>

                        <button
                            onClick={handleResend}
                            disabled={resendCooldown}
                            className="btn-secondary w-full flex items-center justify-center gap-2"
                        >
                            <Send className="w-4 h-4" />
                            {resendCooldown ? 'Email sent (wait 60s)' : 'Resend verification email'}
                        </button>
                    </div>

                    {/* Logout link */}
                    <div className="mt-6 pt-4 border-t border-hils-border">
                        <button
                            onClick={handleLogout}
                            className="text-hils-text-dim text-sm hover:text-hils-danger transition-colors flex items-center justify-center gap-1.5 mx-auto"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            Sign out and use a different account
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
