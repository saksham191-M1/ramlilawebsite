interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
  category?: string
  difficulty?: 'easy' | 'medium' | 'hard'
}

interface QuizApiConfig {
  provider: 'openai' | 'google' | 'custom'
  apiKey:  string
  baseUrl?: string
  model?: string

}

interface QuizGenerationRequest {
  topic: string
  language: 'hi' | 'en'
  count: number
  difficulty?: 'easy' | 'medium' | 'hard'
  categories?: string[]
}

class QuizApiService {
  private config: QuizApiConfig
  private cache: Map<string, QuizQuestion[]> = new Map()

  constructor(config: QuizApiConfig) {
    this.config = config
  }

  async generateQuestions(request: QuizGenerationRequest): Promise<QuizQuestion[]> {
    const cacheKey = this.getCacheKey(request)
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    try {
      let questions: QuizQuestion[] = []

      switch (this.config.provider) {
        case 'openai':
          questions = await this.generateWithOpenAI(request)
          break
        case 'google':
          questions = await this.generateWithGoogle(request)
          break
        case 'custom':
          questions = await this.generateWithCustomAPI(request)
          break
        default:
          throw new Error(`Unsupported API provider: ${this.config.provider}`)
      }

      // Cache the results
      this.cache.set(cacheKey, questions)
      return questions
    } catch (error) {
      console.error('Error generating questions:', error)
      // Return fallback questions if API fails
      return this.getFallbackQuestions(request)
    }
  }

  private async generateWithOpenAI(request: QuizGenerationRequest): Promise<QuizQuestion[]> {
    const prompt = this.buildOpenAIPrompt(request)
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.config.model || 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert quiz generator specializing in Ramayana and Ramlila knowledge. Generate accurate, educational quiz questions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices[0].message.content
    
    return this.parseOpenAIResponse(content)
  }

