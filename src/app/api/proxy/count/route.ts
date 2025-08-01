import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {

    
    const response = await fetch('http://bas.reupnet.info/profile/kasmoon/proxy/cnt-available', {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      }
    })


    
    if (!response.ok) {

      return NextResponse.json(
        { error: 'Failed to fetch proxy count' }, 
        { status: response.status }
      )
    }

    const count = await response.text()

    
    const parsedCount = parseInt(count.trim())

    
    if (isNaN(parsedCount)) {

      return NextResponse.json(
        { error: 'Invalid count format' }, 
        { status: 500 }
      )
    }

    return NextResponse.json({ count: parsedCount })
    
  } catch (error) {
    console.error('Error in proxy API:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}