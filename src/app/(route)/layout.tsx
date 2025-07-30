
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
  UserPlus
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

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-yellow-300 text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Hash, label: 'Channels', href: '/channels' },
    { icon: Users, label: 'Users', href: '/users' },
    { icon: MessageSquare, label: 'Messages', href: '/messages' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-slate-800/95 to-gray-900/95 
        backdrop-blur-xl border-r border-emerald-400/20 z-50 transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-emerald-400/20">
          <div className="flex items-center space-x-3">
            <Logo size="sm" />
            <h2 className="text-xl font-bold text-emerald-300">Moonspace</h2>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => router.push(item.href)}
              className="w-full flex items-center space-x-3 px-4 py-3 text-slate-200 hover:text-emerald-300 hover:bg-emerald-400/10 rounded-xl transition-all duration-200 group"
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-slate-700/60 backdrop-blur-sm rounded-xl p-4 border border-emerald-400/20">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-slate-900 font-bold text-sm">
                  {session.user?.name?.[0] || session.user?.email?.[0]}
                </span>
              </div>
              <div>
                <div className="text-emerald-300 font-medium text-sm">
                  {session.user?.name || 'User'}
                </div>
                <div className="text-slate-300 text-xs">
                  {session.user?.email}
                </div>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <div className="bg-slate-800/60 backdrop-blur-xl border-b border-emerald-400/20 p-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-emerald-300 hover:bg-emerald-400/10 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search channels, users..."
                  className="pl-10 pr-4 py-2 bg-slate-700/60 border border-slate-600/40 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent w-80"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-slate-300 hover:text-emerald-300 hover:bg-emerald-400/10 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full"></div>
              </button>
              
              <button className="p-2 text-slate-300 hover:text-emerald-300 hover:bg-emerald-400/10 rounded-lg transition-colors">
                <UserPlus className="w-5 h-5" />
              </button>

              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-slate-900 font-bold text-sm">
                  {session.user?.name?.[0] || session.user?.email?.[0]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
