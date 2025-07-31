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
  Loader2
} from 'lucide-react'

export default function ChannelsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [channels, setChannels] = useState([
    {
      id: 1,
      name: 'Foldable Mini Drone',
      number: '80201',
      payment: 'Due',
      status: 'Pending',
      type: 'Foldable'
    },
    {
      id: 2,
      name: 'LARVENDER KF102 Drone',
      number: '95372',
      payment: 'Refunded',
      status: 'Delivered',
      type: 'LARVENDER'
    },
    {
      id: 3,
      name: 'Ruko F11 Pro Drone',
      number: '96312',
      payment: 'Paid',
      status: 'Pending',
      type: 'Ruko'
    },
    {
      id: 4,
      name: 'Drone with Camera Drone',
      number: '96859',
      payment: 'Paid',
      status: 'Delivered',
      type: 'Camera'
    },
    {
      id: 5,
      name: 'GPS 4K Drone',
      number: '72821',
      payment: 'Paid',
      status: 'Delivered',
      type: 'GPS'
    },
    {
      id: 6,
      name: 'DJI Air 2S',
      number: '81475',
      payment: 'Due',
      status: 'Pending',
      type: 'DJI'
    },
    {
      id: 7,
      name: 'Lozenge Drone',
      number: '05452',
      payment: 'Paid',
      status: 'Delivered',
      type: 'Lozenge'
    }
  ])
  const handleLogin = () => {
    setIsLoading(true)
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      console.log('Login process completed')
    }, 2000)
  }

  const handleClear = () => {
    setChannels([])
    console.log('Channels cleared')
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-400 bg-green-400/20'
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/20'
      default:
        return 'text-gray-400 bg-gray-400/20'
    }
  }

  const getPaymentColor = (payment: string) => {
    switch (payment.toLowerCase()) {
      case 'paid':
        return 'text-green-400'
      case 'due':
        return 'text-red-400'
      case 'refunded':
        return 'text-blue-400'
      default:
        return 'text-gray-400'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-primary">
        <div className="flex items-center justify-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-red-400/30 border-t-red-400 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-red-400/20 border-r-red-400 rounded-full animate-spin m-2" style={{animationDirection: 'reverse'}}></div>
          </div>
          <div className="text-[var(--text-primary)] text-xl font-medium">Connecting to channels...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Stats Section Title */}
      {/* <div>
        <h2 className={`text-lg sm:text-xl font-bold ${themeClasses.textPrimary} mb-4 sm:mb-6`}>Recent Updates</h2>
      </div> */}

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 -mt-2">
        <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl border ${themeClasses.border} p-4 sm:p-6 shadow-xl ${themeClasses.shadow}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={`${themeClasses.textSecondary} text-sm font-medium mb-1`}>Total Sales</div>
              <div className={`${themeClasses.textPrimary} text-xl sm:text-2xl font-bold`}>$25,024</div>
              <div className="text-green-400 text-sm mt-1">+3% since last hour</div>
            </div>
            <div className={`w-10 h-10 sm:w-12 sm:h-12 ${themeClasses.accent} rounded-3xl flex items-center justify-center`}>
              <Download className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-700/50 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{width: '61%'}}></div>
              </div>
              <span className={`${themeClasses.textSecondary} text-xs`}>61%</span>
            </div>
          </div>
        </div>

        <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl border ${themeClasses.border} p-4 sm:p-6 shadow-xl ${themeClasses.shadow}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={`${themeClasses.textSecondary} text-sm font-medium mb-1`}>Total Expenses</div>
              <div className={`${themeClasses.textPrimary} text-xl sm:text-2xl font-bold`}>$14,160</div>
              <div className="text-red-400 text-sm mt-1">-8% since last hour</div>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-500 rounded-3xl flex items-center justify-center">
              <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-700/50 rounded-full h-2">
                <div className="bg-red-400 h-2 rounded-full" style={{width: '52%'}}></div>
              </div>
              <span className={`${themeClasses.textSecondary} text-xs`}>52%</span>
            </div>
          </div>
        </div>

        <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl border ${themeClasses.border} p-4 sm:p-6 shadow-xl ${themeClasses.shadow}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={`${themeClasses.textSecondary} text-sm font-medium mb-1`}>Total Income</div>
              <div className={`${themeClasses.textPrimary} text-xl sm:text-2xl font-bold`}>$10,864</div>
              <div className="text-green-400 text-sm mt-1">+12% since last hour</div>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-3xl flex items-center justify-center">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-700/50 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{width: '44%'}}></div>
              </div>
              <span className={`${themeClasses.textSecondary} text-xs`}>44%</span>
            </div>
          </div>
        </div>
      </div> */}

      {/* Active Channels Section */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-4 sm:mb-6">Active Channels</h2>
        
        {/* Channels Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {/* Love Life Lyrics Channel */}
          <div className="bg-[var(--bg-card)] backdrop-blur-xl rounded-3xl border border-[var(--border-color)] p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">LL</span>
                </div>
                <div>
                  <h3 className="text-[var(--text-primary)] font-bold text-lg">Love Life Lyrics</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[var(--text-secondary)] text-sm"># 362390</span>
                    <span className="text-[var(--text-secondary)] text-sm">🎵 nhungmusic</span>
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full">MAIN CHANNEL</span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)] text-sm">Growth</span>
                <span className="text-green-400 font-medium">147,968 ⬆ 23%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)] text-sm">Total Views</span>
                <span className="text-[var(--text-primary)] font-medium">1,168,708,999</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)] text-sm">Subscribers</span>
                <span className="text-[var(--text-primary)] font-medium">2,690,000</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
              <div className="text-[var(--text-secondary)] text-xs">
                Created: 2010/09/11
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-[var(--text-secondary)] hover:text-blue-400 rounded-xl transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-[var(--text-secondary)] hover:text-green-400 rounded-xl transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Miss Daisy Channel */}
          <div className="bg-[var(--bg-card)] backdrop-blur-xl rounded-3xl border border-[var(--border-color)] p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">MD</span>
                </div>
                <div>
                  <h3 className="text-[var(--text-primary)] font-bold text-lg">miss daisy</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[var(--text-secondary)] text-sm"># 318553</span>
                    <span className="text-[var(--text-secondary)] text-sm">🎭 nguyenhanhmusic</span>
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-medium rounded-full">BADGE VIBES, CLONE</span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)] text-sm">Growth</span>
                <span className="text-red-400 font-medium">111,923 ⬇ -55%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)] text-sm">Total Views</span>
                <span className="text-[var(--text-primary)] font-medium">23,499,969</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)] text-sm">Subscribers</span>
                <span className="text-[var(--text-primary)] font-medium">83,300</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
              <div className="text-[var(--text-secondary)] text-xs">
                Updated: 7 months ago
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-[var(--text-secondary)] hover:text-blue-400 rounded-xl transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-[var(--text-secondary)] hover:text-green-400 rounded-xl transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Sunset Memory Channel */}
          <div className="bg-[var(--bg-card)] backdrop-blur-xl rounded-3xl border border-[var(--border-color)] p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SM</span>
                </div>
                <div>
                  <h3 className="text-[var(--text-primary)] font-bold text-lg">Sunset Memory</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[var(--text-secondary)] text-sm"># 331152</span>
                    <span className="text-[var(--text-secondary)] text-sm">🎼 ketmusic</span>
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-medium rounded-full">BOOM, LYRICS</span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)] text-sm">Growth</span>
                <span className="text-green-400 font-medium">101,675 ⬆ 18%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)] text-sm">Total Views</span>
                <span className="text-[var(--text-primary)] font-medium">8,786,825</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)] text-sm">Subscribers</span>
                <span className="text-[var(--text-primary)] font-medium">10,200</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
              <div className="text-[var(--text-secondary)] text-xs">
                Created: 2025/04/08
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-[var(--text-secondary)] hover:text-blue-400 rounded-xl transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-[var(--text-secondary)] hover:text-green-400 rounded-xl transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Channels Section */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-4 sm:mb-6">All Channels</h2>
      </div>

      {/* Channels List - Modern Card Layout */}
      <div className="space-y-4">
        {channels.map((channel, index) => (
          <div key={channel.id} className="bg-[var(--bg-card)] backdrop-blur-xl rounded-2xl border border-[var(--border-color)] p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Channel Info */}
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg ${
                  index % 4 === 0 ? 'bg-gradient-to-br from-blue-500 to-purple-500' :
                  index % 4 === 1 ? 'bg-gradient-to-br from-green-500 to-teal-500' :
                  index % 4 === 2 ? 'bg-gradient-to-br from-orange-500 to-red-500' :
                  'bg-gradient-to-br from-pink-500 to-purple-500'
                }`}>
                  {channel.name.substring(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[var(--text-primary)] font-bold text-lg truncate">{channel.name}</h3>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-[var(--text-secondary)] text-sm">#{channel.number}</span>
                    <span className="text-[var(--text-secondary)] text-sm">Type: {channel.type}</span>
                  </div>
                </div>
              </div>

              {/* Channel Stats */}
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className={`font-bold ${getPaymentColor(channel.payment)}`}>{channel.payment}</div>
                  <div className="text-[var(--text-secondary)] text-xs">Payment</div>
                </div>
                
                <div className="text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(channel.status)}`}>
                    {channel.status}
                  </span>
                  <div className="text-[var(--text-secondary)] text-xs mt-1">Status</div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-[var(--text-secondary)] hover:text-blue-400 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 transition-all duration-300">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-[var(--text-secondary)] hover:text-green-400 rounded-xl bg-green-500/10 hover:bg-green-500/20 transition-all duration-300">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-[var(--text-secondary)] hover:text-red-400 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition-all duration-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Controls */}
      <div className="bg-[var(--bg-card)] backdrop-blur-xl rounded-3xl border border-[var(--border-color)] p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1 w-full">
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="flex items-center justify-center space-x-2 sm:space-x-3 px-6 sm:px-8 py-3 sm:py-4 rounded-3xl font-semibold transition-all duration-300 bg-[var(--accent-color)] text-white shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex-1 sm:flex-none text-sm sm:text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Connect to Channels</span>
                </>
              )}
            </button>

            <button
              onClick={handleClear}
              className="flex items-center justify-center space-x-2 sm:space-x-3 px-6 sm:px-8 py-3 sm:py-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-3xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex-1 sm:flex-none text-sm sm:text-base"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Clear All</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center xl:justify-end">
            <button className="p-2 sm:p-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-3xl transition-all duration-200 hover:bg-[var(--hover-bg)]">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="p-2 sm:p-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-3xl transition-all duration-200 hover:bg-[var(--hover-bg)]">
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="p-2 sm:p-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-3xl transition-all duration-200 hover:bg-[var(--hover-bg)]">
              <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="p-2 sm:p-3 text-red-400 hover:text-red-300 rounded-3xl transition-all duration-200 hover:bg-red-500/20">
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}