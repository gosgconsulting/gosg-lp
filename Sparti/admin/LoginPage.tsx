import React, { useState, useEffect } from 'react'
import { supabase } from './supabase'
import '../styles/sparti.css'

interface LoginPageProps {
  onLoginSuccess: () => void
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isMasterAccount, setIsMasterAccount] = useState(false)

  // Check if user is already authenticated
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        onLoginSuccess()
      }
    }
    checkSession()
  }, [onLoginSuccess])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setIsMasterAccount(false)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        if (error.message?.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please check your credentials.')
        } else {
          setError('Authentication failed. Please try again.')
        }
        console.error('Supabase auth error:', error)
      } else if (data.user) {
        // Check if this is the master account
        if (data.user.email === 'contact@gosgconsulting.com') {
          setIsMasterAccount(true)
          // Store master account flag in session storage for the app to use
          sessionStorage.setItem('sparti_master_account', 'true')
        }
        window.location.href = '/admin'
      }
    } catch (err) {
      setError('Invalid credentials or access not permitted.')
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = email.trim() !== '' && password.trim() !== ''

  return (
    <div className="sparti-app">
      <div className="sparti-login-container">
        <div className="sparti-login-card">
          <div className="sparti-login-header">
            <h1 className="sparti-login-title">Sparti CMS</h1>
            <p className="sparti-login-subtitle">
            Sign in to access the content management system
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="sparti-alert sparti-alert-error">
                {error}
              </div>
            )}
            
            <div className="sparti-form-group">
              <label htmlFor="email" className="sparti-label">Email</label>
              <input
                id="email"
                type="email"
                className="sparti-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                autoComplete="email"
              />
            </div>
            
            <div className="sparti-form-group">
              <label htmlFor="password" className="sparti-label">Password</label>
              <input
                id="password"
                type="password"
                className="sparti-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
                autoComplete="current-password"
              />
            </div>
            
            <button
              type="submit"
              className="sparti-btn sparti-btn-primary"
              style={{ width: '100%' }}
              disabled={loading || !isFormValid}
            >
              {loading ? (
                <>
                  <div className="sparti-loading"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}