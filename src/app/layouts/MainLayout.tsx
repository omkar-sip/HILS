import { Outlet } from 'react-router-dom'
import Sidebar from '@/shared/components/Sidebar'

export default function MainLayout() {
    return (
        <div className="flex min-h-screen bg-hils-bg">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    )
}
