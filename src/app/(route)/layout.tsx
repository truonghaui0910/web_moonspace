
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
  X,
  Moon,
  Sun,
  Palette
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import Logo from '@/components/common/Logo'
import { useTheme } from '@/contexts/ThemeContext'

interface RouteLayoutProps {
  children: React.ReactNode
}

export default function RouteLayout({ children }: RouteLayoutProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState('/channels')
  const { theme, setTheme } = useTheme()

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
      <div className={`min-h-screen flex items-center justify-center ${getThemeClasses(theme).background}`}>
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <div className={`w-20 h-20 border-4 ${getThemeClasses(theme).spinner} rounded-full animate-spin`}></div>
            <div className={`absolute inset-0 w-16 h-16 border-4 ${getThemeClasses(theme).spinnerSecondary} rounded-full animate-spin m-2`} style={{animationDirection: 'reverse'}}></div>
          </div>
          <div className={`mt-6 ${getThemeClasses(theme).textPrimary} text-xl font-medium text-center`}>Loading Moonspace...</div>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Users, label: 'Customers', href: '/customers' },
    { icon: Hash, label: 'Orders', href: '/orders' },
    { icon: Activity, label: 'Analytics', href: '/analytics' },
    { icon: MessageSquare, label: 'Messages', href: '/messages', badge: '26' },
    { icon: Users, label: 'Products', href: '/products' },
    { icon: Settings, label: 'Reports', href: '/reports' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ]

  const themeClasses = getThemeClasses(theme)

  return (
    <div className={`min-h-screen flex ${themeClasses.background}`}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <div className={`
        fixed top-0 left-0 bottom-0 w-72 z-50 transform transition-all duration-300 ease-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${themeClasses.sidebar}
      `}>
        <div className="h-full flex flex-col">
          {/* Mobile Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className={`lg:hidden absolute top-4 right-4 p-2 ${themeClasses.textSecondary} hover:${themeClasses.textPrimary} rounded-xl transition-all duration-300 z-20`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo Section */}
          <div className="p-6 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${themeClasses.accent} rounded-lg flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div>
                <h2 className={`text-xl font-bold ${themeClasses.textPrimary}`}>
                  EGATOR
                </h2>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {sidebarItems.map((item, index) => {
              const isActive = currentPath === item.href
              return (
                <div key={item.label} className="relative">
                  <button
                    onClick={() => {
                      router.push(item.href)
                      setCurrentPath(item.href)
                      setSidebarOpen(false)
                    }}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group
                      ${isActive 
                        ? `${themeClasses.sidebarActive} ${themeClasses.textPrimary}` 
                        : `hover:${themeClasses.sidebarHover} ${themeClasses.textSecondary} hover:${themeClasses.textPrimary}`
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-2 py-1 text-xs font-bold ${themeClasses.badge} rounded-full`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                </div>
              )
            })}
          </nav>

          {/* Theme Switcher */}
          <div className="px-4 py-4 border-t border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <span className={`text-sm font-medium ${themeClasses.textSecondary}`}>Theme</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setTheme('dark')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  theme === 'dark' 
                    ? `${themeClasses.accent} text-white` 
                    : `${themeClasses.sidebarHover} ${themeClasses.textSecondary}`
                }`}
                title="Dark Theme"
              >
                <Moon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  theme === 'light' 
                    ? `${themeClasses.accent} text-white` 
                    : `${themeClasses.sidebarHover} ${themeClasses.textSecondary}`
                }`}
                title="Light Theme"
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme('violet')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  theme === 'violet' 
                    ? `${themeClasses.accent} text-white` 
                    : `${themeClasses.sidebarHover} ${themeClasses.textSecondary}`
                }`}
                title="Violet Theme"
              >
                <Palette className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-700/50">
            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-10 h-10 ${themeClasses.accent} rounded-full flex items-center justify-center`}>
                <span className="text-white font-bold text-sm">
                  {session.user?.name?.[0] || session.user?.email?.[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className={`${themeClasses.textPrimary} font-medium text-sm truncate`}>
                  {session.user?.name || 'User'}
                </div>
                <div className={`${themeClasses.textSecondary} text-xs truncate`}>
                  Admin
                </div>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className={`w-full flex items-center justify-center space-x-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-200`}
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72">
        {/* Top Bar */}
        <div className={`${themeClasses.topbar} p-4 border-b ${themeClasses.border}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`lg:hidden p-2 ${themeClasses.textSecondary} hover:${themeClasses.textPrimary} rounded-lg transition-all duration-200`}
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div>
                <h1 className={`text-2xl font-bold ${themeClasses.textPrimary}`}>Dashboard</h1>
                <p className={`text-sm ${themeClasses.textSecondary}`}>mm / dd / yyyy</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary} w-4 h-4`} />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`pl-10 pr-4 py-2 w-64 ${themeClasses.input} border ${themeClasses.border} rounded-lg ${themeClasses.textPrimary} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>

              {/* Notifications */}
              <button className={`relative p-2 ${themeClasses.textSecondary} hover:${themeClasses.textPrimary} rounded-lg transition-all duration-200`}>
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>

              {/* Profile */}
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <div className={`text-sm font-medium ${themeClasses.textPrimary}`}>
                    Hey, {session.user?.name || 'Daniel'}
                  </div>
                  <div className={`text-xs ${themeClasses.textSecondary}`}>Admin</div>
                </div>
                <div className={`w-8 h-8 ${themeClasses.accent} rounded-full flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">
                    {session.user?.name?.[0] || session.user?.email?.[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className={`p-6 ${themeClasses.background}`}>
          {children}
        </main>
      </div>
    </div>
  )
}

function getThemeClasses(theme: string) {
  switch (theme) {
    case 'dark':
      return {
        background: 'bg-gray-900',
        sidebar: 'bg-gray-800 border-r border-gray-700',
        topbar: 'bg-gray-800',
        sidebarActive: 'bg-red-500/20 border-l-4 border-red-500',
        sidebarHover: 'bg-gray-700/50',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-400',
        accent: 'bg-red-500',
        badge: 'bg-red-500 text-white',
        border: 'border-gray-700',
        input: 'bg-gray-700/50',
        spinner: 'border-red-400/30 border-t-red-400',
        spinnerSecondary: 'border-red-400/20 border-r-red-400'
      }
    case 'light':
      return {
        background: 'bg-gray-50',
        sidebar: 'bg-white border-r border-gray-200 shadow-lg',
        topbar: 'bg-white',
        sidebarActive: 'bg-blue-500/10 border-l-4 border-blue-500',
        sidebarHover: 'bg-gray-100',
        textPrimary: 'text-gray-900',
        textSecondary: 'text-gray-600',
        accent: 'bg-blue-500',
        badge: 'bg-blue-500 text-white',
        border: 'border-gray-200',
        input: 'bg-white',
        spinner: 'border-blue-400/30 border-t-blue-400',
        spinnerSecondary: 'border-blue-400/20 border-r-blue-400'
      }
    case 'violet':
      return {
        background: 'bg-gradient-to-br from-gray-950 via-purple-950 to-indigo-950',
        sidebar: 'bg-gradient-to-b from-purple-900/60 via-violet-900/50 to-indigo-900/60 backdrop-blur-2xl border-r border-purple-400/20',
        topbar: 'bg-purple-900/60 backdrop-blur-2xl',
        sidebarActive: 'bg-gradient-to-r from-purple-500/30 to-violet-500/30 border-l-4 border-purple-400',
        sidebarHover: 'bg-purple-500/15',
        textPrimary: 'text-purple-100',
        textSecondary: 'text-purple-300',
        accent: 'bg-gradient-to-r from-purple-500 to-violet-500',
        badge: 'bg-purple-500 text-white',
        border: 'border-purple-400/20',
        input: 'bg-purple-800/40 border-purple-400/40',
        spinner: 'border-purple-400/30 border-t-purple-400',
        spinnerSecondary: 'border-violet-400/20 border-r-violet-400'
      }
    default:
      return getThemeClasses('dark')
  }
}