  private async generateWithGoogle(request: QuizGenerationRequest): Promise<QuizQuestion[]> {
    // Google Gemini API integration
    const prompt = this.buildGooglePrompt(request)
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.config.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2000
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`)
    }

    const data = await response.json()
    const content = data.candidates[0].content.parts[0].text
    
    return this.parseGoogleResponse(content)
  }

  private async generateWithCustomAPI(request: QuizGenerationRequest): Promise<QuizQuestion[]> {
    const response = await fetch(`${this.config.baseUrl}/generate-questions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    })

    if (!response.ok) {
      throw new Error(`Custom API error: ${response.status}`)
    }

    return await response.json()
  }

  private buildOpenAIPrompt(request: QuizGenerationRequest): string {
    const language = request.language === 'hi' ? 'Hindi' : 'English'
    const difficulty = request.difficulty || 'medium'
    
    return `Generate ${request.count} quiz questions about ${request.topic} in ${language}.

Requirements:
- Language: ${language}
- Difficulty: ${difficulty}
- Topic: ${request.topic}
- Format: Multiple choice with 4 options each
- Include explanations for correct answers

Return the questions in this JSON format:
[
  {
    "question": "Question text here",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correct": 0,
    "explanation": "Explanation of the correct answer",
    "category": "Category name",
    "difficulty": "${difficulty}"
  }
]

Make sure the questions are accurate, educational, and related to Ramayana/Ramlila traditions.`
  }

  private buildGooglePrompt(request: QuizGenerationRequest): string {
    const language = request.language === 'hi' ? 'Hindi' : 'English'
    const difficulty = request.difficulty || 'medium'
    
    return `Generate ${request.count} quiz questions about ${request.topic} in ${language}.

Requirements:
- Language: ${language}
- Difficulty: ${difficulty}
- Topic: ${request.topic}
- Format: Multiple choice with 4 options each
- Include explanations for correct answers

Return the questions in this JSON format:
[
  {
    "question": "Question text here",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correct": 0,
    "explanation": "Explanation of the correct answer",
    "category": "Category name",
    "difficulty": "${difficulty}"
  }
]

Make sure the questions are accurate, educational, and related to Ramayana/Ramlila traditions.`
  }

  private parseOpenAIResponse(content: string): QuizQuestion[] {
    try {
      // Extract JSON from the response
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        throw new Error('No JSON found in response')
      }
      
      const questions = JSON.parse(jsonMatch[0])
      return this.validateQuestions(questions)
    } catch (error) {
      console.error('Error parsing OpenAI response:', error)
      throw new Error('Failed to parse API response')
    }
  }

  private parseGoogleResponse(content: string): QuizQuestion[] {
    try {
      // Extract JSON from the response
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        throw new Error('No JSON found in response')
      }
      
      const questions = JSON.parse(jsonMatch[0])
      return this.validateQuestions(questions)
    } catch (error) {
      console.error('Error parsing Google response:', error)
      throw new Error('Failed to parse API response')
    }
  }

  private validateQuestions(questions: any[]): QuizQuestion[] {
    return questions.filter(q => 
      q.question && 
      q.options && 
      Array.isArray(q.options) && 
      q.options.length === 4 &&
      typeof q.correct === 'number' &&
      q.correct >= 0 && 
      q.correct < 4 &&
      q.explanation
    ).map(q => ({
      question: q.question,
      options: q.options,
      correct: q.correct,
      explanation: q.explanation,
      category: q.category || 'General',
      difficulty: q.difficulty || 'medium'
    }))
  }

  private getCacheKey(request: QuizGenerationRequest): string {
    return `${request.topic}-${request.language}-${request.count}-${request.difficulty || 'medium'}`
  }

  private getFallbackQuestions(request: QuizGenerationRequest): QuizQuestion[] {
    // Return some default questions if API fails
    const isHindi = request.language === 'hi'

    return [
      {
        question: isHindi ? "राम के पिता का क्या नाम था?" : "What was the name of Rama's father?",
        options: isHindi
          ? ["दशरथ", "जनका", "विश्वामित्र", "हनुमान"]
          : ["Dasharatha", "Janaka", "Vishwamitra", "Hanuman"],
        correct: 0,
        explanation: isHindi
          ? "राम के पिता का नाम दशरथ था, जो अयोध्या के राजा थे।"
          : "Rama's father was Dasharatha, the king of Ayodhya.",
        category: "Characters",
        difficulty: "easy",
      },
      {
        question: isHindi ? "रावण कहाँ का राजा था?" : "Where was Ravana the king of?",
        options: isHindi
          ? ["अयोध्या", "लंका", "मिथिला", "किष्किन्धा"]
          : ["Ayodhya", "Lanka", "Mithila", "Kishkindha"],
        correct: 1,
        explanation: isHindi
          ? "रावण लंका का राजा था।"
          : "Ravana was the king of Lanka.",
        category: "Geography",
        difficulty: "easy",
      },
      {
        question: isHindi ? "हनुमान किसके भक्त थे?" : "Who was Hanuman a devotee of?",
        options: isHindi
          ? ["राम", "कृष्ण", "शिव", "इंद्र"]
          : ["Rama", "Krishna", "Shiva", "Indra"],
        correct: 0,
        explanation: isHindi
          ? "हनुमान राम के भक्त थे।"
          : "Hanuman was a devotee of Rama.",
        category: "Characters",
        difficulty: "easy",
      },
      {
        question: isHindi ? "राम की पत्नी का क्या नाम था?" : "What was the name of Rama's wife?",
        options: isHindi
          ? ["सीता", "द्रौपदी", "राधा", "लक्ष्मी"]
          : ["Sita", "Draupadi", "Radha", "Lakshmi"],
        correct: 0,
        explanation: isHindi
          ? "राम की पत्नी का नाम सीता था।"
          : "Rama's wife was Sita.",
        category: "Characters",
        difficulty: "easy",
      },
    ]
  }


  // Clear cache method
  clearCache(): void {
    this.cache.clear()
  }

  // Get cache size
  getCacheSize(): number {
    return this.cache.size
  }
}

export { QuizApiService, type QuizQuestion, type QuizApiConfig, type QuizGenerationRequest }
