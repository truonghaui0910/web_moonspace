
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
          animated ? 'hover:scale-110' : ''
        } ${
          animated && isHovered ? 'animate-pulse' : ''
        }`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
          
          <radialGradient id="flameGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </radialGradient>

          <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
            <stop offset="50%" stopColor="#16a34a" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#15803d" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Rocket Body */}
        <path
          d="M45 25 Q50 15 55 25 L60 50 Q60 55 55 55 L45 55 Q40 55 40 50 Z"
          fill="url(#rocketGradient)"
          className={animated ? 'animate-bounce' : ''}
          style={{
            animationDuration: animated ? '2s' : undefined,
            animationIterationCount: animated ? 'infinite' : undefined
          }}
        />

        {/* Rocket Tip */}
        <path
          d="M45 25 Q50 10 55 25"
          fill="#059669"
          className={animated ? 'animate-bounce' : ''}
          style={{
            animationDuration: animated ? '2s' : undefined,
            animationIterationCount: animated ? 'infinite' : undefined,
            animationDelay: animated ? '0.1s' : undefined
          }}
        />

        {/* Rocket Window */}
        <circle
          cx="50"
          cy="35"
          r="4"
          fill="#dcfce7"
          className={animated ? 'animate-pulse' : ''}
        />

        {/* Rocket Fins */}
        <path
          d="M40 50 L35 60 L40 55 Z"
          fill="#16a34a"
          className={animated ? 'animate-bounce' : ''}
          style={{
            animationDuration: animated ? '2s' : undefined,
            animationIterationCount: animated ? 'infinite' : undefined,
            animationDelay: animated ? '0.2s' : undefined
          }}
        />
        <path
          d="M60 50 L65 60 L60 55 Z"
          fill="#16a34a"
          className={animated ? 'animate-bounce' : ''}
          style={{
            animationDuration: animated ? '2s' : undefined,
            animationIterationCount: animated ? 'infinite' : undefined,
            animationDelay: animated ? '0.2s' : undefined
          }}
        />

        {/* Rocket Flame */}
        <path
          d="M45 55 Q50 70 55 55 Q52 65 50 70 Q48 65 45 55"
          fill="url(#flameGradient)"
          className={animated ? 'animate-ping' : ''}
          style={{
            animationDuration: animated ? '1s' : undefined,
            animationIterationCount: animated ? 'infinite' : undefined
          }}
        />

        {/* Trail Effect */}
        <path
          d="M25 75 Q35 70 45 75 Q35 80 25 85 Q30 80 25 75"
          fill="url(#trailGradient)"
          className={animated ? 'animate-pulse' : ''}
          opacity="0.7"
        />
        <path
          d="M20 85 Q30 80 40 85 Q30 90 20 95 Q25 90 20 85"
          fill="url(#trailGradient)"
          className={animated ? 'animate-pulse' : ''}
          opacity="0.5"
          style={{
            animationDelay: animated ? '0.5s' : undefined
          }}
        />

        {/* Stars */}
        <circle cx="20" cy="20" r="1" fill="#22c55e" className={animated ? 'animate-twinkle' : ''} />
        <circle cx="80" cy="25" r="1" fill="#16a34a" className={animated ? 'animate-twinkle' : ''} 
          style={{ animationDelay: animated ? '1s' : undefined }} />
        <circle cx="15" cy="40" r="1" fill="#059669" className={animated ? 'animate-twinkle' : ''} 
          style={{ animationDelay: animated ? '2s' : undefined }} />
        <circle cx="85" cy="45" r="1" fill="#22c55e" className={animated ? 'animate-twinkle' : ''} 
          style={{ animationDelay: animated ? '1.5s' : undefined }} />

        {/* Company Name Curve */}
        <defs>
          <path id="textcurve" d="M 20,90 Q 50,80 80,90" />
        </defs>
        <text fontSize="6" fill="#16a34a" fontFamily="Arial, sans-serif" fontWeight="bold">
          <textPath href="#textcurve" startOffset="50%" textAnchor="middle">
            MOONSPACE
          </textPath>
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
