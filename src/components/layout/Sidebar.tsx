
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  Hash, 
  Home,
  LogOut,
  X
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useTheme } from '@/contexts/ThemeContext'

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  currentPath: string
  setCurrentPath: (path: string) => void
}

export default function Sidebar({ 
  sidebarOpen, 
  setSidebarOpen, 
  currentPath, 
  setCurrentPath 
}: SidebarProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const { theme } = useTheme()

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Hash, label: 'Channels', href: '/channels' },
  ]

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <div className={`
        fixed top-0 left-0 bottom-0 w-80 sm:w-72 z-50 transform transition-all duration-300 ease-out
        lg:bg-transparent lg:border-r-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${sidebarOpen ? 'bg-card backdrop-blur-xl border-r border-theme' : ''}
      `}>
        <div className="h-full flex flex-col">
          {/* Mobile Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 text-secondary hover:text-primary rounded-xl transition-all duration-300 z-20 bg-black/20 backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo Section */}
          <div className="p-4 sm:p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-primary">
                  MOONSPACE
                </h2>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 sm:px-4 py-4 sm:py-6 space-y-1 overflow-y-auto">
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
                      w-full flex items-center justify-between px-3 sm:px-4 py-3 rounded-2xl transition-all duration-200 group
                      ${isActive 
                        ? 'bg-sidebar-active text-primary' 
                        : 'hover-bg text-secondary hover:text-primary'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium text-sm sm:text-base">{item.label}</span>
                    </div>
                  </button>
                </div>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="p-3 sm:p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-accent rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {session?.user?.name?.[0] || session?.user?.email?.[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-primary font-medium text-sm truncate">
                  {session?.user?.name || 'User'}
                </div>
                <div className="text-secondary text-xs truncate">
                  Admin
                </div>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-2xl transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
} 
