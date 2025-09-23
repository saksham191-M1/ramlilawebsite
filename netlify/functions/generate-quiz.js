/**
 * This is a Netlify Function that acts as a secure proxy to the OpenAI API.
 * It receives a request from the frontend, adds the secret API key on the server,
 * calls OpenAI, and then returns the response to the frontend.
 * This keeps the API key completely hidden from the user's browser.
 */
exports.handler = async function(event) {
  // Only allow POST requests, reject anything else.
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // 1. Get the quiz requirements from the frontend request.
    const request = JSON.parse(event.body);
    
    // 2. Securely get the API key from the environment variables you set in Netlify.
    const apiKey = process.env.OPENAI_API_KEY; 

    if (!apiKey) {
      console.error("The OPENAI_API_KEY environment variable is not set in Netlify.");
      throw new Error("Server configuration error: API key is missing.");
    }
    
    // 3. Build the detailed prompt for OpenAI.
    const language = request.language === 'hi' ? 'Hindi' : 'English';
    const difficulty = request.difficulty || 'medium';
    
    const prompt = `Generate ${request.count} quiz questions about ${request.topic} in ${language}.
      Requirements:
      - Language: ${language}
      - Difficulty: ${difficulty}
      - Topic: ${request.topic}
      - Format: Multiple choice with 4 options each.
      - Include detailed explanations for the correct answers.
      - Return ONLY the questions in a valid JSON array format.
      - Do not include any text or markdown formatting before or after the JSON array.`;

    // 4. Call the OpenAI API.
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an expert quiz generator specializing in Ramayana and Ramlila knowledge. Generate accurate, educational, and engaging quiz questions.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { "type": "json_object" } // Ask for JSON directly
      })
    });

    // Handle errors from the OpenAI API.
    if (!response.ok) {
      const errorBody = await response.text();
      console.error('OpenAI API Error:', errorBody);
      return { statusCode: response.status, body: `OpenAI API error: ${errorBody}` };
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // 5. Send the successful response back to the frontend.
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: content,
    };

  } catch (error) {
    // Handle any other errors that might occur.
    console.error('An unexpected error occurred:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

