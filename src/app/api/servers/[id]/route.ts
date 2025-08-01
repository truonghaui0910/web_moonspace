import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/servers/[id] - Lấy thông tin server theo ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid server ID' },
        { status: 400 }
      )
    }

    const server = await prisma.server.findUnique({
      where: { id }
    })

    if (!server) {
      return NextResponse.json(
        { error: 'Server not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(server)
  } catch (error) {
    console.error('Error fetching server:', error)
    return NextResponse.json(
      { error: 'Failed to fetch server' },
      { status: 500 }
    )
  }
}

// PUT /api/servers/[id] - Cập nhật server
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid server ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { username, host_url, status } = body

    const updateData: any = {}
    if (username !== undefined) updateData.username = username || null
    if (host_url !== undefined) updateData.host_url = host_url
    if (status !== undefined) updateData.status = status

    const server = await prisma.server.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json(server)
  } catch (error) {
    console.error('Error updating server:', error)
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Server not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to update server' },
      { status: 500 }
    )
  }
}

// DELETE /api/servers/[id] - Xóa server
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid server ID' },
        { status: 400 }
      )
    }

    await prisma.server.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: 'Server deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting server:', error)
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Server not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to delete server' },
      { status: 500 }
    )
  }
}