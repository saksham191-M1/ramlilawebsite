# Quiz API Configuration

To enable dynamic quiz question generation, you need to configure an API key for one of the supported providers.

## Supported Providers

### 1. OpenAI (Recommended)
- **Provider**: `openai`
- **API Key**: 
- **Model**: `gpt-3.5-turbo` or `gpt-4`

### 2. Google Gemini
- **Provider**: `google`
- **API Key**: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Model**: `gemini-pro`

### 3. Custom API
- **Provider**: `custom`
- **Base URL**: Your custom API endpoint
- **API Key**: Your custom API key

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Required: Choose your API provider
QUIZ_API_PROVIDER=openai

# Required: Your API key
QUIZ_API_KEY=

# Optional: For OpenAI - specify model
QUIZ_API_MODEL=gpt-3.5-turbo

# Optional: For custom API - specify base URL
QUIZ_API_BASE_URL=https://your-custom-api.com

# Optional: Maximum questions per request (default: 50)
QUIZ_MAX_QUESTIONS=50

# Optional: Cache TTL in minutes (default: 60)
QUIZ_CACHE_TTL=60
```

## Example Configurations

### OpenAI Configuration
```bash
QUIZ_API_PROVIDER=openai
QUIZ_API_KEY=
QUIZ_API_MODEL=gpt-3.5-turbo
```

### Google Gemini Configuration
```bash
QUIZ_API_PROVIDER=google
QUIZ_API_KEY=your-google-api-key-here
```

### Custom API Configuration
```bash
QUIZ_API_PROVIDER=custom
QUIZ_API_KEY=your-custom-api-key
QUIZ_API_BASE_URL=https://your-custom-api.com
```

## API Usage

Once configured, the quiz will automatically use the API to generate questions. You can also use the API endpoints directly:

### Generate Questions
```bash
# POST /api/quiz/generate
curl -X POST http://localhost:3000/api/quiz/generate \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Ramlila and Ramayana",
    "language": "en",
    "count": 10,
    "difficulty": "medium"
  }'
```

### Generate Questions (GET)
```bash
# GET /api/quiz/generate?topic=Ramlila&language=en&count=10&difficulty=medium
curl "http://localhost:3000/api/quiz/generate?topic=Ramlila&language=en&count=10&difficulty=medium"
```

## Features

- **Dynamic Question Generation**: Generate unlimited questions on any topic
- **Multiple Languages**: Support for Hindi and English
- **Difficulty Levels**: Easy, Medium, Hard
- **Caching**: Questions are cached to reduce API calls
- **Fallback**: Falls back to static questions if API fails
- **Error Handling**: Graceful error handling and user feedback

## Cost Considerations

- **OpenAI**: ~$0.002 per 10 questions (GPT-3.5-turbo)
- **Google Gemini**: Free tier available, then pay-per-use
- **Custom API**: Depends on your provider

## Security

- API keys are stored in environment variables
- Never commit API keys to version control
- Use `.env.local` for local development
- Use environment variables in production

## Troubleshooting

1. **API Key Not Working**: Verify your API key is correct and has sufficient credits
2. **Rate Limits**: Check if you've hit API rate limits
3. **Network Issues**: Ensure your server can reach the API endpoints
4. **Invalid Response**: Check API response format matches expected structure

## Testing

You can test the API integration by:

1. Setting up your API key in `.env.local`
2. Starting the development server: `npm run dev`
3. Visiting `/quiz` and taking a quiz
4. Checking the browser console for any errors
5. Using the admin panel at `/admin/quiz` to monitor performance

