
'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'

export default function ChannelsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading
    if (!session) {
      router.push('/') // Redirect to login if not authenticated
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-md border-b border-white/10 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Logo size="sm" />
            <h1 className="text-2xl font-bold text-white">Moonspace</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-white">
              Welcome, {session.user?.name || session.user?.email}
            </div>
            <button
              onClick={() => router.push('/admin/sessions')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Manage Sessions
            </button>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Channels</h2>
            <div className="space-y-2">
              <div className="p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                <div className="text-white font-medium"># general</div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                <div className="text-white font-medium"># random</div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                <div className="text-white font-medium"># development</div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <div className="h-96 overflow-y-auto mb-4 space-y-4">
              <div className="text-gray-300 text-center">Welcome to Moonspace! Start chatting...</div>
            </div>
            
            {/* Message Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 backdrop-blur-sm"
              />
              <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
