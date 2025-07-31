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
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl border ${themeClasses.border} p-6 shadow-xl ${themeClasses.shadow}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={`${themeClasses.textSecondary} text-sm font-medium mb-1`}>Total Sales</div>
              <div className={`${themeClasses.textPrimary} text-2xl font-bold`}>$25,024</div>
              <div className="text-green-400 text-sm mt-1">+3% since last hour</div>
            </div>
            <div className={`w-12 h-12 ${themeClasses.accent} rounded-3xl flex items-center justify-center`}>
              <Download className="w-6 h-6 text-white" />
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

        <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl border ${themeClasses.border} p-6 shadow-xl ${themeClasses.shadow}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={`${themeClasses.textSecondary} text-sm font-medium mb-1`}>Total Expenses</div>
              <div className={`${themeClasses.textPrimary} text-2xl font-bold`}>$14,160</div>
              <div className="text-red-400 text-sm mt-1">-8% since last hour</div>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-3xl flex items-center justify-center">
              <Upload className="w-6 h-6 text-white" />
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

        <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl border ${themeClasses.border} p-6 shadow-xl ${themeClasses.shadow}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={`${themeClasses.textSecondary} text-sm font-medium mb-1`}>Total Income</div>
              <div className={`${themeClasses.textPrimary} text-2xl font-bold`}>$10,864</div>
              <div className="text-green-400 text-sm mt-1">+12% since last hour</div>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-3xl flex items-center justify-center">
              <Play className="w-6 h-6 text-white" />
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
      </div>

      {/* Recent Orders Table */}
      <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl border ${themeClasses.border} shadow-xl ${themeClasses.shadow}`}>
        <div className="p-6 border-b border-gray-700/50">
          <h2 className={`text-xl font-bold ${themeClasses.textPrimary}`}>Recent Orders</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50">
                <th className={`text-left py-4 px-6 ${themeClasses.textSecondary} font-medium text-sm`}>Product Name</th>
                <th className={`text-left py-4 px-6 ${themeClasses.textSecondary} font-medium text-sm`}>Product Number</th>
                <th className={`text-left py-4 px-6 ${themeClasses.textSecondary} font-medium text-sm`}>Payment</th>
                <th className={`text-left py-4 px-6 ${themeClasses.textSecondary} font-medium text-sm`}>Status</th>
                <th className={`text-left py-4 px-6 ${themeClasses.textSecondary} font-medium text-sm`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {channels.map((channel) => (
                <tr key={channel.id} className="border-b border-gray-700/30 hover:bg-gray-800/30 transition-colors">
                  <td className={`py-4 px-6 ${themeClasses.textPrimary} font-medium`}>{channel.name}</td>
                  <td className={`py-4 px-6 ${themeClasses.textSecondary}`}>{channel.number}</td>
                  <td className={`py-4 px-6 font-medium ${getPaymentColor(channel.payment)}`}>{channel.payment}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(channel.status)}`}>
                      {channel.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
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
      <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl border ${themeClasses.border} p-6 shadow-xl ${themeClasses.shadow}`}>
        <div className="flex flex-col xl:flex-row gap-6 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`
                flex items-center justify-center space-x-3 px-8 py-4 rounded-3xl font-semibold transition-all duration-300 
                ${themeClasses.accent} text-white shadow-lg hover:shadow-xl transform hover:scale-105 
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                flex-1 sm:flex-none
              `}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Connect to Channels</span>
                </>
              )}
            </button>

            <button
              onClick={handleClear}
              className="flex items-center justify-center space-x-3 px-8 py-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-3xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex-1 sm:flex-none"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Clear All</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-3 justify-center xl:justify-end">
            <button className={`p-3 ${themeClasses.textSecondary} hover:${themeClasses.textPrimary} rounded-3xl transition-all duration-200 hover:bg-gray-700/50`}>
              <Settings className="w-5 h-5" />
            </button>
            <button className={`p-3 ${themeClasses.textSecondary} hover:${themeClasses.textPrimary} rounded-3xl transition-all duration-200 hover:bg-gray-700/50`}>
              <Download className="w-5 h-5" />
            </button>
            <button className={`p-3 ${themeClasses.textSecondary} hover:${themeClasses.textPrimary} rounded-3xl transition-all duration-200 hover:bg-gray-700/50`}>
              <Upload className="w-5 h-5" />
            </button>
            <button className="p-3 text-red-400 hover:text-red-300 rounded-3xl transition-all duration-200 hover:bg-red-500/20">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function getThemeClasses(theme: string) {
  switch (theme) {
    case 'dark':
      return {
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800/50',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-400',
        accent: 'bg-red-500',
        border: 'border-gray-700/50',
        shadow: 'shadow-red-500/15',
        spinner: 'border-red-400/30 border-t-red-400',
        spinnerSecondary: 'border-red-400/20 border-r-red-400'
      }
    case 'light':
      return {
        background: 'bg-gray-50',
        cardBg: 'bg-white/80',
        textPrimary: 'text-gray-900',
        textSecondary: 'text-gray-600',
        accent: 'bg-blue-500',
        border: 'border-gray-200/50',
        shadow: 'shadow-blue-500/15',
        spinner: 'border-blue-400/30 border-t-blue-400',
        spinnerSecondary: 'border-blue-400/20 border-r-blue-400'
      }
    case 'violet':
      return {
        background: 'bg-gradient-to-br from-gray-950 via-purple-950 to-indigo-950',
        cardBg: 'bg-purple-800/30',
        textPrimary: 'text-purple-100',
        textSecondary: 'text-purple-300',
        accent: 'bg-gradient-to-r from-purple-500 to-violet-500',
        border: 'border-purple-400/20',
        shadow: 'shadow-purple-500/15',
        spinner: 'border-purple-400/30 border-t-purple-400',
        spinnerSecondary: 'border-violet-400/20 border-r-violet-400'
      }
    default:
      return getThemeClasses('dark')
  }
}