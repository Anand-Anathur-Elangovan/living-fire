import { Pool } from 'pg';

// Create a PostgreSQL pool
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: {
    // rejectUnauthorized: true, // Use this for production if you have valid certificates
    // Use the following if you don't have a valid SSL certificate (development/testing)
    rejectUnauthorized: false 
  }
});

// Export the pool for use in other modules
export default pool; // Ensure this line is correct
