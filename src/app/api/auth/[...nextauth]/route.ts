

import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from '@/lib/prisma'

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        emailOrUsername: { label: 'Email or Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
        rememberMe: { label: 'Remember Me', type: 'checkbox' }
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
    async signIn({ user, account, profile, email, credentials }) {
      // Set session expiry based on remember me
      if (account && credentials) {
        const rememberMe = (credentials as any).rememberMe === 'true'
        if (rememberMe) {
          // 1 year for remember me
          account.expires_at = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365)
        } else {
          // 2 months default
          account.expires_at = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 60)
        }
      }
      return true
    },
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id
        session.user.username = (user as any).username
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
    strategy: 'database',
    maxAge: 60 * 60 * 24 * 60, // 2 months default
  }
})

export { handler as GET, handler as POST }

