import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/mcps/auth/components/LoginPage'
import SignupPage from '@/mcps/auth/components/SignupPage'
import ForgotPasswordPage from '@/mcps/auth/components/ForgotPasswordPage'
import VerifyEmailPage from '@/mcps/auth/components/VerifyEmailPage'
import DashboardPage from '@/pages/DashboardPage'
import TopicPage from '@/pages/TopicPage'
import MainLayout from './layouts/MainLayout'
import ProtectedRoute from '@/shared/components/ProtectedRoute'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />

                {/* Protected Routes */}
                <Route
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/topic/:topicId" element={<TopicPage />} />
                </Route>

                {/* Default redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}
