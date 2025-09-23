// --- INTERFACES ---
// Defines the structure for a single quiz question.
interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
  category?: string
  difficulty?: 'easy' | 'medium' | 'hard'
}

// Defines the configuration for the API service.
// The apiKey will be provided by an environment variable.
interface QuizApiConfig {
  provider: 'openai' | 'google' | 'custom'
  apiKey: string // This will be loaded from .env
  baseUrl?: string
  model?: string
}

// Defines the structure for a request to generate new questions.
interface QuizGenerationRequest {
  topic: string
  language: 'hi' | 'en'
  count: number
  difficulty?: 'easy' | 'medium' | 'hard'
  categories?: string[]
}

// --- API SERVICE CLASS ---
class QuizApiService {
  private config: QuizApiConfig
  private cache: Map<string, QuizQuestion[]> = new Map()

  constructor(config: QuizApiConfig) {
    this.config = config
    if (!config.apiKey) {
      console.error("API key is missing in the configuration!");
      throw new Error("API key is required for QuizApiService.");
    }
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
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const data = await response.json()
    const content = data.choices[0].message.content
    
    return this.parseApiResponse(content)
  }

  private async generateWithGoogle(request: QuizGenerationRequest): Promise<QuizQuestion[]> {
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
      throw new Error(`Google API error: ${response.statusText}`)
    }

    const data = await response.json()
    const content = data.candidates[0].content.parts[0].text
    
    return this.parseApiResponse(content)
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
    return this.buildBasePrompt(request);
  }

  private buildGooglePrompt(request: QuizGenerationRequest): string {
    return this.buildBasePrompt(request);
  }
  
  private buildBasePrompt(request: QuizGenerationRequest): string {
    const language = request.language === 'hi' ? 'Hindi' : 'English'
    const difficulty = request.difficulty || 'medium'
    
    return `Generate ${request.count} quiz questions about ${request.topic} in ${language}.

Requirements:
- Language: ${language}
- Difficulty: ${difficulty}
- Topic: ${request.topic}
- Format: Multiple choice with 4 options each
- Include explanations for correct answers

Return ONLY the questions in a valid JSON array format like this:
[
  {
    "question": "Question text here",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correct": 0,
    "explanation": "Explanation of the correct answer.",
    "category": "Category name",
    "difficulty": "${difficulty}"
  }
]

Do not include any text before or after the JSON array.`
  }

  private parseApiResponse(content: string): QuizQuestion[] {
    try {
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        throw new Error('No valid JSON array found in the API response.')
      }
      
      const questions = JSON.parse(jsonMatch[0])
      return this.validateQuestions(questions)
    } catch (error) {
      console.error('Error parsing API response:', error)
      throw new Error('Failed to parse API response.')
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
      ...q, // Keep all valid fields
      category: q.category || 'General',
      difficulty: q.difficulty || 'medium'
    }))
  }

  private getCacheKey(request: QuizGenerationRequest): string {
    return `${request.topic}-${request.language}-${request.count}-${request.difficulty || 'medium'}`
  }

  private getFallbackQuestions(request: QuizGenerationRequest): QuizQuestion[] {
    const isHindi = request.language === 'hi'
    return [
      {
        question: isHindi ? "राम के पिता का क्या नाम था?" : "What was the name of Rama's father?",
        options: isHindi ? ["दशरथ", "जनका", "विश्वामित्र", "हनुमान"] : ["Dasharatha", "Janaka", "Vishwamitra", "Hanuman"],
        correct: 0,
        explanation: isHindi ? "राम के पिता का नाम दशरथ था, जो अयोध्या के राजा थे।" : "Rama's father was Dasharatha, the king of Ayodhya.",
        category: "Characters",
        difficulty: "easy",
      },
      {
        question: isHindi ? "रावण कहाँ का राजा था?" : "Where was Ravana the king of?",
        options: isHindi ? ["अयोध्या", "लंका", "मिथिला", "किष्किन्धा"] : ["Ayodhya", "Lanka", "Mithila", "Kishkindha"],
        correct: 1,
        explanation: isHindi ? "रावण लंका का राजा था।" : "Ravana was the king of Lanka.",
        category: "Geography",
        difficulty: "easy",
      },
    ]
  }

  clearCache(): void {
    this.cache.clear()
  }

  getCacheSize(): number {
    return this.cache.size
  }
}


// --- SERVICE INSTANTIATION AND EXPORT ---

// Securely get the API key from environment variables.
// This syntax (`process.env.REACT_APP_...`) is standard for projects created with Create React App.
const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

// Throw an error if the API key is not found. This helps with debugging.
if (!apiKey) {
  throw new Error("API Key not found. Please add REACT_APP_OPENAI_API_KEY to your .env file.");
}

// Create the configuration object for the service.
const quizApiConfig: QuizApiConfig = {
  provider: 'openai', // You can change this to 'google' if needed
  apiKey: apiKey,
  model: 'gpt-3.5-turbo'
};

// Create a single, shared instance of the service.
const quizService = new QuizApiService(quizApiConfig);


// Export the service instance and the interfaces for use in other files.
export { quizService, type QuizQuestion, type QuizApiConfig, type QuizGenerationRequest };

