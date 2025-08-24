import React, { useState, useEffect } from 'react'
import { supabase } from '../admin/supabase'
import '../styles/sparti.css'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface TopBarProps {
  activeItem: string
}

const getPageTitle = (activeItem: string): string => {
  const titles: Record<string, string> = {
    dashboard: 'Dashboard',
    home: 'Home Page',
    posts: 'Posts',
    navbar: 'Main Nav',
    footer: 'Footer',
    branding: 'Branding',
    seo: 'SEO'
  }
  return titles[activeItem] || 'Dashboard'
}

export const TopBar: React.FC<TopBarProps> = ({ activeItem }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isMasterAccount, setIsMasterAccount] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      // Check if this is the master account
      if (user?.email === 'contact@gosgconsulting.com') {
        setIsMasterAccount(true)
        sessionStorage.setItem('sparti_master_account', 'true')
      } else {
        setIsMasterAccount(false)
        sessionStorage.removeItem('sparti_master_account')
      }
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    // Clear master account flag on logout
    sessionStorage.removeItem('sparti_master_account')
    await supabase.auth.signOut()
    // The auth state change will be handled by the parent component
  }

  const getUserInitials = (email: string) => {
    return email.split('@')[0].slice(0, 2).toUpperCase()
  }

  const isDev = import.meta.env.DEV
  const showSearch = activeItem === 'posts'
  const showAddButton = activeItem === 'posts'

  return (
    <header className="sparti-topbar">
      <div className="sparti-topbar-left">
        <div className="sparti-topbar-brand">
          <h1 className="sparti-topbar-title">Sparti</h1>
          {isDev && (
            <span className="sparti-topbar-badge">Dev</span>
          )}
          {isMasterAccount && (
            <span className="sparti-topbar-badge" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
              Master
            </span>
          )}
        </div>
      </div>
      
      <div className="sparti-topbar-center">
        <h2 className="sparti-page-title">{getPageTitle(activeItem)}</h2>
      </div>
      
      <div className="sparti-topbar-actions">
        {showSearch && (
          <input
            type="text"
            placeholder="Search..."
            className="sparti-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        )}
        
        {showAddButton && (
          <button 
            className="sparti-btn sparti-btn-primary"
            onClick={() => {
              // This will be handled by the parent component
              const event = new CustomEvent('sparti-add-post')
              window.dispatchEvent(event)
            }}
          >
            Add
          </button>
        )}
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