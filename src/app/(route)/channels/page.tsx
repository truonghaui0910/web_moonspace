
'use client'

import { useState } from 'react'
import { 
  Hash, 
  Users, 
  Settings, 
  Plus, 
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  UserCheck,
  Clock,
  MessageCircle,
  Star,
  Lock,
  Unlock,
  TrendingUp,
  Activity,
  Zap,
  Eye,
  Shield,
  Crown
} from 'lucide-react'

interface Channel {
  id: string
  name: string
  description: string
  members: number
  lastActivity: string
  status: 'active' | 'inactive' | 'archived'
  isPrivate: boolean
  creator: string
  category: 'general' | 'development' | 'design' | 'marketing' | 'support'
  priority: 'high' | 'medium' | 'low'
}

export default function ChannelsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table')

  // Enhanced mock data
  const [channels, setChannels] = useState<Channel[]>([
    {
      id: '1',
      name: 'general',
      description: 'General discussion for everyone in the team',
      members: 145,
      lastActivity: '2 minutes ago',
      status: 'active',
      isPrivate: false,
      creator: 'Admin',
      category: 'general',
      priority: 'high'
    },
    {
      id: '2',
      name: 'development',
      description: 'Technical discussions, code reviews, and development updates',
      members: 32,
      lastActivity: '1 hour ago',
      status: 'active',
      isPrivate: false,
      creator: 'John Doe',
      category: 'development',
      priority: 'high'
    },
    {
      id: '3',
      name: 'design-vault',
      description: 'UI/UX design discussions and creative brainstorming',
      members: 18,
      lastActivity: '3 hours ago',
      status: 'active',
      isPrivate: true,
      creator: 'Jane Smith',
      category: 'design',
      priority: 'medium'
    },
    {
      id: '4',
      name: 'random-fun',
      description: 'Random conversations, memes, and team bonding',
      members: 89,
      lastActivity: '5 minutes ago',
      status: 'active',
      isPrivate: false,
      creator: 'Mike Johnson',
      category: 'general',
      priority: 'low'
    },
    {
      id: '5',
      name: 'announcements',
      description: 'Important company-wide announcements and updates',
      members: 203,
      lastActivity: '1 day ago',
      status: 'archived',
      isPrivate: false,
      creator: 'Admin',
      category: 'general',
      priority: 'high'
    },
    {
      id: '6',
      name: 'marketing-hub',
      description: 'Marketing strategies, campaigns, and analytics',
      members: 24,
      lastActivity: '30 minutes ago',
      status: 'active',
      isPrivate: true,
      creator: 'Sarah Connor',
      category: 'marketing',
      priority: 'medium'
    }
  ])

  const filteredChannels = channels.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         channel.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || channel.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleSelectChannel = (channelId: string) => {
    setSelectedChannels(prev => 
      prev.includes(channelId) 
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    )
  }

  const handleSelectAll = () => {
    if (selectedChannels.length === filteredChannels.length) {
      setSelectedChannels([])
    } else {
      setSelectedChannels(filteredChannels.map(c => c.id))
    }
  }

  const handleJoinChannel = (channelId: string) => {
    console.log('Joining channel:', channelId)
    // Join logic here
  }

  const handleClearSelection = () => {
    setSelectedChannels([])
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active': return { 
        color: 'text-green-300 bg-green-400/20 border-green-400/30', 
        icon: Activity,
        pulse: true 
      }
      case 'inactive': return { 
        color: 'text-yellow-300 bg-yellow-400/20 border-yellow-400/30', 
        icon: Clock,
        pulse: false 
      }
      case 'archived': return { 
        color: 'text-gray-300 bg-gray-400/20 border-gray-400/30', 
        icon: Shield,
        pulse: false 
      }
      default: return { 
        color: 'text-purple-300 bg-purple-400/20 border-purple-400/30', 
        icon: Star,
        pulse: false 
      }
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'development': return <Hash className="w-4 h-4" />
      case 'design': return <Star className="w-4 h-4" />
      case 'marketing': return <TrendingUp className="w-4 h-4" />
      case 'support': return <Shield className="w-4 h-4" />
      default: return <MessageCircle className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-300'
      case 'medium': return 'text-yellow-300'
      case 'low': return 'text-green-300'
      default: return 'text-purple-300'
    }
  }

  return (
    <div className="space-y-8">
      {/* Animated Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-3xl blur-xl"></div>
        <div className="relative bg-gradient-to-r from-purple-800/40 to-violet-800/40 backdrop-blur-xl rounded-3xl border border-purple-400/20 p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-violet-300 to-indigo-300 bg-clip-text text-transparent">
                Channel Universe
              </h1>
              <p className="text-purple-200/80 text-lg">Discover, manage, and explore all communication realms</p>
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center space-x-2 text-purple-300/60">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{channels.reduce((acc, c) => acc + c.members, 0)} Total Members</span>
                </div>
                <div className="flex items-center space-x-2 text-green-300/60">
                  <Activity className="w-4 h-4" />
                  <span className="text-sm">{channels.filter(c => c.status === 'active').length} Active Channels</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-400 hover:to-violet-400 text-white rounded-2xl transition-all duration-300 font-medium shadow-lg shadow-purple-500/20 group">
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                <span>Create Channel</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 rounded-2xl transition-all duration-300 border border-purple-400/30">
                <Settings className="w-5 h-5" />
                <span>Manage</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Controls */}
      <div className="bg-gradient-to-r from-purple-800/30 to-violet-800/30 backdrop-blur-xl rounded-2xl border border-purple-400/20 p-6">
        <div className="flex flex-col xl:flex-row gap-6 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-xl blur-sm"></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search channels..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 w-full bg-purple-700/40 border border-purple-400/40 rounded-xl text-purple-100 placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                />
              </div>
            </div>
            
            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-4 h-4 z-10" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-12 pr-10 py-3 bg-purple-700/40 border border-purple-400/40 rounded-xl text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent appearance-none cursor-pointer min-w-[160px]"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Selection Info & Actions */}
          {selectedChannels.length > 0 && (
            <div className="flex items-center space-x-4 bg-purple-600/20 rounded-xl px-4 py-2 border border-purple-400/30">
              <span className="text-purple-200 text-sm font-medium">
                {selectedChannels.length} channel{selectedChannels.length > 1 ? 's' : ''} selected
              </span>
              <button
                onClick={handleClearSelection}
                className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors text-sm font-medium border border-red-400/30"
              >
                Clear All
              </button>
              <button
                onClick={() => console.log('Bulk action')}
                className="px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors text-sm font-medium border border-purple-400/30"
              >
                Bulk Action
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Channels Table */}
      <div className="bg-gradient-to-b from-purple-800/20 to-violet-800/20 backdrop-blur-xl rounded-2xl border border-purple-400/20 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-700/40 to-violet-700/40 border-b border-purple-400/30">
              <tr>
                <th className="p-6 text-left">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedChannels.length === filteredChannels.length && filteredChannels.length > 0}
                      onChange={handleSelectAll}
                      className="w-5 h-5 text-purple-500 bg-purple-700/40 border-purple-400/50 rounded-lg focus:ring-purple-400 focus:ring-2"
                    />
                    <span className="text-purple-200 font-semibold text-sm">SELECT</span>
                  </div>
                </th>
                <th className="p-6 text-left text-purple-200 font-semibold">CHANNEL</th>
                <th className="p-6 text-left text-purple-200 font-semibold">CATEGORY</th>
                <th className="p-6 text-left text-purple-200 font-semibold">MEMBERS</th>
                <th className="p-6 text-left text-purple-200 font-semibold">STATUS</th>
                <th className="p-6 text-left text-purple-200 font-semibold">PRIORITY</th>
                <th className="p-6 text-left text-purple-200 font-semibold">ACTIVITY</th>
                <th className="p-6 text-left text-purple-200 font-semibold">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredChannels.map((channel, index) => {
                const statusConfig = getStatusConfig(channel.status)
                const StatusIcon = statusConfig.icon
                
                return (
                  <tr 
                    key={channel.id}
                    className={`border-b border-purple-400/10 hover:bg-purple-500/10 transition-all duration-300 group ${
                      index % 2 === 0 ? 'bg-purple-800/10' : 'bg-transparent'
                    }`}
                  >
                    <td className="p-6">
                      <input
                        type="checkbox"
                        checked={selectedChannels.includes(channel.id)}
                        onChange={() => handleSelectChannel(channel.id)}
                        className="w-5 h-5 text-purple-500 bg-purple-700/40 border-purple-400/50 rounded-lg focus:ring-purple-400 focus:ring-2"
                      />
                    </td>
                    
                    <td className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`relative p-3 rounded-2xl ${channel.isPrivate ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30' : 'bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-400/30'}`}>
                          {channel.isPrivate ? (
                            <Lock className="w-5 h-5 text-orange-300" />
                          ) : (
                            <Hash className="w-5 h-5 text-purple-300" />
                          )}
                          {channel.priority === 'high' && (
                            <Crown className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-purple-100 font-semibold text-lg">#{channel.name}</span>
                            {channel.isPrivate && (
                              <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded-lg text-xs font-medium border border-orange-400/30">
                                Private
                              </span>
                            )}
                          </div>
                          <p className="text-purple-300/80 text-sm mt-1 line-clamp-2">{channel.description}</p>
                          <p className="text-purple-400/60 text-xs mt-1">Created by {channel.creator}</p>
                        </div>
                      </div>
                    </td>
                    
                    <td className="p-6">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-400/30">
                          {getCategoryIcon(channel.category)}
                        </div>
                        <span className="text-purple-200 capitalize font-medium">{channel.category}</span>
                      </div>
                    </td>
                    
                    <td className="p-6">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 text-purple-200">
                          <Users className="w-5 h-5" />
                          <span className="font-semibold text-lg">{channel.members.toLocaleString()}</span>
                        </div>
                        <div className="flex -space-x-2">
                          {[...Array(Math.min(3, Math.floor(channel.members / 20)))].map((_, i) => (
                            <div key={i} className="w-8 h-8 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full border-2 border-purple-800 flex items-center justify-center text-white text-xs font-bold">
                              {String.fromCharCode(65 + i)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                    
                    <td className="p-6">
                      <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium border ${statusConfig.color} ${statusConfig.pulse ? 'animate-pulse' : ''}`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="capitalize">{channel.status}</span>
                      </div>
                    </td>
                    
                    <td className="p-6">
                      <div className={`flex items-center space-x-2 ${getPriorityColor(channel.priority)}`}>
                        <div className={`w-3 h-3 rounded-full ${
                          channel.priority === 'high' ? 'bg-red-400' : 
                          channel.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                        }`}></div>
                        <span className="capitalize font-medium">{channel.priority}</span>
                      </div>
                    </td>
                    
                    <td className="p-6">
                      <div className="flex items-center space-x-2 text-purple-300">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{channel.lastActivity}</span>
                      </div>
                    </td>
                    
                    <td className="p-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleJoinChannel(channel.id)}
                          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-violet-500/20 hover:from-purple-500/30 hover:to-violet-500/30 text-purple-200 rounded-xl transition-all duration-300 border border-purple-400/30 group"
                        >
                          <UserCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-medium">Join</span>
                        </button>
                        
                        <div className="relative group">
                          <button className="p-2 text-purple-400 hover:text-purple-200 hover:bg-purple-500/20 rounded-xl transition-all duration-300 border border-transparent hover:border-purple-400/30">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                          
                          <div className="absolute right-0 top-10 bg-gradient-to-b from-purple-800/90 to-violet-800/90 backdrop-blur-xl border border-purple-400/30 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-20 min-w-[160px]">
                            <button className="flex items-center space-x-3 px-4 py-3 text-purple-200 hover:text-purple-100 hover:bg-purple-500/20 w-full text-left rounded-t-xl transition-colors">
                              <Eye className="w-4 h-4" />
                              <span className="text-sm">View Details</span>
                            </button>
                            <button className="flex items-center space-x-3 px-4 py-3 text-purple-200 hover:text-purple-100 hover:bg-purple-500/20 w-full text-left transition-colors">
                              <Edit className="w-4 h-4" />
                              <span className="text-sm">Edit Channel</span>
                            </button>
                            <button className="flex items-center space-x-3 px-4 py-3 text-red-300 hover:text-red-200 hover:bg-red-500/20 w-full text-left rounded-b-xl transition-colors">
                              <Trash2 className="w-4 h-4" />
                              <span className="text-sm">Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredChannels.length === 0 && (
          <div className="p-16 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-purple-400/30">
              <MessageCircle className="w-10 h-10 text-purple-300" />
            </div>
            <h3 className="text-purple-200 text-xl font-semibold mb-3">No channels found</h3>
            <p className="text-purple-300/80 mb-6">Try adjusting your search criteria or create a new channel to get started.</p>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-xl hover:from-purple-400 hover:to-violet-400 transition-all duration-300 font-medium">
              Create Your First Channel
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative bg-gradient-to-r from-purple-800/40 to-violet-800/40 backdrop-blur-xl rounded-2xl border border-purple-400/20 p-6 hover:border-purple-400/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300/80 text-sm font-medium">Total Channels</p>
                <p className="text-3xl font-bold text-purple-200 mt-1">{channels.length}</p>
                <p className="text-green-400 text-xs mt-2 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% from last month
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-2xl border border-purple-400/30">
                <Hash className="w-8 h-8 text-purple-300" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative bg-gradient-to-r from-green-800/40 to-emerald-800/40 backdrop-blur-xl rounded-2xl border border-green-400/20 p-6 hover:border-green-400/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300/80 text-sm font-medium">Active Channels</p>
                <p className="text-3xl font-bold text-green-200 mt-1">{channels.filter(c => c.status === 'active').length}</p>
                <p className="text-green-400 text-xs mt-2 flex items-center">
                  <Activity className="w-3 h-3 mr-1 animate-pulse" />
                  Live activity
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-400/30">
                <Activity className="w-8 h-8 text-green-300" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative bg-gradient-to-r from-blue-800/40 to-indigo-800/40 backdrop-blur-xl rounded-2xl border border-blue-400/20 p-6 hover:border-blue-400/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300/80 text-sm font-medium">Total Members</p>
                <p className="text-3xl font-bold text-blue-200 mt-1">{channels.reduce((acc, c) => acc + c.members, 0).toLocaleString()}</p>
                <p className="text-blue-400 text-xs mt-2 flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  Across all channels
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl border border-blue-400/30">
                <Users className="w-8 h-8 text-blue-300" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative bg-gradient-to-r from-yellow-800/40 to-orange-800/40 backdrop-blur-xl rounded-2xl border border-yellow-400/20 p-6 hover:border-yellow-400/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-300/80 text-sm font-medium">Private Channels</p>
                <p className="text-3xl font-bold text-yellow-200 mt-1">{channels.filter(c => c.isPrivate).length}</p>
                <p className="text-yellow-400 text-xs mt-2 flex items-center">
                  <Lock className="w-3 h-3 mr-1" />
                  Secure spaces
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl border border-yellow-400/30">
                <Lock className="w-8 h-8 text-yellow-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
