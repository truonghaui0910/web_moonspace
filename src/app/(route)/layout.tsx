'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { getThemeClasses } from '@/lib/theme'
import Sidebar from '@/components/layout/Sidebar'
import Navbar from '@/components/layout/Navbar'
import Loading from '@/components/ui/Loading'

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
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname)
    }
  }, [])

  // Prevent hydration mismatch during initial render
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (status === 'loading') {
    return <Loading text="Loading Moonspace..." />
  }

  if (!session || !isClient) {
    return null
  }

  return (
    <div className="min-h-screen flex overflow-hidden bg-theme-primary">
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