'use client'

import { useState } from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  className?: string
}

const sizeMap = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24', 
  lg: 'w-32 h-32',
  xl: 'w-48 h-48'
}

export default function Logo({ size = 'md', animated = false, className = '' }: LogoProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className={`${sizeMap[size]} ${className} relative cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full transition-all duration-500 ${
          animated ? 'hover:scale-105' : ''
        }`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient Definitions */}
        <defs>
          <radialGradient id="moonGradient" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </radialGradient>

          <radialGradient id="planetGradient" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="70%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </radialGradient>

          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#16a34a" stopOpacity="1" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="100" height="100" fill="#22c55e" />

        {/* Moon with craters */}
        <circle
          cx="25"
          cy="45"
          r="18"
          fill="url(#moonGradient)"
          className={animated ? 'animate-pulse' : ''}
          style={{
            animationDuration: animated ? '3s' : undefined,
            animationIterationCount: animated ? 'infinite' : undefined
          }}
        />

        {/* Moon craters */}
        <ellipse cx="22" cy="38" rx="3" ry="4" fill="#16a34a" opacity="0.6" />
        <ellipse cx="30" cy="42" rx="2" ry="2.5" fill="#16a34a" opacity="0.6" />
        <ellipse cx="20" cy="50" rx="4" ry="3" fill="#16a34a" opacity="0.6" />
        <ellipse cx="28" cy="52" rx="1.5" ry="2" fill="#16a34a" opacity="0.6" />
        <ellipse cx="25" cy="35" rx="1" ry="1" fill="#16a34a" opacity="0.6" />

        {/* Planet with ring */}
        <circle
          cx="75"
          cy="35"
          r="12"
          fill="url(#planetGradient)"
          className={animated ? 'animate-spin' : ''}
          style={{
            animationDuration: animated ? '20s' : undefined,
            animationIterationCount: animated ? 'infinite' : undefined,
            transformOrigin: '75px 35px'
          }}
        />

        {/* Planet ring */}
        <ellipse
          cx="75"
          cy="35"
          rx="18"
          ry="6"
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth="2"
          className={animated ? 'animate-pulse' : ''}
          style={{
            animationDuration: animated ? '2s' : undefined,
            animationIterationCount: animated ? 'infinite' : undefined
          }}
        />

        {/* Musical note symbol */}
        <g transform="translate(45, 45)">
          {/* Note stem */}
          <rect x="8" y="-5" width="1.5" height="15" fill="#16a34a" />

          {/* Note head */}
          <ellipse cx="8" cy="10" rx="3" ry="2" fill="#16a34a" />

          {/* Flag */}
          <path d="M9.5 -5 Q15 -3 15 2 Q12 0 9.5 2 Z" fill="#16a34a" />
        </g>

        {/* Stars */}
        <g className={animated ? 'animate-twinkle' : ''}>
          <path d="M15 20 L16 22 L18 22 L16.5 23.5 L17 25.5 L15 24.5 L13 25.5 L13.5 23.5 L12 22 L14 22 Z" 
                fill="#4ade80" opacity="0.8" />
        </g>

        <g className={animated ? 'animate-twinkle' : ''} 
           style={{ animationDelay: animated ? '1s' : undefined }}>
          <path d="M85 55 L86 57 L88 57 L86.5 58.5 L87 60.5 L85 59.5 L83 60.5 L83.5 58.5 L82 57 L84 57 Z" 
                fill="#4ade80" opacity="0.8" />
        </g>

        <g className={animated ? 'animate-twinkle' : ''} 
           style={{ animationDelay: animated ? '2s' : undefined }}>
          <path d="M60 15 L61 17 L63 17 L61.5 18.5 L62 20.5 L60 19.5 L58 20.5 L58.5 18.5 L57 17 L59 17 Z" 
                fill="#4ade80" opacity="0.8" />
        </g>

        <g className={animated ? 'animate-twinkle' : ''} 
           style={{ animationDelay: animated ? '1.5s' : undefined }}>
          <path d="M20 75 L21 77 L23 77 L21.5 78.5 L22 80.5 L20 79.5 L18 80.5 L18.5 78.5 L17 77 L19 77 Z" 
                fill="#4ade80" opacity="0.8" />
        </g>

        {/* Company Name */}
        <text 
          x="50" 
          y="90" 
          fontSize="8" 
          fill="#15803d" 
          fontFamily="Arial, sans-serif" 
          fontWeight="bold"
          textAnchor="middle"
        >
          MOONSPACE
        </text>
      </svg>

      {/* Floating Effect */}
      {animated && (
        <div className="absolute inset-0 -z-10">
          <div className="w-full h-full bg-green-200 rounded-full blur-xl opacity-20 animate-ping" 
            style={{ animationDuration: '3s' }} />
        </div>
      )}
    </div>
  )
}