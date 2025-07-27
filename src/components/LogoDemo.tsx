
'use client'

import { useState } from 'react'
import Logo from './Logo'

export default function LogoDemo() {
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg')
  const [animated, setAnimated] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center p-8">
      {/* Main Logo Display */}
      <div className="bg-white rounded-2xl shadow-2xl p-12 mb-8">
        <Logo size={size} animated={animated} />
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 max-w-md w-full">
        <h2 className="text-xl font-bold text-center text-gray-800">Logo Controls</h2>
        
        {/* Size Control */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kích thước: <span className="text-green-600 font-semibold">{size.toUpperCase()}</span>
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(['sm', 'md', 'lg', 'xl'] as const).map((sizeOption) => (
              <button
                key={sizeOption}
                onClick={() => setSize(sizeOption)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  size === sizeOption
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {sizeOption.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Animation Control */}
        <div>
          <label className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Hiệu ứng chuyển động</span>
            <button
              onClick={() => setAnimated(!animated)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                animated ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  animated ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
        </div>

        {/* Logo Variations */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Các kích thước khác:</h3>
          <div className="flex items-center justify-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <Logo size="sm" animated={false} />
            <Logo size="md" animated={false} />
            <Logo size="lg" animated={false} />
          </div>
        </div>

        {/* Info */}
        <div className="text-center text-sm text-gray-600 space-y-1">
          <p>🚀 Logo Moonspace với tông màu xanh lá</p>
          <p>✨ Có hiệu ứng hover và animation</p>
          <p>📏 Responsive với nhiều kích thước</p>
        </div>
      </div>
    </div>
  )
}
