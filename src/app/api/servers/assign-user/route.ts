import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'

const prisma = new PrismaClient()

// PUT /api/servers/assign-user - Gán user cho server (chỉ ADMIN)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is ADMIN
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email! },
      select: { role: true }
    })

    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Access denied. Admin role required.' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { serverId, username } = body

    if (!serverId) {
      return NextResponse.json(
        { error: 'serverId is required' },
        { status: 400 }
      )
    }

    // Validate username exists if provided
    if (username) {
      const targetUser = await prisma.user.findUnique({
        where: { username },
        select: { username: true }
      })

      if (!targetUser) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }
    }

    const server = await prisma.server.update({
      where: { id: parseInt(serverId) },
      data: {
        username: username || null
      }
    })

    return NextResponse.json({
      message: 'User assigned successfully',
      server
    })
  } catch (error) {
    console.error('Error assigning user to server:', error)
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Server not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to assign user' },
      { status: 500 }
    )
  }
}

// GET /api/servers/assign-user - Lấy danh sách users để assign (chỉ ADMIN)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is ADMIN
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email! },
      select: { role: true }
    })

    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Access denied. Admin role required.' },
        { status: 403 }
      )
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true
      },
      orderBy: {
        username: 'asc'
      }
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}