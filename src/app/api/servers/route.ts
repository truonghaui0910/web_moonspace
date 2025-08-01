import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'

const prisma = new PrismaClient()

// GET /api/servers - Lấy danh sách servers
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    
    // Build where clause based on user role
    const where: any = {}
    
    if (status !== null && status !== undefined) {
      where.status = parseInt(status)
    }

    // Role-based filtering
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      select: { role: true, username: true }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // VIEWER can only see servers with matching username
    if (user.role === 'VIEWER') {
      where.username = user.username
    }
    // ADMIN can see all servers (no additional filter)

    const servers = await prisma.server.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      servers,
      userRole: user.role
    })
  } catch (error) {
    console.error('Error fetching servers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch servers' },
      { status: 500 }
    )
  }
}

// POST /api/servers - Tạo server mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, host_url, status = 1 } = body

    if (!host_url) {
      return NextResponse.json(
        { error: 'host_url is required' },
        { status: 400 }
      )
    }

    const server = await prisma.server.create({
      data: {
        username: username || null,
        host_url,
        status
      }
    })

    return NextResponse.json(server, { status: 201 })
  } catch (error) {
    console.error('Error creating server:', error)
    return NextResponse.json(
      { error: 'Failed to create server' },
      { status: 500 }
    )
  }
}