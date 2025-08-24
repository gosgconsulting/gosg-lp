import React, { useEffect, useState } from 'react'
import { LoginPage } from '../../Sparti/admin/LoginPage'
import { supabase } from '../../Sparti/admin/supabase'

const Auth = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        window.location.href = '/admin'
        return
      }
      setLoading(false)
    }
    
    checkSession()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <LoginPage onLoginSuccess={() => {}} />
}

export default Auth