import pool from '../../../utils/db.js';

export async function POST(req) {
  try {
    const query = 'SELECT * FROM fn_get_product_page(1)';
    const result = await pool.query(query); // Await the pool query directly
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(JSON.stringify({ error: 'Error fetching users' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
