"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Brain, Loader2, CheckCircle, XCircle } from "lucide-react"

interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
  category?: string
  difficulty?: string
}

export default function TestApiPage() {
  const [apiKey, setApiKey] = useState('')
  const [provider, setProvider] = useState<'openai' | 'google' | 'custom'>('openai')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    questions?: QuizQuestion[]
    error?: string
    count?: number
  } | null>(null)

  const testApi = async () => {
    if (!apiKey.trim()) {
      setResult({ success: false, error: 'Please enter an API key' })
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      // Set the API key in environment (this is just for testing)
      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: 'Ramlila and Ramayana',
          language: 'en',
          count: 5,
          difficulty: 'medium'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult({
          success: true,
          questions: data.questions,
          count: data.count
        })
      } else {
        setResult({
          success: false,
          error: data.error || 'Unknown error occurred'
        })
      }
    } catch (error) {
      setResult({
        success: false,
        error: 'Network error: ' + (error as Error).message
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Quiz API Tester</h1>
          <p className="text-muted-foreground">
            Test your API key and generate quiz questions dynamically
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Configuration Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                API Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="provider">API Provider</Label>
                <select
                  id="provider"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value as 'openai' | 'google' | 'custom')}
                  className="w-full mt-1 p-2 border rounded-md bg-background"
                >
                  <option value="openai">OpenAI (GPT-3.5/GPT-4)</option>
                  <option value="google">Google Gemini</option>
                  <option value="custom">Custom API</option>
                </select>
              </div>

              <div>
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="bg-muted/50 p-3 rounded-lg">
                <h4 className="font-medium mb-2">Setup Instructions:</h4>
                <ol className="text-sm space-y-1 text-muted-foreground">
                  <li>1. Get your API key from the provider</li>
                  <li>2. Create a <code className="bg-muted px-1 rounded">.env.local</code> file</li>
                  <li>3. Add: <code className="bg-muted px-1 rounded">QUIZ_API_KEY=your_key_here</code></li>
                  <li>4. Add: <code className="bg-muted px-1 rounded">QUIZ_API_PROVIDER={provider}</code></li>
                  <li>5. Restart your development server</li>
                </ol>
              </div>

              <Button 
                onClick={testApi} 
                disabled={isLoading || !apiKey.trim()}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Testing API...
                  </>
                ) : (
                  'Test API & Generate Questions'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {result?.success ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : result?.success === false ? (
                  <XCircle className="w-5 h-5 text-red-500" />
                ) : (
                  <Brain className="w-5 h-5" />
                )}
                Test Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!result ? (
                <div className="text-center py-8 text-muted-foreground">
                  Click "Test API" to generate sample questions
                </div>
              ) : result.success ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="default">Success</Badge>
                    <span className="text-sm text-muted-foreground">
                      Generated {result.count} questions
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {result.questions?.map((question, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <h4 className="font-medium mb-2">{question.question}</h4>
                        <div className="space-y-1">
                          {question.options.map((option, optIndex) => (
                            <div 
                              key={optIndex}
                              className={`text-sm p-2 rounded ${
                                optIndex === question.correct 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-muted'
                              }`}
                            >
                              {String.fromCharCode(65 + optIndex)}. {option}
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {question.explanation}
                        </p>
                        {question.category && (
                          <Badge variant="outline" className="mt-2">
                            {question.category}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">Error</Badge>
                  </div>
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                    <p className="text-sm text-destructive">{result.error}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium mb-2">Common issues:</p>
                    <ul className="space-y-1">
                      <li>• Invalid API key</li>
                      <li>• Insufficient API credits</li>
                      <li>• Network connectivity issues</li>
                      <li>• API rate limits exceeded</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">1. Get API Key</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><strong>OpenAI:</strong> Visit <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">platform.openai.com/api-keys</a></li>
                <li><strong>Google:</strong> Visit <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">makersuite.google.com/app/apikey</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">2. Configure Environment</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Create a <code className="bg-muted px-1 rounded">.env.local</code> file in your project root:
              </p>
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`QUIZ_API_PROVIDER=openai
QUIZ_API_KEY=your_api_key_here
QUIZ_API_MODEL=gpt-3.5-turbo`}
              </pre>
            </div>

            <div>
              <h4 className="font-medium mb-2">3. Test & Use</h4>
              <p className="text-sm text-muted-foreground">
                Once configured, the quiz will automatically use API-generated questions when you select "Dynamic Questions" mode.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

