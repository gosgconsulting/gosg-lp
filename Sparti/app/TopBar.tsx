import React, { useState, useEffect } from 'react'
import { supabase } from '../admin/supabase'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Menu, Sparkles, LogOut, User } from 'lucide-react'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface TopBarProps {
  onMenuClick: () => void
  sidebarOpen: boolean
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick, sidebarOpen }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null)

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
    <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Sparti</h1>
            {isDev && (
              <Badge variant="secondary" className="text-xs">
                Dev
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 h-auto p-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-white text-sm">
                    {user?.email ? getUserInitials(user.email) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-gray-900">
                    {user?.email?.split('@')[0] || 'User'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user?.email || ''}
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <div className="text-sm font-medium">{user?.email?.split('@')[0] || 'User'}</div>
                <div className="text-xs text-gray-500">{user?.email || ''}</div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}