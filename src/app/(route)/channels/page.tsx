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
import { useTheme } from '@/contexts/ThemeContext'
import { getThemeClasses } from '@/lib/theme'

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
  const { theme } = useTheme()

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

  const themeClasses = getThemeClasses(theme)

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${themeClasses.background}`}>
        <div className="flex items-center justify-center space-x-4">
          <div className="relative">
            <div className={`w-16 h-16 border-4 ${themeClasses.spinner} rounded-full animate-spin`}></div>
            <div className={`absolute inset-0 w-12 h-12 border-4 ${themeClasses.spinnerSecondary} rounded-full animate-spin m-2`} style={{animationDirection: 'reverse'}}></div>
          </div>
          <div className={`${themeClasses.textPrimary} text-xl font-medium`}>Connecting to channels...</div>
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

      {/* Channel Details Section */}
      <div>
        <h2 className={`text-lg sm:text-xl font-bold ${themeClasses.textPrimary} mb-4 sm:mb-6`}>Channel Details</h2>
      </div>
      
      {/* Channel Details Card */}
      <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl border ${themeClasses.border} shadow-xl ${themeClasses.shadow} p-6 mb-8`}>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left side - Channel Info */}
          <div className="flex-1">
            <div className="flex items-start gap-4 mb-6">
              {/* Channel Avatar */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shrink-0">
                LL
              </div>
              
              {/* Channel Basic Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className={`text-xl font-bold ${themeClasses.textPrimary}`}>Love Life Lyrics</h3>
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className={`flex items-center gap-1 ${themeClasses.textSecondary}`}>
                    <span className="text-gray-400">#</span>
                    <span>262390</span>
                  </div>
                  <div className={`flex items-center gap-1 ${themeClasses.textSecondary}`}>
                    <span className="text-gray-400">@</span>
                    <span>nhungmusic</span>
                  </div>
                  <div className={`flex items-center gap-1 ${themeClasses.textSecondary}`}>
                    <span className="text-gray-400">✉</span>
                    <span>vifembat@gmail.com</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-3">
                  <span className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                    MAIN CHANNEL
                  </span>
                  <span className="px-3 py-1 bg-gray-500/20 text-gray-400 text-xs font-medium rounded-full">
                    Add Tag
                  </span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-xl transition-all duration-200">
                <span className="text-sm">🔑</span>
                <span className="text-sm font-medium">Login</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-xl transition-all duration-200">
                <span className="text-sm">💬</span>
                <span className="text-sm font-medium">Comment</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-xl transition-all duration-200">
                <span className="text-sm">🔗</span>
                <span className="text-sm font-medium">Code</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-400 rounded-xl transition-all duration-200">
                <span className="text-sm">⋯</span>
                <span className="text-sm font-medium">More</span>
              </button>
            </div>
          </div>
          
          {/* Right side - Stats Grid */}
          <div className="lg:w-96">
            <div className="grid grid-cols-2 gap-4">
              {/* Growth */}
              <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-2xl p-4 text-center`}>
                <div className={`${themeClasses.textSecondary} text-xs font-medium mb-1`}>GROWTH</div>
                <div className="flex items-center justify-center gap-1">
                  <span className={`${themeClasses.textPrimary} text-lg font-bold`}>147,968</span>
                  <span className="text-green-400 text-sm">+23%</span>
                </div>
              </div>
              
              {/* Views */}
              <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-2xl p-4 text-center`}>
                <div className={`${themeClasses.textSecondary} text-xs font-medium mb-1`}>VIEWS</div>
                <div className={`${themeClasses.textPrimary} text-lg font-bold`}>1,169,708,999</div>
                <div className={`${themeClasses.textSecondary} text-xs`}>1 hour ago</div>
              </div>
              
              {/* Hub */}
              <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-2xl p-4 text-center`}>
                <div className={`${themeClasses.textSecondary} text-xs font-medium mb-1`}>HUB</div>
                <div className={`${themeClasses.textPrimary} text-sm`}>Gn</div>
              </div>
              
              {/* Date Created */}
              <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-2xl p-4 text-center`}>
                <div className={`${themeClasses.textSecondary} text-xs font-medium mb-1`}>DATE CREATED</div>
                <div className={`${themeClasses.textPrimary} text-sm font-medium`}>2010/09/11</div>
                <div className={`${themeClasses.textSecondary} text-xs`}>Change info</div>
                <div className={`${themeClasses.textSecondary} text-xs`}>2 months ago</div>
              </div>
              
              {/* Subs */}
              <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-2xl p-4 text-center col-span-2`}>
                <div className={`${themeClasses.textSecondary} text-xs font-medium mb-1`}>SUBS</div>
                <div className={`${themeClasses.textPrimary} text-xl font-bold`}>2,690,000</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Channels List Section */}
      <div>
        <h2 className={`text-lg sm:text-xl font-bold ${themeClasses.textPrimary} mb-4 sm:mb-6`}>Channels List</h2>
      </div>
      
      {/* Channels List Table */}
      <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl border ${themeClasses.border} shadow-xl ${themeClasses.shadow} -mt-2`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className={`border-b ${themeClasses.tableBorder}`}>
                <th className={`text-left py-3 sm:py-4 px-3 sm:px-6 ${themeClasses.textSecondary} font-medium text-xs sm:text-sm`}>Product Name</th>
                <th className={`text-left py-3 sm:py-4 px-3 sm:px-6 ${themeClasses.textSecondary} font-medium text-xs sm:text-sm`}>Product Number</th>
                <th className={`text-left py-3 sm:py-4 px-3 sm:px-6 ${themeClasses.textSecondary} font-medium text-xs sm:text-sm`}>Payment</th>
                <th className={`text-left py-3 sm:py-4 px-3 sm:px-6 ${themeClasses.textSecondary} font-medium text-xs sm:text-sm`}>Status</th>
                <th className={`text-left py-3 sm:py-4 px-3 sm:px-6 ${themeClasses.textSecondary} font-medium text-xs sm:text-sm`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {channels.map((channel, index) => (
                <tr key={channel.id} className={`${index === channels.length - 1 ? '' : `border-b ${themeClasses.tableBorder}`} hover:${themeClasses.tableHover} transition-colors`}>
                  <td className={`py-3 sm:py-4 px-3 sm:px-6 ${themeClasses.textPrimary} font-medium text-sm`}>{channel.name}</td>
                  <td className={`py-3 sm:py-4 px-3 sm:px-6 ${themeClasses.textSecondary} text-sm`}>{channel.number}</td>
                  <td className={`py-3 sm:py-4 px-3 sm:px-6 font-medium ${getPaymentColor(channel.payment)} text-sm`}>{channel.payment}</td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(channel.status)}`}>
                      {channel.status}
                    </span>
                  </td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6">
                    <button className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm font-medium transition-colors">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enhanced Controls */}
      <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl border ${themeClasses.border} p-4 sm:p-6 shadow-xl ${themeClasses.shadow}`}>
        <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1 w-full">
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`
                flex items-center justify-center space-x-2 sm:space-x-3 px-6 sm:px-8 py-3 sm:py-4 rounded-3xl font-semibold transition-all duration-300 
                ${themeClasses.accent} text-white shadow-lg hover:shadow-xl transform hover:scale-105 
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                flex-1 sm:flex-none text-sm sm:text-base
              `}
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
            <button className={`p-2 sm:p-3 ${themeClasses.textSecondary} hover:${themeClasses.textPrimary} rounded-3xl transition-all duration-200 hover:bg-gray-700/50`}>
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className={`p-2 sm:p-3 ${themeClasses.textSecondary} hover:${themeClasses.textPrimary} rounded-3xl transition-all duration-200 hover:bg-gray-700/50`}>
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className={`p-2 sm:p-3 ${themeClasses.textSecondary} hover:${themeClasses.textPrimary} rounded-3xl transition-all duration-200 hover:bg-gray-700/50`}>
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

