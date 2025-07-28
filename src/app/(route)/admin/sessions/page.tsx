
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface SessionData {
  id: string
  userId: string
  expires: string
  user: {
    id: string
    email: string
    username: string
    name: string
  }
}

export default function SessionsAdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sessions, setSessions] = useState<SessionData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/')
      return
    }
    fetchSessions()
  }, [session, status, router])

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/admin/sessions')
      const data = await response.json()
      setSessions(data)
    } catch (error) {
      console.error('Error fetching sessions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteUserSessions = async (userId: string, username: string) => {
    if (!confirm(`Bạn có chắc muốn xóa tất cả session của ${username}?`)) {
      return
    }

    try {
      const response = await fetch('/api/admin/sessions', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      })

      if (response.ok) {
        alert('Đã xóa session thành công!')
        fetchSessions() // Refresh the list
      } else {
        alert('Có lỗi xảy ra khi xóa session')
      }
    } catch (error) {
      console.error('Error deleting sessions:', error)
      alert('Có lỗi xảy ra khi xóa session')
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-md border-b border-white/10 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Session Management</h1>
          <button
            onClick={() => router.push('/channels')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Back to Channels
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-black/30 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Active Sessions ({sessions.length})
            </h2>
            
            {sessions.length === 0 ? (
              <p className="text-gray-400">No active sessions found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-3 text-gray-300">User</th>
                      <th className="text-left p-3 text-gray-300">Email</th>
                      <th className="text-left p-3 text-gray-300">Username</th>
                      <th className="text-left p-3 text-gray-300">Expires</th>
                      <th className="text-left p-3 text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((sessionData) => (
                      <tr key={sessionData.id} className="border-b border-white/5">
                        <td className="p-3 text-white">{sessionData.user.name}</td>
                        <td className="p-3 text-gray-300">{sessionData.user.email}</td>
                        <td className="p-3 text-gray-300">{sessionData.user.username}</td>
                        <td className="p-3 text-gray-300">
                          {new Date(sessionData.expires).toLocaleString()}
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => handleDeleteUserSessions(sessionData.userId, sessionData.user.username)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                          >
                            Kick Out
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
