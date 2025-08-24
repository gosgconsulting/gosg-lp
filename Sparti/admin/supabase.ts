// Mock auth system to replace Supabase
interface MockUser {
  id: string
  email: string
}

interface MockSession {
  user: MockUser
}

interface MockAuthResponse {
  data: {
    user: MockUser | null
    session: MockSession | null
  }
  error: Error | null
}

class MockAuth {
  private currentUser: MockUser | null = null
  private listeners: ((event: string, session: MockSession | null) => void)[] = []

  async signInWithPassword({ email, password }: { email: string; password: string }): Promise<MockAuthResponse> {
    // Mock authentication - accept master account credentials
    if (email === 'contact@gosgconsulting.com' && password === 'Gosg888!') {
      this.currentUser = { id: '1', email }
      const session = { user: this.currentUser }
      
      // Store in localStorage for persistence
      localStorage.setItem('mock_auth_user', JSON.stringify(this.currentUser))
      
      // Notify listeners
      this.listeners.forEach(listener => listener('SIGNED_IN', session))
      
      return {
        data: { user: this.currentUser, session },
        error: null
      }
    }
    
    return {
      data: { user: null, session: null },
      error: new Error('Invalid login credentials')
    }
  }

  async signOut(): Promise<void> {
    this.currentUser = null
    localStorage.removeItem('mock_auth_user')
    
    // Notify listeners
    this.listeners.forEach(listener => listener('SIGNED_OUT', null))
  }

  async getSession(): Promise<{ data: { session: MockSession | null } }> {
    // Check localStorage for persisted session
    const storedUser = localStorage.getItem('mock_auth_user')
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser)
      return {
        data: { session: { user: this.currentUser! } }
      }
    }
    
    return {
      data: { session: null }
    }
  }

  async getUser(): Promise<{ data: { user: MockUser | null } }> {
    return {
      data: { user: this.currentUser }
    }
  }

  onAuthStateChange(callback: (event: string, session: MockSession | null) => void) {
    this.listeners.push(callback)
    
    return {
      data: {
        subscription: {
          unsubscribe: () => {
            const index = this.listeners.indexOf(callback)
            if (index > -1) {
              this.listeners.splice(index, 1)
            }
          }
        }
      }
    }
  }
}

// Export mock auth client
export const supabase = {
  auth: new MockAuth()
}