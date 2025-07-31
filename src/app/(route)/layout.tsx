
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
  Star,
  X
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
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-violet-400/20 border-r-violet-400 rounded-full animate-spin m-2" style={{animationDirection: 'reverse'}}></div>
          </div>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-indigo-950 relative overflow-hidden p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-indigo-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        {/* Additional floating orbs */}
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-purple-400/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-32 right-1/4 w-40 h-40 bg-violet-400/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
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
        fixed top-0 left-0 bottom-0 w-80 z-50 transform transition-all duration-700 ease-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full bg-gradient-to-b from-purple-900/60 via-violet-900/50 to-indigo-900/60 backdrop-blur-2xl relative overflow-hidden shadow-2xl shadow-purple-500/20">
          {/* Sidebar Glow Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-violet-500/10"></div>
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-400/20 to-transparent"></div>
          
          <div className="relative z-10 h-full flex flex-col">
            {/* Mobile Close Button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden absolute top-4 right-4 p-2 text-purple-300 hover:text-purple-200 hover:bg-purple-500/20 rounded-xl transition-all duration-300 z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Logo Section */}
            <div className="p-8 border-b border-purple-400/20">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Logo size="sm" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full blur-xl opacity-40 animate-pulse"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-violet-200 bg-clip-text text-transparent">
                    Moonspace
                  </h2>
                  <p className="text-xs text-purple-300/70 font-medium">Creative Workspace</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="px-6 py-4 border-b border-purple-400/20">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-2xl p-3 border border-purple-400/20">
                  <div className="text-purple-200 text-xs font-medium">Active</div>
                  <div className="text-purple-100 text-xl font-bold">12</div>
                </div>
                <div className="bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-2xl p-3 border border-indigo-400/20">
                  <div className="text-indigo-200 text-xs font-medium">Online</div>
                  <div className="text-indigo-100 text-xl font-bold">248</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
              {sidebarItems.map((item, index) => {
                const isActive = currentPath === item.href
                return (
                  <div key={item.label} className="relative group">
                    <button
                      onClick={() => {
                        router.push(item.href)
                        setCurrentPath(item.href)
                        setSidebarOpen(false)
                      }}
                      className={`
                        w-full flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-500 group relative overflow-hidden
                        ${isActive 
                          ? 'bg-gradient-to-r from-purple-500/30 to-violet-500/30 border border-purple-400/40 shadow-xl shadow-purple-500/20 scale-105' 
                          : 'hover:bg-purple-500/15 hover:border-purple-400/25 hover:scale-102 border border-transparent'
                        }
                      `}
                    >
                      {/* Active indicator line */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-400 to-violet-400 rounded-r-full"></div>
                      )}
                      
                      <div className={`
                        p-3 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3
                        ${isActive 
                          ? `bg-gradient-to-r ${item.gradient} shadow-xl shadow-purple-500/30` 
                          : 'bg-purple-500/15 group-hover:bg-purple-500/25'
                        }
                      `}>
                        <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-purple-300 group-hover:text-purple-200'}`} />
                      </div>
                      <span className={`font-semibold transition-colors ${isActive ? 'text-purple-100' : 'text-purple-300 group-hover:text-purple-200'}`}>
                        {item.label}
                      </span>
                      {isActive && (
                        <div className="absolute right-4 w-2 h-2 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full animate-pulse"></div>
                      )}
                    </button>
                  </div>
                )
              })}
            </nav>

            {/* User Profile Card */}
            <div className="p-6 border-t border-purple-400/20">
              <div className="bg-gradient-to-r from-purple-800/50 to-violet-800/50 backdrop-blur-xl rounded-2xl p-5 border border-purple-400/30 shadow-xl">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-violet-400 rounded-2xl flex items-center justify-center shadow-xl">
                      <span className="text-white font-bold text-lg">
                        {session.user?.name?.[0] || session.user?.email?.[0]}
                      </span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-3 border-purple-800 animate-pulse shadow-lg"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-purple-100 font-bold text-sm truncate">
                      {session.user?.name || 'User'}
                    </div>
                    <div className="text-purple-300/70 text-xs truncate">
                      {session.user?.email}
                    </div>
                    <div className="flex items-center space-x-1 mt-2">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-purple-300/80 text-xs font-medium">Premium Account</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-gradient-to-r from-red-500/25 to-pink-500/25 hover:from-red-500/35 hover:to-pink-500/35 text-red-300 rounded-xl transition-all duration-300 border border-red-400/30 group hover:shadow-lg"
                >
                  <LogOut className="w-4 h-4 group-hover:scale-110 group-hover:-rotate-12 transition-transform" />
                  <span className="text-sm font-semibold">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 lg:left-80">
        <div className="bg-purple-900/60 backdrop-blur-2xl p-4 relative overflow-hidden shadow-2xl shadow-purple-500/20">
          {/* Topbar Glow Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-violet-500/10"></div>
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-purple-400/15 to-transparent"></div>
          
          <div className="relative z-10 flex items-center justify-between"></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pt-20 lg:pl-80 relative">
        <main className="p-8 min-h-screen">
          {children}
        </main>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-3 text-purple-300 hover:text-purple-200 hover:bg-purple-500/25 rounded-2xl transition-all duration-300 group hover:scale-110"
              >
                <Menu className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
              </button>
              
              {/* Enhanced Search */}
              <div className="relative hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/15 to-violet-500/15 rounded-2xl blur-sm"></div>
                <div className="relative flex items-center">
                  <Search className="absolute left-5 text-purple-300 w-5 h-5 z-10" />
                  <input
                    type="text"
                    placeholder="Search anything in Moonspace..."
                    className="pl-14 pr-14 py-4 w-96 bg-purple-800/40 border border-purple-400/40 rounded-2xl text-purple-100 placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400/60 backdrop-blur-sm transition-all duration-300 focus:scale-105"
                  />
                  <div className="absolute right-4 flex items-center space-x-2">
                    <Zap className="text-purple-400 w-4 h-4" />
                    <kbd className="px-2 py-1 bg-purple-600/30 text-purple-300 text-xs rounded-lg border border-purple-400/40">⌘K</kbd>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center space-x-4">
              <button className="relative p-3 text-purple-300 hover:text-purple-200 hover:bg-purple-500/25 rounded-2xl transition-all duration-300 group hover:scale-110">
                <Bell className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping"></div>
              </button>
              
              <button className="p-3 text-purple-300 hover:text-purple-200 hover:bg-purple-500/25 rounded-2xl transition-all duration-300 group hover:scale-110">
                <UserPlus className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              </button>

              <div className="relative group">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-violet-400 rounded-2xl flex items-center justify-center shadow-xl border-2 border-purple-300/30 cursor-pointer hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold">
                    {session.user?.name?.[0] || session.user?.email?.[0]}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-purple-900 shadow-lg"></div>
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
