import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { 
  Home, 
  FileText, 
  Navigation, 
  Layout, 
  Settings, 
  Palette,
  Search,
  X
} from 'lucide-react'

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
      { id: 'home', label: 'Home', icon: Home },
      { id: 'posts', label: 'Posts', icon: FileText },
    ]
  },
  {
    title: 'Components',
    items: [
      { id: 'navbar', label: 'Navbar', icon: Navigation },
      { id: 'footer', label: 'Footer', icon: Layout },
    ]
  },
  {
    title: 'Site Settings',
    items: [
      { id: 'branding', label: 'Branding', icon: Palette },
      { id: 'seo', label: 'SEO', icon: Search },
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
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out z-50",
        "lg:relative lg:top-0 lg:h-[calc(100vh-4rem)] lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Mobile close button */}
          <div className="flex items-center justify-between p-4 lg:hidden">
            <h2 className="text-lg font-semibold">Navigation</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto">
            {/* Dashboard */}
            <div>
              <Button
                variant={activeItem === 'dashboard' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => {
                  onItemClick('dashboard')
                  onClose()
                }}
              >
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </div>
            
            {/* Navigation Groups */}
            {navigationGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {group.title}
                </h3>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon
                    return (
                      <Button
                        key={item.id}
                        variant={activeItem === item.id ? 'default' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => {
                          onItemClick(item.id)
                          onClose()
                        }}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </Button>
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