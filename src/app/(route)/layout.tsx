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
import { getThemeClasses } from '@/utils/theme'

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
    { icon: Hash, label: 'Channels', href: '/channels' },
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
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${themeClasses.accent} rounded-xl flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h2 className={`text-xl font-bold ${themeClasses.textPrimary}`}>
                  MOONSPACE
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
                      w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 group
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
                      <span className={`px-3 py-1 text-xs font-bold ${themeClasses.badge} rounded-2xl`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                </div>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-10 h-10 ${themeClasses.accent} rounded-2xl flex items-center justify-center`}>
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
              className={`w-full flex items-center justify-center space-x-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-2xl transition-all duration-200`}
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
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`lg:hidden p-2 ${themeClasses.textSecondary} hover:${themeClasses.textPrimary} rounded-2xl transition-all duration-200`}
              >
                <Menu className="w-6 h-6" />
              </button>

              <div>
                {/* Dashboard title removed */}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Switcher */}
              <div className="flex space-x-1">
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-2 rounded-2xl transition-all duration-200 ${
                    theme === 'dark' 
                      ? `${themeClasses.accent} text-white` 
                      : `${themeClasses.textSecondary} hover:${themeClasses.textPrimary}`
                  }`}
                  title="Dark Theme"
                >
                  <Moon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTheme('light')}
                  className={`p-2 rounded-2xl transition-all duration-200 ${
                    theme === 'light' 
                      ? `${themeClasses.accent} text-white` 
                      : `${themeClasses.textSecondary} hover:${themeClasses.textPrimary}`
                  }`}
                  title="Light Theme"
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTheme('violet')}
                  className={`p-2 rounded-2xl transition-all duration-200 ${
                    theme === 'violet' 
                      ? `${themeClasses.accent} text-white` 
                      : `${themeClasses.textSecondary} hover:${themeClasses.textPrimary}`
                  }`}
                  title="Violet Theme"
                >
                  <Palette className="w-4 h-4" />
                </button>
              </div>

              {/* Notifications */}
              <button className={`relative p-2 ${themeClasses.textSecondary} hover:${themeClasses.textPrimary} rounded-2xl transition-all duration-200`}>
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
                <div className={`w-8 h-8 ${themeClasses.accent} rounded-2xl flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">
                    {session.user?.name?.[0] || session.user?.email?.[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className={`p-6`}>
          {children}
        </main>
      </div>
    </div>
  )
}