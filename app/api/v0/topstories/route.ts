import { NextRequest, NextResponse } from 'next/server'

const HN_API_BASE = 'https://hacker-news.firebaseio.com/v0'

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${HN_API_BASE}/topstories.json`)
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch top stories' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    console.error('Error fetching top stories:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

