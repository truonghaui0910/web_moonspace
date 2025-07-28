
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

// Get all active sessions
export async function GET() {
  try {
    const sessions = await prisma.session.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            name: true
          }
        }
      },
      orderBy: {
        expires: 'desc'
      }
    })

    return NextResponse.json(sessions)
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 })
  }
}

// Delete session(s) by user ID
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await request.json()
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Delete all sessions for the user
    const result = await prisma.session.deleteMany({
      where: {
        userId: userId
      }
    })

    return NextResponse.json({ 
      message: `Deleted ${result.count} session(s) for user`,
      deletedCount: result.count 
    })
  } catch (error) {
    console.error('Error deleting sessions:', error)
    return NextResponse.json({ error: 'Failed to delete sessions' }, { status: 500 })
  }
}
