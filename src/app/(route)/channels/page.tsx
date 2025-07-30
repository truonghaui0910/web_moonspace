
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
  MessageCircle
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
}

export default function ChannelsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])

  // Mock data - in real app this would come from API
  const [channels, setChannels] = useState<Channel[]>([
    {
      id: '1',
      name: 'general',
      description: 'General discussion for everyone',
      members: 45,
      lastActivity: '2 minutes ago',
      status: 'active',
      isPrivate: false,
      creator: 'Admin'
    },
    {
      id: '2',
      name: 'development',
      description: 'Technical discussions and code reviews',
      members: 12,
      lastActivity: '1 hour ago',
      status: 'active',
      isPrivate: false,
      creator: 'John Doe'
    },
    {
      id: '3',
      name: 'design',
      description: 'UI/UX design discussions',
      members: 8,
      lastActivity: '3 hours ago',
      status: 'inactive',
      isPrivate: true,
      creator: 'Jane Smith'
    },
    {
      id: '4',
      name: 'random',
      description: 'Random conversations and fun stuff',
      members: 23,
      lastActivity: '5 minutes ago',
      status: 'active',
      isPrivate: false,
      creator: 'Mike Johnson'
    },
    {
      id: '5',
      name: 'announcements',
      description: 'Important company announcements',
      members: 67,
      lastActivity: '1 day ago',
      status: 'archived',
      isPrivate: false,
      creator: 'Admin'
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
    // Add join logic here
  }

  const handleClearSelection = () => {
    setSelectedChannels([])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20'
      case 'inactive': return 'text-yellow-400 bg-yellow-400/20'
      case 'archived': return 'text-gray-400 bg-gray-400/20'
      default: return 'text-purple-400 bg-purple-400/20'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-yellow-300">Channels</h1>
          <p className="text-purple-200 mt-1">Manage and explore all communication channels</p>
        </div>
        
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition-all duration-200 font-medium">
          <Plus className="w-4 h-4" />
          <span>Create Channel</span>
        </button>
      </div>

      {/* Controls */}
      <div className="bg-purple-800/30 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-4 h-4" />
              <input
                type="text"
                placeholder="Search channels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-purple-700/50 border border-purple-500/30 rounded-xl text-purple-100 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent w-full sm:w-80"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-4 h-4" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 bg-purple-700/50 border border-purple-500/30 rounded-xl text-purple-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {selectedChannels.length > 0 && (
            <div className="flex items-center space-x-3">
              <span className="text-yellow-300 text-sm font-medium">
                {selectedChannels.length} selected
              </span>
              <button
                onClick={handleClearSelection}
                className="px-3 py-1 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Channels Table */}
      <div className="bg-purple-800/30 backdrop-blur-sm rounded-2xl border border-purple-500/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-purple-700/50 border-b border-purple-500/30">
              <tr>
                <th className="p-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedChannels.length === filteredChannels.length && filteredChannels.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-yellow-500 bg-purple-700 border-purple-500 rounded focus:ring-yellow-400"
                  />
                </th>
                <th className="p-4 text-left text-yellow-300 font-semibold">Channel</th>
                <th className="p-4 text-left text-yellow-300 font-semibold">Members</th>
                <th className="p-4 text-left text-yellow-300 font-semibold">Status</th>
                <th className="p-4 text-left text-yellow-300 font-semibold">Last Activity</th>
                <th className="p-4 text-left text-yellow-300 font-semibold">Creator</th>
                <th className="p-4 text-left text-yellow-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredChannels.map((channel, index) => (
                <tr 
                  key={channel.id}
                  className={`border-b border-purple-500/20 hover:bg-purple-700/20 transition-colors ${
                    index % 2 === 0 ? 'bg-purple-800/10' : 'bg-transparent'
                  }`}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedChannels.includes(channel.id)}
                      onChange={() => handleSelectChannel(channel.id)}
                      className="w-4 h-4 text-yellow-500 bg-purple-700 border-purple-500 rounded focus:ring-yellow-400"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${channel.isPrivate ? 'bg-orange-500/20' : 'bg-green-500/20'}`}>
                        <Hash className={`w-4 h-4 ${channel.isPrivate ? 'text-orange-400' : 'text-green-400'}`} />
                      </div>
                      <div>
                        <div className="text-purple-100 font-medium">#{channel.name}</div>
                        <div className="text-purple-300 text-sm">{channel.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2 text-purple-200">
                      <Users className="w-4 h-4" />
                      <span>{channel.members}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(channel.status)}`}>
                      {channel.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2 text-purple-200">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{channel.lastActivity}</span>
                    </div>
                  </td>
                  <td className="p-4 text-purple-200">{channel.creator}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleJoinChannel(channel.id)}
                        className="flex items-center space-x-1 px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-lg hover:bg-yellow-500/30 transition-colors text-sm"
                      >
                        <UserCheck className="w-3 h-3" />
                        <span>Join</span>
                      </button>
                      
                      <div className="relative group">
                        <button className="p-2 text-purple-300 hover:text-yellow-300 hover:bg-purple-700/30 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        
                        {/* Dropdown menu - you can implement this with a proper dropdown library */}
                        <div className="absolute right-0 top-8 bg-purple-800 border border-purple-500/30 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-10">
                          <button className="flex items-center space-x-2 px-3 py-2 text-purple-200 hover:text-yellow-300 hover:bg-purple-700/50 w-full text-left">
                            <Edit className="w-3 h-3" />
                            <span className="text-sm">Edit</span>
                          </button>
                          <button className="flex items-center space-x-2 px-3 py-2 text-red-300 hover:text-red-200 hover:bg-red-500/20 w-full text-left">
                            <Trash2 className="w-3 h-3" />
                            <span className="text-sm">Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredChannels.length === 0 && (
          <div className="p-12 text-center">
            <MessageCircle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-purple-200 text-lg font-medium mb-2">No channels found</h3>
            <p className="text-purple-300 text-sm">Try adjusting your search or create a new channel.</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-purple-600/30 to-purple-700/30 backdrop-blur-sm rounded-xl border border-purple-500/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-200 text-sm">Total Channels</p>
              <p className="text-2xl font-bold text-yellow-300">{channels.length}</p>
            </div>
            <Hash className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-600/30 to-green-700/30 backdrop-blur-sm rounded-xl border border-green-500/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-200 text-sm">Active Channels</p>
              <p className="text-2xl font-bold text-green-300">{channels.filter(c => c.status === 'active').length}</p>
            </div>
            <MessageCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-600/30 to-yellow-700/30 backdrop-blur-sm rounded-xl border border-yellow-500/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-200 text-sm">Total Members</p>
              <p className="text-2xl font-bold text-yellow-300">{channels.reduce((acc, c) => acc + c.members, 0)}</p>
            </div>
            <Users className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>
    </div>
  )
}
