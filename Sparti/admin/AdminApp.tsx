import React, { useState, useEffect } from 'react'
import { supabase } from './supabase'
import { AuthGuard } from './AuthGuard'
import { LoginPage } from './LoginPage'
import { Layout } from '../app/Layout'

export const AdminApp: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session?.user)
      setLoading(false)
    }

    checkSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session?.user)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />
  }

  return <Layout />
}