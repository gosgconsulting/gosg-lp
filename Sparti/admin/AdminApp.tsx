import React, { useState, useEffect } from 'react'
import { supabase } from './supabase'
import { Layout } from '../app/Layout'
import '../styles/sparti.css'

export const AdminApp: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session?.user)
      
      // If not authenticated, redirect to /auth
      if (!session?.user) {
        window.location.href = '/auth'
        return
      }
      
      setLoading(false)
    }

    checkSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session?.user)
        
        // If logged out, redirect to /auth
        if (!session?.user) {
          window.location.href = '/auth'
          return
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])


  if (loading) {
    return (
      <div className="sparti-app" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9' }}>
        <div className="sparti-loading" style={{ width: '32px', height: '32px' }}></div>
      </div>
    )
  }


  return <Layout />
}