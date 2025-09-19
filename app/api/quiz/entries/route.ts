import { NextRequest, NextResponse } from 'next/server'
import { Database, QuizEntry } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { name, score, percentage, totalQuestions, language, answers, timeSpent } = body
    
    if (!name || typeof score !== 'number' || typeof percentage !== 'number' || 
        !totalQuestions || !['hi', 'en'].includes(language) || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: 'Missing or invalid required fields' },
        { status: 400 }
      )
    }

    const entry = await Database.saveQuizEntry({
      name: name.trim(),
      score,
      percentage,
      totalQuestions,
      date: new Date().toISOString(),
      language,
      answers,
      timeSpent: timeSpent || 0
    })

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    console.error('Error saving quiz entry:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    
    const entries = await Database.getAllQuizEntries()
    
    // Apply limit if specified
    const limitedEntries = limit > 0 ? entries.slice(0, limit) : entries
    
    return NextResponse.json(limitedEntries)
  } catch (error) {
    console.error('Error fetching quiz entries:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

