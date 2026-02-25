import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    LayoutDashboard, LogOut, Sparkles,
    ChevronLeft, User
} from 'lucide-react'
import { useAuthStore } from '@/mcps/auth/store/useAuthStore'
import { usePersonaStore } from '@/mcps/persona/store/usePersonaStore'
import { useState } from 'react'

export default function Sidebar() {
    const { user, logout } = useAuthStore()
    const { activePersona } = usePersonaStore()
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false)

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    const navItems = [
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ]

    return (
        <motion.aside
            initial={false}
            animate={{ width: collapsed ? 64 : 240 }}
            transition={{ duration: 0.2 }}
            className="h-screen bg-hils-surface border-r border-hils-border flex flex-col sticky top-0"
        >
            {/* Brand */}
            <div className="p-4 flex items-center justify-between border-b border-hils-border">
                {!collapsed && (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-black" />
                        </div>
                        <span className="text-sm font-bold text-hils-text tracking-tight">HILS</span>
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1.5 rounded-lg hover:bg-hils-card transition-colors"
                >
                    <ChevronLeft className={`w-4 h-4 text-hils-text-dim transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 p-3 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
              ${isActive
                                ? 'bg-white/[0.08] text-white border border-white/[0.12]'
                                : 'text-hils-text-muted hover:text-hils-text hover:bg-hils-card border border-transparent'
                            }`
                        }
                    >
                        <item.icon className="w-4.5 h-4.5 flex-shrink-0" />
                        {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* Active Persona */}
            {!collapsed && (
                <div className="px-3 mb-2">
                    <div className="glass-card p-3">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">{activePersona.emoji}</span>
                            <div className="min-w-0">
                                <p className="text-xs font-medium text-hils-text truncate">{activePersona.name}</p>
                                <p className="text-xs text-hils-text-dim truncate">{activePersona.style}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* User / Logout */}
            <div className="p-3 border-t border-hils-border">
                <div className="flex items-center gap-3 px-2 py-2">
                    <div className="w-8 h-8 rounded-full bg-hils-card border border-hils-border flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-hils-text-dim" />
                    </div>
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-hils-text truncate">
                                {user?.displayName ?? 'Student'}
                            </p>
                            <p className="text-xs text-hils-text-dim truncate">{user?.email}</p>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className="p-1.5 rounded-lg hover:bg-hils-card text-hils-text-dim hover:text-hils-danger transition-colors"
                        title="Sign Out"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.aside>
    )
}
