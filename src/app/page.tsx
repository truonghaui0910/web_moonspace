'use client'

import { useState, useEffect } from 'react'
import { signIn, getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading
    if (session) {
      router.push('/channels') // Redirect if already logged in
    }
  }, [session, status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.ok) {
        router.push('/channels')
      } else {
        console.error('Login failed:', result?.error)
        // You can add error handling here
      }
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/channels' })
  }

  const handleGitHubSignIn = () => {
    signIn('github', { callbackUrl: '/channels' })
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (session) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">


      {/* Sparkling starry background */}
      <div className="absolute inset-0">
        {/* Small 4-pointed stars */}
        <div className="absolute top-32 right-20 star-4-point">✦</div>
        <div className="absolute top-64 right-1/3 star-4-point">✦</div>
        <div className="absolute top-88 right-2/5 star-4-point animate-twinkle-dot">✦</div>

        {/* Small bright sparkling dots */}
        <div className="absolute top-24 left-16 w-1.5 h-1.5 bg-white rounded-full animate-sparkle shadow-white shadow-sm" style={{ filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.8))' }}></div>
        <div className="absolute top-40 right-16 w-1.5 h-1.5 bg-blue-100 rounded-full animate-sparkle shadow-blue-100 shadow-sm" style={{ animationDelay: '1s', filter: 'drop-shadow(0 0 3px rgba(191,219,254,0.8))' }}></div>
        <div className="absolute top-56 left-1/4 w-1 h-1 bg-yellow-100 rounded-full animate-sparkle shadow-yellow-100 shadow-sm" style={{ animationDelay: '2.5s', filter: 'drop-shadow(0 0 2px rgba(254,249,195,0.8))' }}></div>
        <div className="absolute top-72 right-1/4 w-1.5 h-1.5 bg-purple-100 rounded-full animate-sparkle shadow-purple-100 shadow-sm" style={{ animationDelay: '0.8s', filter: 'drop-shadow(0 0 3px rgba(243,232,255,0.8))' }}></div>
        <div className="absolute top-88 left-1/6 w-1 h-1 bg-green-100 rounded-full animate-sparkle shadow-green-100 shadow-sm" style={{ animationDelay: '1.8s', filter: 'drop-shadow(0 0 2px rgba(220,252,231,0.8))' }}></div>
        <div className="absolute top-104 right-1/6 w-1.5 h-1.5 bg-pink-100 rounded-full animate-sparkle shadow-pink-100 shadow-sm" style={{ animationDelay: '3.2s', filter: 'drop-shadow(0 0 3px rgba(252,231,243,0.8))' }}></div>

        {/* Small twinkling stars */}
        <div className="absolute top-28 left-10 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-dot shadow-white shadow-sm" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-44 right-20 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-dot shadow-white shadow-sm" style={{ animationDelay: '1.2s' }}></div>
        <div className="absolute top-60 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-dot shadow-white shadow-sm" style={{ animationDelay: '2.8s' }}></div>
        <div className="absolute top-76 right-1/3 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-dot shadow-white shadow-sm" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute top-92 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-dot shadow-white shadow-sm" style={{ animationDelay: '1.9s' }}></div>
        <div className="absolute top-108 right-1/4 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-dot shadow-white shadow-sm" style={{ animationDelay: '3.4s' }}></div>
        <div className="absolute top-20 left-1/5 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-dot shadow-white shadow-sm" style={{ animationDelay: '2.1s' }}></div>
        <div className="absolute top-36 right-1/5 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-dot shadow-white shadow-sm" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute top-52 left-2/5 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-dot shadow-white shadow-sm" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-68 right-2/5 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-dot shadow-white shadow-sm" style={{ animationDelay: '2.9s' }}></div>
        <div className="absolute top-84 left-3/5 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-dot shadow-white shadow-sm" style={{ animationDelay: '0.9s' }}></div>
        <div className="absolute top-100 right-3/5 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-dot shadow-white shadow-sm" style={{ animationDelay: '3.1s' }}></div>

        {/* Small dots with twinkling */}
        <div className="absolute top-24 left-1/2 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute top-44 right-1/2 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '1.7s' }}></div>
        <div className="absolute top-60 left-20 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '2.8s' }}></div>
        <div className="absolute top-76 right-40 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '0.9s' }}></div>
        <div className="absolute top-92 left-40 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '1.4s' }}></div>
        <div className="absolute top-104 right-24 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '2.1s' }}></div>
        <div className="absolute top-8 left-1/8 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '1.9s' }}></div>
        <div className="absolute top-18 right-1/8 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '0.6s' }}></div>
        <div className="absolute top-34 left-4/5 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '2.4s' }}></div>
        <div className="absolute top-50 right-1/7 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '1.1s' }}></div>
        <div className="absolute top-66 left-5/6 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '2.6s' }}></div>
        <div className="absolute top-82 right-1/9 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute top-98 left-7/8 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '1.6s' }}></div>

        {/* Extra tiny dots */}
        <div className="absolute top-12 left-1/4 w-0.5 h-0.5 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '0.4s' }}></div>
        <div className="absolute top-26 right-1/4 w-0.5 h-0.5 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '1.8s' }}></div>
        <div className="absolute top-42 left-3/4 w-0.5 h-0.5 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '2.3s' }}></div>
        <div className="absolute top-58 right-3/4 w-0.5 h-0.5 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute top-74 left-1/8 w-0.5 h-0.5 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '1.3s' }}></div>
        <div className="absolute top-90 right-7/8 w-0.5 h-0.5 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '2.7s' }}></div>
        <div className="absolute top-106 left-3/8 w-0.5 h-0.5 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '0.1s' }}></div>
        <div className="absolute top-14 right-5/8 w-0.5 h-0.5 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '1.9s' }}></div>

        {/* Extra small twinkling stars scattered - fixed positions */}
        {Array.from({ length: 200 }, (_, i) => {
          const top = (i * 7.3) % 100;
          const left = (i * 11.7) % 100;
          const delay = (i * 0.02) % 4;
          const opacity = 0.2 + (i % 8) * 0.1;

          return (
            <div
              key={i}
              className="absolute w-px h-px bg-white rounded-full animate-twinkle-dot"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                animationDelay: `${delay}s`,
                opacity: opacity
              }}
            ></div>
          );
        })}

        {/* More twinkling dot stars */}
        {Array.from({ length: 150 }, (_, i) => {
          const top = (i * 13.1) % 100;
          const left = (i * 17.3) % 100;
          const delay = (i * 0.033) % 5;
          const opacity = 0.1 + (i % 9) * 0.1;
          const duration = 1.5 + (i % 5) * 0.4;

          return (
            <div
              key={`extra-${i}`}
              className="absolute w-0.5 h-0.5 bg-white rounded-full animate-twinkle-dot"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                animationDelay: `${delay}s`,
                opacity: opacity,
                animationDuration: `${duration}s`
              }}
            ></div>
          );
        })}

        {/* Tiny twinkling stars for depth */}
        {Array.from({ length: 80 }, (_, i) => {
          const top = (i * 19.7) % 100;
          const left = (i * 23.1) % 100;
          const delay = (i * 0.063) % 5;
          const opacity = 0.3 + (i % 6) * 0.1;
          const duration = 2 + (i % 3) * 1;

          return (
            <div
              key={`tiny-${i}`}
              className="absolute w-0.5 h-0.5 bg-blue-100 rounded-full animate-twinkle-dot"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                animationDelay: `${delay}s`,
                opacity: opacity,
                animationDuration: `${duration}s`
              }}
            ></div>
          );
        })}
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
                  Username/Email
                </label>
                                 <input
                   id="email"
                   type="text"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   required
                   className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none backdrop-blur-sm"
                   placeholder="Username or email"
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
                   className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none backdrop-blur-sm"
                   placeholder="••••••••"
                 />
              </div>

              {/* Remember me */}
              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-green-600 bg-white/10 border-white/30 rounded focus:ring-green-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-300">Remember me</span>
                </label>
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

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black text-gray-400">Or continue with</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/30 text-white py-3 px-4 rounded-lg font-medium hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                >
                  Google
                </button>
                <button
                  type="button"
                  onClick={handleGitHubSignIn}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/30 text-white py-3 px-4 rounded-lg font-medium hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                >
                  GitHub
                </button>
              </div>
            </form>


          </div>
        </div>
      </div>
    </div>
  )
}