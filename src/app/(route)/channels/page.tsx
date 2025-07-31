'use client'

import { useState } from 'react'
import { 
  Plus,
  Search,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function ChannelsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { theme } = useTheme()

  const themeClasses = getThemeClasses(theme)

  const statsCards = [
    {
      title: 'Total Sales',
      value: '$25,024',
      change: '+31%',
      trend: 'up',
      subtitle: 'Last 24 hours',
      icon: DollarSign,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      title: 'Total Expenses',
      value: '$14,160', 
      change: '-52%',
      trend: 'down',
      subtitle: 'Last 24 hours',
      icon: TrendingDown,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20'
    },
    {
      title: 'Total Income',
      value: '$10,864',
      change: '+44%', 
      trend: 'up',
      subtitle: 'Last 24 hours',
      icon: TrendingUp,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    }
  ]

  const recentOrders = [
    { id: 1, productName: 'Foldable Mini Drone', productNumber: 'SB001', payment: 'Due', status: 'Pending' },
    { id: 2, productName: 'LARVENDER KF102 Drone', productNumber: '89743', payment: 'Refunded', status: 'Pending' },
    { id: 3, productName: 'Ruko F11 Pro Drone', productNumber: '89533', payment: 'Due', status: 'Pending' },
    { id: 4, productName: 'Drone with Camera Drone', productNumber: '86359', payment: 'Paid', status: 'Delivered' },
    { id: 5, productName: 'GPS 4k Drone', productNumber: '22821', payment: 'Paid', status: 'Delivered' },
    { id: 6, productName: 'DJI Air 2S', productNumber: '81475', payment: 'Due', status: 'Pending' },
    { id: 7, productName: 'Lozenge Drone', productNumber: '00482', payment: 'Paid', status: 'Delivered' }
  ]

  const recentUpdates = [
    {
      name: 'Mike Tyson',
      action: 'received his order of Night lion tech GPS drone.',
      time: '3 Minutes Ago',
      avatar: 'M',
      bgColor: 'bg-red-500'
    },
    {
      name: 'Diana Ayi',
      action: 'declined her order of 2 DJI Air 2S.',
      time: '6 Minutes Ago', 
      avatar: 'D',
      bgColor: 'bg-purple-500'
    },
    {
      name: 'Mandy Roy',
      action: 'received his order of LARVENDER KF102 Drone.',
      time: '12 Minutes Ago',
      avatar: 'M',
      bgColor: 'bg-orange-500'
    }
  ]

  const salesAnalytics = [
    {
      title: 'ONLINE ORDERS',
      value: '3849',
      change: '+39%',
      subtitle: 'Last 24 Hours',
      icon: ShoppingCart,
      color: 'text-blue-400'
    },
    {
      title: 'OFFLINE ORDERS', 
      value: '1100',
      change: '-17%',
      subtitle: 'Last 24 Hours',
      icon: Users,
      color: 'text-red-400'
    },
    {
      title: 'NEW CUSTOMER',
      value: '849',
      change: '+25%',
      subtitle: 'Last 24 Hours', 
      icon: Users,
      color: 'text-green-400'
    }
  ]

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${themeClasses.background}`}>
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <div className={`w-20 h-20 border-4 ${themeClasses.spinner} rounded-full animate-spin`}></div>
            <div className={`absolute inset-0 w-16 h-16 border-4 ${themeClasses.spinnerSecondary} rounded-full animate-spin m-2`} style={{animationDirection: 'reverse'}}></div>
          </div>
          <div className={`mt-6 ${themeClasses.textPrimary} text-xl font-medium`}>Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${themeClasses.background} min-h-screen`}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsCards.map((card, index) => (
          <div key={index} className={`${themeClasses.card} p-6 rounded-xl border ${themeClasses.border} shadow-lg`}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>{card.title}</p>
                <p className={`text-3xl font-bold ${themeClasses.textPrimary} mt-2`}>{card.value}</p>
                <div className="flex items-center space-x-2 mt-3">
                  <span className={`text-sm font-medium ${card.color}`}>{card.change}</span>
                  <span className={`text-xs ${themeClasses.textSecondary}`}>{card.subtitle}</span>
                </div>
              </div>
              <div className={`w-16 h-16 ${card.bgColor} rounded-2xl flex items-center justify-center`}>
                <card.icon className={`w-8 h-8 ${card.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="xl:col-span-2">
          <div className={`${themeClasses.card} rounded-xl border ${themeClasses.border} shadow-lg overflow-hidden`}>
            <div className="p-6 border-b border-gray-700/50">
              <div className="flex items-center justify-between">
                <h3 className={`text-xl font-bold ${themeClasses.textPrimary}`}>Recent Orders</h3>
                <button className={`px-4 py-2 ${themeClasses.button} rounded-lg transition-all duration-200`}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${themeClasses.tableHeader}`}>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium">Product Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium">Product Number</th>
                    <th className="px-6 py-4 text-left text-sm font-medium">Payment</th>
                    <th className="px-6 py-4 text-left text-sm font-medium">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className={`${themeClasses.tableRow} hover:${themeClasses.tableRowHover}`}>
                      <td className={`px-6 py-4 text-sm font-medium ${themeClasses.textPrimary}`}>
                        {order.productName}
                      </td>
                      <td className={`px-6 py-4 text-sm ${themeClasses.textSecondary}`}>
                        {order.productNumber}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm ${
                          order.payment === 'Paid' ? 'text-green-400' :
                          order.payment === 'Due' ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {order.payment}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          order.status === 'Delivered' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className={`text-blue-400 hover:text-blue-300 text-sm font-medium`}>
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Updates */}
          <div className={`${themeClasses.card} rounded-xl border ${themeClasses.border} shadow-lg p-6`}>
            <h3 className={`text-lg font-bold ${themeClasses.textPrimary} mb-6`}>Recent Updates</h3>
            <div className="space-y-4">
              {recentUpdates.map((update, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-10 h-10 ${update.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-bold text-sm">{update.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${themeClasses.textPrimary}`}>
                      <span className="font-medium">{update.name}</span> {update.action}
                    </p>
                    <p className={`text-xs ${themeClasses.textSecondary} mt-1`}>{update.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sales Analytics */}
          <div className={`${themeClasses.card} rounded-xl border ${themeClasses.border} shadow-lg p-6`}>
            <h3 className={`text-lg font-bold ${themeClasses.textPrimary} mb-6`}>Sales Analytics</h3>
            <div className="space-y-6">
              {salesAnalytics.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${item.color === 'text-blue-400' ? 'bg-blue-500/20' : item.color === 'text-red-400' ? 'bg-red-500/20' : 'bg-green-500/20'} rounded-lg flex items-center justify-center`}>
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <div>
                      <p className={`text-xs font-medium ${themeClasses.textSecondary}`}>{item.title}</p>
                      <p className={`text-xs ${themeClasses.textSecondary}`}>{item.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${themeClasses.textPrimary}`}>{item.value}</p>
                    <p className={`text-sm ${item.color}`}>{item.change}</p>
                  </div>
                </div>
              ))}
            </div>
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
        card: 'bg-gray-800',
        button: 'bg-red-500 hover:bg-red-600 text-white',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-400',
        border: 'border-gray-700',
        tableHeader: 'bg-gray-700/50 text-gray-300',
        tableRow: 'bg-gray-800',
        tableRowHover: 'bg-gray-700/50',
        spinner: 'border-red-400/30 border-t-red-400',
        spinnerSecondary: 'border-red-400/20 border-r-red-400'
      }
    case 'light':
      return {
        background: 'bg-gray-50',
        card: 'bg-white',
        button: 'bg-blue-500 hover:bg-blue-600 text-white',
        textPrimary: 'text-gray-900',
        textSecondary: 'text-gray-600',
        border: 'border-gray-200',
        tableHeader: 'bg-gray-50 text-gray-700',
        tableRow: 'bg-white',
        tableRowHover: 'bg-gray-50',
        spinner: 'border-blue-400/30 border-t-blue-400',
        spinnerSecondary: 'border-blue-400/20 border-r-blue-400'
      }
    case 'violet':
      return {
        background: 'bg-gradient-to-br from-gray-950 via-purple-950 to-indigo-950',
        card: 'bg-gradient-to-r from-purple-800/30 to-violet-800/30 backdrop-blur-xl',
        button: 'bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white',
        textPrimary: 'text-purple-100',
        textSecondary: 'text-purple-300',
        border: 'border-purple-400/20',
        tableHeader: 'bg-purple-800/30 text-purple-200',
        tableRow: 'bg-purple-800/20',
        tableRowHover: 'bg-purple-700/30',
        spinner: 'border-purple-400/30 border-t-purple-400',
        spinnerSecondary: 'border-violet-400/20 border-r-violet-400'
      }
    default:
      return getThemeClasses('dark')
  }
}