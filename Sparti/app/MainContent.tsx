import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  FileText, 
  Navigation, 
  Layout, 
  Settings, 
  Palette,
  Search,
  Plus,
  BarChart3,
  Users,
  Globe
} from 'lucide-react'

interface MainContentProps {
  activeItem: string
}

const contentMap: Record<string, { title: string; description: string; icon: React.ComponentType<any> }> = {
  dashboard: {
    title: 'Dashboard',
    description: 'Welcome to Sparti CMS',
    icon: Home
  },
  home: {
    title: 'Home Page',
    description: 'Manage your homepage content',
    icon: Home
  },
  posts: {
    title: 'Posts',
    description: 'Create and manage blog posts',
    icon: FileText
  },
  navbar: {
    title: 'Navigation Bar',
    description: 'Configure site navigation',
    icon: Navigation
  },
  footer: {
    title: 'Footer',
    description: 'Manage footer content and links',
    icon: Layout
  },
  branding: {
    title: 'Branding',
    description: 'Site branding and visual identity',
    icon: Palette
  },
  seo: {
    title: 'SEO Settings',
    description: 'Search engine optimization settings',
    icon: Search
  }
}

export const MainContent: React.FC<MainContentProps> = ({ activeItem }) => {
  const content = contentMap[activeItem] || contentMap.dashboard
  const Icon = content.icon

  if (activeItem === 'dashboard') {
    return (
      <main className="flex-1 p-6 lg:ml-0">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to Sparti CMS
            </h1>
            <p className="text-gray-600">
              Manage your website content with ease
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Home page configured</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Ready to create</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Components</CardTitle>
                <Layout className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Navbar & Footer</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Settings</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Branding & SEO</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks to get you started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Post
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Palette className="mr-2 h-4 w-4" />
                  Update Branding
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Search className="mr-2 h-4 w-4" />
                  Configure SEO
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>
                  Tips to make the most of Sparti CMS
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600">
                  <p className="mb-2">
                    <strong>1. Configure your branding</strong> - Set up your site name, colors, and logo
                  </p>
                  <p className="mb-2">
                    <strong>2. Update navigation</strong> - Customize your site's navigation menu
                  </p>
                  <p>
                    <strong>3. Create content</strong> - Start adding pages and blog posts
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 p-6 lg:ml-0">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Icon className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">{content.title}</h1>
          </div>
          <p className="text-gray-600">{content.description}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>
              Content editing for {content.title.toLowerCase()} will be available soon.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Icon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">
                The {content.title.toLowerCase()} editor is currently under development.
              </p>
              <Button variant="outline" disabled>
                <Plus className="mr-2 h-4 w-4" />
                Create {content.title}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}