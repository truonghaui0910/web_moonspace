
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { 
  Users, 
  Hash, 
  Settings, 
  Bell, 
  Search, 
  Menu,
  LogOut,
  Home,
  MessageSquare,
  UserPlus,
  Activity,
  Zap,
  Star
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import Logo from '@/components/common/Logo'

interface RouteLayoutProps {
  children: React.ReactNode
}

export default function RouteLayout({ children }: RouteLayoutProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState('/channels')

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/')
    }
  }, [session, status, router])

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-violet-950 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-violet-400/20 border-r-violet-400 rounded-full animate-spin m-2" style={{animationDirection: 'reverse'}}></div>
          <div className="mt-6 text-purple-300 text-xl font-medium text-center">Loading Moonspace...</div>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard', gradient: 'from-purple-500 to-indigo-500' },
    { icon: Hash, label: 'Channels', href: '/channels', gradient: 'from-violet-500 to-purple-500' },
    { icon: Users, label: 'Users', href: '/users', gradient: 'from-indigo-500 to-blue-500' },
    { icon: MessageSquare, label: 'Messages', href: '/messages', gradient: 'from-purple-500 to-pink-500' },
    { icon: Activity, label: 'Analytics', href: '/analytics', gradient: 'from-violet-500 to-indigo-500' },
    { icon: Settings, label: 'Settings', href: '/settings', gradient: 'from-gray-500 to-slate-500' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-indigo-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-indigo-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-purple-900/40 via-violet-900/30 to-indigo-900/40 
        backdrop-blur-xl border-r border-purple-400/20 z-50 transform transition-all duration-500 ease-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent"></div>
        
        <div className="relative z-10">
          {/* Logo Section */}
          <div className="p-6 border-b border-purple-400/20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Logo size="sm" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full blur-lg opacity-30 animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">
                  Moonspace
                </h2>
                <p className="text-xs text-purple-300/60 font-medium">Creative Workspace</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item, index) => {
              const isActive = currentPath === item.href
              return (
                <div key={item.label} className="relative group">
                  <button
                    onClick={() => {
                      router.push(item.href)
                      setCurrentPath(item.href)
                    }}
                    className={`
                      w-full flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all duration-300 group
                      ${isActive 
                        ? 'bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-400/30 shadow-lg shadow-purple-500/10' 
                        : 'hover:bg-purple-500/10 hover:border-purple-400/20 border border-transparent'
                      }
                    `}
                  >
                    <div className={`
                      p-2 rounded-xl transition-all duration-300 group-hover:scale-110
                      ${isActive 
                        ? `bg-gradient-to-r ${item.gradient} shadow-lg` 
                        : 'bg-purple-500/10 group-hover:bg-purple-500/20'
                      }
                    `}>
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-purple-300'}`} />
                    </div>
                    <span className={`font-medium transition-colors ${isActive ? 'text-purple-200' : 'text-purple-300 group-hover:text-purple-200'}`}>
                      {item.label}
                    </span>
                    {isActive && (
                      <div className="absolute right-2 w-2 h-2 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full animate-pulse"></div>
                    )}
                  </button>
                </div>
              )
            })}
          </nav>

          {/* User Profile Card */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-gradient-to-r from-purple-800/40 to-violet-800/40 backdrop-blur-xl rounded-2xl p-5 border border-purple-400/20 shadow-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-violet-400 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">
                      {session.user?.name?.[0] || session.user?.email?.[0]}
                    </span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-purple-800 animate-pulse"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-purple-200 font-semibold text-sm truncate">
                    {session.user?.name || 'User'}
                  </div>
                  <div className="text-purple-300/60 text-xs truncate">
                    {session.user?.email}
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-purple-300/80 text-xs">Premium</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 text-red-300 rounded-xl transition-all duration-300 border border-red-400/20 group"
              >
                <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:ml-72 relative">
        {/* Top Bar */}
        <div className="bg-purple-900/20 backdrop-blur-xl border-b border-purple-400/20 p-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-3 text-purple-300 hover:text-purple-200 hover:bg-purple-500/20 rounded-xl transition-all duration-300 group"
              >
                <Menu className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
              
              {/* Enhanced Search */}
              <div className="relative hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-2xl blur-sm"></div>
                <div className="relative flex items-center">
                  <Search className="absolute left-4 text-purple-300 w-5 h-5 z-10" />
                  <input
                    type="text"
                    placeholder="Search channels, users, messages..."
                    className="pl-12 pr-6 py-3 w-96 bg-purple-800/30 border border-purple-400/30 rounded-2xl text-purple-100 placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  />
                  <Zap className="absolute right-4 text-purple-400 w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center space-x-3">
              <button className="relative p-3 text-purple-300 hover:text-purple-200 hover:bg-purple-500/20 rounded-xl transition-all duration-300 group">
                <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping"></div>
              </button>
              
              <button className="p-3 text-purple-300 hover:text-purple-200 hover:bg-purple-500/20 rounded-xl transition-all duration-300 group">
                <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>

              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-violet-400 rounded-2xl flex items-center justify-center shadow-lg border-2 border-purple-300/20">
                  <span className="text-white font-bold text-sm">
                    {session.user?.name?.[0] || session.user?.email?.[0]}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-purple-900"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-6 relative">
          {children}
        </main>
      </div>
    </div>
  )
}
