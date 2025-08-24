import React, { useState } from 'react'
import { TopBar } from './TopBar'
import { Sidebar } from './Sidebar'
import { MainContent } from './MainContent'
import '../styles/sparti.css'

export const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('dashboard')

  return (
    <div className="sparti-app" style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <TopBar 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      
      <div style={{ display: 'flex' }}>
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeItem={activeItem}
          onItemClick={setActiveItem}
        />
        
        <MainContent activeItem={activeItem} />
      </div>
    </div>
  )
}