'use client'

import { useState } from 'react'
import Image from 'next/image'

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
      <Image
        src="/lgx.png"
        alt="Moonspace Logo"
        width={200}
        height={200}
        className={`w-full h-full object-contain transition-all duration-500 ${
          animated ? 'hover:scale-105' : ''
        } ${isHovered && animated ? 'animate-pulse' : ''}`}
        priority
      />

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