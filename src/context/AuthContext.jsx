import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerInitMessage, setDrawerInitMessage] = useState('')

  const [workoutUpdate, setWorkoutUpdate] = useState(null)
  const [activeSessionExercises, setActiveSessionExercises] = useState([])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const openDrawerWithMessage = useCallback((msg) => {
    setDrawerInitMessage(msg)
    setDrawerOpen(true)
  }, [])

  return (
    <AuthContext.Provider value={{
      user, session, loading,
      drawerOpen, setDrawerOpen,
      drawerInitMessage, setDrawerInitMessage,
      openDrawerWithMessage,
      workoutUpdate, setWorkoutUpdate,
      activeSessionExercises, setActiveSessionExercises,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
