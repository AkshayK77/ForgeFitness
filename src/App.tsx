import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './components/Toast'
import ProtectedRoute from './components/ProtectedRoute'
import AppShell from './components/AppShell'
import Homepage from './pages/Homepage'
import LoginPage from './pages/LoginPage'
import OnboardingPage from './pages/OnboardingPage'
import DashboardPage from './pages/DashboardPage'
import WorkoutPage from './pages/WorkoutPage'
import AnatomyPage from './pages/AnatomyPage'
import ProgressPage from './pages/ProgressPage'
import NutritionPage from './pages/NutritionPage'
import AIPage from './pages/AIPage'
import SettingsPage from './pages/SettingsPage'

function AppLayout() {
  return (
    <ProtectedRoute>
      <AppShell>
        <Outlet />
      </AppShell>
    </ProtectedRoute>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/onboarding" element={
              <ProtectedRoute><OnboardingPage /></ProtectedRoute>
            } />
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/workout" element={<WorkoutPage />} />
              <Route path="/anatomy" element={<AnatomyPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/nutrition" element={<NutritionPage />} />
              <Route path="/ai" element={<AIPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  )
}
