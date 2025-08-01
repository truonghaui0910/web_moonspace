'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import Loading from '@/components/ui/Loading'
import { 
  Database,
  Trash2,
  Search,
  Plus,
  RefreshCw,
  Check,
  X,
  UserPlus,
  Mail,
  MailPlus,
  Globe,
  Clock,
  User,
  LogOut
} from 'lucide-react'

interface Server {
  id: number
  username: string | null
  host_url: string
  status: number
  kasm_id: string | null
  kasm_info: string | null
  createdAt: string
  updatedAt: string
}

interface User {
  id: string
  username: string
  email: string
  name: string | null
  role: string
}

export default function ServersPage() {
  const { data: session } = useSession()
  const [servers, setServers] = useState<Server[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [userRole, setUserRole] = useState<string>('')
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [selectedServer, setSelectedServer] = useState<Server | null>(null)
  const [selectedUsername, setSelectedUsername] = useState('')
  const [proxyCount, setProxyCount] = useState<number | null>(null)
  const [isProxyLoading, setIsProxyLoading] = useState(false)
  const [emailButtonStates, setEmailButtonStates] = useState<{[key: number]: boolean}>({})
  const [showDestroyConfirm, setShowDestroyConfirm] = useState(false)
  const [serverToDestroy, setServerToDestroy] = useState<Server | null>(null)
  const [showCreateEmailConfirm, setShowCreateEmailConfirm] = useState(false)
  const [emailToCreate, setEmailToCreate] = useState<{server: Server, withProxy: boolean} | null>(null)

  // Fetch servers
  const fetchServers = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (statusFilter !== 'all') {
        params.append('status', statusFilter)
      }
      
      const response = await fetch(`/api/servers?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        setServers(data.servers)
        setUserRole(data.userRole)
      } else {
        console.error('Error fetching servers:', data.error)
      }
    } catch (error) {
      console.error('Error fetching servers:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch users for assign modal (ADMIN only)
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/servers/assign-user')
      const data = await response.json()
      
      if (response.ok) {
        setUsers(data.users)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  // Fetch proxy count
  const fetchProxyCount = async () => {
    setIsProxyLoading(true)
    console.log('🔄 Fetching proxy count via API route...')
    try {
      const response = await fetch('/api/proxy/count')
      
      console.log('📡 Response status:', response.status)
      console.log('📡 Response ok:', response.ok)
      
      if (response.ok) {
        const data = await response.json()
        console.log('📊 API response:', data)
        
        if (data.count !== undefined) {
          console.log('📊 Setting proxy count:', data.count)
          setProxyCount(data.count)
        } else {
          console.error('❌ No count in response:', data)
          setProxyCount(null)
        }
      } else {
        const errorData = await response.json()
        console.error('❌ Failed to fetch proxy count - Status:', response.status, errorData)
        setProxyCount(null)
      }
    } catch (error) {
      console.error('❌ Error fetching proxy count:', error)
      console.error('❌ Error message:', error instanceof Error ? error.message : 'Unknown error')
      setProxyCount(null)
    } finally {
      setIsProxyLoading(false)
    }
  }

  // Show create email confirmation
  const showCreateEmailConfirmation = (server: Server, withProxy: boolean) => {
    setEmailToCreate({ server, withProxy })
    setShowCreateEmailConfirm(true)
  }

  // Create email functions
  const confirmCreateEmail = async () => {
    if (!emailToCreate) return
    
    const { server, withProxy } = emailToCreate
    setShowCreateEmailConfirm(false)
    setEmailButtonStates(prev => ({ ...prev, [server.id]: true }))
    
    try {
      const response = await fetch('/api/servers/create-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host_url: server.host_url,
          is_proxy: withProxy
        })
      })

      const data = await response.json()

      if (data.error === 1) {
        toast.error('Error creating email account')
        setEmailButtonStates(prev => ({ ...prev, [server.id]: false }))
      } else if (data.error === 0) {
        toast.success('Email account created successfully!')
        fetchServers() // Refresh to get updated kasm_id
        
        // Open complete URL in new tab if available
        if (data.complete_url) {
          window.open(data.complete_url, '_blank')
        }
      }
    } catch (error) {
      console.error('Error creating email:', error)
      toast.error('Error creating email account')
      setEmailButtonStates(prev => ({ ...prev, [server.id]: false }))
    }
    
    setEmailToCreate(null)
  }

  // Show destroy confirmation
  const showDestroyConfirmation = (server: Server) => {
    setServerToDestroy(server)
    setShowDestroyConfirm(true)
  }

  // Destroy session for server
  const confirmDestroySession = async () => {
    if (!serverToDestroy) return
    
    setShowDestroyConfirm(false)
    
    try {
      const response = await fetch(`/api/servers/${serverToDestroy.id}/destroy-session`, {
        method: 'POST'
      })
      
      const data = await response.json()
      
      if (response.ok) {
        toast.success(`Sessions destroyed successfully for ${serverToDestroy.host_url}`)
        console.log('Session destruction result:', data)
        setEmailButtonStates(prev => ({ ...prev, [serverToDestroy.id]: false }))
        fetchServers() // Refresh to clear kasm_id
      } else {
        toast.error(`Failed to destroy sessions: ${data.error}`)
        console.error('Error destroying session:', data.error)
      }
    } catch (error) {
      console.error('Error destroying session:', error)
      toast.error('Network error: Failed to destroy session')
    }
    
    setServerToDestroy(null)
  }

  // Assign user to server
  const assignUser = async () => {
    if (!selectedServer) return
    
    try {
      const response = await fetch('/api/servers/assign-user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          serverId: selectedServer.id,
          username: selectedUsername || null
        })
      })
      
      if (response.ok) {
        setShowAssignModal(false)
        setSelectedServer(null)
        setSelectedUsername('')
        fetchServers() // Refresh list
      } else {
        const data = await response.json()
        console.error('Error assigning user:', data.error)
      }
    } catch (error) {
      console.error('Error assigning user:', error)
    }
  }

  useEffect(() => {
    if (session?.user && 'role' in session.user) {
      setUserRole(session.user.role as string)
      fetchServers()
    }
  }, [session])

  useEffect(() => {
    // Gọi fetchProxyCount ngay khi component mount
    fetchProxyCount()
  }, [])

  useEffect(() => {
    fetchServers()
  }, [statusFilter])

  useEffect(() => {
    if (userRole === 'ADMIN') {
      fetchUsers()
    }
  }, [userRole])

  const filteredServers = servers.filter(server => {
    const matchesSearch = server.host_url.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (server.username && server.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         server.id.toString().includes(searchQuery)
    return matchesSearch
  })

  const getStatusColor = (status: number) => {
    return status === 1 ? 'text-green-400 bg-green-400/20' : 'text-red-400 bg-red-400/20'
  }

  const getStatusText = (status: number) => {
    return status === 1 ? 'Active' : 'Inactive'
  }

  return (
    <div className="space-y-6 pr-0">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            Servers Management
          </h1>
          {/* <p className="text-[var(--text-secondary)] mb-2">
            {userRole === 'ADMIN' ? 'Manage all servers and assign users' : 'View your assigned servers'}
          </p> */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[var(--text-secondary)]">Available Proxies:</span>
            {isProxyLoading ? (
              <span className="text-sm text-[var(--text-secondary)]">Loading...</span>
            ) : (
              <span className="text-sm font-medium text-[var(--accent-color)]">
                {proxyCount !== null ? proxyCount : 'N/A'}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {userRole === 'ADMIN' && (
            <button className="flex items-center space-x-2 px-4 py-2 bg-[var(--accent-color)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" />
              <span>Add Server</span>
            </button>
          )}
          <button 
            onClick={() => {
              fetchServers()
              fetchProxyCount()
            }}
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)]"
            title="Refresh data"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading || isProxyLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
            <input
              type="text"
              placeholder="Search servers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]/50"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]/50"
          >
            <option value="all">All Status</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <div className="text-sm text-[var(--text-secondary)]">
            Total: {filteredServers.length} servers
          </div>
        </div>
      </div>

      {/* Servers Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loading text="Loading servers..." fullScreen={false} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredServers.map((server) => (
            <div
              key={server.id}
              className="bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] p-6 hover:shadow-lg transition-all duration-200 group"
            >
              {/* Header with ID and Status */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-500/20 text-blue-400 rounded-xl text-sm font-bold">
                    {server.id}
                  </span>
                  <Database className="w-5 h-5 text-[var(--text-secondary)]" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(server.status)}`}>
                  {getStatusText(server.status)}
                </span>
              </div>

              {/* Host URL */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Globe className="w-4 h-4 text-[var(--text-secondary)]" />
                  <span className="text-xs text-[var(--text-secondary)] font-medium">Host URL</span>
                </div>
                <p className="text-sm text-[var(--text-primary)] font-mono break-all leading-relaxed">
                  {server.host_url}
                </p>
              </div>

              {/* Username */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="w-4 h-4 text-[var(--text-secondary)]" />
                  <span className="text-xs text-[var(--text-secondary)] font-medium">Assigned User</span>
                </div>
                {server.username ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {server.username.slice(0, 1).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-[var(--text-primary)]">{server.username}</span>
                  </div>
                ) : (
                  <span className="text-sm text-[var(--text-secondary)] italic">Unassigned</span>
                )}
              </div>

              {/* Created Date */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-[var(--text-secondary)]" />
                  <span className="text-xs text-[var(--text-secondary)] font-medium">Created</span>
                </div>
                                 <span className="text-sm text-[var(--text-primary)]">
                   {new Date(server.createdAt).toLocaleDateString('en-US', {
                     month: 'short',
                     day: 'numeric',
                     year: 'numeric'
                   })}
                 </span>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {/* Common Actions for all users */}
                <div className="flex items-center justify-center space-x-2">
                  <button 
                    onClick={() => showCreateEmailConfirmation(server, false)}
                    disabled={emailButtonStates[server.id]}
                    className={`p-2 rounded-xl transition-all ${
                      emailButtonStates[server.id] 
                        ? 'text-gray-400 bg-gray-500/10 cursor-not-allowed' 
                        : 'text-[var(--text-secondary)] hover:text-green-400 bg-green-500/10 hover:bg-green-500/20'
                    }`}
                    title="Create Email"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                  {proxyCount !== null && proxyCount > 0 && (
                    <button 
                      onClick={() => showCreateEmailConfirmation(server, true)}
                      disabled={emailButtonStates[server.id]}
                      className={`p-2 rounded-xl transition-all ${
                        emailButtonStates[server.id] 
                          ? 'text-gray-400 bg-gray-500/10 cursor-not-allowed' 
                          : 'text-[var(--text-secondary)] hover:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20'
                      }`}
                      title={`Create Email with Proxy (${proxyCount} available)`}
                    >
                      <MailPlus className="w-4 h-4" />
                    </button>
                  )}
                  <button 
                    onClick={() => showDestroyConfirmation(server)}
                    className="p-2 text-[var(--text-secondary)] hover:text-orange-400 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 transition-all"
                    title="Destroy Session"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>

                {/* Admin-only Actions */}
                {userRole === 'ADMIN' && (
                  <div className="flex items-center justify-center space-x-2 pt-2 border-t border-[var(--border-color)]">
                    <button 
                      onClick={() => {
                        setSelectedServer(server)
                        setSelectedUsername(server.username || '')
                        setShowAssignModal(true)
                      }}
                      className="p-2 text-[var(--text-secondary)] hover:text-purple-400 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 transition-all"
                      title="Assign User"
                    >
                      <UserPlus className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-2 text-[var(--text-secondary)] hover:text-red-400 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition-all"
                      title="Delete Server"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredServers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-[var(--text-secondary)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Database className="w-8 h-8 text-[var(--text-secondary)]" />
          </div>
          <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">No servers found</h3>
          <p className="text-[var(--text-secondary)]">
            {userRole === 'VIEWER' 
              ? 'No servers assigned to you yet' 
              : 'Try adjusting your search or filter criteria'
            }
          </p>
        </div>
      )}

      {/* Assign User Modal */}
      {showAssignModal && userRole === 'ADMIN' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card-dialog rounded-3xl p-6 w-full max-w-md mx-4 border border-[var(--border-color)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Assign User to Server</h3>
              <button 
                onClick={() => setShowAssignModal(false)}
                className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-xl hover:bg-[var(--hover-bg)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[var(--text-primary)] mb-2 block">
                  Server: {selectedServer?.host_url}
                </label>
              </div>

              <div>
                <label className="text-sm font-medium text-[var(--text-primary)] mb-2 block">
                  Assign to User:
                </label>
                <select
                  value={selectedUsername}
                  onChange={(e) => setSelectedUsername(e.target.value)}
                  className="w-full px-3 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]/50"
                >
                  <option value="">Unassigned</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.username}>
                      {user.username} ({user.role})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={assignUser}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-[var(--accent-color)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  <Check className="w-4 h-4" />
                  <span>Assign</span>
                </button>
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-xl font-medium hover:bg-[var(--hover-bg)] transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Destroy Session Confirmation Modal */}
      {showDestroyConfirm && serverToDestroy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card-dialog border border-[var(--border-color)] rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
              Confirm Session Destruction
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              Are you sure you want to destroy all sessions for <strong>{serverToDestroy.host_url}</strong>?
            </p>
            <p className="text-sm text-orange-400 mb-6">
              This will log out all users from this server.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowDestroyConfirm(false)
                  setServerToDestroy(null)
                }}
                className="flex-1 px-4 py-2 border border-[var(--border-color)] rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDestroySession}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
              >
                Destroy Sessions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Email Confirmation Modal */}
      {showCreateEmailConfirm && emailToCreate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card-dialog border border-[var(--border-color)] rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
              Confirm Email Creation
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              Are you sure you want to create an email account for <strong>{emailToCreate.server.host_url}</strong>?
            </p>
            <p className="text-sm text-blue-400 mb-6">
              {emailToCreate.withProxy ? `This will use one of the ${proxyCount} available proxies.` : 'This will create a standard email account.'}
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowCreateEmailConfirm(false)
                  setEmailToCreate(null)
                }}
                className="flex-1 px-4 py-2 border border-[var(--border-color)] rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmCreateEmail}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              >
                Create Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}