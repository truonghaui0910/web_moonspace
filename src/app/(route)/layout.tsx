
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { getThemeClasses } from '@/lib/theme'
import Sidebar from '@/components/layout/Sidebar'
import Navbar from '@/components/layout/Navbar'

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
      <div>Loading</div>
      
      // <div className={`min-h-screen flex items-center justify-center ${getThemeClasses(theme).background}`}>
      //   <div className="flex flex-col items-center justify-center">
      //     <div className="relative">
      //       <div className={`w-20 h-20 border-4 ${getThemeClasses(theme).spinner} rounded-full animate-spin`}></div>
      //       <div className={`absolute inset-0 w-16 h-16 border-4 ${getThemeClasses(theme).spinnerSecondary} rounded-full animate-spin m-2`} style={{animationDirection: 'reverse'}}></div>
      //     </div>
      //     <div className={`mt-6 ${getThemeClasses(theme).textPrimary} text-xl font-medium text-center`}>Loading Moonspace...</div>
      //   </div>
      // </div>
    )
  }

  if (!session) {
    return null
  }

  const themeClasses = getThemeClasses(theme)

  return (
    <div className={`min-h-screen flex overflow-hidden ${themeClasses.background}`}>
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentPath={currentPath}
        setCurrentPath={setCurrentPath}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 min-w-0">
        <Navbar 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content Area */}
        <main className="p-4 sm:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}


