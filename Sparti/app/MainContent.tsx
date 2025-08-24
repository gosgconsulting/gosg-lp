import React from 'react'
import '../styles/sparti.css'

interface MainContentProps {
  activeItem: string
}

const contentMap: Record<string, { title: string; description: string; icon: React.ComponentType<any> }> = {
  dashboard: {
    title: 'Dashboard',
    description: 'Welcome to Sparti CMS',
    icon: () => null
  },
  home: {
    title: 'Home Page',
    description: 'Manage your homepage content',
    icon: () => null
  },
  posts: {
    title: 'Posts',
    description: 'Create and manage blog posts',
    icon: () => null
  },
  navbar: {
    title: 'Navigation Bar',
    description: 'Configure site navigation',
    icon: () => null
  },
  footer: {
    title: 'Footer',
    description: 'Manage footer content and links',
    icon: () => null
  },
  branding: {
    title: 'Branding',
    description: 'Site branding and visual identity',
    icon: () => null
  },
  seo: {
    title: 'SEO Settings',
    description: 'Search engine optimization settings',
    icon: () => null
  }
}

export const MainContent: React.FC<MainContentProps> = ({ activeItem }) => {
  const content = contentMap[activeItem] || contentMap.dashboard
  const Icon = content.icon

  if (activeItem === 'dashboard') {
    return (
      <main className="sparti-main-content">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="sparti-dashboard-header">
            <h1 className="sparti-dashboard-title">
              Welcome to Sparti CMS
            </h1>
            <p className="sparti-dashboard-subtitle">
              Manage your website content with ease
            </p>
          </div>

          {/* Quick Stats */}
          <div className="sparti-stats-grid">
            <div className="sparti-stat-card">
              <div className="sparti-stat-header">
                <h3 className="sparti-stat-title">Total Pages</h3>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <div className="sparti-stat-value">1</div>
              <p className="sparti-stat-description">Home page configured</p>
            </div>
            
            <div className="sparti-stat-card">
              <div className="sparti-stat-header">
                <h3 className="sparti-stat-title">Blog Posts</h3>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" x2="8" y1="13" y2="13"/>
                  <line x1="16" x2="8" y1="17" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
              </div>
              <div className="sparti-stat-value">0</div>
              <p className="sparti-stat-description">Ready to create</p>
            </div>
            
            <div className="sparti-stat-card">
              <div className="sparti-stat-header">
                <h3 className="sparti-stat-title">Components</h3>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="7" height="9" x="3" y="3" rx="1"/>
                  <rect width="7" height="5" x="14" y="3" rx="1"/>
                  <rect width="7" height="9" x="14" y="12" rx="1"/>
                  <rect width="7" height="5" x="3" y="16" rx="1"/>
                </svg>
              </div>
              <div className="sparti-stat-value">2</div>
              <p className="sparti-stat-description">Navbar & Footer</p>
            </div>
            
            <div className="sparti-stat-card">
              <div className="sparti-stat-header">
                <h3 className="sparti-stat-title">Settings</h3>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <div className="sparti-stat-value">2</div>
              <p className="sparti-stat-description">Branding & SEO</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
            <div className="sparti-card">
              <div className="sparti-card-header">
                <h3 className="sparti-card-title">Quick Actions</h3>
                <p className="sparti-card-description">
                  Common tasks to get you started
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button className="sparti-btn sparti-btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14"/>
                    <path d="M12 5v14"/>
                  </svg>
                  Create New Post
                </button>
                <button className="sparti-btn sparti-btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9"/>
                    <path d="M12 8v8"/>
                    <path d="M8 12h8"/>
                  </svg>
                  Update Branding
                </button>
                <button className="sparti-btn sparti-btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                  Configure SEO
                </button>
              </div>
            </div>

            <div className="sparti-card">
              <div className="sparti-card-header">
                <h3 className="sparti-card-title">Getting Started</h3>
                <p className="sparti-card-description">
                  Tips to make the most of Sparti CMS
                </p>
              </div>
              <div style={{ fontSize: '14px', color: '#666666' }}>
                <p style={{ marginBottom: '8px' }}>
                    <strong>1. Configure your branding</strong> - Set up your site name, colors, and logo
                  </p>
                  <p style={{ marginBottom: '8px' }}>
                    <strong>2. Update navigation</strong> - Customize your site's navigation menu
                  </p>
                  <p>
                    <strong>3. Create content</strong> - Start adding pages and blog posts
                  </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="sparti-main-content">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="sparti-dashboard-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <h1 className="sparti-dashboard-title">{content.title}</h1>
          </div>
          <p className="sparti-dashboard-subtitle">{content.description}</p>
        </div>

        <div className="sparti-card">
          <div className="sparti-card-header">
            <h3 className="sparti-card-title">Coming Soon</h3>
            <p className="sparti-card-description">
              Content editing for {content.title.toLowerCase()} will be available soon.
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ width: '64px', height: '64px', margin: '0 auto 16px', color: '#cccccc' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect width="7" height="9" x="3" y="3" rx="1"/>
                <rect width="7" height="5" x="14" y="3" rx="1"/>
                <rect width="7" height="9" x="14" y="12" rx="1"/>
                <rect width="7" height="5" x="3" y="16" rx="1"/>
              </svg>
            </div>
            <p style={{ color: '#666666', marginBottom: '16px' }}>
                The {content.title.toLowerCase()} editor is currently under development.
              </p>
            <button className="sparti-btn sparti-btn-secondary" disabled>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14"/>
                <path d="M12 5v14"/>
              </svg>
                Create {content.title}
            </button>
            </div>
        </div>
      </div>
    </main>
  )
}