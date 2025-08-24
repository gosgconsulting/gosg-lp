import React from 'react'
import '../styles/sparti.css'

interface MainContentProps {
  activeItem: string
}

// Mock data for demonstration
const mockPosts = [
  { id: 1, name: 'what-is-astro' },
  { id: 2, name: 'what-is-keystatic-cms' }
]

const mockPages = [
  { id: 1, name: 'Home Page' }
]

const renderPostsList = () => {
  return (
    <div className="sparti-content-list">
      <div className="sparti-content-list-header">
        <h3 className="sparti-content-list-title">Name ↑</h3>
      </div>
      {mockPosts.map((post) => (
        <div key={post.id} className="sparti-content-item">
          <h4 className="sparti-content-item-name">{post.name}</h4>
          <div className="sparti-content-item-actions">
            <button className="sparti-btn sparti-btn-secondary">
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

const renderPagesList = () => {
  return (
    <div className="sparti-content-list">
      <div className="sparti-content-list-header">
        <h3 className="sparti-content-list-title">Pages</h3>
      </div>
      {mockPages.map((page) => (
        <div key={page.id} className="sparti-content-item">
          <h4 className="sparti-content-item-name">{page.name}</h4>
          <div className="sparti-content-item-actions">
            <button className="sparti-btn sparti-btn-secondary">
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

const renderNavbarForm = () => {
  return (
    <div className="sparti-form-container">
      <div className="sparti-form-section">
        <h3 className="sparti-form-section-title">Nav Items</h3>
        <div className="sparti-form-group">
          <button className="sparti-btn sparti-btn-secondary">Add</button>
        </div>
        
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="sparti-content-item" style={{ border: '1px solid #e5e5e5', borderRadius: '6px', padding: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="7" height="9" x="3" y="3" rx="1"/>
                <rect width="7" height="5" x="14" y="3" rx="1"/>
                <rect width="7" height="9" x="14" y="12" rx="1"/>
                <rect width="7" height="5" x="3" y="16" rx="1"/>
              </svg>
              <span>Home</span>
            </div>
            <button className="sparti-btn sparti-btn-ghost sparti-btn-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18"/>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              </svg>
            </button>
          </div>
          
          <div className="sparti-content-item" style={{ border: '1px solid #e5e5e5', borderRadius: '6px', padding: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="7" height="9" x="3" y="3" rx="1"/>
                <rect width="7" height="5" x="14" y="3" rx="1"/>
                <rect width="7" height="9" x="14" y="12" rx="1"/>
                <rect width="7" height="5" x="3" y="16" rx="1"/>
              </svg>
              <span>Posts</span>
            </div>
            <button className="sparti-btn sparti-btn-ghost sparti-btn-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18"/>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              </svg>
            </button>
          </div>
          
          <div className="sparti-content-item" style={{ border: '1px solid #e5e5e5', borderRadius: '6px', padding: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="7" height="9" x="3" y="3" rx="1"/>
                <rect width="7" height="5" x="14" y="3" rx="1"/>
                <rect width="7" height="9" x="14" y="12" rx="1"/>
                <rect width="7" height="5" x="3" y="16" rx="1"/>
              </svg>
              <span>Dropdown Menu</span>
            </div>
            <button className="sparti-btn sparti-btn-ghost sparti-btn-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18"/>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="sparti-form-section">
        <h3 className="sparti-form-section-title">Buttons</h3>
        <div className="sparti-form-group">
          <button className="sparti-btn sparti-btn-secondary">Add</button>
        </div>
        
        <div style={{ marginTop: '16px' }}>
          <div className="sparti-content-item" style={{ border: '1px solid #e5e5e5', borderRadius: '6px', padding: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="7" height="9" x="3" y="3" rx="1"/>
                <rect width="7" height="5" x="14" y="3" rx="1"/>
                <rect width="7" height="9" x="14" y="12" rx="1"/>
                <rect width="7" height="5" x="3" y="16" rx="1"/>
              </svg>
              <span>Admin</span>
            </div>
            <button className="sparti-btn sparti-btn-ghost sparti-btn-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18"/>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
        <button className="sparti-btn sparti-btn-primary">Save</button>
      </div>
    </div>
  )
}

const renderBrandingForm = () => {
  return (
    <div className="sparti-form-container">
      <div className="sparti-form-section">
        <div className="sparti-form-group">
          <label className="sparti-label">Site Name</label>
          <input
            type="text"
            className="sparti-input"
            defaultValue="Astrokeys"
          />
        </div>
        
        <div className="sparti-form-group">
          <label className="sparti-label">Select a theme</label>
          <p style={{ fontSize: '14px', color: '#666666', margin: '4px 0 8px 0' }}>
            Themes available from DaisyUI
          </p>
          <select className="sparti-select" defaultValue="light">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="cupcake">Cupcake</option>
            <option value="bumblebee">Bumblebee</option>
          </select>
        </div>
        
        <div className="sparti-form-group">
          <label className="sparti-label">Favicon</label>
          <p style={{ fontSize: '14px', color: '#666666', margin: '4px 0 8px 0' }}>
            Favicon for the site
          </p>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <label className="sparti-file-button">
              <input type="file" className="sparti-file-input" accept="image/*" />
              Choose file
            </label>
            <button className="sparti-btn sparti-btn-ghost">Remove</button>
          </div>
          <div className="sparti-image-preview">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDIwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMDAgNTBMMTIwIDMwSDgwTDEwMCA1MFoiIGZpbGw9IiNEREREREQiLz4KPC9zdmc+" alt="Favicon preview" />
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
        <button className="sparti-btn sparti-btn-primary">Save</button>
      </div>
    </div>
  )
}

const renderSEOForm = () => {
  return (
    <div className="sparti-form-container">
      <div className="sparti-form-section">
        <div className="sparti-form-group">
          <label className="sparti-label">Title</label>
          <input
            type="text"
            className="sparti-input"
            defaultValue="Astrokeys"
          />
        </div>
        
        <div className="sparti-form-group">
          <label className="sparti-label">Description</label>
          <textarea
            className="sparti-textarea"
            defaultValue="Astro + Keystatic CMS Starter Template"
            rows={3}
          />
        </div>
        
        <div className="sparti-form-group">
          <label className="sparti-label">Keywords</label>
          <input
            type="text"
            className="sparti-input"
            defaultValue="astro, tailwindcss, keystatic"
          />
        </div>
        
        <div className="sparti-form-group">
          <label className="sparti-label">Canonical</label>
          <input
            type="text"
            className="sparti-input"
          />
        </div>
      </div>
      
      <div className="sparti-form-section">
        <h3 className="sparti-form-section-title">Opengraph (Facebook)</h3>
        <p style={{ fontSize: '14px', color: '#666666', margin: '0 0 16px 0' }}>
          Opengraph options
        </p>
        
        <div className="sparti-form-group">
          <label className="sparti-label">OG Title</label>
          <input
            type="text"
            className="sparti-input"
          />
        </div>
        
        <div className="sparti-form-group">
          <label className="sparti-label">OG Description</label>
          <textarea
            className="sparti-textarea"
            rows={3}
          />
        </div>
        
        <div className="sparti-form-group">
          <label className="sparti-label">OG Image</label>
          <label className="sparti-file-button">
            <input type="file" className="sparti-file-input" accept="image/*" />
            Choose file
          </label>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
        <button className="sparti-btn sparti-btn-primary">Save</button>
      </div>
    </div>
  )
}

export const MainContent: React.FC<MainContentProps> = ({ activeItem }) => {
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
  
  // Handle specific content types
  if (activeItem === 'posts') {
    return (
      <main className="sparti-main-content">
        {renderPostsList()}
      </main>
    )
  }
  
  if (activeItem === 'home') {
    return (
      <main className="sparti-main-content">
        {renderPagesList()}
      </main>
    )
  }
  
  if (activeItem === 'navbar') {
    return (
      <main className="sparti-main-content">
        {renderNavbarForm()}
      </main>
    )
  }
  
  if (activeItem === 'branding') {
    return (
      <main className="sparti-main-content">
        {renderBrandingForm()}
      </main>
    )
  }
  
  if (activeItem === 'seo') {
    return (
      <main className="sparti-main-content">
        {renderSEOForm()}
      </main>
    )
  }

  // Default fallback for other items
  return (
    <main className="sparti-main-content">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="sparti-card">
          <div className="sparti-card-header">
            <h3 className="sparti-card-title">Coming Soon</h3>
            <p className="sparti-card-description">
              Content editing for this section will be available soon.
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
                This editor is currently under development.
              </p>
            <button className="sparti-btn sparti-btn-secondary" disabled>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14"/>
                <path d="M12 5v14"/>
              </svg>
                Create Content
            </button>
            </div>
        </div>
      </div>
    </main>
  )
}