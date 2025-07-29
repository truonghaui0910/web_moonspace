import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { JWT } from 'next-auth/jwt'

// Extend the JWT interface to include custom properties
declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    username?: string
    exp: number
  }
}

// Optional: Extend the User interface if needed
declare module 'next-auth' {
  interface User {
    id: string
    username?: string
  }

  interface Session {
    user: {
      id: string
      username: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        emailOrUsername: { label: 'Email or Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.emailOrUsername || !credentials?.password) {
          return null
        }

        try {
          // Find user by email or username
          const user = await prisma.user.findFirst({
            where: {
              OR: [
                { email: credentials.emailOrUsername },
                { username: credentials.emailOrUsername }
              ]
            }
          })

          if (!user) {
            throw new Error('INVALID_CREDENTIALS')
          }

          if (user && user.status === 0) {
            // User is disabled, return specific error
            throw new Error('ACCOUNT_DISABLED')
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

          if (!isPasswordValid) {
            throw new Error('INVALID_CREDENTIALS')
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name || user.username,
            username: user.username
          }
        } catch (error: any) {
          console.error('Auth error:', error)
          // Re-throw the error to be handled by NextAuth
          throw error
        }
      }
    })
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user, account }): Promise<JWT> {
      if (user) {
        token.id = user.id
        token.username = (user as any).username
      }

      // Check user status on each token validation
      if (token.id) {
        const currentUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { status: true }
        })

        if (!currentUser || currentUser.status === 0) {
          // User is disabled, clear token data but still return valid JWT structure
          return {
            ...token,
            id: undefined,
            username: undefined,
            exp: 0 // Force immediate expiry
          }
        }
      }

      // Set token expiry based on remember me
      if (account) {
        const rememberMe = account.rememberMe === 'true'
        if (rememberMe) {
          // 1 year for remember me
          token.exp = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365)
        } else {
          // 2 months default
          token.exp = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 60)
        }
      }

      return token
    },
    async session({ session, token }) {
      // Ensure session.user exists
      if (!session.user) {
        session.user = {} as any
      }

      // Only set session data if token has valid user data
      if (token.id && token.exp > Math.floor(Date.now() / 1000)) {
        session.user.id = token.id
        session.user.username = token.username || ''
        return session
      } else {
        // Token is invalid/expired, return null to force sign out
        return null
      }
    },
    async redirect({ url, baseUrl }) {
      // Redirect to channels after successful login
      if (url === baseUrl || url === `${baseUrl}/`) {
        return `${baseUrl}/channels`
      }
      return url.startsWith(baseUrl) ? url : baseUrl
    }
  },
  session: {
    strategy: 'jwt'
  },
  events: {
    async signOut({ token }) {
      // Optional: Log sign out events
      console.log('User signed out:', token?.id)
    }
  }
})

export { handler as GET, handler as POST }