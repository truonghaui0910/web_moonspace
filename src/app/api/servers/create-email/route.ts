import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { host_url, is_proxy } = await request.json()

    if (!host_url) {
      return NextResponse.json({ error: 'host_url is required' }, { status: 400 })
    }

    // Call external API
    const response = await fetch(
      `http://bas.reupnet.info/profile/kasmoon/request-creat-new-account/${encodeURIComponent(host_url)}/${is_proxy ? 1 : 0}`,
      {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        }
      }
    )

    if (!response.ok) {
      return NextResponse.json({ error: 'External API failed' }, { status: response.status })
    }

    const data = await response.json()

    // If no error and has kasm_id, save to database
    if (data.error === 0 && data.kasm_id) {
      await prisma.server.updateMany({
        where: { host_url },
        data: { 
          kasm_id: data.kasm_id,
          kasm_info: JSON.stringify(data)
        }
      })

      // Create complete URL from host_url + kasm_url
      const completeUrl = data.host_url + data.kasm_url
      
      return NextResponse.json({
        ...data,
        complete_url: completeUrl
      })
    }

    return NextResponse.json(data)

  } catch (error) {
    console.error('Error creating email:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}