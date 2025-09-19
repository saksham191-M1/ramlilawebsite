import { NextRequest, NextResponse } from 'next/server'
import { QuizApiService, QuizGenerationRequest } from '@/lib/quiz-api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { topic, language, count, difficulty, categories } = body

    // Validate required fields
    if (!topic || !language || !count) {
      return NextResponse.json(
        { error: 'Missing required fields: topic, language, count' },
        { status: 400 }
      )
    }

    if (!['hi', 'en'].includes(language)) {
      return NextResponse.json(
        { error: 'Language must be "hi" or "en"' },
        { status: 400 }
      )
    }

    if (count < 1 || count > 50) {
      return NextResponse.json(
        { error: 'Count must be between 1 and 50' },
        { status: 400 }
      )
    }

    // Get API configuration from environment variables
    const apiKey = process.env.QUIZ_API_KEY
    const apiProvider = process.env.QUIZ_API_PROVIDER || 'openai'
    const apiBaseUrl = process.env.QUIZ_API_BASE_URL
    const apiModel = process.env.QUIZ_API_MODEL

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Quiz API key not configured' },
        { status: 500 }
      )
    }

    // Initialize the quiz API service
    const quizApi = new QuizApiService({
      provider: apiProvider as 'openai' | 'google' | 'custom',
      apiKey,
      baseUrl: apiBaseUrl,
      model: apiModel
    })

    // Generate questions
    const questions = await quizApi.generateQuestions({
      topic,
      language,
      count,
      difficulty: difficulty || 'medium',
      categories
    })

    return NextResponse.json({
      questions,
      count: questions.length,
      topic,
      language,
      difficulty: difficulty || 'medium'
    })

  } catch (error) {
    console.error('Error generating quiz questions:', error)
    return NextResponse.json(
      { error: 'Failed to generate quiz questions' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const topic = searchParams.get('topic') || 'Ramlila and Ramayana'
    const language = searchParams.get('language') || 'en'
    const count = parseInt(searchParams.get('count') || '10')
    const difficulty = searchParams.get('difficulty') || 'medium'

    // Validate parameters
    if (!['hi', 'en'].includes(language)) {
      return NextResponse.json(
        { error: 'Language must be "hi" or "en"' },
        { status: 400 }
      )
    }

    if (count < 1 || count > 50) {
      return NextResponse.json(
        { error: 'Count must be between 1 and 50' },
        { status: 400 }
      )
    }

    // Get API configuration
    const apiKey = process.env.QUIZ_API_KEY
    const apiProvider = process.env.QUIZ_API_PROVIDER || 'openai'
    const apiBaseUrl = process.env.QUIZ_API_BASE_URL
    const apiModel = process.env.QUIZ_API_MODEL

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Quiz API key not configured' },
        { status: 500 }
      )
    }

    // Initialize the quiz API service
    const quizApi = new QuizApiService({
      provider: apiProvider as 'openai' | 'google' | 'custom',
      apiKey,
      baseUrl: apiBaseUrl,
      model: apiModel
    })

    // Generate questions
    const questions = await quizApi.generateQuestions({
      topic,
      language: language as 'hi' | 'en',
      count,
      difficulty: difficulty as 'easy' | 'medium' | 'hard'
    })

    return NextResponse.json({
      questions,
      count: questions.length,
      topic,
      language,
      difficulty
    })

  } catch (error) {
    console.error('Error generating quiz questions:', error)
    return NextResponse.json(
      { error: 'Failed to generate quiz questions' },
      { status: 500 }
    )
  }
}

