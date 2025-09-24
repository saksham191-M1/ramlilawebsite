// netlify/functions/get-post.js
import { neon } from '@netlify/neon';

export const handler = async (event) => {
  // Get the post ID from the URL, e.g., ...?id=1
  const postId = event.queryStringParameters.id;

  if (!postId) {
    return { 
      statusCode: 400, 
      body: JSON.stringify({ error: 'Post ID is required.' }) 
    };
  }

  try {
    // This connects to your database using the environment variable
    const sql = neon();

    // This is your raw SQL query.
    // The `${postId}` syntax is used to safely insert the variable.
    const [post] = await sql`SELECT * FROM posts WHERE id = ${postId}`;

    if (!post) {
      return { 
        statusCode: 404, 
        body: JSON.stringify({ error: 'Post not found.' }) 
      };
    }

    // Return the data successfully
    return { 
      statusCode: 200, 
      body: JSON.stringify(post) 
    };

  } catch (error) {
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: 'Database connection failed.' }) 
    };
  }
};