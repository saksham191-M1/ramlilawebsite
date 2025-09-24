/**
 * This is a Netlify Function that acts as a secure proxy to the OpenAI API.
 */
exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const request = JSON.parse(event.body);

    // --- Server-side validation ---
    const count = Math.min(request.count || 5, 10); // Limit to 10 questions max
    const topic = request.topic || 'Ramayana';
    const language = ['hi', 'en'].includes(request.language) ? request.language : 'hi';
    const difficulty = ['easy', 'medium', 'hard'].includes(request.difficulty) ? request.difficulty : 'medium';
    // --- End validation ---

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error("OPENAI_API_KEY is not set.");
      throw new Error("Server configuration error.");
    }
    
    const prompt = `Generate ${count} quiz questions about ${topic} in ${language}.
      Requirements:
      - Language: ${language}
      - Difficulty: ${difficulty}
      - Topic: ${topic}
      - Format: Multiple choice with 4 options each.
      - Include detailed explanations for the correct answers.
      - Return ONLY the questions in a valid JSON array format inside a JSON object with a key "questions".
      - Do not include any text or markdown formatting before or after the JSON object.`;

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
        response_format: { "type": "json_object" }
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('OpenAI API Error:', errorBody);
      return { statusCode: response.status, body: `OpenAI API error: ${errorBody}` };
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // The AI might return the questions directly as a stringified JSON.
    // We parse it and then stringify it again to ensure it's a valid JSON response.
    const parsedContent = JSON.parse(content);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsedContent.questions || []), // Ensure we send back an array
    };

  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};