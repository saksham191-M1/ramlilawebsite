import { NextResponse } from 'next/server'
import { Database } from '@/lib/database'

export async function GET() {
  try {
    const stats = await Database.getQuizStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching quiz stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

