
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

        {/* Rocket Body - Main cylindrical body */}
        <rect
          x="42"
          y="30"
          width="16"
          height="35"
          rx="2"
          fill="url(#rocketGradient)"
          className={animated ? 'animate-bounce' : ''}
          style={{
            animationDuration: animated ? '2s' : undefined,
            animationIterationCount: animated ? 'infinite' : undefined
          }}
        />

        {/* Rocket Nose Cone - Sharp pointed tip */}
        <path
          d="M42 30 L50 15 L58 30 Z"
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
          cy="40"
          r="3"
          fill="#dcfce7"
          stroke="#16a34a"
          strokeWidth="1"
          className={animated ? 'animate-pulse' : ''}
        />

        {/* Left Wing */}
        <path
          d="M42 55 L30 65 L42 65 Z"
          fill="#16a34a"
          className={animated ? 'animate-bounce' : ''}
          style={{
            animationDuration: animated ? '2s' : undefined,
            animationIterationCount: animated ? 'infinite' : undefined,
            animationDelay: animated ? '0.2s' : undefined
          }}
        />

        {/* Right Wing */}
        <path
          d="M58 55 L70 65 L58 65 Z"
          fill="#16a34a"
          className={animated ? 'animate-bounce' : ''}
          style={{
            animationDuration: animated ? '2s' : undefined,
            animationIterationCount: animated ? 'infinite' : undefined,
            animationDelay: animated ? '0.2s' : undefined
          }}
        />

        {/* Rocket Engine Nozzles */}
        <rect
          x="44"
          y="65"
          width="4"
          height="6"
          fill="#15803d"
          className={animated ? 'animate-bounce' : ''}
          style={{
            animationDuration: animated ? '2s' : undefined,
            animationIterationCount: animated ? 'infinite' : undefined,
            animationDelay: animated ? '0.15s' : undefined
          }}
        />
        <rect
          x="52"
          y="65"
          width="4"
          height="6"
          fill="#15803d"
          className={animated ? 'animate-bounce' : ''}
          style={{
            animationDuration: animated ? '2s' : undefined,
            animationIterationCount: animated ? 'infinite' : undefined,
            animationDelay: animated ? '0.15s' : undefined
          }}
        />

        {/* Rocket Flames */}
        <path
          d="M44 71 Q46 80 48 71 Q46 76 44 71"
          fill="url(#flameGradient)"
          className={animated ? 'animate-ping' : ''}
          style={{
            animationDuration: animated ? '0.8s' : undefined,
            animationIterationCount: animated ? 'infinite' : undefined
          }}
        />
        <path
          d="M52 71 Q54 80 56 71 Q54 76 52 71"
          fill="url(#flameGradient)"
          className={animated ? 'animate-ping' : ''}
          style={{
            animationDuration: animated ? '0.8s' : undefined,
            animationIterationCount: animated ? 'infinite' : undefined,
            animationDelay: animated ? '0.2s' : undefined
          }}
        />

        {/* Curved Trail Effects */}
        <path
          d="M20 75 Q30 70 40 75 Q35 78 30 80 Q25 78 20 75"
          fill="url(#trailGradient)"
          className={animated ? 'animate-pulse' : ''}
          opacity="0.6"
        />
        <path
          d="M15 82 Q25 78 35 82 Q30 85 25 87 Q20 85 15 82"
          fill="url(#trailGradient)"
          className={animated ? 'animate-pulse' : ''}
          opacity="0.4"
          style={{
            animationDelay: animated ? '0.5s' : undefined
          }}
        />
        <path
          d="M10 88 Q20 85 30 88 Q25 90 20 92 Q15 90 10 88"
          fill="url(#trailGradient)"
          className={animated ? 'animate-pulse' : ''}
          opacity="0.3"
          style={{
            animationDelay: animated ? '1s' : undefined
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

        {/* Company Name */}
        <text 
          x="50" 
          y="95" 
          fontSize="8" 
          fill="#16a34a" 
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
