import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

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
            return null
          }

          if (user && user.status === 0) {
            // User is disabled, return null to deny login
            return null
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name || user.username,
            username: user.username
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user, account }) {
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
          // User is disabled, invalidate token
          return null
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
      if (token) {
        session.user.id = token.id as string
        session.user.username = token.username as string
      }
      return session
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
  }
})

export { handler as GET, handler as POST }