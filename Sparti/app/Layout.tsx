import React, { useState } from 'react'
import { TopBar } from './TopBar'
import { Sidebar } from './Sidebar'
import { MainContent } from './MainContent'
import '../styles/sparti.css'

export const Layout: React.FC = () => {
  const [activeItem, setActiveItem] = useState('dashboard')

  return (
    <div className="sparti-app" style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <TopBar 
        activeItem={activeItem}
      />
      
      <div className="sparti-layout">
        <Sidebar 
          activeItem={activeItem}
          onItemClick={setActiveItem}
        />
        
        <MainContent activeItem={activeItem} />
      </div>
    </div>
  )
}