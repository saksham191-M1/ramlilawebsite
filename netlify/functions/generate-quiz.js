// File: netlify/functions/generate-quiz.js

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const request = JSON.parse(event.body);
    const apiKey = process.env.QUIZ_API_KEY;

    if (!apiKey) {
      throw new Error("QUIZ_API_KEY environment variable not set.");
    }

    const prompt = `Generate ${request.count || 5} quiz questions about ${request.topic || 'Ramayana'} in ${request.language || 'hi'}.
      Requirements:
      - Language: ${request.language || 'hi'}
      - Difficulty: ${request.difficulty || 'medium'}
      - Format: Multiple choice with 4 options each.
      - Include detailed explanations for the correct answers.
      - Return ONLY the questions in a valid JSON array format like this: [{"question": "...", "options": [...], "correct": 0, "explanation": "..."}]
      - Do not include any text or markdown formatting before or after the JSON array.`;

    // UPDATED URL with the correct model name
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
        }
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Google API error: ${response.status} ${errorBody}`);
    }

    const data = await response.json();
    const content = data.candidates[0].content.parts[0].text;
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: content,
    };

  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};