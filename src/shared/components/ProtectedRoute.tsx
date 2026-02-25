import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/mcps/auth/store/useAuthStore'
import { useAcademicProfileStore } from '@/mcps/academic-profile/store/useAcademicProfileStore'
import { useUserProfileStore } from '@/mcps/user-profile/store/useUserProfileStore'
import { Loader2 } from 'lucide-react'

interface Props {
    children: React.ReactNode
    skipProfileCheck?: boolean
}

export default function ProtectedRoute({ children, skipProfileCheck = false }: Props) {
    const { user, isAuthenticated, isLoading: authLoading } = useAuthStore()
    const { fetchProfile } = useAcademicProfileStore()
    const { fetchUserProfile } = useUserProfileStore()
    const navigate = useNavigate()
    const fetchedRef = useRef<string | null>(null)

    // Fetch both profiles once per uid (fire-and-forget, no blocking)
    useEffect(() => {
        if (!authLoading && user && fetchedRef.current !== user.uid) {
            fetchedRef.current = user.uid
            if (!skipProfileCheck) {
                fetchProfile(user.uid)
                fetchUserProfile(user.uid)
            }
        }
    }, [authLoading, user, skipProfileCheck, fetchProfile, fetchUserProfile])

    useEffect(() => {
        if (authLoading) return
        if (!isAuthenticated || !user) {
            navigate('/login', { replace: true })
            return
        }
        if (user.provider === 'email' && !user.emailVerified) {
            navigate('/verify-email', { replace: true })
        }
    }, [isAuthenticated, user, authLoading, navigate])

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-hils-bg">
                <Loader2 className="w-8 h-8 text-hils-accent animate-spin" />
            </div>
        )
    }

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
