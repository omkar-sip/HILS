import { Outlet } from 'react-router-dom'
import Sidebar from '@/shared/components/Sidebar'
import GlobalSearch from '@/shared/components/GlobalSearch'
import SemesterSwitcher from '@/shared/components/SemesterSwitcher'
import { useState } from 'react'
import { Menu } from 'lucide-react'

export default function MainLayout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-hils-bg">
            <Sidebar mobileOpen={isMobileMenuOpen} setMobileOpen={setIsMobileMenuOpen} />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen">
                {/* Top Header */}
                <header className="h-14 border-b border-hils-border bg-hils-surface/60 backdrop-blur-md flex items-center gap-2 sm:gap-3 px-3 sm:px-5 sticky top-0 z-30 shrink-0">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="md:hidden p-1.5 -ml-1 text-hils-text-muted hover:text-hils-text rounded-md hover:bg-white/[0.04]"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="flex-1 min-w-0">
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
