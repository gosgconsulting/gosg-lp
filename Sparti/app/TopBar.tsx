import React, { useState, useEffect } from 'react'
import { supabase } from '../admin/supabase'
import '../styles/sparti.css'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface TopBarProps {
  onMenuClick: () => void
  sidebarOpen: boolean
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick, sidebarOpen }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    // The auth state change will be handled by the parent component
  }

  const getUserInitials = (email: string) => {
    return email.split('@')[0].slice(0, 2).toUpperCase()
  }

  const isDev = import.meta.env.DEV

  return (
    <header className="sparti-topbar">
      <div className="sparti-topbar-left">
        <button
          className="sparti-btn sparti-btn-ghost sparti-btn-icon lg:hidden"
          onClick={onMenuClick}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" x2="20" y1="6" y2="6"/>
            <line x1="4" x2="20" y1="12" y2="12"/>
            <line x1="4" x2="20" y1="18" y2="18"/>
          </svg>
        </button>
        
        <div className="sparti-topbar-brand">
          <h1 className="sparti-topbar-title">Sparti</h1>
          {isDev && (
            <span className="sparti-topbar-badge">Dev</span>
          )}
        </div>
      </div>

      <div className="sparti-user-menu">
        <button
          className="sparti-user-button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className="sparti-avatar">
            {user?.email ? getUserInitials(user.email) : 'U'}
          </div>
          <div className="sparti-user-info">
            <div className="sparti-user-name">
              {user?.email?.split('@')[0] || 'User'}
            </div>
            <div className="sparti-user-email">
              {user?.email || ''}
            </div>
          </div>
        </button>
        
        {dropdownOpen && (
          <>
            <div 
              className="sparti-overlay"
              onClick={() => setDropdownOpen(false)}
            />
            <div className="sparti-dropdown">
              <div style={{ padding: '8px 12px' }}>
                <div className="sparti-user-name">{user?.email?.split('@')[0] || 'User'}</div>
                <div className="sparti-user-email">{user?.email || ''}</div>
              </div>
              <div className="sparti-dropdown-separator" />
              <button 
                className="sparti-dropdown-item danger"
                onClick={handleLogout}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16,17 21,12 16,7"/>
                  <line x1="21" x2="9" y1="12" y2="12"/>
                </svg>
                Log out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}