import { Outlet } from 'react-router-dom'
import Sidebar from '@/shared/components/Sidebar'
import GlobalSearch from '@/shared/components/GlobalSearch'
import SemesterSwitcher from '@/shared/components/SemesterSwitcher'

export default function MainLayout() {
    return (
        <div className="flex min-h-screen bg-hils-bg">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="h-14 border-b border-hils-border bg-hils-surface/60 backdrop-blur-md flex items-center gap-3 px-5 sticky top-0 z-30">
                    <div className="flex-1">
                        <GlobalSearch />
                    </div>
                    <SemesterSwitcher />
                </header>
                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
