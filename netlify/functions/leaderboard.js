// Import the pg library
const { Pool } = require('pg');

// Create a new Pool object using the DATABASE_URL environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Neon connections
  }
});

exports.handler = async function(event, context) {
  try {
    // Connect to the database
    const client = await pool.connect();
    
    // Run a SQL query to get the top 10 scores
    const result = await client.query('SELECT name, score FROM leaderboard ORDER BY score DESC LIMIT 10;');
    
    // Release the client connection
    client.release();

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows) // Send the data back as JSON
    };

  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data.' })
    };
  }
};