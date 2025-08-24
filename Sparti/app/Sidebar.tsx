import React from 'react'
import '../styles/sparti.css'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  activeItem: string
  onItemClick: (item: string) => void
}

const navigationGroups = [
  {
    title: 'Content',
    items: [
      { id: 'home', label: 'Home' },
      { id: 'posts', label: 'Posts' },
    ]
  },
  {
    title: 'Components',
    items: [
      { id: 'navbar', label: 'Navbar' },
      { id: 'footer', label: 'Footer' },
    ]
  },
  {
    title: 'Site Settings',
    items: [
      { id: 'branding', label: 'Branding' },
      { id: 'seo', label: 'SEO' },
    ]
  }
]

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  activeItem, 
  onItemClick 
}) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="sparti-overlay" onClick={onClose} />}
      
      {/* Sidebar */}
      <aside className={`sparti-sidebar ${isOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Mobile close button */}
          <div className="sparti-sidebar-header lg:hidden">
            <h2 className="sparti-sidebar-title">Navigation</h2>
            <button className="sparti-btn sparti-btn-ghost sparti-btn-icon" onClick={onClose}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18"/>
                <path d="M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="sparti-sidebar-nav">
            {/* Dashboard */}
            <div>
              <button
                className={`sparti-nav-item ${activeItem === 'dashboard' ? 'active' : ''}`}
                onClick={() => {
                  onItemClick('dashboard')
                  onClose()
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
                Dashboard
              </button>
            </div>
            
            {/* Navigation Groups */}
            {navigationGroups.map((group) => (
              <div key={group.title} className="sparti-nav-group">
                <h3 className="sparti-nav-group-title">
                  {group.title}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {group.items.map((item) => {
                    return (
                      <button
                        key={item.id}
                        className={`sparti-nav-item ${activeItem === item.id ? 'active' : ''}`}
                        onClick={() => {
                          onItemClick(item.id)
                          onClose()
                        }}
                      >
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}