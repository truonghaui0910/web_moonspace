
'use client'

import { useSession } from 'next-auth/react'
import { 
  Bell, 
  Menu,
  Moon,
  Sun,
  Palette
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface NavbarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Navbar({ sidebarOpen, setSidebarOpen }: NavbarProps) {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()

  return (
    <div className="p-3 sm:p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-secondary hover:text-primary rounded-2xl transition-all duration-200"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          
          <div>
            {/* Dashboard title removed */}
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Theme Switcher - Hidden on small mobile */}
          <div className="hidden sm:flex space-x-1">
            <button
              onClick={() => setTheme('dark')}
              className={`p-2 rounded-2xl transition-all duration-200 ${
                theme === 'dark' 
                  ? 'bg-accent text-white' 
                  : 'text-secondary hover:text-primary'
              }`}
              title="Dark Theme"
            >
              <Moon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`p-2 rounded-2xl transition-all duration-200 ${
                theme === 'light' 
                  ? 'bg-accent text-white' 
                  : 'text-secondary hover:text-primary'
              }`}
              title="Light Theme"
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTheme('violet')}
              className={`p-2 rounded-2xl transition-all duration-200 ${
                theme === 'violet' 
                  ? 'bg-accent text-white' 
                  : 'text-secondary hover:text-primary'
              }`}
              title="Violet Theme"
            >
              <Palette className="w-4 h-4" />
            </button>
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-secondary hover:text-primary rounded-2xl transition-all duration-200">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="text-right hidden md:block">
              <div className="text-sm font-medium text-primary">
                {session?.user?.name || 'Daniel'}
              </div>
              <div className="text-xs text-secondary">Admin</div>
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-accent rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">
                {session?.user?.name?.[0] || session?.user?.email?.[0]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
