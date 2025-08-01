'use client'

import { useState, useEffect } from 'react'
import { signIn, getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Logo from '@/components/common/Logo'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
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
        emailOrUsername: email,
        password,
        rememberMe: rememberMe.toString(),
        redirect: false,
      })

      if (result?.ok) {
        toast.success('Login successful!')
        router.push('/channels')
      } else {
        // Handle specific error messages
        let errorMessage = 'Login failed'
        
        if (result?.error === 'INVALID_CREDENTIALS') {
          errorMessage = 'Invalid email/username or password'
        } else if (result?.error === 'ACCOUNT_DISABLED') {
          errorMessage = 'Your account has been disabled. Please contact administrator.'
        } else if (result?.error === 'CredentialsSignin') {
          // This is the generic NextAuth error, check if it's from our custom errors
          errorMessage = 'Invalid email/username or password'
        }
        
        toast.error(errorMessage)
      }
    } catch (error: any) {
      console.error('Login error:', error)
      toast.error('An error occurred during login. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-indigo-950 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          {/* <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div> */}
          <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"></div>
          <div 
            className="absolute inset-0 w-16 h-16 border-4 border-purple-400/20 border-r-purple-400 rounded-full animate-spin m-2" 
            style={{animationDirection: 'reverse'}}
          ></div></div>
          <div className="text-white text-lg">Loading...</div>
        </div>
      </div>
    )
  }

  if (session) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-950 via-purple-950 to-indigo-950">


      {/* Sparkling starry background */}
      <div className="absolute inset-0">
        {/* Small 4-pointed stars - moved some to bottom */}
        <div className="absolute bottom-32 left-20 star-4-point">✦</div>
        <div className="absolute bottom-32 right-1/3 star-4-point">✦</div>
        <div className="absolute bottom-16 right-60 star-4-point animate-twinkle-dot">✦</div>

        {/* Small bright sparkling dots - moved some to bottom */}
        <div className="absolute top-24 left-16 w-1.5 h-1.5 bg-white rounded-full animate-sparkle shadow-white shadow-sm" style={{ filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.8))' }}></div>
        <div className="absolute top-40 right-16 w-1.5 h-1.5 bg-blue-100 rounded-full animate-sparkle shadow-blue-100 shadow-sm" style={{ animationDelay: '1s', filter: 'drop-shadow(0 0 3px rgba(191,219,254,0.8))' }}></div>
        <div className="absolute bottom-24 left-1/4 w-1 h-1 bg-yellow-100 rounded-full animate-sparkle shadow-yellow-100 shadow-sm" style={{ animationDelay: '2.5s', filter: 'drop-shadow(0 0 2px rgba(254,249,195,0.8))' }}></div>
        <div className="absolute bottom-16 right-1/4 w-1.5 h-1.5 bg-purple-100 rounded-full animate-sparkle shadow-purple-100 shadow-sm" style={{ animationDelay: '0.8s', filter: 'drop-shadow(0 0 3px rgba(243,232,255,0.8))' }}></div>
        <div className="absolute top-20 left-16 w-1 h-1 bg-green-100 rounded-full animate-sparkle shadow-green-100 shadow-sm" style={{ animationDelay: '1.8s', filter: 'drop-shadow(0 0 2px rgba(220,252,231,0.8))' }}></div>
        <div className="absolute bottom-20 right-16 w-1.5 h-1.5 bg-pink-100 rounded-full animate-sparkle shadow-pink-100 shadow-sm" style={{ animationDelay: '3.2s', filter: 'drop-shadow(0 0 3px rgba(252,231,243,0.8))' }}></div>

        {/* Small twinkling stars - repositioned some to bottom */}
        <div className="absolute bottom-28 right-10 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-dot shadow-white shadow-sm" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-44 right-20 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-dot shadow-white shadow-sm" style={{ animationDelay: '1.2s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-dot shadow-white shadow-sm" style={{ animationDelay: '2.8s' }}></div>
        <div className="absolute top-16 right-1/3 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-dot shadow-white shadow-sm" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute bottom-28 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-dot shadow-white shadow-sm" style={{ animationDelay: '1.9s' }}></div>
        <div className="absolute top-48 right-1/4 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-dot shadow-white shadow-sm" style={{ animationDelay: '3.4s' }}></div>
        <div className="absolute bottom-20 left-48 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-dot shadow-white shadow-sm" style={{ animationDelay: '2.1s' }}></div>
        <div className="absolute top-36 right-20 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-dot shadow-white shadow-sm" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute top-52 left-2/5 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-dot shadow-white shadow-sm" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-48 right-48 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-dot shadow-white shadow-sm" style={{ animationDelay: '2.9s' }}></div>
        <div className="absolute top-64 left-96 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-dot shadow-white shadow-sm" style={{ animationDelay: '0.9s' }}></div>
        <div className="absolute top-96 right-48 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-dot shadow-white shadow-sm" style={{ animationDelay: '3.1s' }}></div>

        {/* Small dots with twinkling */}
        <div className="absolute top-24 left-1/2 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute top-44 right-1/2 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '1.7s' }}></div>
        <div className="absolute top-60 left-20 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '2.8s' }}></div>
        <div className="absolute top-76 right-40 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '0.9s' }}></div>
        <div className="absolute top-92 left-40 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '1.4s' }}></div>
        <div className="absolute top-104 right-24 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '2.1s' }}></div>
        <div className="absolute top-8 left-12 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '1.9s' }}></div>
        <div className="absolute top-18 right-12 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '0.6s' }}></div>
        <div className="absolute top-34 right-64 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '2.4s' }}></div>
        <div className="absolute top-50 right-14 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '1.1s' }}></div>
        <div className="absolute top-64 left-64 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '2.6s' }}></div>
        <div className="absolute top-82 right-11 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute top-98 left-7/8 w-1 h-1 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '1.6s' }}></div>

        {/* Extra tiny dots */}
        <div className="absolute top-12 left-1/4 w-0.5 h-0.5 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '0.4s' }}></div>
        <div className="absolute top-26 right-1/4 w-0.5 h-0.5 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '1.8s' }}></div>
        <div className="absolute top-42 left-3/4 w-0.5 h-0.5 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '2.3s' }}></div>
        <div className="absolute top-58 right-3/4 w-0.5 h-0.5 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute top-74 left-12 w-0.5 h-0.5 bg-white rounded-full animate-twinkle-dot" style={{ animationDelay: '1.3s' }}></div>
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
              {/* Email/Username field */}
              <div>
                <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-200 mb-2">
                  Email or Username
                </label>
                <input
                  id="emailOrUsername"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none backdrop-blur-sm"
                  placeholder="Enter email or username"
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
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-green-600 bg-white/10 border-white/30 rounded focus:ring-green-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-300">Remember me</span>
                </label>
              </div>

              {/* Login button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-violet-700 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-violet-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25"
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


          </div>
        </div>
      </div>
    </div>
  )
}