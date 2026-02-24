import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/mcps/auth/store/useAuthStore'
import { Loader2 } from 'lucide-react'

interface Props {
    children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
    const { user, isAuthenticated, isLoading } = useAuthStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoading) return // Still loading, wait

        if (!isAuthenticated || !user) {
            navigate('/login', { replace: true })
            return
        }

        // Email/password user who hasn't verified → verification screen
        if (user.provider === 'email' && !user.emailVerified) {
            navigate('/verify-email', { replace: true })
        }
    }, [isAuthenticated, user, isLoading, navigate])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-hils-bg">
                <Loader2 className="w-8 h-8 text-hils-accent animate-spin" />
            </div>
        )
    }

    // Not authenticated or not verified — show nothing while useEffect navigates away
    if (!isAuthenticated || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-hils-bg">
                <Loader2 className="w-8 h-8 text-hils-accent animate-spin" />
            </div>
        )
    }

    if (user.provider === 'email' && !user.emailVerified) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-hils-bg">
                <Loader2 className="w-8 h-8 text-hils-accent animate-spin" />
            </div>
        )
    }

    return <>{children}</>
}
