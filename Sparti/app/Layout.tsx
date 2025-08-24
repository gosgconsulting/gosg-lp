import React, { useState } from 'react'
import { TopBar } from './TopBar'
import { Sidebar } from './Sidebar'
import { MainContent } from './MainContent'

export const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('dashboard')

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      
      <div className="flex">
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