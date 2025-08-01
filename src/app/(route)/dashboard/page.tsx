'use client'

import { useState } from 'react'
import { 
  Play, 
  Square, 
  RotateCcw, 
  Download,
  Upload,
  Settings,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  Search,
  Filter,
  MoreHorizontal,
  ChevronDown,
  Plus,
  Users,
  TrendingUp,
  Calendar,
  Globe,
  Lock,
  AlertCircle,
  Check,
  X,
  ArrowUpDown,
  ExternalLink,
  Copy,
  Archive,
  RefreshCw,
  Zap,
  ChevronRight,
  Folder,
  Network,
  Shield,
  UserPlus,
  Database,
  BarChart3,
  FileText,
  Key
} from 'lucide-react'

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedChannels, setSelectedChannels] = useState(new Set())
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('growth')
  const [filterStatus, setFilterStatus] = useState('all')
  const [viewMode, setViewMode] = useState('grid') // grid or list

  const [channels, setChannels] = useState([
    {
      id: 1,
      name: 'Love Life Lyrics',
      channelId: '262390',
      email: 'vitlonba@gmail.com',
      username: 'nhungmusic',
      handle: '@LoveLifeLyrics',
      subscribers: 2690000,
      totalViews: 1168708999,
      growth: 147968,
      growthPercent: 23,
      status: 'active',
      type: 'MAIN_CHANNEL',
      hub: 'On',
      dateCreated: '2010/09/11',
      lastUpdate: '1 hour ago',
      tags: ['MAIN_CHANNEL'],
      avatar: 'LL',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 2,
      name: 'miss daisy',
      channelId: '318553',
      email: 'sanidprisan2509@gmail.com',
      username: 'quynhanhmusic',
      handle: '@miss_daisy52',
      subscribers: 83300,
      totalViews: 33499868,
      growth: 111923,
      growthPercent: -55,
      status: 'inactive',
      type: 'BADDIE_VIBES_CLONE',
      hub: 'Off',
      dateCreated: '2023/03/15',
      lastUpdate: '7 months ago',
      tags: ['BADDIE_VIBES', 'CLONE'],
      avatar: 'MD',
      color: 'from-pink-500 to-red-500'
    },
    {
      id: 3,
      name: 'Sunset Memory',
      channelId: '321152',
      email: 'alvyyou12@gmail.com',
      username: 'ketmusic',
      handle: '@Sunset_Memory',
      subscribers: 10200,
      totalViews: 8786825,
      growth: 101675,
      growthPercent: 18,
      status: 'active',
      type: 'BOOM_LYRICS',
      hub: 'On',
      dateCreated: '2025/04/08',
      lastUpdate: '2 months ago',
      tags: ['BOOM', 'LYRICS'],
      avatar: 'SM',
      color: 'from-orange-500 to-purple-500'
    },
    {
      id: 4,
      name: 'Melody Dreams',
      channelId: '445221',
      email: 'melody@example.com',
      username: 'melodymusic',
      handle: '@MelodyDreams',
      subscribers: 156000,
      totalViews: 45332211,
      growth: 23415,
      growthPercent: 12,
      status: 'active',
      type: 'MUSIC_CHANNEL',
      hub: 'On',
      dateCreated: '2022/08/20',
      lastUpdate: '3 hours ago',
      tags: ['MUSIC', 'TRENDING'],
      avatar: 'MD',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 5,
      name: 'Night Vibes',
      channelId: '556789',
      email: 'night@vibes.com',
      username: 'nightvibes',
      handle: '@NightVibes',
      subscribers: 892000,
      totalViews: 234567890,
      growth: 67890,
      growthPercent: 31,
      status: 'active',
      type: 'CHILL_MUSIC',
      hub: 'On',
      dateCreated: '2021/11/15',
      lastUpdate: '5 hours ago',
      tags: ['CHILL', 'NIGHT'],
      avatar: 'NV',
      color: 'from-indigo-500 to-purple-500'
    }
  ])

  // Filter and sort channels
  const filteredChannels = channels
    .filter(channel => {
      const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           channel.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           channel.channelId.includes(searchQuery)
      const matchesFilter = filterStatus === 'all' || channel.status === filterStatus
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'growth':
          return b.growthPercent - a.growthPercent
        case 'subscribers':
          return b.subscribers - a.subscribers
        case 'views':
          return b.totalViews - a.totalViews
        case 'name':
          return a.name.localeCompare(b.name)
        case 'created':
          return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
        default:
          return 0
      }
    })

  const handleSelectChannel = (id: number) => {
    const newSelected = new Set(selectedChannels)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedChannels(newSelected)
    setShowBulkActions(newSelected.size > 0)
  }

  const handleSelectAll = () => {
    if (selectedChannels.size === filteredChannels.length) {
      setSelectedChannels(new Set())
      setShowBulkActions(false)
    } else {
      setSelectedChannels(new Set(filteredChannels.map(c => c.id)))
      setShowBulkActions(true)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B'
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-green-400 bg-green-400/20' : 'text-red-400 bg-red-400/20'
  }

  const getGrowthColor = (percent: number) => {
    return percent >= 0 ? 'text-green-400' : 'text-red-400'
  }

  const BulkActionsSidebar = () => (
    <div className={`fixed top-0 right-0 h-full w-80 bg-[var(--bg-card)] backdrop-blur-xl border-l border-[var(--border-color)] shadow-2xl transform transition-transform duration-300 z-40 ${
      showBulkActions ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Channel Actions</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              {selectedChannels.size} channel{selectedChannels.size !== 1 ? 's' : ''} selected
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedChannels(new Set())
              setShowBulkActions(false)
            }}
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-xl hover:bg-[var(--hover-bg)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Actions */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Search Actions */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search actions..."
              className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-secondary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]/50"
            />
          </div>

          {/* Channel Management Section */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Channel Management
            </h4>
            
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 text-left text-[var(--text-primary)] hover:bg-[var(--hover-bg)] rounded-xl transition-colors text-sm">
                <div className="flex items-center">
                  <Archive className="w-4 h-4 mr-3 text-[var(--text-secondary)]" />
                  <span>Move Channel</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 text-left text-[var(--text-primary)] hover:bg-[var(--hover-bg)] rounded-xl transition-colors text-sm">
                <div className="flex items-center">
                  <UserPlus className="w-4 h-4 mr-3 text-[var(--text-secondary)]" />
                  <span>Add to Group</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 text-left text-[var(--text-primary)] hover:bg-[var(--hover-bg)] rounded-xl transition-colors text-sm">
                <div className="flex items-center">
                  <Settings className="w-4 h-4 mr-3 text-[var(--text-secondary)]" />
                  <span>Config</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 text-left text-[var(--text-primary)] hover:bg-[var(--hover-bg)] rounded-xl transition-colors text-sm">
                <div className="flex items-center">
                  <Network className="w-4 h-4 mr-3 text-[var(--text-secondary)]" />
                  <span>Set IP</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 text-left text-red-400 hover:bg-red-500/10 rounded-xl transition-colors text-sm">
                <div className="flex items-center">
                  <Trash2 className="w-4 h-4 mr-3" />
                  <span>Delete Channel</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Video Management Section */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center">
              <Play className="w-4 h-4 mr-2" />
              Video Management
            </h4>
            
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 text-left text-[var(--text-primary)] hover:bg-[var(--hover-bg)] rounded-xl transition-colors text-sm">
                <div className="flex items-center">
                  <Trash2 className="w-4 h-4 mr-3 text-[var(--text-secondary)]" />
                  <span>Delete Videos</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 text-left text-[var(--text-primary)] hover:bg-[var(--hover-bg)] rounded-xl transition-colors text-sm">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-3 text-[var(--text-secondary)]" />
                  <span>Check Views</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 text-left text-[var(--text-primary)] hover:bg-[var(--hover-bg)] rounded-xl transition-colors text-sm">
                <div className="flex items-center">
                  <Plus className="w-4 h-4 mr-3 text-[var(--text-secondary)]" />
                  <span>Create Channel</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
              </button>
            </div>
          </div>

          {/* Analytics Section */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics & Reports
            </h4>
            
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 text-left text-[var(--text-primary)] hover:bg-[var(--hover-bg)] rounded-xl transition-colors text-sm">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-3 text-[var(--text-secondary)]" />
                  <span>Growth Analysis</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 text-left text-[var(--text-primary)] hover:bg-[var(--hover-bg)] rounded-xl transition-colors text-sm">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-3 text-[var(--text-secondary)]" />
                  <span>Export Data</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 text-left text-[var(--text-primary)] hover:bg-[var(--hover-bg)] rounded-xl transition-colors text-sm">
                <div className="flex items-center">
                  <Database className="w-4 h-4 mr-3 text-[var(--text-secondary)]" />
                  <span>Sync Data</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
              </button>
            </div>
          </div>

          {/* Security Section */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Security Settings
            </h4>
            
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 text-left text-[var(--text-primary)] hover:bg-[var(--hover-bg)] rounded-xl transition-colors text-sm">
                <div className="flex items-center">
                  <Key className="w-4 h-4 mr-3 text-[var(--text-secondary)]" />
                  <span>Change Password</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 text-left text-[var(--text-primary)] hover:bg-[var(--hover-bg)] rounded-xl transition-colors text-sm">
                <div className="flex items-center">
                  <Lock className="w-4 h-4 mr-3 text-[var(--text-secondary)]" />
                  <span>Access Control</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
              </button>
            </div>
          </div>
        </div>

        {/* Execute Buttons */}
        <div className="p-6 border-t border-[var(--border-color)] space-y-3">
          <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[var(--accent-color)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
            <Zap className="w-4 h-4" />
            <span>Execute</span>
          </button>
          
          <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>Execute & Reload</span>
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col lg:flex-row gap-6 pr-0">
      {/* Main Content - Left Column (75%) */}
      <div className="w-full lg:w-3/4 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Dashboard</h1>
            <p className="text-[var(--text-secondary)]">Overview and manage your YouTube channels performance</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-[var(--accent-color)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" />
              <span>Add Channel</span>
            </button>
            <button className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)]">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div>
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Channel Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[var(--bg-card)] rounded-3xl p-6 border border-[var(--border-color)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--text-secondary)] text-sm">Total Channels</p>
                  <p className="text-2xl font-bold text-[var(--text-primary)]">{channels.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-[var(--bg-card)] rounded-3xl p-6 border border-[var(--border-color)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--text-secondary)] text-sm">Total Subscribers</p>
                  <p className="text-2xl font-bold text-[var(--text-primary)]">
                    {formatNumber(channels.reduce((sum, ch) => sum + ch.subscribers, 0))}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-[var(--bg-card)] rounded-3xl p-6 border border-[var(--border-color)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--text-secondary)] text-sm">Total Views</p>
                  <p className="text-2xl font-bold text-[var(--text-primary)]">
                    {formatNumber(channels.reduce((sum, ch) => sum + ch.totalViews, 0))}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </div>

            <div className="bg-[var(--bg-card)] rounded-3xl p-6 border border-[var(--border-color)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--text-secondary)] text-sm">Avg Growth</p>
                  <p className="text-2xl font-bold text-green-400">
                    +{Math.round(channels.reduce((sum, ch) => sum + ch.growthPercent, 0) / channels.length)}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
              <input
                type="text"
                placeholder="Search channels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]/50"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]/50"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]/50"
            >
              <option value="growth">Sort by Growth</option>
              <option value="subscribers">Sort by Subscribers</option>
              <option value="views">Sort by Views</option>
              <option value="name">Sort by Name</option>
              <option value="created">Sort by Date</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleSelectAll}
              className="flex items-center space-x-2 px-4 py-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] hover:bg-[var(--hover-bg)] transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Select All</span>
            </button>
          </div>
        </div>

        {/* Channels List */}
        <div>
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Your Channels</h2>
          <div className="space-y-3">
            {filteredChannels.map((channel) => (
              <div
                key={channel.id}
                className={`bg-[var(--bg-card)] rounded-xl border transition-all duration-200 hover:shadow-md ${
                  selectedChannels.has(channel.id) 
                    ? 'border-[var(--accent-color)] ring-2 ring-[var(--accent-color)]/20' 
                    : 'border-[var(--border-color)]'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    {/* Left: Checkbox + Channel Info */}
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <input
                        type="checkbox"
                        checked={selectedChannels.has(channel.id)}
                        onChange={() => handleSelectChannel(channel.id)}
                        className="w-4 h-4 text-[var(--accent-color)] bg-[var(--bg-card)] border-[var(--border-color)] rounded focus:ring-[var(--accent-color)]/50"
                      />
                      
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${channel.color} flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0`}>
                        {channel.avatar}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-bold text-[var(--text-primary)] truncate text-lg">
                            {channel.name}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(channel.status)} flex-shrink-0`}>
                            {channel.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-[var(--text-secondary)]">
                          <span>#{channel.channelId}</span>
                          <span>{channel.handle}</span>
                          <span className="text-xs bg-[var(--text-secondary)]/10 px-2 py-1 rounded">
                            {channel.tags[0]}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Center: Stats */}
                    <div className="hidden lg:flex items-center space-x-8 px-6">
                      <div className="text-center">
                        <p className="text-sm font-bold text-[var(--text-primary)]">
                          {formatNumber(channel.subscribers)}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)]">Subs</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm font-bold text-[var(--text-primary)]">
                          {formatNumber(channel.totalViews)}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)]">Views</p>
                      </div>
                      
                      <div className="text-center">
                        <p className={`text-sm font-bold ${getGrowthColor(channel.growthPercent)}`}>
                          {channel.growthPercent >= 0 ? '+' : ''}{channel.growthPercent}%
                        </p>
                        <p className="text-xs text-[var(--text-secondary)]">Growth</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm font-bold text-[var(--text-primary)]">
                          {channel.hub}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)]">Hub</p>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <button className="p-2 text-[var(--text-secondary)] hover:text-blue-400 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-all">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-[var(--text-secondary)] hover:text-green-400 rounded-lg bg-green-500/10 hover:bg-green-500/20 transition-all">
                        <Settings className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-bg)] transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Mobile Stats - Only visible on smaller screens */}
                  <div className="lg:hidden mt-3 pt-3 border-t border-[var(--border-color)]">
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-sm font-bold text-[var(--text-primary)]">
                          {formatNumber(channel.subscribers)}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)]">Subs</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[var(--text-primary)]">
                          {formatNumber(channel.totalViews)}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)]">Views</p>
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${getGrowthColor(channel.growthPercent)}`}>
                          {channel.growthPercent >= 0 ? '+' : ''}{channel.growthPercent}%
                        </p>
                        <p className="text-xs text-[var(--text-secondary)]">Growth</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[var(--text-primary)]">
                          {channel.hub}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)]">Hub</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredChannels.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[var(--text-secondary)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-[var(--text-secondary)]" />
              </div>
              <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">No channels found</h3>
              <p className="text-[var(--text-secondary)]">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar (25%) */}
      <div className="w-full lg:w-1/4 space-y-6">
        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Quick Actions</h2>
          <div className="bg-[var(--bg-card)] rounded-3xl p-6 border border-[var(--border-color)] space-y-3">
            <button className="w-full flex items-center space-x-3 p-3 text-left text-[var(--text-primary)] hover:bg-[var(--hover-bg)] rounded-xl transition-colors">
              <Plus className="w-5 h-5 text-blue-500" />
              <span>Create New Channel</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 text-left text-[var(--text-primary)] hover:bg-[var(--hover-bg)] rounded-xl transition-colors">
              <Download className="w-5 h-5 text-green-500" />
              <span>Export Data</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 text-left text-[var(--text-primary)] hover:bg-[var(--hover-bg)] rounded-xl transition-colors">
              <RefreshCw className="w-5 h-5 text-orange-500" />
              <span>Sync All Channels</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 text-left text-[var(--text-primary)] hover:bg-[var(--hover-bg)] rounded-xl transition-colors">
              <BarChart3 className="w-5 h-5 text-purple-500" />
              <span>View Analytics</span>
            </button>
          </div>
        </div>

        {/* Channel Performance */}
        <div>
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Top Performers</h2>
          <div className="bg-[var(--bg-card)] rounded-3xl p-6 border border-[var(--border-color)] space-y-4">
            {channels.slice(0, 3).map((channel, index) => (
              <div key={channel.id} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">{channel.name}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{formatNumber(channel.subscribers)} subscribers</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${getGrowthColor(channel.growthPercent)}`}>
                    {channel.growthPercent >= 0 ? '+' : ''}{channel.growthPercent}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bulk Actions Sidebar */}
      <BulkActionsSidebar />

      {/* Overlay when sidebar is open */}
      {showBulkActions && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => {
            setSelectedChannels(new Set())
            setShowBulkActions(false)
          }}
        />
      )}
    </div>
  )
}