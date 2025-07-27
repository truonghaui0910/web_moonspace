
'use client'

import { useState } from 'react'
import Logo from '@/components/Logo'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // TODO: Implement login logic here
    console.log('Login attempt:', { email, password })
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Shooting stars */}
      <div className="absolute inset-0">
        {/* Shooting star 1 */}
        <div className="absolute top-10 -left-10 w-1 h-1 bg-white rounded-full shadow-white shadow-lg animate-shooting-star-1"></div>
        
        {/* Shooting star 2 */}
        <div className="absolute top-32 -left-20 w-1.5 h-1.5 bg-blue-200 rounded-full shadow-blue-200 shadow-lg animate-shooting-star-2"></div>
        
        {/* Shooting star 3 */}
        <div className="absolute top-64 -left-16 w-0.5 h-0.5 bg-yellow-200 rounded-full shadow-yellow-200 shadow-sm animate-shooting-star-3"></div>
        
        {/* Shooting star 4 */}
        <div className="absolute top-96 -left-12 w-1 h-1 bg-purple-200 rounded-full shadow-purple-200 shadow-md animate-shooting-star-4"></div>
      </div>

      {/* Starry background */}
      <div className="absolute inset-0"></div>
        {/* Large bright stars */}
        <div className="absolute top-20 left-10 w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-white shadow-sm"></div>
        <div className="absolute top-32 right-20 w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-white shadow-sm" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-48 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-white shadow-sm" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-64 right-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-white shadow-sm" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-80 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-white shadow-sm" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-96 right-1/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-white shadow-sm" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-12 left-2/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-white shadow-sm" style={{ animationDelay: '2.3s' }}></div>
        <div className="absolute top-28 right-1/5 w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-white shadow-sm" style={{ animationDelay: '1.8s' }}></div>
        
        {/* Medium stars */}
        <div className="absolute top-16 right-32 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute top-40 left-16 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '1.2s' }}></div>
        <div className="absolute top-56 right-16 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute top-72 left-2/3 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '2.2s' }}></div>
        <div className="absolute top-88 right-2/3 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '1.8s' }}></div>
        <div className="absolute top-36 left-3/4 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute top-52 right-3/4 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '2.7s' }}></div>
        <div className="absolute top-68 left-1/5 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '1.3s' }}></div>
        <div className="absolute top-84 right-4/5 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '2.9s' }}></div>
        <div className="absolute top-100 left-1/6 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        
        {/* Small stars */}
        <div className="absolute top-24 left-1/2 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute top-44 right-1/2 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '1.7s' }}></div>
        <div className="absolute top-60 left-20 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '2.8s' }}></div>
        <div className="absolute top-76 right-40 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.9s' }}></div>
        <div className="absolute top-92 left-40 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '1.4s' }}></div>
        <div className="absolute top-104 right-24 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '2.1s' }}></div>
        <div className="absolute top-8 left-1/8 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '1.9s' }}></div>
        <div className="absolute top-18 right-1/8 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
        <div className="absolute top-34 left-4/5 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '2.4s' }}></div>
        <div className="absolute top-50 right-1/7 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '1.1s' }}></div>
        <div className="absolute top-66 left-5/6 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '2.6s' }}></div>
        <div className="absolute top-82 right-1/9 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute top-98 left-7/8 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '1.6s' }}></div>
        
        {/* Extra small stars scattered - more density */}
        {Array.from({ length: 120 }, (_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              opacity: Math.random() * 0.9 + 0.1
            }}
          ></div>
        ))}
        
        {/* Tiny twinkling stars for depth */}
        {Array.from({ length: 80 }, (_, i) => (
          <div
            key={`tiny-${i}`}
            className="absolute w-0.5 h-0.5 bg-blue-100 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.6 + 0.2,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Login form container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo size="lg" animated={true} />
          </div>

          {/* Login form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Moonspace</h1>
              <p className="text-gray-300">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="your@email.com"
                />
              </div>

              {/* Password field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="••••••••"
                />
              </div>

              {/* Remember me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-green-600 bg-white/10 border-white/30 rounded focus:ring-green-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-300">Remember me</span>
                </label>
                <a href="#" className="text-sm text-green-400 hover:text-green-300 transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Login button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Sign up link */}
            <div className="text-center mt-6">
              <p className="text-gray-300">
                Don't have an account?{' '}
                <a href="#" className="text-green-400 hover:text-green-300 font-medium transition-colors">
                  Sign up now
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
