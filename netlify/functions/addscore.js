// File: netlify/functions/addScore.js

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // 1. Parse all required data, including timeSpent
    const { name, score, percentage, timeSpent } = JSON.parse(event.body);

    // 2. Validate the data
    if (!name || typeof score !== 'number' || typeof percentage !== 'number' || typeof timeSpent !== 'number') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid data provided.' })
      };
    }

    // 3. UPDATED SQL QUERY: Insert the timeSpent value into the time_taken column
    const query = 'INSERT INTO leaderboard (name, score, percentage, time_taken) VALUES ($1, $2, $3, $4) RETURNING id;';
    const values = [name, score, percentage, timeSpent];

    const client = await pool.connect();
    const result = await client.query(query, values);
    client.release();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Score added successfully!',
        newEntryId: result.rows[0].id
      })
    };

  } catch (error) {
    console.error('Error adding score:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to add score.' })
    };
  }
};