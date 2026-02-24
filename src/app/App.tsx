import { useEffect } from 'react'
import Router from './Router'
import { useAuthStore } from '@/mcps/auth/store/useAuthStore'

export default function App() {
    const initAuthListener = useAuthStore((state) => state.initAuthListener)

    useEffect(() => {
        const unsubscribe = initAuthListener()
        return () => unsubscribe()
    }, [initAuthListener])

    return <Router />
}
