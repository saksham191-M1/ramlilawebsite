// File: netlify/functions/leaderboard.js

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

exports.handler = async function(event, context) {
  try {
    const client = await pool.connect();

    // UPDATED QUERY:
    // - Select the new time_taken column
    // - Order by score DESC (highest first), then time_taken ASC (lowest first)
    const result = await client.query(
      'SELECT name, score, percentage, date, time_taken FROM leaderboard ORDER BY score DESC, time_taken ASC LIMIT 10;'
    );

    client.release();

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows)
    };

  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data.' })
    };
  }
};