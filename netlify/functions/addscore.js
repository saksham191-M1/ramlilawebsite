// File: netlify/functions/addscore.js

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // 1. Parse the incoming data
    const { name, score, percentage } = JSON.parse(event.body);

    // 2. Validate the data
    if (!name || typeof score !== 'number' || typeof percentage !== 'number') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid name, score, or percentage provided.' })
      };
    }

    // 3. Connect to the database and insert the score
    const client = await pool.connect();
    const query = 'INSERT INTO leaderboard (name, score, percentage) VALUES ($1, $2, $3) RETURNING id;';
    const values = [name, score, percentage];

    const result = await client.query(query, values);
    client.release();

    // 4. Return a success response
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