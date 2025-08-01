import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'

const prisma = new PrismaClient()

// POST /api/servers/[id]/destroy-session - Destroy session for server
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid server ID' },
        { status: 400 }
      )
    }

    // Check if server exists
    const server = await prisma.server.findUnique({
      where: { id }
    })

    if (!server) {
      return NextResponse.json(
        { error: 'Server not found' },
        { status: 404 }
      )
    }

    // Get current user role
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

    // Check permissions - VIEWER can only destroy sessions for their assigned servers
    if (user.role === 'VIEWER' && server.username !== user.username) {
      return NextResponse.json(
        { error: 'Access denied. You can only destroy sessions for your assigned servers.' },
        { status: 403 }
      )
    }

    // Call external destroy API if kasm_id exists
    if (server.kasm_id) {
      try {
        const destroyResponse = await fetch(
          `http://bas.reupnet.info/profile/kasmoon/destroy-by-id/${encodeURIComponent(server.host_url)}/${server.kasm_id}`,
          {
            method: 'GET',
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            }
          }
        )

        if (destroyResponse.ok) {
          // Clear kasm_info from database
          await prisma.server.update({
            where: { id },
            data: { 
              kasm_info: null
            }
          })
        }
      } catch (error) {
        console.error('Error calling destroy API:', error)
      }
    }

    // Log the action (optional - you might want to create an audit log table)
    // await prisma.auditLog.create({
    //   data: {
    //     action: 'DESTROY_SESSION',
    //     serverId: server.id,
    //     userId: user.id,
    //     details: `Session destroyed for server ${server.host_url}`,
    //     timestamp: new Date()
    //   }
    // })

    return NextResponse.json({
      message: 'Session destroyed successfully',
      server: {
        id: server.id,
        host_url: server.host_url,
        username: server.username
      },
      destroyedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error destroying session:', error)
    return NextResponse.json(
      { error: 'Failed to destroy session' },
      { status: 500 }
    )
  }
}